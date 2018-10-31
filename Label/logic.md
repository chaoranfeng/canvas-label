### 业务逻辑
signDictionary:{
  rect:[{x,y.width.height..},{x,y.width.height..}],
  polygon:[[(x,y),(x,y)..],[(x,y),(x,y)..]]
}
## 多边形拖拽移动图形的鼠标位置赋值逻辑

onmousedown=> clickX、clickY
onmousemove=> pagex、pagey

最开始的逻辑：


错误实现：
1.得到鼠标移动过程中的offseX=pagex-clickX，offsetY=pagey-clickY 移动距离
2.然后循环数组所有点中加上这个这个距离差，也就是鼠标移动多少，那么图形也应该移动多少距离；
onmousemove(){
  for(let point of signDictionary.polygon[index]){
    ponit.x = point.x + offseX;
    point.y = point.y + offsetY
  }
}
index:已取到的点击某个多边形的index

这样的point.x每次都是用上一次的位置+（现在的鼠标位置与最初的鼠标点击的位置差），这就造成成倍的增加，
应该为point.x=point.x(最初点击的位置)+offsetX，需要在最开始点击的时候维护一个数组保存多边形的起始位置


另一种思路：
点击图形内部，取到clickX、clickY,然后新建一个数组，然后循环求得每一点与click的位置差，push进数组
计算distance.push{offseX:clickX-point.x, offsetY:clickY-point.y},这样有多少点就有多少个{}obj,
然后在鼠标移动的时候，无需维护最初的起始点数组，每次移动，都用此时鼠标位置，循环减去distance数组中各项的距离差
也就得到了此时每一点的距离，因为无论怎么移动，每一点最后都与鼠标位置相差的相对距离不变

实现：polygon.js=>drawPolygon
判断当点击多边形内部的时候，记录此时的索引，并且创建distance对象，push每一点与点击位置的距离差
for(let i =0...)
 for(let j=0;j<points[i].length;j++){
      distance.polygonDistance.push({x:clickX - points[i][j].x, y:clickY -points[i][j].y});
}
得到 distance.polygonDistance当前距离的数组，索引与polygon的索引相对应。

鼠标移动过程中：

    for(let i=0; i< this.signDictionary.polygon[this.select.previousSelectedIndex].length;i++){
              let point = this.signDictionary.polygon[this.select.previousSelectedIndex][i];
              point.x = pagex-this.distance.polygonDistance[i].x;
              point.y = pagey-this.distance.polygonDistance[i].y;
    }
i对应着this.signDictionary.polygon[this.select.previousSelectedIndex]每一项的点，
也对应着distance.polygonDistance每一项的距离差
