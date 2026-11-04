var actions = undefined;
var cancelLabel = undefined;
var emit = undefined;
var message = undefined;
var open = undefined;
var showing = undefined;
var title = undefined;
var __stxBundle_e1c4b40c47a6 = (function() {
var __stxMod0 = globalThis.__stxModules && globalThis.__stxModules["npm:@stacksjs/mobile"];
if (__stxMod0 === undefined) throw new Error("[stx] module " + "\"npm:@stacksjs/mobile\"" + " is not registered on this page (#1957)");
var dialog = __stxMod0["dialog"];
// storage/framework/stx/bundle-tmp/e1c4b40c47a6.ts

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
return { "actions": actions, "cancelLabel": cancelLabel, "emit": emit, "message": message, "open": open, "showing": showing, "title": title };
})();
actions = __stxBundle_e1c4b40c47a6["actions"];
cancelLabel = __stxBundle_e1c4b40c47a6["cancelLabel"];
emit = __stxBundle_e1c4b40c47a6["emit"];
message = __stxBundle_e1c4b40c47a6["message"];
open = __stxBundle_e1c4b40c47a6["open"];
showing = __stxBundle_e1c4b40c47a6["showing"];
title = __stxBundle_e1c4b40c47a6["title"];