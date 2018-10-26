import { drawRect, Recting} from './Rect'
export function getDom(id) {
  return document.getElementById(id)
}
/**
 * 设置鼠标hove flag
 */
export let setSelect=(signDictionary, signInfo)=>{
  if(signInfo==''){
    for(let value of signDictionary.rects){
      value.isSelected=false;
    }
  }
  let info = signInfo.split('-');
  if(info[0]=="rect"){
    for(let value of signDictionary.rects){
      value.isSelected=false;
    }
    signDictionary.rects[parseInt(info[1])].isSelected=true;
  }
}
/**
 * 绘制多边形和矩形都调用这个函数
 * 也就是绘制中，不仅需要绘制当前操作的图形，也要刷新画布绘制数组中的图形
 * 先判断当前状态，然后执行绘制中函数，执行当前绘制操作
 * 然后在各自执行绘制各个数组的操作
*/
export let Draw = (state,canvas, signDictionary, startX, startY, width = 5, height = 0)=>{
  let context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  if(state=='rect'){
    Recting(context, startX, startY, width, height)
  }
  else if(state=='polygon'){
    //Polygoning(...)
  }
  drawRect(context, signDictionary)
  //drawPolygon(...)
}

/** 
 * 刷新画布，执行isSelected
*/
export let refreshCanvas = (canvas, signDictionary)=>{
  let context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(context, signDictionary);
  //drawPolygon(...)
}
/** 
 * 转换样式 
 * 返回鼠标
*/
export let mapCursor = {
  'rect'() {
    return 'nw-resize'
  },
  'polygon'() {
    return 'crosshair'
  },
  'bezier'() {
    return 'crosshair'
  },
  'distance'() {
    return 'e-resize'
  },
  'move'() {
    return 'move'
  },
  'magnify'() {
    return 'pointer'
  }
}
