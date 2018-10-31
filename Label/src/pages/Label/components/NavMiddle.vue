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
import { getDom ,mapCursor,setSelect, refreshCanvas} from 'common/js/Assistant.js'
import { apiGetImage } from 'common/js/api.js'
import { mapState , mapMutations} from 'vuex'
import { Rect, Info, Polygon} from 'common/js/normalize.js'
import { InitBoxPosition } from '@/assets/js/InitClientWh.js'
import { judgeIsInRect,Recting} from "common/js/Rect.js"
import { radius, fillColor, borderColor, rectfillStyle, lineColor} from 'common/js/Global.js'
import { InFirstPolygon , changeFirstPolygon, Polygoning, closePath, polygonDragPoint,isInPolygon} from 'common/js/polygon.js'

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
        polygon:[],
        /*曲线*/
        bezier:[]
      },
      title:'标记信息',
      //弹框样式
      style:{area:'', left: '', top: '', display: 'none'},
      toolTip:false,
      // 使图形允许拖拽
      isDragging:false,
      polygonChangeSize:false,
      //选中的图形与polygon点,因为polygon=[[(x,y)],[]...[(x,y),(x,y)]],因此确定polygon点需要两层索引
      select:{previousSelectedIndex:-1, preSelectPointIndex:-1},
      drag:{direction:''},
      polygonPathClose: true,
      //点击图形 点击位置与图形的距离
      distance:{distanceX:0,distanceY:0,polygonDistance:[]},
      firstPolygon:{color:'red' ,radius: 7}
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
        
        if(polygonDragPoint(this.signDictionary, this.select, clickX, clickY)){
          this.polygonPathClose = true;
          this.rect = [];
          this.polygon = [];
          this.polygonChangeSize =true;
          return 
        }
        if(this.polygon.length>=3){
          if(InFirstPolygon(this.polygon, clickX, clickY)){
            closePath(this.graphContent, this.polygon);
            this.isDraw = true;
            this.toolTip=true;
            return
          }
        }
        if(isInPolygon(this.graphCanvas,this.signDictionary,this.select,clickX,clickY,this.distance)>=0){
          for (let value of this.signDictionary.polygon) {
              value[0].isSelected = false;
          }
          this.signDictionary.polygon[this.select.previousSelectedIndex][0].isSelected = true;
          refreshCanvas(this.graphCanvas, this.signDictionary);
          this.isDragging =true;
          return
        };
        this.polygon.push(new Polygon(clickX, clickY));
        Polygoning(this.polygon,this.graphContent,borderColor,lineColor,'red',7)
        this.polygonPathClose = false;
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
          /**清除画布才能绘制连贯图形，因此先清除再绘制已经保存的数组*/
          refreshCanvas(this.graphCanvas, this.signDictionary);
          /**绘制当前操作的矩形*/
          Recting(this.graphContent, clickX, clickY, width, height)     
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
       if(this.toolActive=='polygon'){
         for(let i=0; i< this.signDictionary.polygon[this.select.previousSelectedIndex].length;i++){
           let point = this.signDictionary.polygon[this.select.previousSelectedIndex][i];
           point.x = pagex-this.distance.polygonDistance[i].x;
           point.y = pagey-this.distance.polygonDistance[i].y;
         }
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
      else if(!this.polygonPathClose){
        if(InFirstPolygon(this.polygon, pagex, pagey)){
          this.firstPolygon.color ='blue';
          this.firstPolygon.radius = 10
        }
        else{
          this.firstPolygon.color = 'red';
          this.firstPolygon.radius = 7
        }
      }
      /**改变polygon大小位置*/
      else if(this.polygonChangeSize){
        let {previousSelectedIndex , preSelectPointIndex} = this.select;
        if(previousSelectedIndex<0) return;
        this.signDictionary.polygon[previousSelectedIndex][preSelectPointIndex].x = pagex;
        this.signDictionary.polygon[previousSelectedIndex][preSelectPointIndex].y = pagey;
        refreshCanvas(this.graphCanvas, this.signDictionary)
      }
    },
    mouseup(){
      if(this.isDraw && this.toolTip){
        //this.dialogVisible = true;
        this.toolTip=false;
        InitBoxPosition(this.graphCanvas.height, this.style, clickX, clickY)
        this.isDraw= false;
        this.polygonPathClose = true;
      }
      this.isDragging = false;
      this.drag.direction='';
      this.select.previousSelectedIndex = -1;
      this.select.preSelectPointIndex = -1;
      this.distance.distanceX = 0;
      this.distance.distanceY = 0;
      this.distance.polygonDistance=[];
      this.polygonChangeSize = false;
    },
    addPoints(val){
      let index = ''
      if(this.toolActive=='rect'){
        this.signDictionary.rects.push(this.rect);
        this.rect={};
        //rect-1,
        index = this.toolActive+"-"+String(this.signDictionary.rects.length-1);
      }
      if(this.toolActive=='polygon'){
        this.signDictionary.polygon.push([].concat(this.polygon));
        this.polygon=[];
        index=this.toolActive+"-"+String(this.signDictionary.polygon.length-1)
      }
      InitBoxPosition(this.graphCanvas.height, this.style)
      //添加索引信息vuex
      this.addSignInfo(new Info(val.name||this.toolActive, index, val.class))
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
    },
    /**watch内部检测，避免在move事件监测造成性能浪费*/
    'firstPolygon':{
      handler(val){
        let callback;
        if(val.radius==10)  callback = changeFirstPolygon;
        refreshCanvas(this.graphCanvas, this.signDictionary);
        Polygoning(this.polygon,this.graphContent,borderColor,lineColor,val.color,val.radius,callback)
      },
      deep: true
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
