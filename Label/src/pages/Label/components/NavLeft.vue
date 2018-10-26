<template>
  <div class="left">
    <ul>
      <li class="icon_tool" v-for="(item,index) of toolLists" :key="index">
        <p class="inline_block _p" :title="item.name1" :class="{active : activeTag== item.tags1}" @click="ActiveName(item.tags1)"><i class="iconfont" :class="item.class1"></i>
        </p>
        <p class="inline_block _p" :title="item.name2" :class="{active : activeTag== item.tags2}" @click="ActiveName(item.tags2)"><i class="iconfont" :class="item.class2"></i>
        </p>
      </li>
    </ul>
    <p>{{this.toolActive}}</p>
    <p>{{this.selectInfo}}</p>
    <!-- <div class="get_star">
      <i class="iconfont icon-dianzan" title="visit Github"></i>
      <p>点赞</p>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
let List = [
  {
    name1: "矩形标注",
    class1: "icon-gongnengdingyi",
    tags1: 'rect',
    name2: "多边形标注",
    class2: "icon-icon-dianjiduobianxing",
    tags2: 'polygon'
  },
  {
    name1: "贝塞尔曲线",
    class1: "icon-quxian",
    tags1: 'bezier',
    name2: "测距",
    class2: "icon-chizi",
    tags2: 'distance'
  },
  {
    name1: "移动图像",
    class1: "iconfont icon-renjijiaohu",
    tags1: 'move',
    name2: "放大镜",
    class2: "icon-fangdajing",
    tags2: 'magnify'
  },
  {
    name1: "删除",
    class1: "icon-icon",
    tags1: 'delete',
    name2: "自定义",
    class2: "iconfont icon-zidingyi",
    tags2: 'custom-self'
  }
];
export default {
  name: "NavLeft",
  data() {
    return {
      toolLists: [],
      activeTag: ""
    };
  },
  created() {
    this.toolLists = List;
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
  methods: {
    ActiveName(name) {
      this.activeTag = name;
      this.changeActive(name);
    },
    ...mapMutations(["changeActive"])
  }
};
</script>

<style scoped>
ul {
  padding-top: 20px;
}
._p {
  width: 45px;
  height: 45px;
  line-height: 45px;
  border: 1px solid #a49191;
  border-radius: 10px;
  vertical-align: top;
}
.icon_tool {
  text-align: center;
  padding: 5px 0px;
}
.iconfont {
  color: #e5eae5;
  font-size: 32px;
  transition: font-size 0.12s ease-out 0s;
}
.iconfont:hover {
  cursor: pointer;
  font-size: 40px;
}
.active {
  border-color: #40450d;
  border-width: 1px;
}
</style>
