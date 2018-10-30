<template>
  <div class="middle" id="middle">
    <!--绘图canvas-->
    <canvas id="canvas"></canvas>
    <!--曲线的canvas-->
    <canvas id='graph'
     @mouseenter="mouseenter()"
     @mousedown="mousedown($event)" 
     @mousemove="mousemove($event)"
     @mouseup="mouseup()"
    ></canvas>
    <div class="pre" @click="pre">
      <i class="toggle iconfont icon-shangyiyeqianyiye"></i>
    </div>
    <div class="next" @click="next">
      <i class="toggle iconfont icon-xiayiyehouyiye"></i>
    </div>
    <message-box :boxStyle="style" @addPoints='addPoints' @cancel="cancel"></message-box>
  </div>
</template>

<script>
import MessageBox from 'common/page/MessageBox'
import { getImgScale } from '@/assets/js/ImageLoad.js'
import { getDom ,mapCursor,setSelect, Draw, refreshCanvas} from 'common/js/Assistant.js'
import { apiGetImage } from 'common/js/api.js'
import { mapState , mapMutations} from 'vuex'
import { Rect, Info, Polygon} from 'common/js/normalize.js'
import { InitBoxPosition } from '@/assets/js/InitClientWh.js'
import { judgeIsInRect} from "common/js/Rect.js"
import { radius, fillColor, borderColor, rectfillStyle, lineColor} from 'common/js/Global.js'
import { fillCircle, drawLine, InFirstPolygon} from 'common/js/polygon.js'

