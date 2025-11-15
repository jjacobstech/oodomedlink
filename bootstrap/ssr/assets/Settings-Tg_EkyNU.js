import { defineComponent, ref, unref, withCtx, createVNode, toDisplayString, createTextVNode, withModifiers, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-Bkedh618.js";
import { useForm, Head } from "@inertiajs/vue3";
import "./index-C0qxzyis.js";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "reka-ui";
import "@vueuse/core";
import "lucide-vue-next";
import "./index-CpoN6XoV.js";
import "./ApplicationLogo-BnvHfr9H.js";
import "@solar-icons/vue";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Settings",
  __ssrInlineRender: true,
  setup(__props) {
    const user = {
      name: "Clinikos",
      email: "jclinikos@oodomedlink.com",
      avatar: "/assets/doctor.jpeg",
      phone_no: "+2348012345678",
      address: "24B Victoria Street, Ikeja",
      state: "Lagos",
      country: "Nigeria"
    };
    const form = useForm({
      name: user.name,
      email: user.email,
      avatar: {},
      password: "",
      phone_no: user.phone_no,
      address: user.address,
      state: user.state,
      country: user.country
    });
    const avatarPreview = ref(user.avatar);
    const handleAvatarChange = (event) => {
      const input = event.target;
      if (input.files && input.files[0]) {
        form.avatar = input.files[0];
        avatarPreview.value = URL.createObjectURL(input.files[0]);
      }
    };
    const submitForm = () => {
      form.post(route("clinic.settings.update"), {
        preserveScroll: true,
        onSuccess: () => {
          alert("Settings updated successfully!");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Settings" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full min-h-screen bg-gray-100"${_scopeId}><div class="max-w-5xl p-6 mx-auto"${_scopeId}><div class="mb-8"${_scopeId}><h1 class="text-3xl font-bold text-gray-800"${_scopeId}>Account Settings</h1><p class="text-gray-600"${_scopeId}>Manage your personal and clinic account details</p></div><div class="grid gap-8 md:grid-cols-3"${_scopeId}><div class="p-6 bg-white rounded-2xl shadow-md"${_scopeId}><div class="flex flex-col items-center text-center"${_scopeId}><div class="shadow-4xl shadow-black"${_scopeId}><img${ssrRenderAttr("src", avatarPreview.value)} alt="Profile Avatar" class="w-28 h-28 mb-4 rounded-full object-cover"${_scopeId}></div><h2 class="text-xl font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(unref(form).name)}</h2><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(unref(form).email)}</p><div class="mt-4"${_scopeId}><label class="btn transition-all duration-150 hover:-translate-y-1 text-xl font-extrabold text-white bg-deepgradient rounded-lg cursor-pointer"${_scopeId}> Change Avatar <input type="file" class="hidden" accept="image/*"${_scopeId}></label></div></div></div><div class="p-6 bg-white rounded-2xl shadow-md md:col-span-2"${_scopeId}><form class="space-y-5"${_scopeId}><div class="grid gap-5 md:grid-cols-2"${_scopeId}><div${_scopeId}><label class="block mb-1 text-sm font-medium text-gray-700"${_scopeId}>Full Name</label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deepgreen focus:border-transparent"${_scopeId}></div><div${_scopeId}><label class="block mb-1 text-sm font-medium text-gray-700"${_scopeId}>Email Address</label><input${ssrRenderAttr("value", unref(form).email)} type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deepgreen focus:border-transparent"${_scopeId}></div></div><div class="grid gap-5 md:grid-cols-2"${_scopeId}><div${_scopeId}><label class="block mb-1 text-sm font-medium text-gray-700"${_scopeId}>Phone Number</label><input${ssrRenderAttr("value", unref(form).phone_no)} type="tel" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deepgreen focus:border-transparent"${_scopeId}></div><div${_scopeId}><label class="block mb-1 text-sm font-medium text-gray-700"${_scopeId}>Password</label><input${ssrRenderAttr("value", unref(form).password)} type="password" placeholder="••••••••" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deepgreen focus:border-transparent"${_scopeId}></div></div><div${_scopeId}><label class="block mb-1 text-sm font-medium text-gray-700"${_scopeId}>Address</label><input${ssrRenderAttr("value", unref(form).address)} type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focusffset-deepgreen focus:border-transparent"${_scopeId}></div><div class="grid gap-5 md:grid-cols-2"${_scopeId}><div${_scopeId}><label class="block mb-1 text-sm font-medium text-gray-700"${_scopeId}>State</label><input${ssrRenderAttr("value", unref(form).state)} type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deepgreen focus:border-transparent"${_scopeId}></div><div${_scopeId}><label class="block mb-1 text-sm font-medium text-gray-700"${_scopeId}>Country</label><input${ssrRenderAttr("value", unref(form).country)} type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deepgreen focus:border-transparent"${_scopeId}></div></div><div class="flex justify-end mt-8"${_scopeId}><button type="submit" class="px-6 py-2.5 font-semibold text-white bg-deepgradient rounded-lg shadow hover:-translate-y-1 focus:ring-0 focus:ring-blue-300 transition-all duration-150"${_scopeId}> Save Changes </button></div></form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full min-h-screen bg-gray-100" }, [
                createVNode("div", { class: "max-w-5xl p-6 mx-auto" }, [
                  createVNode("div", { class: "mb-8" }, [
                    createVNode("h1", { class: "text-3xl font-bold text-gray-800" }, "Account Settings"),
                    createVNode("p", { class: "text-gray-600" }, "Manage your personal and clinic account details")
                  ]),
                  createVNode("div", { class: "grid gap-8 md:grid-cols-3" }, [
                    createVNode("div", { class: "p-6 bg-white rounded-2xl shadow-md" }, [
                      createVNode("div", { class: "flex flex-col items-center text-center" }, [
                        createVNode("div", { class: "shadow-4xl shadow-black" }, [
                          createVNode("img", {
                            src: avatarPreview.value,
                            alt: "Profile Avatar",
                            class: "w-28 h-28 mb-4 rounded-full object-cover"
                          }, null, 8, ["src"])
                        ]),
                        createVNode("h2", { class: "text-xl font-semibold text-gray-800" }, toDisplayString(unref(form).name), 1),
                        createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(unref(form).email), 1),
                        createVNode("div", { class: "mt-4" }, [
                          createVNode("label", { class: "btn transition-all duration-150 hover:-translate-y-1 text-xl font-extrabold text-white bg-deepgradient rounded-lg cursor-pointer" }, [
                            createTextVNode(" Change Avatar "),
                            createVNode("input", {
                              type: "file",
                              class: "hidden",
                              accept: "image/*",
                              onChange: handleAvatarChange
                            }, null, 32)
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "p-6 bg-white rounded-2xl shadow-md md:col-span-2" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submitForm, ["prevent"]),
                        class: "space-y-5"
                      }, [
                        createVNode("div", { class: "grid gap-5 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block mb-1 text-sm font-medium text-gray-700" }, "Full Name"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).name = $event,
                              type: "text",
                              class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deepgreen focus:border-transparent"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).name]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block mb-1 text-sm font-medium text-gray-700" }, "Email Address"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).email = $event,
                              type: "email",
                              class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deepgreen focus:border-transparent"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).email]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "grid gap-5 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block mb-1 text-sm font-medium text-gray-700" }, "Phone Number"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).phone_no = $event,
                              type: "tel",
                              class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deepgreen focus:border-transparent"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).phone_no]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block mb-1 text-sm font-medium text-gray-700" }, "Password"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).password = $event,
                              type: "password",
                              placeholder: "••••••••",
                              class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deepgreen focus:border-transparent"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).password]
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-1 text-sm font-medium text-gray-700" }, "Address"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).address = $event,
                            type: "text",
                            class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focusffset-deepgreen focus:border-transparent"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).address]
                          ])
                        ]),
                        createVNode("div", { class: "grid gap-5 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block mb-1 text-sm font-medium text-gray-700" }, "State"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).state = $event,
                              type: "text",
                              class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deepgreen focus:border-transparent"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).state]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block mb-1 text-sm font-medium text-gray-700" }, "Country"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).country = $event,
                              type: "text",
                              class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deepgreen focus:border-transparent"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).country]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "flex justify-end mt-8" }, [
                          createVNode("button", {
                            type: "submit",
                            class: "px-6 py-2.5 font-semibold text-white bg-deepgradient rounded-lg shadow hover:-translate-y-1 focus:ring-0 focus:ring-blue-300 transition-all duration-150"
                          }, " Save Changes ")
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
