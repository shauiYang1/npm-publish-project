<template>
  <el-table-column
    v-if="column.children && column.children.length"
    v-bind="{ ...column.props }"
    :key="column.dataIndex"
    :prop="column.dataIndex"
    :label="column.label"
    :type="column.type"
    :width="column.width"
    :index="indexMethod"
    :formatter="column.format || format"
    :fixed="column.fixed"
    :min-width="column.minWidth"
    :show-overflow-tooltip="column['show-overflow-tooltip'] || false"
  >
    <table-column-ui
      v-for="(columnChild, index) in column.children"
      :column="columnChild"
      :key="column.dataIndex + index"
    />
  </el-table-column>
  <el-table-column
    v-else
    v-bind="{ ...column.props }"
    :key="column.dataIndex"
    :prop="column.dataIndex"
    :label="column.label"
    :type="column.type"
    :width="column.width"
    :fixed="column.fixed"
    :min-width="column.minWidth"
  >
    <template v-slot="scope">
      <OptionContent :option="column" :row="scope.row" v-if="column.render" />
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "table-column-ui",
  props: {
    column: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    OptionContent: {
      props: {
        option: Object,
        row: Object,
      },
      render(h) {
        return this.option.render && this.option.render(h, this.row);
      },
    },
  },
  methods: {
    indexMethod(idx) {
      const cacheIdx = (this.page.page - 1) * this.page.pageSize;
      const curIdx = idx + 1;
      return cacheIdx + curIdx;
    },
    format(row, column, cellValue) {
      if (["", null, undefined].includes(cellValue)) {
        return "--";
      }
      return cellValue;
    },
  },
};
</script>
