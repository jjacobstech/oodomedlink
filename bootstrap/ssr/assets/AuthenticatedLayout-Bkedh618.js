import { defineComponent, ref, unref, mergeProps, withCtx, createVNode, resolveDynamicComponent, createBlock, openBlock, toDisplayString, Fragment, renderList, useSSRContext, renderSlot } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$6, c as _sfc_main$7, d as _sfc_main$8, e as _sfc_main$9, f as _sfc_main$a, g as _sfc_main$b, h as _sfc_main$c, i as _sfc_main$d, j as _sfc_main$e } from "./index-C0qxzyis.js";
import { _ as _sfc_main$5 } from "./ApplicationLogo-BnvHfr9H.js";
import { Home, Letter, UserBlock, Logout, Bell } from "@solar-icons/vue";
import { Cog } from "lucide-vue-next";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { c as cn } from "./utils-H80jjgLf.js";
import { cva } from "class-variance-authority";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const userForm = useForm({
      ...page.props.auth.user
    });
    console.log(route("user.dashboard"), page.props.ziggy.location);
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
      _push(ssrRenderComponent(unref(_sfc_main$3), mergeProps({ class: "bg-primaryDark" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex py-4 sm:py-5 lg:py-7 bg-primaryDark items-center justify-between backdrop-blur-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="transform rounded-lg sm:rounded-xl p-1.5 sm:p-2 transition-transform duration-300 hover:scale-105 bg-white" data-v-c44c2fd2${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$5, null, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "transform rounded-lg sm:rounded-xl p-1.5 sm:p-2 transition-transform duration-300 hover:scale-105 bg-white" }, [
                      createVNode(_sfc_main$5)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "py-3 sm:py-4 bg-primaryDark" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-2 sm:space-y-3 lg:space-y-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(menuItems, (item) => {
                          _push4(`<div data-v-c44c2fd2${_scopeId3}>`);
                          if (isActive(item.href)) {
                            _push4(ssrRenderComponent(unref(_sfc_main$8), { class: "bg-primaryLight text-primaryDark relative overflow-hidden group" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(Link), {
                                    href: item.href,
                                    class: "flex items-center gap-2 sm:gap-3 w-full relative z-10 transition-all duration-300 px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" data-v-c44c2fd2${_scopeId5}></div><div class="relative p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0" data-v-c44c2fd2${_scopeId5}>`);
                                        ssrRenderVNode(_push6, createVNode(resolveDynamicComponent(item.icon), { class: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-transform duration-300" }, null), _parent6, _scopeId5);
                                        _push6(`</div><span class="text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 group-hover:translate-x-1" data-v-c44c2fd2${_scopeId5}>${ssrInterpolate(item.label)}</span><div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" data-v-c44c2fd2${_scopeId5}></div>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" }),
                                          createVNode("div", { class: "relative p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0" }, [
                                            (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-transform duration-300" }))
                                          ]),
                                          createVNode("span", { class: "text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
                                          createVNode("div", { class: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" })
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(Link), {
                                      href: item.href,
                                      class: "flex items-center gap-2 sm:gap-3 w-full relative z-10 transition-all duration-300 px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" }),
                                        createVNode("div", { class: "relative p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0" }, [
                                          (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-transform duration-300" }))
                                        ]),
                                        createVNode("span", { class: "text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
                                        createVNode("div", { class: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" })
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(unref(_sfc_main$8), { class: "hover:bg-primaryLight text-white hover:text-primaryDark relative overflow-hidden group" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(Link), {
                                    href: item.href,
                                    class: "flex items-center gap-2 sm:gap-3 w-full relative z-10 transition-all duration-300 px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" data-v-c44c2fd2${_scopeId5}></div><div class="relative p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0" data-v-c44c2fd2${_scopeId5}>`);
                                        ssrRenderVNode(_push6, createVNode(resolveDynamicComponent(item.icon), { class: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-transform duration-300" }, null), _parent6, _scopeId5);
                                        _push6(`</div><span class="text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 group-hover:translate-x-1" data-v-c44c2fd2${_scopeId5}>${ssrInterpolate(item.label)}</span><div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" data-v-c44c2fd2${_scopeId5}></div>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" }),
                                          createVNode("div", { class: "relative p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0" }, [
                                            (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-transform duration-300" }))
                                          ]),
                                          createVNode("span", { class: "text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
                                          createVNode("div", { class: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" })
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(Link), {
                                      href: item.href,
                                      class: "flex items-center gap-2 sm:gap-3 w-full relative z-10 transition-all duration-300 px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" }),
                                        createVNode("div", { class: "relative p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0" }, [
                                          (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-transform duration-300" }))
                                        ]),
                                        createVNode("span", { class: "text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
                                        createVNode("div", { class: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" })
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
                                class: "bg-primaryLight text-primaryDark relative overflow-hidden group"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Link), {
                                    href: item.href,
                                    class: "flex items-center gap-2 sm:gap-3 w-full relative z-10 transition-all duration-300 px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" }),
                                      createVNode("div", { class: "relative p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0" }, [
                                        (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-transform duration-300" }))
                                      ]),
                                      createVNode("span", { class: "text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
                                      createVNode("div", { class: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" })
                                    ]),
                                    _: 2
                                  }, 1032, ["href"])
                                ]),
                                _: 2
                              }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$8), {
                                key: 1,
                                class: "hover:bg-primaryLight text-white hover:text-primaryDark relative overflow-hidden group"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Link), {
                                    href: item.href,
                                    class: "flex items-center gap-2 sm:gap-3 w-full relative z-10 transition-all duration-300 px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" }),
                                      createVNode("div", { class: "relative p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0" }, [
                                        (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-transform duration-300" }))
                                      ]),
                                      createVNode("span", { class: "text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
                                      createVNode("div", { class: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" })
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
                              class: "bg-primaryLight text-primaryDark relative overflow-hidden group"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Link), {
                                  href: item.href,
                                  class: "flex items-center gap-2 sm:gap-3 w-full relative z-10 transition-all duration-300 px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" }),
                                    createVNode("div", { class: "relative p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0" }, [
                                      (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-transform duration-300" }))
                                    ]),
                                    createVNode("span", { class: "text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
                                    createVNode("div", { class: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" })
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ]),
                              _: 2
                            }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$8), {
                              key: 1,
                              class: "hover:bg-primaryLight text-white hover:text-primaryDark relative overflow-hidden group"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Link), {
                                  href: item.href,
                                  class: "flex items-center gap-2 sm:gap-3 w-full relative z-10 transition-all duration-300 px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" }),
                                    createVNode("div", { class: "relative p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0" }, [
                                      (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-transform duration-300" }))
                                    ]),
                                    createVNode("span", { class: "text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
                                    createVNode("div", { class: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" })
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
            _push2(ssrRenderComponent(unref(_sfc_main$9), { class: "p-2 sm:p-3 bg-primaryDark backdrop-blur-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "group hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300 rounded-lg" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<a class="flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 cursor-pointer transition-colors duration-300" data-v-c44c2fd2${_scopeId3}><div class="p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0" data-v-c44c2fd2${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Logout), { class: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white group-hover:text-red-600 transition-all duration-300 group-hover:rotate-12" }, null, _parent4, _scopeId3));
                        _push4(`</div><span class="text-sm sm:text-base lg:text-lg text-white group-hover:text-red-600 font-semibold transition-all duration-300 group-hover:translate-x-1" data-v-c44c2fd2${_scopeId3}> Logout </span></a>`);
                      } else {
                        return [
                          createVNode("a", {
                            onClick: logout,
                            class: "flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 cursor-pointer transition-colors duration-300"
                          }, [
                            createVNode("div", { class: "p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0" }, [
                              createVNode(unref(Logout), { class: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white group-hover:text-red-600 transition-all duration-300 group-hover:rotate-12" })
                            ]),
                            createVNode("span", { class: "text-sm sm:text-base lg:text-lg text-white group-hover:text-red-600 font-semibold transition-all duration-300 group-hover:translate-x-1" }, " Logout ")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$8), { class: "group hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300 rounded-lg" }, {
                      default: withCtx(() => [
                        createVNode("a", {
                          onClick: logout,
                          class: "flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 cursor-pointer transition-colors duration-300"
                        }, [
                          createVNode("div", { class: "p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0" }, [
                            createVNode(unref(Logout), { class: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white group-hover:text-red-600 transition-all duration-300 group-hover:rotate-12" })
                          ]),
                          createVNode("span", { class: "text-sm sm:text-base lg:text-lg text-white group-hover:text-red-600 font-semibold transition-all duration-300 group-hover:translate-x-1" }, " Logout ")
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
              createVNode(unref(_sfc_main$4), { class: "flex py-4 sm:py-5 lg:py-7 bg-primaryDark items-center justify-between backdrop-blur-sm" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "transform rounded-lg sm:rounded-xl p-1.5 sm:p-2 transition-transform duration-300 hover:scale-105 bg-white" }, [
                    createVNode(_sfc_main$5)
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), { class: "py-3 sm:py-4 bg-primaryDark" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$7), { class: "space-y-2 sm:space-y-3 lg:space-y-4" }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(menuItems, (item) => {
                        return createVNode("div", {
                          key: item.href
                        }, [
                          isActive(item.href) ? (openBlock(), createBlock(unref(_sfc_main$8), {
                            key: 0,
                            class: "bg-primaryLight text-primaryDark relative overflow-hidden group"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Link), {
                                href: item.href,
                                class: "flex items-center gap-2 sm:gap-3 w-full relative z-10 transition-all duration-300 px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" }),
                                  createVNode("div", { class: "relative p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0" }, [
                                    (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-transform duration-300" }))
                                  ]),
                                  createVNode("span", { class: "text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
                                  createVNode("div", { class: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" })
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ]),
                            _: 2
                          }, 1024)) : (openBlock(), createBlock(unref(_sfc_main$8), {
                            key: 1,
                            class: "hover:bg-primaryLight text-white hover:text-primaryDark relative overflow-hidden group"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Link), {
                                href: item.href,
                                class: "flex items-center gap-2 sm:gap-3 w-full relative z-10 transition-all duration-300 px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" }),
                                  createVNode("div", { class: "relative p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0" }, [
                                    (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-transform duration-300" }))
                                  ]),
                                  createVNode("span", { class: "text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
                                  createVNode("div", { class: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" })
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
              createVNode(unref(_sfc_main$9), { class: "p-2 sm:p-3 bg-primaryDark backdrop-blur-sm" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$8), { class: "group hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300 rounded-lg" }, {
                    default: withCtx(() => [
                      createVNode("a", {
                        onClick: logout,
                        class: "flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 cursor-pointer transition-colors duration-300"
                      }, [
                        createVNode("div", { class: "p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0" }, [
                          createVNode(unref(Logout), { class: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white group-hover:text-red-600 transition-all duration-300 group-hover:rotate-12" })
                        ]),
                        createVNode("span", { class: "text-sm sm:text-base lg:text-lg text-white group-hover:text-red-600 font-semibold transition-all duration-300 group-hover:translate-x-1" }, " Logout ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dashboard/AppSidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-c44c2fd2"]]);
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
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/badge/Badge.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = usePage().props.auth;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$a), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(AppSidebar, null, null, _parent2, _scopeId));
            _push2(`<main class="bg-white h-screen w-full"${_scopeId}><div class="p-5 bg-primaryDark/50 flex justify-between items-center px-10"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$b), { class: "hover:-translate-y-1 transition-all duration-150 text-white hover:bg-white hover:text-primaryDark" }, null, _parent2, _scopeId));
            _push2(`<div class="flex items-center justify-between gap-16"${_scopeId}><div class="flex relative items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Bell), { class: "w-8 h-8 text-primaryLight fill-primaryDark" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              variant: "outline",
              class: "ml-4 animate-bounce bg-primaryDark border-primaryDark mb-3 absolute"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-sm font-extrabold text-white"${_scopeId2}>${ssrInterpolate(3)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-sm font-extrabold text-white" }, toDisplayString(3))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$c), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$d), {
                    src: "/assets/doctor.jpeg",
                    alt: "@unovue"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$e), { class: "bg-white text-transparent w-16 font-extrabold text-xl justify-center flex items-center rounded-full h-16" }, {
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
                    createVNode(unref(_sfc_main$d), {
                      src: "/assets/doctor.jpeg",
                      alt: "@unovue"
                    }),
                    createVNode(unref(_sfc_main$e), { class: "bg-white text-transparent w-16 font-extrabold text-xl justify-center flex items-center rounded-full h-16" }, {
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
            _push2(`<footer class=""${_scopeId}><p class="text-xl text-center text-black"${_scopeId}>© 2025 Oodo Medlink. All Rights Reserved</p></footer></main>`);
          } else {
            return [
              createVNode(AppSidebar),
              createVNode("main", { class: "bg-white h-screen w-full" }, [
                createVNode("div", { class: "p-5 bg-primaryDark/50 flex justify-between items-center px-10" }, [
                  createVNode(unref(_sfc_main$b), { class: "hover:-translate-y-1 transition-all duration-150 text-white hover:bg-white hover:text-primaryDark" }),
                  createVNode("div", { class: "flex items-center justify-between gap-16" }, [
                    createVNode("div", { class: "flex relative items-center" }, [
                      createVNode(unref(Bell), { class: "w-8 h-8 text-primaryLight fill-primaryDark" }),
                      createVNode(_sfc_main$1, {
                        variant: "outline",
                        class: "ml-4 animate-bounce bg-primaryDark border-primaryDark mb-3 absolute"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "text-sm font-extrabold text-white" }, toDisplayString(3))
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(unref(_sfc_main$c), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$d), {
                          src: "/assets/doctor.jpeg",
                          alt: "@unovue"
                        }),
                        createVNode(unref(_sfc_main$e), { class: "bg-white text-transparent w-16 font-extrabold text-xl justify-center flex items-center rounded-full h-16" }, {
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
                createVNode("footer", { class: "" }, [
                  createVNode("p", { class: "text-xl text-center text-black" }, "© 2025 Oodo Medlink. All Rights Reserved")
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
