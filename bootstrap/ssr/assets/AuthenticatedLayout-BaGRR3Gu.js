import { defineComponent, unref, withCtx, createVNode, toDisplayString, renderSlot, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$1, A as AppSidebar, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4, d as _sfc_main$5 } from "./index-kjwZOeml.js";
import { usePage } from "@inertiajs/vue3";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = usePage().props.auth;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$1), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(AppSidebar, null, null, _parent2, _scopeId));
            _push2(`<main class="relative h-screen w-full bg-primaryLight"${_scopeId}><div class="flex items-center justify-between bg-primaryDark/50 p-5 px-10"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "text-white transition-all duration-150 hover:-translate-y-1 hover:bg-white hover:text-primaryDark" }, null, _parent2, _scopeId));
            _push2(`<div class="flex items-center justify-between gap-16"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$3), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$4), {
                    src: "/assets/doctor.jpeg",
                    alt: "@unovue"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-extrabold text-transparent" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p class="bg-deepgradient bg-clip-text"${_scopeId3}>${ssrInterpolate(unref(auth).user.name.charAt(0).toUpperCase())}</p>`);
                      } else {
                        return [
                          createVNode("p", { class: "bg-deepgradient bg-clip-text" }, toDisplayString(unref(auth).user.name.charAt(0).toUpperCase()), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$4), {
                      src: "/assets/doctor.jpeg",
                      alt: "@unovue"
                    }),
                    createVNode(unref(_sfc_main$5), { class: "flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-extrabold text-transparent" }, {
                      default: withCtx(() => [
                        createVNode("p", { class: "bg-deepgradient bg-clip-text" }, toDisplayString(unref(auth).user.name.charAt(0).toUpperCase()), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`<footer class="bg-primaryLight"${_scopeId}><p class="text-center text-xl text-black"${_scopeId}> © 2025 Oodo Medlink. All Rights Reserved </p></footer></main>`);
          } else {
            return [
              createVNode(AppSidebar),
              createVNode("main", { class: "relative h-screen w-full bg-primaryLight" }, [
                createVNode("div", { class: "flex items-center justify-between bg-primaryDark/50 p-5 px-10" }, [
                  createVNode(unref(_sfc_main$2), { class: "text-white transition-all duration-150 hover:-translate-y-1 hover:bg-white hover:text-primaryDark" }),
                  createVNode("div", { class: "flex items-center justify-between gap-16" }, [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), {
                          src: "/assets/doctor.jpeg",
                          alt: "@unovue"
                        }),
                        createVNode(unref(_sfc_main$5), { class: "flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-extrabold text-transparent" }, {
                          default: withCtx(() => [
                            createVNode("p", { class: "bg-deepgradient bg-clip-text" }, toDisplayString(unref(auth).user.name.charAt(0).toUpperCase()), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                renderSlot(_ctx.$slots, "default"),
                createVNode("footer", { class: "bg-primaryLight" }, [
                  createVNode("p", { class: "text-center text-xl text-black" }, " © 2025 Oodo Medlink. All Rights Reserved ")
                ])
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
