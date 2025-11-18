import { defineComponent, ref, unref, mergeProps, withCtx, createVNode, resolveDynamicComponent, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, useSSRContext, renderSlot, computed, withDirectives, vModelText, withModifiers, vModelSelect } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrInterpolate, ssrRenderSlot, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$6, c as _sfc_main$7, d as _sfc_main$8, e as _sfc_main$9, f as _sfc_main$a, g as _sfc_main$b, h as _sfc_main$c, i as _sfc_main$d, j as _sfc_main$e } from "./index-Ch8fN83j.js";
import { usePage, useForm, Link, Head, router } from "@inertiajs/vue3";
import { Home, Logout } from "@solar-icons/vue";
import { _ as _sfc_main$5 } from "./ApplicationLogo-Bxi8t0Nk.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "class-variance-authority";
import "reka-ui";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "lucide-vue-next";
import "./index-D-5AVEXV.js";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const userForm = useForm({
      ...page.props.auth.user
    });
    const activeRoute = ref(window.location.pathname);
    const menuItems = [
      {
        href: route("admin.dashboard"),
        icon: Home,
        label: "Dashboard",
        gradient: "from-deepblue to-cyan-500"
      }
    ];
    const isActive = (href) => activeRoute.value === href;
    const logout = () => {
      userForm.post(route("admin.logout"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$3), mergeProps({ class: "border-r border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 dark:border-slate-800 dark:to-slate-950 xl:dark:from-slate-900" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex items-center justify-between border-b border-slate-200 bg-white/50 py-4 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="transform transition-transform duration-300 hover:scale-105" data-v-41539062${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$5, null, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "transform transition-transform duration-300 hover:scale-105" }, [
                      createVNode(_sfc_main$5)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "py-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "space-y-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(menuItems, (item) => {
                          _push4(`<div data-v-41539062${_scopeId3}>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$8), {
                            class: [
                              "group relative overflow-hidden",
                              isActive(item.href) ? "bg-white shadow-lg shadow-slate-200/50 dark:bg-slate-800 dark:shadow-slate-900/50" : "hover:bg-white/60 dark:hover:bg-slate-800/60"
                            ]
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Link), {
                                  href: item.href,
                                  class: [
                                    "relative z-10 flex w-full items-center gap-3 transition-all duration-300",
                                    isActive(item.href) ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"
                                  ]
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="${ssrRenderClass([item.gradient, "absolute inset-0 -z-10 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-10"])}" data-v-41539062${_scopeId5}></div>`);
                                      if (isActive(item.href)) {
                                        _push6(`<div class="${ssrRenderClass([item.gradient, "absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 animate-pulse rounded-r-full bg-gradient-to-b"])}" data-v-41539062${_scopeId5}></div>`);
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                      _push6(`<div class="${ssrRenderClass([
                                        isActive(item.href) ? "bg-gradient-to-br " + item.gradient + " text-white shadow-md" : "bg-slate-100 dark:bg-slate-800",
                                        "relative rounded-lg p-2 transition-all duration-300 group-hover:scale-110"
                                      ])}" data-v-41539062${_scopeId5}>`);
                                      ssrRenderVNode(_push6, createVNode(resolveDynamicComponent(item.icon), {
                                        class: [
                                          "h-5 w-5 transition-transform duration-300",
                                          !isActive(item.href) ? "text-slate-600 dark:text-slate-400" : ""
                                        ]
                                      }, null), _parent6, _scopeId5);
                                      _push6(`</div><span class="font-medium transition-all duration-300 group-hover:translate-x-1" data-v-41539062${_scopeId5}>${ssrInterpolate(item.label)}</span><div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" data-v-41539062${_scopeId5}></div>`);
                                    } else {
                                      return [
                                        createVNode("div", {
                                          class: ["absolute inset-0 -z-10 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-10", item.gradient]
                                        }, null, 2),
                                        isActive(item.href) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: ["absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 animate-pulse rounded-r-full bg-gradient-to-b", item.gradient]
                                        }, null, 2)) : createCommentVNode("", true),
                                        createVNode("div", {
                                          class: [
                                            "relative rounded-lg p-2 transition-all duration-300 group-hover:scale-110",
                                            isActive(item.href) ? "bg-gradient-to-br " + item.gradient + " text-white shadow-md" : "bg-slate-100 dark:bg-slate-800"
                                          ]
                                        }, [
                                          (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                            class: [
                                              "h-5 w-5 transition-transform duration-300",
                                              !isActive(item.href) ? "text-slate-600 dark:text-slate-400" : ""
                                            ]
                                          }, null, 8, ["class"]))
                                        ], 2),
                                        createVNode("span", { class: "font-medium transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
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
                                    class: [
                                      "relative z-10 flex w-full items-center gap-3 transition-all duration-300",
                                      isActive(item.href) ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"
                                    ]
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", {
                                        class: ["absolute inset-0 -z-10 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-10", item.gradient]
                                      }, null, 2),
                                      isActive(item.href) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: ["absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 animate-pulse rounded-r-full bg-gradient-to-b", item.gradient]
                                      }, null, 2)) : createCommentVNode("", true),
                                      createVNode("div", {
                                        class: [
                                          "relative rounded-lg p-2 transition-all duration-300 group-hover:scale-110",
                                          isActive(item.href) ? "bg-gradient-to-br " + item.gradient + " text-white shadow-md" : "bg-slate-100 dark:bg-slate-800"
                                        ]
                                      }, [
                                        (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                          class: [
                                            "h-5 w-5 transition-transform duration-300",
                                            !isActive(item.href) ? "text-slate-600 dark:text-slate-400" : ""
                                          ]
                                        }, null, 8, ["class"]))
                                      ], 2),
                                      createVNode("span", { class: "font-medium transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
                                      createVNode("div", { class: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" })
                                    ]),
                                    _: 2
                                  }, 1032, ["href", "class"])
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
                              createVNode(unref(_sfc_main$8), {
                                class: [
                                  "group relative overflow-hidden",
                                  isActive(item.href) ? "bg-white shadow-lg shadow-slate-200/50 dark:bg-slate-800 dark:shadow-slate-900/50" : "hover:bg-white/60 dark:hover:bg-slate-800/60"
                                ]
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Link), {
                                    href: item.href,
                                    class: [
                                      "relative z-10 flex w-full items-center gap-3 transition-all duration-300",
                                      isActive(item.href) ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"
                                    ]
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", {
                                        class: ["absolute inset-0 -z-10 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-10", item.gradient]
                                      }, null, 2),
                                      isActive(item.href) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: ["absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 animate-pulse rounded-r-full bg-gradient-to-b", item.gradient]
                                      }, null, 2)) : createCommentVNode("", true),
                                      createVNode("div", {
                                        class: [
                                          "relative rounded-lg p-2 transition-all duration-300 group-hover:scale-110",
                                          isActive(item.href) ? "bg-gradient-to-br " + item.gradient + " text-white shadow-md" : "bg-slate-100 dark:bg-slate-800"
                                        ]
                                      }, [
                                        (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                          class: [
                                            "h-5 w-5 transition-transform duration-300",
                                            !isActive(item.href) ? "text-slate-600 dark:text-slate-400" : ""
                                          ]
                                        }, null, 8, ["class"]))
                                      ], 2),
                                      createVNode("span", { class: "font-medium transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
                                      createVNode("div", { class: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" })
                                    ]),
                                    _: 2
                                  }, 1032, ["href", "class"])
                                ]),
                                _: 2
                              }, 1032, ["class"])
                            ]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$7), { class: "space-y-2" }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(menuItems, (item) => {
                          return createVNode("div", {
                            key: item.href
                          }, [
                            createVNode(unref(_sfc_main$8), {
                              class: [
                                "group relative overflow-hidden",
                                isActive(item.href) ? "bg-white shadow-lg shadow-slate-200/50 dark:bg-slate-800 dark:shadow-slate-900/50" : "hover:bg-white/60 dark:hover:bg-slate-800/60"
                              ]
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Link), {
                                  href: item.href,
                                  class: [
                                    "relative z-10 flex w-full items-center gap-3 transition-all duration-300",
                                    isActive(item.href) ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"
                                  ]
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", {
                                      class: ["absolute inset-0 -z-10 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-10", item.gradient]
                                    }, null, 2),
                                    isActive(item.href) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: ["absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 animate-pulse rounded-r-full bg-gradient-to-b", item.gradient]
                                    }, null, 2)) : createCommentVNode("", true),
                                    createVNode("div", {
                                      class: [
                                        "relative rounded-lg p-2 transition-all duration-300 group-hover:scale-110",
                                        isActive(item.href) ? "bg-gradient-to-br " + item.gradient + " text-white shadow-md" : "bg-slate-100 dark:bg-slate-800"
                                      ]
                                    }, [
                                      (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                        class: [
                                          "h-5 w-5 transition-transform duration-300",
                                          !isActive(item.href) ? "text-slate-600 dark:text-slate-400" : ""
                                        ]
                                      }, null, 8, ["class"]))
                                    ], 2),
                                    createVNode("span", { class: "font-medium transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
                                    createVNode("div", { class: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" })
                                  ]),
                                  _: 2
                                }, 1032, ["href", "class"])
                              ]),
                              _: 2
                            }, 1032, ["class"])
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
            _push2(ssrRenderComponent(unref(_sfc_main$9), { class: "border-t border-slate-200 bg-white/30 p-3 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/30" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "group transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-950/20" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<a class="flex w-full items-center gap-3 text-slate-600 transition-colors duration-300 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400" data-v-41539062${_scopeId3}><div class="rounded-lg bg-slate-100 p-2 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-100 dark:bg-slate-800 dark:group-hover:bg-red-950/30" data-v-41539062${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Logout), { class: "h-5 w-5 transition-transform duration-300 group-hover:rotate-12" }, null, _parent4, _scopeId3));
                        _push4(`</div><span class="font-medium transition-all duration-300 group-hover:translate-x-1" data-v-41539062${_scopeId3}>Logout</span></a>`);
                      } else {
                        return [
                          createVNode("a", {
                            onClick: logout,
                            class: "flex w-full items-center gap-3 text-slate-600 transition-colors duration-300 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
                          }, [
                            createVNode("div", { class: "rounded-lg bg-slate-100 p-2 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-100 dark:bg-slate-800 dark:group-hover:bg-red-950/30" }, [
                              createVNode(unref(Logout), { class: "h-5 w-5 transition-transform duration-300 group-hover:rotate-12" })
                            ]),
                            createVNode("span", { class: "font-medium transition-all duration-300 group-hover:translate-x-1" }, "Logout")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$8), { class: "group transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-950/20" }, {
                      default: withCtx(() => [
                        createVNode("a", {
                          onClick: logout,
                          class: "flex w-full items-center gap-3 text-slate-600 transition-colors duration-300 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
                        }, [
                          createVNode("div", { class: "rounded-lg bg-slate-100 p-2 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-100 dark:bg-slate-800 dark:group-hover:bg-red-950/30" }, [
                            createVNode(unref(Logout), { class: "h-5 w-5 transition-transform duration-300 group-hover:rotate-12" })
                          ]),
                          createVNode("span", { class: "font-medium transition-all duration-300 group-hover:translate-x-1" }, "Logout")
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
              createVNode(unref(_sfc_main$4), { class: "flex items-center justify-between border-b border-slate-200 bg-white/50 py-4 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "transform transition-transform duration-300 hover:scale-105" }, [
                    createVNode(_sfc_main$5)
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$6), { class: "py-4" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$7), { class: "space-y-2" }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(menuItems, (item) => {
                        return createVNode("div", {
                          key: item.href
                        }, [
                          createVNode(unref(_sfc_main$8), {
                            class: [
                              "group relative overflow-hidden",
                              isActive(item.href) ? "bg-white shadow-lg shadow-slate-200/50 dark:bg-slate-800 dark:shadow-slate-900/50" : "hover:bg-white/60 dark:hover:bg-slate-800/60"
                            ]
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Link), {
                                href: item.href,
                                class: [
                                  "relative z-10 flex w-full items-center gap-3 transition-all duration-300",
                                  isActive(item.href) ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"
                                ]
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", {
                                    class: ["absolute inset-0 -z-10 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-10", item.gradient]
                                  }, null, 2),
                                  isActive(item.href) ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: ["absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 animate-pulse rounded-r-full bg-gradient-to-b", item.gradient]
                                  }, null, 2)) : createCommentVNode("", true),
                                  createVNode("div", {
                                    class: [
                                      "relative rounded-lg p-2 transition-all duration-300 group-hover:scale-110",
                                      isActive(item.href) ? "bg-gradient-to-br " + item.gradient + " text-white shadow-md" : "bg-slate-100 dark:bg-slate-800"
                                    ]
                                  }, [
                                    (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                      class: [
                                        "h-5 w-5 transition-transform duration-300",
                                        !isActive(item.href) ? "text-slate-600 dark:text-slate-400" : ""
                                      ]
                                    }, null, 8, ["class"]))
                                  ], 2),
                                  createVNode("span", { class: "font-medium transition-all duration-300 group-hover:translate-x-1" }, toDisplayString(item.label), 1),
                                  createVNode("div", { class: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" })
                                ]),
                                _: 2
                              }, 1032, ["href", "class"])
                            ]),
                            _: 2
                          }, 1032, ["class"])
                        ]);
                      }), 64))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$9), { class: "border-t border-slate-200 bg-white/30 p-3 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/30" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$8), { class: "group transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-950/20" }, {
                    default: withCtx(() => [
                      createVNode("a", {
                        onClick: logout,
                        class: "flex w-full items-center gap-3 text-slate-600 transition-colors duration-300 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
                      }, [
                        createVNode("div", { class: "rounded-lg bg-slate-100 p-2 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-100 dark:bg-slate-800 dark:group-hover:bg-red-950/30" }, [
                          createVNode(unref(Logout), { class: "h-5 w-5 transition-transform duration-300 group-hover:rotate-12" })
                        ]),
                        createVNode("span", { class: "font-medium transition-all duration-300 group-hover:translate-x-1" }, "Logout")
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
const AppSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-41539062"]]);
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
            _push2(`<main class="w-full bg-gray-200"${_scopeId}><div class="bg-deepgradient flex items-center justify-between p-5 px-10"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$b), { class: "hover:text-deepgreen text-white transition-all duration-150 hover:-translate-y-1 hover:bg-white" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$c), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$d), {
                    src: "/assets/doctor.jpeg",
                    alt: "@unovue"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$e), { class: "flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-extrabold text-transparent" }, {
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
                    createVNode(unref(_sfc_main$e), { class: "flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-extrabold text-transparent" }, {
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
            _push2(`<footer class=""${_scopeId}><p class="text-center text-sm text-black"${_scopeId}> © 2025 Oodo Medlink. All Rights Reserved </p></footer></main>`);
          } else {
            return [
              createVNode(AppSidebar),
              createVNode("main", { class: "w-full bg-gray-200" }, [
                createVNode("div", { class: "bg-deepgradient flex items-center justify-between p-5 px-10" }, [
                  createVNode(unref(_sfc_main$b), { class: "hover:text-deepgreen text-white transition-all duration-150 hover:-translate-y-1 hover:bg-white" }),
                  createVNode(unref(_sfc_main$c), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$d), {
                        src: "/assets/doctor.jpeg",
                        alt: "@unovue"
                      }),
                      createVNode(unref(_sfc_main$e), { class: "flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-extrabold text-transparent" }, {
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
                  createVNode("p", { class: "text-center text-sm text-black" }, " © 2025 Oodo Medlink. All Rights Reserved ")
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
    stats: {}
  },
  setup(__props) {
    const props = __props;
    const activeTab = ref("overview");
    const showModal = ref(false);
    const modalType = ref("clinic");
    const selectedItem = ref(null);
    const searchQuery = ref("");
    const filterStatus = ref("all");
    const stats = computed(
      () => props.stats || {
        totalClinics: 24,
        activeClinics: 18,
        totalPatients: 1247,
        totalResults: 3456,
        pendingResults: 89,
        emailsSent: 2834,
        emailsFailed: 23
      }
    );
    const clinics = ref(
      props.clinics || [
        {
          id: "1",
          name: "City Medical Center",
          email: "admin@citymedical.com",
          phone_no: "+234-801-234-5678",
          address: "123 Health Street",
          state: "Lagos",
          country: "Nigeria",
          status: "active",
          staff_no: "STF001",
          created_at: "2025-01-15T10:00:00"
        },
        {
          id: "2",
          name: "General Hospital",
          email: "contact@generalhospital.com",
          phone_no: "+234-802-345-6789",
          address: "456 Care Avenue",
          state: "Abuja",
          country: "Nigeria",
          status: "active",
          staff_no: "STF002",
          created_at: "2025-02-20T14:30:00"
        },
        {
          id: "3",
          name: "Wellness Clinic",
          email: "info@wellnessclinic.com",
          phone_no: "+234-803-456-7890",
          address: "789 Wellness Road",
          state: "Rivers",
          country: "Nigeria",
          status: "suspended",
          staff_no: "STF003",
          created_at: "2025-03-10T09:15:00"
        }
      ]
    );
    const patients = ref(
      props.patients || [
        {
          id: "1",
          patient_id: "PAT001",
          full_name: "John Doe",
          email: "john.doe@email.com",
          phone_no: "+234-901-234-5678",
          date_of_birth: "1985-05-15",
          gender: "male",
          address: "12 Patient Street, Lagos",
          created_at: "2025-01-20T10:00:00"
        },
        {
          id: "2",
          patient_id: "PAT002",
          full_name: "Jane Smith",
          email: "jane.smith@email.com",
          phone_no: "+234-902-345-6789",
          date_of_birth: "1990-08-22",
          gender: "female",
          address: "34 Care Avenue, Abuja",
          created_at: "2025-02-15T11:30:00"
        }
      ]
    );
    const results = ref(
      props.results || [
        {
          id: "1",
          clinic_id: "1",
          patient_id: "1",
          result_type: "Blood Test",
          test_name: "Complete Blood Count",
          test_date: "2025-11-05T10:00:00",
          file_path: "/storage/results/blood_test.pdf",
          file_type: "pdf",
          status: "processed",
          uploaded_at: "2025-11-05T10:30:00"
        },
        {
          id: "2",
          clinic_id: "2",
          patient_id: "2",
          result_type: "X-Ray",
          test_name: "Chest X-Ray",
          test_date: "2025-11-07T14:00:00",
          file_path: "/storage/results/xray.jpg",
          file_type: "image",
          status: "pending",
          uploaded_at: "2025-11-07T14:30:00"
        }
      ]
    );
    const emails = ref(
      props.emails || [
        {
          id: "1",
          patient_result_id: "1",
          patient_email: "john.doe@email.com",
          sent_by: "admin@citymedical.com",
          subject: "Your Blood Test Results",
          status: "sent",
          sent_at: "2025-11-05T11:00:00",
          delivery_attempts: 1
        },
        {
          id: "2",
          patient_result_id: "2",
          patient_email: "jane.smith@email.com",
          sent_by: "contact@generalhospital.com",
          subject: "Your X-Ray Results",
          status: "failed",
          sent_at: "2025-11-07T15:00:00",
          delivery_attempts: 3,
          error_message: "Invalid email address"
        }
      ]
    );
    const admins = ref(
      props.admins || [
        {
          id: "1",
          name: "Super Admin",
          email: "superadmin@system.com",
          phone_no: "+234-900-000-0001",
          role: "super_admin",
          status: "active",
          created_at: "2025-01-01T00:00:00"
        },
        {
          id: "2",
          name: "John Admin",
          email: "john.admin@system.com",
          phone_no: "+234-900-000-0002",
          role: "admin",
          status: "active",
          created_at: "2025-02-01T10:00:00"
        }
      ]
    );
    const clinicForm = useForm({
      name: "",
      email: "",
      phone_no: "",
      address: "",
      state: "",
      country: "",
      password: "",
      staff_no: ""
    });
    const patientForm = useForm({
      patient_id: "",
      full_name: "",
      email: "",
      phone_no: "",
      date_of_birth: "",
      gender: "male",
      address: ""
    });
    const adminForm = useForm({
      name: "",
      email: "",
      phone_no: "",
      password: "",
      role: "admin"
    });
    const filteredClinics = computed(() => {
      let filtered = clinics.value;
      if (filterStatus.value !== "all") {
        filtered = filtered.filter((c) => c.status === filterStatus.value);
      }
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (c) => c.name.toLowerCase().includes(query) || c.email.toLowerCase().includes(query) || c.state.toLowerCase().includes(query)
        );
      }
      return filtered;
    });
    const filteredPatients = computed(() => {
      let filtered = patients.value;
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (p) => p.full_name.toLowerCase().includes(query) || p.email.toLowerCase().includes(query) || p.patient_id.toLowerCase().includes(query)
        );
      }
      return filtered;
    });
    const filteredResults = computed(() => {
      let filtered = results.value;
      if (filterStatus.value !== "all") {
        filtered = filtered.filter((r) => r.status === filterStatus.value);
      }
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (r) => r.test_name.toLowerCase().includes(query) || r.result_type.toLowerCase().includes(query)
        );
      }
      return filtered;
    });
    const openModal = (type, item) => {
      modalType.value = type;
      selectedItem.value = item;
      if (item) {
        if (type === "clinic") {
          clinicForm.name = item.name;
          clinicForm.email = item.email;
          clinicForm.phone_no = item.phone_no;
          clinicForm.address = item.address;
          clinicForm.state = item.state;
          clinicForm.country = item.country;
          clinicForm.staff_no = item.staff_no || "";
        } else if (type === "patient") {
          patientForm.patient_id = item.patient_id;
          patientForm.full_name = item.full_name;
          patientForm.email = item.email;
          patientForm.phone_no = item.phone_no;
          patientForm.date_of_birth = item.date_of_birth;
          patientForm.gender = item.gender;
          patientForm.address = item.address;
        } else if (type === "admin") {
          adminForm.name = item.name;
          adminForm.email = item.email;
          adminForm.phone_no = item.phone_no;
          adminForm.role = item.role;
        }
      } else {
        clinicForm.reset();
        patientForm.reset();
        adminForm.reset();
      }
      showModal.value = true;
    };
    const closeModal = () => {
      showModal.value = false;
      selectedItem.value = null;
      clinicForm.reset();
      patientForm.reset();
      adminForm.reset();
    };
    const submitForm = () => {
      const endpoint = selectedItem.value ? `/admin/${modalType.value}s/${selectedItem.value.id}/update` : `/admin/${modalType.value}s/create`;
      if (modalType.value === "clinic") {
        clinicForm.post(endpoint, {
          onSuccess: () => closeModal()
        });
      } else if (modalType.value === "patient") {
        patientForm.post(endpoint, {
          onSuccess: () => closeModal()
        });
      } else if (modalType.value === "admin") {
        adminForm.post(endpoint, {
          onSuccess: () => closeModal()
        });
      }
    };
    const updateStatus = (type, id, status) => {
      router.post(`/admin/${type}s/${id}/status`, { status });
    };
    const deleteItem = (type, id) => {
      if (confirm(`Are you sure you want to delete this ${type}?`)) {
        router.delete(`/admin/${type}s/${id}`);
      }
    };
    const retryEmail = (emailId) => {
      router.post(`/admin/emails/${emailId}/retry`);
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
        bounced: "bg-orange-100 text-orange-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Admin Panel" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-full w-full gap-1 overflow-hidden bg-gray-100"${_scopeId}><div class="w-full overflow-y-auto p-6"${_scopeId}><div class="mb-6"${_scopeId}><h1 class="text-3xl font-bold text-gray-900"${_scopeId}> Admin Panel </h1><p class="text-gray-600"${_scopeId}> Manage clinics, patients, results, and system administrators </p></div><div class="mb-6 flex gap-2 overflow-x-auto"${_scopeId}><button class="${ssrRenderClass([
              activeTab.value === "overview" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
              "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"
            ])}"${_scopeId}> 📊 Overview </button><button class="${ssrRenderClass([
              activeTab.value === "clinics" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
              "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"
            ])}"${_scopeId}> 🏥 Clinics </button><button class="${ssrRenderClass([
              activeTab.value === "patients" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
              "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"
            ])}"${_scopeId}> 👥 Patients </button><button class="${ssrRenderClass([
              activeTab.value === "results" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
              "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"
            ])}"${_scopeId}> 📋 Results </button><button class="${ssrRenderClass([
              activeTab.value === "emails" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
              "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"
            ])}"${_scopeId}> 📧 Email Logs </button><button class="${ssrRenderClass([
              activeTab.value === "admins" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
              "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"
            ])}"${_scopeId}> 👤 Admins </button></div>`);
            if (activeTab.value === "overview") {
              _push2(`<div${_scopeId}><div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"${_scopeId}><div class="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-gray-600"${_scopeId}> Total Clinics </p><p class="mt-2 text-3xl font-bold text-blue-600"${_scopeId}>${ssrInterpolate(stats.value.totalClinics)}</p><p class="mt-1 text-xs text-green-600"${_scopeId}>${ssrInterpolate(stats.value.activeClinics)} active </p></div><div class="rounded-full bg-blue-100 p-3"${_scopeId}><span class="text-3xl"${_scopeId}>🏥</span></div></div></div><div class="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-gray-600"${_scopeId}> Total Patients </p><p class="mt-2 text-3xl font-bold text-green-600"${_scopeId}>${ssrInterpolate(stats.value.totalPatients)}</p></div><div class="rounded-full bg-green-100 p-3"${_scopeId}><span class="text-3xl"${_scopeId}>👥</span></div></div></div><div class="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-gray-600"${_scopeId}> Test Results </p><p class="mt-2 text-3xl font-bold text-purple-600"${_scopeId}>${ssrInterpolate(stats.value.totalResults)}</p><p class="mt-1 text-xs text-orange-600"${_scopeId}>${ssrInterpolate(stats.value.pendingResults)} pending </p></div><div class="rounded-full bg-purple-100 p-3"${_scopeId}><span class="text-3xl"${_scopeId}>📋</span></div></div></div><div class="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-gray-600"${_scopeId}> Email Delivery </p><p class="mt-2 text-3xl font-bold text-indigo-600"${_scopeId}>${ssrInterpolate(stats.value.emailsSent)}</p><p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(stats.value.emailsFailed)} failed </p></div><div class="rounded-full bg-indigo-100 p-3"${_scopeId}><span class="text-3xl"${_scopeId}>📧</span></div></div></div></div><div class="rounded-xl bg-white p-6 shadow-sm"${_scopeId}><h3 class="mb-4 text-xl font-bold text-gray-900"${_scopeId}> Quick Actions </h3><div class="grid grid-cols-1 gap-4 md:grid-cols-3"${_scopeId}><button class="rounded-lg bg-blue-50 p-4 text-left transition-colors hover:bg-blue-100"${_scopeId}><span class="text-2xl"${_scopeId}>🏥</span><p class="mt-2 font-semibold text-gray-900"${_scopeId}> Add New Clinic </p><p class="text-sm text-gray-600"${_scopeId}> Register a new healthcare facility </p></button><button class="rounded-lg bg-green-50 p-4 text-left transition-colors hover:bg-green-100"${_scopeId}><span class="text-2xl"${_scopeId}>👤</span><p class="mt-2 font-semibold text-gray-900"${_scopeId}> Add New Patient </p><p class="text-sm text-gray-600"${_scopeId}> Register a new patient record </p></button><button class="rounded-lg bg-purple-50 p-4 text-left transition-colors hover:bg-purple-100"${_scopeId}><span class="text-2xl"${_scopeId}>⚙️</span><p class="mt-2 font-semibold text-gray-900"${_scopeId}> Add New Admin </p><p class="text-sm text-gray-600"${_scopeId}> Create a new administrator account </p></button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "clinics") {
              _push2(`<div${_scopeId}><div class="rounded-xl bg-white p-6 shadow-sm"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><h2 class="text-xl font-bold text-gray-900"${_scopeId}> Manage Clinics </h2><button class="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"${_scopeId}> + Add Clinic </button></div><div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"${_scopeId}><div class="flex gap-2"${_scopeId}><button class="${ssrRenderClass([
                filterStatus.value === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700",
                "rounded-lg px-4 py-2 font-medium transition-colors"
              ])}"${_scopeId}> All </button><button class="${ssrRenderClass([
                filterStatus.value === "active" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700",
                "rounded-lg px-4 py-2 font-medium transition-colors"
              ])}"${_scopeId}> Active </button><button class="${ssrRenderClass([
                filterStatus.value === "suspended" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700",
                "rounded-lg px-4 py-2 font-medium transition-colors"
              ])}"${_scopeId}> Suspended </button></div><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search clinics..." class="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"${_scopeId}></div><div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Clinic Name </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Email </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Phone </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Location </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Status </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Actions </th></tr></thead><tbody class="divide-y divide-gray-200 bg-white"${_scopeId}><!--[-->`);
              ssrRenderList(filteredClinics.value, (clinic) => {
                _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-4 py-4 text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(clinic.name)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(clinic.email)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(clinic.phone_no)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(clinic.state)}, ${ssrInterpolate(clinic.country)}</td><td class="px-4 py-4 text-sm"${_scopeId}><span class="${ssrRenderClass([
                  getStatusColor(
                    clinic.status
                  ),
                  "rounded-full px-3 py-1 text-xs font-semibold"
                ])}"${_scopeId}>${ssrInterpolate(clinic.status)}</span></td><td class="px-4 py-4 text-sm"${_scopeId}><div class="flex gap-2"${_scopeId}><button class="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"${_scopeId}> Edit </button>`);
                if (clinic.status === "active") {
                  _push2(`<button class="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200"${_scopeId}> Suspend </button>`);
                } else {
                  _push2(`<button class="rounded bg-green-100 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-200"${_scopeId}> Activate </button>`);
                }
                _push2(`</div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "patients") {
              _push2(`<div${_scopeId}><div class="rounded-xl bg-white p-6 shadow-sm"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><h2 class="text-xl font-bold text-gray-900"${_scopeId}> Manage Patients </h2><button class="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"${_scopeId}> + Add Patient </button></div><div class="mb-6"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search patients by name, email, or ID..." class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"${_scopeId}></div><div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Patient ID </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Full Name </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Email </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Phone </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Gender </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Date of Birth </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Actions </th></tr></thead><tbody class="divide-y divide-gray-200 bg-white"${_scopeId}><!--[-->`);
              ssrRenderList(filteredPatients.value, (patient) => {
                _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-4 py-4 text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(patient.patient_id)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(patient.full_name)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(patient.email)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(patient.phone_no)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}><span class="capitalize"${_scopeId}>${ssrInterpolate(patient.gender)}</span></td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(patient.date_of_birth)}</td><td class="px-4 py-4 text-sm"${_scopeId}><div class="flex gap-2"${_scopeId}><button class="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"${_scopeId}> Edit </button><button class="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200"${_scopeId}> Delete </button></div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "results") {
              _push2(`<div${_scopeId}><div class="rounded-xl bg-white p-6 shadow-sm"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><h2 class="text-xl font-bold text-gray-900"${_scopeId}> Patient Results </h2></div><div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"${_scopeId}><div class="flex gap-2"${_scopeId}><button class="${ssrRenderClass([
                filterStatus.value === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700",
                "rounded-lg px-4 py-2 font-medium transition-colors"
              ])}"${_scopeId}> All </button><button class="${ssrRenderClass([
                filterStatus.value === "pending" ? "bg-yellow-600 text-white" : "bg-gray-200 text-gray-700",
                "rounded-lg px-4 py-2 font-medium transition-colors"
              ])}"${_scopeId}> Pending </button><button class="${ssrRenderClass([
                filterStatus.value === "processed" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700",
                "rounded-lg px-4 py-2 font-medium transition-colors"
              ])}"${_scopeId}> Processed </button><button class="${ssrRenderClass([
                filterStatus.value === "sent" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700",
                "rounded-lg px-4 py-2 font-medium transition-colors"
              ])}"${_scopeId}> Sent </button></div><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search results..." class="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"${_scopeId}></div><div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Test Name </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Result Type </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Test Date </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> File Type </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Status </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Uploaded </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Actions </th></tr></thead><tbody class="divide-y divide-gray-200 bg-white"${_scopeId}><!--[-->`);
              ssrRenderList(filteredResults.value, (result) => {
                _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-4 py-4 text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(result.test_name)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(result.result_type)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(formatDate(result.test_date))}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}><span class="uppercase"${_scopeId}>${ssrInterpolate(result.file_type || "N/A")}</span></td><td class="px-4 py-4 text-sm"${_scopeId}><span class="${ssrRenderClass([
                  getStatusColor(
                    result.status
                  ),
                  "rounded-full px-3 py-1 text-xs font-semibold"
                ])}"${_scopeId}>${ssrInterpolate(result.status)}</span></td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(formatDate(result.uploaded_at))}</td><td class="px-4 py-4 text-sm"${_scopeId}>`);
                if (result.file_path) {
                  _push2(`<button class="rounded bg-green-100 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-200"${_scopeId}> View </button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "emails") {
              _push2(`<div${_scopeId}><div class="rounded-xl bg-white p-6 shadow-sm"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><h2 class="text-xl font-bold text-gray-900"${_scopeId}> Email Delivery Logs </h2></div><div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4"${_scopeId}><div class="rounded-lg bg-green-50 p-4"${_scopeId}><p class="text-sm font-medium text-gray-600"${_scopeId}> Sent Successfully </p><p class="mt-1 text-2xl font-bold text-green-600"${_scopeId}>${ssrInterpolate(emails.value.filter(
                (e) => e.status === "sent"
              ).length)}</p></div><div class="rounded-lg bg-yellow-50 p-4"${_scopeId}><p class="text-sm font-medium text-gray-600"${_scopeId}> Pending </p><p class="mt-1 text-2xl font-bold text-yellow-600"${_scopeId}>${ssrInterpolate(emails.value.filter(
                (e) => e.status === "pending"
              ).length)}</p></div><div class="rounded-lg bg-red-50 p-4"${_scopeId}><p class="text-sm font-medium text-gray-600"${_scopeId}> Failed </p><p class="mt-1 text-2xl font-bold text-red-600"${_scopeId}>${ssrInterpolate(emails.value.filter(
                (e) => e.status === "failed"
              ).length)}</p></div><div class="rounded-lg bg-orange-50 p-4"${_scopeId}><p class="text-sm font-medium text-gray-600"${_scopeId}> Bounced </p><p class="mt-1 text-2xl font-bold text-orange-600"${_scopeId}>${ssrInterpolate(emails.value.filter(
                (e) => e.status === "bounced"
              ).length)}</p></div></div><div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Recipient </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Subject </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Sent By </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Status </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Attempts </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Sent At </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Actions </th></tr></thead><tbody class="divide-y divide-gray-200 bg-white"${_scopeId}><!--[-->`);
              ssrRenderList(emails.value, (email) => {
                _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-4 py-4 text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(email.patient_email)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(email.subject)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(email.sent_by)}</td><td class="px-4 py-4 text-sm"${_scopeId}><span class="${ssrRenderClass([
                  getStatusColor(email.status),
                  "rounded-full px-3 py-1 text-xs font-semibold"
                ])}"${_scopeId}>${ssrInterpolate(email.status)}</span></td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(email.delivery_attempts)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(formatDate(email.sent_at))}</td><td class="px-4 py-4 text-sm"${_scopeId}>`);
                if (email.status === "failed") {
                  _push2(`<button class="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"${_scopeId}> Retry </button>`);
                } else {
                  _push2(`<span class="text-xs text-gray-400"${_scopeId}>-</span>`);
                }
                _push2(`</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeTab.value === "admins") {
              _push2(`<div${_scopeId}><div class="rounded-xl bg-white p-6 shadow-sm"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><h2 class="text-xl font-bold text-gray-900"${_scopeId}> System Administrators </h2><button class="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700"${_scopeId}> + Add Admin </button></div><div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Name </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Email </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Phone </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Role </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Status </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Created </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"${_scopeId}> Actions </th></tr></thead><tbody class="divide-y divide-gray-200 bg-white"${_scopeId}><!--[-->`);
              ssrRenderList(admins.value, (admin) => {
                _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-4 py-4 text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(admin.name)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(admin.email)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(admin.phone_no)}</td><td class="px-4 py-4 text-sm"${_scopeId}><span class="${ssrRenderClass([
                  admin.role === "super_admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800",
                  "rounded-full px-3 py-1 text-xs font-semibold"
                ])}"${_scopeId}>${ssrInterpolate(admin.role === "super_admin" ? "Super Admin" : "Admin")}</span></td><td class="px-4 py-4 text-sm"${_scopeId}><span class="${ssrRenderClass([
                  getStatusColor(admin.status),
                  "rounded-full px-3 py-1 text-xs font-semibold"
                ])}"${_scopeId}>${ssrInterpolate(admin.status)}</span></td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(formatDate(admin.created_at))}</td><td class="px-4 py-4 text-sm"${_scopeId}><div class="flex gap-2"${_scopeId}><button class="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"${_scopeId}> Edit </button>`);
                if (admin.status === "active" && admin.role !== "super_admin") {
                  _push2(`<button class="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200"${_scopeId}> Suspend </button>`);
                } else if (admin.status !== "active") {
                  _push2(`<button class="rounded bg-green-100 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-200"${_scopeId}> Activate </button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showModal.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"${_scopeId}><div class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6"${_scopeId}><h3 class="mb-6 text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(selectedItem.value ? "Edit" : "Add New")} ${ssrInterpolate(modalType.value === "clinic" ? "Clinic" : modalType.value === "patient" ? "Patient" : "Administrator")}</h3>`);
              if (modalType.value === "clinic") {
                _push2(`<form class="space-y-4"${_scopeId}><div class="grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId}><div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>Clinic Name *</label><input${ssrRenderAttr("value", unref(clinicForm).name)} type="text" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"${_scopeId}></div><div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>Email *</label><input${ssrRenderAttr("value", unref(clinicForm).email)} type="email" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"${_scopeId}></div></div><div class="grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId}><div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>Phone Number *</label><input${ssrRenderAttr("value", unref(clinicForm).phone_no)} type="tel" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"${_scopeId}></div><div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>Staff Number</label><input${ssrRenderAttr("value", unref(clinicForm).staff_no)} type="text" class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"${_scopeId}></div></div><div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>Address *</label><textarea required rows="3" class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"${_scopeId}>${ssrInterpolate(unref(clinicForm).address)}</textarea></div><div class="grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId}><div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>State *</label><input${ssrRenderAttr("value", unref(clinicForm).state)} type="text" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"${_scopeId}></div><div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>Country *</label><input${ssrRenderAttr("value", unref(clinicForm).country)} type="text" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"${_scopeId}></div></div>`);
                if (!selectedItem.value) {
                  _push2(`<div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>Password *</label><input${ssrRenderAttr("value", unref(clinicForm).password)} type="password"${ssrIncludeBooleanAttr(!selectedItem.value) ? " required" : ""} class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="flex gap-3 pt-4"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(clinicForm).processing) ? " disabled" : ""} class="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"${_scopeId}>${ssrInterpolate(unref(clinicForm).processing ? "Saving..." : selectedItem.value ? "Update" : "Create")}</button><button type="button" class="flex-1 rounded-lg bg-gray-200 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-300"${_scopeId}> Cancel </button></div></form>`);
              } else {
                _push2(`<!---->`);
              }
              if (modalType.value === "patient") {
                _push2(`<form class="space-y-4"${_scopeId}><div class="grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId}><div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>Patient ID *</label><input${ssrRenderAttr("value", unref(patientForm).patient_id)} type="text" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"${_scopeId}></div><div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>Full Name *</label><input${ssrRenderAttr("value", unref(patientForm).full_name)} type="text" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"${_scopeId}></div></div><div class="grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId}><div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>Email *</label><input${ssrRenderAttr("value", unref(patientForm).email)} type="email" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"${_scopeId}></div><div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>Phone Number *</label><input${ssrRenderAttr("value", unref(patientForm).phone_no)} type="tel" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"${_scopeId}></div></div><div class="grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId}><div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>Date of Birth *</label><input${ssrRenderAttr("value", unref(patientForm).date_of_birth)} type="date" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"${_scopeId}></div><div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>Gender *</label><select required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"${_scopeId}><option value="male"${ssrIncludeBooleanAttr(Array.isArray(unref(patientForm).gender) ? ssrLooseContain(unref(patientForm).gender, "male") : ssrLooseEqual(unref(patientForm).gender, "male")) ? " selected" : ""}${_scopeId}>Male</option><option value="female"${ssrIncludeBooleanAttr(Array.isArray(unref(patientForm).gender) ? ssrLooseContain(unref(patientForm).gender, "female") : ssrLooseEqual(unref(patientForm).gender, "female")) ? " selected" : ""}${_scopeId}>Female</option><option value="other"${ssrIncludeBooleanAttr(Array.isArray(unref(patientForm).gender) ? ssrLooseContain(unref(patientForm).gender, "other") : ssrLooseEqual(unref(patientForm).gender, "other")) ? " selected" : ""}${_scopeId}>Other</option></select></div></div><div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>Address *</label><textarea required rows="3" class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"${_scopeId}>${ssrInterpolate(unref(patientForm).address)}</textarea></div><div class="flex gap-3 pt-4"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(patientForm).processing) ? " disabled" : ""} class="flex-1 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"${_scopeId}>${ssrInterpolate(unref(patientForm).processing ? "Saving..." : selectedItem.value ? "Update" : "Create")}</button><button type="button" class="flex-1 rounded-lg bg-gray-200 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-300"${_scopeId}> Cancel </button></div></form>`);
              } else {
                _push2(`<!---->`);
              }
              if (modalType.value === "admin") {
                _push2(`<form class="space-y-4"${_scopeId}><div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>Name *</label><input${ssrRenderAttr("value", unref(adminForm).name)} type="text" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"${_scopeId}></div><div class="grid grid-cols-1 gap-4 md:grid-cols-2"${_scopeId}><div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>Email *</label><input${ssrRenderAttr("value", unref(adminForm).email)} type="email" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"${_scopeId}></div><div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>Phone Number *</label><input${ssrRenderAttr("value", unref(adminForm).phone_no)} type="tel" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"${_scopeId}></div></div><div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>Role *</label><select required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"${_scopeId}><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(unref(adminForm).role) ? ssrLooseContain(unref(adminForm).role, "admin") : ssrLooseEqual(unref(adminForm).role, "admin")) ? " selected" : ""}${_scopeId}>Admin</option><option value="super_admin"${ssrIncludeBooleanAttr(Array.isArray(unref(adminForm).role) ? ssrLooseContain(unref(adminForm).role, "super_admin") : ssrLooseEqual(unref(adminForm).role, "super_admin")) ? " selected" : ""}${_scopeId}> Super Admin </option></select></div>`);
                if (!selectedItem.value) {
                  _push2(`<div${_scopeId}><label class="mb-2 block text-sm font-medium text-gray-700"${_scopeId}>Password *</label><input${ssrRenderAttr("value", unref(adminForm).password)} type="password"${ssrIncludeBooleanAttr(!selectedItem.value) ? " required" : ""} class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="flex gap-3 pt-4"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(adminForm).processing) ? " disabled" : ""} class="flex-1 rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"${_scopeId}>${ssrInterpolate(unref(adminForm).processing ? "Saving..." : selectedItem.value ? "Update" : "Create")}</button><button type="button" class="flex-1 rounded-lg bg-gray-200 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-300"${_scopeId}> Cancel </button></div></form>`);
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
              createVNode("div", { class: "flex h-full w-full gap-1 overflow-hidden bg-gray-100" }, [
                createVNode("div", { class: "w-full overflow-y-auto p-6" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("h1", { class: "text-3xl font-bold text-gray-900" }, " Admin Panel "),
                    createVNode("p", { class: "text-gray-600" }, " Manage clinics, patients, results, and system administrators ")
                  ]),
                  createVNode("div", { class: "mb-6 flex gap-2 overflow-x-auto" }, [
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "overview",
                      class: [
                        activeTab.value === "overview" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
                        "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"
                      ]
                    }, " 📊 Overview ", 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "clinics",
                      class: [
                        activeTab.value === "clinics" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
                        "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"
                      ]
                    }, " 🏥 Clinics ", 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "patients",
                      class: [
                        activeTab.value === "patients" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
                        "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"
                      ]
                    }, " 👥 Patients ", 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "results",
                      class: [
                        activeTab.value === "results" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
                        "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"
                      ]
                    }, " 📋 Results ", 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "emails",
                      class: [
                        activeTab.value === "emails" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
                        "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"
                      ]
                    }, " 📧 Email Logs ", 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "admins",
                      class: [
                        activeTab.value === "admins" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
                        "whitespace-nowrap rounded-lg px-6 py-3 font-medium transition-colors"
                      ]
                    }, " 👤 Admins ", 10, ["onClick"])
                  ]),
                  activeTab.value === "overview" ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode("div", { class: "mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" }, [
                      createVNode("div", { class: "rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm font-medium text-gray-600" }, " Total Clinics "),
                            createVNode("p", { class: "mt-2 text-3xl font-bold text-blue-600" }, toDisplayString(stats.value.totalClinics), 1),
                            createVNode("p", { class: "mt-1 text-xs text-green-600" }, toDisplayString(stats.value.activeClinics) + " active ", 1)
                          ]),
                          createVNode("div", { class: "rounded-full bg-blue-100 p-3" }, [
                            createVNode("span", { class: "text-3xl" }, "🏥")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm font-medium text-gray-600" }, " Total Patients "),
                            createVNode("p", { class: "mt-2 text-3xl font-bold text-green-600" }, toDisplayString(stats.value.totalPatients), 1)
                          ]),
                          createVNode("div", { class: "rounded-full bg-green-100 p-3" }, [
                            createVNode("span", { class: "text-3xl" }, "👥")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm font-medium text-gray-600" }, " Test Results "),
                            createVNode("p", { class: "mt-2 text-3xl font-bold text-purple-600" }, toDisplayString(stats.value.totalResults), 1),
                            createVNode("p", { class: "mt-1 text-xs text-orange-600" }, toDisplayString(stats.value.pendingResults) + " pending ", 1)
                          ]),
                          createVNode("div", { class: "rounded-full bg-purple-100 p-3" }, [
                            createVNode("span", { class: "text-3xl" }, "📋")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm font-medium text-gray-600" }, " Email Delivery "),
                            createVNode("p", { class: "mt-2 text-3xl font-bold text-indigo-600" }, toDisplayString(stats.value.emailsSent), 1),
                            createVNode("p", { class: "mt-1 text-xs text-red-600" }, toDisplayString(stats.value.emailsFailed) + " failed ", 1)
                          ]),
                          createVNode("div", { class: "rounded-full bg-indigo-100 p-3" }, [
                            createVNode("span", { class: "text-3xl" }, "📧")
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "rounded-xl bg-white p-6 shadow-sm" }, [
                      createVNode("h3", { class: "mb-4 text-xl font-bold text-gray-900" }, " Quick Actions "),
                      createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-3" }, [
                        createVNode("button", {
                          onClick: ($event) => openModal("clinic"),
                          class: "rounded-lg bg-blue-50 p-4 text-left transition-colors hover:bg-blue-100"
                        }, [
                          createVNode("span", { class: "text-2xl" }, "🏥"),
                          createVNode("p", { class: "mt-2 font-semibold text-gray-900" }, " Add New Clinic "),
                          createVNode("p", { class: "text-sm text-gray-600" }, " Register a new healthcare facility ")
                        ], 8, ["onClick"]),
                        createVNode("button", {
                          onClick: ($event) => openModal("patient"),
                          class: "rounded-lg bg-green-50 p-4 text-left transition-colors hover:bg-green-100"
                        }, [
                          createVNode("span", { class: "text-2xl" }, "👤"),
                          createVNode("p", { class: "mt-2 font-semibold text-gray-900" }, " Add New Patient "),
                          createVNode("p", { class: "text-sm text-gray-600" }, " Register a new patient record ")
                        ], 8, ["onClick"]),
                        createVNode("button", {
                          onClick: ($event) => openModal("admin"),
                          class: "rounded-lg bg-purple-50 p-4 text-left transition-colors hover:bg-purple-100"
                        }, [
                          createVNode("span", { class: "text-2xl" }, "⚙️"),
                          createVNode("p", { class: "mt-2 font-semibold text-gray-900" }, " Add New Admin "),
                          createVNode("p", { class: "text-sm text-gray-600" }, " Create a new administrator account ")
                        ], 8, ["onClick"])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  activeTab.value === "clinics" ? (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("div", { class: "rounded-xl bg-white p-6 shadow-sm" }, [
                      createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                        createVNode("h2", { class: "text-xl font-bold text-gray-900" }, " Manage Clinics "),
                        createVNode("button", {
                          onClick: ($event) => openModal("clinic"),
                          class: "rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                        }, " + Add Clinic ", 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between" }, [
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode("button", {
                            onClick: ($event) => filterStatus.value = "all",
                            class: [
                              filterStatus.value === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700",
                              "rounded-lg px-4 py-2 font-medium transition-colors"
                            ]
                          }, " All ", 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => filterStatus.value = "active",
                            class: [
                              filterStatus.value === "active" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700",
                              "rounded-lg px-4 py-2 font-medium transition-colors"
                            ]
                          }, " Active ", 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => filterStatus.value = "suspended",
                            class: [
                              filterStatus.value === "suspended" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700",
                              "rounded-lg px-4 py-2 font-medium transition-colors"
                            ]
                          }, " Suspended ", 10, ["onClick"])
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
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Status "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Actions ")
                            ])
                          ]),
                          createVNode("tbody", { class: "divide-y divide-gray-200 bg-white" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(filteredClinics.value, (clinic) => {
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
                                    class: [
                                      getStatusColor(
                                        clinic.status
                                      ),
                                      "rounded-full px-3 py-1 text-xs font-semibold"
                                    ]
                                  }, toDisplayString(clinic.status), 3)
                                ]),
                                createVNode("td", { class: "px-4 py-4 text-sm" }, [
                                  createVNode("div", { class: "flex gap-2" }, [
                                    createVNode("button", {
                                      onClick: ($event) => openModal(
                                        "clinic",
                                        clinic
                                      ),
                                      class: "rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                                    }, " Edit ", 8, ["onClick"]),
                                    clinic.status === "active" ? (openBlock(), createBlock("button", {
                                      key: 0,
                                      onClick: ($event) => updateStatus(
                                        "clinic",
                                        clinic.id,
                                        "suspended"
                                      ),
                                      class: "rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
                                    }, " Suspend ", 8, ["onClick"])) : (openBlock(), createBlock("button", {
                                      key: 1,
                                      onClick: ($event) => updateStatus(
                                        "clinic",
                                        clinic.id,
                                        "active"
                                      ),
                                      class: "rounded bg-green-100 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-200"
                                    }, " Activate ", 8, ["onClick"]))
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  activeTab.value === "patients" ? (openBlock(), createBlock("div", { key: 2 }, [
                    createVNode("div", { class: "rounded-xl bg-white p-6 shadow-sm" }, [
                      createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                        createVNode("h2", { class: "text-xl font-bold text-gray-900" }, " Manage Patients "),
                        createVNode("button", {
                          onClick: ($event) => openModal("patient"),
                          class: "rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                        }, " + Add Patient ", 8, ["onClick"])
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
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Patient ID "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Full Name "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Email "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Phone "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Gender "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Date of Birth "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Actions ")
                            ])
                          ]),
                          createVNode("tbody", { class: "divide-y divide-gray-200 bg-white" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(filteredPatients.value, (patient) => {
                              return openBlock(), createBlock("tr", {
                                key: patient.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-4 py-4 text-sm font-medium text-gray-900" }, toDisplayString(patient.patient_id), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(patient.full_name), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(patient.email), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(patient.phone_no), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, [
                                  createVNode("span", { class: "capitalize" }, toDisplayString(patient.gender), 1)
                                ]),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(patient.date_of_birth), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm" }, [
                                  createVNode("div", { class: "flex gap-2" }, [
                                    createVNode("button", {
                                      onClick: ($event) => openModal(
                                        "patient",
                                        patient
                                      ),
                                      class: "rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                                    }, " Edit ", 8, ["onClick"]),
                                    createVNode("button", {
                                      onClick: ($event) => deleteItem(
                                        "patient",
                                        patient.id
                                      ),
                                      class: "rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
                                    }, " Delete ", 8, ["onClick"])
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  activeTab.value === "results" ? (openBlock(), createBlock("div", { key: 3 }, [
                    createVNode("div", { class: "rounded-xl bg-white p-6 shadow-sm" }, [
                      createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                        createVNode("h2", { class: "text-xl font-bold text-gray-900" }, " Patient Results ")
                      ]),
                      createVNode("div", { class: "mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between" }, [
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode("button", {
                            onClick: ($event) => filterStatus.value = "all",
                            class: [
                              filterStatus.value === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700",
                              "rounded-lg px-4 py-2 font-medium transition-colors"
                            ]
                          }, " All ", 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => filterStatus.value = "pending",
                            class: [
                              filterStatus.value === "pending" ? "bg-yellow-600 text-white" : "bg-gray-200 text-gray-700",
                              "rounded-lg px-4 py-2 font-medium transition-colors"
                            ]
                          }, " Pending ", 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => filterStatus.value = "processed",
                            class: [
                              filterStatus.value === "processed" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700",
                              "rounded-lg px-4 py-2 font-medium transition-colors"
                            ]
                          }, " Processed ", 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => filterStatus.value = "sent",
                            class: [
                              filterStatus.value === "sent" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700",
                              "rounded-lg px-4 py-2 font-medium transition-colors"
                            ]
                          }, " Sent ", 10, ["onClick"])
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          type: "text",
                          placeholder: "Search results...",
                          class: "rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, searchQuery.value]
                        ])
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "w-full" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Test Name "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Result Type "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Test Date "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " File Type "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Status "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Uploaded "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Actions ")
                            ])
                          ]),
                          createVNode("tbody", { class: "divide-y divide-gray-200 bg-white" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(filteredResults.value, (result) => {
                              return openBlock(), createBlock("tr", {
                                key: result.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-4 py-4 text-sm font-medium text-gray-900" }, toDisplayString(result.test_name), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(result.result_type), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(formatDate(result.test_date)), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, [
                                  createVNode("span", { class: "uppercase" }, toDisplayString(result.file_type || "N/A"), 1)
                                ]),
                                createVNode("td", { class: "px-4 py-4 text-sm" }, [
                                  createVNode("span", {
                                    class: [
                                      getStatusColor(
                                        result.status
                                      ),
                                      "rounded-full px-3 py-1 text-xs font-semibold"
                                    ]
                                  }, toDisplayString(result.status), 3)
                                ]),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(formatDate(result.uploaded_at)), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm" }, [
                                  result.file_path ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    class: "rounded bg-green-100 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-200"
                                  }, " View ")) : createCommentVNode("", true)
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  activeTab.value === "emails" ? (openBlock(), createBlock("div", { key: 4 }, [
                    createVNode("div", { class: "rounded-xl bg-white p-6 shadow-sm" }, [
                      createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                        createVNode("h2", { class: "text-xl font-bold text-gray-900" }, " Email Delivery Logs ")
                      ]),
                      createVNode("div", { class: "mb-6 grid grid-cols-1 gap-4 md:grid-cols-4" }, [
                        createVNode("div", { class: "rounded-lg bg-green-50 p-4" }, [
                          createVNode("p", { class: "text-sm font-medium text-gray-600" }, " Sent Successfully "),
                          createVNode("p", { class: "mt-1 text-2xl font-bold text-green-600" }, toDisplayString(emails.value.filter(
                            (e) => e.status === "sent"
                          ).length), 1)
                        ]),
                        createVNode("div", { class: "rounded-lg bg-yellow-50 p-4" }, [
                          createVNode("p", { class: "text-sm font-medium text-gray-600" }, " Pending "),
                          createVNode("p", { class: "mt-1 text-2xl font-bold text-yellow-600" }, toDisplayString(emails.value.filter(
                            (e) => e.status === "pending"
                          ).length), 1)
                        ]),
                        createVNode("div", { class: "rounded-lg bg-red-50 p-4" }, [
                          createVNode("p", { class: "text-sm font-medium text-gray-600" }, " Failed "),
                          createVNode("p", { class: "mt-1 text-2xl font-bold text-red-600" }, toDisplayString(emails.value.filter(
                            (e) => e.status === "failed"
                          ).length), 1)
                        ]),
                        createVNode("div", { class: "rounded-lg bg-orange-50 p-4" }, [
                          createVNode("p", { class: "text-sm font-medium text-gray-600" }, " Bounced "),
                          createVNode("p", { class: "mt-1 text-2xl font-bold text-orange-600" }, toDisplayString(emails.value.filter(
                            (e) => e.status === "bounced"
                          ).length), 1)
                        ])
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "w-full" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Recipient "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Subject "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Sent By "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Status "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Attempts "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Sent At "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Actions ")
                            ])
                          ]),
                          createVNode("tbody", { class: "divide-y divide-gray-200 bg-white" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(emails.value, (email) => {
                              return openBlock(), createBlock("tr", {
                                key: email.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-4 py-4 text-sm font-medium text-gray-900" }, toDisplayString(email.patient_email), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(email.subject), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(email.sent_by), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm" }, [
                                  createVNode("span", {
                                    class: [
                                      getStatusColor(email.status),
                                      "rounded-full px-3 py-1 text-xs font-semibold"
                                    ]
                                  }, toDisplayString(email.status), 3)
                                ]),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(email.delivery_attempts), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(formatDate(email.sent_at)), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm" }, [
                                  email.status === "failed" ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    onClick: ($event) => retryEmail(email.id),
                                    class: "rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                                  }, " Retry ", 8, ["onClick"])) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-xs text-gray-400"
                                  }, "-"))
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  activeTab.value === "admins" ? (openBlock(), createBlock("div", { key: 5 }, [
                    createVNode("div", { class: "rounded-xl bg-white p-6 shadow-sm" }, [
                      createVNode("div", { class: "mb-6 flex items-center justify-between" }, [
                        createVNode("h2", { class: "text-xl font-bold text-gray-900" }, " System Administrators "),
                        createVNode("button", {
                          onClick: ($event) => openModal("admin"),
                          class: "rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
                        }, " + Add Admin ", 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "w-full" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Name "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Email "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Phone "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Role "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Status "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Created "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700" }, " Actions ")
                            ])
                          ]),
                          createVNode("tbody", { class: "divide-y divide-gray-200 bg-white" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(admins.value, (admin) => {
                              return openBlock(), createBlock("tr", {
                                key: admin.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-4 py-4 text-sm font-medium text-gray-900" }, toDisplayString(admin.name), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(admin.email), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(admin.phone_no), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm" }, [
                                  createVNode("span", {
                                    class: [
                                      admin.role === "super_admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800",
                                      "rounded-full px-3 py-1 text-xs font-semibold"
                                    ]
                                  }, toDisplayString(admin.role === "super_admin" ? "Super Admin" : "Admin"), 3)
                                ]),
                                createVNode("td", { class: "px-4 py-4 text-sm" }, [
                                  createVNode("span", {
                                    class: [
                                      getStatusColor(admin.status),
                                      "rounded-full px-3 py-1 text-xs font-semibold"
                                    ]
                                  }, toDisplayString(admin.status), 3)
                                ]),
                                createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(formatDate(admin.created_at)), 1),
                                createVNode("td", { class: "px-4 py-4 text-sm" }, [
                                  createVNode("div", { class: "flex gap-2" }, [
                                    createVNode("button", {
                                      onClick: ($event) => openModal(
                                        "admin",
                                        admin
                                      ),
                                      class: "rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                                    }, " Edit ", 8, ["onClick"]),
                                    admin.status === "active" && admin.role !== "super_admin" ? (openBlock(), createBlock("button", {
                                      key: 0,
                                      onClick: ($event) => updateStatus(
                                        "admin",
                                        admin.id,
                                        "suspended"
                                      ),
                                      class: "rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
                                    }, " Suspend ", 8, ["onClick"])) : admin.status !== "active" ? (openBlock(), createBlock("button", {
                                      key: 1,
                                      onClick: ($event) => updateStatus(
                                        "admin",
                                        admin.id,
                                        "active"
                                      ),
                                      class: "rounded bg-green-100 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-200"
                                    }, " Activate ", 8, ["onClick"])) : createCommentVNode("", true)
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  showModal.value ? (openBlock(), createBlock("div", {
                    key: 6,
                    class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                  }, [
                    createVNode("div", { class: "max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6" }, [
                      createVNode("h3", { class: "mb-6 text-2xl font-bold text-gray-900" }, toDisplayString(selectedItem.value ? "Edit" : "Add New") + " " + toDisplayString(modalType.value === "clinic" ? "Clinic" : modalType.value === "patient" ? "Patient" : "Administrator"), 1),
                      modalType.value === "clinic" ? (openBlock(), createBlock("form", {
                        key: 0,
                        onSubmit: withModifiers(submitForm, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "Clinic Name *"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(clinicForm).name = $event,
                              type: "text",
                              required: "",
                              class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(clinicForm).name]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "Email *"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(clinicForm).email = $event,
                              type: "email",
                              required: "",
                              class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(clinicForm).email]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "Phone Number *"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(clinicForm).phone_no = $event,
                              type: "tel",
                              required: "",
                              class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(clinicForm).phone_no]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "Staff Number"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(clinicForm).staff_no = $event,
                              type: "text",
                              class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(clinicForm).staff_no]
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "Address *"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(clinicForm).address = $event,
                            required: "",
                            rows: "3",
                            class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(clinicForm).address]
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "State *"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(clinicForm).state = $event,
                              type: "text",
                              required: "",
                              class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(clinicForm).state]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "Country *"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(clinicForm).country = $event,
                              type: "text",
                              required: "",
                              class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(clinicForm).country]
                            ])
                          ])
                        ]),
                        !selectedItem.value ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "Password *"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(clinicForm).password = $event,
                            type: "password",
                            required: !selectedItem.value,
                            class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                          }, null, 8, ["onUpdate:modelValue", "required"]), [
                            [vModelText, unref(clinicForm).password]
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex gap-3 pt-4" }, [
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(clinicForm).processing,
                            class: "flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
                          }, toDisplayString(unref(clinicForm).processing ? "Saving..." : selectedItem.value ? "Update" : "Create"), 9, ["disabled"]),
                          createVNode("button", {
                            type: "button",
                            onClick: closeModal,
                            class: "flex-1 rounded-lg bg-gray-200 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-300"
                          }, " Cancel ")
                        ])
                      ], 32)) : createCommentVNode("", true),
                      modalType.value === "patient" ? (openBlock(), createBlock("form", {
                        key: 1,
                        onSubmit: withModifiers(submitForm, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "Patient ID *"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(patientForm).patient_id = $event,
                              type: "text",
                              required: "",
                              class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(patientForm).patient_id]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "Full Name *"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(patientForm).full_name = $event,
                              type: "text",
                              required: "",
                              class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(patientForm).full_name]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "Email *"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(patientForm).email = $event,
                              type: "email",
                              required: "",
                              class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(patientForm).email]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "Phone Number *"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(patientForm).phone_no = $event,
                              type: "tel",
                              required: "",
                              class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(patientForm).phone_no]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "Date of Birth *"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(patientForm).date_of_birth = $event,
                              type: "date",
                              required: "",
                              class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(patientForm).date_of_birth]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "Gender *"),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(patientForm).gender = $event,
                              required: "",
                              class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                            }, [
                              createVNode("option", { value: "male" }, "Male"),
                              createVNode("option", { value: "female" }, "Female"),
                              createVNode("option", { value: "other" }, "Other")
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(patientForm).gender]
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "Address *"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(patientForm).address = $event,
                            required: "",
                            rows: "3",
                            class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(patientForm).address]
                          ])
                        ]),
                        createVNode("div", { class: "flex gap-3 pt-4" }, [
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(patientForm).processing,
                            class: "flex-1 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
                          }, toDisplayString(unref(patientForm).processing ? "Saving..." : selectedItem.value ? "Update" : "Create"), 9, ["disabled"]),
                          createVNode("button", {
                            type: "button",
                            onClick: closeModal,
                            class: "flex-1 rounded-lg bg-gray-200 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-300"
                          }, " Cancel ")
                        ])
                      ], 32)) : createCommentVNode("", true),
                      modalType.value === "admin" ? (openBlock(), createBlock("form", {
                        key: 2,
                        onSubmit: withModifiers(submitForm, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "Name *"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(adminForm).name = $event,
                            type: "text",
                            required: "",
                            class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(adminForm).name]
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "Email *"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(adminForm).email = $event,
                              type: "email",
                              required: "",
                              class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(adminForm).email]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "Phone Number *"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(adminForm).phone_no = $event,
                              type: "tel",
                              required: "",
                              class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(adminForm).phone_no]
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "Role *"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(adminForm).role = $event,
                            required: "",
                            class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                          }, [
                            createVNode("option", { value: "admin" }, "Admin"),
                            createVNode("option", { value: "super_admin" }, " Super Admin ")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(adminForm).role]
                          ])
                        ]),
                        !selectedItem.value ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("label", { class: "mb-2 block text-sm font-medium text-gray-700" }, "Password *"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(adminForm).password = $event,
                            type: "password",
                            required: !selectedItem.value,
                            class: "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                          }, null, 8, ["onUpdate:modelValue", "required"]), [
                            [vModelText, unref(adminForm).password]
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex gap-3 pt-4" }, [
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(adminForm).processing,
                            class: "flex-1 rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
                          }, toDisplayString(unref(adminForm).processing ? "Saving..." : selectedItem.value ? "Update" : "Create"), 9, ["disabled"]),
                          createVNode("button", {
                            type: "button",
                            onClick: closeModal,
                            class: "flex-1 rounded-lg bg-gray-200 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-300"
                          }, " Cancel ")
                        ])
                      ], 32)) : createCommentVNode("", true)
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
