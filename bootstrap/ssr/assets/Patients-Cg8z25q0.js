import { defineComponent, ref, computed, unref, withCtx, createVNode, withDirectives, vModelText, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-hu7FW2Vw.js";
import { Head, router } from "@inertiajs/vue3";
import "./index-Ch8fN83j.js";
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
  __name: "Patients",
  __ssrInlineRender: true,
  props: {
    patients: {}
  },
  setup(__props) {
    const props = __props;
    const selectedFilter = ref("all");
    const searchQuery = ref("");
    ref(null);
    ref(false);
    const filteredPatients = computed(() => {
      let filtered = props.patients;
      if (selectedFilter.value !== "all") {
        filtered = filtered?.filter((p) => p.gender === selectedFilter.value);
      }
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered?.filter(
          (p) => p.full_name.toLowerCase().includes(query) || p.email.toLowerCase().includes(query) || p.phone.toLowerCase().includes(query)
        );
      }
      return filtered;
    });
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const viewPatientResults = (patient) => {
      router.visit(`/clinic/patients/${patient.id}/results`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Manage Patients" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full bg-gray-100 px-10 pt-5"${_scopeId}><div class="overflow-y-scroll p-6"${_scopeId}><div class="flex justify-between"${_scopeId}><div class="mb-6"${_scopeId}><h1 class="text-3xl font-bold text-gray-800"${_scopeId}> Patients Management </h1><p class="text-gray-600"${_scopeId}> View and manage all registered patients and their test results </p></div><div${_scopeId}><button class="btn rounded-md bg-primary px-10 py-7 text-2xl text-white transition-all duration-150 hover:-translate-y-1"${_scopeId}> Add Patient </button></div></div><div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"${_scopeId}><div class="flex gap-2"${_scopeId}><button class="${ssrRenderClass([
              selectedFilter.value === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700",
              "rounded-lg px-4 py-2 font-medium transition-colors"
            ])}"${_scopeId}> All </button><button class="${ssrRenderClass([
              selectedFilter.value === "Male" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700",
              "rounded-lg px-4 py-2 font-medium transition-colors"
            ])}"${_scopeId}> Male </button><button class="${ssrRenderClass([
              selectedFilter.value === "Female" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700",
              "rounded-lg px-4 py-2 font-medium transition-colors"
            ])}"${_scopeId}> Female </button></div><div class="relative"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search by name, email or phone..." class="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 md:w-80"${_scopeId}><span class="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"${_scopeId}>🔍</span></div></div><div class="overflow-x-auto rounded-xl bg-white shadow-md"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Name </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Email </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Phone </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Gender </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Date of Birth </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Address </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Total Results </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Last Result </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Actions </th></tr></thead><tbody class="divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(filteredPatients.value, (patient) => {
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-4 py-3 font-medium text-gray-800"${_scopeId}>${ssrInterpolate(patient.full_name)}</td><td class="px-4 py-3 text-gray-700"${_scopeId}>${ssrInterpolate(patient.email)}</td><td class="px-4 py-3 text-gray-700"${_scopeId}>${ssrInterpolate(patient.phone ?? "N/A")}</td><td class="px-4 py-3 text-gray-700"${_scopeId}>${ssrInterpolate(patient.gender ?? "N/A")}</td><td class="px-4 py-3 text-gray-700"${_scopeId}>${ssrInterpolate(patient.date_of_birth ? formatDate(patient.date_of_birth) : "N/A")}</td><td class="px-4 py-3 text-gray-700"${_scopeId}>${ssrInterpolate(patient.address ?? "N/A")}</td><td class="px-4 py-3 text-center text-gray-700"${_scopeId}>${ssrInterpolate(patient.total_results ?? "N/A")}</td><td class="px-4 py-3 text-gray-600"${_scopeId}>${ssrInterpolate(formatDate(patient.last_result_date) ?? "N/A")}</td><td class="px-4 py-3"${_scopeId}><button class="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-200"${_scopeId}> View Results </button></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (filteredPatients.value?.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="8" class="px-4 py-8 text-center text-gray-500"${_scopeId}> No patients found. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full bg-gray-100 px-10 pt-5" }, [
                createVNode("div", { class: "overflow-y-scroll p-6" }, [
                  createVNode("div", { class: "flex justify-between" }, [
                    createVNode("div", { class: "mb-6" }, [
                      createVNode("h1", { class: "text-3xl font-bold text-gray-800" }, " Patients Management "),
                      createVNode("p", { class: "text-gray-600" }, " View and manage all registered patients and their test results ")
                    ]),
                    createVNode("div", null, [
                      createVNode("button", { class: "btn rounded-md bg-primary px-10 py-7 text-2xl text-white transition-all duration-150 hover:-translate-y-1" }, " Add Patient ")
                    ])
                  ]),
                  createVNode("div", { class: "mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between" }, [
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode("button", {
                        onClick: ($event) => selectedFilter.value = "all",
                        class: [
                          selectedFilter.value === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700",
                          "rounded-lg px-4 py-2 font-medium transition-colors"
                        ]
                      }, " All ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => selectedFilter.value = "Male",
                        class: [
                          selectedFilter.value === "Male" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700",
                          "rounded-lg px-4 py-2 font-medium transition-colors"
                        ]
                      }, " Male ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => selectedFilter.value = "Female",
                        class: [
                          selectedFilter.value === "Female" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700",
                          "rounded-lg px-4 py-2 font-medium transition-colors"
                        ]
                      }, " Female ", 10, ["onClick"])
                    ]),
                    createVNode("div", { class: "relative" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                        type: "text",
                        placeholder: "Search by name, email or phone...",
                        class: "w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 md:w-80"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, searchQuery.value]
                      ]),
                      createVNode("span", { class: "absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" }, "🔍")
                    ])
                  ]),
                  createVNode("div", { class: "overflow-x-auto rounded-xl bg-white shadow-md" }, [
                    createVNode("table", { class: "w-full text-sm" }, [
                      createVNode("thead", { class: "bg-gray-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Name "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Email "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Phone "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Gender "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Date of Birth "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Address "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Total Results "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Last Result "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Actions ")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-gray-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredPatients.value, (patient) => {
                          return openBlock(), createBlock("tr", {
                            key: patient.id,
                            class: "hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "px-4 py-3 font-medium text-gray-800" }, toDisplayString(patient.full_name), 1),
                            createVNode("td", { class: "px-4 py-3 text-gray-700" }, toDisplayString(patient.email), 1),
                            createVNode("td", { class: "px-4 py-3 text-gray-700" }, toDisplayString(patient.phone ?? "N/A"), 1),
                            createVNode("td", { class: "px-4 py-3 text-gray-700" }, toDisplayString(patient.gender ?? "N/A"), 1),
                            createVNode("td", { class: "px-4 py-3 text-gray-700" }, toDisplayString(patient.date_of_birth ? formatDate(patient.date_of_birth) : "N/A"), 1),
                            createVNode("td", { class: "px-4 py-3 text-gray-700" }, toDisplayString(patient.address ?? "N/A"), 1),
                            createVNode("td", { class: "px-4 py-3 text-center text-gray-700" }, toDisplayString(patient.total_results ?? "N/A"), 1),
                            createVNode("td", { class: "px-4 py-3 text-gray-600" }, toDisplayString(formatDate(patient.last_result_date) ?? "N/A"), 1),
                            createVNode("td", { class: "px-4 py-3" }, [
                              createVNode("button", {
                                onClick: ($event) => viewPatientResults(patient),
                                class: "rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-200"
                              }, " View Results ", 8, ["onClick"])
                            ])
                          ]);
                        }), 128)),
                        filteredPatients.value?.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "8",
                            class: "px-4 py-8 text-center text-gray-500"
                          }, " No patients found. ")
                        ])) : createCommentVNode("", true)
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
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Patients.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
