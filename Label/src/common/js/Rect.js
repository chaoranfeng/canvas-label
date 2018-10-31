/* Draw Rect!
 * @Author: fengyang 
 * @Date: 2018-10-2radius 10:radius9:4radius 
 * @Last Modified by: fengyang
 * @Last Modified time: 2018-10-31 14:16:35
 */
/**
 * 箭头函数传参,如果在其他vue页面调用此脚本中的箭头函数 例如let a=(val)=>{..changevalue}
 * 传递参数一定会为this.value这种写法的 例如 a(this.name),会将this传递进箭头函数
 * 但是，箭头函数内部读取到this的时候，因为箭头函数的this指向定义的位置，
 * 所以当传递this的时候，箭头函数会将传递的this指向当前脚本定义的位置，这个js文件
 * 因此如果在箭头函数内部修改这个值，并不会映射到这个vue页面的值，例如上面的this.name,
 * 如果传递引用类型，a(this.obj),则将this.obj传递进箭头函数时，会将vue页面的this.obj对应的内存中的指针
 * 赋值给当前js脚本的this.obj(箭头函数传递后，this引用改变，相当于会在当前脚本创建了一个obj)，
 * 但是尽管不是同一个obj，但是引用却指向同一块内存，所以传递引用类型进行修改会映射到原来的值
 */
import { fillCircle } from './polygon.js'
import { radius, fillColor, borderColor, rectfillStyle ,lineColor} from './Global.js'
/** 
 * 绘制中 Recting
*/
export let Recting = (context, x, y, width, height) => {
  context.strokeStyle = lineColor;
  context.strokeRect(x, y, width, height);
  context.fillStyle = fillColor;
  // 绘制圆圈,
  fillCircle(context, x, y, radius, fillColor, borderColor);
  fillCircle(context, x + width, y + height, radius, fillColor, borderColor)
}

/**
 * 绘制矩形数组
 */
export let drawRect = (context, signDictionary) => {
  for (let value of signDictionary.rects) {
    /**填充已选择的矩形*/
    if (value.isSelected) {
      context.fillStyle = rectfillStyle;/*设置填充颜色*/
      context.fillRect(value.x, value.y, value.width, value.height);
    }
    
    Recting(context, value.x, value.y, value.width, value.height);
  }
}
/** 
 * previousSelected 选中的形状 
*/
export let judgeIsInRect=(signDictionary, clickX, clickY, select,distance)=>{
  for(let i=0;i<signDictionary.rects.length;i++){
    let startW = signDictionary.rects[i].x;
    let endW = signDictionary.rects[i].x+signDictionary.rects[i].width;
    let startH = signDictionary.rects[i].y;
    let endH = signDictionary.rects[i].y+signDictionary.rects[i].height;
    //点击在矩形内，4个边界进行判断，radius为可拖拽点预留的空间
    if ((clickX>(startW+radius)&&clickX<(endW-radius))&&(clickY>(startH+radius))&&(clickY<(endH-radius))) {
      select.previousSelectedIndex= i;
      //鼠标距离矩形
      distance.distanceX=clickX-signDictionary.rects[i].x;
      distance.distanceY=clickY-signDictionary.rects[i].y;
      signDictionary.rects.forEach((item)=>{item.isSelected=false;})
      signDictionary.rects[i].isSelected=true;
       //鼠标距离矩形
      return 'drag'
    }
    /**判断点击点与圆心距离是否小于半径*/
    let clickDistanceLeft=Math.sqrt(Math.pow(startW - clickX, 2)+ Math.pow(startH - clickY, 2));
    let clickDistanceBottom=Math.sqrt(Math.pow(endW - clickX, 2)+ Math.pow(endH - clickY, 2));
    if(clickDistanceLeft<=radius) {
      select.previousSelectedIndex= i;
      return 'dragtop'
    }
    if(clickDistanceBottom<=radius) {
      select.previousSelectedIndex= i;
      return 'dragbottom'
    }
  }
  return null
}