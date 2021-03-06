import { normalizeChildren } from "../utils";

export default {
  name: "VuelidateInjector",
  inject: {
    getValidatorByPath: {},
    getValidatorProxyPath: {
      default: () => () => ""
    }
  },
  props: {
    path: {
      type: String,
      default: ""
    }
  },
  computed: {
    fieldProps() {
      return {
        validator: this.validatorByPath,
        validatorPath: this.validatorPath
      };
    },
    validatorByPath() {
      return this.getValidatorByPath(this.path);
    },
    validatorPath() {
      const proxyPath = this.getValidatorProxyPath();
      return proxyPath ? `${proxyPath}.${this.path}` : this.path;
    }
  },
  render() {
    if(!this.validatorByPath) {
      throw new Error(`[Vuelidate-provider]: validator by path '${this.validatorPath}' doesn't exists`);
    }
    return normalizeChildren(this, this.fieldProps);
  }
};
