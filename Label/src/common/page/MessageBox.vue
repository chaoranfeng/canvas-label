<template>
  <div class="container">
    <div class="tool_tip" :class="boxStyle.area" :style="boxStyle">
      <p class="input_Txt">设置标注名称：</p>
      <el-input id="sign_name" v-model="input" placeholder="填写标注名称(*不可重复)"></el-input>
      <p class="input_Txt">设置标注分类：</p>
      <auto-input ref='$input' @handleValueChange="handleValueChange"></auto-input>
      <div class="btn">
        <el-button type="success" id="success" class="btn btn-success" @click="addPoints">确定</el-button>
        <el-button id="remove_rect" class="btn btn-default" @click="cancel">取消</el-button>
      </div>
    </div>
    <div class="area-mask" :style="{display: boxStyle.display}"></div>
  </div>
</template>

<script>
import AutoInput from "./AutoInput";
export default {
  name: "SignBox",
  props: {
    boxStyle: Object
  },
  data() {
    return {
      input: "",
      style:'',
      value: {
        name: "",
        class: ""
      }
    };
  },
  components: {
    AutoInput
  },
  methods: {
    handleValueChange(value) {
      this.value.name = value.value;
      this.value.class = value.address;
    },
    addPoints() {
      this.$refs.$input.deleState();
      this.$emit("addPoints", this.value);
    },
    cancel() {
      this.$refs.$input.deleState();
      this.$emit("cancel");
    }
  },
};
</script>

<style scoped>
.tool_tip {
  position: absolute;
  background-color: white;
  text-align: center;
  z-index: 10;
  width: 250px;
  height: 230px;
  border-radius: 10px;
  border: 3px solid #a2bdc7;
}
.tool_tip:after {
    content: "";
    position: absolute;
    bottom: -20px;
    left: 5px;
    right: auto;
    border-width: 20px 15px 0;
    border-style: solid;
    border-color:#dbdbdb transparent;
    display: block;
    width: 0;
}
.top:after {
  top: -20px;
  left: 5px;
  bottom: auto;
  right: auto;
  border-width: 0 15px 20px;
  border-color: #a2bdc7 transparent;
}
.area-mask {
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.4;
    filter: alpha(opacity=40);
}
.input_Txt {
    text-align: left;
    font-size: 16px;
    margin: 16px 10px 10px 10px;
}
.btn{
  margin:10px 0px 0px 0px;
}
</style>
