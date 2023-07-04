<template>
  <div class="app">
    <table-ui :columns="columns" />
    <Form :formData="formData" :form="form" />
  </div>
</template>

<script>
import Form from "../packages/Form.vue";

export default {
  data() {
    return {
      columns: [
        {
          dataIndex: "index",
          label: "序号",
          type: "index",
          width: "80",
          fixed: "left",
        },
        {
          dataIndex: "assName",
          label: "积分类别",
          minWidth: "150",
          fixed: "left",
        },
        {
          dataIndex: "assConfigName",
          label: "积分内容",
          minWidth: "300",
          "show-overflow-tooltip": true,
        },
      ],
      formData: [
        {
          name: "code",
          key: "code",
          label: "案件受理编号",
          component: "el-input",
          span: 6,
          props: { placeholder: "请输入", clearable: true },
          events: {
            change: (val) => console.log("val", val),
          },
        },
        {
          name: "name",
          key: "name",
          label: "案件名称",
          component: "el-input",
          span: 6,
          props: { placeholder: "请输入", clearable: true },
        },
        {
          name: "type",
          key: "type",
          label: "案件类别",
          component: "el-select",
          childComponent: "el-option",
          span: 6,
          props: { placeholder: "请选择", clearable: true },
          childProps: { label: "name", value: "code" },
          options: [
            { label: "启用", name: "type", code: "city" },
            { label: "封存", name: "type", code: "city1" },
          ],
        },
        {
          name: "mainDept",
          key: "mainDept",
          label: "承办单位",
          component: "el-tree-select",
          span: 6,
          props: {
            data: [
              { id: "-1", parentId: "-1", level: 0, name: "根组织" },
              {
                id: "1",
                parentId: "-1",
                level: 0,
                name: "根组织1",
                children: [
                  {
                    id: "2",
                    parentId: "1",
                    level: 0,
                    name: "根组织2",
                  },
                ],
              },
            ],
            "default-expand-all": true,
            filterable: true,
            props: {
              label: "name",
              children: "children",
            },
            "node-key": "id",
          },
          events: {
            change: this.orgChange,
          },
        },
        {
          name: "date",
          key: "date",
          label: "侦控期限",
          component: "el-date-picker",
          span: 6,
          props: {
            placeholder: "请输入",
            clearable: true,
            type: "daterange",
            "start-placeholder": "开始时间",
            "end-placeholder": "结束时间",
            "value-format": "YYYY-MM-DD",
          },
        },
      ],
      form: {},
    };
  },
  mounted() {},
  components: {
    Form,
  },
  methods: {
    orgChange() {
      console.log("1212");
      console.log("form", this.form);
    },
  },
};
</script>

<style scoped></style>
