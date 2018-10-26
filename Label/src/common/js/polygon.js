/* 曲线类
 * @Author: fengyang 
 * @Date: 2018-10-25 14:56:20 
 * @Last Modified by: fengyang
 * @Last Modified time: 2018-10-25 15:08:51
 */
const globalAlpha=0.85
export let fillCircle = (context, startX, startY, radius, fillStyle, strokeStyle)=>{
  context.globalAlpha = globalAlpha;
  context.beginPath();
  context.arc(startX, startY, radius, 0, Math.PI*2);
  context.fillStyle = fillStyle;
  context.strokeStyle = strokeStyle;
  context.fill();
  context.stroke();
}