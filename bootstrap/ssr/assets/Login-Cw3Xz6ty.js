import { ref, unref, withCtx, createVNode, createTextVNode, withModifiers, withDirectives, vModelText, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { z, flattenError } from "zod";
import { u as useToast, _ as _sfc_main$1, a as _sfc_main$2 } from "./PasswordInput-BRdDyhnh.js";
import { ArrowLeft } from "lucide-vue-next";
import { A as AuthLayout } from "./AuthLayout-x0U8Uf7l.js";
import "@vueuse/core";
import "reka-ui";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
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
            class: "text-primaryDark bg-white shadow-lg bottom-96"
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
          console.log(error[0]);
          for (const err in error) {
            console.log(error[err]);
            const inputError = error[err];
            toast({
              title: "Login failed",
              description: inputError,
              variant: "destructive",
              open: true,
              class: "text-primaryDark bg-white shadow-lg bottom-96"
            });
          }
        },
        onSuccess: (page) => {
          console.log("Login Success - Page:", page);
          console.log("Current URL:", window.location.href);
          toast({
            title: "Login Successful",
            variant: "destructive",
            open: true,
            class: "text-primaryDark bg-white shadow-lg bottom-96"
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
            _push2(`<div class="w-full flex justify-center overflow-hidden"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(`<div class="relative z-10 container mx-auto lg:max-w-xl py-12 flex items-center justify-center min-h-[calc(100vh-80px)]"${_scopeId}><div class="w-full px-5 lg:px-20 space-y-4"${_scopeId}><div class="flex justify-start"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/",
              class: "inline-flex items-center gap-2 text-xl px-4 py-2 text-primaryDark rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:bg-primaryDark hover:text-white hover:shadow-primaryDark/30"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Back to Home</span>`);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-4 h-4" }),
                    createVNode("span", null, "Back to Home")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="bg-white rounded-lg shadow-xl"${_scopeId}><div class="p-6 space-y-1 border-b rounded-t-lg border-primaryDark bg-primaryDark"${_scopeId}><h2 class="text-2xl font-bold text-center text-white"${_scopeId}>Login</h2><p class="text-center text-lg text-white"${_scopeId}> Enter your email address and password </p></div><div class="p-6"${_scopeId}><form class="space-y-5"${_scopeId}><div class="space-y-2"${_scopeId}><label for="login-email" class="block text-xl font-medium text-gray-600"${_scopeId}> Email </label><input id="login-email"${ssrRenderAttr("value", unref(loginForm).email)} type="email" placeholder="Enter your email" class="w-full px-4 py-2.5 border border-gray-300 text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryDark focus:border-transparent transition-all" required${_scopeId}></div><div class="space-y-2"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><label for="login-password" class="block text-xl font-medium text-gray-600"${_scopeId}> Password </label>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/forgot-password",
              class: "text-xl text-black hover:text-primary/80 transition-colors"
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
            _push2(`</div><button type="submit" class="w-full px-4 py-2.5 bg-primaryDark text-white font-medium rounded-lg group hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:shadow-primaryDark/30"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""}${_scopeId}><p class="group-hover:bg-clip-text text-xl group-hover:text-transparent group-hover:bg-primaryDark"${_scopeId}>${ssrInterpolate(isLoading.value ? "Logging in..." : "Log in")}</p></button></form><div class="mt-6 text-center"${_scopeId}><p class="text-xl text-gray-600"${_scopeId}> New here? `);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/signup",
              class: "text-primaryDark font-medium hover:text-primaryDark/80 transition-colors"
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
              createVNode("div", { class: "w-full flex justify-center overflow-hidden" }, [
                createVNode(_sfc_main$1),
                createVNode("div", { class: "relative z-10 container mx-auto lg:max-w-xl py-12 flex items-center justify-center min-h-[calc(100vh-80px)]" }, [
                  createVNode("div", { class: "w-full px-5 lg:px-20 space-y-4" }, [
                    createVNode("div", { class: "flex justify-start" }, [
                      createVNode(unref(Link), {
                        href: "/",
                        class: "inline-flex items-center gap-2 text-xl px-4 py-2 text-primaryDark rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:bg-primaryDark hover:text-white hover:shadow-primaryDark/30"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowLeft), { class: "w-4 h-4" }),
                          createVNode("span", null, "Back to Home")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-xl" }, [
                      createVNode("div", { class: "p-6 space-y-1 border-b rounded-t-lg border-primaryDark bg-primaryDark" }, [
                        createVNode("h2", { class: "text-2xl font-bold text-center text-white" }, "Login"),
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
                              class: "block text-xl font-medium text-gray-600"
                            }, " Email "),
                            withDirectives(createVNode("input", {
                              id: "login-email",
                              "onUpdate:modelValue": ($event) => unref(loginForm).email = $event,
                              type: "email",
                              placeholder: "Enter your email",
                              class: "w-full px-4 py-2.5 border border-gray-300 text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryDark focus:border-transparent transition-all",
                              required: ""
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(loginForm).email]
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode("label", {
                                for: "login-password",
                                class: "block text-xl font-medium text-gray-600"
                              }, " Password "),
                              createVNode(unref(Link), {
                                href: "/forgot-password",
                                class: "text-xl text-black hover:text-primary/80 transition-colors"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Forgot password? ")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(_sfc_main$2, {
                              placeholder: "Password",
                              modelValue: unref(loginForm).password,
                              "onUpdate:modelValue": ($event) => unref(loginForm).password = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("button", {
                            type: "submit",
                            class: "w-full px-4 py-2.5 bg-primaryDark text-white font-medium rounded-lg group hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:shadow-primaryDark/30",
                            disabled: isLoading.value
                          }, [
                            createVNode("p", { class: "group-hover:bg-clip-text text-xl group-hover:text-transparent group-hover:bg-primaryDark" }, toDisplayString(isLoading.value ? "Logging in..." : "Log in"), 1)
                          ], 8, ["disabled"])
                        ], 32),
                        createVNode("div", { class: "mt-6 text-center" }, [
                          createVNode("p", { class: "text-xl text-gray-600" }, [
                            createTextVNode(" New here? "),
                            createVNode(unref(Link), {
                              href: "/signup",
                              class: "text-primaryDark font-medium hover:text-primaryDark/80 transition-colors"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Sign up ")
                              ]),
                              _: 1
                            })
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
