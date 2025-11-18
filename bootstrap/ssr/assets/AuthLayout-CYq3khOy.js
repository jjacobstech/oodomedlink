import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-screen w-screen flex-col bg-primaryLight lg:flex-row" }, _attrs))}><div class="hidden h-48 w-full flex-shrink-0 sm:h-64 md:h-80 lg:block lg:h-screen lg:w-1/2"><img src="/assets/med1.jpg" alt="Medical consultation" class="h-full w-full object-cover" loading="lazy"></div><div class="flex w-full items-center justify-center overflow-y-hidden p-6 sm:p-8 md:p-12 lg:w-1/2 lg:p-20"><div class="w-full max-w-md lg:max-w-lg">`);
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
