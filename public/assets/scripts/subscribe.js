/*
 * Progressive enhancement for the newsletter form: posts to
 * /api/email/subscribe via fetch and shows the result inline instead of
 * navigating to the JSON response. Without JS the form still posts natively.
 *
 * Loaded from the layout on every page rather than pushed by the two pages
 * that carry a form. A pushed script lands outside the router's container and
 * is not executed on a client-side navigation, so arriving at / or /blog from
 * anywhere else on the site left the form with no submit handler at all: it
 * would post natively and hand the visitor a page of JSON. Binding is
 * idempotent and re-runs on `stx:load`, which is what makes loading it
 * everywhere safe.
 */
;(function () {
  function wire(form) {
    if (form.__subscribeWired)
      return
    form.__subscribeWired = true

    var note = form.querySelector('.form-note')
    var button = form.querySelector('button[type="submit"]')
    function say(text) {
      if (note)
        note.textContent = text
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault()

      var input = form.querySelector('input[name="email"]')
      var email = input ? input.value : ''
      if (!email) {
        say('Enter an email address first.')
        return
      }

      if (button)
        button.disabled = true
      say('Subscribing...')

      var body = new URLSearchParams()
      body.set('email', email)
      body.set('source', form.getAttribute('data-subscribe') || 'homepage')

      fetch('/api/email/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
        .then(function (res) { return res.json().catch(function () { return {} }) })
        .then(function (data) {
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
        .catch(function () { say('Network error. Try again in a moment.') })
        .finally(function () {
          if (button)
            button.disabled = false
        })
    })
  }

  function init() {
    var forms = document.querySelectorAll('form[data-subscribe]')
    for (var i = 0; i < forms.length; i++) wire(forms[i])
  }

  if (document.readyState !== 'loading')
    init()
  else
    document.addEventListener('DOMContentLoaded', init)

  // The router swaps the container without reloading, so the form on the page
  // being navigated to has never been seen by the code above.
  window.addEventListener('stx:load', init)
})()
