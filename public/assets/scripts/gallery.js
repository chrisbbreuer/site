/*
 * Gallery: SplatHash placeholders + Medium-style click-to-zoom lightbox.
 * Dependency-free. Pairs with /assets/scripts/splathash.js.
 */
;(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn()
    else document.addEventListener('DOMContentLoaded', fn)
  }

  ready(function () {
    var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'))
    if (!items.length) return

    // 1. Paint SplatHash placeholders and fade each thumb in on load.
    items.forEach(function (item) {
      var img = item.querySelector('img')
      var hash = item.getAttribute('data-hash')
      if (hash && window.splatHashToDataURL) {
        try { item.style.backgroundImage = 'url(' + window.splatHashToDataURL(hash) + ')' }
        catch (e) { /* placeholder is best-effort */ }
      }
      if (img) {
        if (img.complete && img.naturalWidth) item.classList.add('is-loaded')
        else img.addEventListener('load', function () { item.classList.add('is-loaded') }, { once: true })
      }
    })

    // 2. Lightbox.
    var overlay = document.createElement('div')
    overlay.className = 'lightbox'
    overlay.setAttribute('role', 'dialog')
    overlay.setAttribute('aria-modal', 'true')
    overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">×</button><figure class="lightbox-stage"><img alt=""></figure>'
    document.body.appendChild(overlay)
    var stageImg = overlay.querySelector('img')
    var closeBtn = overlay.querySelector('.lightbox-close')
    var lastFocus = null

    function open(item) {
      var full = item.getAttribute('data-full')
      var hash = item.getAttribute('data-hash')
      var thumb = item.querySelector('img')
      lastFocus = item
      // Show the placeholder (or the already-decoded thumb) instantly, then
      // swap in the full-resolution source once it decodes.
      if (hash && window.splatHashToDataURL) {
        try { stageImg.src = window.splatHashToDataURL(hash) } catch (e) {}
      }
      if (thumb && thumb.currentSrc) stageImg.src = thumb.currentSrc
      overlay.classList.add('is-open')
      document.body.classList.add('lightbox-open')
      closeBtn.focus()
      if (full) {
        var hi = new Image()
        hi.onload = function () { stageImg.src = full }
        hi.src = full
      }
    }

    function close() {
      overlay.classList.remove('is-open')
      document.body.classList.remove('lightbox-open')
      if (lastFocus) lastFocus.focus()
    }

    items.forEach(function (item) {
      item.addEventListener('click', function () { open(item) })
    })
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target === closeBtn || e.target === stageImg) close()
    })
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close()
    })
  })
})()
