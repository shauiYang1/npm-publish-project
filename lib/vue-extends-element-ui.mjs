import { resolveComponent as s, openBlock as l, createBlock as u, withCtx as r, createVNode as d, createElementBlock as h, Fragment as m, renderList as w, normalizeStyle as D, resolveDynamicComponent as k, mergeProps as x, createCommentVNode as C, renderSlot as S, createTextVNode as T } from "vue";
const v = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [g, i] of o)
    t[g] = i;
  return t;
}, F = {
  name: "form-ui",
  props: {
    formData: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: [String, Number],
      default: "120px"
    },
    gutter: {
      type: Number,
      default: 0
    },
    rules: {
      type: Object,
      default: () => {
      }
    },
    justify: {
      type: String,
      default: "start"
    }
  },
  data() {
    return {
      form: {}
    };
  },
  beforeMount() {
    this.initFormModel();
  },
  computed: {},
  methods: {
    initFormModel() {
      this.formData.forEach((e) => {
        e.key === "checkboxGroup" && (this.$set ? this.$set(this.form, e.key, []) : this.form[e.key] = []);
      });
    },
    onSubmit() {
      console.log("onSubmit", this.form);
    }
  }
};
function j(e, o, t, g, i, p) {
  const _ = s("el-form-item"), f = s("el-col"), b = s("el-button"), y = s("el-row"), a = s("el-form");
  return l(), u(a, {
    class: "el-form-ui",
    model: i.form,
    "label-width": t.labelWidth,
    rules: t.rules,
    ref: "FormRef",
    inline: !0
  }, {
    default: r(() => [
      d(y, {
        gutter: t.gutter,
        type: "flex",
        justify: t.justify,
        class: "flex-wrap"
      }, {
        default: r(() => [
          (l(!0), h(m, null, w(t.formData, (n) => (l(), u(f, {
            span: n.span,
            key: n.key
          }, {
            default: r(() => [
              d(_, {
                label: n.label,
                prop: n.name,
                style: D({ "--labelWidth": t.labelWidth })
              }, {
                default: r(() => [
                  (l(), u(k(n.component), x({
                    modelValue: i.form[n.name],
                    "onUpdate:modelValue": (c) => i.form[n.name] = c
                  }, { ...e.$attrs, ...n.props }), {
                    default: r(() => [
                      n.childComponent ? (l(!0), h(m, { key: 0 }, w(n.options, (c) => (l(), u(k(n.childComponent), x({
                        key: c.key
                      }, { ...c }), null, 16))), 128)) : C("", !0)
                    ]),
                    _: 2
                  }, 1040, ["modelValue", "onUpdate:modelValue"]))
                ]),
                _: 2
              }, 1032, ["label", "prop", "style"])
            ]),
            _: 2
          }, 1032, ["span"]))), 128)),
          S(e.$slots, "option", {}, () => [
            d(f, {
              span: 1,
              offset: 1
            }, {
              default: r(() => [
                d(_, null, {
                  default: r(() => [
                    d(b, {
                      type: "primary",
                      onClick: p.onSubmit
                    }, {
                      default: r(() => [
                        T("查询")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ], !0)
        ]),
        _: 3
      }, 8, ["gutter", "justify"])
    ]),
    _: 3
  }, 8, ["model", "label-width", "rules"]);
}
const O = /* @__PURE__ */ v(F, [["render", j], ["__scopeId", "data-v-10e3f367"]]);
const V = (e, o = 300) => {
  let t;
  return function() {
    t && clearTimeout(t), t = setTimeout(() => {
      e.apply(this, arguments);
    }, o);
  };
}, N = {
  name: "table-ui",
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    fetchPage: Function,
    rowClassName: {
      type: Function,
      default: () => {
      }
    },
    params: {
      type: Object,
      default: () => {
      }
    }
    // 表单搜索条件
  },
  components: {
    OptionContent: {
      props: {
        option: Object,
        row: Object
      },
      render(e) {
        return this.option.render && this.option.render(e, this.row);
      }
    }
  },
  computed: {
    tableHeight() {
      return this.total > 20 ? "calc(100% - 0.6rem)" : "100%";
    }
  },
  data() {
    return {
      debounceFetchTableData: V(this.fetchTableData),
      tableData: [],
      total: 0,
      loading: !1,
      page: {
        pageSize: 20,
        page: 1
      }
    };
  },
  watch: {
    page: {
      handler() {
        this.debounceFetchTableData();
      },
      deep: !0
    },
    params: {
      handler() {
        this.page = {
          pageSize: 20,
          page: 1
        };
      },
      deep: !0
    }
  },
  mounted() {
    this.debounceFetchTableData();
  },
  methods: {
    fetchTableData(e = { ...this.params, ...this.page }) {
      this.loading = !0, this.fetchPage && this.fetchPage(e).then((o) => {
        this.total = o.totalCount, this.tableData = o.list, this.loading = !1;
      });
    },
    currentChange(e) {
      this.page.page = e;
    },
    sizeChange(e) {
      this.page.pageSize = e;
    },
    indexMethod(e) {
      const o = (this.page.page - 1) * this.page.pageSize, t = e + 1;
      return o + t;
    },
    refresh(e = !1) {
      e ? this.page = {
        pageSize: 20,
        page: 1
      } : this.page.page = this.tableData.length === 1 && this.page.page !== 1 ? this.page.page - 1 : this.page.page, e ? this.debounceFetchTableData(this.page) : this.debounceFetchTableData();
    },
    format(e, o, t, g) {
      return ["", null, void 0].includes(t) ? "--" : t;
    }
  }
}, W = { class: "table-ui" }, M = {
  key: 0,
  class: "bottom-pagination"
};
function P(e, o, t, g, i, p) {
  const _ = s("OptionContent"), f = s("el-table-column"), b = s("el-table"), y = s("el-pagination");
  return l(), h("div", W, [
    d(b, x({ ref: "TableRef" }, e.$attrs, {
      data: i.tableData,
      loading: i.loading,
      height: p.tableHeight,
      "row-class-name": t.rowClassName,
      "tooltip-effect": "light tit-tip"
    }), {
      default: r(() => [
        (l(!0), h(m, null, w(t.columns, (a, n) => (l(), h(m, null, [
          a.render ? (l(), u(f, {
            key: a.dataIndex,
            prop: a.dataIndex,
            label: a.label,
            type: a.type,
            width: a.width,
            fixed: a.fixed,
            "min-width": a.minWidth
          }, {
            default: r((c) => [
              a.render ? (l(), u(_, {
                key: 0,
                option: a,
                row: c.row
              }, null, 8, ["option", "row"])) : C("", !0)
            ]),
            _: 2
          }, 1032, ["prop", "label", "type", "width", "fixed", "min-width"])) : (l(), u(f, {
            key: a.dataIndex + n,
            prop: a.dataIndex,
            label: a.label,
            type: a.type,
            width: a.width,
            index: p.indexMethod,
            formatter: a.format || p.format,
            fixed: a.fixed,
            "min-width": a.minWidth,
            "show-overflow-tooltip": a["show-overflow-tooltip"] || !1
          }, null, 8, ["prop", "label", "type", "width", "index", "formatter", "fixed", "min-width", "show-overflow-tooltip"]))
        ], 64))), 256))
      ]),
      _: 1
    }, 16, ["data", "loading", "height", "row-class-name"]),
    i.total > 20 ? (l(), h("div", M, [
      d(y, {
        "current-page": i.page.page,
        "page-sizes": [20, 40, 80, 100],
        "page-size": i.page.pageSize,
        layout: "total, sizes, prev, pager, next, jumper",
        total: i.total,
        onSizeChange: p.sizeChange,
        onCurrentChange: p.currentChange
      }, null, 8, ["current-page", "page-size", "total", "onSizeChange", "onCurrentChange"])
    ])) : C("", !0)
  ]);
}
const B = /* @__PURE__ */ v(N, [["render", P], ["__scopeId", "data-v-e884afc9"]]), E = [O, B], z = (e) => {
  E.forEach((o) => {
    e.component(o.name, o);
  });
};
typeof window < "u" && window.Vue && z(window.Vue);
const H = {
  install: z
};
export {
  O as Form,
  B as Table,
  H as default
};
