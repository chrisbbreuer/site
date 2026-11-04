var activeIndex = undefined;
var ariaLabel = undefined;
var choose = undefined;
var className = undefined;
var emit = undefined;
var onKey = undefined;
var options = undefined;
var pressed = undefined;
var rawOptions = undefined;
var scrubIndex = undefined;
var selected = undefined;
var stopScrub = undefined;
var thumbStyle = undefined;
var track = undefined;
var __stxBundle_31d0b79891c3 = (function() {
var __stxMod0 = globalThis.__stxModules && globalThis.__stxModules["npm:@stacksjs/mobile"];
if (__stxMod0 === undefined) throw new Error("[stx] module " + "\"npm:@stacksjs/mobile\"" + " is not registered on this page (#1957)");
var focusSegment = __stxMod0["focusSegment"];
var haptics = __stxMod0["haptics"];
var observeSegmentScrub = __stxMod0["observeSegmentScrub"];
var segmentForKey = __stxMod0["segmentForKey"];
// storage/framework/stx/bundle-tmp/31d0b79891c3.ts

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
return { "activeIndex": activeIndex, "ariaLabel": ariaLabel, "choose": choose, "className": className, "emit": emit, "onKey": onKey, "options": options, "pressed": pressed, "rawOptions": rawOptions, "scrubIndex": scrubIndex, "selected": selected, "stopScrub": stopScrub, "thumbStyle": thumbStyle, "track": track };
})();
activeIndex = __stxBundle_31d0b79891c3["activeIndex"];
ariaLabel = __stxBundle_31d0b79891c3["ariaLabel"];
choose = __stxBundle_31d0b79891c3["choose"];
className = __stxBundle_31d0b79891c3["className"];
emit = __stxBundle_31d0b79891c3["emit"];
onKey = __stxBundle_31d0b79891c3["onKey"];
options = __stxBundle_31d0b79891c3["options"];
pressed = __stxBundle_31d0b79891c3["pressed"];
rawOptions = __stxBundle_31d0b79891c3["rawOptions"];
scrubIndex = __stxBundle_31d0b79891c3["scrubIndex"];
selected = __stxBundle_31d0b79891c3["selected"];
stopScrub = __stxBundle_31d0b79891c3["stopScrub"];
thumbStyle = __stxBundle_31d0b79891c3["thumbStyle"];
track = __stxBundle_31d0b79891c3["track"];