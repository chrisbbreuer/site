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

  // Wrap-around masonry: one 5-column grid where the left three columns start
  // below the bio and the right two below the portrait, so photos fill beside
  // and under the text as a single seamless flow. Tile heights come from known
  // aspect ratios (data-w/data-h), so there's no reflow as images load.
  function layoutMasonry() {
    var wrap = document.querySelector('.about-wrap')
    if (!wrap) return
    var masonry = wrap.querySelector('.photo-masonry')
    var bio = wrap.querySelector('.bio-col')
    var port = wrap.querySelector('.portrait-col')
    if (!masonry || !bio || !port) return
    var items = masonry.querySelectorAll('.gallery-item')
    var W = wrap.clientWidth
    var GAP = 8 // 0.5rem

    // Narrow viewports: hand layout back to the CSS multi-column fallback.
    // (The shell is ~664px on desktop, so the wrap engages below that.)
    if (W <= 600) {
      masonry.classList.remove('is-laid-out')
      masonry.style.height = ''
      bio.style.cssText = ''
      port.style.cssText = ''
      items.forEach(function (it) { it.style.left = ''; it.style.top = ''; it.style.width = '' })
      return
    }

    var cols = 5
    var colW = (W - (cols - 1) * GAP) / cols
    // Bio spans the left three columns, portrait the right two.
    bio.style.position = 'absolute'; bio.style.top = '0'; bio.style.left = '0'
    bio.style.width = (3 * colW + 2 * GAP) + 'px'
    port.style.position = 'absolute'; port.style.top = '0'; port.style.right = '0'
    port.style.left = 'auto'; port.style.width = (2 * colW + GAP) + 'px'
    masonry.classList.add('is-laid-out')

    var BELOW = 16 // breathing room under the text/portrait before photos begin
    var bioH = bio.offsetHeight + BELOW
    var portH = port.offsetHeight + BELOW
    var heights = [bioH, bioH, bioH, portH, portH]
    items.forEach(function (it) {
      var min = 0
      for (var c = 1; c < cols; c++) { if (heights[c] < heights[min]) min = c }
      var w = parseFloat(it.getAttribute('data-w')) || 4
      var h = parseFloat(it.getAttribute('data-h')) || 3
      it.style.width = colW + 'px'
      it.style.left = (min * (colW + GAP)) + 'px'
      it.style.top = heights[min] + 'px'
      heights[min] += (colW * (h / w)) + GAP
    })
    var maxH = 0
    for (var c = 0; c < cols; c++) { if (heights[c] > maxH) maxH = heights[c] }
    masonry.style.height = maxH + 'px'
  }
  window.__galleryLayout = layoutMasonry

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

    layoutMasonry()
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

  // The bio height (and so the masonry offsets) depends on the web font and the
  // viewport width, so re-run layout once Lilex loads and on resize (debounced).
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutMasonry)
  var rt
  window.addEventListener('resize', function () {
    clearTimeout(rt)
    rt = setTimeout(layoutMasonry, 120)
  })
})()
