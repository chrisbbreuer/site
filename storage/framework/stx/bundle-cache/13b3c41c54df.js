var delay = undefined;
var emit = undefined;
var haptics = undefined;
var items = undefined;
var observeLongPress = undefined;
var onKey = undefined;
var openMenu = undefined;
var pressing = undefined;
var showContextMenuFor = undefined;
var stop = undefined;
var target = undefined;
var title = undefined;
var __stxBundle_13b3c41c54df = (function() {
var __stxMod0 = globalThis.__stxModules && globalThis.__stxModules["npm:@stacksjs/mobile"];
if (__stxMod0 === undefined) throw new Error("[stx] module " + "\"npm:@stacksjs/mobile\"" + " is not registered on this page (#1957)");
var haptics = __stxMod0["haptics"];
var observeLongPress = __stxMod0["observeLongPress"];
var showContextMenuFor = __stxMod0["showContextMenuFor"];
// .stx-client-13b3c41c54df-38228-6704c892-0446-4d4e-9d0e-35ce01a6d0ab.ts

var emit = defineEmits(["select"]);
var items = useReactiveProp("items", []);
var title = useReactiveProp("title", "");
var delay = useReactiveProp("delay", 500);
var pressing = state(false);
var target = useRef("nativeContextMenu");
var stop = null;
async function openMenu(element) {
  if (items().length === 0)
    return;
  const id = await showContextMenuFor(element, { items: items(), title: title() || undefined });
  if (id)
    emit("select", id);
}
onMount(() => {
  const element = target.current;
  if (!element)
    return;
  stop = observeLongPress(element, {
    delay: Number(delay()) || 500,
    onPressStart: () => {
      pressing.set(true);
      haptics.prepare("impact");
    },
    onPressEnd: () => pressing.set(false),
    onLongPress: () => {
      pressing.set(false);
      haptics.impact("medium");
      openMenu(element);
    }
  });
});
onDestroy(() => stop?.());
function onKey(event) {
  if (event.key !== "ContextMenu" && !(event.shiftKey && event.key === "F10"))
    return;
  event.preventDefault();
  const element = target.current;
  if (element)
    openMenu(element);
}
return { get "delay"() { return delay }, get "emit"() { return emit }, get "haptics"() { return haptics }, get "items"() { return items }, get "observeLongPress"() { return observeLongPress }, get "onKey"() { return onKey }, get "openMenu"() { return openMenu }, get "pressing"() { return pressing }, get "showContextMenuFor"() { return showContextMenuFor }, get "stop"() { return stop }, set "stop"(__stxValue_stop) { stop = __stxValue_stop }, get "target"() { return target }, get "title"() { return title } };
})();
delay = __stxBundle_13b3c41c54df["delay"];
emit = __stxBundle_13b3c41c54df["emit"];
haptics = __stxBundle_13b3c41c54df["haptics"];
items = __stxBundle_13b3c41c54df["items"];
observeLongPress = __stxBundle_13b3c41c54df["observeLongPress"];
onKey = __stxBundle_13b3c41c54df["onKey"];
openMenu = __stxBundle_13b3c41c54df["openMenu"];
pressing = __stxBundle_13b3c41c54df["pressing"];
showContextMenuFor = __stxBundle_13b3c41c54df["showContextMenuFor"];
stop = __stxBundle_13b3c41c54df["stop"];
target = __stxBundle_13b3c41c54df["target"];
title = __stxBundle_13b3c41c54df["title"];
var __stxLiveBindings = typeof __stxLiveBindings === 'undefined' ? {} : __stxLiveBindings;
Object.keys(__stxBundle_13b3c41c54df).forEach(function(name) {
  if (!Object.prototype.hasOwnProperty.call(__stxLiveBindings, name))
    Object.defineProperty(__stxLiveBindings, name, Object.getOwnPropertyDescriptor(__stxBundle_13b3c41c54df, name));
});