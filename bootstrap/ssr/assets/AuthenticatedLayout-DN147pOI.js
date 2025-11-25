import { defineComponent, ref, unref, mergeProps, withCtx, createVNode, resolveDynamicComponent, createBlock, openBlock, toDisplayString, Fragment, renderList, useSSRContext, renderSlot, computed, createCommentVNode, createTextVNode } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderSlot, ssrRenderAttrs } from "vue/server-renderer";
import { _ as _sfc_main$i, a as _sfc_main$j, b as _sfc_main$l, c as _sfc_main$m, d as _sfc_main$n, e as _sfc_main$o, f as _sfc_main$p, g as _sfc_main$r, h as _sfc_main$s, i as _sfc_main$t, j as _sfc_main$u } from "./index-Cx41EZFO.js";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { Home, Letter, UserBlock, Logout, Bell } from "@solar-icons/vue";
import { Cog, Check, Circle, ChevronRight } from "lucide-vue-next";
import { _ as _sfc_main$k } from "./ApplicationLogo-_si3TCMD.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { _ as _sfc_main$q } from "./index-D9olpTuq.js";
import { useForwardPropsEmits, DropdownMenuRoot, DropdownMenuCheckboxItem, DropdownMenuItemIndicator, DropdownMenuPortal, DropdownMenuContent, DropdownMenuGroup, useForwardProps, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "reka-ui";
import { reactiveOmit } from "@vueuse/core";
import { c as cn } from "./utils-H80jjgLf.js";
import { cva } from "class-variance-authority";
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "AppSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const userForm = useForm({
      ...page.props.auth.user
    });
    const activeRoute = ref(page.props.ziggy.location);
    const menuItems = [
      { href: route("user.dashboard"), icon: Home, label: "Dashboard" },
      { href: route("user.emails"), icon: Letter, label: "Emails" },
      { href: route("user.patients"), icon: UserBlock, label: "Patients" },
      { href: route("user.settings"), icon: Cog, label: "Settings" }
    ];
    const isActive = (href) => {
      if (activeRoute.value === href) {
        return true;
      }
      return false;
    };
    const logout = () => {
      userForm.post(route("logout"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$i), mergeProps({ class: "bg-primaryDark" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$j), { class: "flex items-center justify-between bg-primaryDark py-4 backdrop-blur-sm sm:py-5 lg:py-7" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="transform rounded-lg bg-white p-1.5 transition-transform duration-300 hover:scale-105 sm:rounded-xl sm:p-2" data-v-b8da4938${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$k, null, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "transform rounded-lg bg-white p-1.5 transition-transform duration-300 hover:scale-105 sm:rounded-xl sm:p-2" }, [
                      createVNode(_sfc_main$k)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$l), { class: "bg-primaryDark py-3 sm:py-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$m), { class: "space-y-2 sm:space-y-3 lg:space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(menuItems, (item) => {
                          _push4(`<div data-v-b8da4938${_scopeId3}>`);
                          if (isActive(item.href)) {
                            _push4(ssrRenderComponent(unref(_sfc_main$n), { class: "group relative overflow-hidden bg-primaryLight text-primaryDark" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(Link), {
                                    href: item.href,
                                    class: "relative z-10 flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-10" data-v-b8da4938${_scopeId5}></div><div class="relative flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2" data-v-b8da4938${_scopeId5}>`);
                                        ssrRenderVNode(_push6, createVNode(resolveDynamicComponent(item.icon), { class: "h-5 w-5 transition-transform duration-300 sm:h-6 sm:w-6 lg:h-7 lg:w-7" }, null), _parent6, _scopeId5);
                                        _push6(`</div><span class="text-sm font-semibold transition-all duration-300 group-hover:translate-x-1 sm:text-base lg:text-lg" data-v-b8da4938${_scopeId5}>${ssrInterpolate(item.label)}</span><div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" data-v-b8da4938${_scopeId5}></div>`);
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
                            _push4(ssrRenderComponent(unref(_sfc_main$n), { class: "group relative overflow-hidden text-white hover:bg-primaryLight hover:text-primaryDark" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(Link), {
                                    href: item.href,
                                    class: "relative z-10 flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-10" data-v-b8da4938${_scopeId5}></div><div class="relative flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2" data-v-b8da4938${_scopeId5}>`);
                                        ssrRenderVNode(_push6, createVNode(resolveDynamicComponent(item.icon), { class: "h-5 w-5 transition-transform duration-300 sm:h-6 sm:w-6 lg:h-7 lg:w-7" }, null), _parent6, _scopeId5);
                                        _push6(`</div><span class="text-sm font-semibold transition-all duration-300 group-hover:translate-x-1 sm:text-base lg:text-lg" data-v-b8da4938${_scopeId5}>${ssrInterpolate(item.label)}</span><div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" data-v-b8da4938${_scopeId5}></div>`);
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
                              isActive(item.href) ? (openBlock(), createBlock(unref(_sfc_main$n), {
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
                              }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$n), {
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
                    createVNode(unref(_sfc_main$m), { class: "space-y-2 sm:space-y-3 lg:space-y-4" }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(menuItems, (item) => {
                          return createVNode("div", {
                            key: item.href
                          }, [
                            isActive(item.href) ? (openBlock(), createBlock(unref(_sfc_main$n), {
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
                            }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$n), {
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
            _push2(ssrRenderComponent(unref(_sfc_main$o), { class: "bg-primaryDark p-2 backdrop-blur-sm sm:p-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$n), { class: "group rounded-lg transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-950/20" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<a class="flex w-full cursor-pointer items-center gap-2 px-3 py-2 transition-colors duration-300 sm:gap-3 sm:px-4 sm:py-2.5 lg:py-3" data-v-b8da4938${_scopeId3}><div class="flex-shrink-0 rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2" data-v-b8da4938${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Logout), { class: "h-5 w-5 text-white transition-all duration-300 group-hover:rotate-12 group-hover:text-red-600 sm:h-6 sm:w-6 lg:h-7 lg:w-7" }, null, _parent4, _scopeId3));
                        _push4(`</div><span class="text-sm font-semibold text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-red-600 sm:text-base lg:text-lg" data-v-b8da4938${_scopeId3}> Logout </span></a>`);
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
                    createVNode(unref(_sfc_main$n), { class: "group rounded-lg transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-950/20" }, {
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
              createVNode(unref(_sfc_main$j), { class: "flex items-center justify-between bg-primaryDark py-4 backdrop-blur-sm sm:py-5 lg:py-7" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "transform rounded-lg bg-white p-1.5 transition-transform duration-300 hover:scale-105 sm:rounded-xl sm:p-2" }, [
                    createVNode(_sfc_main$k)
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$l), { class: "bg-primaryDark py-3 sm:py-4" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$m), { class: "space-y-2 sm:space-y-3 lg:space-y-4" }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(menuItems, (item) => {
                        return createVNode("div", {
                          key: item.href
                        }, [
                          isActive(item.href) ? (openBlock(), createBlock(unref(_sfc_main$n), {
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
                          }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$n), {
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
              createVNode(unref(_sfc_main$o), { class: "bg-primaryDark p-2 backdrop-blur-sm sm:p-3" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$n), { class: "group rounded-lg transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-950/20" }, {
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
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dashboard/AppSidebar.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const AppSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-b8da4938"]]);
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenu",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    dir: {},
    modal: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuRoot), mergeProps(unref(forwarded), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenu.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuCheckboxItem",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: [Boolean, String] },
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["select", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuCheckboxItem), mergeProps(unref(forwarded), {
        class: unref(cn)(
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DropdownMenuItemIndicator), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Check), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Check), { class: "w-4 h-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode("span", { class: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, [
                createVNode(unref(DropdownMenuItemIndicator), null, {
                  default: withCtx(() => [
                    createVNode(unref(Check), { class: "w-4 h-4" })
                  ]),
                  _: 1
                })
              ]),
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuCheckboxItem.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    side: {},
    sideOffset: { default: 4 },
    sideFlip: { type: Boolean },
    align: {},
    alignOffset: {},
    alignFlip: { type: Boolean },
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(DropdownMenuContent), mergeProps(unref(forwarded), {
              class: unref(cn)("z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class)
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(DropdownMenuContent), mergeProps(unref(forwarded), {
                class: unref(cn)("z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class)
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuContent.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuGroup",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuGroup), mergeProps(props, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuGroup.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuItem",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: {},
    inset: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuItem), mergeProps(unref(forwardedProps), {
        class: unref(cn)(
          "relative flex cursor-default select-none items-center rounded-sm gap-2 px-2 py-4 text-md outline-none transition-colors focus:bg-primaryLight focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
          __props.inset && "pl-8",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuItem.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuLabel",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {},
    inset: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuLabel), mergeProps(unref(forwardedProps), {
        class: unref(cn)("px-2 py-1.5 text-sm font-semibold", __props.inset && "pl-8", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuLabel.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuRadioGroup",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuRadioGroup), mergeProps(unref(forwarded), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuRadioGroup.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuRadioItem",
  __ssrInlineRender: true,
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuRadioItem), mergeProps(unref(forwarded), {
        class: unref(cn)(
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DropdownMenuItemIndicator), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Circle), { class: "h-4 w-4 fill-current" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Circle), { class: "h-4 w-4 fill-current" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode("span", { class: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, [
                createVNode(unref(DropdownMenuItemIndicator), null, {
                  default: withCtx(() => [
                    createVNode(unref(Circle), { class: "h-4 w-4 fill-current" })
                  ]),
                  _: 1
                })
              ]),
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuRadioItem.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuSeparator",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuSeparator), mergeProps(unref(delegatedProps), {
        class: unref(cn)("-mx-1 h-px bg-muted", props.class)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuSeparator.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuShortcut",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: unref(cn)("ml-auto text-xs tracking-widest opacity-60", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuShortcut.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuSub",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuSub), mergeProps(unref(forwarded), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuSub.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuSubContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    sideOffset: {},
    sideFlip: { type: Boolean },
    alignOffset: {},
    alignFlip: { type: Boolean },
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "entryFocus", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuSubContent), mergeProps(unref(forwarded), {
        class: unref(cn)("z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuSubContent.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuSubTrigger",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuSubTrigger), mergeProps(unref(forwardedProps), {
        class: unref(cn)(
          "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(ssrRenderComponent(unref(ChevronRight), { class: "ml-auto h-4 w-4" }, null, _parent2, _scopeId));
          } else {
            return [
              renderSlot(_ctx.$slots, "default"),
              createVNode(unref(ChevronRight), { class: "ml-auto h-4 w-4" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuSubTrigger.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuTrigger",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const forwardedProps = useForwardProps(props);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuTrigger), mergeProps({ class: "outline-none" }, unref(forwardedProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/dropdown-menu/DropdownMenuTrigger.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const badgeVariants = cva(
  "inline-flex gap-1 items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Badge",
  __ssrInlineRender: true,
  props: {
    variant: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)(unref(badgeVariants)({ variant: __props.variant }), props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/badge/Badge.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Notifications",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const notifications = page.props.auth.notifications;
    const unreadCount = computed(() => notifications.filter((n) => !n.read_at).length);
    const markAsRead = async (notification) => {
      if (notification.read_at) return;
      const notificationForm = useForm({
        id: notification.id
      });
      try {
        notificationForm.post(route("user.notification"), {
          preserveScroll: true
        });
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    };
    const getNotificationTime = (notification) => {
      const date = new Date(notification.created_at);
      const now = /* @__PURE__ */ new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1e3);
      if (diffInSeconds < 60) return "Just now";
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$g), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "relative focus:outline-none" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="relative flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" data-v-6301220e${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Bell), { class: "h-6 w-6 fill-primaryDark text-primaryLight transition-transform hover:scale-110 md:h-7 md:w-7" }, null, _parent3, _scopeId2));
                  if (unreadCount.value > 0) {
                    _push3(ssrRenderComponent(_sfc_main$2, {
                      variant: "outline",
                      class: "absolute -right-1 -top-1 h-5 min-w-[20px] animate-pulse border-red-500 bg-red-500 px-1.5 text-xs"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="font-bold text-white" data-v-6301220e${_scopeId3}>${ssrInterpolate(unreadCount.value > 99 ? "99+" : unreadCount.value)}</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "font-bold text-white" }, toDisplayString(unreadCount.value > 99 ? "99+" : unreadCount.value), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "relative flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" }, [
                      createVNode(unref(Bell), { class: "h-6 w-6 fill-primaryDark text-primaryLight transition-transform hover:scale-110 md:h-7 md:w-7" }),
                      unreadCount.value > 0 ? (openBlock(), createBlock(_sfc_main$2, {
                        key: 0,
                        variant: "outline",
                        class: "absolute -right-1 -top-1 h-5 min-w-[20px] animate-pulse border-red-500 bg-red-500 px-1.5 text-xs"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "font-bold text-white" }, toDisplayString(unreadCount.value > 99 ? "99+" : unreadCount.value), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$e), {
              align: "end",
              class: "w-80 max-w-[calc(100vw-2rem)] p-0 md:w-96"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$b), { class: "border-b px-4 py-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center justify-between" data-v-6301220e${_scopeId3}><h3 class="text-base font-semibold" data-v-6301220e${_scopeId3}>Notifications</h3>`);
                        _push4(ssrRenderComponent(_sfc_main$2, {
                          variant: "secondary",
                          class: "text-xs"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unreadCount.value)} new `);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unreadCount.value) + " new ", 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("h3", { class: "text-base font-semibold" }, "Notifications"),
                            createVNode(_sfc_main$2, {
                              variant: "secondary",
                              class: "text-xs"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unreadCount.value) + " new ", 1)
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent" data-v-6301220e${_scopeId2}>`);
                  if (unref(notifications).length > 0) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(notifications), (notification) => {
                      _push3(ssrRenderComponent(unref(_sfc_main$c), {
                        key: notification.id,
                        onClick: ($event) => markAsRead(notification),
                        class: ["cursor-pointer border-b px-4 py-3 last:border-b-0 focus:bg-blue-50 dark:focus:bg-blue-900/20", {
                          "bg-blue-50/50 dark:bg-blue-900/10": !notification.read_at,
                          "opacity-60": notification.read_at
                        }]
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="flex w-full items-start gap-3" data-v-6301220e${_scopeId3}>`);
                            if (!notification.read_at) {
                              _push4(`<div class="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" data-v-6301220e${_scopeId3}></div>`);
                            } else {
                              _push4(`<div class="mt-1.5 h-2 w-2 flex-shrink-0" data-v-6301220e${_scopeId3}></div>`);
                            }
                            _push4(`<div class="flex-1 space-y-1" data-v-6301220e${_scopeId3}><p class="text-sm leading-relaxed text-gray-900 dark:text-gray-100" data-v-6301220e${_scopeId3}>${ssrInterpolate(notification.data.data)}</p><p class="text-xs text-gray-500 dark:text-gray-400" data-v-6301220e${_scopeId3}>${ssrInterpolate(getNotificationTime(notification))}</p></div></div>`);
                          } else {
                            return [
                              createVNode("div", { class: "flex w-full items-start gap-3" }, [
                                !notification.read_at ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"
                                })) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "mt-1.5 h-2 w-2 flex-shrink-0"
                                })),
                                createVNode("div", { class: "flex-1 space-y-1" }, [
                                  createVNode("p", { class: "text-sm leading-relaxed text-gray-900 dark:text-gray-100" }, toDisplayString(notification.data.data), 1),
                                  createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, toDisplayString(getNotificationTime(notification)), 1)
                                ])
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    _push3(`<div class="flex flex-col items-center justify-center py-12 px-4" data-v-6301220e${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Bell), { class: "h-12 w-12 fill-gray-300 text-gray-200 dark:fill-gray-600 dark:text-gray-700" }, null, _parent3, _scopeId2));
                    _push3(`<p class="mt-3 text-sm text-gray-500 dark:text-gray-400" data-v-6301220e${_scopeId2}> No notifications yet </p></div>`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "my-0" }, null, _parent3, _scopeId2));
                  _push3(`<div class="p-2" data-v-6301220e${_scopeId2}><button class="w-full rounded px-3 py-2 text-center text-sm font-medium text-primaryDark transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" data-v-6301220e${_scopeId2}> View all notifications </button></div>`);
                } else {
                  return [
                    createVNode(unref(_sfc_main$b), { class: "border-b px-4 py-3" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("h3", { class: "text-base font-semibold" }, "Notifications"),
                          createVNode(_sfc_main$2, {
                            variant: "secondary",
                            class: "text-xs"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unreadCount.value) + " new ", 1)
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent" }, [
                      unref(notifications).length > 0 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(notifications), (notification) => {
                        return openBlock(), createBlock(unref(_sfc_main$c), {
                          key: notification.id,
                          onClick: ($event) => markAsRead(notification),
                          class: ["cursor-pointer border-b px-4 py-3 last:border-b-0 focus:bg-blue-50 dark:focus:bg-blue-900/20", {
                            "bg-blue-50/50 dark:bg-blue-900/10": !notification.read_at,
                            "opacity-60": notification.read_at
                          }]
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex w-full items-start gap-3" }, [
                              !notification.read_at ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"
                              })) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "mt-1.5 h-2 w-2 flex-shrink-0"
                              })),
                              createVNode("div", { class: "flex-1 space-y-1" }, [
                                createVNode("p", { class: "text-sm leading-relaxed text-gray-900 dark:text-gray-100" }, toDisplayString(notification.data.data), 1),
                                createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, toDisplayString(getNotificationTime(notification)), 1)
                              ])
                            ])
                          ]),
                          _: 2
                        }, 1032, ["onClick", "class"]);
                      }), 128)) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex flex-col items-center justify-center py-12 px-4"
                      }, [
                        createVNode(unref(Bell), { class: "h-12 w-12 fill-gray-300 text-gray-200 dark:fill-gray-600 dark:text-gray-700" }),
                        createVNode("p", { class: "mt-3 text-sm text-gray-500 dark:text-gray-400" }, " No notifications yet ")
                      ]))
                    ]),
                    createVNode(unref(_sfc_main$8), { class: "my-0" }),
                    createVNode("div", { class: "p-2" }, [
                      createVNode("button", { class: "w-full rounded px-3 py-2 text-center text-sm font-medium text-primaryDark transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" }, " View all notifications ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), { class: "relative focus:outline-none" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "relative flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" }, [
                    createVNode(unref(Bell), { class: "h-6 w-6 fill-primaryDark text-primaryLight transition-transform hover:scale-110 md:h-7 md:w-7" }),
                    unreadCount.value > 0 ? (openBlock(), createBlock(_sfc_main$2, {
                      key: 0,
                      variant: "outline",
                      class: "absolute -right-1 -top-1 h-5 min-w-[20px] animate-pulse border-red-500 bg-red-500 px-1.5 text-xs"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "font-bold text-white" }, toDisplayString(unreadCount.value > 99 ? "99+" : unreadCount.value), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$e), {
                align: "end",
                class: "w-80 max-w-[calc(100vw-2rem)] p-0 md:w-96"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$b), { class: "border-b px-4 py-3" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("h3", { class: "text-base font-semibold" }, "Notifications"),
                        createVNode(_sfc_main$2, {
                          variant: "secondary",
                          class: "text-xs"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unreadCount.value) + " new ", 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent" }, [
                    unref(notifications).length > 0 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(notifications), (notification) => {
                      return openBlock(), createBlock(unref(_sfc_main$c), {
                        key: notification.id,
                        onClick: ($event) => markAsRead(notification),
                        class: ["cursor-pointer border-b px-4 py-3 last:border-b-0 focus:bg-blue-50 dark:focus:bg-blue-900/20", {
                          "bg-blue-50/50 dark:bg-blue-900/10": !notification.read_at,
                          "opacity-60": notification.read_at
                        }]
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex w-full items-start gap-3" }, [
                            !notification.read_at ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"
                            })) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "mt-1.5 h-2 w-2 flex-shrink-0"
                            })),
                            createVNode("div", { class: "flex-1 space-y-1" }, [
                              createVNode("p", { class: "text-sm leading-relaxed text-gray-900 dark:text-gray-100" }, toDisplayString(notification.data.data), 1),
                              createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, toDisplayString(getNotificationTime(notification)), 1)
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["onClick", "class"]);
                    }), 128)) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex flex-col items-center justify-center py-12 px-4"
                    }, [
                      createVNode(unref(Bell), { class: "h-12 w-12 fill-gray-300 text-gray-200 dark:fill-gray-600 dark:text-gray-700" }),
                      createVNode("p", { class: "mt-3 text-sm text-gray-500 dark:text-gray-400" }, " No notifications yet ")
                    ]))
                  ]),
                  createVNode(unref(_sfc_main$8), { class: "my-0" }),
                  createVNode("div", { class: "p-2" }, [
                    createVNode("button", { class: "w-full rounded px-3 py-2 text-center text-sm font-medium text-primaryDark transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" }, " View all notifications ")
                  ])
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dashboard/Notifications.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Notifications = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-6301220e"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = usePage().props.auth;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$p), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$q, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(AppSidebar, null, null, _parent2, _scopeId));
            _push2(`<main class="relative h-screen w-full bg-primaryLight"${_scopeId}><div class="flex items-center justify-between bg-primaryDark/50 p-5 px-10"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$r), { class: "text-white transition-all duration-150 hover:-translate-y-1 hover:bg-white hover:text-primaryDark" }, null, _parent2, _scopeId));
            _push2(`<div class="flex items-center justify-between gap-16"${_scopeId}>`);
            _push2(ssrRenderComponent(Notifications, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$s), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$t), {
                    src: "/assets/doctor.jpeg",
                    alt: "@unovue"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$u), { class: "flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-extrabold text-transparent" }, {
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
                    createVNode(unref(_sfc_main$t), {
                      src: "/assets/doctor.jpeg",
                      alt: "@unovue"
                    }),
                    createVNode(unref(_sfc_main$u), { class: "flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-extrabold text-transparent" }, {
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
              createVNode(_sfc_main$q),
              createVNode(AppSidebar),
              createVNode("main", { class: "relative h-screen w-full bg-primaryLight" }, [
                createVNode("div", { class: "flex items-center justify-between bg-primaryDark/50 p-5 px-10" }, [
                  createVNode(unref(_sfc_main$r), { class: "text-white transition-all duration-150 hover:-translate-y-1 hover:bg-white hover:text-primaryDark" }),
                  createVNode("div", { class: "flex items-center justify-between gap-16" }, [
                    createVNode(Notifications),
                    createVNode(unref(_sfc_main$s), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$t), {
                          src: "/assets/doctor.jpeg",
                          alt: "@unovue"
                        }),
                        createVNode(unref(_sfc_main$u), { class: "flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-extrabold text-transparent" }, {
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
