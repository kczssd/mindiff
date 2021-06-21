import h from "./h.js";
import patch from "./patch.js";

const container = document.querySelector("#container");
let virtualNode = h("ol", {}, [
    h('li',{key:'A'},"A"),
    h('li',{key:'B'},"B"),
    h('li',{key:'C'},"C"),
    h('li',{key:'D'},"D")

]);
patch(container, virtualNode);
let virtualNode2 = h("ol", {}, [
  h('li',{key:'A'},"A"),
  h('li',{key:'B'},"B"),
  h('li',{key:'Q'},"Q"),
  h('li',{key:'C'},"C"),
  h('li',{key:'E'},"E"),
  h('li',{key:'D'},"D")
]);
setTimeout(() => {
  patch(virtualNode, virtualNode2);
}, 2000);
