import patch,{newElement} from './patch.js'

let keyMap=null;//TODO Map()

export function sameVnode(a,b){
    return a.data.key===b.data.key&&a.sel===b.sel;
}
export default function(parentNode,oldCh,newCh){
    let oldFront=0,oldEnd=oldCh.length-1;
    let newFront=0,newEnd=newCh.length-1;
    let oldFrontDom=oldCh[oldFront],oldEndDom=oldCh[oldEnd];
    let newFrontDom=newCh[newFront],newEndDom=newCh[newEnd];
    while(oldFront<=oldEnd&&newFront<=newEnd){
        console.log(oldFront,oldEnd,newFront,newEnd);
        switch(true){
            case oldFrontDom==null:
                oldFrontDom=oldCh[++oldFront];
                break;
            case oldEndDom==null:
                oldEndDom=oldCh[--oldEnd];
                break;
            case sameVnode(oldFrontDom,newFrontDom):
                console.log('choose1');
                patch(oldFrontDom,newFrontDom);
                oldFrontDom = oldCh[++oldFront];
                newFrontDom = newCh[++newFront];
                break;
            case sameVnode(oldEndDom,newEndDom):
                console.log('choose2');
                patch(oldEndDom,newEndDom);
                oldEndDom = oldCh[--oldEnd];
                newEndDom = newCh[--newEnd];
                break;
            case sameVnode(newEndDom,oldFrontDom):
                console.log('choose3');    
                patch(newEndDom,oldFrontDom);
                parentNode.insertBefore(oldFrontDom.elm,oldEndDom.elm.nextSibling)
                newEndDom = newCh[--newEnd];
                oldFrontDom = oldCh[++oldFront];
                break;
            case sameVnode(newFrontDom,oldEndDom):
                console.log('choose4');
                patch(newFrontDom,oldEndDom);
                parentNode.insertBefore(oldEndDom.elm,oldFrontDom.elm)
                newFrontDom = newCh[++newFront];
                oldEndDom = oldCh[--oldEnd];
                break;
            default:
                if(!keyMap){
                    keyMap={};
                    for(let i=oldFront;i<=oldEnd;i++){
                        const key = oldCh[i].data.key;
                        if(key!==undefined){
                            keyMap[key] = i;
                        }
                    }
                }
                const curr = keyMap[newFrontDom.data.key];
                console.log(curr);
                if(curr==undefined){
                    // add
                    parentNode.insertBefore(newElement(newFrontDom),oldFrontDom.elm)
                }else{
                    // move
                    const oldM = oldCh[curr];
                    console.log(oldM,newFrontDom);
                    patch(oldM,newFrontDom);
                    oldCh[curr]=undefined;
                    parentNode.insertBefore(oldM.elm,oldFrontDom.elm)
                    console.log(parentNode);
                }
                newFrontDom=newCh[++newFront];
                console.log(oldFront,oldEnd,newFront,newEnd);
                break;
                
        }
    }
    console.log(oldFront,oldEnd,newFront,newEnd);
    //新增
    if(newFront<=newEnd){
        console.log(oldCh[oldEnd+1]);
        const head = oldCh[oldEnd+1]==null?null:oldCh[oldEnd+1].elm;
        console.log(head);
        for(let i = newFront;i<=newEnd;i++){
            parentNode.insertBefore(newElement(newCh[i]),head);
        }
    }
    // 删除
    else if(oldFront<=oldEnd){
        for(let i = oldFront;i<=oldEnd;i++){
            if(oldCh[i]){
                parentNode.removeChild(oldCh[i].elm);
            }
        }
    }
}