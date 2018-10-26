<template>
  <el-dialog :title="title" :visible.sync="visible" width='30%'>
    <auto-input ref='$input' @handleValueChange="handleValueChange"></auto-input>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="addPoints">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import AutoInput from "./AutoInput";
export default {
  name: "DialogCommon",
  props: {
    title: String,
    visible: Boolean
  },
  data() {
    return {
      value: {
        name: "",
        class: ""
      }
    };
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
  components: {
    AutoInput
  }
};
</script>

<style>
</style>
