import { ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { EyeIcon, EyeClosed } from "lucide-vue-next";
const _sfc_main = {
  __name: "PasswordInput",
  __ssrInlineRender: true,
  props: {
    modelValue: "",
    placeholder: ""
  },
  emits: {
    "update:modelValue": { value: "" }
  },
  setup(__props) {
    const passwordVisible = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "focus-within:ring-deepgreen flex items-center rounded-lg border border-gray-300 text-xl transition-all focus-within:border-transparent focus-within:ring-2" }, _attrs))}><input${ssrRenderAttr("value", __props.modelValue)}${ssrRenderAttr("type", passwordVisible.value ? "text" : "password")}${ssrRenderAttr("placeholder", __props.placeholder)} class="w-[85%] rounded-l-lg border-none px-4 py-2.5 text-xl focus:outline-none focus:ring-0" required><div class="px-auto flex w-[15%] items-center justify-center">`);
      if (passwordVisible.value) {
        _push(ssrRenderComponent(unref(EyeIcon), {
          class: "text-deepgreen hover:text-deepgreen/80 h-5 w-5 cursor-pointer transition-colors",
          onClick: ($event) => passwordVisible.value = !passwordVisible.value
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(EyeClosed), {
          class: "text-deepgreen hover:text-deepgreen/80 h-5 w-5 cursor-pointer transition-colors",
          onClick: ($event) => passwordVisible.value = !passwordVisible.value
        }, null, _parent));
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PasswordInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
