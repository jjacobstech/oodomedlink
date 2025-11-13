import { defineComponent, ref, computed, unref, withCtx, createVNode, createBlock, createCommentVNode, withDirectives, vModelText, openBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-BGtG9d5z.js";
import { Head } from "@inertiajs/vue3";
import "./index-BuLlIqzt.js";
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
  __name: "Emails",
  __ssrInlineRender: true,
  props: {
    emails: {}
  },
  setup(__props) {
    const props = __props;
    const selectedFilter = ref("all");
    const searchQuery = ref("");
    const previewEmail = ref(null);
    const mockEmails = props.emails || [
      {
        id: 1,
        patient_name: "John Doe",
        email: "john.doe@example.com",
        subject: "Blood Test Results",
        sent_at: "2025-11-05T09:30:00",
        status: "sent",
        message_preview: "Your blood test results are now available..."
      },
      {
        id: 2,
        patient_name: "Jane Smith",
        email: "jane.smith@example.com",
        subject: "X-Ray Review Pending",
        sent_at: "2025-11-05T10:15:00",
        status: "in_progress",
        message_preview: "Your X-Ray report is currently under review..."
      },
      {
        id: 3,
        patient_name: "Mike Johnson",
        email: "mike.j@example.com",
        subject: "Lab Analysis Error",
        sent_at: "2025-11-04T13:45:00",
        status: "failed",
        message_preview: "We encountered an issue sending your lab results..."
      }
    ];
    const filteredEmails = computed(() => {
      let filtered = mockEmails;
      if (selectedFilter.value !== "all") {
        filtered = filtered.filter((e) => e.status === selectedFilter.value);
      }
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (e) => e.patient_name.toLowerCase().includes(query) || e.email.toLowerCase().includes(query) || e.subject.toLowerCase().includes(query)
        );
      }
      return filtered;
    });
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const retryEmail = (email) => {
      alert(`Retrying email to ${email.patient_name}...`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Email Management" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full h-full bg-gray-100"${_scopeId}><div class="p-6 overflow-y-scroll"${_scopeId}><div class="mb-6"${_scopeId}><h1 class="text-3xl font-bold text-gray-800"${_scopeId}>Patient Emails</h1><p class="text-gray-600"${_scopeId}>Monitor and manage all sent emails to patients</p></div><div class="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between"${_scopeId}><div class="flex gap-2"${_scopeId}><button class="${ssrRenderClass([selectedFilter.value === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700", "px-4 py-2 font-medium rounded-lg transition-colors"])}"${_scopeId}>All</button><button class="${ssrRenderClass([selectedFilter.value === "in_progress" ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700", "px-4 py-2 font-medium rounded-lg transition-colors"])}"${_scopeId}>In Progress</button><button class="${ssrRenderClass([selectedFilter.value === "sent" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700", "px-4 py-2 font-medium rounded-lg transition-colors"])}"${_scopeId}>Sent</button><button class="${ssrRenderClass([selectedFilter.value === "failed" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700", "px-4 py-2 font-medium rounded-lg transition-colors"])}"${_scopeId}>Failed</button></div><div class="relative"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search by patient, email, or subject..." class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg md:w-80 focus:ring-2 focus:ring-blue-500 focus:border-transparent"${_scopeId}><span class="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"${_scopeId}>🔍</span></div></div><div class="overflow-x-auto bg-white rounded-xl shadow-md"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"${_scopeId}> Patient</th><th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"${_scopeId}> Email</th><th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"${_scopeId}> Subject</th><th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"${_scopeId}> Sent At</th><th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"${_scopeId}> Status</th><th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"${_scopeId}> Actions</th></tr></thead><tbody class="divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(filteredEmails.value, (email) => {
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-4 py-3 font-medium text-gray-800"${_scopeId}>${ssrInterpolate(email.patient_name)}</td><td class="px-4 py-3 text-gray-700"${_scopeId}>${ssrInterpolate(email.email)}</td><td class="px-4 py-3 text-gray-700 truncate max-w-[200px]"${_scopeId}>${ssrInterpolate(email.subject)}</td><td class="px-4 py-3 text-gray-600"${_scopeId}>${ssrInterpolate(formatDate(email.sent_at))}</td><td class="px-4 py-3"${_scopeId}><span class="${ssrRenderClass([{
                "bg-green-100 text-green-800": email.status === "sent",
                "bg-red-100 text-red-800": email.status === "failed",
                "bg-orange-100 text-orange-800": email.status === "in_progress"
              }, "px-3 py-1 text-xs font-semibold rounded-full capitalize"])}"${_scopeId}>${ssrInterpolate(email.status.replace("_", " "))}</span></td><td class="px-4 py-3"${_scopeId}><div class="flex gap-2"${_scopeId}><button class="px-3 py-1 text-xs font-medium text-blue-700 transition bg-blue-100 rounded hover:bg-blue-200"${_scopeId}> View </button>`);
              if (email.status === "failed") {
                _push2(`<button class="px-3 py-1 text-xs font-medium text-red-700 transition bg-red-100 rounded hover:bg-red-200"${_scopeId}> Retry </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (filteredEmails.value.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="6" class="px-4 py-8 text-center text-gray-500"${_scopeId}> No emails found. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (previewEmail.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"${_scopeId}><div class="w-full max-w-2xl p-6 bg-white rounded-xl"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h3 class="text-2xl font-bold text-gray-800"${_scopeId}>${ssrInterpolate(previewEmail.value.subject)}</h3><button class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"${_scopeId}>Close</button></div><div class="mb-4 text-sm text-gray-600"${_scopeId}><p${_scopeId}><strong${_scopeId}>To:</strong> ${ssrInterpolate(previewEmail.value.patient_name)} (${ssrInterpolate(previewEmail.value.email)})</p><p${_scopeId}><strong${_scopeId}>Sent:</strong> ${ssrInterpolate(formatDate(previewEmail.value.sent_at))}</p><p${_scopeId}><strong${_scopeId}>Status:</strong> ${ssrInterpolate(previewEmail.value.status)}</p></div><div class="p-4 bg-gray-50 rounded-lg text-gray-700"${_scopeId}><p${_scopeId}>${ssrInterpolate(previewEmail.value.message_preview)}</p></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full h-full bg-gray-100" }, [
                createVNode("div", { class: "p-6 overflow-y-scroll" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("h1", { class: "text-3xl font-bold text-gray-800" }, "Patient Emails"),
                    createVNode("p", { class: "text-gray-600" }, "Monitor and manage all sent emails to patients")
                  ]),
                  createVNode("div", { class: "flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between" }, [
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode("button", {
                        onClick: ($event) => selectedFilter.value = "all",
                        class: [selectedFilter.value === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700", "px-4 py-2 font-medium rounded-lg transition-colors"]
                      }, "All", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => selectedFilter.value = "in_progress",
                        class: [selectedFilter.value === "in_progress" ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700", "px-4 py-2 font-medium rounded-lg transition-colors"]
                      }, "In Progress", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => selectedFilter.value = "sent",
                        class: [selectedFilter.value === "sent" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700", "px-4 py-2 font-medium rounded-lg transition-colors"]
                      }, "Sent", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => selectedFilter.value = "failed",
                        class: [selectedFilter.value === "failed" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700", "px-4 py-2 font-medium rounded-lg transition-colors"]
                      }, "Failed", 10, ["onClick"])
                    ]),
                    createVNode("div", { class: "relative" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                        type: "text",
                        placeholder: "Search by patient, email, or subject...",
                        class: "w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg md:w-80 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, searchQuery.value]
                      ]),
                      createVNode("span", { class: "absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" }, "🔍")
                    ])
                  ]),
                  createVNode("div", { class: "overflow-x-auto bg-white rounded-xl shadow-md" }, [
                    createVNode("table", { class: "w-full text-sm" }, [
                      createVNode("thead", { class: "bg-gray-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase" }, " Patient"),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase" }, " Email"),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase" }, " Subject"),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase" }, " Sent At"),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase" }, " Status"),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase" }, " Actions")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-gray-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredEmails.value, (email) => {
                          return openBlock(), createBlock("tr", {
                            key: email.id,
                            class: "hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "px-4 py-3 font-medium text-gray-800" }, toDisplayString(email.patient_name), 1),
                            createVNode("td", { class: "px-4 py-3 text-gray-700" }, toDisplayString(email.email), 1),
                            createVNode("td", { class: "px-4 py-3 text-gray-700 truncate max-w-[200px]" }, toDisplayString(email.subject), 1),
                            createVNode("td", { class: "px-4 py-3 text-gray-600" }, toDisplayString(formatDate(email.sent_at)), 1),
                            createVNode("td", { class: "px-4 py-3" }, [
                              createVNode("span", {
                                class: [{
                                  "bg-green-100 text-green-800": email.status === "sent",
                                  "bg-red-100 text-red-800": email.status === "failed",
                                  "bg-orange-100 text-orange-800": email.status === "in_progress"
                                }, "px-3 py-1 text-xs font-semibold rounded-full capitalize"]
                              }, toDisplayString(email.status.replace("_", " ")), 3)
                            ]),
                            createVNode("td", { class: "px-4 py-3" }, [
                              createVNode("div", { class: "flex gap-2" }, [
                                createVNode("button", {
                                  onClick: ($event) => previewEmail.value = email,
                                  class: "px-3 py-1 text-xs font-medium text-blue-700 transition bg-blue-100 rounded hover:bg-blue-200"
                                }, " View ", 8, ["onClick"]),
                                email.status === "failed" ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => retryEmail(email),
                                  class: "px-3 py-1 text-xs font-medium text-red-700 transition bg-red-100 rounded hover:bg-red-200"
                                }, " Retry ", 8, ["onClick"])) : createCommentVNode("", true)
                              ])
                            ])
                          ]);
                        }), 128)),
                        filteredEmails.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "6",
                            class: "px-4 py-8 text-center text-gray-500"
                          }, " No emails found. ")
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  previewEmail.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                  }, [
                    createVNode("div", { class: "w-full max-w-2xl p-6 bg-white rounded-xl" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("h3", { class: "text-2xl font-bold text-gray-800" }, toDisplayString(previewEmail.value.subject), 1),
                        createVNode("button", {
                          onClick: ($event) => previewEmail.value = null,
                          class: "px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                        }, "Close", 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "mb-4 text-sm text-gray-600" }, [
                        createVNode("p", null, [
                          createVNode("strong", null, "To:"),
                          createTextVNode(" " + toDisplayString(previewEmail.value.patient_name) + " (" + toDisplayString(previewEmail.value.email) + ")", 1)
                        ]),
                        createVNode("p", null, [
                          createVNode("strong", null, "Sent:"),
                          createTextVNode(" " + toDisplayString(formatDate(previewEmail.value.sent_at)), 1)
                        ]),
                        createVNode("p", null, [
                          createVNode("strong", null, "Status:"),
                          createTextVNode(" " + toDisplayString(previewEmail.value.status), 1)
                        ])
                      ]),
                      createVNode("div", { class: "p-4 bg-gray-50 rounded-lg text-gray-700" }, [
                        createVNode("p", null, toDisplayString(previewEmail.value.message_preview), 1)
                      ])
                    ])
                  ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Emails.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
