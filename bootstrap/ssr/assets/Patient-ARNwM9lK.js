import { defineComponent, useSSRContext } from "vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Patient",
  __ssrInlineRender: true,
  props: {
    patients: {}
  },
  setup(__props) {
    const props = __props;
    console.log(props);
    return (_ctx, _push, _parent, _attrs) => {
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Patient.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
