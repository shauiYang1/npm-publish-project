<template>
  <el-form
    class="el-form-ui"
    :model="form"
    :label-width="labelWidth"
    :rules="rules"
    ref="FormRef"
    :inline="true"
  >
    <el-row :gutter="gutter" type="flex" :justify="justify" class="flex-wrap">
      <el-col
        :span="formItem.span"
        v-for="formItem in formData"
        :key="formItem.key"
      >
        <el-form-item
          :label="formItem.label"
          :prop="formItem.name"
          :style="{ '--labelWidth': labelWidth }"
        >
          <component
            :is="formItem.component"
            v-model="form[formItem.name]"
            v-bind="{ ...$attrs, ...formItem.props }"
          >
            <template v-if="formItem.childComponent">
              <component
                :is="formItem.childComponent"
                v-for="option in formItem.options"
                :key="option.key"
                v-bind="{ ...option }"
              />
            </template>
          </component>
        </el-form-item>
      </el-col>
      <slot name="option">
        <el-col :span="1" :offset="1">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-col>
      </slot>
    </el-row>
  </el-form>
</template>
<script>
export default {
  name: "form-ui",
  props: {
    formData: {
      type: Array,
      default: () => [],
    },
    labelWidth: {
      type: [String, Number],
      default: "120px",
    },
    gutter: {
      type: Number,
      default: 0,
    },
    rules: {
      type: Object,
      default: () => {},
    },
    justify: {
      type: String,
      default: "start",
    },
  },
  data() {
    return {
      form: {},
    };
  },
  beforeMount() {
    this.initFormModel();
  },
  computed: {},
  methods: {
    initFormModel() {
      this.formData.forEach((element) => {
        if (element.key === "checkboxGroup") {
          this.$set
            ? this.$set(this.form, element.key, [])
            : (this.form[element.key] = []);
        }
      });
    },
    onSubmit() {
      console.log("onSubmit", this.form);
    },
  },
};
</script>
<style scoped>
.el-form-ui :deep(.flex-wrap) {
  flex-wrap: wrap;
  flex-direction: row;
}

.el-form-ui :deep(.el-col .el-form-item) {
  width: 100%;
}

.el-form-ui :deep(.el-col .el-form-item__content) {
  width: calc(100% - var(--labelWidth));
}
.el-form-ui :deep(.el-col .el-form-item__content .el-select) {
  width: 100%;
}
.el-form-ui :deep(.el-col .el-form-item__content .el-date-editor.el-input) {
  width: 100%;
}
</style>
