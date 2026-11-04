var backLabelFor = undefined;
var backText = undefined;
var barClass = undefined;
var canGoBack = undefined;
var enterNavTrail = undefined;
var fallbackLabel = undefined;
var goBack = undefined;
var haptics = undefined;
var here = undefined;
var isLarge = undefined;
var largeTitle = undefined;
var navBack = undefined;
var navRoot = undefined;
var navTitle = undefined;
var navTrail = undefined;
var observeLargeTitle = undefined;
var onScroll = undefined;
var previousScreenPath = undefined;
var previousTitle = undefined;
var scrolled = undefined;
var stopScroll = undefined;
var tapBack = undefined;
var trailEntryFor = undefined;
var __stxBundle_6fd9fd134a4f = (function() {
var __stxMod0 = globalThis.__stxModules && globalThis.__stxModules["npm:@stacksjs/mobile"];
if (__stxMod0 === undefined) throw new Error("[stx] module " + "\"npm:@stacksjs/mobile\"" + " is not registered on this page (#1957)");
var backLabelFor = __stxMod0["backLabelFor"];
var canGoBack = __stxMod0["canGoBack"];
var enterNavTrail = __stxMod0["enterNavTrail"];
var goBack = __stxMod0["goBack"];
var haptics = __stxMod0["haptics"];
var navTrail = __stxMod0["navTrail"];
var observeLargeTitle = __stxMod0["observeLargeTitle"];
var previousScreenPath = __stxMod0["previousScreenPath"];
var trailEntryFor = __stxMod0["trailEntryFor"];
// .stx-client-6fd9fd134a4f-38228-51519d98-a5dd-47c8-a871-8cd0c4b3d1a1.ts

var isLarge = useReactiveProp("large", true);
var onScroll = useReactiveProp("titleOnScroll", false);
var navTitle = useReactiveProp("title", "");
var scrolled = state(false);
var stopScroll = null;
var fallbackLabel = useReactiveProp("backLabel", "Back");
var previousTitle = state("");
var backText = derived(() => backLabelFor({ path: "", title: previousTitle() }, fallbackLabel()));
var here = null;
effect(() => {
  const name = navTitle();
  if (here)
    here.title = name;
});
var navRoot = useRef("nativeNav");
var largeTitle = useRef("nativeNavLargeTitle");
onMount(() => {
  const root = navRoot.current;
  if (root) {
    stopScroll = observeLargeTitle(root, {
      title: largeTitle.current,
      onChange: (metrics) => scrolled.set(metrics.progress >= 0.5)
    });
  }
  const { current, previous } = enterNavTrail(navTrail(), window.location.pathname + window.location.search);
  here = current;
  current.title = navTitle();
  const backPath = previousScreenPath();
  const returnsTo = backPath === undefined ? previous : backPath ? trailEntryFor(navTrail(), backPath) : null;
  if (returnsTo && canGoBack())
    previousTitle.set(returnsTo.title);
});
onDestroy(() => stopScroll?.());
var navBack = useReactiveProp("back", "");
var barClass = derived(() => {
  const collapsed = !isLarge() && !onScroll() || scrolled();
  return `native-nav-bar${isLarge() ? " is-large" : ""}${collapsed ? " is-collapsed" : ""}${scrolled() ? " is-scrolled" : ""}${navBack() ? " has-back" : ""}`;
});
function tapBack(event) {
  haptics.selection();
  if (goBack())
    event.preventDefault();
}
return { get "backLabelFor"() { return backLabelFor }, get "backText"() { return backText }, get "barClass"() { return barClass }, get "canGoBack"() { return canGoBack }, get "enterNavTrail"() { return enterNavTrail }, get "fallbackLabel"() { return fallbackLabel }, get "goBack"() { return goBack }, get "haptics"() { return haptics }, get "here"() { return here }, set "here"(__stxValue_here) { here = __stxValue_here }, get "isLarge"() { return isLarge }, get "largeTitle"() { return largeTitle }, get "navBack"() { return navBack }, get "navRoot"() { return navRoot }, get "navTitle"() { return navTitle }, get "navTrail"() { return navTrail }, get "observeLargeTitle"() { return observeLargeTitle }, get "onScroll"() { return onScroll }, get "previousScreenPath"() { return previousScreenPath }, get "previousTitle"() { return previousTitle }, get "scrolled"() { return scrolled }, get "stopScroll"() { return stopScroll }, set "stopScroll"(__stxValue_stopScroll) { stopScroll = __stxValue_stopScroll }, get "tapBack"() { return tapBack }, get "trailEntryFor"() { return trailEntryFor } };
})();
backLabelFor = __stxBundle_6fd9fd134a4f["backLabelFor"];
backText = __stxBundle_6fd9fd134a4f["backText"];
barClass = __stxBundle_6fd9fd134a4f["barClass"];
canGoBack = __stxBundle_6fd9fd134a4f["canGoBack"];
enterNavTrail = __stxBundle_6fd9fd134a4f["enterNavTrail"];
fallbackLabel = __stxBundle_6fd9fd134a4f["fallbackLabel"];
goBack = __stxBundle_6fd9fd134a4f["goBack"];
haptics = __stxBundle_6fd9fd134a4f["haptics"];
here = __stxBundle_6fd9fd134a4f["here"];
isLarge = __stxBundle_6fd9fd134a4f["isLarge"];
largeTitle = __stxBundle_6fd9fd134a4f["largeTitle"];
navBack = __stxBundle_6fd9fd134a4f["navBack"];
navRoot = __stxBundle_6fd9fd134a4f["navRoot"];
navTitle = __stxBundle_6fd9fd134a4f["navTitle"];
navTrail = __stxBundle_6fd9fd134a4f["navTrail"];
observeLargeTitle = __stxBundle_6fd9fd134a4f["observeLargeTitle"];
onScroll = __stxBundle_6fd9fd134a4f["onScroll"];
previousScreenPath = __stxBundle_6fd9fd134a4f["previousScreenPath"];
previousTitle = __stxBundle_6fd9fd134a4f["previousTitle"];
scrolled = __stxBundle_6fd9fd134a4f["scrolled"];
stopScroll = __stxBundle_6fd9fd134a4f["stopScroll"];
tapBack = __stxBundle_6fd9fd134a4f["tapBack"];
trailEntryFor = __stxBundle_6fd9fd134a4f["trailEntryFor"];
var __stxLiveBindings = typeof __stxLiveBindings === 'undefined' ? {} : __stxLiveBindings;
Object.keys(__stxBundle_6fd9fd134a4f).forEach(function(name) {
  if (!Object.prototype.hasOwnProperty.call(__stxLiveBindings, name))
    Object.defineProperty(__stxLiveBindings, name, Object.getOwnPropertyDescriptor(__stxBundle_6fd9fd134a4f, name));
});