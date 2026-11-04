var className = undefined;
var image = undefined;
var size = undefined;
var symbolClass = undefined;
var symbolName = undefined;
var symbolStyle = undefined;
var symbols = undefined;
var weight = undefined;
var __stxBundle_7f07e0eed1a1 = (function() {
var __stxMod0 = globalThis.__stxModules && globalThis.__stxModules["npm:@stacksjs/mobile"];
if (__stxMod0 === undefined) throw new Error("[stx] module " + "\"npm:@stacksjs/mobile\"" + " is not registered on this page (#1957)");
var symbols = __stxMod0["symbols"];
// .stx-client-7f07e0eed1a1-38228-e81db924-afb1-407c-acb0-5576662e8369.ts

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
return { get "className"() { return className }, get "image"() { return image }, get "size"() { return size }, get "symbolClass"() { return symbolClass }, get "symbolName"() { return symbolName }, get "symbolStyle"() { return symbolStyle }, get "symbols"() { return symbols }, get "weight"() { return weight } };
})();
className = __stxBundle_7f07e0eed1a1["className"];
image = __stxBundle_7f07e0eed1a1["image"];
size = __stxBundle_7f07e0eed1a1["size"];
symbolClass = __stxBundle_7f07e0eed1a1["symbolClass"];
symbolName = __stxBundle_7f07e0eed1a1["symbolName"];
symbolStyle = __stxBundle_7f07e0eed1a1["symbolStyle"];
symbols = __stxBundle_7f07e0eed1a1["symbols"];
weight = __stxBundle_7f07e0eed1a1["weight"];
var __stxLiveBindings = typeof __stxLiveBindings === 'undefined' ? {} : __stxLiveBindings;
Object.keys(__stxBundle_7f07e0eed1a1).forEach(function(name) {
  if (!Object.prototype.hasOwnProperty.call(__stxLiveBindings, name))
    Object.defineProperty(__stxLiveBindings, name, Object.getOwnPropertyDescriptor(__stxBundle_7f07e0eed1a1, name));
});