var SHEET_LAYER = undefined;
var carded = undefined;
var close = undefined;
var currentPath = undefined;
var detent = undefined;
var detents = undefined;
var detentsProp = undefined;
var dismissed = undefined;
var doneLabel = undefined;
var emit = undefined;
var grabber = undefined;
var hasDetents = undefined;
var header = undefined;
var open = undefined;
var openedOn = undefined;
var overlayId = undefined;
var panel = undefined;
var present = undefined;
var presented = undefined;
var putBack = undefined;
var root = undefined;
var sheetClass = undefined;
var sheetPanel = undefined;
var sheetRoot = undefined;
var shown = undefined;
var stopDrag = undefined;
var title = undefined;
var wasOpen = undefined;
var __stxBundle_a5c472bad41f = (function() {
var __stxMod0 = globalThis.__stxModules && globalThis.__stxModules["npm:@stacksjs/components/overlays"];
if (__stxMod0 === undefined) throw new Error("[stx] module " + "\"npm:@stacksjs/components/overlays\"" + " is not registered on this page (#1957)");
var closeOverlay = __stxMod0["closeOverlay"];
var openOverlay = __stxMod0["openOverlay"];
var __stxMod1 = globalThis.__stxModules && globalThis.__stxModules["npm:@stacksjs/mobile"];
if (__stxMod1 === undefined) throw new Error("[stx] module " + "\"npm:@stacksjs/mobile\"" + " is not registered on this page (#1957)");
var coverTabBar = __stxMod1["coverTabBar"];
var liftToBody = __stxMod1["liftToBody"];
var observeSheetDrag = __stxMod1["observeSheetDrag"];
var presentPageAsCard = __stxMod1["presentPageAsCard"];
// storage/framework/stx/bundle-tmp/a5c472bad41f.ts


var emit = defineEmits(["close"]);
var open = useModel("open", { default: false });
var title = useReactiveProp("title", "");
var doneLabel = useReactiveProp("doneLabel", "Done");
var detentsProp = useReactiveProp("detents", "");
var detents = derived(() => {
  const raw = detentsProp();
  const list = Array.isArray(raw) ? raw : String(raw || "").split(/[\s,]+/);
  const valid = list.filter((value) => value === "medium" || value === "large");
  return valid.length ? valid : ["large"];
});
var hasDetents = derived(() => Boolean(detentsProp()) && detentsProp().length > 0);
var detent = state("large");
var shown = state(false);
var sheetRoot = useRef("nativeSheet");
var panel = useRef("nativeSheetPanel");
var grabber = useRef("nativeSheetGrabber");
var header = useRef("nativeSheetHeader");
var overlayId = useId("native-sheet");
var SHEET_LAYER = 70;
var presented = false;
var putBack = null;
var carded = false;
var stopDrag = null;
var openedOn = "";
function currentPath() {
  return root()?.ownerDocument.defaultView?.location.pathname ?? "";
}
function root() {
  return sheetRoot.current;
}
function sheetPanel() {
  return panel.current;
}
function present() {
  const element = root();
  if (!element || presented)
    return;
  presented = true;
  detent.set(detents()[0] ?? "large");
  putBack ??= liftToBody(element);
  openedOn = currentPath();
  coverTabBar(element, true);
  sheetPanel()?.getBoundingClientRect();
  shown.set(true);
  openOverlay(overlayId, {
    panel: sheetPanel,
    root: element,
    zIndex: SHEET_LAYER,
    initialFocus: sheetPanel,
    onEscape: close
  });
}
function dismissed() {
  if (!presented)
    return;
  presented = false;
  shown.set(false);
  const element = root();
  if (element)
    coverTabBar(element, false);
  closeOverlay(overlayId);
}
var wasOpen = false;
effect(() => {
  const isOpen = open();
  if (isOpen && !wasOpen)
    present();
  else if (!isOpen && wasOpen)
    dismissed();
  wasOpen = isOpen;
});
effect(() => {
  const element = root();
  const want = open() && hasDetents() && detent() === "large";
  if (!element || want === carded)
    return;
  carded = want;
  presentPageAsCard(element.ownerDocument, want);
});
function close() {
  open.set(false);
  emit("close");
}
onMount(() => {
  const element = root();
  if (element)
    putBack ??= liftToBody(element);
  const dragPanel = sheetPanel();
  if (!dragPanel)
    return;
  const handles = [grabber.current, header.current].filter(Boolean);
  stopDrag = observeSheetDrag({
    panel: dragPanel,
    handles,
    detents: () => detents(),
    detent: () => detent(),
    onSettle: (to) => {
      if (to === "dismiss")
        close();
      else
        detent.set(to);
    }
  });
  if (open())
    present();
});
onDestroy(() => {
  stopDrag?.();
  const element = root();
  if (element && presented)
    coverTabBar(element, false);
  presented = false;
  closeOverlay(overlayId);
  if (carded && element) {
    carded = false;
    presentPageAsCard(element.ownerDocument, false);
  }
  putBack?.();
});
useEventListener("stx:navigate", (event) => {
  if (!open())
    return;
  const url = event.detail?.url;
  const location = root()?.ownerDocument.defaultView?.location;
  const to = url ? new URL(url, location?.href).pathname : currentPath();
  if (to !== openedOn)
    close();
});
var sheetClass = derived(() => `${shown() ? "is-open" : ""}${hasDetents() ? " has-detents" : ""}${detent() === "medium" ? " is-medium" : ""}`.trim());
return { "SHEET_LAYER": SHEET_LAYER, "carded": carded, "close": close, "currentPath": currentPath, "detent": detent, "detents": detents, "detentsProp": detentsProp, "dismissed": dismissed, "doneLabel": doneLabel, "emit": emit, "grabber": grabber, "hasDetents": hasDetents, "header": header, "open": open, "openedOn": openedOn, "overlayId": overlayId, "panel": panel, "present": present, "presented": presented, "putBack": putBack, "root": root, "sheetClass": sheetClass, "sheetPanel": sheetPanel, "sheetRoot": sheetRoot, "shown": shown, "stopDrag": stopDrag, "title": title, "wasOpen": wasOpen };
})();
SHEET_LAYER = __stxBundle_a5c472bad41f["SHEET_LAYER"];
carded = __stxBundle_a5c472bad41f["carded"];
close = __stxBundle_a5c472bad41f["close"];
currentPath = __stxBundle_a5c472bad41f["currentPath"];
detent = __stxBundle_a5c472bad41f["detent"];
detents = __stxBundle_a5c472bad41f["detents"];
detentsProp = __stxBundle_a5c472bad41f["detentsProp"];
dismissed = __stxBundle_a5c472bad41f["dismissed"];
doneLabel = __stxBundle_a5c472bad41f["doneLabel"];
emit = __stxBundle_a5c472bad41f["emit"];
grabber = __stxBundle_a5c472bad41f["grabber"];
hasDetents = __stxBundle_a5c472bad41f["hasDetents"];
header = __stxBundle_a5c472bad41f["header"];
open = __stxBundle_a5c472bad41f["open"];
openedOn = __stxBundle_a5c472bad41f["openedOn"];
overlayId = __stxBundle_a5c472bad41f["overlayId"];
panel = __stxBundle_a5c472bad41f["panel"];
present = __stxBundle_a5c472bad41f["present"];
presented = __stxBundle_a5c472bad41f["presented"];
putBack = __stxBundle_a5c472bad41f["putBack"];
root = __stxBundle_a5c472bad41f["root"];
sheetClass = __stxBundle_a5c472bad41f["sheetClass"];
sheetPanel = __stxBundle_a5c472bad41f["sheetPanel"];
sheetRoot = __stxBundle_a5c472bad41f["sheetRoot"];
shown = __stxBundle_a5c472bad41f["shown"];
stopDrag = __stxBundle_a5c472bad41f["stopDrag"];
title = __stxBundle_a5c472bad41f["title"];
wasOpen = __stxBundle_a5c472bad41f["wasOpen"];