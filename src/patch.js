import h from './h.js';
import vnode from './vnode.js'
import refinement,{sameVnode} from './refinement.js'
export default function(oldVnode,newVnode){
    if(oldVnode.sel===""||!oldVnode.sel){
        oldVnode = vnode(oldVnode.tagName.toLowerCase(),{},[],undefined,oldVnode)
    }
    // console.log(oldVnode,newVnode);
    if(sameVnode(oldVnode,newVnode)){
        if(oldVnode===newVnode){
            return;//完全一致
        }
        if(newVnode.text!==undefined&&(newVnode.children===undefined||newVnode.children.length===0)){
            if(newVnode.text!==oldVnode.text){
                oldVnode.elm.innerText = newVnode.text;
            }
        }else{
            if(oldVnode.children===undefined||oldVnode.children.length===0){
                oldVnode.elm.innerText=null;
                for(let child in newVnode.children){
                    oldVnode.elm.appendChild(newElement(newVnode.children[child]))
                }
            }else{
                // TODO 精细化比较
                refinement(oldVnode.elm,oldVnode.children,newVnode.children)
            }
        }
    }else{
        let newRealNode = newElement(newVnode);
        // console.log(newRealNode,oldVnode.elm);
        oldVnode.elm.parentNode.insertBefore(newRealNode,oldVnode.elm);
        oldVnode.elm.parentNode.removeChild(oldVnode.elm);
    }
}
export function newElement(vnode){
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