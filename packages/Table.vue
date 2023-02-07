<template>
  <div class="table-ui">
    <el-table
      ref="TableRef"
      v-bind="$attrs"
      :data="tableData"
      :loading="loading"
      :height="tableHeight"
      :row-class-name="rowClassName"
      tooltip-effect="light tit-tip"
    >
      <template v-for="(column, index) in columns">
        <el-table-column
          :key="column.dataIndex"
          :prop="column.dataIndex"
          :label="column.label"
          :type="column.type"
          :width="column.width"
          :fixed="column.fixed"
          :min-width="column.minWidth"
          v-if="column.render"
        >
          <template v-slot="scope">
            <OptionContent
              :option="column"
              :row="scope.row"
              v-if="column.render"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="column.dataIndex + index"
          :prop="column.dataIndex"
          :label="column.label"
          :type="column.type"
          :width="column.width"
          :index="indexMethod"
          :formatter="column.format || format"
          :fixed="column.fixed"
          :min-width="column.minWidth"
          :show-overflow-tooltip="column['show-overflow-tooltip'] || false"
        />
      </template>
    </el-table>
    <div class="bottom-pagination" v-if="total > 20">
      <el-pagination
        :current-page="page.page"
        :page-sizes="[20, 40, 80, 100]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>
<script>
const debounce = (func, wait = 300) => {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, wait);
  };
};

export default {
  name: "table-ui",
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    fetchPage: Function,
    rowClassName: {
      type: Function,
      default: () => {},
    },
    params: {
      type: Object,
      default: () => {},
    }, // 表单搜索条件
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
  computed: {
    tableHeight() {
      return this.total > 20 ? "calc(100% - 0.6rem)" : "100%";
    },
  },
  data() {
    return {
      debounceFetchTableData: debounce(this.fetchTableData),
      tableData: [],
      total: 0,
      loading: false,
      page: {
        pageSize: 20,
        page: 1,
      },
    };
  },
  watch: {
    page: {
      handler() {
        this.debounceFetchTableData();
      },
      deep: true,
    },
    params: {
      handler() {
        this.page = {
          pageSize: 20,
          page: 1,
        };
      },
      deep: true,
    },
  },
  mounted() {
    this.debounceFetchTableData();
  },
  methods: {
    fetchTableData(params = { ...this.params, ...this.page }) {
      this.loading = true;
      this.fetchPage &&
        this.fetchPage(params).then((res) => {
          this.total = res.totalCount;
          this.tableData = res.list;
          this.loading = false;
        });
    },
    currentChange(val) {
      this.page.page = val;
    },
    sizeChange(val) {
      this.page.pageSize = val;
    },
    indexMethod(idx) {
      const cacheIdx = (this.page.page - 1) * this.page.pageSize;
      const curIdx = idx + 1;
      return cacheIdx + curIdx;
    },
    refresh(isResetFetch = false) {
      if (isResetFetch) {
        this.page = {
          pageSize: 20,
          page: 1,
        };
      } else {
        this.page.page =
          this.tableData.length === 1 && this.page.page !== 1
            ? this.page.page - 1
            : this.page.page;
      }
      isResetFetch
        ? this.debounceFetchTableData(this.page)
        : this.debounceFetchTableData();
    },
    format(row, column, cellValue, index) {
      if (["", null, undefined].includes(cellValue)) {
        return "--";
      }
      return cellValue;
    },
  },
};
</script>
<style scoped>
.table-ui {
  box-sizing: border-box;
  background: #edf0f4;
  height: calc(100% - 0.6rem);
  padding: 0.1rem 0.2rem 0;
}

.table-ui .el-table {
  background: #edf0f4;
}

.table-ui .el-table :deep(.action .el-button) {
  display: inline-block;
  padding: 0;
  font-size: 0.2rem;
}
</style>
