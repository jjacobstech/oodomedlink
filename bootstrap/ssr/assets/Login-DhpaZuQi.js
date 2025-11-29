import { ref, unref, withCtx, createVNode, createTextVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { u as useToast, _ as _sfc_main$1 } from "./index-CyWCJ_Mb.js";
import { _ as _sfc_main$2 } from "./AdminAuthLayout-CBWg2bKK.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { z, flattenError } from "zod";
import { _ as _sfc_main$3 } from "./PasswordInput-BkOFItoK.js";
import { ArrowLeft } from "@solar-icons/vue";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "reka-ui";
import "lucide-vue-next";
import "class-variance-authority";
const _sfc_main = {
  __name: "Login",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoading = ref(false);
    const { toast } = useToast();
    const loginForm = useForm({
      email: "",
      password: ""
    });
    const loginSchema = z.object({
      email: z.string().email("Invalid email address").max(255),
      password: z.string().min(6, "Password must be at least 6 characters")
    });
    const handleLogin = async () => {
      isLoading.value = true;
      const form = loginSchema.safeParse(loginForm.data());
      if (!form.success) {
        const errors = flattenError(form.error)?.fieldErrors;
        for (const field in errors) {
          const errorMessage = errors[field][0];
          toast({
            title: "Validation Error",
            description: errorMessage,
            variant: "destructive",
            duration: 5e3,
            class: "text-primaryDark bg-white shadow-lg bottom-96"
          });
        }
        isLoading.value = false;
        return;
      }
      loginForm.post(route("admin.login"), {
        onFinish: () => {
          isLoading.value = false;
        },
        onError: (errors) => {
          Object.values(errors)[0];
        },
        onSuccess: () => {
          toast({
            title: "Login Successful",
            description: "Welcome back!",
            variant: "default",
            duration: 3e3,
            class: "text-primaryDark bg-white shadow-lg bottom-96"
          });
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Login" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full overflow-hidden"${_scopeId}><div class="container relative z-10 mx-auto flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8 sm:py-12"${_scopeId}><div class="w-full max-w-md lg:max-w-lg space-y-4 sm:space-y-5"${_scopeId}><div class="flex justify-start"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/",
              class: "text-primaryDark hover:bg-primaryDark glass hover:shadow-primaryDark/30 inline-flex items-center gap-2 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base lg:text-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-white hover:shadow-lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4 sm:h-5 sm:w-5" }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Back to Home</span>`);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4 sm:h-5 sm:w-5" }),
                    createVNode("span", null, "Back to Home")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="rounded-lg bg-white shadow-xl"${_scopeId}><div class="border-primaryDark bg-primaryDark space-y-1 rounded-t-lg border-b p-4 sm:p-6"${_scopeId}><h2 class="text-center text-xl sm:text-2xl font-bold text-white"${_scopeId}> Admin </h2><p class="text-center text-sm sm:text-base lg:text-lg text-white"${_scopeId}> Enter your email address and password </p></div><div class="p-4 sm:p-6"${_scopeId}><form class="space-y-4 sm:space-y-5"${_scopeId}><div class="space-y-2"${_scopeId}><label for="login-email" class="block text-sm sm:text-base lg:text-lg font-extrabold text-gray-600"${_scopeId}> Email </label><input id="login-email"${ssrRenderAttr("value", unref(loginForm).email)} type="email" placeholder="Enter your email" class="focus:ring-primaryDark w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base transition-all focus:border-transparent focus:outline-none focus:ring-2" required${_scopeId}>`);
            if (unref(loginForm).errors.email) {
              _push2(`<p class="text-red-500 text-xs sm:text-sm mt-1"${_scopeId}>${ssrInterpolate(unref(loginForm).errors.email)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-2"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2"${_scopeId}><label for="login-password" class="block text-sm sm:text-base lg:text-lg font-extrabold text-gray-600"${_scopeId}> Password </label>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.password.request"),
              class: "text-xs sm:text-sm lg:text-base font-extrabold text-black transition-colors hover:text-primary/80"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Forgot password? `);
                } else {
                  return [
                    createTextVNode(" Forgot password? ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              modelValue: unref(loginForm).password,
              "onUpdate:modelValue": ($event) => unref(loginForm).password = $event
            }, null, _parent2, _scopeId));
            if (unref(loginForm).errors.password) {
              _push2(`<p class="text-red-500 text-xs sm:text-sm mt-1"${_scopeId}>${ssrInterpolate(unref(loginForm).errors.password)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button type="submit" class="bg-primaryDark hover:shadow-primaryDark/30 group w-full rounded-lg px-4 py-2.5 sm:py-3 font-extrabold text-sm sm:text-base lg:text-lg text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""}${_scopeId}><p class="group-hover:bg-primaryDark group-hover:bg-clip-text group-hover:text-transparent"${_scopeId}>${ssrInterpolate(isLoading.value ? "Logging in..." : "Log in")}</p></button></form><div class="mt-4 sm:mt-6 text-center"${_scopeId}><p class="text-sm sm:text-base lg:text-lg font-bold text-gray-600"${_scopeId}> New here? `);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.signup"),
              class: "text-primaryDark hover:text-primaryDark/80 font-medium transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Sign up `);
                } else {
                  return [
                    createTextVNode(" Sign up ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full overflow-hidden" }, [
                createVNode("div", { class: "container relative z-10 mx-auto flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8 sm:py-12" }, [
                  createVNode("div", { class: "w-full max-w-md lg:max-w-lg space-y-4 sm:space-y-5" }, [
                    createVNode("div", { class: "flex justify-start" }, [
                      createVNode(unref(Link), {
                        href: "/",
                        class: "text-primaryDark hover:bg-primaryDark glass hover:shadow-primaryDark/30 inline-flex items-center gap-2 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base lg:text-lg transition-all duration-200 hover:-translate-y-0.5 hover:text-white hover:shadow-lg"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowLeft), { class: "h-4 w-4 sm:h-5 sm:w-5" }),
                          createVNode("span", null, "Back to Home")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "rounded-lg bg-white shadow-xl" }, [
                      createVNode("div", { class: "border-primaryDark bg-primaryDark space-y-1 rounded-t-lg border-b p-4 sm:p-6" }, [
                        createVNode("h2", { class: "text-center text-xl sm:text-2xl font-bold text-white" }, " Admin "),
                        createVNode("p", { class: "text-center text-sm sm:text-base lg:text-lg text-white" }, " Enter your email address and password ")
                      ]),
                      createVNode("div", { class: "p-4 sm:p-6" }, [
                        createVNode("form", {
                          onSubmit: withModifiers(handleLogin, ["prevent"]),
                          class: "space-y-4 sm:space-y-5"
                        }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", {
                              for: "login-email",
                              class: "block text-sm sm:text-base lg:text-lg font-extrabold text-gray-600"
                            }, " Email "),
                            withDirectives(createVNode("input", {
                              id: "login-email",
                              "onUpdate:modelValue": ($event) => unref(loginForm).email = $event,
                              type: "email",
                              placeholder: "Enter your email",
                              class: "focus:ring-primaryDark w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base transition-all focus:border-transparent focus:outline-none focus:ring-2",
                              required: ""
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(loginForm).email]
                            ]),
                            unref(loginForm).errors.email ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-red-500 text-xs sm:text-sm mt-1"
                            }, toDisplayString(unref(loginForm).errors.email), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2" }, [
                              createVNode("label", {
                                for: "login-password",
                                class: "block text-sm sm:text-base lg:text-lg font-extrabold text-gray-600"
                              }, " Password "),
                              createVNode(unref(Link), {
                                href: _ctx.route("admin.password.request"),
                                class: "text-xs sm:text-sm lg:text-base font-extrabold text-black transition-colors hover:text-primary/80"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Forgot password? ")
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ]),
                            createVNode(_sfc_main$3, {
                              modelValue: unref(loginForm).password,
                              "onUpdate:modelValue": ($event) => unref(loginForm).password = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(loginForm).errors.password ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-red-500 text-xs sm:text-sm mt-1"
                            }, toDisplayString(unref(loginForm).errors.password), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("button", {
                            type: "submit",
                            class: "bg-primaryDark hover:shadow-primaryDark/30 group w-full rounded-lg px-4 py-2.5 sm:py-3 font-extrabold text-sm sm:text-base lg:text-lg text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0",
                            disabled: isLoading.value
                          }, [
                            createVNode("p", { class: "group-hover:bg-primaryDark group-hover:bg-clip-text group-hover:text-transparent" }, toDisplayString(isLoading.value ? "Logging in..." : "Log in"), 1)
                          ], 8, ["disabled"])
                        ], 32),
                        createVNode("div", { class: "mt-4 sm:mt-6 text-center" }, [
                          createVNode("p", { class: "text-sm sm:text-base lg:text-lg font-bold text-gray-600" }, [
                            createTextVNode(" New here? "),
                            createVNode(unref(Link), {
                              href: _ctx.route("admin.signup"),
                              class: "text-primaryDark hover:text-primaryDark/80 font-medium transition-colors"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Sign up ")
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ])
                        ])
                      ])
                    ])
                  ])
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
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Admin/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
