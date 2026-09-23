/*
 * Gallery: SplatHash placeholders + Medium-style click-to-zoom lightbox.
 * Dependency-free. Pairs with /assets/scripts/splathash.js.
 *
 * SPA-aware: the stx router swaps page content without a full reload and fires
 * `stx:load` once the new markup + scripts are in place, so we (re)initialise
 * on that event as well as the initial load. Everything is idempotent, items
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
  var baseImg = null // small/thumb layer, shown instantly
  var fullImg = null // large layer, fades in over the base once it loads
  var closeBtn = null
  var caption = null
  var stage = null
  var lastFocus = null
  var openRatio = 0 // width/height of the photo currently open

  function ensureOverlay() {
    if (overlay) return
    overlay = document.createElement('div')
    overlay.className = 'lightbox'
    overlay.setAttribute('role', 'dialog')
    overlay.setAttribute('aria-modal', 'true')
    overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">×</button>'
      + '<figure class="lightbox-figure">'
      + '<span class="lightbox-stage"><img class="lb-base" alt=""><img class="lb-full" alt=""><span class="lb-spinner" aria-hidden="true"></span></span>'
      + '<figcaption class="lightbox-caption"></figcaption>'
      + '</figure>'
    document.body.appendChild(overlay)
    baseImg = overlay.querySelector('.lb-base')
    fullImg = overlay.querySelector('.lb-full')
    caption = overlay.querySelector('.lightbox-caption')
    stage = overlay.querySelector('.lightbox-stage')
    closeBtn = overlay.querySelector('.lightbox-close')
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target === closeBtn || e.target === baseImg || e.target === fullImg || e.target === caption) close()
    })
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close()
    })
  }

  /*
   * Give the stage the size the photo should actually be shown at.
   *
   * Without this the stage took its size from the base layer, which is the
   * 460px masonry thumbnail, and the full-size layer is absolutely positioned
   * to match it. So every photo opened at 460px no matter how large the file
   * behind it was: the lightbox downloaded a 2600px image and painted it into
   * a thumbnail's footprint. Sizing the box here from the photo's own aspect
   * ratio is what makes opening one worth doing.
   */
  function sizeStage() {
    if (!openRatio) return
    var pad = window.innerWidth < 640 ? 16 : 48
    var maxW = Math.min(window.innerWidth - pad * 2, 1400)
    // Leaves room for the caption and the gap above it.
    var maxH = window.innerHeight * 0.78
    var h = Math.min(maxH, maxW / openRatio)
    var w = h * openRatio
    stage.style.width = Math.round(w) + 'px'
    stage.style.height = Math.round(h) + 'px'
  }

  function open(item) {
    var full = item.getAttribute('data-full')
    var hash = item.getAttribute('data-hash')
    var alt = item.getAttribute('data-alt') || ''
    var thumb = item.querySelector('img')
    var pw = parseFloat(item.getAttribute('data-w')) || 4
    var ph = parseFloat(item.getAttribute('data-h')) || 3
    openRatio = pw / ph
    lastFocus = item
    sizeStage()
    // Reset the large layer so it can crossfade in fresh for this photo.
    fullImg.classList.remove('is-shown')
    fullImg.removeAttribute('src')
    // Describe the photo, to the page and to assistive tech. The base layer
    // carries the alt while the full one loads, so the description is there
    // from the moment it opens rather than when the bytes land.
    baseImg.alt = alt
    fullImg.alt = alt
    caption.textContent = alt
    caption.hidden = !alt
    overlay.setAttribute('aria-label', alt || 'Photograph')
    // The full-size file is a megabyte or so, so say something is coming.
    // Removed on load, and on error too, so a failure does not spin forever.
    stage.classList.add('is-loading')
    // Base layer: the SplatHash placeholder, upgraded to the decoded thumb, // shown instantly so there's always something on screen.
    var baseSrc = ''
    if (hash && window.splatHashToDataURL) {
      try { baseSrc = window.splatHashToDataURL(hash) } catch (e) { /* best effort */ }
    }
    if (thumb && thumb.currentSrc) baseSrc = thumb.currentSrc
    if (baseSrc) baseImg.src = baseSrc
    overlay.classList.add('is-open')
    document.body.classList.add('lightbox-open')
    closeBtn.focus()
    // Load the full-resolution image, then fade it in over the base rather than
    // swapping the source abruptly.
    if (full) {
      fullImg.onload = function () {
        stage.classList.remove('is-loading')
        // Defer one tick so the opacity:0 start state is painted first, then
        // the class flip transitions it in (setTimeout, not rAF, which some
        // browsers throttle for offscreen/background frames).
        setTimeout(function () { fullImg.classList.add('is-shown') }, 20)
      }
      fullImg.onerror = function () { stage.classList.remove('is-loading') }
      fullImg.src = full
    }
    else {
      stage.classList.remove('is-loading')
    }
  }

  function close() {
    overlay.classList.remove('is-open')
    document.body.classList.remove('lightbox-open')
    openRatio = 0
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

    var cols = 6
    var colW = (W - (cols - 1) * GAP) / cols
    // Bio spans the left four columns, portrait the right two. The bio gets an
    // inset on its right so the text keeps clear of the right-hand photo
    // columns (box-sizing: border-box, so the 4-col box width is unchanged and
    // the grid stays aligned, only the text reflows narrower).
    bio.style.position = 'absolute'; bio.style.top = '0'; bio.style.left = '0'
    bio.style.width = (4 * colW + 3 * GAP) + 'px'
    bio.style.paddingRight = '28px'
    port.style.position = 'absolute'; port.style.top = '0'; port.style.right = '0'
    port.style.left = 'auto'; port.style.width = (2 * colW + GAP) + 'px'
    masonry.classList.add('is-laid-out')

    // Breathing room before photos begin: a generous gap under the bio text,
    // a smaller one under the portrait/note.
    var bioH = bio.offsetHeight + 48
    var portH = port.offsetHeight + 16
    var heights = [bioH, bioH, bioH, bioH, portH, portH]
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
    if (openRatio) sizeStage()
    clearTimeout(rt)
    rt = setTimeout(layoutMasonry, 120)
  })
})()
