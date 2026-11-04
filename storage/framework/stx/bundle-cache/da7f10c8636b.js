var activeIndex = undefined;
var ariaLabel = undefined;
var choose = undefined;
var className = undefined;
var emit = undefined;
var focusSegment = undefined;
var haptics = undefined;
var observeSegmentScrub = undefined;
var onKey = undefined;
var options = undefined;
var pressed = undefined;
var rawOptions = undefined;
var scrubIndex = undefined;
var segmentForKey = undefined;
var selected = undefined;
var stopScrub = undefined;
var thumbStyle = undefined;
var track = undefined;
var __stxBundle_da7f10c8636b = (function() {
var __stxMod0 = globalThis.__stxModules && globalThis.__stxModules["npm:@stacksjs/mobile"];
if (__stxMod0 === undefined) throw new Error("[stx] module " + "\"npm:@stacksjs/mobile\"" + " is not registered on this page (#1957)");
var focusSegment = __stxMod0["focusSegment"];
var haptics = __stxMod0["haptics"];
var observeSegmentScrub = __stxMod0["observeSegmentScrub"];
var segmentForKey = __stxMod0["segmentForKey"];
// .stx-client-da7f10c8636b-38228-b746136a-9f8a-445d-ac79-5f0f5925abff.ts

var emit = defineEmits(["change"]);
var rawOptions = useReactiveProp("options", []);
var ariaLabel = useReactiveProp("label", "View");
var className = useReactiveProp("class", "");
var selected = useModel("value", { default: "" });
var options = derived(() => rawOptions().map((option) => typeof option === "string" ? { label: option, value: option } : option));
var activeIndex = derived(() => Math.max(0, options().findIndex((option) => option.value === (selected() || options()[0]?.value))));
var scrubIndex = state(null);
var pressed = state(false);
var thumbStyle = derived(() => {
  const count = Math.max(1, options().length);
  const index = scrubIndex() ?? activeIndex();
  return `width:calc((100% - 4px) / ${count});transform:translateX(${index * 100}%)${pressed() ? " scale(0.95)" : ""}`;
});
function choose(value) {
  if (value === selected())
    return;
  selected.set(value);
  haptics.selection();
  emit("change", value);
}
var track = useRef("nativeSegmented");
var stopScrub = null;
onMount(() => {
  const element = track.current;
  if (!element)
    return;
  stopScrub = observeSegmentScrub(element, {
    count: () => options().length,
    selected: () => activeIndex(),
    onPress: (down) => {
      pressed.set(down);
      if (!down)
        scrubIndex.set(null);
    },
    onScrub: (index) => {
      scrubIndex.set(index);
      haptics.selection();
    },
    onCommit: (index) => {
      scrubIndex.set(null);
      const option = options()[index];
      if (!option || option.value === selected())
        return;
      selected.set(option.value);
      emit("change", option.value);
    }
  });
});
onDestroy(() => stopScrub?.());
function onKey(event) {
  const next = segmentForKey(event.key, activeIndex(), options().length);
  if (next === null)
    return;
  event.preventDefault();
  const option = options()[next];
  if (option)
    choose(option.value);
  if (track.current)
    focusSegment(track.current, next);
}
return { get "activeIndex"() { return activeIndex }, get "ariaLabel"() { return ariaLabel }, get "choose"() { return choose }, get "className"() { return className }, get "emit"() { return emit }, get "focusSegment"() { return focusSegment }, get "haptics"() { return haptics }, get "observeSegmentScrub"() { return observeSegmentScrub }, get "onKey"() { return onKey }, get "options"() { return options }, get "pressed"() { return pressed }, get "rawOptions"() { return rawOptions }, get "scrubIndex"() { return scrubIndex }, get "segmentForKey"() { return segmentForKey }, get "selected"() { return selected }, get "stopScrub"() { return stopScrub }, set "stopScrub"(__stxValue_stopScrub) { stopScrub = __stxValue_stopScrub }, get "thumbStyle"() { return thumbStyle }, get "track"() { return track } };
})();
activeIndex = __stxBundle_da7f10c8636b["activeIndex"];
ariaLabel = __stxBundle_da7f10c8636b["ariaLabel"];
choose = __stxBundle_da7f10c8636b["choose"];
className = __stxBundle_da7f10c8636b["className"];
emit = __stxBundle_da7f10c8636b["emit"];
focusSegment = __stxBundle_da7f10c8636b["focusSegment"];
haptics = __stxBundle_da7f10c8636b["haptics"];
observeSegmentScrub = __stxBundle_da7f10c8636b["observeSegmentScrub"];
onKey = __stxBundle_da7f10c8636b["onKey"];
options = __stxBundle_da7f10c8636b["options"];
pressed = __stxBundle_da7f10c8636b["pressed"];
rawOptions = __stxBundle_da7f10c8636b["rawOptions"];
scrubIndex = __stxBundle_da7f10c8636b["scrubIndex"];
segmentForKey = __stxBundle_da7f10c8636b["segmentForKey"];
selected = __stxBundle_da7f10c8636b["selected"];
stopScrub = __stxBundle_da7f10c8636b["stopScrub"];
thumbStyle = __stxBundle_da7f10c8636b["thumbStyle"];
track = __stxBundle_da7f10c8636b["track"];
var __stxLiveBindings = typeof __stxLiveBindings === 'undefined' ? {} : __stxLiveBindings;
Object.keys(__stxBundle_da7f10c8636b).forEach(function(name) {
  if (!Object.prototype.hasOwnProperty.call(__stxLiveBindings, name))
    Object.defineProperty(__stxLiveBindings, name, Object.getOwnPropertyDescriptor(__stxBundle_da7f10c8636b, name));
});