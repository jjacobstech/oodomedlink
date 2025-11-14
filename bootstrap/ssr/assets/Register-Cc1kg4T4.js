import { ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, withModifiers, withDirectives, vModelText, vModelDynamic, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderDynamicModel } from "vue/server-renderer";
import { useForm, Head, Link, router } from "@inertiajs/vue3";
import { z, flattenError } from "zod";
import { A as AuthLayout } from "./AuthLayout-x0U8Uf7l.js";
import { u as useToast, _ as _sfc_main$1, a as _sfc_main$2 } from "./PasswordInput-BRdDyhnh.js";
import { ArrowLeft } from "@solar-icons/vue";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@vueuse/core";
import "reka-ui";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "lucide-vue-next";
import "class-variance-authority";
const _sfc_main = {
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const router$1 = router;
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
    const signupSchema = z.object({
      clinic_name: z.string().min(1, "Clinic name is required"),
      email: z.email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      password_confirmation: z.string().min(6, "Password confirmation is required"),
      phone_no: z.string().min(1, "Phone number is required"),
      address: z.string().min(1, "Address is required"),
      state: z.string().min(1, "State is required"),
      country: z.string().min(1, "Country is required")
    }).refine(
      (data) => data.password === data.password_confirmation,
      {
        message: "Passwords don't match",
        path: ["password_confirmation"]
      }
    );
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
        console.error(error);
      }
      isLoading.value = false;
    };
    const handleOtpSubmit = async () => {
      console.log(otpForm.email);
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
            console.log(error);
          }
        });
      } catch (error) {
        console.error(error);
      }
      isLoading.value = false;
    };
    const resendOtp = async () => {
      isLoading.value = true;
      console.log(otpForm.email);
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
        console.error(error);
      }
      isLoading.value = false;
    };
    const handleSignup = async () => {
      isLoading.value = true;
      const validation = signupSchema.safeParse(signupForm);
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
        signupForm.post(route("signup"), {
          onFinish: () => {
            signupForm.reset();
          },
          onError: (error) => {
            for (const err in error) {
              toast({
                title: "Registration Failed",
                description: error[err],
                variant: "destructive",
                class: "text-primaryDark bg-white shadow-lg"
              });
              break;
            }
          },
          onSuccess: () => {
            toast({
              title: "Registration Successful",
              description: "Welcome! Redirecting to dashboard...",
              class: "text-primaryDark bg-white shadow-lg"
            });
            setTimeout(() => {
              router$1.push(route("user.dashboard"));
            }, 500);
          }
        });
      } catch (error) {
        console.error(error);
      }
      isLoading.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "signup" }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(`<div class="relative z-10 container mx-auto lg:max-w-xl py-12 flex items-center justify-center min-h-[calc(100vh-80px)]"${_scopeId}><div class="w-full px-5 lg:px-20 space-y-4"${_scopeId}><div class="flex justify-start"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/",
              class: "inline-flex items-center gap-2 text-xl px-4 py-2 text-primaryDark rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:bg-primaryDark hover:text-white hover:shadow-primaryDark/30"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-5 h-5" }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Back to Home</span>`);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-5 h-5" }),
                    createVNode("span", null, "Back to Home")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="w-full grid justify-center rounded-xl bg-white shadow-xl items-center"${_scopeId}><div class="p-6 grid space-y-1 bg-primaryDark rounded-t-lg"${_scopeId}><h2 class="text-2xl font-bold text-center text-white"${_scopeId}>Complete Registration</h2><p class="text-center text-xl text-white"${_scopeId}> Create an account - Step ${ssrInterpolate(currentStep.value)} of 3 </p></div><div class="py-6 flex justify-center"${_scopeId}><div class="flex justify-between items-center px-auto"${_scopeId}><!--[-->`);
            ssrRenderList(3, (step) => {
              _push2(`<div class="flex-1"${_scopeId}><div class="flex items-center"${_scopeId}><div class="${ssrRenderClass([
                "w-10 h-10 rounded-full flex items-center justify-center text-2xl font-medium transition-all",
                currentStep.value >= step ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-500"
              ])}"${_scopeId}>${ssrInterpolate(step)}</div>`);
              if (step < 3) {
                _push2(`<div class="${ssrRenderClass([
                  "flex-1 h-1 mx-2 w-20 transition-all",
                  currentStep.value > step ? "bg-primaryDark" : "bg-gray-200"
                ])}"${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            });
            _push2(`<!--]--></div></div><div class="p-6 space-y-4 bg-white"${_scopeId}>`);
            if (currentStep.value === 3) {
              _push2(`<form class="space-y-4"${_scopeId}><div class="space-y-2"${_scopeId}><label for="email" class="text-xl font-medium"${_scopeId}>Email Address</label><input id="email" type="email" placeholder="Enter your email" autocomplete="email" autofocus${ssrRenderAttr("value", unref(emailForm).email)} class="w-full px-3 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryDark"${_scopeId}></div><button type="submit" class="w-full px-4 py-2.5 text-xl bg-primaryDark hover:text-primaryDark text-white font-medium rounded-lg hover:bg-white hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md hover:shadow-primaryring-primaryDark/30"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(isLoading.value ? "Sending OTP..." : "Send Verification Code")}</button><div class="mt-6 text-center"${_scopeId}><p class="text-xl text-gray-600"${_scopeId}> Already have an account? `);
              _push2(ssrRenderComponent(unref(Link), {
                href: "/login",
                class: "text-primaryring-primaryDark font-medium hover:text-primaryring-primaryDark/80 transition-colors"
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
              _push2(`<form class="space-y-4"${_scopeId}><div class="space-y-2"${_scopeId}><label for="otp" class="text-xl font-medium"${_scopeId}>Verification Code</label><p class="text-lg text-gray-500 mb-2"${_scopeId}> Enter the 6-digit code sent to ${ssrInterpolate(unref(emailForm).email)}</p><input id="otp" type="text" placeholder="Enter 6-digit code" maxlength="6"${ssrRenderAttr("value", unref(otpForm).otp)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryDark text-center text-2xl tracking-widest"${_scopeId}></div><button type="submit" class="w-full px-4 text-xl py-2.5 bg-primaryDark hover:-translate-y-1 text-white hover:text-primaryDark font-medium rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md hover:shadow-primaryring-primaryDark/30"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(isLoading.value ? "Verifying..." : "Verify Code")}</button><div class="mt-4 text-center"${_scopeId}><button type="button" class="text-xl text-primary ring-primaryDark hover:text-primary ring-primaryDark/80 transition-colors"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""}${_scopeId}> Resend Code </button></div></form>`);
            } else {
              _push2(`<!---->`);
            }
            if (currentStep.value === 1) {
              _push2(`<form class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(biodataFields.value, (field) => {
                _push2(`<div class="space-y-2"${_scopeId}><label${ssrRenderAttr("for", field.id)} class="text-xl font-medium"${_scopeId}>${ssrInterpolate(field.name)}</label>`);
                if (field.type !== "password") {
                  _push2(`<input${ssrRenderAttr("id", field.id)}${ssrRenderAttr("type", field.type)}${ssrRenderAttr("placeholder", field.placeholder)}${ssrRenderAttr("autocomplete", field.autocomplete)}${ssrRenderDynamicModel(field.type, unref(signupForm)[field.model], null)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryDark"${_scopeId}>`);
                } else {
                  _push2(ssrRenderComponent(_sfc_main$2, {
                    id: field.id,
                    placeholder: field.placeholder,
                    modelValue: unref(signupForm)[field.model],
                    "onUpdate:modelValue": ($event) => unref(signupForm)[field.model] = $event
                  }, null, _parent2, _scopeId));
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--><button type="submit" class="w-full px-4 text-xl py-2.5 bg-primaryDark hover:-translate-y-1 text-white font-medium rounded-lg hover:bg-white hover:text-primaryDark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md hover:shadow-primaryring-primaryDark/30"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(isLoading.value ? "Signing up..." : "Complete Registration")}</button></form>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$1),
              createVNode("div", { class: "relative z-10 container mx-auto lg:max-w-xl py-12 flex items-center justify-center min-h-[calc(100vh-80px)]" }, [
                createVNode("div", { class: "w-full px-5 lg:px-20 space-y-4" }, [
                  createVNode("div", { class: "flex justify-start" }, [
                    createVNode(unref(Link), {
                      href: "/",
                      class: "inline-flex items-center gap-2 text-xl px-4 py-2 text-primaryDark rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:bg-primaryDark hover:text-white hover:shadow-primaryDark/30"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "w-5 h-5" }),
                        createVNode("span", null, "Back to Home")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "w-full grid justify-center rounded-xl bg-white shadow-xl items-center" }, [
                    createVNode("div", { class: "p-6 grid space-y-1 bg-primaryDark rounded-t-lg" }, [
                      createVNode("h2", { class: "text-2xl font-bold text-center text-white" }, "Complete Registration"),
                      createVNode("p", { class: "text-center text-xl text-white" }, " Create an account - Step " + toDisplayString(currentStep.value) + " of 3 ", 1)
                    ]),
                    createVNode("div", { class: "py-6 flex justify-center" }, [
                      createVNode("div", { class: "flex justify-between items-center px-auto" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(3, (step) => {
                          return createVNode("div", {
                            key: step,
                            class: "flex-1"
                          }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("div", {
                                class: [
                                  "w-10 h-10 rounded-full flex items-center justify-center text-2xl font-medium transition-all",
                                  currentStep.value >= step ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-500"
                                ]
                              }, toDisplayString(step), 3),
                              step < 3 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: [
                                  "flex-1 h-1 mx-2 w-20 transition-all",
                                  currentStep.value > step ? "bg-primaryDark" : "bg-gray-200"
                                ]
                              }, null, 2)) : createCommentVNode("", true)
                            ])
                          ]);
                        }), 64))
                      ])
                    ]),
                    createVNode("div", { class: "p-6 space-y-4 bg-white" }, [
                      currentStep.value === 3 ? (openBlock(), createBlock("form", {
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
                            class: "w-full px-3 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryDark"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(emailForm).email]
                          ])
                        ]),
                        createVNode("button", {
                          type: "submit",
                          class: "w-full px-4 py-2.5 text-xl bg-primaryDark hover:text-primaryDark text-white font-medium rounded-lg hover:bg-white hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md hover:shadow-primaryring-primaryDark/30",
                          disabled: isLoading.value
                        }, toDisplayString(isLoading.value ? "Sending OTP..." : "Send Verification Code"), 9, ["disabled"]),
                        createVNode("div", { class: "mt-6 text-center" }, [
                          createVNode("p", { class: "text-xl text-gray-600" }, [
                            createTextVNode(" Already have an account? "),
                            createVNode(unref(Link), {
                              href: "/login",
                              class: "text-primaryring-primaryDark font-medium hover:text-primaryring-primaryDark/80 transition-colors"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Login ")
                              ]),
                              _: 1
                            })
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
                            class: "text-xl font-medium"
                          }, "Verification Code"),
                          createVNode("p", { class: "text-lg text-gray-500 mb-2" }, " Enter the 6-digit code sent to " + toDisplayString(unref(emailForm).email), 1),
                          withDirectives(createVNode("input", {
                            id: "otp",
                            type: "text",
                            placeholder: "Enter 6-digit code",
                            maxlength: "6",
                            "onUpdate:modelValue": ($event) => unref(otpForm).otp = $event,
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryDark text-center text-2xl tracking-widest"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(otpForm).otp]
                          ])
                        ]),
                        createVNode("button", {
                          type: "submit",
                          class: "w-full px-4 text-xl py-2.5 bg-primaryDark hover:-translate-y-1 text-white hover:text-primaryDark font-medium rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md hover:shadow-primaryring-primaryDark/30",
                          disabled: isLoading.value
                        }, toDisplayString(isLoading.value ? "Verifying..." : "Verify Code"), 9, ["disabled"]),
                        createVNode("div", { class: "mt-4 text-center" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: resendOtp,
                            class: "text-xl text-primary ring-primaryDark hover:text-primary ring-primaryDark/80 transition-colors",
                            disabled: isLoading.value
                          }, " Resend Code ", 8, ["disabled"])
                        ])
                      ], 32)) : createCommentVNode("", true),
                      currentStep.value === 1 ? (openBlock(), createBlock("form", {
                        key: 2,
                        onSubmit: withModifiers(handleSignup, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(biodataFields.value, (field) => {
                          return openBlock(), createBlock("div", {
                            class: "space-y-2",
                            key: field.id
                          }, [
                            createVNode("label", {
                              for: field.id,
                              class: "text-xl font-medium"
                            }, toDisplayString(field.name), 9, ["for"]),
                            field.type !== "password" ? withDirectives((openBlock(), createBlock("input", {
                              key: 0,
                              id: field.id,
                              type: field.type,
                              placeholder: field.placeholder,
                              autocomplete: field.autocomplete,
                              "onUpdate:modelValue": ($event) => unref(signupForm)[field.model] = $event,
                              class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryDark"
                            }, null, 8, ["id", "type", "placeholder", "autocomplete", "onUpdate:modelValue"])), [
                              [vModelDynamic, unref(signupForm)[field.model]]
                            ]) : (openBlock(), createBlock(_sfc_main$2, {
                              key: 1,
                              id: field.id,
                              placeholder: field.placeholder,
                              modelValue: unref(signupForm)[field.model],
                              "onUpdate:modelValue": ($event) => unref(signupForm)[field.model] = $event
                            }, null, 8, ["id", "placeholder", "modelValue", "onUpdate:modelValue"]))
                          ]);
                        }), 128)),
                        createVNode("button", {
                          type: "submit",
                          class: "w-full px-4 text-xl py-2.5 bg-primaryDark hover:-translate-y-1 text-white font-medium rounded-lg hover:bg-white hover:text-primaryDark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md hover:shadow-primaryring-primaryDark/30",
                          disabled: isLoading.value
                        }, toDisplayString(isLoading.value ? "Signing up..." : "Complete Registration"), 9, ["disabled"])
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
