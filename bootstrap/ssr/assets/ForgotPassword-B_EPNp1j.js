import { ref, unref, withCtx, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, withModifiers, withDirectives, vModelText, toDisplayString, Fragment, renderList, vModelDynamic, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderDynamicModel } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./PasswordInput-BkOFItoK.js";
import { _ as _sfc_main$1 } from "./AdminAuthLayout-BYlW3agj.js";
import { u as useToast, _ as _sfc_main$2 } from "./index-D9olpTuq.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { z, flattenError } from "zod";
import "lucide-vue-next";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "reka-ui";
import "class-variance-authority";
const _sfc_main = {
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoading = ref(false);
    const currentStep = ref(1);
    const { toast } = useToast();
    const newEmail = sessionStorage.getItem("email");
    const emailForm = useForm({
      email: ""
    });
    const otpForm = useForm({
      otp: "",
      email: ""
    });
    const biodataFields = ref([
      {
        id: "new-password",
        name: "New Password",
        placeholder: "Create a new password",
        type: "password",
        required: true,
        autocomplete: "new-password",
        model: "password"
      },
      {
        id: "password_confirmation",
        name: "Confirm New Password",
        placeholder: "Confirm your new password",
        type: "password",
        required: true,
        autocomplete: "new-password",
        model: "password_confirmation"
      }
    ]);
    const resetForm = useForm({
      email: "",
      password: "",
      password_confirmation: "",
      otp: ""
    });
    const emailSchema = z.object({
      email: z.email("Invalid email address").min(1, "Email is required")
    });
    const otpSchema = z.object({
      otp: z.string().length(6, "OTP must be 6 digits"),
      email: z.email("Invalid email address")
    });
    const resetSchema = z.object({
      email: z.email("Invalid email address").min(1, "Email is required"),
      otp: z.string().length(6, "OTP must be 6 digits"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      password_confirmation: z.string().min(6, "Password confirmation is required")
    }).refine((data) => data.password === data.password_confirmation, {
      message: "Passwords don't match",
      path: ["password_confirmation"]
    });
    emailForm.email = newEmail;
    const handleEmailSubmit = async () => {
      isLoading.value = true;
      const validation = emailSchema.safeParse(emailForm);
      if (!validation.success) {
        const error = validation.error.errors[0];
        toast({
          title: "Validation Error",
          description: error.message,
          variant: "destructive",
          class: "text-primaryDark bg-white shadow-lg"
        });
        isLoading.value = false;
        return;
      }
      try {
        emailForm.post(route("admin.password.request.otp"), {
          onSuccess: (response) => {
            toast({
              title: "Verification Code Sent",
              description: "Please check your email for the verification code",
              class: "text-primaryDark bg-white shadow-lg"
            });
            currentStep.value = 2;
            otpForm.email = emailForm.email;
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: error.email || "Failed to send verification code",
              variant: "destructive",
              class: "text-primaryDark bg-white shadow-lg"
            });
            isLoading.value = false;
          }
        });
      } catch (error) {
      }
      isLoading.value = false;
    };
    const handleOtpSubmit = async () => {
      isLoading.value = true;
      const validation = otpSchema.safeParse(otpForm);
      if (!validation.success) {
        for (const error in flattenError(validation.error)?.fieldErrors) {
          const inputError = flattenError(validation.error)?.fieldErrors[error][0];
          toast({
            title: "Validation Error",
            description: inputError,
            variant: "destructive",
            class: "text-primaryDark bg-white shadow-lg"
          });
        }
        isLoading.value = false;
        return;
      }
      try {
        otpForm.post(route("admin.password.verify"), {
          onSuccess: (response) => {
            toast({
              title: "Email Verified",
              description: "Please complete your registration",
              class: "text-primaryDark bg-white shadow-lg"
            });
            resetForm.email = otpForm.email;
            resetForm.otp = otpForm.otp;
            currentStep.value = 3;
          },
          onError: (error) => {
            toast({
              title: "Verification Failed",
              description: error.otp || "Invalid verification code",
              variant: "destructive",
              class: "text-primaryDark bg-white shadow-lg"
            });
          }
        });
      } catch (error) {
      }
      isLoading.value = false;
    };
    const resendOtp = async () => {
      isLoading.value = true;
      try {
        emailForm.post(route("admin.password.request.opt"), {
          onSuccess: () => {
            toast({
              title: "Code Resent",
              description: "A new verification code has been sent to your email",
              class: "text-primaryDark bg-white shadow-lg"
            });
          },
          onError: () => {
            toast({
              title: "Error",
              description: "Failed to resend verification code",
              variant: "destructive",
              class: "text-primaryDark bg-white shadow-lg"
            });
          }
        });
      } catch (error) {
      }
      isLoading.value = false;
    };
    const handleReset = async () => {
      isLoading.value = true;
      const validation = resetSchema.safeParse(resetForm);
      if (!validation.success) {
        const errors = validation.error.flatten().fieldErrors;
        for (const field in errors) {
          toast({
            title: "Validation Error",
            description: errors[field][0],
            variant: "destructive",
            class: "text-primaryDark bg-white shadow-lg"
          });
          break;
        }
        isLoading.value = false;
        return;
      }
      try {
        resetForm.post(route("admin.password.reset"), {
          onError: (error) => {
            for (const err in error) {
              toast({
                title: "Password Reset Failed",
                description: error[err],
                variant: "destructive",
                class: "text-primaryDark bg-white shadow-lg"
              });
              break;
            }
          },
          onSuccess: (response) => {
            toast({
              title: "Password Reset Successful",
              description: " Redirecting to login...",
              class: "text-primaryDark bg-white shadow-lg"
            });
          }
        });
      } catch (error) {
      }
      isLoading.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Password Reset" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            _push2(`<div class="flex h-screen items-center justify-center overflow-y-hidden"${_scopeId}><div class="max-w-lg items-center justify-center rounded-xl bg-white shadow-xl"${_scopeId}><div class="bg-primaryDark grid space-y-1 rounded-t-lg p-6"${_scopeId}><h2 class="text-center text-2xl font-bold text-white"${_scopeId}> Reset Password </h2></div><div class="space-y-4 p-6"${_scopeId}>`);
            if (currentStep.value === 1) {
              _push2(`<form class="space-y-4"${_scopeId}><div class="space-y-2"${_scopeId}><label for="email" class="text-lg font-extrabold"${_scopeId}>Email Address</label><input id="email" type="email" placeholder="Enter your email" autocomplete="email" autofocus${ssrRenderAttr("value", unref(emailForm).email)} class="focus:ring-primaryDark w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2"${_scopeId}></div><button type="submit" class="bg-primaryDark hover:shadow-primaryDark /30 w-full rounded-lg px-4 py-2.5 font-extrabold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(isLoading.value ? "Sending OTP..." : "Send Verification Code")}</button><div class="mt-6 text-center"${_scopeId}><p class="text-lg text-gray-600"${_scopeId}> Already have an account? `);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin.login"),
                class: "text-primaryDark hover:text-primaryDark /80 font-extrabold transition-colors"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Login `);
                  } else {
                    return [
                      createTextVNode(" Login ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</p></div></form>`);
            } else {
              _push2(`<!---->`);
            }
            if (currentStep.value === 2) {
              _push2(`<form class="space-y-4"${_scopeId}><div class="space-y-2"${_scopeId}><label for="otp" class="text-lg font-extrabold"${_scopeId}>Verification Code</label><p class="mb-2 text-xs text-gray-500"${_scopeId}> Enter the 6-digit code sent to ${ssrInterpolate(unref(emailForm).email)}</p><input id="otp" type="text" placeholder="Enter 6-digit code" maxlength="6"${ssrRenderAttr("value", unref(otpForm).otp)} class="focus:ring-primaryDark w-full rounded-md border border-gray-300 px-3 py-2 text-center text-2xl tracking-widest focus:outline-none focus:ring-2"${_scopeId}></div><button type="submit" class="bg-primaryDark hover:shadow-primaryDark /30 w-full rounded-lg px-4 py-2.5 font-extrabold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(isLoading.value ? "Verifying..." : "Verify Code")}</button><div class="mt-4 text-center"${_scopeId}><button type="button" class="text-primaryDark hover:text-primaryDark /80 text-lg transition-colors"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""}${_scopeId}> Resend Code </button></div></form>`);
            } else {
              _push2(`<!---->`);
            }
            if (currentStep.value === 3) {
              _push2(`<form class="h-full space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(biodataFields.value, (field) => {
                _push2(`<div class="space-y-2"${_scopeId}><label${ssrRenderAttr("for", field.id)} class="text-lg font-extrabold"${_scopeId}>${ssrInterpolate(field.name)}</label>`);
                if (field.type !== "password") {
                  _push2(`<input${ssrRenderAttr("id", field.id)}${ssrRenderAttr("type", field.type)}${ssrRenderAttr("placeholder", field.placeholder)}${ssrRenderAttr("autocomplete", field.autocomplete)}${ssrRenderDynamicModel(field.type, unref(resetForm)[field.model], null)} class="focus:ring-primaryDark w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2"${_scopeId}>`);
                } else {
                  _push2(ssrRenderComponent(_sfc_main$3, {
                    id: field.id,
                    placeholder: field.placeholder,
                    modelValue: unref(resetForm)[field.model],
                    "onUpdate:modelValue": ($event) => unref(resetForm)[field.model] = $event
                  }, null, _parent2, _scopeId));
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--><button type="submit" class="bg-primaryDark hover:shadow-primaryDark /30 w-full rounded-lg px-4 py-2.5 font-extrabold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(isLoading.value ? "Resetting Password..." : "Reset Password")}</button></form>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2),
              createVNode("div", { class: "flex h-screen items-center justify-center overflow-y-hidden" }, [
                createVNode("div", { class: "max-w-lg items-center justify-center rounded-xl bg-white shadow-xl" }, [
                  createVNode("div", { class: "bg-primaryDark grid space-y-1 rounded-t-lg p-6" }, [
                    createVNode("h2", { class: "text-center text-2xl font-bold text-white" }, " Reset Password ")
                  ]),
                  createVNode("div", { class: "space-y-4 p-6" }, [
                    currentStep.value === 1 ? (openBlock(), createBlock("form", {
                      key: 0,
                      onSubmit: withModifiers(handleEmailSubmit, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("label", {
                          for: "email",
                          class: "text-lg font-extrabold"
                        }, "Email Address"),
                        withDirectives(createVNode("input", {
                          id: "email",
                          type: "email",
                          placeholder: "Enter your email",
                          autocomplete: "email",
                          autofocus: "",
                          "onUpdate:modelValue": ($event) => unref(emailForm).email = $event,
                          class: "focus:ring-primaryDark w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(emailForm).email]
                        ])
                      ]),
                      createVNode("button", {
                        type: "submit",
                        class: "bg-primaryDark hover:shadow-primaryDark /30 w-full rounded-lg px-4 py-2.5 font-extrabold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50",
                        disabled: isLoading.value
                      }, toDisplayString(isLoading.value ? "Sending OTP..." : "Send Verification Code"), 9, ["disabled"]),
                      createVNode("div", { class: "mt-6 text-center" }, [
                        createVNode("p", { class: "text-lg text-gray-600" }, [
                          createTextVNode(" Already have an account? "),
                          createVNode(unref(Link), {
                            href: _ctx.route("admin.login"),
                            class: "text-primaryDark hover:text-primaryDark /80 font-extrabold transition-colors"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Login ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ], 32)) : createCommentVNode("", true),
                    currentStep.value === 2 ? (openBlock(), createBlock("form", {
                      key: 1,
                      onSubmit: withModifiers(handleOtpSubmit, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("label", {
                          for: "otp",
                          class: "text-lg font-extrabold"
                        }, "Verification Code"),
                        createVNode("p", { class: "mb-2 text-xs text-gray-500" }, " Enter the 6-digit code sent to " + toDisplayString(unref(emailForm).email), 1),
                        withDirectives(createVNode("input", {
                          id: "otp",
                          type: "text",
                          placeholder: "Enter 6-digit code",
                          maxlength: "6",
                          "onUpdate:modelValue": ($event) => unref(otpForm).otp = $event,
                          class: "focus:ring-primaryDark w-full rounded-md border border-gray-300 px-3 py-2 text-center text-2xl tracking-widest focus:outline-none focus:ring-2"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(otpForm).otp]
                        ])
                      ]),
                      createVNode("button", {
                        type: "submit",
                        class: "bg-primaryDark hover:shadow-primaryDark /30 w-full rounded-lg px-4 py-2.5 font-extrabold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50",
                        disabled: isLoading.value
                      }, toDisplayString(isLoading.value ? "Verifying..." : "Verify Code"), 9, ["disabled"]),
                      createVNode("div", { class: "mt-4 text-center" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: resendOtp,
                          class: "text-primaryDark hover:text-primaryDark /80 text-lg transition-colors",
                          disabled: isLoading.value
                        }, " Resend Code ", 8, ["disabled"])
                      ])
                    ], 32)) : createCommentVNode("", true),
                    currentStep.value === 3 ? (openBlock(), createBlock("form", {
                      key: 2,
                      onSubmit: withModifiers(handleReset, ["prevent"]),
                      class: "h-full space-y-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(biodataFields.value, (field) => {
                        return openBlock(), createBlock("div", {
                          class: "space-y-2",
                          key: field.id
                        }, [
                          createVNode("label", {
                            for: field.id,
                            class: "text-lg font-extrabold"
                          }, toDisplayString(field.name), 9, ["for"]),
                          field.type !== "password" ? withDirectives((openBlock(), createBlock("input", {
                            key: 0,
                            id: field.id,
                            type: field.type,
                            placeholder: field.placeholder,
                            autocomplete: field.autocomplete,
                            "onUpdate:modelValue": ($event) => unref(resetForm)[field.model] = $event,
                            class: "focus:ring-primaryDark w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2"
                          }, null, 8, ["id", "type", "placeholder", "autocomplete", "onUpdate:modelValue"])), [
                            [vModelDynamic, unref(resetForm)[field.model]]
                          ]) : (openBlock(), createBlock(_sfc_main$3, {
                            key: 1,
                            id: field.id,
                            placeholder: field.placeholder,
                            modelValue: unref(resetForm)[field.model],
                            "onUpdate:modelValue": ($event) => unref(resetForm)[field.model] = $event
                          }, null, 8, ["id", "placeholder", "modelValue", "onUpdate:modelValue"]))
                        ]);
                      }), 128)),
                      createVNode("button", {
                        type: "submit",
                        class: "bg-primaryDark hover:shadow-primaryDark /30 w-full rounded-lg px-4 py-2.5 font-extrabold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50",
                        disabled: isLoading.value
                      }, toDisplayString(isLoading.value ? "Resetting Password..." : "Reset Password"), 9, ["disabled"])
                    ], 32)) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Admin/ForgotPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
