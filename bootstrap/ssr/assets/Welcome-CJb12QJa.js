import { defineComponent, resolveComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext, ref, onMounted, renderSlot, createVNode, onUnmounted, createBlock, openBlock, Fragment, renderList, resolveDynamicComponent, toDisplayString, withDirectives, vModelText } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrRenderVNode, ssrInterpolate } from "vue/server-renderer";
import { HeartShine, Magnifer, SquareAltArrowUp, SquareAltArrowDown, Upload, FileText, Bell, PieChart2, Buildings2, CheckCircle } from "@solar-icons/vue";
import { Link, Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$a, a as _sfc_main$b } from "./ApplicationLogo-_si3TCMD.js";
import { c as cn } from "./utils-H80jjgLf.js";
import { createInjectionState, onClickOutside, watchOnce } from "@vueuse/core";
import emblaCarouselVue from "embla-carousel-vue";
import { ArrowRight, ArrowLeft, Bot } from "lucide-vue-next";
import Autoplay from "embla-carousel-autoplay";
import "class-variance-authority";
import "reka-ui";
import "clsx";
import "tailwind-merge";
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "GuestFooter",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Mail = resolveComponent("Mail");
      const _component_Phone = resolveComponent("Phone");
      const _component_MapPin = resolveComponent("MapPin");
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "border-t border-border bg-card bg-primaryDark py-12 text-xl" }, _attrs))}><div class="container mx-auto px-4 sm:px-6 lg:px-8"><div class="grid gap-8 text-xl md:grid-cols-4"><div class="space-y-4"><button class="rounded-lg bg-white p-1">`);
      _push(ssrRenderComponent(_sfc_main$a, null, null, _parent));
      _push(`</button><p class="text-xl font-extrabold text-primaryLight"> Streamlining test results delivery for modern healthcare providers </p></div><div><h4 class="mb-4 font-extrabold text-primaryLight"> Product </h4><ul class="space-y-2 text-xl font-extrabold text-primaryLight"><li><a href="#features" class="transition-colors hover:text-primary">Features</a></li><li><a href="#pricing" class="transition-colors hover:text-primary">Pricing</a></li><li><a href="#security" class="transition-colors hover:text-primary">Security</a></li><li><a href="#integration" class="transition-colors hover:text-primary">Integration</a></li></ul></div><div><h4 class="mb-4 font-extrabold text-primaryLight"> Company </h4><ul class="space-y-2 text-xl font-extrabold text-primaryLight"><li><a href="#about" class="transition-colors hover:text-primary">About Us</a></li><li><a href="#careers" class="transition-colors hover:text-primary">Careers</a></li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("blog"),
        class: "transition-colors hover:text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Blog `);
          } else {
            return [
              createTextVNode("Blog ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li><a href="#contact" class="transition-colors hover:text-primary">Contact</a></li></ul></div><div><h4 class="mb-4 font-extrabold text-primaryLight"> Support </h4><ul class="space-y-2 text-xl font-extrabold text-primaryLight"><li><a href="#" class="transition-colors hover:text-primary">Help Center</a></li><li><a href="#documentation" class="transition-colors hover:text-primary">Documentation</a></li><li><a href="#" class="transition-colors hover:text-primary">Privacy Policy</a></li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("terms-and-conditions"),
        class: "transition-colors hover:text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Terms of Service`);
          } else {
            return [
              createTextVNode(" Terms of Service")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div></div><section id="contact" class="bg-primaryDark py-24 text-white"><div class="container mx-auto px-4 sm:px-6 lg:px-8"><div class="mx-auto max-w-4xl text-center"><h1 class="mb-4 transition-all duration-900 text-4xl hover:-translate-y-2 animate-pulse font-extrabold sm:text-5xl 2xl:text-5xl inline-block rounded-md bg-primaryDark px-8 py-4 glass text-white hover:opacity-90"> Get In Touch </h1><div class="grid gap-8 md:grid-cols-3"><div class="space-y-3">`);
      _push(ssrRenderComponent(_component_Mail, { class: "mx-auto h-8 w-8" }, null, _parent));
      _push(`<h3 class="text-xl font-extrabold">Email</h3><p class="font-extrabold">support@oodomedlink.com</p></div><div class="space-y-3">`);
      _push(ssrRenderComponent(_component_Phone, { class: "mx-auto h-8 w-8" }, null, _parent));
      _push(`<h3 class="text-xl font-extrabold">Phone</h3><p class="font-extrabold">+234 (0) XXX XXX XXXX</p></div><div class="space-y-3">`);
      _push(ssrRenderComponent(_component_MapPin, { class: "mx-auto h-8 w-8" }, null, _parent));
      _push(`<h3 class="text-xl font-extrabold">Location</h3><p class="font-extrabold">Lagos, Nigeria</p></div></div><p class="mt-12 text-lg font-extrabold">We respond quickly.</p></div></div></section></div><div class="flex flex-col items-center px-20 justify-between gap-4 border-t border-border bg-primaryDark pt-8 md:flex-row"><p class="text-xl font-extrabold text-primaryLight"> © 2025 OodoMedlink. All rights reserved. </p><div class="flex items-center gap-2 text-xl font-extrabold text-primaryLight"><span>Made with</span>`);
      _push(ssrRenderComponent(unref(HeartShine), {
        weight: "Bold",
        class: "h-8 w-auto fill-primaryDark text-primaryLight"
      }, null, _parent));
      _push(`<span>for healthcare professionals</span></div></div></footer>`);
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
    ref([]);
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
      _push(`<!--[--><nav class="navbar fixed top-0 z-50 flex w-full items-center bg-base-100 bg-white px-4 py-3 shadow-md md:px-8 lg:px-12"><div class="flex w-full items-center gap-5 justify-between">`);
      _push(ssrRenderComponent(_sfc_main$a, null, null, _parent));
      _push(`<div class="hidden items-center justify-center gap-6 text-xl lg:flex xl:gap-10"><div class="flex items-center justify-center gap-6 text-xl font-extrabold xl:gap-10">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("faq"),
        class: "relative cursor-pointer text-primaryDark duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-primaryDark after:transition-all after:duration-300 after:content-[''] hover:-translate-y-1 hover:after:w-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Help Center `);
          } else {
            return [
              createTextVNode(" Help Center ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("blog"),
        class: "relative cursor-pointer text-primaryDark duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-primaryDark after:transition-all after:duration-300 after:content-[''] hover:-translate-y-1 hover:after:w-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Blog `);
          } else {
            return [
              createTextVNode(" Blog ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a href="#pricing" class="relative cursor-pointer text-primaryDark duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-primaryDark after:transition-all after:duration-300 after:content-[&#39;&#39;] hover:-translate-y-1 hover:after:w-full"> Pricing </a><a href="#about" class="relative cursor-pointer text-primaryDark duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-primaryDark after:transition-all after:duration-300 after:content-[&#39;&#39;] hover:-translate-y-1 hover:after:w-full"> About Us </a><a href="#career" class="relative cursor-pointer text-primaryDark duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-primaryDark after:transition-all after:duration-300 after:content-[&#39;&#39;] hover:-translate-y-1 hover:after:w-full"> Career </a></div></div><div class="hidden items-center justify-center gap-4 text-xl font-extrabold lg:flex xl:gap-10">`);
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
      _push(`<!--[--><video src="/assets/background.mp4" class="fixed left-0 top-0 h-full w-full object-cover" autoplay muted loop playsinline preload="auto" disablePictureInPicture webkit-playsinline></video><div class="relative z-50 flex h-screen w-screen">`);
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
    ref([
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
    ref([
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
        title: "Instant Delivery",
        description: "Upload and send results directly to patients via WhatsApp or email."
      },
      {
        icon: FileText,
        title: "Secure Storage",
        description: "Safely store digital copies of all results in an organized, encrypted system."
      },
      {
        icon: Bot,
        title: "AI Result Explanation",
        description: "Provide simple summaries to help patients understand their results."
      },
      {
        icon: Bell,
        title: "Automated Notifications",
        description: "Notify patients immediately when results are ready"
      },
      {
        icon: PieChart2,
        title: "Performance Reports",
        description: "Monthly insights to help labs track efficiency."
      },
      {
        icon: Buildings2,
        title: "Multi-Branch Support",
        description: "Manage multiple lab locations from one dashboard."
      }
    ]);
    const securityFeatures = ref([
      "End-to-end encryption",
      "Secure cloud backup",
      "Strict access control for lab staff",
      "Encrypted download links for patients",
      "Regular security audits"
    ]);
    ref([
      "Simple drag-and-drop result upload",
      "Optional LIS integration",
      "Direct WhatsApp and email sending",
      "API for advanced automation"
    ]);
    ref([
      "Setup instructions",
      "Permissions and user roles",
      "File upload formats",
      "API documentation",
      "Security standards",
      "Frequently asked questions"
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
      return router.get(route("signup"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Home" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-4 py-20 sm:px-6 lg:px-12 2xl:px-20"${_scopeId}><div class="w-full max-w-xl space-y-5 text-center lg:text-left lg:max-w-2xl"${_scopeId}><h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-6xl 2xl:text-8xl font-extrabold text-black leading-tight"${_scopeId}> Fast,<br${_scopeId}> Secure and<br${_scopeId}> Convenient<br${_scopeId}> Test Results </h1><p class="text-sm sm:text-lg lg:text-xl 2xl:text-2xl font-semibold text-gray-700 leading-relaxed"${_scopeId}> Your health and peace of mind should not be a gamble. Oodo Medlink gives you fast, secure and convenient access to your lab test results anytime, anywhere. </p><div class="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full"${_scopeId}><input type="email" id="email-input"${ssrRenderAttr("value", email.value)} class="w-full rounded-md border border-gray-300 px-3 py-2.5 sm:px-4 sm:py-3 text-base sm:text-lg lg:text-xl font-semibold focus:ring-2 focus:ring-primaryDark focus:outline-none" placeholder="Enter your email"${_scopeId}><button class="w-full sm:w-auto whitespace-nowrap rounded-md bg-primaryDark px-5 py-2.5 sm:px-6 sm:py-3 text-base sm:text-lg lg:text-xl font-bold text-white hover:opacity-90 transition"${_scopeId}> Start Now </button></div></div><div class="w-full max-w-2xl mx-auto lg:w-1/2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$7), {
              plugins: [unref(Autoplay)({ delay: 5e3 })],
              class: "w-full rounded-xl shadow-lg overflow-hidden",
              onInitApi: (val) => emblaMainApi.value = val
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(images.value, (image) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$5), {
                            key: image.id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<img${ssrRenderAttr("src", image.src)}${ssrRenderAttr("alt", image.alt)} class="w-full h-64 sm:h-80 md:h-[26rem] object-cover rounded-xl"${_scopeId4}>`);
                              } else {
                                return [
                                  createVNode("img", {
                                    src: image.src,
                                    alt: image.alt,
                                    class: "w-full h-64 sm:h-80 md:h-[26rem] object-cover rounded-xl"
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
                              key: image.id
                            }, {
                              default: withCtx(() => [
                                createVNode("img", {
                                  src: image.src,
                                  alt: image.alt,
                                  class: "w-full h-64 sm:h-80 md:h-[26rem] object-cover rounded-xl"
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
                            key: image.id
                          }, {
                            default: withCtx(() => [
                              createVNode("img", {
                                src: image.src,
                                alt: image.alt,
                                class: "w-full h-64 sm:h-80 md:h-[26rem] object-cover rounded-xl"
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
              class: "mt-4 w-full",
              onInitApi: (val) => emblaThumbnailApi.value = val
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "flex justify-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(images.value.length, (_4, index) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$5), {
                            key: index,
                            class: "basis-auto cursor-pointer pl-0",
                            onClick: ($event) => onThumbClick(index)
                          }, {
                            default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="${ssrRenderClass([index === selectedIndex.value ? "opacity-100" : "opacity-40", "transition"])}"${_scopeId4}><div class="${ssrRenderClass([index === selectedIndex.value ? "w-12 sm:w-16 bg-primaryDark" : "w-5 bg-gray-400", "h-2 rounded-full transition-all"])}"${_scopeId4}></div></div>`);
                              } else {
                                return [
                                  createVNode("div", {
                                    class: [index === selectedIndex.value ? "opacity-100" : "opacity-40", "transition"]
                                  }, [
                                    createVNode("div", {
                                      class: [index === selectedIndex.value ? "w-12 sm:w-16 bg-primaryDark" : "w-5 bg-gray-400", "h-2 rounded-full transition-all"]
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
                              onClick: ($event) => onThumbClick(index)
                            }, {
                              default: withCtx(() => [
                                createVNode("div", {
                                  class: [index === selectedIndex.value ? "opacity-100" : "opacity-40", "transition"]
                                }, [
                                  createVNode("div", {
                                    class: [index === selectedIndex.value ? "w-12 sm:w-16 bg-primaryDark" : "w-5 bg-gray-400", "h-2 rounded-full transition-all"]
                                  }, null, 2)
                                ], 2)
                              ]),
                              _: 2
                            }, 1032, ["onClick"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$6), { class: "flex justify-center gap-2" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(images.value.length, (_3, index) => {
                          return openBlock(), createBlock(unref(_sfc_main$5), {
                            key: index,
                            class: "basis-auto cursor-pointer pl-0",
                            onClick: ($event) => onThumbClick(index)
                          }, {
                            default: withCtx(() => [
                              createVNode("div", {
                                class: [index === selectedIndex.value ? "opacity-100" : "opacity-40", "transition"]
                              }, [
                                createVNode("div", {
                                  class: [index === selectedIndex.value ? "w-12 sm:w-16 bg-primaryDark" : "w-5 bg-gray-400", "h-2 rounded-full transition-all"]
                                }, null, 2)
                              ], 2)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><section id="features" class="bg-white/70 py-20"${_scopeId}><div class="container mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="text-center max-w-3xl mx-auto mb-16"${_scopeId}><h1 class="text-3xl sm:text-5xl 2xl:text-7xl font-extrabold mb-4"${_scopeId}>Everything You Need</h1><p class="text-lg sm:text-xl 2xl:text-2xl text-muted-foreground font-semibold"${_scopeId}> Powerful features designed specifically for modern clinics </p></div><div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3"${_scopeId}><!--[-->`);
            ssrRenderList(features.value, (feature, index) => {
              _push2(ssrRenderComponent(_sfc_main$8, {
                key: index,
                class: "group border-none p-8 bg-primaryDark text-white rounded-xl hover:-translate-y-1 hover:shadow-xl transition-all backdrop-blur-sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="h-14 w-14 mb-6 flex items-center justify-center bg-white rounded-2xl shadow-sm"${_scopeId2}>`);
                    ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(feature.icon), { class: "h-6 w-6 text-primaryDark" }, null), _parent3, _scopeId2);
                    _push3(`</div><h2 class="text-xl lg:text-2xl font-extrabold mb-3"${_scopeId2}>${ssrInterpolate(feature.title)}</h2><p class="font-semibold text-white/80 lg:text-xl"${_scopeId2}>${ssrInterpolate(feature.description)}</p>`);
                  } else {
                    return [
                      createVNode("div", { class: "h-14 w-14 mb-6 flex items-center justify-center bg-white rounded-2xl shadow-sm" }, [
                        (openBlock(), createBlock(resolveDynamicComponent(feature.icon), { class: "h-6 w-6 text-primaryDark" }))
                      ]),
                      createVNode("h2", { class: "text-xl lg:text-2xl font-extrabold mb-3" }, toDisplayString(feature.title), 1),
                      createVNode("p", { class: "font-semibold text-white/80 lg:text-xl" }, toDisplayString(feature.description), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></div></section><section id="about" class="bg-primaryDark py-24 text-white"${_scopeId}><div class="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12"${_scopeId}><div class="max-w-3xl"${_scopeId}><h1 class="text-4xl sm:text-6xl font-extrabold text-center lg:text-left mb-8"${_scopeId}> About Us </h1><p class="text-lg sm:text-xl 2xl:text-2xl font-semibold mb-6"${_scopeId}> Oodo Medlink is a digital platform that helps medical laboratories send test results to patients instantly. Inspired by real challenges many Nigerians face — long wait times, repeated visits to collect printed results, and outdated systems that slow down treatment. </p><p class="text-lg sm:text-xl 2xl:text-2xl font-semibold"${_scopeId}> We make result delivery fast, secure and stress-free. With Oodo Medlink, labs upload results in seconds and patients receive them instantly. </p></div><div class="w-full lg:w-1/2"${_scopeId}><img src="/assets/med2.jpg" alt="about" class="rounded-xl shadow-lg w-full object-cover max-h-[450px]"${_scopeId}></div></div></section><section id="security" class="bg-primaryLight py-24"${_scopeId}><div class="container mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><h1 class="text-center text-3xl sm:text-5xl 2xl:text-7xl font-extrabold mb-12"${_scopeId}> We protect every file and message with </h1><div class="max-w-3xl mx-auto"${_scopeId}><div class="grid gap-6 md:grid-cols-2"${_scopeId}><!--[-->`);
            ssrRenderList(securityFeatures.value, (item, index) => {
              _push2(`<div class="flex items-center bg-primaryDark text-white gap-3 rounded-lg p-4 shadow"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-6 w-6" }, null, _parent2, _scopeId));
              _push2(`<span class="font-bold"${_scopeId}>${ssrInterpolate(item)}</span></div>`);
            });
            _push2(`<!--]--></div><p class="mt-8 text-center text-lg sm:text-xl 2xl:text-2xl font-semibold text-gray-700"${_scopeId}> Patient data stays private, safe and fully controlled by the lab. </p></div></div></section>`);
            _push2(ssrRenderComponent(_sfc_main$9, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-4 py-20 sm:px-6 lg:px-12 2xl:px-20" }, [
                createVNode("div", { class: "w-full max-w-xl space-y-5 text-center lg:text-left lg:max-w-2xl" }, [
                  createVNode("h1", { class: "text-3xl sm:text-5xl md:text-6xl lg:text-6xl 2xl:text-8xl font-extrabold text-black leading-tight" }, [
                    createTextVNode(" Fast,"),
                    createVNode("br"),
                    createTextVNode(" Secure and"),
                    createVNode("br"),
                    createTextVNode(" Convenient"),
                    createVNode("br"),
                    createTextVNode(" Test Results ")
                  ]),
                  createVNode("p", { class: "text-sm sm:text-lg lg:text-xl 2xl:text-2xl font-semibold text-gray-700 leading-relaxed" }, " Your health and peace of mind should not be a gamble. Oodo Medlink gives you fast, secure and convenient access to your lab test results anytime, anywhere. "),
                  createVNode("div", { class: "flex flex-col sm:flex-row items-center gap-3 pt-2 w-full" }, [
                    withDirectives(createVNode("input", {
                      type: "email",
                      id: "email-input",
                      "onUpdate:modelValue": ($event) => email.value = $event,
                      class: "w-full rounded-md border border-gray-300 px-3 py-2.5 sm:px-4 sm:py-3 text-base sm:text-lg lg:text-xl font-semibold focus:ring-2 focus:ring-primaryDark focus:outline-none",
                      placeholder: "Enter your email"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, email.value]
                    ]),
                    createVNode("button", {
                      onClick: startNow,
                      class: "w-full sm:w-auto whitespace-nowrap rounded-md bg-primaryDark px-5 py-2.5 sm:px-6 sm:py-3 text-base sm:text-lg lg:text-xl font-bold text-white hover:opacity-90 transition"
                    }, " Start Now ")
                  ])
                ]),
                createVNode("div", { class: "w-full max-w-2xl mx-auto lg:w-1/2" }, [
                  createVNode(unref(_sfc_main$7), {
                    plugins: [unref(Autoplay)({ delay: 5e3 })],
                    class: "w-full rounded-xl shadow-lg overflow-hidden",
                    onInitApi: (val) => emblaMainApi.value = val
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(images.value, (image) => {
                            return openBlock(), createBlock(unref(_sfc_main$5), {
                              key: image.id
                            }, {
                              default: withCtx(() => [
                                createVNode("img", {
                                  src: image.src,
                                  alt: image.alt,
                                  class: "w-full h-64 sm:h-80 md:h-[26rem] object-cover rounded-xl"
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
                    class: "mt-4 w-full",
                    onInitApi: (val) => emblaThumbnailApi.value = val
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$6), { class: "flex justify-center gap-2" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(images.value.length, (_2, index) => {
                            return openBlock(), createBlock(unref(_sfc_main$5), {
                              key: index,
                              class: "basis-auto cursor-pointer pl-0",
                              onClick: ($event) => onThumbClick(index)
                            }, {
                              default: withCtx(() => [
                                createVNode("div", {
                                  class: [index === selectedIndex.value ? "opacity-100" : "opacity-40", "transition"]
                                }, [
                                  createVNode("div", {
                                    class: [index === selectedIndex.value ? "w-12 sm:w-16 bg-primaryDark" : "w-5 bg-gray-400", "h-2 rounded-full transition-all"]
                                  }, null, 2)
                                ], 2)
                              ]),
                              _: 2
                            }, 1032, ["onClick"]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["onInitApi"])
                ])
              ]),
              createVNode("section", {
                id: "features",
                class: "bg-white/70 py-20"
              }, [
                createVNode("div", { class: "container mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "text-center max-w-3xl mx-auto mb-16" }, [
                    createVNode("h1", { class: "text-3xl sm:text-5xl 2xl:text-7xl font-extrabold mb-4" }, "Everything You Need"),
                    createVNode("p", { class: "text-lg sm:text-xl 2xl:text-2xl text-muted-foreground font-semibold" }, " Powerful features designed specifically for modern clinics ")
                  ]),
                  createVNode("div", { class: "grid gap-8 md:grid-cols-2 lg:grid-cols-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(features.value, (feature, index) => {
                      return openBlock(), createBlock(_sfc_main$8, {
                        key: index,
                        class: "group border-none p-8 bg-primaryDark text-white rounded-xl hover:-translate-y-1 hover:shadow-xl transition-all backdrop-blur-sm"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "h-14 w-14 mb-6 flex items-center justify-center bg-white rounded-2xl shadow-sm" }, [
                            (openBlock(), createBlock(resolveDynamicComponent(feature.icon), { class: "h-6 w-6 text-primaryDark" }))
                          ]),
                          createVNode("h2", { class: "text-xl lg:text-2xl font-extrabold mb-3" }, toDisplayString(feature.title), 1),
                          createVNode("p", { class: "font-semibold text-white/80 lg:text-xl" }, toDisplayString(feature.description), 1)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ])
                ])
              ]),
              createVNode("section", {
                id: "about",
                class: "bg-primaryDark py-24 text-white"
              }, [
                createVNode("div", { class: "container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12" }, [
                  createVNode("div", { class: "max-w-3xl" }, [
                    createVNode("h1", { class: "text-4xl sm:text-6xl font-extrabold text-center lg:text-left mb-8" }, " About Us "),
                    createVNode("p", { class: "text-lg sm:text-xl 2xl:text-2xl font-semibold mb-6" }, " Oodo Medlink is a digital platform that helps medical laboratories send test results to patients instantly. Inspired by real challenges many Nigerians face — long wait times, repeated visits to collect printed results, and outdated systems that slow down treatment. "),
                    createVNode("p", { class: "text-lg sm:text-xl 2xl:text-2xl font-semibold" }, " We make result delivery fast, secure and stress-free. With Oodo Medlink, labs upload results in seconds and patients receive them instantly. ")
                  ]),
                  createVNode("div", { class: "w-full lg:w-1/2" }, [
                    createVNode("img", {
                      src: "/assets/med2.jpg",
                      alt: "about",
                      class: "rounded-xl shadow-lg w-full object-cover max-h-[450px]"
                    })
                  ])
                ])
              ]),
              createVNode("section", {
                id: "security",
                class: "bg-primaryLight py-24"
              }, [
                createVNode("div", { class: "container mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("h1", { class: "text-center text-3xl sm:text-5xl 2xl:text-7xl font-extrabold mb-12" }, " We protect every file and message with "),
                  createVNode("div", { class: "max-w-3xl mx-auto" }, [
                    createVNode("div", { class: "grid gap-6 md:grid-cols-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(securityFeatures.value, (item, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "flex items-center bg-primaryDark text-white gap-3 rounded-lg p-4 shadow"
                        }, [
                          createVNode(unref(CheckCircle), { class: "h-6 w-6" }),
                          createVNode("span", { class: "font-bold" }, toDisplayString(item), 1)
                        ]);
                      }), 128))
                    ]),
                    createVNode("p", { class: "mt-8 text-center text-lg sm:text-xl 2xl:text-2xl font-semibold text-gray-700" }, " Patient data stays private, safe and fully controlled by the lab. ")
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
