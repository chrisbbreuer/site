/*
 * Gallery: SplatHash placeholders + Medium-style click-to-zoom lightbox.
 * Dependency-free. Pairs with /assets/scripts/splathash.js.
 *
 * SPA-aware: the stx router swaps page content without a full reload and fires
 * `stx:load` once the new markup + scripts are in place, so we (re)initialise
 * on that event as well as the initial load. Everything is idempotent — items
 * are wired once (data-lb-wired), and the lightbox overlay is created once and
 * reused across navigations.
 */
;(function () {
  if (window.__gallerySetup) {
    // Script re-appended by the router: just re-run init, don't re-bind events.
    window.__galleryInit && window.__galleryInit()
    return
  }
  window.__gallerySetup = true

  var overlay = null
  var stageImg = null
  var closeBtn = null
  var lastFocus = null

  function ensureOverlay() {
    if (overlay) return
    overlay = document.createElement('div')
    overlay.className = 'lightbox'
    overlay.setAttribute('role', 'dialog')
    overlay.setAttribute('aria-modal', 'true')
    overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">×</button><figure class="lightbox-stage"><img alt=""></figure>'
    document.body.appendChild(overlay)
    stageImg = overlay.querySelector('img')
    closeBtn = overlay.querySelector('.lightbox-close')
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target === closeBtn || e.target === stageImg) close()
    })
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close()
    })
  }

  function open(item) {
    var full = item.getAttribute('data-full')
    var hash = item.getAttribute('data-hash')
    var thumb = item.querySelector('img')
    lastFocus = item
    // Show the placeholder (or the already-decoded thumb) instantly, then swap
    // in the full-resolution source once it decodes.
    if (hash && window.splatHashToDataURL) {
      try { stageImg.src = window.splatHashToDataURL(hash) } catch (e) { /* best effort */ }
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

  function initGallery() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'))
    if (!items.length) return
    ensureOverlay()

    items.forEach(function (item) {
      if (item.getAttribute('data-lb-wired')) return
      item.setAttribute('data-lb-wired', '1')

      // Paint the SplatHash placeholder and fade the thumb in once it decodes.
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
      item.addEventListener('click', function () { open(item) })
    })
  }

  window.__galleryInit = initGallery

  if (document.readyState !== 'loading') initGallery()
  else document.addEventListener('DOMContentLoaded', initGallery)
  // Re-init after SPA navigation. The router fires stx:load, but its exact
  // timing vs. the content swap isn't guaranteed, so a MutationObserver is the
  // reliable trigger: whenever unwired gallery items appear in the DOM, init.
  window.addEventListener('stx:load', initGallery)
  if (window.MutationObserver) {
    var queued = false
    var mo = new MutationObserver(function () {
      if (queued || !document.querySelector('.gallery-item:not([data-lb-wired])')) return
      queued = true
      setTimeout(function () { queued = false; initGallery() }, 0)
    })
    mo.observe(document.documentElement, { childList: true, subtree: true })
  }
})()