let clickX, clickY, endX, endY;
//导航的宽高
const offsetLeft=100;
const offsetTop=52;
export default {
  name: "NavMiddle",
  data() {
    return {
      CV: {},
      CTX: {},
      graphCanvas:{},
      graphContent:{},
      img: {},
      files: [],
      scale: 1,
      currentIndex:0,
      paddingTop: 0,
      paddingLeft: 0,
      isDraw: false,
      //全局rect
      rect:{},
      //全局临时多边形数组polygon
      polygon:[],
      //标记信息总类
      signDictionary:{
        /*矩形*/
        rects:[],
        /*多边形 */
        polygon:{},
        /*曲线*/
        bezier:[]
      },
      title:'标记信息',
      //弹框样式
      style:{
        area:'',
        left: '',
        top: '',
        display: 'none'
      },
      toolTip:false,
      // 使图形允许拖拽
      isDragging:false,
      //选中的图形
      select:{
        previousSelectedIndex:-1,
      },
      drag:{
        direction:''
      },
      //点击图形 点击位置与图形的距离
      distance:{
        distanceX:0,
        distanceY:0,
      }
    };
  },
  created() {
  },
  mounted() {
    this.Init();
    this.getAndDrawImg();
  },
  methods: {
    getAndDrawImg(){
      apiGetImage().then(res=>{
        for(let value of res.data){
          this.files.push(value.url)
        }
        this.loadImg(this.files[this.currentIndex]);
      }).catch(res=>{
        this.$message('网络错误或图片链接失效！')
      })
    },
    loadImg(src) {
      let img = new Image();
      img.src = src;
      img.onload = ()=>{
        let wScale = this.CV.width / img.width;
        let hScale = this.CV.height / img.height;
        this.scale = getImgScale(img, this.CV, wScale, hScale);
        this.paddingTop = (this.CV.height - img.height * this.scale) / 2;
        this.paddingLeft = (this.CV.width - img.width * this.scale) / 2;
        this.CTX.drawImage(img, 0, 0, 100, 100);
        this.CTX.clearRect(0, 0, this.CV.width, this.CV.height);
        this.CTX.drawImage(img, this.paddingLeft, this.paddingTop, img.width * this.scale, img.height * this.scale);
      };
    },
    Init() {
      this.CV=getDom("canvas");
      this.CTX=this.CV.getContext("2d");
      this.graphCanvas=getDom("graph");
      this.graphContent=this.graphCanvas.getContext('2d');
    },
    pre() {
      if(this.currentIndex<1){this.$message(`当前第${this.currentIndex+1}/${this.files.length}张`);return;}
      this.currentIndex-=1;
      this.loadImg(this.files[this.currentIndex]);
    },
    next() {
      if(this.currentIndex==this.files.length-1){this.$message(`当前第${this.currentIndex+1}/${this.files.length}张`);return;}
      this.currentIndex+=1;
      this.loadImg(this.files[this.currentIndex]);
    },
    mouseenter(){
      if(this.toolActive=='') return;
      let cursor = mapCursor[this.toolActive];
      this.graphCanvas.style.cursor=cursor?cursor():'default';
    },
    mousedown(event){
      clickX = event.pageX-offsetLeft;
      clickY = event.pageY-offsetTop;
      //矩形
      if(this.toolActive=='rect'){
        let judg=judgeIsInRect(this.signDictionary, clickX, clickY,this.select, this.distance);
        /**拖动矩形*/
        if(judg=='drag'){
          this.isDragging=true;
          refreshCanvas(this.graphCanvas, this.signDictionary);
          return
        }
        /**左上角移动改变大小*/
        else if(judg=='dragtop'){
          this.drag.direction='dragtop'
          return
        }
        /**右下角移动改变大小*/
        else if(judg=='dragbottom'){
          this.drag.direction='dragbottom'
          return
        }
        //
        this.isDraw = true;
        this.toolTip=true;
      }
      //多边形
      else if(this.toolActive=='polygon'){
        this.polygon.push(new Polygon(clickX, clickY));
        this.polygon[0].color = 'red';
        this.polygon[0].radius = 7;
        for(let val of this.polygon){
          fillCircle(this.graphContent, val.x, val.y, val.radius, val.color, borderColor);
        }
        drawLine(this.graphContent, this.polygon, lineColor);
      }
    },
    mousemove(event){
      let pagex = event.pageX-offsetLeft,
          pagey = event.pageY-offsetTop;
      
      if(this.isDraw) {
        if(this.toolActive=='rect'){
          let width=pagex - clickX,
              height=pagey - clickY;
          this.rect = new Rect(clickX,clickY,width,height);  
          Draw(this.toolActive, this.graphCanvas, this.signDictionary, clickX, clickY, width, height)
        }
      }
      else if(this.isDragging){
        if (this.toolActive=='rect') {
          // 将圆圈移动到鼠标位置
          this.signDictionary.rects[this.select.previousSelectedIndex].x= pagex-this.distance.distanceX;
          this.signDictionary.rects[this.select.previousSelectedIndex].y= pagey-this.distance.distanceY;

        // 更新画布
         refreshCanvas(this.graphCanvas, this.signDictionary);
       }
      }
      else if(this.drag.direction){
        const OFFSET = 20;
        let rect = this.signDictionary.rects[this.select.previousSelectedIndex];
        if(this.drag.direction=='dragtop'){
          /**endx y 不变 */
          let endX = rect.x + rect.width;
          let endY = rect.y + rect.height;
          if((endX-pagex)>=OFFSET){
            rect.x = pagex;
            rect.width = endX - pagex;
          }
          if((endY - pagey)>=OFFSET){
            rect.y = pagey;
            rect.height = endY - pagey;
          }
         refreshCanvas(this.graphCanvas, this.signDictionary);
        }
        else if(this.drag.direction=='dragbottom'){
          //rect.x y不变
          if(pagex-rect.x>=OFFSET){
            rect.width = pagex-rect.x;
          }
          if(pagey-rect.y>=OFFSET){
            rect.height = pagey-rect.y;
          }
          refreshCanvas(this.graphCanvas, this.signDictionary);
        }
      }
    },
    mouseup(){
      if(this.isDraw && this.toolTip){
        //this.dialogVisible = true;
        this.toolTip=false;
        InitBoxPosition(this.graphCanvas.height, this.style, clickX, clickY)
        this.isDraw= false;
      }
      this.isDragging = false;
      this.drag.direction='';
      this.select.previousSelectedIndex = -1;
    },
    addPoints(val){
      let index = ''
      if(this.toolActive=='rect'){
        this.signDictionary.rects.push(this.rect);
        this.rect={};
        //rect-1,
        index = this.toolActive+"-"+String(this.signDictionary.rects.length-1);
      }
      InitBoxPosition(this.graphCanvas.height, this.style)
      //添加索引信息vuex
      this.addSignInfo(new Info(val.name, index, val.class))
    },
    cancel(){
      this.rects={};
      InitBoxPosition(this.graphCanvas.height, this.style);
      refreshCanvas(this.graphCanvas, this.signDictionary)
    },
    ...mapMutations(['addSignInfo'])
  },

  computed: {
    ...mapState({
      // 采用模块方式写vuex,mapState需要按照路径获取对应的state才可以获取
      toolActive(state) {
        return state.Tool.toolActive;
      },
      selectInfo(state){
        return state.Info.selectInfo;
      }
    })
  },
  components:{
    MessageBox
  },
  watch:{
    /**监测 hover记录 vuex的属性值变化 */
    'selectInfo'(newValue){
      setSelect(this.signDictionary,newValue);
      refreshCanvas(this.graphCanvas, this.signDictionary)
    }
  }
};
</script>

<style scoped>
  .middle{
    position: relative;
  }
  .pre{
    position: absolute;
    top: 50%;
    margin-top: -25px;
    left:20px;
    z-index: 10;
  }
  .next{
    margin-top: -25px;
    position: absolute;
    top: 50%;
    right:20px;
    z-index: 10;
  }
  .toggle{
    font-size: 50px;
  }
  .toggle:hover{
    color: #ffffff;
    font-size: 56px;
    cursor: pointer;
  }
  #canvas{
    position: absolute;
    z-index: 0;
  }
  #graph{
    position: absolute;
    z-index: 1;
  }
</style>
