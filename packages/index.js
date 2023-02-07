import Form from "./Form.vue";
import Table from "./Table.vue";

export { Form, Table };

const components = [Form, Table];

const install = (App) => {
  components.forEach((component) => {
    App.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
};
