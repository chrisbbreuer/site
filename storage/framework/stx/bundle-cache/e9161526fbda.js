var className = undefined;
var image = undefined;
var size = undefined;
var symbolClass = undefined;
var symbolName = undefined;
var symbolStyle = undefined;
var weight = undefined;
var __stxBundle_e9161526fbda = (function() {
var __stxMod0 = globalThis.__stxModules && globalThis.__stxModules["npm:@stacksjs/mobile"];
if (__stxMod0 === undefined) throw new Error("[stx] module " + "\"npm:@stacksjs/mobile\"" + " is not registered on this page (#1957)");
var symbols = __stxMod0["symbols"];
// storage/framework/stx/bundle-tmp/e9161526fbda.ts

var symbolName = useReactiveProp("name", "");
var size = useReactiveProp("size", 0);
var weight = useReactiveProp("weight", "regular");
var className = useReactiveProp("class", "");
var image = state(null);
effect(() => {
  const name = symbolName();
  if (!name)
    return;
  const options = { pointSize: Number(size()) || 17, weight: weight() };
  const known = symbols.cached(name, options);
  if (known !== undefined) {
    image.set(known);
    return;
  }
  symbols.image(name, options).then((url) => {
    if (symbolName() === name)
      image.set(url);
  });
});
var symbolClass = derived(() => `${image() ? "is-symbol " : ""}${className()}`.trim());
var symbolStyle = derived(() => {
  const px = Number(size()) || 0;
  return `${image() ? `--native-symbol:url("${image()}");` : ""}${px ? `font-size:${px}px;` : ""}`;
});
return { "className": className, "image": image, "size": size, "symbolClass": symbolClass, "symbolName": symbolName, "symbolStyle": symbolStyle, "weight": weight };
})();
className = __stxBundle_e9161526fbda["className"];
image = __stxBundle_e9161526fbda["image"];
size = __stxBundle_e9161526fbda["size"];
symbolClass = __stxBundle_e9161526fbda["symbolClass"];
symbolName = __stxBundle_e9161526fbda["symbolName"];
symbolStyle = __stxBundle_e9161526fbda["symbolStyle"];
weight = __stxBundle_e9161526fbda["weight"];