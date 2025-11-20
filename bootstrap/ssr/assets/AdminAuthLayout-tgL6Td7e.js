import { ref, onMounted, onUnmounted, mergeProps, unref, withCtx, createTextVNode, useSSRContext, defineComponent } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./ApplicationLogo-Bxi8t0Nk.js";
import { Link } from "@inertiajs/vue3";
import { Magnifer } from "@solar-icons/vue";
import { onClickOutside } from "@vueuse/core";
const _sfc_main$1 = {
  __name: "NavBar",
  __ssrInlineRender: true,
  setup(__props) {
    const drop = ref(false);
    ref(false);
    const dropDown = ref();
    const resultDropDown = ref();
    ref([]);
    const searchDropDown = ref(false);
    const mobileMenu = ref(false);
    onClickOutside(dropDown, () => drop.value = false);
    onClickOutside(resultDropDown, () => searchDropDown.value = false);
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        mobileMenu.value = false;
      }
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "navbar fixed top-0 z-50 flex w-full items-center bg-primaryDark px-4 py-3 shadow-md md:px-8 lg:px-12" }, _attrs))}><div class="flex w-full items-center justify-between">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</div>`);
      if (mobileMenu.value) {
        _push(`<div class="absolute left-0 right-0 top-full z-50 border-t bg-primaryDark shadow-lg lg:hidden"><div class="flex flex-col space-y-4 p-4"><div class="focus-within:border-primaryDark group flex items-center rounded-md border-2 border-transparent shadow-lg transition-colors duration-200"><div class="px-3">`);
        _push(ssrRenderComponent(unref(Magnifer), { class: "group-focus-within:text-primaryDark h-5 w-auto text-gray-400 transition-colors duration-200" }, null, _parent));
        _push(`</div><input type="text" class="w-full border-none bg-transparent px-2 py-2 text-sm outline-none focus:ring-0" placeholder="Search..."></div><div class="flex flex-col space-y-3 border-t pt-2">`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/login",
          class: "bg-primaryDark hover:shadow-primaryDark/30 btn flex cursor-pointer items-center justify-center rounded-lg text-white transition-all duration-200 hover:shadow-lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Login `);
            } else {
              return [
                createTextVNode(" Login ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/signup",
          class: "bg-primaryDark hover:shadow-primaryDark/30 btn flex cursor-pointer items-center justify-center rounded-lg text-white transition-all duration-200 hover:shadow-lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Admin Signup `);
            } else {
              return [
                createTextVNode(" Admin Signup ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/NavBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminAuthLayout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><video src="/assets/background.mp4" class="fixed left-0 top-0 h-full w-screen object-cover" autoplay muted loop></video><div class="relative z-50 w-screen">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<div class="flex h-full w-full justify-center">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AdminAuthLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
