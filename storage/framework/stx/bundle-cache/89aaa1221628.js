var HOLD = undefined;
var armed = undefined;
var bounce = undefined;
var destroyed = undefined;
var distance = undefined;
var emit = undefined;
var label = undefined;
var ptr = undefined;
var ptrClass = undefined;
var ptrStyle = undefined;
var refreshing = undefined;
var run = undefined;
var scrollHost = undefined;
var stop = undefined;
var threshold = undefined;
var tint = undefined;
var useGesture = undefined;
var __stxBundle_89aaa1221628 = (function() {
var __stxMod0 = globalThis.__stxModules && globalThis.__stxModules["npm:@stacksjs/mobile"];
if (__stxMod0 === undefined) throw new Error("[stx] module " + "\"npm:@stacksjs/mobile\"" + " is not registered on this page (#1957)");
var observeNativeRefresh = __stxMod0["observeNativeRefresh"];
var observePullToRefresh = __stxMod0["observePullToRefresh"];
var refresh = __stxMod0["refresh"];
var resolveScrollHost = __stxMod0["resolveScrollHost"];
var whenBridgeReady = __stxMod0["whenBridgeReady"];
// storage/framework/stx/bundle-tmp/89aaa1221628.ts

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
return { "HOLD": HOLD, "armed": armed, "bounce": bounce, "destroyed": destroyed, "distance": distance, "emit": emit, "label": label, "ptr": ptr, "ptrClass": ptrClass, "ptrStyle": ptrStyle, "refreshing": refreshing, "run": run, "scrollHost": scrollHost, "stop": stop, "threshold": threshold, "tint": tint, "useGesture": useGesture };
})();
HOLD = __stxBundle_89aaa1221628["HOLD"];
armed = __stxBundle_89aaa1221628["armed"];
bounce = __stxBundle_89aaa1221628["bounce"];
destroyed = __stxBundle_89aaa1221628["destroyed"];
distance = __stxBundle_89aaa1221628["distance"];
emit = __stxBundle_89aaa1221628["emit"];
label = __stxBundle_89aaa1221628["label"];
ptr = __stxBundle_89aaa1221628["ptr"];
ptrClass = __stxBundle_89aaa1221628["ptrClass"];
ptrStyle = __stxBundle_89aaa1221628["ptrStyle"];
refreshing = __stxBundle_89aaa1221628["refreshing"];
run = __stxBundle_89aaa1221628["run"];
scrollHost = __stxBundle_89aaa1221628["scrollHost"];
stop = __stxBundle_89aaa1221628["stop"];
threshold = __stxBundle_89aaa1221628["threshold"];
tint = __stxBundle_89aaa1221628["tint"];
useGesture = __stxBundle_89aaa1221628["useGesture"];