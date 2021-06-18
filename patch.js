import h from './h.js';
import vnode from './vnode.js'
export default function(oldVnode,newVnode){
    if(oldVnode.sel===""||!oldVnode.sel){
        oldVnode = vnode(oldVnode.tagName.toLowerCase(),{},[],undefined,oldVnode)
    }
    if(oldVnode.key&&oldVnode.key === newVnode.key&&oldVnode.sel===newVnode.sel){
        // TODO精细比较
    }else{
        let newRealNode = newElement(newVnode);
        console.log(newRealNode,oldVnode.elm);
        oldVnode.elm.parentNode.insertBefore(newRealNode,oldVnode.elm);
        oldVnode.elm.parentNode.removeChild(oldVnode.elm);
    }
}
function newElement(vnode){
    let realDom = document.createElement(vnode.sel);
    if(vnode.text&&(!vnode.children||vnode.children.length>0)){
        realDom.innerText = vnode.text;
    }else if(Array.isArray(vnode.children)&&vnode.children.length!==0){
        for(let child in vnode.children){
            let cureentDom = newElement(vnode.children[child])
            realDom.appendChild(cureentDom);
        }
    }
    vnode.elm = realDom;
    return vnode.elm;
}