/*
 * Site chrome that must survive SPA navigation (the stx router swaps page
 * content but leaves the layout — masthead, footer — in place):
 *   1. Keep the active nav link in sync with the current path. The server marks
 *      it on first render, but after a client-side nav the old link stays
 *      highlighted, so we re-derive it from location.pathname.
 *   2. Projects page: live filter by name/description + org.
 * Loaded once from the layout; re-runs on stx:load and whenever content is
 * swapped in (MutationObserver), and is idempotent.
 */
;(function () {
  if (window.__siteChrome) { window.__siteChromeInit && window.__siteChromeInit(); return }
  window.__siteChrome = true

  function updateNav() {
    var path = location.pathname
    var links = document.querySelectorAll('.masthead nav a')
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href')
      var active = !!href && href.charAt(0) === '/' &&
        (path === href || (href !== '/' && path.indexOf(href + '/') === 0))
      if (active) links[i].setAttribute('aria-current', 'page')
      else links[i].removeAttribute('aria-current')
    }
  }

  function initProjectFilter() {
    var bar = document.querySelector('.proj-filter')
    if (!bar || bar.__wired) return
    bar.__wired = true
    var search = bar.querySelector('.proj-search')
    var items = Array.prototype.slice.call(document.querySelectorAll('.proj-group .entry-list li'))
    var groups = Array.prototype.slice.call(document.querySelectorAll('.proj-group'))
    var highlights = document.querySelector('.proj-highlights')
    var empty = document.querySelector('.proj-empty')
    var activeOrg = ''
    var activeTag = ''

    function apply() {
      var q = (search.value || '').trim().toLowerCase()
      var filtering = q !== '' || activeOrg !== '' || activeTag !== ''
      if (highlights) highlights.hidden = filtering
      var shown = 0
      items.forEach(function (li) {
        var okOrg = activeOrg === '' || li.getAttribute('data-org') === activeOrg
        var okTag = activeTag === '' || (' ' + (li.getAttribute('data-tags') || '') + ' ').indexOf(' ' + activeTag + ' ') !== -1
        var okText = q === '' || (li.getAttribute('data-text') || '').indexOf(q) !== -1
        var ok = okOrg && okTag && okText
        li.hidden = !ok
        if (ok) shown++
      })
      groups.forEach(function (g) {
        g.hidden = !g.querySelector('.entry-list li:not([hidden])')
      })
      if (empty) empty.hidden = !filtering || shown !== 0
    }

    // Each chip group (tags, orgs) is single-select; clicking one clears its
    // own group's selection first, then applies across both facets + search.
    Array.prototype.slice.call(bar.querySelectorAll('.proj-chips')).forEach(function (group) {
      var chips = Array.prototype.slice.call(group.querySelectorAll('.proj-chip'))
      chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
          chips.forEach(function (c) { c.classList.remove('is-active'); c.setAttribute('aria-pressed', 'false') })
          chip.classList.add('is-active')
          chip.setAttribute('aria-pressed', 'true')
          if (chip.hasAttribute('data-tag')) activeTag = chip.getAttribute('data-tag') || ''
          else activeOrg = chip.getAttribute('data-org') || ''
          apply()
        })
      })
    })
    search.addEventListener('input', apply)
    apply()
  }

  function init() {
    updateNav()
    initProjectFilter()
  }
  window.__siteChromeInit = init

  if (document.readyState !== 'loading') init()
  else document.addEventListener('DOMContentLoaded', init)
  window.addEventListener('stx:load', init)
  if (window.MutationObserver) {
    var queued = false
    new MutationObserver(function () {
      if (queued) return
      queued = true
      setTimeout(function () { queued = false; init() }, 0)
    }).observe(document.documentElement, { childList: true, subtree: true })
  }
})()
