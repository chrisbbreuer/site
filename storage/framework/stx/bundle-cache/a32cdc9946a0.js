var backText = undefined;
var barClass = undefined;
var fallbackLabel = undefined;
var here = undefined;
var isLarge = undefined;
var largeTitle = undefined;
var navBack = undefined;
var navRoot = undefined;
var navTitle = undefined;
var onScroll = undefined;
var previousTitle = undefined;
var scrolled = undefined;
var stopScroll = undefined;
var tapBack = undefined;
var __stxBundle_a32cdc9946a0 = (function() {
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
// storage/framework/stx/bundle-tmp/a32cdc9946a0.ts

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
return { "backText": backText, "barClass": barClass, "fallbackLabel": fallbackLabel, "here": here, "isLarge": isLarge, "largeTitle": largeTitle, "navBack": navBack, "navRoot": navRoot, "navTitle": navTitle, "onScroll": onScroll, "previousTitle": previousTitle, "scrolled": scrolled, "stopScroll": stopScroll, "tapBack": tapBack };
})();
backText = __stxBundle_a32cdc9946a0["backText"];
barClass = __stxBundle_a32cdc9946a0["barClass"];
fallbackLabel = __stxBundle_a32cdc9946a0["fallbackLabel"];
here = __stxBundle_a32cdc9946a0["here"];
isLarge = __stxBundle_a32cdc9946a0["isLarge"];
largeTitle = __stxBundle_a32cdc9946a0["largeTitle"];
navBack = __stxBundle_a32cdc9946a0["navBack"];
navRoot = __stxBundle_a32cdc9946a0["navRoot"];
navTitle = __stxBundle_a32cdc9946a0["navTitle"];
onScroll = __stxBundle_a32cdc9946a0["onScroll"];
previousTitle = __stxBundle_a32cdc9946a0["previousTitle"];
scrolled = __stxBundle_a32cdc9946a0["scrolled"];
stopScroll = __stxBundle_a32cdc9946a0["stopScroll"];
tapBack = __stxBundle_a32cdc9946a0["tapBack"];