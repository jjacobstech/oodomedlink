import { defineComponent, ref, unref, mergeProps, withCtx, createVNode, resolveDynamicComponent, createBlock, openBlock, toDisplayString, Fragment, renderList, useSSRContext, renderSlot, watch, computed, createCommentVNode, withDirectives, vModelText, createTextVNode } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderSlot, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$6, c as _sfc_main$7, d as _sfc_main$8, e as _sfc_main$9, f as _sfc_main$a, g as _sfc_main$b, h as _sfc_main$c, i as _sfc_main$d } from "./index-tVDjCcDH.js";
import { usePage, useForm, Link, router, Head } from "@inertiajs/vue3";
import { Home, Logout } from "@solar-icons/vue";
import { _ as _sfc_main$5 } from "./ApplicationLogo-_si3TCMD.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "class-variance-authority";
import "reka-ui";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "lucide-vue-next";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const userForm = useForm({
      ...page.props.auth.user
    });
    const activeRoute = ref(page.props.ziggy.location);
    const menuItems = [
      { href: route("admin.dashboard"), icon: Home, label: "Dashboard" }
    ];
    const isActive = (href) => {
      if (activeRoute.value === href) {
        return true;
      }
      return false;
    };
    const logout = () => {
      userForm.post(route("admin.logout"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$3), mergeProps({ class: "bg-primaryDark" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex items-center justify-between bg-primaryDark py-4 backdrop-blur-sm sm:py-5 lg:py-7" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="transform rounded-lg bg-white p-1.5 transition-transform duration-300 hover:scale-105 sm:rounded-xl sm:p-2" data-v-ead20ad6${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$5, null, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "transform rounded-lg bg-white p-1.5 transition-transform duration-300 hover:scale-105 sm:rounded-xl sm:p-2" }, [
                      createVNode(_sfc_main$5)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "bg-primaryDark py-3 sm:py-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-2 sm:space-y-3 lg:space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(menuItems, (item) => {
                          _push4(`<div data-v-ead20ad6${_scopeId3}>`);
                          if (isActive(item.href)) {
                            _push4(ssrRenderComponent(unref(_sfc_main$8), { class: "group relative overflow-hidden bg-primaryLight text-primaryDark" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(Link), {
                                    href: item.href,
                                    class: "relative z-10 flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-10" data-v-ead20ad6${_scopeId5}></div><div class="relative flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2" data-v-ead20ad6${_scopeId5}>`);
                                        ssrRenderVNode(_push6, createVNode(resolveDynamicComponent(item.icon), { class: "h-5 w-5 transition-transform duration-300 sm:h-6 sm:w-6 lg:h-7 lg:w-7" }, null), _parent6, _scopeId5);
                                        _push6(`</div><span class="text-sm font-semibold transition-all duration-300 group-hover:translate-x-1 sm:text-base lg:text-lg" data-v-ead20ad6${_scopeId5}>${ssrInterpolate(item.label)}</span><div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" data-v-ead20ad6${_scopeId5}></div>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-10" }),
                                          createVNode("div", { class: "relative flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2" }, [
                                            (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "h-5 w-5 transition-transform duration-300 sm:h-6 sm:w-6 lg:h-7 lg:w-7" }))
                                          ]),
                                          createVNode("span", { class: "text-sm font-semibold transition-all duration-300 group-hover:translate-x-1 sm:text-base lg:text-lg" }, toDisplayString(item.label), 1),
                                          createVNode("div", { class: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" })
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(Link), {
                                      href: item.href,
                                      class: "relative z-10 flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-10" }),
                                        createVNode("div", { class: "relative flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2" }, [
                                          (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "h-5 w-5 transition-transform duration-300 sm:h-6 sm:w-6 lg:h-7 lg:w-7" }))
                                        ]),
                                        createVNode("span", { class: "text-sm font-semibold transition-all duration-300 group-hover:translate-x-1 sm:text-base lg:text-lg" }, toDisplayString(item.label), 1),
                                        createVNode("div", { class: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" })
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(unref(_sfc_main$8), { class: "group relative overflow-hidden text-white hover:bg-primaryLight hover:text-primaryDark" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(Link), {
                                    href: item.href,
                                    class: "relative z-10 flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-10" data-v-ead20ad6${_scopeId5}></div><div class="relative flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2" data-v-ead20ad6${_scopeId5}>`);
                                        ssrRenderVNode(_push6, createVNode(resolveDynamicComponent(item.icon), { class: "h-5 w-5 transition-transform duration-300 sm:h-6 sm:w-6 lg:h-7 lg:w-7" }, null), _parent6, _scopeId5);
                                        _push6(`</div><span class="text-sm font-semibold transition-all duration-300 group-hover:translate-x-1 sm:text-base lg:text-lg" data-v-ead20ad6${_scopeId5}>${ssrInterpolate(item.label)}</span><div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" data-v-ead20ad6${_scopeId5}></div>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-10" }),
                                          createVNode("div", { class: "relative flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2" }, [
                                            (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "h-5 w-5 transition-transform duration-300 sm:h-6 sm:w-6 lg:h-7 lg:w-7" }))
                                          ]),
                                          createVNode("span", { class: "text-sm font-semibold transition-all duration-300 group-hover:translate-x-1 sm:text-base lg:text-lg" }, toDisplayString(item.label), 1),
                                          createVNode("div", { class: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" })
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(Link), {
                                      href: item.href,
                                      class: "relative z-10 flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-10" }),
                                        createVNode("div", { class: "relative flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2" }, [
                                          (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "h-5 w-5 transition-transform duration-300 sm:h-6 sm:w-6 lg:h-7 lg:w-7" }))
                                        ]),
                                        createVNode("span", { class: "text-sm font-semibold transition-all duration-300 group-hover:translate-x-1 sm:text-base lg:text-lg" }, toDisplayString(item.label), 1),
                                        createVNode("div", { class: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" })
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          }
                          _push4(`</div>`);
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(menuItems, (item) => {
                            return createVNode("div", {
                              key: item.href
                            }, [
                              isActive(item.href) ? (openBlock(), createBlock(unref(_sfc_main$8), {
                                key: 0,
                                class: "group relative overflow-hidden bg-primaryLight text-primaryDark"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Link), {
                                    href: item.href,
                                    class: "relative z-10 flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-10" }),
                                      createVNode("div", { class: "relative flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2" }, [
                                        (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "h-5 w-5 transition-transform duration-300 sm:h-6 sm:w-6 lg:h-7 lg:w-7" }))
                                      ]),
                                      createVNode("span", { class: "text-sm font-semibold transition-all duration-300 group-hover:translate-x-1 sm:text-base lg:text-lg" }, toDisplayString(item.label), 1),
                                      createVNode("div", { class: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" })
                                    ]),
                                    _: 2
                                  }, 1032, ["href"])
                                ]),
                                _: 2
                              }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$8), {
                                key: 1,
                                class: "group relative overflow-hidden text-white hover:bg-primaryLight hover:text-primaryDark"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Link), {
                                    href: item.href,
                                    class: "relative z-10 flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-10" }),
                                      createVNode("div", { class: "relative flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2" }, [
                                        (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "h-5 w-5 transition-transform duration-300 sm:h-6 sm:w-6 lg:h-7 lg:w-7" }))
                                      ]),
                                      createVNode("span", { class: "text-sm font-semibold transition-all duration-300 group-hover:translate-x-1 sm:text-base lg:text-lg" }, toDisplayString(item.label), 1),
                                      createVNode("div", { class: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" })
                                    ]),
                                    _: 2
                                  }, 1032, ["href"])
                                ]),
                                _: 2
                              }, 1024))
                            ]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$7), { class: "space-y-2 sm:space-y-3 lg:space-y-4" }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(menuItems, (item) => {
                          return createVNode("div", {
                            key: item.href
                          }, [
                            isActive(item.href) ? (openBlock(), createBlock(unref(_sfc_main$8), {
                              key: 0,
                              class: "group relative overflow-hidden bg-primaryLight text-primaryDark"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Link), {
                                  href: item.href,
                                  class: "relative z-10 flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-10" }),
                                    createVNode("div", { class: "relative flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2" }, [
                                      (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "h-5 w-5 transition-transform duration-300 sm:h-6 sm:w-6 lg:h-7 lg:w-7" }))
                                    ]),
                                    createVNode("span", { class: "text-sm font-semibold transition-all duration-300 group-hover:translate-x-1 sm:text-base lg:text-lg" }, toDisplayString(item.label), 1),
                                    createVNode("div", { class: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" })
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ]),
                              _: 2
                            }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$8), {
                              key: 1,
                              class: "group relative overflow-hidden text-white hover:bg-primaryLight hover:text-primaryDark"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Link), {
                                  href: item.href,
                                  class: "relative z-10 flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-10" }),
                                    createVNode("div", { class: "relative flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2" }, [
                                      (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "h-5 w-5 transition-transform duration-300 sm:h-6 sm:w-6 lg:h-7 lg:w-7" }))
                                    ]),
                                    createVNode("span", { class: "text-sm font-semibold transition-all duration-300 group-hover:translate-x-1 sm:text-base lg:text-lg" }, toDisplayString(item.label), 1),
                                    createVNode("div", { class: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" })
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ]),
                              _: 2
                            }, 1024))
                          ]);
                        }), 64))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$9), { class: "bg-primaryDark p-2 backdrop-blur-sm sm:p-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "group rounded-lg transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-950/20" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<a class="flex w-full cursor-pointer items-center gap-2 px-3 py-2 transition-colors duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3" data-v-ead20ad6${_scopeId3}><div class="flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2" data-v-ead20ad6${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Logout), { class: "h-5 w-5 text-white transition-all duration-300 group-hover:rotate-12 group-hover:text-red-600 sm:h-6 sm:w-6 lg:h-7 lg:w-7" }, null, _parent4, _scopeId3));
                        _push4(`</div><span class="text-sm font-semibold text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-red-600 sm:text-base lg:text-lg" data-v-ead20ad6${_scopeId3}> Logout </span></a>`);
                      } else {
                        return [
                          createVNode("a", {
                            onClick: logout,
                            class: "flex w-full cursor-pointer items-center gap-2 px-3 py-2 transition-colors duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3"
                          }, [
                            createVNode("div", { class: "flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2" }, [
                              createVNode(unref(Logout), { class: "h-5 w-5 text-white transition-all duration-300 group-hover:rotate-12 group-hover:text-red-600 sm:h-6 sm:w-6 lg:h-7 lg:w-7" })
                            ]),
                            createVNode("span", { class: "text-sm font-semibold text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-red-600 sm:text-base lg:text-lg" }, " Logout ")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$8), { class: "group rounded-lg transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-950/20" }, {
                      default: withCtx(() => [
                        createVNode("a", {
                          onClick: logout,
                          class: "flex w-full cursor-pointer items-center gap-2 px-3 py-2 transition-colors duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3"
                        }, [
                          createVNode("div", { class: "flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2" }, [
                            createVNode(unref(Logout), { class: "h-5 w-5 text-white transition-all duration-300 group-hover:rotate-12 group-hover:text-red-600 sm:h-6 sm:w-6 lg:h-7 lg:w-7" })
                          ]),
                          createVNode("span", { class: "text-sm font-semibold text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-red-600 sm:text-base lg:text-lg" }, " Logout ")
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$4), { class: "flex items-center justify-between bg-primaryDark py-4 backdrop-blur-sm sm:py-5 lg:py-7" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "transform rounded-lg bg-white p-1.5 transition-transform duration-300 hover:scale-105 sm:rounded-xl sm:p-2" }, [
                    createVNode(_sfc_main$5)
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), { class: "bg-primaryDark py-3 sm:py-4" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$7), { class: "space-y-2 sm:space-y-3 lg:space-y-4" }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(menuItems, (item) => {
                        return createVNode("div", {
                          key: item.href
                        }, [
                          isActive(item.href) ? (openBlock(), createBlock(unref(_sfc_main$8), {
                            key: 0,
                            class: "group relative overflow-hidden bg-primaryLight text-primaryDark"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Link), {
                                href: item.href,
                                class: "relative z-10 flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-10" }),
                                  createVNode("div", { class: "relative flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2" }, [
                                    (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "h-5 w-5 transition-transform duration-300 sm:h-6 sm:w-6 lg:h-7 lg:w-7" }))
                                  ]),
                                  createVNode("span", { class: "text-sm font-semibold transition-all duration-300 group-hover:translate-x-1 sm:text-base lg:text-lg" }, toDisplayString(item.label), 1),
                                  createVNode("div", { class: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" })
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ]),
                            _: 2
                          }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$8), {
                            key: 1,
                            class: "group relative overflow-hidden text-white hover:bg-primaryLight hover:text-primaryDark"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Link), {
                                href: item.href,
                                class: "relative z-10 flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-10" }),
                                  createVNode("div", { class: "relative flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2" }, [
                                    (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "h-5 w-5 transition-transform duration-300 sm:h-6 sm:w-6 lg:h-7 lg:w-7" }))
                                  ]),
                                  createVNode("span", { class: "text-sm font-semibold transition-all duration-300 group-hover:translate-x-1 sm:text-base lg:text-lg" }, toDisplayString(item.label), 1),
                                  createVNode("div", { class: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" })
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ]),
                            _: 2
                          }, 1024))
                        ]);
                      }), 64))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$9), { class: "bg-primaryDark p-2 backdrop-blur-sm sm:p-3" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$8), { class: "group rounded-lg transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-950/20" }, {
                    default: withCtx(() => [
                      createVNode("a", {
                        onClick: logout,
                        class: "flex w-full cursor-pointer items-center gap-2 px-3 py-2 transition-colors duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3"
                      }, [
                        createVNode("div", { class: "flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2" }, [
                          createVNode(unref(Logout), { class: "h-5 w-5 text-white transition-all duration-300 group-hover:rotate-12 group-hover:text-red-600 sm:h-6 sm:w-6 lg:h-7 lg:w-7" })
                        ]),
                        createVNode("span", { class: "text-sm font-semibold text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-red-600 sm:text-base lg:text-lg" }, " Logout ")
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/AppSidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-ead20ad6"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdminAuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = usePage().props.auth;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$a), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(AppSidebar, null, null, _parent2, _scopeId));
            _push2(`<main class="relative h-screen w-full bg-primaryLight"${_scopeId}><div class="flex items-center justify-between bg-primaryDark/50 p-5 px-10"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$b), { class: "text-white transition-all duration-150 hover:-translate-y-1 hover:bg-white hover:text-primaryDark" }, null, _parent2, _scopeId));
            _push2(`<div class="flex items-center justify-between gap-16"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$c), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$d), { class: "flex h-16 w-16 items-center text-primaryDark justify-center rounded-full bg-white text-xl font-extrabold" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p class="bg-deepgradient bg-clip-text"${_scopeId3}>${ssrInterpolate(unref(auth).admin.name.charAt(0).toUpperCase())}</p>`);
                      } else {
                        return [
                          createVNode("p", { class: "bg-deepgradient bg-clip-text" }, toDisplayString(unref(auth).admin.name.charAt(0).toUpperCase()), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$d), { class: "flex h-16 w-16 items-center text-primaryDark justify-center rounded-full bg-white text-xl font-extrabold" }, {
                      default: withCtx(() => [
                        createVNode("p", { class: "bg-deepgradient bg-clip-text" }, toDisplayString(unref(auth).admin.name.charAt(0).toUpperCase()), 1)
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
                  createVNode(unref(_sfc_main$b), { class: "text-white transition-all duration-150 hover:-translate-y-1 hover:bg-white hover:text-primaryDark" }),
                  createVNode("div", { class: "flex items-center justify-between gap-16" }, [
                    createVNode(unref(_sfc_main$c), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$d), { class: "flex h-16 w-16 items-center text-primaryDark justify-center rounded-full bg-white text-xl font-extrabold" }, {
                          default: withCtx(() => [
                            createVNode("p", { class: "bg-deepgradient bg-clip-text" }, toDisplayString(unref(auth).admin.name.charAt(0).toUpperCase()), 1)
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AdminAuthenticatedLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    clinics: {},
    patients: {},
    results: {},
    emails: {},
    admins: {},
    stats: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const activeTab = ref(
      props.filters?.tab || "overview"
    );
    const searchQuery = ref(props.filters?.search || "");
    const filterStatus = ref(props.filters?.status || "all");
    const perPage = ref(props.filters?.per_page || 15);
    watch(activeTab, (newTab) => {
      router.get(
        route("admin.dashboard"),
        {
          tab: newTab,
          search: searchQuery.value,
          status: filterStatus.value,
          per_page: perPage.value
        },
        {
          preserveState: true,
          replace: true
        }
      );
    });
    let searchTimeout;
    watch([searchQuery, filterStatus, perPage], () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        router.get(
          route("admin.dashboard"),
          {
            tab: activeTab.value,
            search: searchQuery.value,
            status: filterStatus.value,
            per_page: perPage.value
          },
          {
            preserveState: true,
            replace: true
          }
        );
      }, 300);
    });
    const stats = computed(() => props.stats);
    const goToPage = (url) => {
      if (!url) return;
      router.get(url, {}, { preserveState: true, preserveScroll: true });
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const formatDob = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const getStatusColor = (status) => {
      const colors = {
        active: "bg-green-100 text-green-800",
        inactive: "bg-gray-100 text-gray-800",
        suspended: "bg-red-100 text-red-800",
        pending: "bg-yellow-100 text-yellow-800",
        processed: "bg-blue-100 text-blue-800",
        sent: "bg-green-100 text-green-800",
        archived: "bg-purple-100 text-purple-800",
        failed: "bg-red-100 text-red-800",
        scheduled: "bg-orange-100 text-orange-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Admin Panel" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex w-full h-screen gap-1 overflow-hidden bg-gray-100"${_scopeId}><div class="w-full overflow-y-auto p-6"${_scopeId}><div class="mb-6"${_scopeId}><h1 class="text-3xl font-bold text-gray-900"${_scopeId}>Admin Panel</h1><p class="text-gray-600"${_scopeId}> Manage clinics, patients, results, and system administrators </p></div><div class="mb-6 flex gap-2 overflow-x-auto"${_scopeId}><button class="${ssrRenderClass([activeTab.value === "overview" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50", "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"])}"${_scopeId}> 📊 Overview </button><button class="${ssrRenderClass([activeTab.value === "clinics" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50", "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"])}"${_scopeId}> 🏥 Clinics </button><button class="${ssrRenderClass([activeTab.value === "patients" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50", "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"])}"${_scopeId}> 👥 Patients </button><button class="${ssrRenderClass([activeTab.value === "results" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50", "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"])}"${_scopeId}> 📋 Results </button><button class="${ssrRenderClass([activeTab.value === "emails" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50", "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"])}"${_scopeId}> 📧 Email Logs </button><button class="${ssrRenderClass([activeTab.value === "admins" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50", "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"])}"${_scopeId}> 👤 Admins </button></div>`);
            if (activeTab.value === "overview") {
              _push2(`<div${_scopeId}><div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"${_scopeId}><div class="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-gray-600"${_scopeId}>Total Clinics</p><p class="mt-2 text-3xl font-bold text-blue-600"${_scopeId}>${ssrInterpolate(stats.value?.totalClinics)}</p><p class="mt-1 text-xs text-green-600"${_scopeId}>${ssrInterpolate(stats.value?.activeClinics)} active</p></div><div class="rounded-full bg-blue-100 p-3"${_scopeId}><span class="text-3xl"${_scopeId}>🏥</span></div></div></div><div class="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-gray-600"${_scopeId}>Total Patients</p><p class="mt-2 text-3xl font-bold text-green-600"${_scopeId}>${ssrInterpolate(stats.value?.totalPatients)}</p></div><div class="rounded-full bg-green-100 p-3"${_scopeId}><span class="text-3xl"${_scopeId}>👥</span></div></div></div><div class="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-gray-600"${_scopeId}>Test Results</p><p class="mt-2 text-3xl font-bold text-purple-600"${_scopeId}>${ssrInterpolate(stats.value?.totalResults)}</p><p class="mt-1 text-xs text-orange-600"${_scopeId}>${ssrInterpolate(stats.value?.pendingResults)} pending</p></div><div class="rounded-full bg-purple-100 p-3"${_scopeId}><span class="text-3xl"${_scopeId}>📋</span></div></div></div><div class="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-gray-600"${_scopeId}>Email Delivery</p><p class="mt-2 text-3xl font-bold text-indigo-600"${_scopeId}>${ssrInterpolate(stats.value?.totalEmails)}</p><p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(stats.value?.emailsFailed)} failed</p></div><div class="rounded-full bg-indigo-100 p-3"${_scopeId}><span class="text-3xl"${_scopeId}>📧</span></div></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "clinics") {
              _push2(`<div${_scopeId}><div class="rounded-xl bg-white p-6 shadow-sm"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><h2 class="text-xl font-bold text-gray-900"${_scopeId}>Manage Clinics</h2></div><div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"${_scopeId}><div class="flex gap-2"${_scopeId}><button class="${ssrRenderClass([filterStatus.value === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"])}"${_scopeId}> All </button><button class="${ssrRenderClass([filterStatus.value === "active" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"])}"${_scopeId}> Active </button><button class="${ssrRenderClass([filterStatus.value === "inactive" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"])}"${_scopeId}> Inactive </button></div><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search clinics..." class="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"${_scopeId}></div><div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Clinic Name </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Email </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Phone </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Location </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Status </th></tr></thead><tbody class="divide-y divide-gray-200 bg-white"${_scopeId}><!--[-->`);
              ssrRenderList(__props.clinics?.data, (clinic) => {
                _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-4 py-4 text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(clinic.name)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(clinic.email)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(clinic.phone_no)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(clinic.state)}, ${ssrInterpolate(clinic.country)}</td><td class="px-4 py-4 text-sm"${_scopeId}><span class="${ssrRenderClass([getStatusColor(clinic.status), "rounded-full px-3 py-1 text-xs font-semibold"])}"${_scopeId}>${ssrInterpolate(clinic.status)}</span></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
              if (__props.clinics) {
                _push2(`<div class="mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6"${_scopeId}><div class="flex flex-1 justify-between sm:hidden"${_scopeId}><button${ssrIncludeBooleanAttr(!__props.clinics.links[0]?.url) ? " disabled" : ""} class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}> Previous </button><button${ssrIncludeBooleanAttr(!__props.clinics.links[__props.clinics.links.length - 1]?.url) ? " disabled" : ""} class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}> Next </button></div><div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-700"${_scopeId}> Showing <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.clinics.from)}</span> to <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.clinics.to)}</span> of <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.clinics.total)}</span> results </p></div><div${_scopeId}><nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination"${_scopeId}><!--[-->`);
                ssrRenderList(__props.clinics.links, (link, index) => {
                  _push2(`<button${ssrIncludeBooleanAttr(!link.url || link.active) ? " disabled" : ""} class="${ssrRenderClass([
                    link.active ? "z-10 bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
                    !link.url ? "cursor-not-allowed opacity-50" : "",
                    "relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                  ])}"${_scopeId}>${link.label ?? ""}</button>`);
                });
                _push2(`<!--]--></nav></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "patients") {
              _push2(`<div${_scopeId}><div class="rounded-xl bg-white p-6 shadow-sm"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><h2 class="text-xl font-bold text-gray-900"${_scopeId}>Manage Patients</h2></div><div class="mb-6"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search patients by name, email, or ID..." class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"${_scopeId}></div><div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Full Name</th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Email</th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Phone</th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Gender</th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Date of Birth</th></tr></thead><tbody class="divide-y divide-gray-200 bg-white"${_scopeId}><!--[-->`);
              ssrRenderList(__props.patients?.data, (patient) => {
                _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(patient.full_name)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(patient.email)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(patient.phone_no ?? "N/A")}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}><span class="capitalize"${_scopeId}>${ssrInterpolate(patient.gender ?? "N/A")}</span></td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(patient.date_of_birth ? formatDob(patient.date_of_birth) : "N/A")}</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
              if (__props.patients) {
                _push2(`<div class="mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6"${_scopeId}><div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-700"${_scopeId}> Showing <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.patients.from)}</span> to <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.patients.to)}</span> of <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.patients.total)}</span> results </p></div><div${_scopeId}><nav class="isolate inline-flex -space-x-px rounded-md shadow-sm"${_scopeId}><!--[-->`);
                ssrRenderList(__props.patients.links, (link, index) => {
                  _push2(`<button${ssrIncludeBooleanAttr(!link.url || link.active) ? " disabled" : ""} class="${ssrRenderClass([
                    link.active ? "z-10 bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
                    !link.url ? "cursor-not-allowed opacity-50" : "",
                    "relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                  ])}"${_scopeId}>${link.label ?? ""}</button>`);
                });
                _push2(`<!--]--></nav></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "results") {
              _push2(`<div${_scopeId}><div class="rounded-xl bg-white p-6 shadow-sm"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><h2 class="text-xl font-bold text-gray-900"${_scopeId}>Manage Results</h2></div><div class="mb-6"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search patients by name, email, or ID..." class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"${_scopeId}></div><div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Full Name</th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Email</th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Phone <i class="ri-notification-3-line"${_scopeId}></i></th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Result Type</th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Test Name</th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Test Date</th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Status</th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Uploaded At</th></tr></thead><tbody class="divide-y divide-gray-200 bg-white"${_scopeId}><!--[-->`);
              ssrRenderList(__props.results?.data, (result) => {
                _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(result.patient.full_name)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(result.patient.email)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(result.patient.phone_no ?? "N/A")}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}><span class="capitalize"${_scopeId}>${ssrInterpolate(result.result_type ?? "N/A")}</span></td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(result.test_name ?? "N/A")}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(formatDate(result.test_date) ?? "N/A")}</td><td class="px-4 py-4 text-sm"${_scopeId}><span class="${ssrRenderClass([getStatusColor(result.status), "rounded-full px-3 py-1 text-xs font-semibold"])}"${_scopeId}>${ssrInterpolate(result.status)}</span></td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(formatDate(result.uploaded_at) ?? "N/A")}</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
              if (__props.results) {
                _push2(`<div class="mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6"${_scopeId}><div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-700"${_scopeId}> Showing <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.results.from)}</span> to <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.results.to)}</span> of <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.results.total)}</span> results </p></div><div${_scopeId}><nav class="isolate inline-flex -space-x-px rounded-md shadow-sm"${_scopeId}><!--[-->`);
                ssrRenderList(__props.results.links, (link, index) => {
                  _push2(`<button${ssrIncludeBooleanAttr(!link.url || link.active) ? " disabled" : ""} class="${ssrRenderClass([
                    link.active ? "z-10 bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
                    !link.url ? "cursor-not-allowed opacity-50" : "",
                    "relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                  ])}"${_scopeId}>${link.label ?? ""}</button>`);
                });
                _push2(`<!--]--></nav></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "emails") {
              _push2(`<div${_scopeId}><div class="rounded-xl bg-white p-6 shadow-sm"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><h2 class="text-xl font-bold text-gray-900"${_scopeId}>Manage Emails</h2></div><div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"${_scopeId}><div class="flex gap-2"${_scopeId}><button class="${ssrRenderClass([filterStatus.value === "all" ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"])}"${_scopeId}> All </button><button class="${ssrRenderClass([filterStatus.value === "sent" ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"])}"${_scopeId}> Sent </button><button class="${ssrRenderClass([filterStatus.value === "pending" ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"])}"${_scopeId}> Pending </button><button class="${ssrRenderClass([filterStatus.value === "scheduled" ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"])}"${_scopeId}> Scheduled </button><button class="${ssrRenderClass([filterStatus.value === "failed" ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"])}"${_scopeId}> Failed </button></div><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search clinics..." class="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"${_scopeId}></div><div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Email</th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Sent By</th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Subject</th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Sent At</th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Attempts</th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Scheduled At</th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Status</th></tr></thead><tbody class="divide-y divide-gray-200 bg-white"${_scopeId}><!--[-->`);
              ssrRenderList(__props.emails?.data, (email) => {
                _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(email.patient_email)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(email.sent_by)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(email.subject ?? "N/A")}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(formatDate(email.sent_at) ?? "N/A")}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(email.delivery_attempts ?? "N/A")}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(formatDate(email.scheduled_at) ?? "N/A")}</td><td class="px-4 py-4 text-sm"${_scopeId}><span class="${ssrRenderClass([getStatusColor(email.status), "rounded-full px-3 py-1 text-xs font-semibold"])}"${_scopeId}>${ssrInterpolate(email.status)}</span></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
              if (__props.emails) {
                _push2(`<div class="mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6"${_scopeId}><div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-700"${_scopeId}> Showing <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.emails.from)}</span> to <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.emails.to)}</span> of <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.emails.total)}</span> emails </p></div><div${_scopeId}><nav class="isolate inline-flex -space-x-px rounded-md shadow-sm"${_scopeId}><!--[-->`);
                ssrRenderList(__props.emails.links, (link, index) => {
                  _push2(`<button${ssrIncludeBooleanAttr(!link.url || link.active) ? " disabled" : ""} class="${ssrRenderClass([
                    link.active ? "z-10 bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
                    !link.url ? "cursor-not-allowed opacity-50" : "",
                    "relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                  ])}"${_scopeId}>${link.label ?? ""}</button>`);
                });
                _push2(`<!--]--></nav></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "admins") {
              _push2(`<div${_scopeId}><div class="rounded-xl bg-white p-6 shadow-sm"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><h2 class="text-xl font-bold text-gray-900"${_scopeId}>Manage Admin</h2></div><div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"${_scopeId}><div class="flex gap-2"${_scopeId}><button class="${ssrRenderClass([filterStatus.value === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"])}"${_scopeId}> All </button><button class="${ssrRenderClass([filterStatus.value === "active" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"])}"${_scopeId}> Active </button><button class="${ssrRenderClass([filterStatus.value === "inactive" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"])}"${_scopeId}> Inactive </button></div><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search clinics..." class="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"${_scopeId}></div><div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Name </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Email </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Phone </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Role </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Status </th></tr></thead><tbody class="divide-y divide-gray-200 bg-white"${_scopeId}><!--[-->`);
              ssrRenderList(__props.admins?.data, (admins) => {
                _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-4 py-4 text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(admins.name)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(admins.email)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(admins.phone_no)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(admins.role)}</td><td class="px-4 py-4 text-sm"${_scopeId}><span class="${ssrRenderClass([getStatusColor(admins.status), "rounded-full px-3 py-1 text-xs font-semibold"])}"${_scopeId}>${ssrInterpolate(admins.status)}</span></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
              if (__props.admins) {
                _push2(`<div class="mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6"${_scopeId}><div class="flex flex-1 justify-between sm:hidden"${_scopeId}><button${ssrIncludeBooleanAttr(!__props.admins.links[0]?.url) ? " disabled" : ""} class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}> Previous </button><button${ssrIncludeBooleanAttr(!__props.admins.links[__props.admins.links.length - 1]?.url) ? " disabled" : ""} class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}> Next </button></div><div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-700"${_scopeId}> Showing <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.admins.from)}</span> to <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.admins.to)}</span> of <span class="font-medium"${_scopeId}>${ssrInterpolate(__props.admins.total)}</span> results </p></div><div${_scopeId}><nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination"${_scopeId}><!--[-->`);
                ssrRenderList(__props.admins.links, (link, index) => {
                  _push2(`<button${ssrIncludeBooleanAttr(!link.url || link.active) ? " disabled" : ""} class="${ssrRenderClass([
                    link.active ? "z-10 bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
                    !link.url ? "cursor-not-allowed opacity-50" : "",
                    "relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                  ])}"${_scopeId}>${link.label ?? ""}</button>`);
                });
                _push2(`<!--]--></nav></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex w-full h-screen gap-1 overflow-hidden bg-gray-100" }, [
                createVNode("div", { class: "w-full overflow-y-auto p-6" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("h1", { class: "text-3xl font-bold text-gray-900" }, "Admin Panel"),
                    createVNode("p", { class: "text-gray-600" }, " Manage clinics, patients, results, and system administrators ")
                  ]),
                  createVNode("div", { class: "mb-6 flex gap-2 overflow-x-auto" }, [
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "overview",
                      class: [activeTab.value === "overview" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50", "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"]
                    }, " 📊 Overview ", 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "clinics",
                      class: [activeTab.value === "clinics" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50", "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"]
                    }, " 🏥 Clinics ", 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "patients",
                      class: [activeTab.value === "patients" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50", "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"]
                    }, " 👥 Patients ", 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "results",
                      class: [activeTab.value === "results" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50", "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"]
                    }, " 📋 Results ", 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "emails",
                      class: [activeTab.value === "emails" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50", "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"]
                    }, " 📧 Email Logs ", 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "admins",
                      class: [activeTab.value === "admins" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50", "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"]
                    }, " 👤 Admins ", 10, ["onClick"])
                  ]),
                  activeTab.value === "overview" ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode("div", { class: "mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" }, [
                      createVNode("div", { class: "rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Total Clinics"),
                            createVNode("p", { class: "mt-2 text-3xl font-bold text-blue-600" }, toDisplayString(stats.value?.totalClinics), 1),
                            createVNode("p", { class: "mt-1 text-xs text-green-600" }, toDisplayString(stats.value?.activeClinics) + " active", 1)
                          ]),
                          createVNode("div", { class: "rounded-full bg-blue-100 p-3" }, [
                            createVNode("span", { class: "text-3xl" }, "🏥")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Total Patients"),
                            createVNode("p", { class: "mt-2 text-3xl font-bold text-green-600" }, toDisplayString(stats.value?.totalPatients), 1)
                          ]),
                          createVNode("div", { class: "rounded-full bg-green-100 p-3" }, [
                            createVNode("span", { class: "text-3xl" }, "👥")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Test Results"),
                            createVNode("p", { class: "mt-2 text-3xl font-bold text-purple-600" }, toDisplayString(stats.value?.totalResults), 1),
                            createVNode("p", { class: "mt-1 text-xs text-orange-600" }, toDisplayString(stats.value?.pendingResults) + " pending", 1)
                          ]),
                          createVNode("div", { class: "rounded-full bg-purple-100 p-3" }, [
                            createVNode("span", { class: "text-3xl" }, "📋")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Email Delivery"),
                            createVNode("p", { class: "mt-2 text-3xl font-bold text-indigo-600" }, toDisplayString(stats.value?.totalEmails), 1),
                            createVNode("p", { class: "mt-1 text-xs text-red-600" }, toDisplayString(stats.value?.emailsFailed) + " failed", 1)
                          ]),
                          createVNode("div", { class: "rounded-full bg-indigo-100 p-3" }, [
                            createVNode("span", { class: "text-3xl" }, "📧")
                          ])
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  activeTab.value === "clinics" ? (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("div", { class: "rounded-xl bg-white p-6 shadow-sm" }, [
                      createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                        createVNode("h2", { class: "text-xl font-bold text-gray-900" }, "Manage Clinics")
                      ]),
                      createVNode("div", { class: "mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between" }, [
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode("button", {
                            onClick: ($event) => filterStatus.value = "all",
                            class: [filterStatus.value === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"]
                          }, " All ", 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => filterStatus.value = "active",
                            class: [filterStatus.value === "active" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"]
                          }, " Active ", 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => filterStatus.value = "inactive",
                            class: [filterStatus.value === "inactive" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"]
                          }, " Inactive ", 10, ["onClick"])
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          type: "text",
                          placeholder: "Search clinics...",
                          class: "rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, searchQuery.value]
                        ])
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "w-full" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Clinic Name "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Email "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Phone "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Location "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Status ")
                            ])
                          ]),
                          createVNode("tbody", { class: "divide-y divide-gray-200 bg-white" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.clinics?.data, (clinic) => {
                              return openBlock(), createBlock("tr", {
                                key: clinic.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-4 py-4 text-sm font-medium text-gray-900" }, toDisplayString(clinic.name), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(clinic.email), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(clinic.phone_no), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(clinic.state) + ", " + toDisplayString(clinic.country), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm" }, [
                                  createVNode("span", {
                                    class: [getStatusColor(clinic.status), "rounded-full px-3 py-1 text-xs font-semibold"]
                                  }, toDisplayString(clinic.status), 3)
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ]),
                      __props.clinics ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6"
                      }, [
                        createVNode("div", { class: "flex flex-1 justify-between sm:hidden" }, [
                          createVNode("button", {
                            onClick: ($event) => goToPage(__props.clinics.links[0]?.url),
                            disabled: !__props.clinics.links[0]?.url,
                            class: "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          }, " Previous ", 8, ["onClick", "disabled"]),
                          createVNode("button", {
                            onClick: ($event) => goToPage(__props.clinics.links[__props.clinics.links.length - 1]?.url),
                            disabled: !__props.clinics.links[__props.clinics.links.length - 1]?.url,
                            class: "relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          }, " Next ", 8, ["onClick", "disabled"])
                        ]),
                        createVNode("div", { class: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-gray-700" }, [
                              createTextVNode(" Showing "),
                              createVNode("span", { class: "font-medium" }, toDisplayString(__props.clinics.from), 1),
                              createTextVNode(" to "),
                              createVNode("span", { class: "font-medium" }, toDisplayString(__props.clinics.to), 1),
                              createTextVNode(" of "),
                              createVNode("span", { class: "font-medium" }, toDisplayString(__props.clinics.total), 1),
                              createTextVNode(" results ")
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("nav", {
                              class: "isolate inline-flex -space-x-px rounded-md shadow-sm",
                              "aria-label": "Pagination"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.clinics.links, (link, index) => {
                                return openBlock(), createBlock("button", {
                                  key: index,
                                  onClick: ($event) => goToPage(link.url),
                                  disabled: !link.url || link.active,
                                  class: [
                                    link.active ? "z-10 bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
                                    !link.url ? "cursor-not-allowed opacity-50" : "",
                                    "relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                                  ],
                                  innerHTML: link.label
                                }, null, 10, ["onClick", "disabled", "innerHTML"]);
                              }), 128))
                            ])
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ])) : createCommentVNode("", true),
                  activeTab.value === "patients" ? (openBlock(), createBlock("div", { key: 2 }, [
                    createVNode("div", { class: "rounded-xl bg-white p-6 shadow-sm" }, [
                      createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                        createVNode("h2", { class: "text-xl font-bold text-gray-900" }, "Manage Patients")
                      ]),
                      createVNode("div", { class: "mb-6" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          type: "text",
                          placeholder: "Search patients by name, email, or ID...",
                          class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, searchQuery.value]
                        ])
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "w-full" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Full Name"),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Email"),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Phone"),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Gender"),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Date of Birth")
                            ])
                          ]),
                          createVNode("tbody", { class: "divide-y divide-gray-200 bg-white" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.patients?.data, (patient) => {
                              return openBlock(), createBlock("tr", {
                                key: patient.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(patient.full_name), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(patient.email), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(patient.phone_no ?? "N/A"), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, [
                                  createVNode("span", { class: "capitalize" }, toDisplayString(patient.gender ?? "N/A"), 1)
                                ]),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(patient.date_of_birth ? formatDob(patient.date_of_birth) : "N/A"), 1)
                              ]);
                            }), 128))
                          ])
                        ])
                      ]),
                      __props.patients ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6"
                      }, [
                        createVNode("div", { class: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-gray-700" }, [
                              createTextVNode(" Showing "),
                              createVNode("span", { class: "font-medium" }, toDisplayString(__props.patients.from), 1),
                              createTextVNode(" to "),
                              createVNode("span", { class: "font-medium" }, toDisplayString(__props.patients.to), 1),
                              createTextVNode(" of "),
                              createVNode("span", { class: "font-medium" }, toDisplayString(__props.patients.total), 1),
                              createTextVNode(" results ")
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("nav", { class: "isolate inline-flex -space-x-px rounded-md shadow-sm" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.patients.links, (link, index) => {
                                return openBlock(), createBlock("button", {
                                  key: index,
                                  onClick: ($event) => goToPage(link.url),
                                  disabled: !link.url || link.active,
                                  class: [
                                    link.active ? "z-10 bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
                                    !link.url ? "cursor-not-allowed opacity-50" : "",
                                    "relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                                  ],
                                  innerHTML: link.label
                                }, null, 10, ["onClick", "disabled", "innerHTML"]);
                              }), 128))
                            ])
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ])) : createCommentVNode("", true),
                  activeTab.value === "results" ? (openBlock(), createBlock("div", { key: 3 }, [
                    createVNode("div", { class: "rounded-xl bg-white p-6 shadow-sm" }, [
                      createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                        createVNode("h2", { class: "text-xl font-bold text-gray-900" }, "Manage Results")
                      ]),
                      createVNode("div", { class: "mb-6" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          type: "text",
                          placeholder: "Search patients by name, email, or ID...",
                          class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, searchQuery.value]
                        ])
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "w-full" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Full Name"),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Email"),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, [
                                createTextVNode(" Phone "),
                                createVNode("i", { class: "ri-notification-3-line" })
                              ]),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Result Type"),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Test Name"),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Test Date"),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Status"),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Uploaded At")
                            ])
                          ]),
                          createVNode("tbody", { class: "divide-y divide-gray-200 bg-white" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.results?.data, (result) => {
                              return openBlock(), createBlock("tr", {
                                key: result.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(result.patient.full_name), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(result.patient.email), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(result.patient.phone_no ?? "N/A"), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, [
                                  createVNode("span", { class: "capitalize" }, toDisplayString(result.result_type ?? "N/A"), 1)
                                ]),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(result.test_name ?? "N/A"), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(formatDate(result.test_date) ?? "N/A"), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm" }, [
                                  createVNode("span", {
                                    class: [getStatusColor(result.status), "rounded-full px-3 py-1 text-xs font-semibold"]
                                  }, toDisplayString(result.status), 3)
                                ]),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(formatDate(result.uploaded_at) ?? "N/A"), 1)
                              ]);
                            }), 128))
                          ])
                        ])
                      ]),
                      __props.results ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6"
                      }, [
                        createVNode("div", { class: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-gray-700" }, [
                              createTextVNode(" Showing "),
                              createVNode("span", { class: "font-medium" }, toDisplayString(__props.results.from), 1),
                              createTextVNode(" to "),
                              createVNode("span", { class: "font-medium" }, toDisplayString(__props.results.to), 1),
                              createTextVNode(" of "),
                              createVNode("span", { class: "font-medium" }, toDisplayString(__props.results.total), 1),
                              createTextVNode(" results ")
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("nav", { class: "isolate inline-flex -space-x-px rounded-md shadow-sm" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.results.links, (link, index) => {
                                return openBlock(), createBlock("button", {
                                  key: index,
                                  onClick: ($event) => goToPage(link.url),
                                  disabled: !link.url || link.active,
                                  class: [
                                    link.active ? "z-10 bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
                                    !link.url ? "cursor-not-allowed opacity-50" : "",
                                    "relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                                  ],
                                  innerHTML: link.label
                                }, null, 10, ["onClick", "disabled", "innerHTML"]);
                              }), 128))
                            ])
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ])) : createCommentVNode("", true),
                  activeTab.value === "emails" ? (openBlock(), createBlock("div", { key: 4 }, [
                    createVNode("div", { class: "rounded-xl bg-white p-6 shadow-sm" }, [
                      createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                        createVNode("h2", { class: "text-xl font-bold text-gray-900" }, "Manage Emails")
                      ]),
                      createVNode("div", { class: "mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between" }, [
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode("button", {
                            onClick: ($event) => filterStatus.value = "all",
                            class: [filterStatus.value === "all" ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"]
                          }, " All ", 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => filterStatus.value = "sent",
                            class: [filterStatus.value === "sent" ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"]
                          }, " Sent ", 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => filterStatus.value = "pending",
                            class: [filterStatus.value === "pending" ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"]
                          }, " Pending ", 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => filterStatus.value = "scheduled",
                            class: [filterStatus.value === "scheduled" ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"]
                          }, " Scheduled ", 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => filterStatus.value = "failed",
                            class: [filterStatus.value === "failed" ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"]
                          }, " Failed ", 10, ["onClick"])
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          type: "text",
                          placeholder: "Search clinics...",
                          class: "rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, searchQuery.value]
                        ])
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "w-full" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Email"),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Sent By"),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Subject"),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Sent At"),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Attempts"),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Scheduled At"),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Status")
                            ])
                          ]),
                          createVNode("tbody", { class: "divide-y divide-gray-200 bg-white" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.emails?.data, (email) => {
                              return openBlock(), createBlock("tr", {
                                key: email.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(email.patient_email), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(email.sent_by), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(email.subject ?? "N/A"), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(formatDate(email.sent_at) ?? "N/A"), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(email.delivery_attempts ?? "N/A"), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(formatDate(email.scheduled_at) ?? "N/A"), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm" }, [
                                  createVNode("span", {
                                    class: [getStatusColor(email.status), "rounded-full px-3 py-1 text-xs font-semibold"]
                                  }, toDisplayString(email.status), 3)
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ]),
                      __props.emails ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6"
                      }, [
                        createVNode("div", { class: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-gray-700" }, [
                              createTextVNode(" Showing "),
                              createVNode("span", { class: "font-medium" }, toDisplayString(__props.emails.from), 1),
                              createTextVNode(" to "),
                              createVNode("span", { class: "font-medium" }, toDisplayString(__props.emails.to), 1),
                              createTextVNode(" of "),
                              createVNode("span", { class: "font-medium" }, toDisplayString(__props.emails.total), 1),
                              createTextVNode(" emails ")
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("nav", { class: "isolate inline-flex -space-x-px rounded-md shadow-sm" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.emails.links, (link, index) => {
                                return openBlock(), createBlock("button", {
                                  key: index,
                                  onClick: ($event) => goToPage(link.url),
                                  disabled: !link.url || link.active,
                                  class: [
                                    link.active ? "z-10 bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
                                    !link.url ? "cursor-not-allowed opacity-50" : "",
                                    "relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300"
                                  ],
                                  innerHTML: link.label
                                }, null, 10, ["onClick", "disabled", "innerHTML"]);
                              }), 128))
                            ])
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ])) : createCommentVNode("", true),
                  activeTab.value === "admins" ? (openBlock(), createBlock("div", { key: 5 }, [
                    createVNode("div", { class: "rounded-xl bg-white p-6 shadow-sm" }, [
                      createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                        createVNode("h2", { class: "text-xl font-bold text-gray-900" }, "Manage Admin")
                      ]),
                      createVNode("div", { class: "mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between" }, [
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode("button", {
                            onClick: ($event) => filterStatus.value = "all",
                            class: [filterStatus.value === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"]
                          }, " All ", 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => filterStatus.value = "active",
                            class: [filterStatus.value === "active" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"]
                          }, " Active ", 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => filterStatus.value = "inactive",
                            class: [filterStatus.value === "inactive" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700", "rounded-lg px-4 py-2 font-medium transition-colors"]
                          }, " Inactive ", 10, ["onClick"])
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          type: "text",
                          placeholder: "Search clinics...",
                          class: "rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, searchQuery.value]
                        ])
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "w-full" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Name "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Email "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Phone "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Role "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Status ")
                            ])
                          ]),
                          createVNode("tbody", { class: "divide-y divide-gray-200 bg-white" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.admins?.data, (admins) => {
                              return openBlock(), createBlock("tr", {
                                key: admins.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-4 py-4 text-sm font-medium text-gray-900" }, toDisplayString(admins.name), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(admins.email), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(admins.phone_no), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(admins.role), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm" }, [
                                  createVNode("span", {
                                    class: [getStatusColor(admins.status), "rounded-full px-3 py-1 text-xs font-semibold"]
                                  }, toDisplayString(admins.status), 3)
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ]),
                      __props.admins ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6"
                      }, [
                        createVNode("div", { class: "flex flex-1 justify-between sm:hidden" }, [
                          createVNode("button", {
                            onClick: ($event) => goToPage(__props.admins.links[0]?.url),
                            disabled: !__props.admins.links[0]?.url,
                            class: "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          }, " Previous ", 8, ["onClick", "disabled"]),
                          createVNode("button", {
                            onClick: ($event) => goToPage(__props.admins.links[__props.admins.links.length - 1]?.url),
                            disabled: !__props.admins.links[__props.admins.links.length - 1]?.url,
                            class: "relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          }, " Next ", 8, ["onClick", "disabled"])
                        ]),
                        createVNode("div", { class: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-gray-700" }, [
                              createTextVNode(" Showing "),
                              createVNode("span", { class: "font-medium" }, toDisplayString(__props.admins.from), 1),
                              createTextVNode(" to "),
                              createVNode("span", { class: "font-medium" }, toDisplayString(__props.admins.to), 1),
                              createTextVNode(" of "),
                              createVNode("span", { class: "font-medium" }, toDisplayString(__props.admins.total), 1),
                              createTextVNode(" results ")
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("nav", {
                              class: "isolate inline-flex -space-x-px rounded-md shadow-sm",
                              "aria-label": "Pagination"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.admins.links, (link, index) => {
                                return openBlock(), createBlock("button", {
                                  key: index,
                                  onClick: ($event) => goToPage(link.url),
                                  disabled: !link.url || link.active,
                                  class: [
                                    link.active ? "z-10 bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
                                    !link.url ? "cursor-not-allowed opacity-50" : "",
                                    "relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                                  ],
                                  innerHTML: link.label
                                }, null, 10, ["onClick", "disabled", "innerHTML"]);
                              }), 128))
                            ])
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
