import { defineComponent, ref, unref, withCtx, createVNode, toDisplayString, createTextVNode, withModifiers, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-BaGRR3Gu.js";
import { useForm, Head } from "@inertiajs/vue3";
import "./index-kjwZOeml.js";
import "class-variance-authority";
import "reka-ui";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "lucide-vue-next";
import "./index-D-5AVEXV.js";
import "@solar-icons/vue";
import "./ApplicationLogo-Bxi8t0Nk.js";
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
            _push2(`<div class="min-h-screen w-full bg-gray-100"${_scopeId}><div class="mx-auto max-w-5xl p-6"${_scopeId}><div class="mb-8"${_scopeId}><h1 class="text-3xl font-bold text-gray-800"${_scopeId}> Account Settings </h1><p class="text-gray-600"${_scopeId}> Manage your personal and clinic account details </p></div><div class="grid gap-8 md:grid-cols-3"${_scopeId}><div class="rounded-2xl bg-white p-6 shadow-md"${_scopeId}><div class="flex flex-col items-center text-center"${_scopeId}><div class="shadow-4xl shadow-black"${_scopeId}><img${ssrRenderAttr("src", avatarPreview.value)} alt="Profile Avatar" class="mb-4 h-28 w-28 rounded-full object-cover"${_scopeId}></div><h2 class="text-xl font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(unref(form).name)}</h2><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(unref(form).email)}</p><div class="mt-4"${_scopeId}><label class="bg-deepgradient btn cursor-pointer rounded-lg text-xl font-extrabold text-white transition-all duration-150 hover:-translate-y-1"${_scopeId}> Change Avatar <input type="file" class="hidden" accept="image/*"${_scopeId}></label></div></div></div><div class="rounded-2xl bg-white p-6 shadow-md md:col-span-2"${_scopeId}><form class="space-y-5"${_scopeId}><div class="grid gap-5 md:grid-cols-2"${_scopeId}><div${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Full Name</label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="focus:ring-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"${_scopeId}></div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Email Address</label><input${ssrRenderAttr("value", unref(form).email)} type="email" class="focus:ring-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"${_scopeId}></div></div><div class="grid gap-5 md:grid-cols-2"${_scopeId}><div${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Phone Number</label><input${ssrRenderAttr("value", unref(form).phone_no)} type="tel" class="focus:ring-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"${_scopeId}></div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Password</label><input${ssrRenderAttr("value", unref(form).password)} type="password" placeholder="••••••••" class="focus:ring-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"${_scopeId}></div></div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Address</label><input${ssrRenderAttr("value", unref(form).address)} type="text" class="focusffset-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"${_scopeId}></div><div class="grid gap-5 md:grid-cols-2"${_scopeId}><div${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>State</label><input${ssrRenderAttr("value", unref(form).state)} type="text" class="focus:ring-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"${_scopeId}></div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-gray-700"${_scopeId}>Country</label><input${ssrRenderAttr("value", unref(form).country)} type="text" class="focus:ring-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"${_scopeId}></div></div><div class="mt-8 flex justify-end"${_scopeId}><button type="submit" class="bg-deepgradient rounded-lg px-6 py-2.5 font-semibold text-white shadow transition-all duration-150 hover:-translate-y-1 focus:ring-0 focus:ring-blue-300"${_scopeId}> Save Changes </button></div></form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen w-full bg-gray-100" }, [
                createVNode("div", { class: "mx-auto max-w-5xl p-6" }, [
                  createVNode("div", { class: "mb-8" }, [
                    createVNode("h1", { class: "text-3xl font-bold text-gray-800" }, " Account Settings "),
                    createVNode("p", { class: "text-gray-600" }, " Manage your personal and clinic account details ")
                  ]),
                  createVNode("div", { class: "grid gap-8 md:grid-cols-3" }, [
                    createVNode("div", { class: "rounded-2xl bg-white p-6 shadow-md" }, [
                      createVNode("div", { class: "flex flex-col items-center text-center" }, [
                        createVNode("div", { class: "shadow-4xl shadow-black" }, [
                          createVNode("img", {
                            src: avatarPreview.value,
                            alt: "Profile Avatar",
                            class: "mb-4 h-28 w-28 rounded-full object-cover"
                          }, null, 8, ["src"])
                        ]),
                        createVNode("h2", { class: "text-xl font-semibold text-gray-800" }, toDisplayString(unref(form).name), 1),
                        createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(unref(form).email), 1),
                        createVNode("div", { class: "mt-4" }, [
                          createVNode("label", { class: "bg-deepgradient btn cursor-pointer rounded-lg text-xl font-extrabold text-white transition-all duration-150 hover:-translate-y-1" }, [
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
                    createVNode("div", { class: "rounded-2xl bg-white p-6 shadow-md md:col-span-2" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submitForm, ["prevent"]),
                        class: "space-y-5"
                      }, [
                        createVNode("div", { class: "grid gap-5 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700" }, "Full Name"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).name = $event,
                              type: "text",
                              class: "focus:ring-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).name]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700" }, "Email Address"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).email = $event,
                              type: "email",
                              class: "focus:ring-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).email]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "grid gap-5 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700" }, "Phone Number"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).phone_no = $event,
                              type: "tel",
                              class: "focus:ring-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).phone_no]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700" }, "Password"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).password = $event,
                              type: "password",
                              placeholder: "••••••••",
                              class: "focus:ring-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).password]
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700" }, "Address"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).address = $event,
                            type: "text",
                            class: "focusffset-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).address]
                          ])
                        ]),
                        createVNode("div", { class: "grid gap-5 md:grid-cols-2" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700" }, "State"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).state = $event,
                              type: "text",
                              class: "focus:ring-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).state]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "mb-1 block text-sm font-medium text-gray-700" }, "Country"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).country = $event,
                              type: "text",
                              class: "focus:ring-deepgreen w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).country]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "mt-8 flex justify-end" }, [
                          createVNode("button", {
                            type: "submit",
                            class: "bg-deepgradient rounded-lg px-6 py-2.5 font-semibold text-white shadow transition-all duration-150 hover:-translate-y-1 focus:ring-0 focus:ring-blue-300"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
