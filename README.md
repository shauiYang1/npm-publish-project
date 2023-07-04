#vue-extends-element-ui

基于element-ui封装的Table、Form组件

## install
```
npm install --save vue-extends-element-ui
```


## description
table中的参数
``` javascript
 columns: {
  type: Array,
  default: () => [],
},

fetchPage: Function, // 接口请求(方法返回promise对象)
/*
例:
父组件中的方法
fetchPages(params) {
  return api.fetchUserPage(params) //接口api
},
*/
rowClassName: {
  type: Function,
  default: () => {},
},
params: { //查询条件非必填
  type: Object,
  default: () => {},
},
```
form中的参数
``` javascript
formData: { // 参数结构
  type: Array,
  default: () => [
    {
      name: 'name',
      key: 'name',
      label: '姓名',
      component: 'el-input',
      span: 6,
      props: { placeholder: '请输入姓名', clearable: true }
      events: {
        change: ()=>{},
      },
    },
    {
      name: 'account',
      key: 'account',
      label: '姓名',
      component: 'el-input',
      span: 6,
      props: { placeholder: '请输入姓名', clearable: true }
      events: {
        change: ()=>{},
      },
    },
    {
      name: 'org',
      key: 'org',
      label: '职位',
      span: 6,
      component: 'el-select',
      props: { placeholder: '请选择职位' },
      childComponent: 'el-option',
      childProps: { label: "name", value: "code" }, // 可自定义options子组件的中label、value的key
      options: [{ label: '职位1', code: 1 }, { label: '职位2', code: 0 }]
      events: {
        change: ()=>{},
      },
    },
    {
      name: 'date',
      key: 'date',
      span: 6,
      label: '日期选择',
      component: 'el-date-picker',
      props: { placeholder: '选择时间' }
      events: {
        change: ()=>{},
      },
    },
    {
      name: 'time',
      key: 'time',
      span: 6,
      label: '时间选择',
      component: 'el-time-picker',
      props: { placeholder: '选择时间' }
      events: {
        change: ()=>{},
      },
    },
    {
      name: 'checkboxGroup',
      key: 'checkboxGroup',
      label: 'checkbox选择',
      span: 6,
      component: 'el-checkbox-group',
      childComponent: 'el-checkbox', // 渲染的子组件
      options: [{ label: '启用', name: 'type', key: 'city' }, { label: '封存', name: 'type', key: 'city1' }] // 子组件的数据及属性配置
      events: {
        change: ()=>{},
      },
    },
    {
      name: 'selectTree', // formItem绑定prop(关系到数据的提交值)
      key: 'selectTree',  // 渲染时的key值(在checkboxGroup时必须为'checkboxGroup')解决checkboxGroup组prop数据必须存在的问题详见github
      label: 'tree选择',  // label名
      span: 6,  // 详见el-col(默认24)
      component: SelectTree, // formItem显示的view (如自定组件需要import导入)
      props: { // formItem上的所有属性都在这里写 (详见form-item参数)
        options: [{ id: '-1', parentId: '-1', level: 0, name: '根组织' },
          {
            id: '1',
            parentId: '-1',
            level: 0,
            name: '根组织1',
            children: [{
              id: '2', parentId: '1', level: 0, name: '根组织2'
            }]
          }]
      }
      events: {
        change: ()=>{},
      },
    }
  ],
  required: true,
},
//  表单数据处理（上个版本在组件内部，考虑到不同的业务场景决定当作参数传递。）
form: {
  type: Object,
  default: () => {},
  required: true,
},
labelWidth: {
  type: [String, Number],
  default: '1.2rem'
},
// formItem之间的间隔 详见element-ui中el-row
gutter: {
  type: Number,
  default: 0
},
// form表单校验规则 详见element-ui中form
rules: {
  type: Object,
  default: () => { }
},
// formItem对齐方式
justify: {
  type: String,
  default: 'start'
}
// labelPosition位置
labelPosition: {
  type: String,
  default: 'left'
}

```


## usage

``` javascript
    //  这里引入element-ui或者element-plus都可以(如果是全局引入)
    import ElementPlus from "element-plus";
    import VueExtendsElementUi from 'vue-extends-element-ui'
    import "element-plus/dist/index.css";

    Vue.use(VueExtendsElementUi)
```

``` javascript
  //  使用的组件
  
  <template>
    <div class="app">
      <table-ui :columns="columns" />
      // 按需导入的使用
      //<Form />
      
      // 全局导入
      <form-ui />
    </div>
  </template>

<script>
import Form from 'vue-extends-element-ui'

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
  components:{
    Form
  }
};
</script>
```


[github](https://github.com/shauiYang1/vue-extends-element-ui)
