/*
 * Progressive enhancement for the newsletter form: posts to the list in
 * CommsHQ (the form's `action`) with fetch and shows the result inline
 * instead of navigating away. Without JS the form still posts natively and
 * CommsHQ answers with a page of its own.
 *
 * CommsHQ answers 202 when a confirmation email is on its way: nobody is on
 * the list until they click it. 422 is a mistyped address, 429 is too many
 * tries, and 403 or 404 mean the form itself is wrong, which the reader cannot
 * fix, so they get a plain "try again later".
 *
 * Loaded from the layout on every page rather than pushed by the two pages
 * that carry a form. A pushed script lands outside the router's container and
 * is not executed on a client-side navigation, so arriving at / or /blog from
 * anywhere else on the site left the form with no submit handler at all.
 * Binding is idempotent and re-runs on `stx:load`, which is what makes loading
 * it everywhere safe.
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
      var email = input ? input.value.trim() : ''
      if (!email) {
        say('Enter an email address first.')
        return
      }

      if (button)
        button.disabled = true
      say('Subscribing...')

      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: email }),
      })
        .then(function (res) {
          if (res.status === 202 || res.ok) {
            say('Almost there. Check your inbox for a link to confirm.')
            form.reset()
          }
          else if (res.status === 422) {
            say('That email address does not look right.')
          }
          else if (res.status === 429) {
            say('Too many tries. Wait a minute and try again.')
          }
          else {
            say('Something went wrong on our end. Try again later.')
          }
        })
        .catch(function () { say('Network error. Try again in a moment.') })
        .finally(function () {
          if (button)
            button.disabled = false
        })
    })
  }

  // Back from the confirmation link (CommsHQ sends confirmed readers to
  // /?subscribed=1): say so on the form, then drop the flag from the URL so
  // a reload or a shared link does not say it again.
  function welcome() {
    if (!/[?&]subscribed=1(&|$)/.test(location.search))
      return
    var note = document.querySelector('form[data-subscribe] .form-note')
    if (note)
      note.textContent = 'You are subscribed. New posts will land in your inbox.'
    var url = location.pathname + location.search.replace(/([?&])subscribed=1(&|$)/, '$1').replace(/[?&]$/, '') + location.hash
    history.replaceState(history.state, '', url)
  }

  function init() {
    var forms = document.querySelectorAll('form[data-subscribe]')
    for (var i = 0; i < forms.length; i++) wire(forms[i])
    welcome()
  }

  if (document.readyState !== 'loading')
    init()
  else
    document.addEventListener('DOMContentLoaded', init)

  // The router swaps the container without reloading, so the form on the page
  // being navigated to has never been seen by the code above.
  window.addEventListener('stx:load', init)
})()
