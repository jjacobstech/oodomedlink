import { ref, unref, withCtx, createVNode, createTextVNode, withModifiers, withDirectives, vModelText, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./PasswordInput-BkOFItoK.js";
import { u as useToast, _ as _sfc_main$1 } from "./index-CyWCJ_Mb.js";
import { A as AuthLayout } from "./AuthLayout-BLjU_tSH.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { ArrowLeft } from "lucide-vue-next";
import { z, flattenError } from "zod";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "reka-ui";
import "class-variance-authority";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
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
      email: z.email("Invalid email address").max(255),
      password: z.string().min(6, "Password must be at least 6 characters")
    });
    const handleLogin = async () => {
      isLoading.value = true;
      const form = loginSchema.safeParse(loginForm);
      if (form.error) {
        for (const error in flattenError(form.error)?.fieldErrors) {
          const inputError = flattenError(form.error)?.fieldErrors[error][0];
          toast({
            title: "Login failed",
            description: inputError,
            variant: "destructive",
            open: true,
            class: "text-primaryDark bg-white shadow-lg"
          });
        }
        isLoading.value = false;
        return;
      }
      loginForm.post(route("login"), {
        onFinish: () => {
          isLoading.value = false;
        },
        onError: (error) => {
          for (const err in error) {
            const inputError = error[err];
            toast({
              title: "Login failed",
              description: inputError,
              variant: "destructive",
              open: true,
              class: "text-primaryDark bg-white shadow-lg "
            });
          }
        },
        onSuccess: (page) => {
          toast({
            title: "Login Successful",
            variant: "destructive",
            open: true,
            class: "text-primaryDark bg-white shadow-lg "
          });
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Login" }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex w-full justify-center overflow-hidden"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(`<div class="container relative z-10 mx-auto flex min-h-[calc(100vh-80px)] items-center justify-center py-12 lg:max-w-2xl"${_scopeId}><div class="w-full space-y-4 px-5 lg:px-5"${_scopeId}><div class="flex justify-start"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/",
              class: "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xl text-primaryDark transition-all duration-200 hover:-translate-y-0.5 hover:bg-primaryDark hover:text-white hover:shadow-lg hover:shadow-primaryDark/30"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Back to Home</span>`);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                    createVNode("span", null, "Back to Home")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="rounded-lg bg-white shadow-xl"${_scopeId}><div class="space-y-1 rounded-t-lg border-b border-primaryDark bg-primaryDark p-6"${_scopeId}><h2 class="text-center text-2xl font-bold text-white"${_scopeId}> Login </h2><p class="text-center text-lg text-white"${_scopeId}> Enter your email address and password </p></div><div class="p-6"${_scopeId}><form class="space-y-5"${_scopeId}><div class="space-y-2"${_scopeId}><label for="login-email" class="block font-medium text-gray-600 lg:text-xl"${_scopeId}> Email </label><input id="login-email"${ssrRenderAttr("value", unref(loginForm).email)} type="email" placeholder="Enter your email" class="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primaryDark lg:text-xl" required${_scopeId}></div><div class="space-y-2"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><label for="login-password" class="block font-medium text-gray-600 lg:text-xl"${_scopeId}> Password </label>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("password.request"),
              class: "text-black transition-colors hover:text-primary/80 lg:text-xl"
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
            _push2(ssrRenderComponent(_sfc_main$2, {
              placeholder: "Password",
              modelValue: unref(loginForm).password,
              "onUpdate:modelValue": ($event) => unref(loginForm).password = $event
            }, null, _parent2, _scopeId));
            _push2(`</div><button type="submit" class="group w-full rounded-lg bg-primaryDark px-4 py-2.5 font-medium text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-primaryDark/30 disabled:cursor-not-allowed disabled:opacity-50"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""}${_scopeId}><p class="group-hover:bg-primaryDark group-hover:bg-clip-text group-hover:text-transparent lg:text-xl"${_scopeId}>${ssrInterpolate(isLoading.value ? "Logging in..." : "Log in")}</p></button></form><div class="mt-6 text-center"${_scopeId}><p class="text-gray-600 lg:text-xl"${_scopeId}> New here? `);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("signup"),
              class: "font-medium text-primaryDark transition-colors hover:text-primaryDark/80"
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
              createVNode("div", { class: "flex w-full justify-center overflow-hidden" }, [
                createVNode(_sfc_main$1),
                createVNode("div", { class: "container relative z-10 mx-auto flex min-h-[calc(100vh-80px)] items-center justify-center py-12 lg:max-w-2xl" }, [
                  createVNode("div", { class: "w-full space-y-4 px-5 lg:px-5" }, [
                    createVNode("div", { class: "flex justify-start" }, [
                      createVNode(unref(Link), {
                        href: "/",
                        class: "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xl text-primaryDark transition-all duration-200 hover:-translate-y-0.5 hover:bg-primaryDark hover:text-white hover:shadow-lg hover:shadow-primaryDark/30"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowLeft), { class: "h-4 w-4" }),
                          createVNode("span", null, "Back to Home")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "rounded-lg bg-white shadow-xl" }, [
                      createVNode("div", { class: "space-y-1 rounded-t-lg border-b border-primaryDark bg-primaryDark p-6" }, [
                        createVNode("h2", { class: "text-center text-2xl font-bold text-white" }, " Login "),
                        createVNode("p", { class: "text-center text-lg text-white" }, " Enter your email address and password ")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("form", {
                          onSubmit: withModifiers(handleLogin, ["prevent"]),
                          class: "space-y-5"
                        }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", {
                              for: "login-email",
                              class: "block font-medium text-gray-600 lg:text-xl"
                            }, " Email "),
                            withDirectives(createVNode("input", {
                              id: "login-email",
                              "onUpdate:modelValue": ($event) => unref(loginForm).email = $event,
                              type: "email",
                              placeholder: "Enter your email",
                              class: "w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primaryDark lg:text-xl",
                              required: ""
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(loginForm).email]
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode("label", {
                                for: "login-password",
                                class: "block font-medium text-gray-600 lg:text-xl"
                              }, " Password "),
                              createVNode(unref(Link), {
                                href: _ctx.route("password.request"),
                                class: "text-black transition-colors hover:text-primary/80 lg:text-xl"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Forgot password? ")
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ]),
                            createVNode(_sfc_main$2, {
                              placeholder: "Password",
                              modelValue: unref(loginForm).password,
                              "onUpdate:modelValue": ($event) => unref(loginForm).password = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("button", {
                            type: "submit",
                            class: "group w-full rounded-lg bg-primaryDark px-4 py-2.5 font-medium text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-primaryDark/30 disabled:cursor-not-allowed disabled:opacity-50",
                            disabled: isLoading.value
                          }, [
                            createVNode("p", { class: "group-hover:bg-primaryDark group-hover:bg-clip-text group-hover:text-transparent lg:text-xl" }, toDisplayString(isLoading.value ? "Logging in..." : "Log in"), 1)
                          ], 8, ["disabled"])
                        ], 32),
                        createVNode("div", { class: "mt-6 text-center" }, [
                          createVNode("p", { class: "text-gray-600 lg:text-xl" }, [
                            createTextVNode(" New here? "),
                            createVNode(unref(Link), {
                              href: _ctx.route("signup"),
                              class: "font-medium text-primaryDark transition-colors hover:text-primaryDark/80"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/User/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
