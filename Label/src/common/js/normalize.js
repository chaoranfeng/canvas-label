export class Rect {
  constructor(start_x, start_y, width, height) {
    this.x = start_x;
    this.y = start_y;
    this.width = width;
    this.height = height;
    this.isSelected = false;
  }
}

export class Info{
  constructor(name, id, classify){
    this.name = name,
    this.id = id,
    this.classify = classify
  }
}
