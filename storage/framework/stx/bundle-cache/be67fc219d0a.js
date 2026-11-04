var HOLD = undefined;
var armed = undefined;
var bounce = undefined;
var destroyed = undefined;
var distance = undefined;
var emit = undefined;
var label = undefined;
var observeNativeRefresh = undefined;
var observePullToRefresh = undefined;
var ptr = undefined;
var ptrClass = undefined;
var ptrStyle = undefined;
var refresh = undefined;
var refreshing = undefined;
var resolveScrollHost = undefined;
var run = undefined;
var scrollHost = undefined;
var stop = undefined;
var threshold = undefined;
var tint = undefined;
var useGesture = undefined;
var whenBridgeReady = undefined;
var __stxBundle_be67fc219d0a = (function() {
var __stxMod0 = globalThis.__stxModules && globalThis.__stxModules["npm:@stacksjs/mobile"];
if (__stxMod0 === undefined) throw new Error("[stx] module " + "\"npm:@stacksjs/mobile\"" + " is not registered on this page (#1957)");
var observeNativeRefresh = __stxMod0["observeNativeRefresh"];
var observePullToRefresh = __stxMod0["observePullToRefresh"];
var refresh = __stxMod0["refresh"];
var resolveScrollHost = __stxMod0["resolveScrollHost"];
var whenBridgeReady = __stxMod0["whenBridgeReady"];
// .stx-client-be67fc219d0a-38228-e9a3081e-1469-4667-bb1c-5f240d1aa8c0.ts

var emit = defineEmits(["refresh"]);
var threshold = useReactiveProp("threshold", 72);
var label = useReactiveProp("label", "Refreshing");
var scrollHost = useReactiveProp("scrollHost", "");
var tint = useReactiveProp("tint", "");
var distance = state(0);
var bounce = state(0);
var armed = state(false);
var refreshing = state(false);
var ptr = useRef("nativePtr");
var stop = null;
var destroyed = false;
var HOLD = 56;
function run() {
  return new Promise((resolve) => {
    refreshing.set(true);
    const finish = () => {
      clearTimeout(timer);
      refreshing.set(false);
      resolve();
    };
    const timer = setTimeout(finish, 15000);
    emit("refresh", { done: finish });
  });
}
function useGesture() {
  stop = observePullToRefresh({
    threshold: threshold(),
    host: resolveScrollHost(scrollHost()),
    onPull: (pulled, isArmed, pull) => {
      distance.set(pulled);
      bounce.set(pull.bounce);
      armed.set(isArmed);
    },
    onRefresh: run
  });
}
onMount(() => {
  const element = ptr.current;
  whenBridgeReady(3000).then(() => {
    if (destroyed)
      return;
    if (element && !scrollHost() && refresh.isAvailable()) {
      stop = observeNativeRefresh(element, {
        tintColor: tint() || undefined,
        onRefresh: () => new Promise((resolve) => {
          const timer = setTimeout(resolve, 15000);
          const finish = () => {
            clearTimeout(timer);
            resolve();
          };
          emit("refresh", { done: finish });
        })
      });
    } else {
      useGesture();
    }
  });
});
onDestroy(() => {
  destroyed = true;
  stop?.();
});
var ptrClass = derived(() => {
  const pulling = !refreshing() && distance() > 0;
  return `${pulling ? "is-pulling" : ""}${refreshing() ? " is-refreshing" : ""}${armed() ? " is-armed" : ""}${refreshing() || distance() > 4 ? " is-visible" : ""}`.trim();
});
var ptrStyle = derived(() => {
  const shift = refreshing() ? HOLD : Math.max(0, distance() - bounce());
  const progress = refreshing() ? 1 : Math.min(1, distance() / Math.max(1, threshold()));
  return `--native-ptr-shift:${Math.round(shift)}px;--native-ptr-progress:${progress.toFixed(3)}`;
});
return { get "HOLD"() { return HOLD }, get "armed"() { return armed }, get "bounce"() { return bounce }, get "destroyed"() { return destroyed }, set "destroyed"(__stxValue_destroyed) { destroyed = __stxValue_destroyed }, get "distance"() { return distance }, get "emit"() { return emit }, get "label"() { return label }, get "observeNativeRefresh"() { return observeNativeRefresh }, get "observePullToRefresh"() { return observePullToRefresh }, get "ptr"() { return ptr }, get "ptrClass"() { return ptrClass }, get "ptrStyle"() { return ptrStyle }, get "refresh"() { return refresh }, get "refreshing"() { return refreshing }, get "resolveScrollHost"() { return resolveScrollHost }, get "run"() { return run }, get "scrollHost"() { return scrollHost }, get "stop"() { return stop }, set "stop"(__stxValue_stop) { stop = __stxValue_stop }, get "threshold"() { return threshold }, get "tint"() { return tint }, get "useGesture"() { return useGesture }, get "whenBridgeReady"() { return whenBridgeReady } };
})();
HOLD = __stxBundle_be67fc219d0a["HOLD"];
armed = __stxBundle_be67fc219d0a["armed"];
bounce = __stxBundle_be67fc219d0a["bounce"];
destroyed = __stxBundle_be67fc219d0a["destroyed"];
distance = __stxBundle_be67fc219d0a["distance"];
emit = __stxBundle_be67fc219d0a["emit"];
label = __stxBundle_be67fc219d0a["label"];
observeNativeRefresh = __stxBundle_be67fc219d0a["observeNativeRefresh"];
observePullToRefresh = __stxBundle_be67fc219d0a["observePullToRefresh"];
ptr = __stxBundle_be67fc219d0a["ptr"];
ptrClass = __stxBundle_be67fc219d0a["ptrClass"];
ptrStyle = __stxBundle_be67fc219d0a["ptrStyle"];
refresh = __stxBundle_be67fc219d0a["refresh"];
refreshing = __stxBundle_be67fc219d0a["refreshing"];
resolveScrollHost = __stxBundle_be67fc219d0a["resolveScrollHost"];
run = __stxBundle_be67fc219d0a["run"];
scrollHost = __stxBundle_be67fc219d0a["scrollHost"];
stop = __stxBundle_be67fc219d0a["stop"];
threshold = __stxBundle_be67fc219d0a["threshold"];
tint = __stxBundle_be67fc219d0a["tint"];
useGesture = __stxBundle_be67fc219d0a["useGesture"];
whenBridgeReady = __stxBundle_be67fc219d0a["whenBridgeReady"];
var __stxLiveBindings = typeof __stxLiveBindings === 'undefined' ? {} : __stxLiveBindings;
Object.keys(__stxBundle_be67fc219d0a).forEach(function(name) {
  if (!Object.prototype.hasOwnProperty.call(__stxLiveBindings, name))
    Object.defineProperty(__stxLiveBindings, name, Object.getOwnPropertyDescriptor(__stxBundle_be67fc219d0a, name));
});