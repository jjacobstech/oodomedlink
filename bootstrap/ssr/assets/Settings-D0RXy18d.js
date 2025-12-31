import { defineComponent, ref, computed, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, withModifiers, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-Br3x_ZsV.js";
import { useForm, Head, router } from "@inertiajs/vue3";
import { u as useToast } from "./index-CyWCJ_Mb.js";
import "./index-tVDjCcDH.js";
import "class-variance-authority";
import "reka-ui";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "lucide-vue-next";
import "./ApplicationLogo-_si3TCMD.js";
import "@solar-icons/vue";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "axios";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Settings",
  __ssrInlineRender: true,
  props: {
    user: {}
  },
  setup(__props) {
    const props = __props;
    const { toast } = useToast();
    console.log(props.user.avatar);
    const form = useForm({
      name: props.user.name,
      email: props.user.email,
      avatar: null,
      current_password: "",
      password: "",
      password_confirmation: "",
      phone_no: props.user.phone_no || "",
      address: props.user.address || "",
      state: props.user.state || "",
      country: props.user.country || ""
    });
    console.log(form.avatar);
    const avatarPreview = ref(props.user.avatar ?? "/assets/doctor.jpeg");
    const showPasswordFields = ref(false);
    const handleAvatarChange = (event) => {
      const input = event.target;
      if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.size > 2 * 1024 * 1024) {
          alert("File size must be less than 2MB");
          return;
        }
        if (!file.type.startsWith("image/")) {
          alert("Please select an image file");
          return;
        }
        form.avatar = file;
        avatarPreview.value = URL.createObjectURL(file);
      }
    };
    const submitForm = () => {
      form.post(route("user.profile.update"), {
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
          form.reset("current_password", "password", "password_confirmation");
          showPasswordFields.value = false;
          toast({
            title: "Profile Updated",
            description: "Profile updated successfully",
            variant: "default",
            open: true,
            class: "text-primaryDark bg-white shadow-lg bottom-96"
          });
          router.get(route("user.settings"));
        },
        onError: (errors) => {
        }
      });
    };
    computed(() => {
      return form.current_password || form.password || form.password_confirmation;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Settings" }, null, _parent));
      _push(ssrRenderComponent(AuthenticatedLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen w-full bg-primaryLight"${_scopeId}><div class="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8"${_scopeId}><div class="mb-6 sm:mb-8"${_scopeId}><h1 class="text-2xl sm:text-3xl font-bold text-gray-800"${_scopeId}> Account Settings </h1><p class="text-sm sm:text-base text-gray-600 mt-1"${_scopeId}> Manage your personal and clinic account details </p></div><div class="grid gap-6 lg:grid-cols-3 lg:gap-8"${_scopeId}><div class="rounded-2xl bg-white p-6 shadow-md lg:sticky lg:top-6 lg:self-start"${_scopeId}><div class="flex flex-col items-center text-center"${_scopeId}><div class="relative mb-4"${_scopeId}><img${ssrRenderAttr("src", avatarPreview.value)} alt="Profile Avatar" class="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover border-4 border-gray-100 shadow-lg"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full"${_scopeId}><span class="text-white text-xs"${_scopeId}>Uploading...</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><h2 class="text-lg sm:text-xl font-semibold text-gray-800 break-words max-w-full"${_scopeId}>${ssrInterpolate(unref(form).name)}</h2><p class="text-xs sm:text-sm text-gray-500 break-all max-w-full mt-1"${_scopeId}>${ssrInterpolate(unref(form).email)}</p><div class="mt-4 w-full"${_scopeId}><label class="bg-primaryDark cursor-pointer rounded-lg px-4 py-2.5 text-sm sm:text-base font-semibold text-white transition-all duration-150 hover:-translate-y-1 hover:shadow-lg inline-block w-full"${_scopeId}> Change Avatar <input type="file" class="hidden" accept="image/*"${_scopeId}></label><p class="text-xs text-gray-500 mt-2"${_scopeId}> Max size: 2MB </p></div></div></div><div class="rounded-2xl bg-white p-4 sm:p-6 shadow-md lg:col-span-2"${_scopeId}><form class="space-y-5"${_scopeId}><div${_scopeId}><h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b"${_scopeId}> Basic Information </h3><div class="grid gap-4 sm:gap-5 md:grid-cols-2"${_scopeId}><div class="md:col-span-2 lg:col-span-1"${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}> Full Name * </label><input${ssrRenderAttr("value", unref(form).name)} type="text" required class="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base"${_scopeId}>`);
            if (unref(form).errors.name) {
              _push2(`<p class="text-red-500 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="md:col-span-2 lg:col-span-1"${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}> Email Address * </label><input${ssrRenderAttr("value", unref(form).email)} type="email" required class="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base"${_scopeId}>`);
            if (unref(form).errors.email) {
              _push2(`<p class="text-red-500 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div${_scopeId}><h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b"${_scopeId}> Contact Information </h3><div class="space-y-4"${_scopeId}><div${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}> Phone Number </label><input${ssrRenderAttr("value", unref(form).phone_no)} type="tel" class="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base"${_scopeId}>`);
            if (unref(form).errors.phone_no) {
              _push2(`<p class="text-red-500 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.phone_no)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}> Address </label><input${ssrRenderAttr("value", unref(form).address)} type="text" class="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base"${_scopeId}></div><div class="grid gap-4 sm:gap-5 sm:grid-cols-2"${_scopeId}><div${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}> State </label><input${ssrRenderAttr("value", unref(form).state)} type="text" class="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base"${_scopeId}></div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}> Country </label><input${ssrRenderAttr("value", unref(form).country)} type="text" class="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base"${_scopeId}></div></div></div></div><div${_scopeId}><div class="flex items-center justify-between mb-4 pb-2 border-b"${_scopeId}><h3 class="text-lg font-semibold text-gray-800"${_scopeId}> Change Password </h3><button type="button" class="text-sm text-primaryDark font-medium hover:underline"${_scopeId}>${ssrInterpolate(showPasswordFields.value ? "Hide" : "Show")}</button></div>`);
            if (showPasswordFields.value) {
              _push2(`<div class="space-y-4"${_scopeId}><div${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}> Current Password </label><input${ssrRenderAttr("value", unref(form).current_password)} type="password" placeholder="Enter current password" class="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base"${_scopeId}>`);
              if (unref(form).errors.current_password) {
                _push2(`<p class="text-red-500 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.current_password)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="grid gap-4 sm:gap-5 sm:grid-cols-2"${_scopeId}><div${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}> New Password </label><input${ssrRenderAttr("value", unref(form).password)} type="password" placeholder="Enter new password" class="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base"${_scopeId}>`);
              if (unref(form).errors.password) {
                _push2(`<p class="text-red-500 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.password)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}> Confirm Password </label><input${ssrRenderAttr("value", unref(form).password_confirmation)} type="password" placeholder="Confirm new password" class="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base"${_scopeId}></div></div><p class="text-xs text-gray-500"${_scopeId}> Password must be at least 8 characters long </p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="pt-4 flex flex-col sm:flex-row gap-3 sm:justify-end"${_scopeId}><button type="button" class="w-full sm:w-auto rounded-lg px-6 py-2.5 font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 shadow transition-all duration-150 text-sm sm:text-base order-2 sm:order-1"${_scopeId}> Reset </button><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="w-full sm:w-auto bg-primaryDark rounded-lg px-6 py-2.5 font-semibold text-white shadow transition-all duration-150 hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-sm sm:text-base order-1 sm:order-2"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Saving..." : "Save Changes")}</button></div></form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen w-full bg-primaryLight" }, [
                createVNode("div", { class: "mx-auto max-w-7xl p-4 sm:p-6 lg:p-8" }, [
                  createVNode("div", { class: "mb-6 sm:mb-8" }, [
                    createVNode("h1", { class: "text-2xl sm:text-3xl font-bold text-gray-800" }, " Account Settings "),
                    createVNode("p", { class: "text-sm sm:text-base text-gray-600 mt-1" }, " Manage your personal and clinic account details ")
                  ]),
                  createVNode("div", { class: "grid gap-6 lg:grid-cols-3 lg:gap-8" }, [
                    createVNode("div", { class: "rounded-2xl bg-white p-6 shadow-md lg:sticky lg:top-6 lg:self-start" }, [
                      createVNode("div", { class: "flex flex-col items-center text-center" }, [
                        createVNode("div", { class: "relative mb-4" }, [
                          createVNode("img", {
                            src: avatarPreview.value,
                            alt: "Profile Avatar",
                            class: "h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover border-4 border-gray-100 shadow-lg"
                          }, null, 8, ["src"]),
                          unref(form).processing ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full"
                          }, [
                            createVNode("span", { class: "text-white text-xs" }, "Uploading...")
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("h2", { class: "text-lg sm:text-xl font-semibold text-gray-800 break-words max-w-full" }, toDisplayString(unref(form).name), 1),
                        createVNode("p", { class: "text-xs sm:text-sm text-gray-500 break-all max-w-full mt-1" }, toDisplayString(unref(form).email), 1),
                        createVNode("div", { class: "mt-4 w-full" }, [
                          createVNode("label", { class: "bg-primaryDark cursor-pointer rounded-lg px-4 py-2.5 text-sm sm:text-base font-semibold text-white transition-all duration-150 hover:-translate-y-1 hover:shadow-lg inline-block w-full" }, [
                            createTextVNode(" Change Avatar "),
                            createVNode("input", {
                              type: "file",
                              class: "hidden",
                              accept: "image/*",
                              onChange: handleAvatarChange
                            }, null, 32)
                          ]),
                          createVNode("p", { class: "text-xs text-gray-500 mt-2" }, " Max size: 2MB ")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "rounded-2xl bg-white p-4 sm:p-6 shadow-md lg:col-span-2" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submitForm, ["prevent"]),
                        class: "space-y-5"
                      }, [
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg font-semibold text-gray-800 mb-4 pb-2 border-b" }, " Basic Information "),
                          createVNode("div", { class: "grid gap-4 sm:gap-5 md:grid-cols-2" }, [
                            createVNode("div", { class: "md:col-span-2 lg:col-span-1" }, [
                              createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700" }, " Full Name * "),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                type: "text",
                                required: "",
                                class: "w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).name]
                              ]),
                              unref(form).errors.name ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-red-500 text-xs mt-1"
                              }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "md:col-span-2 lg:col-span-1" }, [
                              createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700" }, " Email Address * "),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                type: "email",
                                required: "",
                                class: "w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).email]
                              ]),
                              unref(form).errors.email ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-red-500 text-xs mt-1"
                              }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg font-semibold text-gray-800 mb-4 pb-2 border-b" }, " Contact Information "),
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700" }, " Phone Number "),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).phone_no = $event,
                                type: "tel",
                                class: "w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).phone_no]
                              ]),
                              unref(form).errors.phone_no ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-red-500 text-xs mt-1"
                              }, toDisplayString(unref(form).errors.phone_no), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700" }, " Address "),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).address = $event,
                                type: "text",
                                class: "w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).address]
                              ])
                            ]),
                            createVNode("div", { class: "grid gap-4 sm:gap-5 sm:grid-cols-2" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700" }, " State "),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).state = $event,
                                  type: "text",
                                  class: "w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).state]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700" }, " Country "),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).country = $event,
                                  type: "text",
                                  class: "w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).country]
                                ])
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "flex items-center justify-between mb-4 pb-2 border-b" }, [
                            createVNode("h3", { class: "text-lg font-semibold text-gray-800" }, " Change Password "),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => showPasswordFields.value = !showPasswordFields.value,
                              class: "text-sm text-primaryDark font-medium hover:underline"
                            }, toDisplayString(showPasswordFields.value ? "Hide" : "Show"), 9, ["onClick"])
                          ]),
                          showPasswordFields.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-4"
                          }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700" }, " Current Password "),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).current_password = $event,
                                type: "password",
                                placeholder: "Enter current password",
                                class: "w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).current_password]
                              ]),
                              unref(form).errors.current_password ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-red-500 text-xs mt-1"
                              }, toDisplayString(unref(form).errors.current_password), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "grid gap-4 sm:gap-5 sm:grid-cols-2" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700" }, " New Password "),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                  type: "password",
                                  placeholder: "Enter new password",
                                  class: "w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).password]
                                ]),
                                unref(form).errors.password ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-red-500 text-xs mt-1"
                                }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700" }, " Confirm Password "),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                                  type: "password",
                                  placeholder: "Confirm new password",
                                  class: "w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primaryDark transition text-sm sm:text-base"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).password_confirmation]
                                ])
                              ])
                            ]),
                            createVNode("p", { class: "text-xs text-gray-500" }, " Password must be at least 8 characters long ")
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "pt-4 flex flex-col sm:flex-row gap-3 sm:justify-end" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => unref(form).reset(),
                            class: "w-full sm:w-auto rounded-lg px-6 py-2.5 font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 shadow transition-all duration-150 text-sm sm:text-base order-2 sm:order-1"
                          }, " Reset ", 8, ["onClick"]),
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(form).processing,
                            class: "w-full sm:w-auto bg-primaryDark rounded-lg px-6 py-2.5 font-semibold text-white shadow transition-all duration-150 hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-sm sm:text-base order-1 sm:order-2"
                          }, toDisplayString(unref(form).processing ? "Saving..." : "Save Changes"), 9, ["disabled"])
                        ])
                      ], 32)
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
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
