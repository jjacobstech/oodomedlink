import { ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, withModifiers, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderDynamicModel } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./PasswordInput-BkOFItoK.js";
import { A as AuthLayout } from "./AuthLayout-BLjU_tSH.js";
import { u as useToast, _ as _sfc_main$1 } from "./index-D9olpTuq.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { ArrowLeft } from "@solar-icons/vue";
import { z, flattenError } from "zod";
import "lucide-vue-next";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "reka-ui";
import "class-variance-authority";
const _sfc_main = {
  __name: "Register",
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
        id: "clinic_name",
        name: "Clinic Name",
        placeholder: "Enter your clinic name",
        type: "text",
        required: true,
        autocomplete: "organization",
        model: "clinic_name"
      },
      {
        id: "password",
        name: "Password",
        placeholder: "Create a password",
        type: "password",
        required: true,
        autocomplete: "new-password",
        model: "password"
      },
      {
        id: "password_confirmation",
        name: "Confirm Password",
        placeholder: "Confirm your password",
        type: "password",
        required: true,
        autocomplete: "new-password",
        model: "password_confirmation"
      },
      {
        id: "address",
        name: "Address",
        placeholder: "Enter your address",
        type: "text",
        required: true,
        autocomplete: "street-address",
        model: "address"
      },
      {
        id: "phone_no",
        name: "Phone Number",
        placeholder: "Enter your phone number",
        type: "tel",
        required: true,
        autocomplete: "tel",
        model: "phone_no"
      },
      {
        id: "country",
        name: "Country",
        placeholder: "Enter your country",
        type: "text",
        required: true,
        autocomplete: "country",
        model: "country"
      },
      {
        id: "state",
        name: "State",
        placeholder: "Enter your state",
        type: "text",
        required: true,
        autocomplete: "address-level1",
        model: "state"
      }
    ]);
    const signupForm = useForm({
      email: "",
      clinic_name: "",
      password: "",
      password_confirmation: "",
      phone_no: "",
      address: "",
      state: "",
      country: ""
    });
    const emailSchema = z.object({
      email: z.email("Invalid email address").min(1, "Email is required")
    });
    const otpSchema = z.object({
      otp: z.string().length(6, "OTP must be 6 digits"),
      email: z.email("Invalid email address")
    });
    z.object({
      clinic_name: z.string().min(1, "Clinic name is required"),
      email: z.email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      password_confirmation: z.string().min(6, "Password confirmation is required"),
      phone_no: z.string().min(1, "Phone number is required"),
      address: z.string().min(1, "Address is required"),
      state: z.string().min(1, "State is required"),
      country: z.string().min(1, "Country is required")
    }).refine((data) => data.password === data.password_confirmation, {
      message: "Passwords don't match",
      path: ["password_confirmation"]
    });
    emailForm.email = newEmail;
    const handleEmailSubmit = async () => {
      isLoading.value = true;
      sessionStorage.clear();
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
        emailForm.post(route("send.otp"), {
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
        otpForm.post(route("verify.otp"), {
          onSuccess: (response) => {
            toast({
              title: "Email Verified",
              description: "Please complete your registration",
              class: "text-primaryDark bg-white shadow-lg"
            });
            signupForm.email = emailForm.email;
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
        emailForm.post(route("send.otp"), {
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "signup" }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, {
        class: currentStep.value !== 3 ? "block" : "hidden"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(`<div class="container relative z-10 mx-auto flex min-h-[calc(100vh-80px)] items-center justify-center py-12 lg:max-w-xl"${_scopeId}><div class="w-full space-y-4 px-7 lg:px-20"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/",
              class: "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xl text-primaryDark transition-all duration-200 hover:-translate-y-0.5 hover:bg-primaryDark hover:text-white hover:shadow-lg hover:shadow-primaryDark/30"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "h-5 w-5" }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Back to Home</span>`);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "h-5 w-5" }),
                    createVNode("span", null, "Back to Home")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="grid w-full items-center justify-center rounded-xl bg-white shadow-xl"${_scopeId}><div class="grid space-y-1 rounded-t-lg bg-primaryDark p-6"${_scopeId}><h2 class="text-center font-bold text-white lg:text-2xl"${_scopeId}> Complete Registration </h2><p class="text-center text-xl text-white"${_scopeId}> Create an account - Step ${ssrInterpolate(currentStep.value)} of 3 </p></div><div class="flex justify-center bg-white px-4 py-6 lg:px-0"${_scopeId}><div class="px-auto flex items-center justify-between"${_scopeId}><!--[-->`);
            ssrRenderList(3, (step) => {
              _push2(`<div class="flex-1"${_scopeId}><div class="flex items-center"${_scopeId}><div class="${ssrRenderClass([
                "flex h-10 w-10 items-center justify-center rounded-full text-2xl font-medium transition-all",
                currentStep.value >= step ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-500"
              ])}"${_scopeId}>${ssrInterpolate(step)}</div>`);
              if (step < 3) {
                _push2(`<div class="${ssrRenderClass([
                  "mx-2 h-1 w-20 flex-1 transition-all",
                  currentStep.value > step ? "bg-primaryDark" : "bg-gray-200"
                ])}"${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            });
            _push2(`<!--]--></div></div><div class="space-y-4 bg-white p-6"${_scopeId}>`);
            if (currentStep.value === 1) {
              _push2(`<form class="space-y-4"${_scopeId}><div class="space-y-2"${_scopeId}><label for="email" class="text-xl font-medium"${_scopeId}>Email Address</label><input id="email" type="email" placeholder="Enter your email" autocomplete="email" autofocus${ssrRenderAttr("value", unref(emailForm).email)} class="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryDark lg:text-lg"${_scopeId}></div><button type="submit" class="hover:shadow-primaryring-primaryDark/30 w-full rounded-lg bg-primaryDark px-4 py-2.5 text-xl font-medium text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:text-primaryDark hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(isLoading.value ? "Sending OTP..." : "Send Verification Code")}</button><div class="mt-6 text-center"${_scopeId}><p class="text-xl text-gray-600"${_scopeId}> Already have an account? `);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("login"),
                class: "text-primaryring-primaryDark hover:text-primaryring-primaryDark/80 font-medium transition-colors"
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
              _push2(`<form class="space-y-4"${_scopeId}><div class="space-y-2"${_scopeId}><label for="otp" class="font-medium lg:text-xl"${_scopeId}>Verification Code</label><p class="mb-2 text-gray-500 lg:text-lg"${_scopeId}> Enter the 6-digit code sent to ${ssrInterpolate(unref(emailForm).email)}</p><input id="otp" type="text" placeholder="Enter 6-digit code" maxlength="6"${ssrRenderAttr("value", unref(otpForm).otp)} class="w-full rounded-md border border-gray-300 px-3 py-2 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-primaryDark"${_scopeId}></div><button type="submit" class="hover:shadow-primaryring-primaryDark/30 w-full rounded-lg bg-primaryDark px-4 py-2.5 font-medium text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:text-primaryDark hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 lg:text-xl"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(isLoading.value ? "Verifying..." : "Verify Code")}</button><div class="mt-4 text-center"${_scopeId}><button type="button" class="text-primary ring-primaryDark ring-primaryDark/80 transition-colors hover:text-primary lg:text-xl"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""}${_scopeId}> Resend Code </button></div></form>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$1),
              createVNode("div", { class: "container relative z-10 mx-auto flex min-h-[calc(100vh-80px)] items-center justify-center py-12 lg:max-w-xl" }, [
                createVNode("div", { class: "w-full space-y-4 px-7 lg:px-20" }, [
                  createVNode(unref(Link), {
                    href: "/",
                    class: "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xl text-primaryDark transition-all duration-200 hover:-translate-y-0.5 hover:bg-primaryDark hover:text-white hover:shadow-lg hover:shadow-primaryDark/30"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(ArrowLeft), { class: "h-5 w-5" }),
                      createVNode("span", null, "Back to Home")
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "grid w-full items-center justify-center rounded-xl bg-white shadow-xl" }, [
                    createVNode("div", { class: "grid space-y-1 rounded-t-lg bg-primaryDark p-6" }, [
                      createVNode("h2", { class: "text-center font-bold text-white lg:text-2xl" }, " Complete Registration "),
                      createVNode("p", { class: "text-center text-xl text-white" }, " Create an account - Step " + toDisplayString(currentStep.value) + " of 3 ", 1)
                    ]),
                    createVNode("div", { class: "flex justify-center bg-white px-4 py-6 lg:px-0" }, [
                      createVNode("div", { class: "px-auto flex items-center justify-between" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(3, (step) => {
                          return createVNode("div", {
                            key: step,
                            class: "flex-1"
                          }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("div", {
                                class: [
                                  "flex h-10 w-10 items-center justify-center rounded-full text-2xl font-medium transition-all",
                                  currentStep.value >= step ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-500"
                                ]
                              }, toDisplayString(step), 3),
                              step < 3 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: [
                                  "mx-2 h-1 w-20 flex-1 transition-all",
                                  currentStep.value > step ? "bg-primaryDark" : "bg-gray-200"
                                ]
                              }, null, 2)) : createCommentVNode("", true)
                            ])
                          ]);
                        }), 64))
                      ])
                    ]),
                    createVNode("div", { class: "space-y-4 bg-white p-6" }, [
                      currentStep.value === 1 ? (openBlock(), createBlock("form", {
                        key: 0,
                        onSubmit: withModifiers(handleEmailSubmit, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("label", {
                            for: "email",
                            class: "text-xl font-medium"
                          }, "Email Address"),
                          withDirectives(createVNode("input", {
                            id: "email",
                            type: "email",
                            placeholder: "Enter your email",
                            autocomplete: "email",
                            autofocus: "",
                            "onUpdate:modelValue": ($event) => unref(emailForm).email = $event,
                            class: "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryDark lg:text-lg"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(emailForm).email]
                          ])
                        ]),
                        createVNode("button", {
                          type: "submit",
                          class: "hover:shadow-primaryring-primaryDark/30 w-full rounded-lg bg-primaryDark px-4 py-2.5 text-xl font-medium text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:text-primaryDark hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50",
                          disabled: isLoading.value
                        }, toDisplayString(isLoading.value ? "Sending OTP..." : "Send Verification Code"), 9, ["disabled"]),
                        createVNode("div", { class: "mt-6 text-center" }, [
                          createVNode("p", { class: "text-xl text-gray-600" }, [
                            createTextVNode(" Already have an account? "),
                            createVNode(unref(Link), {
                              href: _ctx.route("login"),
                              class: "text-primaryring-primaryDark hover:text-primaryring-primaryDark/80 font-medium transition-colors"
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
                            class: "font-medium lg:text-xl"
                          }, "Verification Code"),
                          createVNode("p", { class: "mb-2 text-gray-500 lg:text-lg" }, " Enter the 6-digit code sent to " + toDisplayString(unref(emailForm).email), 1),
                          withDirectives(createVNode("input", {
                            id: "otp",
                            type: "text",
                            placeholder: "Enter 6-digit code",
                            maxlength: "6",
                            "onUpdate:modelValue": ($event) => unref(otpForm).otp = $event,
                            class: "w-full rounded-md border border-gray-300 px-3 py-2 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-primaryDark"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(otpForm).otp]
                          ])
                        ]),
                        createVNode("button", {
                          type: "submit",
                          class: "hover:shadow-primaryring-primaryDark/30 w-full rounded-lg bg-primaryDark px-4 py-2.5 font-medium text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:text-primaryDark hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 lg:text-xl",
                          disabled: isLoading.value
                        }, toDisplayString(isLoading.value ? "Verifying..." : "Verify Code"), 9, ["disabled"]),
                        createVNode("div", { class: "mt-4 text-center" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: resendOtp,
                            class: "text-primary ring-primaryDark ring-primaryDark/80 transition-colors hover:text-primary lg:text-xl",
                            disabled: isLoading.value
                          }, " Resend Code ", 8, ["disabled"])
                        ])
                      ], 32)) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (currentStep.value === 3) {
        _push(`<div class="flex min-h-screen w-full justify-center overflow-y-auto bg-primaryLight pb-20 pt-6 sm:pt-10"><div class="mx-4 my-auto h-fit w-full max-w-sm rounded-xl bg-white shadow-lg sm:mx-6 sm:max-w-md md:max-w-lg lg:mx-8 lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl"><div class="grid space-y-1 rounded-t-xl bg-primaryDark px-4 py-4 sm:py-5"><h2 class="text-center text-xl font-bold text-white sm:text-2xl lg:text-3xl"> Complete Registration </h2><p class="text-center text-sm text-white sm:text-base lg:text-lg"> Create an account - Step ${ssrInterpolate(currentStep.value)} of 3 </p></div><form class="space-y-3 p-4 sm:space-y-4 sm:p-6 lg:p-8"><!--[-->`);
        ssrRenderList(biodataFields.value, (field) => {
          _push(`<div class="space-y-1.5 sm:space-y-2"><label${ssrRenderAttr("for", field.id)} class="block text-sm font-medium text-gray-700 sm:text-base lg:text-lg">${ssrInterpolate(field.name)}</label>`);
          if (field.type !== "password") {
            _push(`<input${ssrRenderAttr("id", field.id)}${ssrRenderAttr("type", field.type)}${ssrRenderAttr("placeholder", field.placeholder)}${ssrRenderAttr("autocomplete", field.autocomplete)}${ssrRenderDynamicModel(field.type, unref(signupForm)[field.model], null)} class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primaryDark sm:py-2.5 sm:text-base">`);
          } else {
            _push(ssrRenderComponent(_sfc_main$2, {
              id: field.id,
              placeholder: field.placeholder,
              modelValue: unref(signupForm)[field.model],
              "onUpdate:modelValue": ($event) => unref(signupForm)[field.model] = $event
            }, null, _parent));
          }
          _push(`</div>`);
        });
        _push(`<!--]--><button type="submit" class="mt-6 w-full rounded-lg bg-primaryDark px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:text-primaryDark hover:shadow-lg hover:shadow-primaryDark/30 disabled:cursor-not-allowed disabled:opacity-50 sm:py-3 sm:text-base lg:text-lg"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""}>${ssrInterpolate(isLoading.value ? "Signing up..." : "Complete Registration")}</button></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/User/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
