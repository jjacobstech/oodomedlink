import { ref, onMounted, defineComponent, mergeProps, unref, useSSRContext, withCtx, renderSlot, createVNode, onUnmounted, createTextVNode, createBlock, openBlock, Fragment, renderList, withKeys, withModifiers, resolveDynamicComponent, toDisplayString, withDirectives, vModelText } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderVNode } from "vue/server-renderer";
import { Link, Head, router } from "@inertiajs/vue3";
import { SquareAltArrowUp, SquareAltArrowDown, Magnifer, HeartShine, Upload, FileText, Mailbox, Shield, ClockCircle, PieChart2, CheckCircle } from "@solar-icons/vue";
import { createInjectionState, onClickOutside, watchOnce } from "@vueuse/core";
import { c as cn } from "./utils-H80jjgLf.js";
import emblaCarouselVue from "embla-carousel-vue";
import { ArrowRight, ArrowLeft } from "lucide-vue-next";
import { _ as _sfc_main$a } from "./index-CpoN6XoV.js";
import Autoplay from "embla-carousel-autoplay";
import { _ as _sfc_main$b } from "./ApplicationLogo-BnvHfr9H.js";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "reka-ui";
const [useProvideCarousel, useInjectCarousel] = createInjectionState(
  ({
    opts,
    orientation,
    plugins
  }, emits) => {
    const [emblaNode, emblaApi] = emblaCarouselVue({
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y"
    }, plugins);
    function scrollPrev() {
      emblaApi.value?.scrollPrev();
    }
    function scrollNext() {
      emblaApi.value?.scrollNext();
    }
    const canScrollNext = ref(false);
    const canScrollPrev = ref(false);
    function onSelect(api) {
      canScrollNext.value = api?.canScrollNext() || false;
      canScrollPrev.value = api?.canScrollPrev() || false;
    }
    onMounted(() => {
      if (!emblaApi.value)
        return;
      emblaApi.value?.on("init", onSelect);
      emblaApi.value?.on("reInit", onSelect);
      emblaApi.value?.on("select", onSelect);
      emits("init-api", emblaApi.value);
    });
    return { carouselRef: emblaNode, carouselApi: emblaApi, canScrollPrev, canScrollNext, scrollPrev, scrollNext, orientation };
  }
);
function useCarousel() {
  const carouselState = useInjectCarousel();
  if (!carouselState)
    throw new Error("useCarousel must be used within a <Carousel />");
  return carouselState;
}
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "Carousel",
  __ssrInlineRender: true,
  props: {
    opts: {},
    plugins: {},
    orientation: { default: "horizontal" },
    class: {}
  },
  emits: ["init-api"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { canScrollNext, canScrollPrev, carouselApi, carouselRef, orientation, scrollNext, scrollPrev } = useProvideCarousel(props, emits);
    __expose({
      canScrollNext,
      canScrollPrev,
      carouselApi,
      carouselRef,
      orientation,
      scrollNext,
      scrollPrev
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("relative", props.class),
        role: "region",
        "aria-roledescription": "carousel",
        tabindex: "0"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {
        canScrollNext: unref(canScrollNext),
        canScrollPrev: unref(canScrollPrev),
        carouselApi: unref(carouselApi),
        carouselRef: unref(carouselRef),
        orientation: unref(orientation),
        scrollNext: unref(scrollNext),
        scrollPrev: unref(scrollPrev)
      }, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/Carousel.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "CarouselContent",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { carouselRef, orientation } = useCarousel();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "carouselRef",
        ref: carouselRef,
        class: "overflow-hidden"
      }, _attrs))}><div${ssrRenderAttrs(mergeProps({
        class: unref(cn)(
          "flex",
          unref(orientation) === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          props.class
        )
      }, _ctx.$attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/CarouselContent.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "CarouselItem",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { orientation } = useCarousel();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        role: "group",
        "aria-roledescription": "slide",
        class: unref(cn)(
          "min-w-0 shrink-0 grow-0 basis-full",
          unref(orientation) === "horizontal" ? "pl-4" : "pt-4",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/CarouselItem.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "CarouselNext",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { orientation, canScrollNext, scrollNext } = useCarousel();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$a), mergeProps({
        disabled: !unref(canScrollNext),
        class: unref(cn)(
          "touch-manipulation absolute h-8 w-8 rounded-full p-0",
          unref(orientation) === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          props.class
        ),
        variant: "outline",
        onClick: unref(scrollNext)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4 text-current" }, null, _parent2, _scopeId));
              _push2(`<span class="sr-only"${_scopeId}>Next Slide</span>`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(unref(ArrowRight), { class: "h-4 w-4 text-current" }),
                createVNode("span", { class: "sr-only" }, "Next Slide")
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/CarouselNext.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "CarouselPrevious",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { orientation, canScrollPrev, scrollPrev } = useCarousel();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$a), mergeProps({
        disabled: !unref(canScrollPrev),
        class: unref(cn)(
          "touch-manipulation absolute h-8 w-8 rounded-full p-0",
          unref(orientation) === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          props.class
        ),
        variant: "outline",
        onClick: unref(scrollPrev)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4 text-current" }, null, _parent2, _scopeId));
              _push2(`<span class="sr-only"${_scopeId}>Previous Slide</span>`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(unref(ArrowLeft), { class: "h-4 w-4 text-current" }),
                createVNode("span", { class: "sr-only" }, "Previous Slide")
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/CarouselPrevious.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)(
          "rounded-xl border bg-card text-card-foreground shadow",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/card/Card.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "NavBar",
  __ssrInlineRender: true,
  setup(__props) {
    const drop = ref(false);
    const dropMobile = ref(false);
    const dropDown = ref();
    const resultDropDown = ref();
    const searchResults = ref([]);
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
      _push(ssrRenderComponent(_sfc_main$b, null, null, _parent));
      _push(`<div class="hidden lg:flex justify-center text-xl items-center gap-6 xl:gap-16"><div class="flex-none"><div class="relative"><div tabindex="0" role="button" class="text-deepblue bg-white btn text-xl m-1 rounded"> Clinics <span class="${ssrRenderClass([{ "rotate-180": drop.value }, "transition-all duration-150 ease-in-out"])}">`);
      _push(ssrRenderComponent(unref(SquareAltArrowUp), {
        style: !drop.value ? null : { display: "none" },
        class: "animate-in-out duration-150",
        weight: "Broken"
      }, null, _parent));
      _push(ssrRenderComponent(unref(SquareAltArrowDown), {
        style: drop.value ? null : { display: "none" },
        class: "animate-in-out duration-150 rotate-180",
        weight: "Broken"
      }, null, _parent));
      _push(`</span></div>`);
      if (drop.value) {
        _push(`<ul class="dropdown-content menu bg-base-100 z-1 absolute w-52 text-xl p-1 shadow-sm menu-compact text-white bg-deepblue rounded-md"><li class="hover:bg-white hover:text-deepblue rounded-md"><a>Item 1</a></li><li class="hover:bg-white hover:text-deepblue rounded-md"><a>Item 2</a></li></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex justify-center relative items-center text-xl shadow-lg rounded-md group border-2 border-transparent focus-within:border-deepblue transition-colors duration-200 w-48 xl:w-80"><div class="px-2">`);
      _push(ssrRenderComponent(unref(Magnifer), { class: "h-5 w-auto text-gray-400 group-focus-within:text-deepblue transition-colors duration-200" }, null, _parent));
      _push(`</div><input type="text" class="border-none outline-none text-xl focus:ring-0 bg-transparent py-2 px-2 w-full text-sm" placeholder="Search...">`);
      if (searchDropDown.value) {
        _push(`<div>`);
        if (searchResults.value.length <= 0) {
          _push(`<div class="absolute top-14 right-0 flex items-center justify-center w-full h-auto text-white bg-white shadow-lg rounded-md"><p class="text-black">No results found</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (searchResults.value.length > 0) {
          _push(`<div class="absolute top-11 right-0 grid px-3 py-3 items-center w-full h-auto gap-2 text-white bg-blue-200 z-50 shadow-lg rounded-md"><!--[-->`);
          ssrRenderList(searchResults.value, (result) => {
            _push(`<div class="text-white rounded-md px-3 py-1 shadow-md bg-black w-full"><p>${ssrInterpolate(result.title)}</p><p>${ssrInterpolate(result.description)}</p></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex justify-center items-center gap-6 xl:gap-10"><p class="text-deepblue cursor-pointer relative after:content-[&#39;&#39;] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 hover:-translate-y-1 duration-200 after:w-0 after:h-0.5 after:bg-deepblue after:transition-all after:duration-300 hover:after:w-full"> Blog </p><p class="text-deepblue cursor-pointer relative after:content-[&#39;&#39;] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 hover:-translate-y-1 duration-200 after:w-0 after:h-0.5 after:bg-deepblue after:transition-all after:duration-300 hover:after:w-full"> About Us </p></div></div><div class="hidden lg:flex justify-center items-center gap-4 text-xl xl:gap-10">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/login",
        class: "flex text-white btn btn-sm text-xl xl:btn-md bg-deepblue rounded-lg justify-center items-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:shadow-deepblue/30"
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
        class: "flex btn btn-sm xl:btn-md text-xl text-white bg-deepgreen rounded-lg justify-center items-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:shadow-deepgreen/30 whitespace-nowrap"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Signup for free `);
          } else {
            return [
              createTextVNode(" Signup for free ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><button class="lg:hidden p-2 text-deepblue">`);
      if (!mobileMenu.value) {
        _push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`);
      } else {
        _push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`);
      }
      _push(`</button></div>`);
      if (mobileMenu.value) {
        _push(`<div class="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50"><div class="flex flex-col p-4 space-y-4"><div class="flex items-center shadow-lg rounded-md group border-2 border-transparent focus-within:border-deepblue transition-colors duration-200"><div class="px-3">`);
        _push(ssrRenderComponent(unref(Magnifer), { class: "h-5 w-auto text-gray-400 group-focus-within:text-deepblue transition-colors duration-200" }, null, _parent));
        _push(`</div><input type="text" class="border-none outline-none focus:ring-0 bg-transparent py-2 px-2 w-full text-sm" placeholder="Search..."></div><div><button class="w-full text-left text-deepblue btn bg-gray-50 rounded justify-between"> Clinics <span class="${ssrRenderClass([{ "rotate-180": dropMobile.value }, "transition-transform duration-150 ease-in-out"])}">`);
        _push(ssrRenderComponent(unref(SquareAltArrowUp), {
          style: !dropMobile.value ? null : { display: "none" },
          weight: "Broken"
        }, null, _parent));
        _push(ssrRenderComponent(unref(SquareAltArrowDown), {
          style: dropMobile.value ? null : { display: "none" },
          class: "rotate-180",
          weight: "Broken"
        }, null, _parent));
        _push(`</span></button>`);
        if (dropMobile.value) {
          _push(`<ul class="mt-2 bg-deepblue rounded-md p-1 space-y-1"><li class="hover:bg-white hover:text-deepblue rounded-md transition-colors duration-150 text-white p-2"><a>Item 1</a></li><li class="hover:bg-white hover:text-deepblue rounded-md transition-colors duration-150 text-white p-2"><a>Item 2</a></li></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex flex-col space-y-3 pt-2 border-t"><p class="text-deepblue cursor-pointer hover:translate-x-1 transition-transform duration-200"> Blog </p><p class="text-deepblue cursor-pointer hover:translate-x-1 transition-transform duration-200"> About Us </p></div><div class="flex flex-col space-y-3 pt-2 border-t">`);
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
              _push2(` Signup for free `);
            } else {
              return [
                createTextVNode(" Signup for free ")
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Home/NavBar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "GuestLayout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><video src="/assets/background.mp4" class="fixed top-0 left-0 object-cover w-full h-full" autoplay muted loop></video><div class="z-50 h-screen relative w-screen flex">`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`<div class="h-full w-full scrollbar-none">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div><!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "GuestFooter",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-card border-t text-xl border-border py-12" }, _attrs))}><div class="container mx-auto px-4 sm:px-6 lg:px-8"><div class="grid md:grid-cols-4 text-xl gap-8 mb-8"><div class="space-y-4">`);
      _push(ssrRenderComponent(_sfc_main$b, null, null, _parent));
      _push(`<p class="text-xl text-muted-foreground"> Streamlining test results delivery for modern healthcare providers </p></div><div><h4 class="font-semibold mb-4">Product</h4><ul class="space-y-2 text-lg text-muted-foreground"><li><a href="#" class="hover:text-primary transition-colors">Features</a></li><li><a href="#" class="hover:text-primary transition-colors">Pricing</a></li><li><a href="#" class="hover:text-primary transition-colors">Security</a></li><li><a href="#" class="hover:text-primary transition-colors">Integration</a></li></ul></div><div><h4 class="font-semibold mb-4">Company</h4><ul class="space-y-2 text-lg text-muted-foreground"><li><a href="#" class="hover:text-primary transition-colors">About Us</a></li><li><a href="#" class="hover:text-primary transition-colors">Careers</a></li><li><a href="#" class="hover:text-primary transition-colors">Blog</a></li><li><a href="#" class="hover:text-primary transition-colors">Contact</a></li></ul></div><div><h4 class="font-semibold mb-4">Support</h4><ul class="space-y-2 text-lg text-muted-foreground"><li><a href="#" class="hover:text-primary transition-colors">Help Center</a></li><li><a href="#" class="hover:text-primary transition-colors">Documentation</a></li><li><a href="#" class="hover:text-primary transition-colors">Privacy Policy</a></li><li><a href="#" class="hover:text-primary transition-colors">Terms of Service</a></li></ul></div></div><div class="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"><p class="text-md text-muted-foreground"> © 2025 OodoMedlink. All rights reserved. </p><div class="flex items-center gap-2 text-md text-muted-foreground"><span>Made with</span>`);
      _push(ssrRenderComponent(unref(HeartShine), {
        weight: "Bold",
        class: "fill-deepblue text-deepblue w-auto h-8"
      }, null, _parent));
      _push(`<span>for healthcare professionals</span></div></div></div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Home/GuestFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Welcome",
  __ssrInlineRender: true,
  setup(__props) {
    const emblaMainApi = ref();
    const emblaThumbnailApi = ref();
    const selectedIndex = ref(0);
    const email = ref("");
    const images = ref([
      {
        id: 1,
        src: "/assets/med1.jpg",
        alt: "med1"
      },
      {
        id: 2,
        src: "/assets/med2.jpg",
        alt: "med2"
      },
      {
        id: 3,
        src: "/assets/med3.jpg",
        alt: "med3"
      }
    ]);
    const benefits = ref([
      {
        title: "Reduce Administrative Burden",
        description: "Automate repetitive tasks and free up staff to focus on patient care."
      },
      {
        title: "Improve Patient Experience",
        description: "Patients receive results faster with clear, professional communication."
      },
      {
        title: "Enhance Security & Compliance",
        description: "Built-in encryption and audit trails ensure data protection and regulatory compliance."
      },
      {
        title: "Scale Effortlessly",
        description: "Handle growing patient volumes without adding administrative overhead."
      }
    ]);
    const stats = ref([
      {
        title: "80%",
        subject: "Time Saved",
        description: "On average, clinics reduce administrative work by 80% using our platform"
      },
      {
        title: "4.9/5",
        subject: "Customer Rating",
        description: "Highly rated by healthcare professionals for ease of use and reliability"
      },
      {
        title: "<5min",
        subject: "Average Setup",
        description: "Get started in minutes with our intuitive onboarding process"
      }
    ]);
    const features = ref([
      {
        icon: Upload,
        title: "Easy Upload",
        description: "Drag and drop test results in any format. Bulk upload support for multiple patients."
      },
      {
        icon: FileText,
        title: "Smart Management",
        description: "Organize, categorize, and search through all test results with powerful filters."
      },
      {
        icon: Mailbox,
        title: "Automated Delivery",
        description: "Send results directly to patients via secure email with customizable templates."
      },
      {
        icon: Shield,
        title: "HIPAA Compliant",
        description: "End-to-end encryption and compliance with healthcare data protection standards."
      },
      {
        icon: ClockCircle,
        title: "Save Time",
        description: "Reduce manual work by 80%. Automated workflows free up your staff's time."
      },
      {
        icon: PieChart2,
        title: "Analytics",
        description: "Track delivery status, patient engagement, and workflow efficiency metrics."
      }
    ]);
    const onSelect = () => {
      if (!emblaMainApi.value || !emblaThumbnailApi.value)
        return;
      selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
      emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
    };
    const onThumbClick = (index) => {
      if (!emblaMainApi.value || !emblaThumbnailApi.value)
        return;
      emblaMainApi.value.scrollTo(index);
    };
    watchOnce(emblaMainApi, (emblaMainApi2) => {
      if (!emblaMainApi2)
        return;
      onSelect();
      emblaMainApi2.on("select", onSelect);
      emblaMainApi2.on("reInit", onSelect);
    });
    const startNow = () => {
      sessionStorage.setItem("email", email.value);
      return router.get("/signup");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Home" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16 my-40 px-6 sm:px-6 lg:px-12 2xl:px-10 2xl:gap-32 2xl:my-44"${_scopeId}><div class="w-full lg:w-[45%] flex flex-col space-y-6 max-w-2xl"${_scopeId}><h1 class="text-4xl sm:text-4xl lg:text-6xl 2xl:text-8xl font-bold leading-tight text-black"${_scopeId}> Fast,<br${_scopeId}> Secure and<br${_scopeId}> Convenient<br${_scopeId}> Test Results </h1><p class="text-base font-bold sm:text-lg lg:text-xl 2xl:text-2xl text-gray-700 leading-relaxed"${_scopeId}> Your health and peace of mind should not be a gamble. Oodo Medlink gives you fast, secure and convenient access to your lab test results anytime, anywhere. </p><div class="w-full"${_scopeId}><div class="flex flex-col sm:flex-row gap-3 sm:gap-4"${_scopeId}><label for="email-input" class="sr-only"${_scopeId}>Email address</label><input type="email" id="email-input"${ssrRenderAttr("value", email.value)} class="flex-1 px-4 py-3 font-extrabold text-lg rounded-md border text-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-deepblue focus:border-transparent" placeholder="Enter your email" aria-label="Enter your email address"${_scopeId}><button class="px-6 py-3 bg-gradient-to-br text-xl from-deepblue to-deepgreen rounded-md text-white font-medium hover:opacity-90 transition-opacity duration-300 focus:ring-2 focus:ring-deepblue focus:outline-none whitespace-nowrap" aria-label="Start now"${_scopeId}> Start Now </button></div></div></div><div class="w-full lg:w-[51%]"${_scopeId}><div class="w-full max-w-xl 2xl:max-w-none space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$9), {
              plugins: [unref(Autoplay)({ delay: 5e3 })],
              class: "relative w-full rounded-lg overflow-hidden shadow-lg 2xl:h-[600px] 2xl:w-[950px]",
              onInitApi: (val) => emblaMainApi.value = val,
              "aria-label": "Featured images carousel"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$8), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(images.value, (image) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$7), {
                            key: image.id,
                            class: "rounded-lg"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<img${ssrRenderAttr("src", image.src)}${ssrRenderAttr("alt", image.alt)} class="w-full h-full object-cover rounded-lg"${_scopeId4}>`);
                              } else {
                                return [
                                  createVNode("img", {
                                    src: image.src,
                                    alt: image.alt,
                                    class: "w-full h-full object-cover rounded-lg"
                                  }, null, 8, ["src", "alt"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(images.value, (image) => {
                            return openBlock(), createBlock(unref(_sfc_main$7), {
                              key: image.id,
                              class: "rounded-lg"
                            }, {
                              default: withCtx(() => [
                                createVNode("img", {
                                  src: image.src,
                                  alt: image.alt,
                                  class: "w-full h-full object-cover rounded-lg"
                                }, null, 8, ["src", "alt"])
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$8), null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(images.value, (image) => {
                          return openBlock(), createBlock(unref(_sfc_main$7), {
                            key: image.id,
                            class: "rounded-lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("img", {
                                src: image.src,
                                alt: image.alt,
                                class: "w-full h-full object-cover rounded-lg"
                              }, null, 8, ["src", "alt"])
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$9), {
              class: "relative w-full 2xl:w-[950px]",
              onInitApi: (val) => emblaThumbnailApi.value = val,
              "aria-label": "Carousel navigation"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "flex justify-center gap-2 ml-0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(images.value.length, (_4, index) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$7), {
                            key: index,
                            class: "pl-0 basis-auto cursor-pointer",
                            onClick: ($event) => onThumbClick(index),
                            "aria-label": `Go to slide ${index + 1}`,
                            role: "button",
                            tabindex: "0",
                            onKeydown: [($event) => onThumbClick(index), ($event) => onThumbClick(index)]
                          }, {
                            default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="${ssrRenderClass([index === selectedIndex.value ? "opacity-100" : "opacity-50", "transition-opacity duration-300"])}"${_scopeId4}><div class="${ssrRenderClass([index === selectedIndex.value ? "w-20 bg-gradient-to-br from-deepblue to-deepgreen" : "w-8 bg-gray-400", "h-2 rounded-full transition-all duration-300"])}"${_scopeId4}></div></div>`);
                              } else {
                                return [
                                  createVNode("div", {
                                    class: ["transition-opacity duration-300", index === selectedIndex.value ? "opacity-100" : "opacity-50"]
                                  }, [
                                    createVNode("div", {
                                      class: ["h-2 rounded-full transition-all duration-300", index === selectedIndex.value ? "w-20 bg-gradient-to-br from-deepblue to-deepgreen" : "w-8 bg-gray-400"]
                                    }, null, 2)
                                  ], 2)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(images.value.length, (_4, index) => {
                            return openBlock(), createBlock(unref(_sfc_main$7), {
                              key: index,
                              class: "pl-0 basis-auto cursor-pointer",
                              onClick: ($event) => onThumbClick(index),
                              "aria-label": `Go to slide ${index + 1}`,
                              role: "button",
                              tabindex: "0",
                              onKeydown: [
                                withKeys(($event) => onThumbClick(index), ["enter"]),
                                withKeys(withModifiers(($event) => onThumbClick(index), ["prevent"]), ["space"])
                              ]
                            }, {
                              default: withCtx(() => [
                                createVNode("div", {
                                  class: ["transition-opacity duration-300", index === selectedIndex.value ? "opacity-100" : "opacity-50"]
                                }, [
                                  createVNode("div", {
                                    class: ["h-2 rounded-full transition-all duration-300", index === selectedIndex.value ? "w-20 bg-gradient-to-br from-deepblue to-deepgreen" : "w-8 bg-gray-400"]
                                  }, null, 2)
                                ], 2)
                              ]),
                              _: 2
                            }, 1032, ["onClick", "aria-label", "onKeydown"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$8), { class: "flex justify-center gap-2 ml-0" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(images.value.length, (_3, index) => {
                          return openBlock(), createBlock(unref(_sfc_main$7), {
                            key: index,
                            class: "pl-0 basis-auto cursor-pointer",
                            onClick: ($event) => onThumbClick(index),
                            "aria-label": `Go to slide ${index + 1}`,
                            role: "button",
                            tabindex: "0",
                            onKeydown: [
                              withKeys(($event) => onThumbClick(index), ["enter"]),
                              withKeys(withModifiers(($event) => onThumbClick(index), ["prevent"]), ["space"])
                            ]
                          }, {
                            default: withCtx(() => [
                              createVNode("div", {
                                class: ["transition-opacity duration-300", index === selectedIndex.value ? "opacity-100" : "opacity-50"]
                              }, [
                                createVNode("div", {
                                  class: ["h-2 rounded-full transition-all duration-300", index === selectedIndex.value ? "w-20 bg-gradient-to-br from-deepblue to-deepgreen" : "w-8 bg-gray-400"]
                                }, null, 2)
                              ], 2)
                            ]),
                            _: 2
                          }, 1032, ["onClick", "aria-label", "onKeydown"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><section class="py-24 bg-gradient-to-b from-background to-secondary/20"${_scopeId}><div class="container mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="text-center max-w-3xl mx-auto mb-16"${_scopeId}><h2 class="text-4xl sm:text-5xl font-bold mb-4 2xl:text-7xl"${_scopeId}> Everything You Need </h2><p class="text-xl 2xl:text-2xl text-muted-foreground"${_scopeId}> Powerful features designed specifically for modern clinics </p></div><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"${_scopeId}><!--[-->`);
            ssrRenderList(features.value, (feature, index) => {
              _push2(ssrRenderComponent(_sfc_main$4, {
                key: index,
                class: "p-8 hover:shadow-lg hover:bg-gradient-to-br group hover:text-white hover:from-deepblue hover:via-deepgreen hover:to-white transition-all duration-300 border-border hover:border-none bg-card/50 backdrop-blur-sm group hover:-translate-y-1"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="h-14 w-14 group-hover:bg-white rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"${_scopeId2}>`);
                    ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(feature.icon), { class: "h-6 w-6 text-primary" }, null), _parent3, _scopeId2);
                    _push3(`</div><h3 class="text-xl font-semibold mb-3"${_scopeId2}>${ssrInterpolate(feature.title)}</h3><p class="text-muted-foreground group-hover:text-white text-xl leading-relaxed"${_scopeId2}>${ssrInterpolate(feature.description)}</p>`);
                  } else {
                    return [
                      createVNode("div", { class: "h-14 w-14 group-hover:bg-white rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors" }, [
                        (openBlock(), createBlock(resolveDynamicComponent(feature.icon), { class: "h-6 w-6 text-primary" }))
                      ]),
                      createVNode("h3", { class: "text-xl font-semibold mb-3" }, toDisplayString(feature.title), 1),
                      createVNode("p", { class: "text-muted-foreground group-hover:text-white text-xl leading-relaxed" }, toDisplayString(feature.description), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></div></section><section class="py-24 bg-card"${_scopeId}><div class="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16"${_scopeId}><div class="grid lg:grid-cols-2 gap-16 items-center"${_scopeId}><div class="space-y-8"${_scopeId}><div${_scopeId}><h2 class="text-4xl 2xl:text-6xl sm:text-5xl font-bold mb-4"${_scopeId}> Why Clinics Choose Us </h2><p class="text-xl 2xl:text-3xl text-muted-foreground"${_scopeId}> Join hundreds of healthcare providers who have transformed their workflow </p></div><div class="space-y-6"${_scopeId}><!--[-->`);
            ssrRenderList(benefits.value, (benefit) => {
              _push2(`<div${_scopeId}><div class="flex-shrink-0 mt-1"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-6 w-6 text-primary group-hover:scale-110 transition-transform" }, null, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><h3 class="text-2xl font-semibold mb-2"${_scopeId}>${ssrInterpolate(benefit.title)}</h3><p class="text-muted-foreground text-xl leading-relaxed"${_scopeId}>${ssrInterpolate(benefit.description)}</p></div></div>`);
            });
            _push2(`<!--]--></div></div></div><div class="space-y-6"${_scopeId}><!--[-->`);
            ssrRenderList(stats.value, (stat) => {
              _push2(`<div class="bg-gradient-to-br from-deepblue via-deepgreen to-white p-8 text-white rounded-2xl border border-none shadow-lg"${_scopeId}><div class="text-5xl font-bold text-white mb-2 2xl:text-6xl"${_scopeId}>${ssrInterpolate(stat.title)}</div><div class="text-lg font-semibold mb-2 2xl:text-2xl"${_scopeId}>${ssrInterpolate(stat.subject)}</div><p class="bg-gradient-to-br from-white to-deepblue bg-clip-text 2xl:text-xl"${_scopeId}>${ssrInterpolate(stat.description)}</p></div>`);
            });
            _push2(`<!--]--></div></div></section>`);
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "w-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16 my-40 px-6 sm:px-6 lg:px-12 2xl:px-10 2xl:gap-32 2xl:my-44" }, [
                createVNode("div", { class: "w-full lg:w-[45%] flex flex-col space-y-6 max-w-2xl" }, [
                  createVNode("h1", { class: "text-4xl sm:text-4xl lg:text-6xl 2xl:text-8xl font-bold leading-tight text-black" }, [
                    createTextVNode(" Fast,"),
                    createVNode("br"),
                    createTextVNode(" Secure and"),
                    createVNode("br"),
                    createTextVNode(" Convenient"),
                    createVNode("br"),
                    createTextVNode(" Test Results ")
                  ]),
                  createVNode("p", { class: "text-base font-bold sm:text-lg lg:text-xl 2xl:text-2xl text-gray-700 leading-relaxed" }, " Your health and peace of mind should not be a gamble. Oodo Medlink gives you fast, secure and convenient access to your lab test results anytime, anywhere. "),
                  createVNode("div", { class: "w-full" }, [
                    createVNode("div", { class: "flex flex-col sm:flex-row gap-3 sm:gap-4" }, [
                      createVNode("label", {
                        for: "email-input",
                        class: "sr-only"
                      }, "Email address"),
                      withDirectives(createVNode("input", {
                        type: "email",
                        id: "email-input",
                        "onUpdate:modelValue": ($event) => email.value = $event,
                        class: "flex-1 px-4 py-3 font-extrabold text-lg rounded-md border text-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-deepblue focus:border-transparent",
                        placeholder: "Enter your email",
                        "aria-label": "Enter your email address"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, email.value]
                      ]),
                      createVNode("button", {
                        onClick: startNow,
                        class: "px-6 py-3 bg-gradient-to-br text-xl from-deepblue to-deepgreen rounded-md text-white font-medium hover:opacity-90 transition-opacity duration-300 focus:ring-2 focus:ring-deepblue focus:outline-none whitespace-nowrap",
                        "aria-label": "Start now"
                      }, " Start Now ")
                    ])
                  ])
                ]),
                createVNode("div", { class: "w-full lg:w-[51%]" }, [
                  createVNode("div", { class: "w-full max-w-xl 2xl:max-w-none space-y-4" }, [
                    createVNode(unref(_sfc_main$9), {
                      plugins: [unref(Autoplay)({ delay: 5e3 })],
                      class: "relative w-full rounded-lg overflow-hidden shadow-lg 2xl:h-[600px] 2xl:w-[950px]",
                      onInitApi: (val) => emblaMainApi.value = val,
                      "aria-label": "Featured images carousel"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(images.value, (image) => {
                              return openBlock(), createBlock(unref(_sfc_main$7), {
                                key: image.id,
                                class: "rounded-lg"
                              }, {
                                default: withCtx(() => [
                                  createVNode("img", {
                                    src: image.src,
                                    alt: image.alt,
                                    class: "w-full h-full object-cover rounded-lg"
                                  }, null, 8, ["src", "alt"])
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["plugins", "onInitApi"]),
                    createVNode(unref(_sfc_main$9), {
                      class: "relative w-full 2xl:w-[950px]",
                      onInitApi: (val) => emblaThumbnailApi.value = val,
                      "aria-label": "Carousel navigation"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), { class: "flex justify-center gap-2 ml-0" }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(images.value.length, (_2, index) => {
                              return openBlock(), createBlock(unref(_sfc_main$7), {
                                key: index,
                                class: "pl-0 basis-auto cursor-pointer",
                                onClick: ($event) => onThumbClick(index),
                                "aria-label": `Go to slide ${index + 1}`,
                                role: "button",
                                tabindex: "0",
                                onKeydown: [
                                  withKeys(($event) => onThumbClick(index), ["enter"]),
                                  withKeys(withModifiers(($event) => onThumbClick(index), ["prevent"]), ["space"])
                                ]
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", {
                                    class: ["transition-opacity duration-300", index === selectedIndex.value ? "opacity-100" : "opacity-50"]
                                  }, [
                                    createVNode("div", {
                                      class: ["h-2 rounded-full transition-all duration-300", index === selectedIndex.value ? "w-20 bg-gradient-to-br from-deepblue to-deepgreen" : "w-8 bg-gray-400"]
                                    }, null, 2)
                                  ], 2)
                                ]),
                                _: 2
                              }, 1032, ["onClick", "aria-label", "onKeydown"]);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["onInitApi"])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-24 bg-gradient-to-b from-background to-secondary/20" }, [
                createVNode("div", { class: "container mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "text-center max-w-3xl mx-auto mb-16" }, [
                    createVNode("h2", { class: "text-4xl sm:text-5xl font-bold mb-4 2xl:text-7xl" }, " Everything You Need "),
                    createVNode("p", { class: "text-xl 2xl:text-2xl text-muted-foreground" }, " Powerful features designed specifically for modern clinics ")
                  ]),
                  createVNode("div", { class: "grid md:grid-cols-2 lg:grid-cols-3 gap-8" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(features.value, (feature, index) => {
                      return openBlock(), createBlock(_sfc_main$4, {
                        key: index,
                        class: "p-8 hover:shadow-lg hover:bg-gradient-to-br group hover:text-white hover:from-deepblue hover:via-deepgreen hover:to-white transition-all duration-300 border-border hover:border-none bg-card/50 backdrop-blur-sm group hover:-translate-y-1"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "h-14 w-14 group-hover:bg-white rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors" }, [
                            (openBlock(), createBlock(resolveDynamicComponent(feature.icon), { class: "h-6 w-6 text-primary" }))
                          ]),
                          createVNode("h3", { class: "text-xl font-semibold mb-3" }, toDisplayString(feature.title), 1),
                          createVNode("p", { class: "text-muted-foreground group-hover:text-white text-xl leading-relaxed" }, toDisplayString(feature.description), 1)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ])
                ])
              ]),
              createVNode("section", { class: "py-24 bg-card" }, [
                createVNode("div", { class: "container mx-auto px-4 sm:px-6 lg:px-8 space-y-16" }, [
                  createVNode("div", { class: "grid lg:grid-cols-2 gap-16 items-center" }, [
                    createVNode("div", { class: "space-y-8" }, [
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-4xl 2xl:text-6xl sm:text-5xl font-bold mb-4" }, " Why Clinics Choose Us "),
                        createVNode("p", { class: "text-xl 2xl:text-3xl text-muted-foreground" }, " Join hundreds of healthcare providers who have transformed their workflow ")
                      ]),
                      createVNode("div", { class: "space-y-6" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(benefits.value, (benefit) => {
                          return openBlock(), createBlock("div", {
                            key: benefit.title
                          }, [
                            createVNode("div", { class: "flex-shrink-0 mt-1" }, [
                              createVNode(unref(CheckCircle), { class: "h-6 w-6 text-primary group-hover:scale-110 transition-transform" })
                            ]),
                            createVNode("div", null, [
                              createVNode("h3", { class: "text-2xl font-semibold mb-2" }, toDisplayString(benefit.title), 1),
                              createVNode("p", { class: "text-muted-foreground text-xl leading-relaxed" }, toDisplayString(benefit.description), 1)
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(stats.value, (stat) => {
                      return openBlock(), createBlock("div", {
                        key: stat.title,
                        class: "bg-gradient-to-br from-deepblue via-deepgreen to-white p-8 text-white rounded-2xl border border-none shadow-lg"
                      }, [
                        createVNode("div", { class: "text-5xl font-bold text-white mb-2 2xl:text-6xl" }, toDisplayString(stat.title), 1),
                        createVNode("div", { class: "text-lg font-semibold mb-2 2xl:text-2xl" }, toDisplayString(stat.subject), 1),
                        createVNode("p", { class: "bg-gradient-to-br from-white to-deepblue bg-clip-text 2xl:text-xl" }, toDisplayString(stat.description), 1)
                      ]);
                    }), 128))
                  ])
                ])
              ]),
              createVNode(_sfc_main$1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Welcome.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
