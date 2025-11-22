import { defineComponent, ref, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, withDirectives, vModelText, withModifiers, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-ruQQrsIP.js";
import { Head, router, useForm } from "@inertiajs/vue3";
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
  __name: "Emails",
  __ssrInlineRender: true,
  props: {
    emails: {},
    search: {},
    filter: {},
    error: {}
  },
  setup(__props) {
    const props = __props;
    const selectedFilter = ref(props.filter || "all");
    const searchQuery = ref(props.search || "");
    const previewEmail = ref(null);
    const selectionFilter = ["all", "pending", "sent", "failed", "scheduled"];
    console.log("Props:", props);
    const downloadResult = (file) => {
      window.open(file.file_url, "_blank");
    };
    const applyFilters = (filterValue) => {
      if (filterValue !== void 0) {
        selectedFilter.value = filterValue;
      }
      const payload = {};
      if (selectedFilter.value && selectedFilter.value !== "all") {
        payload.filter = selectedFilter.value;
      }
      if (searchQuery.value && searchQuery.value.trim() !== "") {
        payload.search = searchQuery.value.trim();
      }
      router.get(route("user.emails"), payload, {
        onError: (response) => {
          console.error("Filter error:", response);
        },
        preserveScroll: true,
        preserveState: true
      });
    };
    const clearFilters = () => {
      selectedFilter.value = "all";
      searchQuery.value = "";
      router.get(route("user.emails"), {}, {
        onError: (response) => {
          console.error("Clear error:", response);
        },
        preserveScroll: true,
        preserveState: true
      });
    };
    const goToPage = (url) => {
      if (!url) return;
      router.get(url, {}, {
        preserveScroll: true,
        preserveState: true
      });
    };
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
      const retryForm = useForm({
        id: email.id
      });
      console.log("send");
      console.log(email.patient_email);
      retryForm.post(
        route("user.email.retry"),
        {
          onSuccess: () => {
            alert("Email retry initiated successfully");
          },
          onError: (errors) => {
            console.error("Retry error:", errors);
            alert("Failed to retry email");
          }
        }
      );
    };
    const handleSearchKeydown = (event) => {
      if (event.key === "Enter") {
        applyFilters();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Email Management" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-full w-full bg-gray-100"${_scopeId}><div class="overflow-y-scroll p-6"${_scopeId}><div class="mb-6"${_scopeId}><h1 class="text-3xl font-bold text-gray-800"${_scopeId}> Patient Emails </h1><p class="text-gray-600"${_scopeId}> Monitor and manage all sent emails to patients </p></div><div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"${_scopeId}><div class="flex flex-wrap gap-2 sm:gap-3"${_scopeId}><!--[-->`);
            ssrRenderList(selectionFilter, (selection) => {
              _push2(`<button class="${ssrRenderClass([
                selectedFilter.value === selection ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700",
                "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base font-medium rounded-lg transition-all hover:shadow-md"
              ])}"${_scopeId}>${ssrInterpolate(selection.charAt(0).toUpperCase() + selection.slice(1))}</button>`);
            });
            _push2(`<!--]--></div><div class="flex gap-2 sm:gap-3 justify-between items-center w-full sm:w-auto"${_scopeId}><div class="relative flex-1 sm:flex-initial"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search by patient name..." class="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-primaryDark md:w-80"${_scopeId}><span class="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"${_scopeId}>🔍</span></div><div class="flex gap-2 items-center"${_scopeId}><button class="px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-white transition-all bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg whitespace-nowrap"${_scopeId}> Search </button><button class="px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-white transition-all bg-gray-600 rounded-lg hover:bg-gray-700 hover:shadow-lg whitespace-nowrap"${_scopeId}> Clear </button></div></div></div><div class="mb-4 text-sm text-gray-600"${_scopeId}><p${_scopeId}> Showing ${ssrInterpolate(__props.emails.from || 0)} to ${ssrInterpolate(__props.emails.to || 0)} of ${ssrInterpolate(__props.emails.total)} emails </p></div><div class="overflow-x-auto rounded-xl bg-white shadow-md"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Patient </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Email </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Subject </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Sent At </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Status </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Actions </th></tr></thead><tbody class="divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.emails.data, (email) => {
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-4 py-3 font-medium text-gray-800"${_scopeId}>${ssrInterpolate(email.patient.full_name)}</td><td class="px-4 py-3 text-gray-700"${_scopeId}>${ssrInterpolate(email.patient.email)}</td><td class="max-w-[200px] truncate px-4 py-3 text-gray-700"${_scopeId}>${ssrInterpolate(email.subject)}</td><td class="px-4 py-3 text-gray-600"${_scopeId}>${ssrInterpolate(formatDate(email.sent_at))}</td><td class="px-4 py-3"${_scopeId}><span class="${ssrRenderClass([{
                "bg-green-100 text-green-800": email.status === "sent",
                "bg-red-100 text-red-800": email.status === "failed",
                "bg-orange-100 text-orange-800": email.status === "pending",
                "bg-primaryDark text-white": email.status === "scheduled"
              }, "rounded-full px-3 py-1 text-xs font-semibold capitalize"])}"${_scopeId}>${ssrInterpolate(email.status.replace("_", " "))}</span></td><td class="px-4 py-3"${_scopeId}><div class="flex gap-2"${_scopeId}><button class="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-200"${_scopeId}> View </button>`);
              if (email.status === "failed" || email.status === "scheduled") {
                _push2(`<button class="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 transition hover:bg-red-200"${_scopeId}> Retry </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.emails.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="6" class="px-4 py-8 text-center text-gray-500"${_scopeId}> No emails found. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.emails.last_page > 1) {
              _push2(`<div class="mt-6 flex items-center justify-between"${_scopeId}><button${ssrIncludeBooleanAttr(!__props.emails.prev_page_url) ? " disabled" : ""} class="rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed"${_scopeId}> Previous </button><span class="text-sm text-gray-600"${_scopeId}> Page ${ssrInterpolate(__props.emails.current_page)} of ${ssrInterpolate(__props.emails.last_page)}</span><button${ssrIncludeBooleanAttr(!__props.emails.next_page_url) ? " disabled" : ""} class="rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed"${_scopeId}> Next </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (previewEmail.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"${_scopeId}><div class="w-full max-w-4xl p-6 bg-white rounded-xl max-h-[90vh] overflow-y-auto"${_scopeId}><div class="mb-4 flex items-center justify-between"${_scopeId}><h3 class="text-2xl font-bold text-gray-800"${_scopeId}>${ssrInterpolate(previewEmail.value.subject)}</h3><button class="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"${_scopeId}> Close </button></div><div class="mb-4 text-sm text-gray-600 space-y-1"${_scopeId}><p${_scopeId}><strong${_scopeId}>To:</strong> ${ssrInterpolate(previewEmail.value.patient.full_name)} (${ssrInterpolate(previewEmail.value.patient_email)}) </p><p${_scopeId}><strong${_scopeId}>Sent:</strong> ${ssrInterpolate(formatDate(previewEmail.value.sent_at))}</p><p${_scopeId}><strong${_scopeId}>Status:</strong><span class="${ssrRenderClass([{
                "text-green-700": previewEmail.value.status === "sent",
                "text-red-700": previewEmail.value.status === "failed",
                "text-orange-700": previewEmail.value.status === "pending",
                "bg-primaryDark text-white": previewEmail.value.status === "scheduled"
              }, "font-semibold capitalize"])}"${_scopeId}>${ssrInterpolate(previewEmail.value.status.replace("_", " "))}</span></p></div><div class="rounded-lg bg-gray-50 p-4 text-gray-700 mb-4"${_scopeId}><p class="whitespace-pre-wrap"${_scopeId}>${ssrInterpolate(previewEmail.value.message_preview)}</p></div>`);
              if (previewEmail.value.result && previewEmail.value.result.files && previewEmail.value.result.files.length > 0) {
                _push2(`<div class="space-y-4"${_scopeId}><h4 class="text-lg font-semibold text-gray-800"${_scopeId}> Attachments </h4><!--[-->`);
                ssrRenderList(previewEmail.value.result.files, (file) => {
                  _push2(`<div class="flex items-center justify-center p-8 bg-gray-100 rounded-lg"${_scopeId}>`);
                  if (file.file_type === "image/png" || file.file_type === "image/jpg" || file.file_type === "image/jpeg") {
                    _push2(`<div class="text-center w-full"${_scopeId}><img${ssrRenderAttr("src", file.file_url)}${ssrRenderAttr("alt", file.original_file_name)} class="max-w-full max-h-96 mx-auto rounded-lg shadow"${_scopeId}><button class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"${_scopeId}> Download Image </button></div>`);
                  } else if (file.file_type === "application/pdf") {
                    _push2(`<div class="text-center w-full"${_scopeId}><iframe${ssrRenderAttr("src", file.file_url)} class="w-full h-96 rounded-lg"${_scopeId}></iframe><button class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"${_scopeId}> Download PDF </button></div>`);
                  } else {
                    _push2(`<div class="text-center"${_scopeId}><span class="text-6xl"${_scopeId}>📄</span><p class="mt-4 text-gray-600 font-medium"${_scopeId}>${ssrInterpolate(file.original_file_name)}</p><button class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"${_scopeId}> Download File </button></div>`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "h-full w-full bg-gray-100" }, [
                createVNode("div", { class: "overflow-y-scroll p-6" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("h1", { class: "text-3xl font-bold text-gray-800" }, " Patient Emails "),
                    createVNode("p", { class: "text-gray-600" }, " Monitor and manage all sent emails to patients ")
                  ]),
                  createVNode("div", { class: "mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between" }, [
                    createVNode("div", { class: "flex flex-wrap gap-2 sm:gap-3" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(selectionFilter, (selection) => {
                        return createVNode("button", {
                          key: selection,
                          onClick: ($event) => applyFilters(selection),
                          class: [
                            selectedFilter.value === selection ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700",
                            "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base font-medium rounded-lg transition-all hover:shadow-md"
                          ]
                        }, toDisplayString(selection.charAt(0).toUpperCase() + selection.slice(1)), 11, ["onClick"]);
                      }), 64))
                    ]),
                    createVNode("div", { class: "flex gap-2 sm:gap-3 justify-between items-center w-full sm:w-auto" }, [
                      createVNode("div", { class: "relative flex-1 sm:flex-initial" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          type: "text",
                          placeholder: "Search by patient name...",
                          onKeydown: handleSearchKeydown,
                          class: "w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-primaryDark md:w-80"
                        }, null, 40, ["onUpdate:modelValue"]), [
                          [vModelText, searchQuery.value]
                        ]),
                        createVNode("span", { class: "absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" }, "🔍")
                      ]),
                      createVNode("div", { class: "flex gap-2 items-center" }, [
                        createVNode("button", {
                          onClick: ($event) => applyFilters(),
                          class: "px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-white transition-all bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg whitespace-nowrap"
                        }, " Search ", 8, ["onClick"]),
                        createVNode("button", {
                          onClick: clearFilters,
                          class: "px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-white transition-all bg-gray-600 rounded-lg hover:bg-gray-700 hover:shadow-lg whitespace-nowrap"
                        }, " Clear ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mb-4 text-sm text-gray-600" }, [
                    createVNode("p", null, " Showing " + toDisplayString(__props.emails.from || 0) + " to " + toDisplayString(__props.emails.to || 0) + " of " + toDisplayString(__props.emails.total) + " emails ", 1)
                  ]),
                  createVNode("div", { class: "overflow-x-auto rounded-xl bg-white shadow-md" }, [
                    createVNode("table", { class: "w-full text-sm" }, [
                      createVNode("thead", { class: "bg-gray-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Patient "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Email "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Subject "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Sent At "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Status "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Actions ")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-gray-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.emails.data, (email) => {
                          return openBlock(), createBlock("tr", {
                            key: email.id,
                            class: "hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "px-4 py-3 font-medium text-gray-800" }, toDisplayString(email.patient.full_name), 1),
                            createVNode("td", { class: "px-4 py-3 text-gray-700" }, toDisplayString(email.patient.email), 1),
                            createVNode("td", { class: "max-w-[200px] truncate px-4 py-3 text-gray-700" }, toDisplayString(email.subject), 1),
                            createVNode("td", { class: "px-4 py-3 text-gray-600" }, toDisplayString(formatDate(email.sent_at)), 1),
                            createVNode("td", { class: "px-4 py-3" }, [
                              createVNode("span", {
                                class: [{
                                  "bg-green-100 text-green-800": email.status === "sent",
                                  "bg-red-100 text-red-800": email.status === "failed",
                                  "bg-orange-100 text-orange-800": email.status === "pending",
                                  "bg-primaryDark text-white": email.status === "scheduled"
                                }, "rounded-full px-3 py-1 text-xs font-semibold capitalize"]
                              }, toDisplayString(email.status.replace("_", " ")), 3)
                            ]),
                            createVNode("td", { class: "px-4 py-3" }, [
                              createVNode("div", { class: "flex gap-2" }, [
                                createVNode("button", {
                                  onClick: ($event) => previewEmail.value = email,
                                  class: "rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-200"
                                }, " View ", 8, ["onClick"]),
                                email.status === "failed" || email.status === "scheduled" ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => retryEmail(email),
                                  class: "rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 transition hover:bg-red-200"
                                }, " Retry ", 8, ["onClick"])) : createCommentVNode("", true)
                              ])
                            ])
                          ]);
                        }), 128)),
                        __props.emails.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "6",
                            class: "px-4 py-8 text-center text-gray-500"
                          }, " No emails found. ")
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  __props.emails.last_page > 1 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-6 flex items-center justify-between"
                  }, [
                    createVNode("button", {
                      onClick: ($event) => goToPage(__props.emails.prev_page_url),
                      disabled: !__props.emails.prev_page_url,
                      class: "rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    }, " Previous ", 8, ["onClick", "disabled"]),
                    createVNode("span", { class: "text-sm text-gray-600" }, " Page " + toDisplayString(__props.emails.current_page) + " of " + toDisplayString(__props.emails.last_page), 1),
                    createVNode("button", {
                      onClick: ($event) => goToPage(__props.emails.next_page_url),
                      disabled: !__props.emails.next_page_url,
                      class: "rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    }, " Next ", 8, ["onClick", "disabled"])
                  ])) : createCommentVNode("", true),
                  previewEmail.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",
                    onClick: withModifiers(($event) => previewEmail.value = null, ["self"])
                  }, [
                    createVNode("div", { class: "w-full max-w-4xl p-6 bg-white rounded-xl max-h-[90vh] overflow-y-auto" }, [
                      createVNode("div", { class: "mb-4 flex items-center justify-between" }, [
                        createVNode("h3", { class: "text-2xl font-bold text-gray-800" }, toDisplayString(previewEmail.value.subject), 1),
                        createVNode("button", {
                          onClick: ($event) => previewEmail.value = null,
                          class: "rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                        }, " Close ", 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "mb-4 text-sm text-gray-600 space-y-1" }, [
                        createVNode("p", null, [
                          createVNode("strong", null, "To:"),
                          createTextVNode(" " + toDisplayString(previewEmail.value.patient.full_name) + " (" + toDisplayString(previewEmail.value.patient_email) + ") ", 1)
                        ]),
                        createVNode("p", null, [
                          createVNode("strong", null, "Sent:"),
                          createTextVNode(" " + toDisplayString(formatDate(previewEmail.value.sent_at)), 1)
                        ]),
                        createVNode("p", null, [
                          createVNode("strong", null, "Status:"),
                          createVNode("span", {
                            class: [{
                              "text-green-700": previewEmail.value.status === "sent",
                              "text-red-700": previewEmail.value.status === "failed",
                              "text-orange-700": previewEmail.value.status === "pending",
                              "bg-primaryDark text-white": previewEmail.value.status === "scheduled"
                            }, "font-semibold capitalize"]
                          }, toDisplayString(previewEmail.value.status.replace("_", " ")), 3)
                        ])
                      ]),
                      createVNode("div", { class: "rounded-lg bg-gray-50 p-4 text-gray-700 mb-4" }, [
                        createVNode("p", { class: "whitespace-pre-wrap" }, toDisplayString(previewEmail.value.message_preview), 1)
                      ]),
                      previewEmail.value.result && previewEmail.value.result.files && previewEmail.value.result.files.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-4"
                      }, [
                        createVNode("h4", { class: "text-lg font-semibold text-gray-800" }, " Attachments "),
                        (openBlock(true), createBlock(Fragment, null, renderList(previewEmail.value.result.files, (file) => {
                          return openBlock(), createBlock("div", {
                            key: file.id,
                            class: "flex items-center justify-center p-8 bg-gray-100 rounded-lg"
                          }, [
                            file.file_type === "image/png" || file.file_type === "image/jpg" || file.file_type === "image/jpeg" ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center w-full"
                            }, [
                              createVNode("img", {
                                src: file.file_url,
                                alt: file.original_file_name,
                                class: "max-w-full max-h-96 mx-auto rounded-lg shadow"
                              }, null, 8, ["src", "alt"]),
                              createVNode("button", {
                                onClick: ($event) => downloadResult(file),
                                class: "px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                              }, " Download Image ", 8, ["onClick"])
                            ])) : file.file_type === "application/pdf" ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "text-center w-full"
                            }, [
                              createVNode("iframe", {
                                src: file.file_url,
                                class: "w-full h-96 rounded-lg"
                              }, null, 8, ["src"]),
                              createVNode("button", {
                                onClick: ($event) => downloadResult(file),
                                class: "px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                              }, " Download PDF ", 8, ["onClick"])
                            ])) : (openBlock(), createBlock("div", {
                              key: 2,
                              class: "text-center"
                            }, [
                              createVNode("span", { class: "text-6xl" }, "📄"),
                              createVNode("p", { class: "mt-4 text-gray-600 font-medium" }, toDisplayString(file.original_file_name), 1),
                              createVNode("button", {
                                onClick: ($event) => downloadResult(file),
                                class: "px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                              }, " Download File ", 8, ["onClick"])
                            ]))
                          ]);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ])
                  ], 8, ["onClick"])) : createCommentVNode("", true)
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
