import { ref, onMounted, onUnmounted, mergeProps, unref, withCtx, createTextVNode, useSSRContext, defineComponent } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { onClickOutside } from "@vueuse/core";
import { _ as _sfc_main$2 } from "./ApplicationLogo-BnvHfr9H.js";
import { Magnifer } from "@solar-icons/vue";
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
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "navbar bg-white fixed top-0 z-50 flex w-full bg-base-100 items-center shadow-md px-4 md:px-8 lg:px-12 py-3" }, _attrs))}><div class="flex justify-between items-center w-full">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</div>`);
      if (mobileMenu.value) {
        _push(`<div class="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50"><div class="flex flex-col p-4 space-y-4"><div class="flex items-center shadow-lg rounded-md group border-2 border-transparent focus-within:border-deepblue transition-colors duration-200"><div class="px-3">`);
        _push(ssrRenderComponent(unref(Magnifer), { class: "h-5 w-auto text-gray-400 group-focus-within:text-deepblue transition-colors duration-200" }, null, _parent));
        _push(`</div><input type="text" class="border-none outline-none focus:ring-0 bg-transparent py-2 px-2 w-full text-sm" placeholder="Search..."></div><div class="flex flex-col space-y-3 pt-2 border-t">`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/login",
          class: "flex text-white btn bg-deepblue rounded-lg justify-center items-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-deepblue/30"
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
          class: "flex btn text-white bg-deepgreen rounded-lg justify-center items-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-deepgreen/30"
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
      _push(`<!--[--><video src="/assets/background.mp4" class="fixed top-0 left-0 object-cover w-screen h-full" autoplay muted loop></video><div class="z-50 relative w-screen">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<div class="h-full flex justify-center w-full">`);
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
