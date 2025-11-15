import { defineComponent, ref, unref, mergeProps, withCtx, createVNode, resolveDynamicComponent, createBlock, openBlock, toDisplayString, Fragment, renderList, useSSRContext, renderSlot } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$5, c as _sfc_main$6, d as _sfc_main$7, e as _sfc_main$8, f as _sfc_main$9, g as _sfc_main$a, h as _sfc_main$b, i as _sfc_main$c, j as _sfc_main$d } from "./index-BuLlIqzt.js";
import { _ as _sfc_main$4 } from "./ApplicationLogo-BnvHfr9H.js";
import { Home, Letter, UserBlock, Logout } from "@solar-icons/vue";
import { Cog } from "lucide-vue-next";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const userForm = useForm({
      ...page.props.auth.user
    });
    console.log(route("user.dashboard"), page.props.ziggy.location);
    ref(page.props.ziggy.location);
    const menuItems = [
      { href: route("user.dashboard"), icon: Home, label: "Dashboard" },
      { href: route("user.emails"), icon: Letter, label: "Emails" },
      { href: route("user.patients"), icon: UserBlock, label: "Patients" },
      { href: route("user.settings"), icon: Cog, label: "Settings" }
    ];
    const logout = () => {
      userForm.post(route("logout"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$2), mergeProps({ class: "bg-primaryDark" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "flex py-7 bg-primaryDark items-center justify-between backdrop-blur-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="transform rounded-xl p-2 transition-transform duration-300 hover:scale-105 bg-white" data-v-6f853249${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, null, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "transform rounded-xl p-2 transition-transform duration-300 hover:scale-105 bg-white" }, [
                      createVNode(_sfc_main$4)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "py-4 bg-primaryDark" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { class: "space-y-5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(menuItems, (item) => {
                          _push4(`<div data-v-6f853249${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$7), { class: "relative overflow-hidden group text-xl text-white font-extrabold" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Link), {
                                  href: item.href,
                                  class: "flex items-center gap-3 w-full relative z-10 transition-all duration-300"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" data-v-6f853249${_scopeId5}></div><div class="relative p-2 rounded-lg transition-all duration-300 group-hover:scale-110" data-v-6f853249${_scopeId5}>`);
                                      ssrRenderVNode(_push6, createVNode(resolveDynamicComponent(item.icon), { class: "w-7 h-7 transition-transform duration-300" }, null), _parent6, _scopeId5);
                                      _push6(`</div><span class="font-medium transition-all duration-300 group-hover:translate-x-1" data-v-6f853249${_scopeId5}>${ssrInterpolate(item.label)}</span><div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" data-v-6f853249${_scopeId5}></div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" }),
                                        createVNode("div", { class: "relative p-2 rounded-lg transition-all duration-300 group-hover:scale-110" }, [
                                          (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-7 h-7 transition-transform duration-300" }))
                                        ]),
                                        createVNode("span", { class: "font-medium transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
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
                                    class: "flex items-center gap-3 w-full relative z-10 transition-all duration-300"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" }),
                                      createVNode("div", { class: "relative p-2 rounded-lg transition-all duration-300 group-hover:scale-110" }, [
                                        (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-7 h-7 transition-transform duration-300" }))
                                      ]),
                                      createVNode("span", { class: "font-medium transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
                                      createVNode("div", { class: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" })
                                    ]),
                                    _: 2
                                  }, 1032, ["href"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(menuItems, (item) => {
                            return createVNode("div", {
                              key: item.href
                            }, [
                              createVNode(unref(_sfc_main$7), { class: "relative overflow-hidden group text-xl text-white font-extrabold" }, {
                                default: withCtx(() => [
                                  createVNode(unref(Link), {
                                    href: item.href,
                                    class: "flex items-center gap-3 w-full relative z-10 transition-all duration-300"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" }),
                                      createVNode("div", { class: "relative p-2 rounded-lg transition-all duration-300 group-hover:scale-110" }, [
                                        (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-7 h-7 transition-transform duration-300" }))
                                      ]),
                                      createVNode("span", { class: "font-medium transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
                                      createVNode("div", { class: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" })
                                    ]),
                                    _: 2
                                  }, 1032, ["href"])
                                ]),
                                _: 2
                              }, 1024)
                            ]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$6), { class: "space-y-5" }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(menuItems, (item) => {
                          return createVNode("div", {
                            key: item.href
                          }, [
                            createVNode(unref(_sfc_main$7), { class: "relative overflow-hidden group text-xl text-white font-extrabold" }, {
                              default: withCtx(() => [
                                createVNode(unref(Link), {
                                  href: item.href,
                                  class: "flex items-center gap-3 w-full relative z-10 transition-all duration-300"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" }),
                                    createVNode("div", { class: "relative p-2 rounded-lg transition-all duration-300 group-hover:scale-110" }, [
                                      (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-7 h-7 transition-transform duration-300" }))
                                    ]),
                                    createVNode("span", { class: "font-medium transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
                                    createVNode("div", { class: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" })
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ]),
                              _: 2
                            }, 1024)
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
            _push2(ssrRenderComponent(unref(_sfc_main$8), { class: "p-3 bg-primaryDark backdrop-blur-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "group hover:bg-red-50 dark:hover:bg-red-950/20 transition-all text-2xl font-extrabold duration-300" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<a class="flex items-center gap-3 w-full hover:text-black text-white transition-colors duration-300" data-v-6f853249${_scopeId3}><div class="p-2 rounded-lg transition-all duration-300 group-hover:scale-110" data-v-6f853249${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Logout), { class: "w-7 h-7 transition-transform duration-300 group-hover:rotate-12" }, null, _parent4, _scopeId3));
                        _push4(`</div><span class="font-medium transition-al l duration-300 group-hover:translate-x-1" data-v-6f853249${_scopeId3}>Logout</span></a>`);
                      } else {
                        return [
                          createVNode("a", {
                            onClick: logout,
                            class: "flex items-center gap-3 w-full hover:text-black text-white transition-colors duration-300"
                          }, [
                            createVNode("div", { class: "p-2 rounded-lg transition-all duration-300 group-hover:scale-110" }, [
                              createVNode(unref(Logout), { class: "w-7 h-7 transition-transform duration-300 group-hover:rotate-12" })
                            ]),
                            createVNode("span", { class: "font-medium transition-al l duration-300 group-hover:translate-x-1" }, "Logout")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$7), { class: "group hover:bg-red-50 dark:hover:bg-red-950/20 transition-all text-2xl font-extrabold duration-300" }, {
                      default: withCtx(() => [
                        createVNode("a", {
                          onClick: logout,
                          class: "flex items-center gap-3 w-full hover:text-black text-white transition-colors duration-300"
                        }, [
                          createVNode("div", { class: "p-2 rounded-lg transition-all duration-300 group-hover:scale-110" }, [
                            createVNode(unref(Logout), { class: "w-7 h-7 transition-transform duration-300 group-hover:rotate-12" })
                          ]),
                          createVNode("span", { class: "font-medium transition-al l duration-300 group-hover:translate-x-1" }, "Logout")
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
              createVNode(unref(_sfc_main$3), { class: "flex py-7 bg-primaryDark items-center justify-between backdrop-blur-sm" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "transform rounded-xl p-2 transition-transform duration-300 hover:scale-105 bg-white" }, [
                    createVNode(_sfc_main$4)
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), { class: "py-4 bg-primaryDark" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$6), { class: "space-y-5" }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(menuItems, (item) => {
                        return createVNode("div", {
                          key: item.href
                        }, [
                          createVNode(unref(_sfc_main$7), { class: "relative overflow-hidden group text-xl text-white font-extrabold" }, {
                            default: withCtx(() => [
                              createVNode(unref(Link), {
                                href: item.href,
                                class: "flex items-center gap-3 w-full relative z-10 transition-all duration-300"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" }),
                                  createVNode("div", { class: "relative p-2 rounded-lg transition-all duration-300 group-hover:scale-110" }, [
                                    (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-7 h-7 transition-transform duration-300" }))
                                  ]),
                                  createVNode("span", { class: "font-medium transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
                                  createVNode("div", { class: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" })
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ]),
                            _: 2
                          }, 1024)
                        ]);
                      }), 64))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$8), { class: "p-3 bg-primaryDark backdrop-blur-sm" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$7), { class: "group hover:bg-red-50 dark:hover:bg-red-950/20 transition-all text-2xl font-extrabold duration-300" }, {
                    default: withCtx(() => [
                      createVNode("a", {
                        onClick: logout,
                        class: "flex items-center gap-3 w-full hover:text-black text-white transition-colors duration-300"
                      }, [
                        createVNode("div", { class: "p-2 rounded-lg transition-all duration-300 group-hover:scale-110" }, [
                          createVNode(unref(Logout), { class: "w-7 h-7 transition-transform duration-300 group-hover:rotate-12" })
                        ]),
                        createVNode("span", { class: "font-medium transition-al l duration-300 group-hover:translate-x-1" }, "Logout")
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dashboard/AppSidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AppSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-6f853249"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = usePage().props.auth;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$9), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(AppSidebar, null, null, _parent2, _scopeId));
            _push2(`<main class="bg-white h-screen w-full"${_scopeId}><div class="p-5 bg-primaryDark/50 flex justify-between items-center px-10"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$a), { class: "hover:-translate-y-1 transition-all duration-150 text-white hover:bg-white hover:text-primaryDark" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$b), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$c), {
                    src: "/assets/doctor.jpeg",
                    alt: "@unovue"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$d), { class: "bg-white text-transparent w-16 font-extrabold text-xl justify-center flex items-center rounded-full h-16" }, {
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
                    createVNode(unref(_sfc_main$c), {
                      src: "/assets/doctor.jpeg",
                      alt: "@unovue"
                    }),
                    createVNode(unref(_sfc_main$d), { class: "bg-white text-transparent w-16 font-extrabold text-xl justify-center flex items-center rounded-full h-16" }, {
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
            _push2(`</div>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`<footer class=""${_scopeId}><p class="text-xl text-center text-black"${_scopeId}>© 2025 Oodo Medlink. All Rights Reserved</p></footer></main>`);
          } else {
            return [
              createVNode(AppSidebar),
              createVNode("main", { class: "bg-white h-screen w-full" }, [
                createVNode("div", { class: "p-5 bg-primaryDark/50 flex justify-between items-center px-10" }, [
                  createVNode(unref(_sfc_main$a), { class: "hover:-translate-y-1 transition-all duration-150 text-white hover:bg-white hover:text-primaryDark" }),
                  createVNode(unref(_sfc_main$b), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$c), {
                        src: "/assets/doctor.jpeg",
                        alt: "@unovue"
                      }),
                      createVNode(unref(_sfc_main$d), { class: "bg-white text-transparent w-16 font-extrabold text-xl justify-center flex items-center rounded-full h-16" }, {
                        default: withCtx(() => [
                          createVNode("p", { class: "bg-deepgradient bg-clip-text" }, toDisplayString(unref(auth).user.name.charAt(0).toUpperCase()), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
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
