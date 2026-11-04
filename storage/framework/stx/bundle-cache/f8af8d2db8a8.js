var actions = undefined;
var cancelLabel = undefined;
var dialog = undefined;
var emit = undefined;
var message = undefined;
var open = undefined;
var showing = undefined;
var title = undefined;
var __stxBundle_f8af8d2db8a8 = (function() {
var __stxMod0 = globalThis.__stxModules && globalThis.__stxModules["npm:@stacksjs/mobile"];
if (__stxMod0 === undefined) throw new Error("[stx] module " + "\"npm:@stacksjs/mobile\"" + " is not registered on this page (#1957)");
var dialog = __stxMod0["dialog"];
// .stx-client-f8af8d2db8a8-38228-0042d942-947a-4a65-9314-e90a17581030.ts

var emit = defineEmits(["select", "close"]);
var open = useModel("open", { default: false });
var title = useReactiveProp("title", "");
var message = useReactiveProp("message", "");
var actions = useReactiveProp("actions", []);
var cancelLabel = useReactiveProp("cancelLabel", "Cancel");
var showing = false;
effect(() => {
  if (!open() || showing)
    return;
  showing = true;
  dialog.actionSheet({
    title: title() || undefined,
    message: message() || undefined,
    actions: actions(),
    cancelLabel: cancelLabel()
  }).then((id) => {
    showing = false;
    open.set(false);
    if (id)
      emit("select", id);
    emit("close");
  });
});
return { get "actions"() { return actions }, get "cancelLabel"() { return cancelLabel }, get "dialog"() { return dialog }, get "emit"() { return emit }, get "message"() { return message }, get "open"() { return open }, get "showing"() { return showing }, set "showing"(__stxValue_showing) { showing = __stxValue_showing }, get "title"() { return title } };
})();
actions = __stxBundle_f8af8d2db8a8["actions"];
cancelLabel = __stxBundle_f8af8d2db8a8["cancelLabel"];
dialog = __stxBundle_f8af8d2db8a8["dialog"];
emit = __stxBundle_f8af8d2db8a8["emit"];
message = __stxBundle_f8af8d2db8a8["message"];
open = __stxBundle_f8af8d2db8a8["open"];
showing = __stxBundle_f8af8d2db8a8["showing"];
title = __stxBundle_f8af8d2db8a8["title"];
var __stxLiveBindings = typeof __stxLiveBindings === 'undefined' ? {} : __stxLiveBindings;
Object.keys(__stxBundle_f8af8d2db8a8).forEach(function(name) {
  if (!Object.prototype.hasOwnProperty.call(__stxLiveBindings, name))
    Object.defineProperty(__stxLiveBindings, name, Object.getOwnPropertyDescriptor(__stxBundle_f8af8d2db8a8, name));
});