import { radius, fillColor} from './Global.js'
export class Rect {
  constructor(start_x, start_y, width, height) {
    this.x = start_x;
    this.y = start_y;
    this.width = width;
    this.height = height;
    this.isSelected = false;
  }
}
/**标注信息 */
export class Info{
  constructor(name, id, classify){
    this.name = name,
    this.id = id,
    this.classify = classify
  }
}

/**多边形 */
export class Polygon{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = fillColor;
    this.isSelected = false;
  }
}