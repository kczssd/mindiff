import h from './h.js'
import patch from './patch.js'

const container = document.querySelector("#container");
let virtualNode = h('ol', {}, "sdf")
patch(container, virtualNode);
let virtualNode2 = h('ol', {}, [h('li', {}, h('ul', {}, [h('li', {}, '1'), h('li', {}, '2'), h('li', {}, '3')])), h('li', {}, '二'), h('li', {}, '三')])
setTimeout(() => {
    patch(virtualNode, virtualNode2);
}, 2000)
