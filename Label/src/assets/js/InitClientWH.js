import {getDom} from 'common/js/Assistant.js'
// const CLIENT_HEIGHT = document.documentElement.clientHeight;
// const CLIENT_WIDTH = document.documentElement.clientWidth;

const OFFSET = 3
export function InitWH (id, parentID) {
  const CV = getDom(id)
  const PARENT_DOM = getDom(parentID)
  CV.width = PARENT_DOM.clientWidth;
  CV.height = PARENT_DOM.clientHeight - OFFSET
}

export let InitBoxPosition=(height, style, clickX, clickY)=>{
  style.display = style.display=='block'?'none':'block';
  if(style.display=='none') return;
  style.left = clickX-20+'px';
  if(clickY<=(height/2)){
    style.top = clickY+25+'px';
    style.area='top'
  }
  else{
    style.top = clickY+25-300+'px';
    style.area=''
  }
}
