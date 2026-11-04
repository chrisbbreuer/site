var SHEET_LAYER = undefined;
var carded = undefined;
var close = undefined;
var closeOverlay = undefined;
var coverTabBar = undefined;
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
var liftToBody = undefined;
var observeSheetDrag = undefined;
var open = undefined;
var openOverlay = undefined;
var openedOn = undefined;
var overlayId = undefined;
var panel = undefined;
var present = undefined;
var presentPageAsCard = undefined;
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
var __stxBundle_98f43a2fb3fb = (function() {
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
// .stx-client-98f43a2fb3fb-38228-36ece957-ddf6-4d11-9b2a-b2de86fd93f7.ts


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
return { get "SHEET_LAYER"() { return SHEET_LAYER }, get "carded"() { return carded }, set "carded"(__stxValue_carded) { carded = __stxValue_carded }, get "close"() { return close }, get "closeOverlay"() { return closeOverlay }, get "coverTabBar"() { return coverTabBar }, get "currentPath"() { return currentPath }, get "detent"() { return detent }, get "detents"() { return detents }, get "detentsProp"() { return detentsProp }, get "dismissed"() { return dismissed }, get "doneLabel"() { return doneLabel }, get "emit"() { return emit }, get "grabber"() { return grabber }, get "hasDetents"() { return hasDetents }, get "header"() { return header }, get "liftToBody"() { return liftToBody }, get "observeSheetDrag"() { return observeSheetDrag }, get "open"() { return open }, get "openOverlay"() { return openOverlay }, get "openedOn"() { return openedOn }, set "openedOn"(__stxValue_openedOn) { openedOn = __stxValue_openedOn }, get "overlayId"() { return overlayId }, get "panel"() { return panel }, get "present"() { return present }, get "presentPageAsCard"() { return presentPageAsCard }, get "presented"() { return presented }, set "presented"(__stxValue_presented) { presented = __stxValue_presented }, get "putBack"() { return putBack }, set "putBack"(__stxValue_putBack) { putBack = __stxValue_putBack }, get "root"() { return root }, get "sheetClass"() { return sheetClass }, get "sheetPanel"() { return sheetPanel }, get "sheetRoot"() { return sheetRoot }, get "shown"() { return shown }, get "stopDrag"() { return stopDrag }, set "stopDrag"(__stxValue_stopDrag) { stopDrag = __stxValue_stopDrag }, get "title"() { return title }, get "wasOpen"() { return wasOpen }, set "wasOpen"(__stxValue_wasOpen) { wasOpen = __stxValue_wasOpen } };
})();
SHEET_LAYER = __stxBundle_98f43a2fb3fb["SHEET_LAYER"];
carded = __stxBundle_98f43a2fb3fb["carded"];
close = __stxBundle_98f43a2fb3fb["close"];
closeOverlay = __stxBundle_98f43a2fb3fb["closeOverlay"];
coverTabBar = __stxBundle_98f43a2fb3fb["coverTabBar"];
currentPath = __stxBundle_98f43a2fb3fb["currentPath"];
detent = __stxBundle_98f43a2fb3fb["detent"];
detents = __stxBundle_98f43a2fb3fb["detents"];
detentsProp = __stxBundle_98f43a2fb3fb["detentsProp"];
dismissed = __stxBundle_98f43a2fb3fb["dismissed"];
doneLabel = __stxBundle_98f43a2fb3fb["doneLabel"];
emit = __stxBundle_98f43a2fb3fb["emit"];
grabber = __stxBundle_98f43a2fb3fb["grabber"];
hasDetents = __stxBundle_98f43a2fb3fb["hasDetents"];
header = __stxBundle_98f43a2fb3fb["header"];
liftToBody = __stxBundle_98f43a2fb3fb["liftToBody"];
observeSheetDrag = __stxBundle_98f43a2fb3fb["observeSheetDrag"];
open = __stxBundle_98f43a2fb3fb["open"];
openOverlay = __stxBundle_98f43a2fb3fb["openOverlay"];
openedOn = __stxBundle_98f43a2fb3fb["openedOn"];
overlayId = __stxBundle_98f43a2fb3fb["overlayId"];
panel = __stxBundle_98f43a2fb3fb["panel"];
present = __stxBundle_98f43a2fb3fb["present"];
presentPageAsCard = __stxBundle_98f43a2fb3fb["presentPageAsCard"];
presented = __stxBundle_98f43a2fb3fb["presented"];
putBack = __stxBundle_98f43a2fb3fb["putBack"];
root = __stxBundle_98f43a2fb3fb["root"];
sheetClass = __stxBundle_98f43a2fb3fb["sheetClass"];
sheetPanel = __stxBundle_98f43a2fb3fb["sheetPanel"];
sheetRoot = __stxBundle_98f43a2fb3fb["sheetRoot"];
shown = __stxBundle_98f43a2fb3fb["shown"];
stopDrag = __stxBundle_98f43a2fb3fb["stopDrag"];
title = __stxBundle_98f43a2fb3fb["title"];
wasOpen = __stxBundle_98f43a2fb3fb["wasOpen"];
var __stxLiveBindings = typeof __stxLiveBindings === 'undefined' ? {} : __stxLiveBindings;
Object.keys(__stxBundle_98f43a2fb3fb).forEach(function(name) {
  if (!Object.prototype.hasOwnProperty.call(__stxLiveBindings, name))
    Object.defineProperty(__stxLiveBindings, name, Object.getOwnPropertyDescriptor(__stxBundle_98f43a2fb3fb, name));
});