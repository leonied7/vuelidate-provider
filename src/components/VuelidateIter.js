import VuelidateProxy from "./VuelidateProxy";

export default {
  name: "VuelidateIter",
  components: { VuelidateProxy },
  props: {
    path: {
      type: String,
      default: ""
    },
    tag: {
      type: String,
      default: "div"
    },
    proxyProps: {
      type: Object,
      default: () => ({}),
    }
  },
  inject: {
    getValidatorByPath: {
      from: "getValidatorByPath"
    }
  },
  computed: {
    validator() {
      return this.getValidatorByPath(this.path);
    }
  },
  render(h) {
    return h(
      this.tag,
      Object.values(this.validator.$each.$iter).map((iter, index) => {
        return h(VuelidateProxy, {
          props: { ...this.proxyProps, path: `${this.path}.$each.${index}` },
          scopedSlots: this.$scopedSlots,
          slot: this.$slots.default
        });
      })
    );
  }
};
