/* 曲线类
 * @Author: fengyang 
 * @Date: 2018-10-25 14:56:20 
 * @Last Modified by: fengyang
 * @Last Modified time: 2018-10-30 17:23:05
 */
import { radius, fillColor, borderColor, rectfillStyle ,lineColor} from './Global.js'
const globalAlpha = 0.85
//画圆
export let fillCircle = (context, startX, startY, radius, fillStyle, strokeStyle) => {
  context.globalAlpha = globalAlpha;
  context.beginPath();
  context.arc(startX, startY, radius, 0, Math.PI * 2);
  context.fillStyle = fillStyle;
  context.strokeStyle = strokeStyle;
  context.fill();
  context.stroke();
}

export let drawLine = (context, polygon, strokeStyle,changeFirst=()=>{}) => {
  context.beginPath();
  context.lineWidth = 1;
  context.moveTo(polygon[0].x, polygon[0].y);
  for(let point of polygon){
    context.lineTo(point.x,point.y)
  }
  changeFirst(context, polygon);
  context.strokeStyle = strokeStyle;
  context.stroke();
}
//判断是否点击或者hover第一个圆
export let InFirstPolygon=(polygon, x, y)=>{
  let distance = Math.sqrt(Math.pow(polygon[0].x - x, 2)+
                 Math.pow(polygon[0].y - y,2));
  return distance<=polygon[0].radius + 10 ? true : false;
}
export let changeFirstPolygon = (context, polygon) =>{
    return context.lineTo(polygon[0].x,polygon[0].y);
}
/**封装绘制polygon函数，鼠标移入第一点或移出或点击，只需要配置first点的color radius*/
export let Polygoning=(polygon, context, borderColor, lineColor, firstColor, firstRadius,changeFirst=()=>{})=>{
  polygon[0].color = firstColor;
  polygon[0].radius = firstRadius;
  for(let val of polygon){
    fillCircle(context, val.x, val.y, val.radius, val.color, borderColor);
  }
  drawLine(context, polygon, lineColor,changeFirst);
}

//绘制polyon=[[(x,y),(x,y)],[..]]
export let drawPolygon = (context, signDictionary)=>{
  let fillStyle='';
  for(let val of signDictionary.polygon){  
    context.beginPath();
    context.moveTo(val[0].x, val[0].y);
    if (val[0].isSelected) context.fillStyle="rgba(237,208,112,0.5)";
     else  context.fillStyle="rgba(237,208,112,0)";
    for (let point of val){
      context.lineTo(point.x, point.y);
    }
    context.lineTo(val[0].x, val[0].y);
    context.fill();
    context.strokeStyle=borderColor;
    context.stroke();
    for(let point of val){
      fillCircle(context, point.x, point.y,point.radius, fillColor, borderColor)
    }
  }
}
//闭合曲线
export let closePath=(context, polygon)=>{
  context.beginPath();
  context.lineWidth = 1;
  context.moveTo(polygon[polygon.length-1].x, polygon[polygon.length-1].y);
  context.lineTo(polygon[0].x,polygon[0].y);
  context.strokeStyle = borderColor;
  context.stroke();
}