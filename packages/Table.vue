<template>
  <div class="table-ui">
    <el-table
      ref="TableRef"
      v-bind="$attrs"
      :data="fetchPage ? tableData : data"
      :loading="loading"
      :height="tableHeight"
      :row-class-name="rowClassName"
      tooltip-effect="light tit-tip"
    >
      <TableColumnUi
        v-for="column in columns"
        :column="column"
        :key="column.dataIndex"
      />
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
import TableColumnUi from "./TableColumn.vue";

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
    data: {
      type: Array,
      default: () => [],
    },
    params: {
      type: Object,
      default: () => {},
    }, // 表单搜索条件
  },
  components: {
    TableColumnUi,
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
