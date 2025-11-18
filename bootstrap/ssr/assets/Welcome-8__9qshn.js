import { defineComponent, mergeProps, unref, useSSRContext, ref, onMounted, withCtx, renderSlot, createVNode, onUnmounted, createTextVNode, createBlock, openBlock, Fragment, renderList, withKeys, withModifiers, resolveDynamicComponent, toDisplayString, withDirectives, vModelText } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderVNode } from "vue/server-renderer";
import { HeartShine, SquareAltArrowUp, SquareAltArrowDown, Magnifer, Upload, FileText, Mailbox, Shield, ClockCircle, PieChart2, CheckCircle } from "@solar-icons/vue";
import { _ as _sfc_main$a } from "./ApplicationLogo-Bxi8t0Nk.js";
import { c as cn } from "./utils-H80jjgLf.js";
import { createInjectionState, onClickOutside, watchOnce } from "@vueuse/core";
import emblaCarouselVue from "embla-carousel-vue";
import { _ as _sfc_main$b } from "./index-D-5AVEXV.js";
import { ArrowRight, ArrowLeft } from "lucide-vue-next";
import { Link, Head, router } from "@inertiajs/vue3";
import Autoplay from "embla-carousel-autoplay";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "reka-ui";
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "GuestFooter",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "border-t border-border bg-card bg-primaryDark py-12 text-xl" }, _attrs))}><div class="container mx-auto px-4 sm:px-6 lg:px-8"><div class="mb-8 grid gap-8 text-xl md:grid-cols-4"><div class="space-y-4"><button class="rounded-lg bg-white p-1">`);
      _push(ssrRenderComponent(_sfc_main$a, null, null, _parent));
      _push(`</button><p class="text-xl font-extrabold text-primaryLight"> Streamlining test results delivery for modern healthcare providers </p></div><div><h4 class="mb-4 font-extrabold text-primaryLight"> Product </h4><ul class="space-y-2 text-xl font-extrabold text-primaryLight"><li><a href="#" class="transition-colors hover:text-primary">Features</a></li><li><a href="#" class="transition-colors hover:text-primary">Pricing</a></li><li><a href="#" class="transition-colors hover:text-primary">Security</a></li><li><a href="#" class="transition-colors hover:text-primary">Integration</a></li></ul></div><div><h4 class="mb-4 font-extrabold text-primaryLight"> Company </h4><ul class="space-y-2 text-xl font-extrabold text-primaryLight"><li><a href="#" class="transition-colors hover:text-primary">About Us</a></li><li><a href="#" class="transition-colors hover:text-primary">Careers</a></li><li><a href="#" class="transition-colors hover:text-primary">Blog</a></li><li><a href="#" class="transition-colors hover:text-primary">Contact</a></li></ul></div><div><h4 class="mb-4 font-extrabold text-primaryLight"> Support </h4><ul class="space-y-2 text-xl font-extrabold text-primaryLight"><li><a href="#" class="transition-colors hover:text-primary">Help Center</a></li><li><a href="#" class="transition-colors hover:text-primary">Documentation</a></li><li><a href="#" class="transition-colors hover:text-primary">Privacy Policy</a></li><li><a href="#" class="transition-colors hover:text-primary">Terms of Service</a></li></ul></div></div><div class="flex flex-col items-center justify-between gap-4 border-t border-border bg-primaryDark pt-8 md:flex-row"><p class="text-xl font-extrabold text-primaryLight"> © 2025 OodoMedlink. All rights reserved. </p><div class="flex items-center gap-2 text-xl font-extrabold text-primaryLight"><span>Made with</span>`);
      _push(ssrRenderComponent(unref(HeartShine), {
        weight: "Bold",
        class: "h-8 w-auto fill-primaryDark text-primaryLight"
      }, null, _parent));
      _push(`<span>for healthcare professionals</span></div></div></div></footer>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Home/GuestFooter.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/card/Card.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const [useProvideCarousel, useInjectCarousel] = createInjectionState(
  ({ opts, orientation, plugins }, emits) => {
    const [emblaNode, emblaApi] = emblaCarouselVue(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    );
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
      if (!emblaApi.value) return;
      emblaApi.value?.on("init", onSelect);
      emblaApi.value?.on("reInit", onSelect);
      emblaApi.value?.on("select", onSelect);
      emits("init-api", emblaApi.value);
    });
    return {
      carouselRef: emblaNode,
      carouselApi: emblaApi,
      canScrollPrev,
      canScrollNext,
      scrollPrev,
      scrollNext,
      orientation
    };
  }
);
function useCarousel() {
  const carouselState = useInjectCarousel();
  if (!carouselState)
    throw new Error("useCarousel must be used within a <Carousel />");
  return carouselState;
}
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
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
    const {
      canScrollNext,
      canScrollPrev,
      carouselApi,
      carouselRef,
      orientation,
      scrollNext,
      scrollPrev
    } = useProvideCarousel(props, emits);
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/Carousel.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/CarouselContent.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/CarouselItem.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CarouselNext",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { orientation, canScrollNext, scrollNext } = useCarousel();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$b), mergeProps({
        disabled: !unref(canScrollNext),
        class: unref(cn)(
          "absolute h-8 w-8 touch-manipulation rounded-full p-0",
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/CarouselNext.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CarouselPrevious",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { orientation, canScrollPrev, scrollPrev } = useCarousel();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$b), mergeProps({
        disabled: !unref(canScrollPrev),
        class: unref(cn)(
          "absolute h-8 w-8 touch-manipulation rounded-full p-0",
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/carousel/CarouselPrevious.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
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
    const selectionModal = ref(false);
    ref();
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
      _push(`<!--[--><nav class="navbar fixed top-0 z-50 flex w-full items-center bg-base-100 bg-white px-4 py-3 shadow-md md:px-8 lg:px-12"><div class="flex w-full items-center justify-between">`);
      _push(ssrRenderComponent(_sfc_main$a, null, null, _parent));
      _push(`<div class="hidden items-center justify-center gap-6 text-xl lg:flex xl:gap-16"><div class="flex-none"><div class="relative"><div tabindex="0" role="button" class="btn m-1 rounded bg-white text-xl text-primaryDark"> Clinics <span class="${ssrRenderClass([{ "rotate-180": drop.value }, "transition-all duration-150 ease-in-out"])}">`);
      _push(ssrRenderComponent(unref(SquareAltArrowUp), {
        style: !drop.value ? null : { display: "none" },
        class: "animate-in-out duration-150",
        weight: "Broken"
      }, null, _parent));
      _push(ssrRenderComponent(unref(SquareAltArrowDown), {
        style: drop.value ? null : { display: "none" },
        class: "animate-in-out rotate-180 duration-150",
        weight: "Broken"
      }, null, _parent));
      _push(`</span></div>`);
      if (drop.value) {
        _push(`<ul class="z-1 menu-compact dropdown-content menu absolute w-52 rounded-md bg-base-100 bg-primaryDark p-1 text-xl text-white shadow-sm"><li class="rounded-md hover:bg-white hover:text-primaryDark"><a>Item 1</a></li><li class="rounded-md hover:bg-white hover:text-primaryDark"><a>Item 2</a></li></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="group relative flex w-48 items-center justify-center rounded-md border-2 border-transparent text-xl shadow-lg transition-colors duration-200 focus-within:border-primaryDark xl:w-80"><div class="px-2">`);
      _push(ssrRenderComponent(unref(Magnifer), { class: "h-5 w-auto text-gray-400 transition-colors duration-200 group-focus-within:text-primaryDark" }, null, _parent));
      _push(`</div><input type="text" class="w-full border-none bg-transparent px-2 py-2 text-xl outline-none focus:ring-0" placeholder="Search...">`);
      if (searchDropDown.value) {
        _push(`<div>`);
        if (searchResults.value.length <= 0) {
          _push(`<div class="absolute right-0 top-14 flex h-auto w-full items-center justify-center rounded-md bg-white text-white shadow-lg"><p class="text-black">No results found</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (searchResults.value.length > 0) {
          _push(`<div class="absolute right-0 top-11 z-50 grid h-auto w-full items-center gap-2 rounded-md bg-blue-200 px-3 py-3 text-white shadow-lg"><!--[-->`);
          ssrRenderList(searchResults.value, (result) => {
            _push(`<div class="w-full rounded-md bg-black px-3 py-1 text-white shadow-md"><p>${ssrInterpolate(result.title)}</p><p>${ssrInterpolate(result.description)}</p></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center justify-center gap-6 text-xl font-extrabold xl:gap-10"><p class="relative cursor-pointer text-primaryDark duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-primaryDark after:transition-all after:duration-300 after:content-[&#39;&#39;] hover:-translate-y-1 hover:after:w-full"> Blog </p><p class="relative cursor-pointer text-primaryDark duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-primaryDark after:transition-all after:duration-300 after:content-[&#39;&#39;] hover:-translate-y-1 hover:after:w-full"> About Us </p></div></div><div class="hidden items-center justify-center gap-4 text-xl font-extrabold lg:flex xl:gap-10">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("login"),
        class: "btn btn-lg flex cursor-pointer items-center justify-center rounded-lg border-2 border-primaryDark bg-white text-xl text-primaryDark transition-all duration-200 hover:-translate-y-1 hover:bg-primaryDark hover:text-white hover:shadow-lg hover:shadow-primaryDark/30"
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
      _push(`<div class="btn btn-lg flex cursor-pointer items-center justify-center whitespace-nowrap rounded-lg bg-primaryDark text-xl text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primaryDark/30"> Signup for free </div></div><button class="p-2 text-primaryDark lg:hidden">`);
      if (!mobileMenu.value) {
        _push(`<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`);
      } else {
        _push(`<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`);
      }
      _push(`</button></div>`);
      if (mobileMenu.value) {
        _push(`<div class="absolute left-0 right-0 top-full z-50 border-t bg-white shadow-lg lg:hidden"><div class="flex flex-col space-y-4 p-4"><div class="group flex items-center rounded-md border-2 border-transparent shadow-lg transition-colors duration-200 focus-within:border-primaryDark"><div class="px-3">`);
        _push(ssrRenderComponent(unref(Magnifer), { class: "h-5 w-auto text-gray-400 transition-colors duration-200 group-focus-within:text-primaryDark" }, null, _parent));
        _push(`</div><input type="text" class="w-full border-none bg-transparent px-2 py-2 text-sm outline-none focus:ring-0" placeholder="Search..."></div><div><button class="btn w-full justify-between rounded bg-gray-50 text-left text-primaryDark"> Clinics <span class="${ssrRenderClass([{ "rotate-180": dropMobile.value }, "transition-transform duration-150 ease-in-out"])}">`);
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
          _push(`<ul class="mt-2 space-y-1 rounded-md bg-primaryDark p-1"><li class="rounded-md p-2 text-white transition-colors duration-150 hover:bg-white hover:text-primaryDark"><a>Item 1</a></li><li class="rounded-md p-2 text-white transition-colors duration-150 hover:bg-white hover:text-primaryDark"><a>Item 2</a></li></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex flex-col space-y-3 border-t pt-2"><p class="cursor-pointer text-primaryDark transition-transform duration-200 hover:translate-x-1"> Blog </p><p class="cursor-pointer text-primaryDark transition-transform duration-200 hover:translate-x-1"> About Us </p></div><div class="flex flex-col space-y-3 border-t pt-2">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("login"),
          class: "btn flex cursor-pointer items-center justify-center rounded-lg bg-primaryDark text-white transition-all duration-200 hover:shadow-lg hover:shadow-primaryDark/30"
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
        _push(`<div class="btn flex cursor-pointer items-center justify-center rounded-lg bg-primaryDark text-white transition-all duration-200 hover:shadow-lg hover:shadow-primaryDark/30"> Signup for free </div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav>`);
      if (selectionModal.value) {
        _push(`<div id="modal" autofocus class="fixed inset-0 z-50 flex h-screen items-center justify-center bg-black bg-opacity-50 p-4 py-20"><div class="relative h-full w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 pb-20 pt-14 shadow-2xl scrollbar-none md:p-10 lg:h-max"><button class="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-600"><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button><div class="mb-8 text-center"><h2 class="mb-2 text-2xl font-bold text-gray-800 md:text-3xl"> Select Patient Management Type </h2><p class="text-sm text-gray-600 md:text-base"> Choose how you&#39;d like to add patients to the system </p></div><div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"><div class="group cursor-pointer rounded-xl border-2 border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primaryDark hover:shadow-xl md:p-8"><div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primaryLight transition-colors duration-300 group-hover:bg-primaryDark"><svg class="h-8 w-8 text-primaryDark transition-colors duration-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div><h3 class="mb-3 text-xl font-bold text-gray-800 transition-colors group-hover:text-primaryDark md:text-2xl"> Clinics </h3><p class="text-sm leading-relaxed text-gray-600 md:text-base"> Manage multiple patients efficiently through clinic-based workflows and batch operations </p>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("signup")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="mt-6 w-full rounded-lg bg-primaryDark px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-primaryDark group-hover:shadow-lg"${_scopeId}> Select Clinics </button>`);
            } else {
              return [
                createVNode("button", { class: "mt-6 w-full rounded-lg bg-primaryDark px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-primaryDark group-hover:shadow-lg" }, " Select Clinics ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="group cursor-pointer rounded-xl border-2 border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primaryDark hover:shadow-xl md:p-8"><div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primaryLight transition-colors duration-300 group-hover:bg-blue-500"><svg class="h-8 w-8 text-primaryDark transition-colors duration-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div><h3 class="mb-3 text-xl font-bold text-gray-800 transition-colors group-hover:text-primaryDark md:text-2xl"> Individual </h3><p class="text-sm leading-relaxed text-gray-600 md:text-base"> Add patients one at a time with complete control over each entry and detailed information </p><button class="btn-disabled mt-6 w-full rounded-lg bg-primaryDark px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-primaryDark group-hover:shadow-lg"> Coming Soon... </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Home/NavBar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "GuestLayout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><video src="/assets/background.mp4" class="fixed left-0 top-0 h-full w-full object-cover" autoplay muted loop></video><div class="relative z-50 flex h-screen w-screen">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<div class="h-full w-full scrollbar-none">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
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
      if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
      selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
      emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
    };
    const onThumbClick = (index) => {
      if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
      emblaMainApi.value.scrollTo(index);
    };
    watchOnce(emblaMainApi, (emblaMainApi2) => {
      if (!emblaMainApi2) return;
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
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="my-20 flex w-full flex-col items-center justify-center gap-8 px-4 sm:my-32 sm:px-6 lg:my-40 lg:flex-row lg:gap-16 lg:px-12 2xl:my-44 2xl:gap-32 2xl:px-10"${_scopeId}><div class="flex w-full max-w-2xl flex-col space-y-4 sm:space-y-6 lg:w-1/2"${_scopeId}><h1 class="text-3xl font-bold leading-tight text-black sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-8xl"${_scopeId}> Fast,<br${_scopeId}> Secure and<br${_scopeId}> Convenient<br${_scopeId}> Test Results </h1><p class="text-sm font-bold leading-relaxed text-gray-700 sm:text-base md:text-lg lg:text-xl 2xl:text-2xl"${_scopeId}> Your health and peace of mind should not be a gamble. Oodo Medlink gives you fast, secure and convenient access to your lab test results anytime, anywhere. </p><div class="w-full pt-2"${_scopeId}><form class="flex flex-col gap-3 sm:flex-row sm:gap-4"${_scopeId}><label for="email-input" class="sr-only"${_scopeId}>Email address</label><input type="email" id="email-input"${ssrRenderAttr("value", email.value)} required class="flex-1 rounded-md border border-gray-300 px-3 py-2.5 text-base font-extrabold focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primaryDark sm:px-4 sm:py-3 sm:text-lg lg:text-xl" placeholder="Enter your email" aria-label="Enter your email address"${_scopeId}><button type="submit" class="whitespace-nowrap rounded-md bg-primaryDark px-5 py-2.5 text-base font-extrabold text-white transition-opacity duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primaryDark sm:px-6 sm:py-3 sm:text-lg lg:text-xl" aria-label="Start now"${_scopeId}> Start Now </button></form></div></div><div class="flex w-full justify-center lg:w-1/2"${_scopeId}><div class="w-full max-w-2xl space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$7), {
              plugins: [unref(Autoplay)({ delay: 5e3 })],
              class: "w-full overflow-hidden rounded-lg shadow-lg",
              onInitApi: (val) => emblaMainApi.value = val,
              "aria-label": "Featured images carousel"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(images.value, (image) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$5), {
                            key: image.id,
                            class: "rounded-lg"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<img${ssrRenderAttr("src", image.src)}${ssrRenderAttr("alt", image.alt)} class="h-full w-full rounded-lg object-cover"${_scopeId4}>`);
                              } else {
                                return [
                                  createVNode("img", {
                                    src: image.src,
                                    alt: image.alt,
                                    class: "h-full w-full rounded-lg object-cover"
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
                            return openBlock(), createBlock(unref(_sfc_main$5), {
                              key: image.id,
                              class: "rounded-lg"
                            }, {
                              default: withCtx(() => [
                                createVNode("img", {
                                  src: image.src,
                                  alt: image.alt,
                                  class: "h-full w-full rounded-lg object-cover"
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
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(images.value, (image) => {
                          return openBlock(), createBlock(unref(_sfc_main$5), {
                            key: image.id,
                            class: "rounded-lg"
                          }, {
                            default: withCtx(() => [
                              createVNode("img", {
                                src: image.src,
                                alt: image.alt,
                                class: "h-full w-full rounded-lg object-cover"
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
            _push2(ssrRenderComponent(unref(_sfc_main$7), {
              class: "relative w-full",
              onInitApi: (val) => emblaThumbnailApi.value = val,
              "aria-label": "Carousel navigation"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "ml-0 flex justify-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(images.value.length, (_4, index) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$5), {
                            key: index,
                            class: "basis-auto cursor-pointer pl-0",
                            onClick: ($event) => onThumbClick(index),
                            "aria-label": `Go to slide ${index + 1}`,
                            role: "button",
                            tabindex: "0",
                            onKeydown: [($event) => onThumbClick(index), ($event) => onThumbClick(index)]
                          }, {
                            default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="${ssrRenderClass([
                                  index === selectedIndex.value ? "opacity-100" : "opacity-50",
                                  "transition-opacity duration-300"
                                ])}"${_scopeId4}><div class="${ssrRenderClass([
                                  index === selectedIndex.value ? "w-16 bg-primaryDark sm:w-20" : "w-6 bg-gray-400 sm:w-8",
                                  "h-2 rounded-full transition-all duration-300"
                                ])}"${_scopeId4}></div></div>`);
                              } else {
                                return [
                                  createVNode("div", {
                                    class: [
                                      "transition-opacity duration-300",
                                      index === selectedIndex.value ? "opacity-100" : "opacity-50"
                                    ]
                                  }, [
                                    createVNode("div", {
                                      class: [
                                        "h-2 rounded-full transition-all duration-300",
                                        index === selectedIndex.value ? "w-16 bg-primaryDark sm:w-20" : "w-6 bg-gray-400 sm:w-8"
                                      ]
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
                            return openBlock(), createBlock(unref(_sfc_main$5), {
                              key: index,
                              class: "basis-auto cursor-pointer pl-0",
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
                                  class: [
                                    "transition-opacity duration-300",
                                    index === selectedIndex.value ? "opacity-100" : "opacity-50"
                                  ]
                                }, [
                                  createVNode("div", {
                                    class: [
                                      "h-2 rounded-full transition-all duration-300",
                                      index === selectedIndex.value ? "w-16 bg-primaryDark sm:w-20" : "w-6 bg-gray-400 sm:w-8"
                                    ]
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
                    createVNode(unref(_sfc_main$6), { class: "ml-0 flex justify-center gap-2" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(images.value.length, (_3, index) => {
                          return openBlock(), createBlock(unref(_sfc_main$5), {
                            key: index,
                            class: "basis-auto cursor-pointer pl-0",
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
                                class: [
                                  "transition-opacity duration-300",
                                  index === selectedIndex.value ? "opacity-100" : "opacity-50"
                                ]
                              }, [
                                createVNode("div", {
                                  class: [
                                    "h-2 rounded-full transition-all duration-300",
                                    index === selectedIndex.value ? "w-16 bg-primaryDark sm:w-20" : "w-6 bg-gray-400 sm:w-8"
                                  ]
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
            _push2(`</div></div></div><section class="bg-gradient-to-b from-background to-secondary/20 py-24"${_scopeId}><div class="container mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mx-auto mb-16 max-w-3xl text-center"${_scopeId}><h2 class="mb-4 text-4xl font-extrabold sm:text-5xl 2xl:text-7xl"${_scopeId}> Everything You Need </h2><p class="text-xl font-extrabold text-muted-foreground 2xl:text-2xl"${_scopeId}> Powerful features designed specifically for modern clinics </p></div><div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3"${_scopeId}><!--[-->`);
            ssrRenderList(features.value, (feature, index) => {
              _push2(ssrRenderComponent(_sfc_main$8, {
                key: index,
                class: "group border-border bg-card/50 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-none hover:bg-primaryDark hover:text-white hover:shadow-lg"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20 group-hover:bg-white"${_scopeId2}>`);
                    ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(feature.icon), { class: "h-6 w-6 text-primary" }, null), _parent3, _scopeId2);
                    _push3(`</div><h3 class="mb-3 font-extrabold lg:text-2xl"${_scopeId2}>${ssrInterpolate(feature.title)}</h3><p class="font-extrabold leading-relaxed text-muted-foreground group-hover:text-white lg:text-xl"${_scopeId2}>${ssrInterpolate(feature.description)}</p>`);
                  } else {
                    return [
                      createVNode("div", { class: "mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20 group-hover:bg-white" }, [
                        (openBlock(), createBlock(resolveDynamicComponent(feature.icon), { class: "h-6 w-6 text-primary" }))
                      ]),
                      createVNode("h3", { class: "mb-3 font-extrabold lg:text-2xl" }, toDisplayString(feature.title), 1),
                      createVNode("p", { class: "font-extrabold leading-relaxed text-muted-foreground group-hover:text-white lg:text-xl" }, toDisplayString(feature.description), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></div></section><section class="bg-primaryLight py-24"${_scopeId}><div class="container mx-auto grid space-y-28 px-4 sm:px-6 lg:px-5"${_scopeId}><div class="grid items-center gap-16 lg:grid-cols-1"${_scopeId}><div class="space-y-8"${_scopeId}><div${_scopeId}><h2 class="mb-4 text-4xl font-extrabold sm:text-5xl 2xl:text-6xl"${_scopeId}> Why Clinics Choose Us </h2><p class="text-xl font-extrabold 2xl:text-3xl"${_scopeId}> Join hundreds of healthcare providers who have transformed their workflow </p></div><div class="space-y-6 font-extrabold"${_scopeId}><!--[-->`);
            ssrRenderList(benefits.value, (benefit) => {
              _push2(`<div${_scopeId}><div class="mt-1 flex-shrink-0"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-6 w-6 text-primary transition-transform group-hover:scale-110" }, null, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><h3 class="mb-2 font-extrabold lg:text-3xl"${_scopeId}>${ssrInterpolate(benefit.title)}</h3><p class="leading-relaxed text-muted-foreground lg:text-2xl"${_scopeId}>${ssrInterpolate(benefit.description)}</p></div></div>`);
            });
            _push2(`<!--]--></div></div></div><div class="space-y-6"${_scopeId}><!--[-->`);
            ssrRenderList(stats.value, (stat) => {
              _push2(`<div class="rounded-2xl border border-none bg-primaryDark p-8 text-white shadow-lg"${_scopeId}><div class="mb-2 font-extrabold text-white md:text-5xl 2xl:text-6xl"${_scopeId}>${ssrInterpolate(stat.title)}</div><div class="mb-2 font-extrabold md:text-lg 2xl:text-2xl"${_scopeId}>${ssrInterpolate(stat.subject)}</div><p class="bg-primaryDark bg-clip-text font-extrabold 2xl:text-xl"${_scopeId}>${ssrInterpolate(stat.description)}</p></div>`);
            });
            _push2(`<!--]--></div></div></section>`);
            _push2(ssrRenderComponent(_sfc_main$9, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "my-20 flex w-full flex-col items-center justify-center gap-8 px-4 sm:my-32 sm:px-6 lg:my-40 lg:flex-row lg:gap-16 lg:px-12 2xl:my-44 2xl:gap-32 2xl:px-10" }, [
                createVNode("div", { class: "flex w-full max-w-2xl flex-col space-y-4 sm:space-y-6 lg:w-1/2" }, [
                  createVNode("h1", { class: "text-3xl font-bold leading-tight text-black sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-8xl" }, [
                    createTextVNode(" Fast,"),
                    createVNode("br"),
                    createTextVNode(" Secure and"),
                    createVNode("br"),
                    createTextVNode(" Convenient"),
                    createVNode("br"),
                    createTextVNode(" Test Results ")
                  ]),
                  createVNode("p", { class: "text-sm font-bold leading-relaxed text-gray-700 sm:text-base md:text-lg lg:text-xl 2xl:text-2xl" }, " Your health and peace of mind should not be a gamble. Oodo Medlink gives you fast, secure and convenient access to your lab test results anytime, anywhere. "),
                  createVNode("div", { class: "w-full pt-2" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(startNow, ["prevent"]),
                      class: "flex flex-col gap-3 sm:flex-row sm:gap-4"
                    }, [
                      createVNode("label", {
                        for: "email-input",
                        class: "sr-only"
                      }, "Email address"),
                      withDirectives(createVNode("input", {
                        type: "email",
                        id: "email-input",
                        "onUpdate:modelValue": ($event) => email.value = $event,
                        required: "",
                        class: "flex-1 rounded-md border border-gray-300 px-3 py-2.5 text-base font-extrabold focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primaryDark sm:px-4 sm:py-3 sm:text-lg lg:text-xl",
                        placeholder: "Enter your email",
                        "aria-label": "Enter your email address"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, email.value]
                      ]),
                      createVNode("button", {
                        type: "submit",
                        class: "whitespace-nowrap rounded-md bg-primaryDark px-5 py-2.5 text-base font-extrabold text-white transition-opacity duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primaryDark sm:px-6 sm:py-3 sm:text-lg lg:text-xl",
                        "aria-label": "Start now"
                      }, " Start Now ")
                    ], 32)
                  ])
                ]),
                createVNode("div", { class: "flex w-full justify-center lg:w-1/2" }, [
                  createVNode("div", { class: "w-full max-w-2xl space-y-4" }, [
                    createVNode(unref(_sfc_main$7), {
                      plugins: [unref(Autoplay)({ delay: 5e3 })],
                      class: "w-full overflow-hidden rounded-lg shadow-lg",
                      onInitApi: (val) => emblaMainApi.value = val,
                      "aria-label": "Featured images carousel"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(images.value, (image) => {
                              return openBlock(), createBlock(unref(_sfc_main$5), {
                                key: image.id,
                                class: "rounded-lg"
                              }, {
                                default: withCtx(() => [
                                  createVNode("img", {
                                    src: image.src,
                                    alt: image.alt,
                                    class: "h-full w-full rounded-lg object-cover"
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
                    createVNode(unref(_sfc_main$7), {
                      class: "relative w-full",
                      onInitApi: (val) => emblaThumbnailApi.value = val,
                      "aria-label": "Carousel navigation"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), { class: "ml-0 flex justify-center gap-2" }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(images.value.length, (_2, index) => {
                              return openBlock(), createBlock(unref(_sfc_main$5), {
                                key: index,
                                class: "basis-auto cursor-pointer pl-0",
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
                                    class: [
                                      "transition-opacity duration-300",
                                      index === selectedIndex.value ? "opacity-100" : "opacity-50"
                                    ]
                                  }, [
                                    createVNode("div", {
                                      class: [
                                        "h-2 rounded-full transition-all duration-300",
                                        index === selectedIndex.value ? "w-16 bg-primaryDark sm:w-20" : "w-6 bg-gray-400 sm:w-8"
                                      ]
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
              createVNode("section", { class: "bg-gradient-to-b from-background to-secondary/20 py-24" }, [
                createVNode("div", { class: "container mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mx-auto mb-16 max-w-3xl text-center" }, [
                    createVNode("h2", { class: "mb-4 text-4xl font-extrabold sm:text-5xl 2xl:text-7xl" }, " Everything You Need "),
                    createVNode("p", { class: "text-xl font-extrabold text-muted-foreground 2xl:text-2xl" }, " Powerful features designed specifically for modern clinics ")
                  ]),
                  createVNode("div", { class: "grid gap-8 md:grid-cols-2 lg:grid-cols-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(features.value, (feature, index) => {
                      return openBlock(), createBlock(_sfc_main$8, {
                        key: index,
                        class: "group border-border bg-card/50 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-none hover:bg-primaryDark hover:text-white hover:shadow-lg"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20 group-hover:bg-white" }, [
                            (openBlock(), createBlock(resolveDynamicComponent(feature.icon), { class: "h-6 w-6 text-primary" }))
                          ]),
                          createVNode("h3", { class: "mb-3 font-extrabold lg:text-2xl" }, toDisplayString(feature.title), 1),
                          createVNode("p", { class: "font-extrabold leading-relaxed text-muted-foreground group-hover:text-white lg:text-xl" }, toDisplayString(feature.description), 1)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ])
                ])
              ]),
              createVNode("section", { class: "bg-primaryLight py-24" }, [
                createVNode("div", { class: "container mx-auto grid space-y-28 px-4 sm:px-6 lg:px-5" }, [
                  createVNode("div", { class: "grid items-center gap-16 lg:grid-cols-1" }, [
                    createVNode("div", { class: "space-y-8" }, [
                      createVNode("div", null, [
                        createVNode("h2", { class: "mb-4 text-4xl font-extrabold sm:text-5xl 2xl:text-6xl" }, " Why Clinics Choose Us "),
                        createVNode("p", { class: "text-xl font-extrabold 2xl:text-3xl" }, " Join hundreds of healthcare providers who have transformed their workflow ")
                      ]),
                      createVNode("div", { class: "space-y-6 font-extrabold" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(benefits.value, (benefit) => {
                          return openBlock(), createBlock("div", {
                            key: benefit.title
                          }, [
                            createVNode("div", { class: "mt-1 flex-shrink-0" }, [
                              createVNode(unref(CheckCircle), { class: "h-6 w-6 text-primary transition-transform group-hover:scale-110" })
                            ]),
                            createVNode("div", null, [
                              createVNode("h3", { class: "mb-2 font-extrabold lg:text-3xl" }, toDisplayString(benefit.title), 1),
                              createVNode("p", { class: "leading-relaxed text-muted-foreground lg:text-2xl" }, toDisplayString(benefit.description), 1)
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
                        class: "rounded-2xl border border-none bg-primaryDark p-8 text-white shadow-lg"
                      }, [
                        createVNode("div", { class: "mb-2 font-extrabold text-white md:text-5xl 2xl:text-6xl" }, toDisplayString(stat.title), 1),
                        createVNode("div", { class: "mb-2 font-extrabold md:text-lg 2xl:text-2xl" }, toDisplayString(stat.subject), 1),
                        createVNode("p", { class: "bg-primaryDark bg-clip-text font-extrabold 2xl:text-xl" }, toDisplayString(stat.description), 1)
                      ]);
                    }), 128))
                  ])
                ])
              ]),
              createVNode(_sfc_main$9)
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
