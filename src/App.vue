<template>
  <div class="app">
    <table-ui :columns="columns" />
  </div>
</template>

<script>
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
    };
  },
  mounted() {},
};
</script>

<style scoped></style>
