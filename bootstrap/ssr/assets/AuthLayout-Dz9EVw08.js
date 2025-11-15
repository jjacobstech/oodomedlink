import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col lg:flex-row bg-primaryLight h-screen w-screen" }, _attrs))}><div class="w-full lg:w-1/2 h-48 hidden lg:block sm:h-64 md:h-80 lg:h-screen flex-shrink-0"><img src="/assets/med1.jpg" alt="Medical consultation" class="w-full h-full object-cover" loading="lazy"></div><div class="w-full lg:w-1/2 flex justify-center items-center p-6 sm:p-8 md:p-12 lg:p-20 overflow-y-hidden"><div class="w-full max-w-md lg:max-w-lg">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AuthLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  AuthLayout as A
};
