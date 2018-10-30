/* 曲线类
 * @Author: fengyang 
 * @Date: 2018-10-25 14:56:20 
 * @Last Modified by: fengyang
 * @Last Modified time: 2018-10-29 18:18:38
 */
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

export let drawLine = (context, polygon, strokeStyle) => {
  context.beginPath();
  context.lineWidth = 1;
  context.moveTo(polygon[0].x, polygon[0].y);
  for(let point of polygon){
    context.lineTo(point.x,point.y)
  }
  context.strokeStyle = strokeStyle;
  context.stroke();
}
//判断是否点击或者hover第一个圆
export let InFirstPolygon=(polygon, x, y)=>{
  let distance = Math.sqrt(Math.pow(polygon[0].x - x, 2)+
                 Math.pow(polygon[0].y - y,2));
  return distance<=polygon[0].radius + 10 ? true : false;
}