var delay = undefined;
var emit = undefined;
var items = undefined;
var onKey = undefined;
var openMenu = undefined;
var pressing = undefined;
var stop = undefined;
var target = undefined;
var title = undefined;
var __stxBundle_2113f313f2c5 = (function() {
var __stxMod0 = globalThis.__stxModules && globalThis.__stxModules["npm:@stacksjs/mobile"];
if (__stxMod0 === undefined) throw new Error("[stx] module " + "\"npm:@stacksjs/mobile\"" + " is not registered on this page (#1957)");
var haptics = __stxMod0["haptics"];
var observeLongPress = __stxMod0["observeLongPress"];
var showContextMenuFor = __stxMod0["showContextMenuFor"];
// storage/framework/stx/bundle-tmp/2113f313f2c5.ts

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
return { "delay": delay, "emit": emit, "items": items, "onKey": onKey, "openMenu": openMenu, "pressing": pressing, "stop": stop, "target": target, "title": title };
})();
delay = __stxBundle_2113f313f2c5["delay"];
emit = __stxBundle_2113f313f2c5["emit"];
items = __stxBundle_2113f313f2c5["items"];
onKey = __stxBundle_2113f313f2c5["onKey"];
openMenu = __stxBundle_2113f313f2c5["openMenu"];
pressing = __stxBundle_2113f313f2c5["pressing"];
stop = __stxBundle_2113f313f2c5["stop"];
target = __stxBundle_2113f313f2c5["target"];
title = __stxBundle_2113f313f2c5["title"];