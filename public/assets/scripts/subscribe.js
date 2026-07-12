/*
 * Progressive enhancement for the newsletter form: posts to
 * /api/email/subscribe via fetch and shows the result inline instead of
 * navigating to the JSON response. Without JS the form still posts natively.
 */
(() => {
  document.querySelectorAll('form[data-subscribe]').forEach((form) => {
    const note = form.querySelector('.form-note')
    const button = form.querySelector('button[type="submit"]')
    const say = (text) => {
      if (note)
        note.textContent = text
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault()

      const input = form.querySelector('input[name="email"]')
      const email = input ? input.value : ''
      if (!email) {
        say('Enter an email address first.')
        return
      }

      if (button)
        button.disabled = true
      say('Subscribing...')

      const body = new URLSearchParams()
      body.set('email', email)
      body.set('source', form.getAttribute('data-subscribe') || 'homepage')

      fetch('/api/email/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
        .then(res => res.json().catch(() => ({})))
        .then((data) => {
          if (data && data.success) {
            say(data.message === 'Already subscribed'
              ? 'You are already on the list.'
              : 'Subscribed. Check your inbox to confirm.')
            form.reset()
          }
          else {
            say((data && data.message) || 'Something went wrong. Try again.')
          }
        })
        .catch(() => say('Network error. Try again in a moment.'))
        .finally(() => {
          if (button)
            button.disabled = false
        })
    })
  })
})()
