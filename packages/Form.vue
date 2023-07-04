<template>
  <el-form
    class="el-form-ui"
    :model="form"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :rules="rules"
    ref="FormRef"
    :inline="true"
  >
    <el-row :gutter="gutter" type="flex" :justify="justify" class="flex-wrap">
      <el-col
        :span="formItem.span || 6"
        v-for="formItem in formData"
        :key="formItem.key"
      >
        <el-form-item
          :label="formItem.label"
          :prop="formItem.name"
          :style="{
            '--labelWidth':
              labelPosition === 'top'
                ? 0
                : formItem['labelWidth'] || labelWidth,
          }"
        >
          <component
            v-if="formItem.childComponent"
            :is="formItem.component"
            v-model="form[formItem.name]"
            v-bind="{ ...$attrs, ...formItem.props }"
            v-on="{ ...formItem.events }"
          >
            <template v-if="formItem.childComponent">
              <component
                :is="formItem.childComponent"
                v-for="option in formItem.options"
                :key="option.key"
                :value="
                  formItem?.childProps
                    ? option[formItem?.childProps.value]
                    : option.value
                "
                :label="
                  formItem?.childProps
                    ? option[formItem?.childProps.label]
                    : option.label
                "
                v-bind="{ ...option }"
              />
            </template>
          </component>
          <component
            v-else
            :is="formItem.component"
            v-model="form[formItem.name]"
            v-on="{ ...formItem.events }"
            v-bind="{ ...formItem.props }"
          />
        </el-form-item>
      </el-col>
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
      required: true,
    },
    form: {
      type: Object,
      default: () => {},
      required: true,
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
    labelPosition: {
      type: String,
      default: "left",
    },
  },
  beforeMount() {},
  computed: {},
  methods: {
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
