/*
 * @Author: fengyang 
 * @Date: 2018-10-30 12:04:08 
 * @Last Modified by: fengyang
 * @Last Modified time: 2018-10-30 17:23:39
 * 逻辑：
 *   1.signDictionary{rect:[],polygon:[]..}包含矩形和多边形数组
 *   rect,页面有一个临时的rect,用来保存鼠标拖拽矩形过程中保存信息的临时变量，当up事件弹出框，确定则push进signDictionary.rect
 *   polygon,polyon区别于rect，当rect抬起的时候就需要确定是否保存当前rect（弹出框）,但是polygon每次鼠标抬起就会绘制一个点
 *   直到曲线闭合的时候,才会弹出框选择是否push进signDictionary.polygon,所以临时的polygon也是保存当前这个图形的点的信息，
 *   页面上的hover第一个点的判断就是基于临时数组，所以自动吸附的绘制与刷新操作中，不仅需要刷新绘制signDictionary已经保存的点
 *   也还需要绘制临时的polygon。
 *   2.绘制矩形中，需要不停刷新画布(先清除，然后绘制已经加入signDictionary的各自数组)，然后在执行recting绘制中
 *   绘制多边形只有hover firstPolygon 才去刷新。
 */

import { drawRect, Recting } from './Rect'
import { drawPolygon } from './polygon'
export function getDom(id) {
  return document.getElementById(id)
}
/**
 * 设置鼠标hove flag
 */
export let setSelect = (signDictionary, signInfo) => {
    for (let value of signDictionary.rects) {
      value.isSelected = false;
    }
    for (let value of signDictionary.polygon) {
      value[0].isSelected = false;
    }

  let info = signInfo.split('-');
  if (info[0] == "rect") {
    for (let value of signDictionary.rects) {
      value.isSelected = false;
    }
    signDictionary.rects[parseInt(info[1])].isSelected = true;
  }
  if(info[0] == 'polygon'){
    signDictionary.polygon[parseInt(info[1])][0].isSelected = true;
  }
}

/** 
 * 刷新画布，执行isSelected
*/
export let refreshCanvas = (canvas, signDictionary) => {
  let context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(context, signDictionary);
  drawPolygon(context, signDictionary);
  //drawPolygon(...)
}

/** 获取元素内鼠标位置*/
function captureMousePosition(element) {
  let mouse = { x: 0, y: 0 };
  element.addEventListener('mousemove', function (event) {
    let x, y;
    if (event.pageX || event.pageY) {
      x = event.pageX;
      y = event.pageY;
    } else {
      x = event.clientX + (document.body.scrollLeft ||
        document.documentElement.scrollLeft);
      y = event.clientY + (document.body.scrollTop ||
        document.documentElement.scrollTop);
    }
    x -= element.offsetLeft;
    y -= element.offsetTop;
    mouse.x = x;
    mouse.y = y;
  }, false);
  return mouse;
};

/** 
 * 转换样式 
 * 返回鼠标
*/
export let mapCursor = {
  'rect'() {
    return 'pointer'
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
