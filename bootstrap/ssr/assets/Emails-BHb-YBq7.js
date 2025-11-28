import { defineComponent, ref, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, withDirectives, vModelText, createTextVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-CJ-x_78P.js";
import { Head, router, useForm } from "@inertiajs/vue3";
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
import "./index-D9olpTuq.js";
import "axios";
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
    const retrying = ref(null);
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
        preserveScroll: true,
        preserveState: true,
        onError: (response) => {
        }
      });
    };
    const clearFilters = () => {
      selectedFilter.value = "all";
      searchQuery.value = "";
      router.get(
        route("user.emails"),
        {},
        {
          preserveScroll: true,
          preserveState: true
        }
      );
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
      if (retrying.value) return;
      retrying.value = email.id;
      const retryForm = useForm({
        id: email.id
      });
      retryForm.post(route("user.email.retry"), {
        onSuccess: () => {
          retrying.value = null;
          router.reload({
            only: ["emails", "filter"]
          });
        },
        onError: (errors) => {
          retrying.value = null;
        },
        preserveScroll: true,
        preserveUrl: selectedFilter.value !== "all" ? true : false
      });
    };
    const handleSearchKeydown = (event) => {
      if (event.key === "Enter") {
        applyFilters();
      }
    };
    const formatFileSize = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Email Management" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex w-full gap-1 h-full overflow-y-hidden bg-primaryLight"${_scopeId}><div class="overflow-y-scroll w-full p-4 sm:p-6"${_scopeId}><div class="mb-6"${_scopeId}><h1 class="text-2xl sm:text-3xl font-bold text-gray-800"${_scopeId}> Patient Emails </h1><p class="text-sm sm:text-base text-gray-600 mt-1"${_scopeId}> Monitor and manage all sent emails to patients </p></div><div class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"${_scopeId}><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(selectionFilter, (selection) => {
              _push2(`<button class="${ssrRenderClass([
                selectedFilter.value === selection ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700",
                "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all hover:shadow-md capitalize"
              ])}"${_scopeId}>${ssrInterpolate(selection)}</button>`);
            });
            _push2(`<!--]--></div><div class="flex flex-col sm:flex-row gap-2 w-full lg:w-auto"${_scopeId}><div class="relative flex-1 lg:flex-initial"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search by patient name..." class="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-primaryDark lg:w-80"${_scopeId}><span class="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"${_scopeId}>🔍</span></div><div class="flex gap-2"${_scopeId}><button class="flex-1 sm:flex-initial px-4 py-2 text-sm font-semibold text-white bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg transition whitespace-nowrap"${_scopeId}> Search </button><button class="flex-1 sm:flex-initial px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-700 hover:shadow-lg transition whitespace-nowrap"${_scopeId}> Clear </button></div></div></div><div class="mb-4 text-xs sm:text-sm text-gray-600"${_scopeId}><p${_scopeId}> Showing ${ssrInterpolate(__props.emails.from || 0)} to ${ssrInterpolate(__props.emails.to || 0)} of ${ssrInterpolate(__props.emails.total)} emails </p></div><div class="lg:hidden space-y-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.emails.data, (email) => {
              _push2(`<div class="bg-white rounded-xl shadow-md p-4 space-y-3"${_scopeId}><div class="flex justify-between items-start"${_scopeId}><div class="flex-1 min-w-0"${_scopeId}><h3 class="${ssrRenderClass([
                email.patient ? "text-gray-800" : "text-red-800",
                "font-semibold text-gray-800 truncate"
              ])}"${_scopeId}>${ssrInterpolate(email.patient === null ? "Deleted Patient" : email.patient.full_name)}</h3><p class="text-sm text-gray-600 truncate"${_scopeId}>${ssrInterpolate(email.patient === null ? "Deleted Patient" : email.patient.email)}</p></div><span class="${ssrRenderClass([{
                "bg-green-100 text-green-800": email.status === "sent",
                "bg-red-100 text-red-800": email.status === "failed",
                "bg-orange-100 text-orange-800": email.status === "pending",
                "bg-primaryDark text-white": email.status === "scheduled"
              }, "rounded-full px-2.5 py-1 text-xs font-semibold capitalize whitespace-nowrap ml-2"])}"${_scopeId}>${ssrInterpolate(email.status)}</span></div><div class="space-y-1 text-sm"${_scopeId}><p class="text-gray-700 truncate"${_scopeId}><span class="font-medium"${_scopeId}>Subject:</span> ${ssrInterpolate(email.subject)}</p><p class="text-gray-600 text-xs"${_scopeId}>${ssrInterpolate(formatDate(email.sent_at))}</p></div><div class="flex gap-2 pt-2"${_scopeId}>`);
              if (email.patient) {
                _push2(`<button class="flex-1 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-200"${_scopeId}> View Details </button>`);
              } else {
                _push2(`<!---->`);
              }
              if (email.status === "failed" || email.status === "scheduled") {
                _push2(`<button${ssrIncludeBooleanAttr(retrying.value === email.id) ? " disabled" : ""} class="flex-1 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}>${ssrInterpolate(retrying.value === email.id ? "Retrying..." : "Retry")}</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            });
            _push2(`<!--]-->`);
            if (__props.emails.data.length === 0) {
              _push2(`<div class="bg-white rounded-xl shadow-md p-8 text-center text-gray-500"${_scopeId}><div class="text-4xl mb-2"${_scopeId}>📧</div><p${_scopeId}>No emails found.</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="hidden lg:block overflow-x-auto rounded-xl bg-white shadow-md"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Patient </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Email </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Subject </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Sent At </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Status </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Actions </th></tr></thead><tbody class="divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.emails.data, (email) => {
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="${ssrRenderClass([
                email.patient ? "text-gray-800" : "text-red-800",
                "px-4 py-3 font-medium"
              ])}"${_scopeId}>${ssrInterpolate(email.patient === null ? "Deleted Patient" : email.patient.full_name)}</td><td class="${ssrRenderClass([
                email.patient ? "text-gray-800" : "text-red-800",
                "px-4 py-3 font-medium"
              ])}"${_scopeId}>${ssrInterpolate(email.patient === null ? "Deleted Patient" : email.patient.email)}</td><td class="max-w-[200px] truncate px-4 py-3 text-gray-700"${_scopeId}>${ssrInterpolate(email.subject)}</td><td class="px-4 py-3 text-gray-600"${_scopeId}>${ssrInterpolate(formatDate(email.sent_at))}</td><td class="px-4 py-3"${_scopeId}><span class="${ssrRenderClass([{
                "bg-green-100 text-green-800": email.status === "sent",
                "bg-red-100 text-red-800": email.status === "failed",
                "bg-orange-100 text-orange-800": email.status === "pending",
                "bg-primaryDark text-white": email.status === "scheduled"
              }, "rounded-full px-3 py-1 text-xs font-semibold capitalize"])}"${_scopeId}>${ssrInterpolate(email.status)}</span></td><td class="px-4 py-3"${_scopeId}><div class="flex gap-2"${_scopeId}>`);
              if (email.patient) {
                _push2(`<button class="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-200"${_scopeId}> View </button>`);
              } else {
                _push2(`<!---->`);
              }
              if (email.status === "failed" || email.status === "scheduled") {
                _push2(`<button${ssrIncludeBooleanAttr(retrying.value === email.id) ? " disabled" : ""} class="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 transition hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}>${ssrInterpolate(retrying.value === email.id ? "Retrying..." : "Retry")}</button>`);
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
              _push2(`<div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4"${_scopeId}><button${ssrIncludeBooleanAttr(!__props.emails.prev_page_url) ? " disabled" : ""} class="w-full sm:w-auto rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed"${_scopeId}> Previous </button><span class="text-sm text-gray-600"${_scopeId}> Page ${ssrInterpolate(__props.emails.current_page)} of ${ssrInterpolate(__props.emails.last_page)}</span><button${ssrIncludeBooleanAttr(!__props.emails.next_page_url) ? " disabled" : ""} class="w-full sm:w-auto rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed"${_scopeId}> Next </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (previewEmail.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"${_scopeId}><div class="w-full max-w-4xl bg-white rounded-xl max-h-[90vh] overflow-y-auto"${_scopeId}><div class="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-start justify-between gap-4"${_scopeId}><h3 class="text-lg sm:text-2xl font-bold text-gray-800 break-words flex-1"${_scopeId}>${ssrInterpolate(previewEmail.value.subject)}</h3><button class="flex-shrink-0 rounded-lg bg-gray-200 px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 transition"${_scopeId}> Close </button></div><div class="p-4 sm:p-6 space-y-6"${_scopeId}><div class="text-sm sm:text-base text-gray-600 space-y-2"${_scopeId}><p class="break-words"${_scopeId}><strong${_scopeId}>To:</strong> ${ssrInterpolate(previewEmail.value.patient?.full_name)} (${ssrInterpolate(previewEmail.value.patient_email)}) </p><p${_scopeId}><strong${_scopeId}>Sent:</strong> ${ssrInterpolate(formatDate(previewEmail.value.sent_at))}</p><p${_scopeId}><strong${_scopeId}>Status:</strong><span class="${ssrRenderClass([{
                "text-green-700": previewEmail.value.status === "sent",
                "text-red-700": previewEmail.value.status === "failed",
                "text-orange-700": previewEmail.value.status === "pending",
                "text-primaryDark": previewEmail.value.status === "scheduled"
              }, "font-semibold capitalize"])}"${_scopeId}>${ssrInterpolate(previewEmail.value.status)}</span></p>`);
              if (previewEmail.value.delivery_attempts > 1) {
                _push2(`<p${_scopeId}><strong${_scopeId}>Delivery Attempts:</strong> ${ssrInterpolate(previewEmail.value.delivery_attempts)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="rounded-lg bg-gray-50 p-4 text-sm sm:text-base text-gray-700"${_scopeId}><p class="whitespace-pre-wrap break-words"${_scopeId}>${ssrInterpolate(previewEmail.value.message_preview)}</p></div>`);
              if (previewEmail.value.result && previewEmail.value.result.files && previewEmail.value.result.files.length > 0) {
                _push2(`<div class="space-y-4"${_scopeId}><h4 class="text-base sm:text-lg font-semibold text-gray-800"${_scopeId}> Attachments (${ssrInterpolate(previewEmail.value.result.files.length)}) </h4><!--[-->`);
                ssrRenderList(previewEmail.value.result.files, (file) => {
                  _push2(`<div class="bg-gray-50 rounded-lg p-4 sm:p-6"${_scopeId}>`);
                  if (file.file_type === "image/png" || file.file_type === "image/jpg" || file.file_type === "image/jpeg") {
                    _push2(`<div class="text-center space-y-4"${_scopeId}><img${ssrRenderAttr("src", file.file_url)}${ssrRenderAttr("alt", file.original_file_name)} class="max-w-full max-h-96 mx-auto rounded-lg shadow"${_scopeId}><div class="flex flex-col sm:flex-row gap-2 justify-center"${_scopeId}><p class="text-sm text-gray-600 break-all"${_scopeId}>${ssrInterpolate(file.original_file_name)}</p><button class="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"${_scopeId}> Download </button></div></div>`);
                  } else if (file.file_type === "application/pdf") {
                    _push2(`<div class="space-y-4"${_scopeId}><iframe${ssrRenderAttr("src", file.file_url)} class="w-full h-96 rounded-lg"${_scopeId}></iframe><div class="flex flex-col sm:flex-row gap-2 justify-center items-center"${_scopeId}><p class="text-sm text-gray-600 break-all text-center"${_scopeId}>${ssrInterpolate(file.original_file_name)}</p><button class="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"${_scopeId}> Download PDF </button></div></div>`);
                  } else {
                    _push2(`<div class="text-center space-y-4"${_scopeId}><span class="text-4xl sm:text-6xl"${_scopeId}>📄</span><p class="text-sm sm:text-base text-gray-600 font-medium break-all px-4"${_scopeId}>${ssrInterpolate(file.original_file_name)}</p><p class="text-xs sm:text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatFileSize(file.file_size))}</p><button class="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"${_scopeId}> Download File </button></div>`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex w-full gap-1 h-full overflow-y-hidden bg-primaryLight" }, [
                createVNode("div", { class: "overflow-y-scroll w-full p-4 sm:p-6" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("h1", { class: "text-2xl sm:text-3xl font-bold text-gray-800" }, " Patient Emails "),
                    createVNode("p", { class: "text-sm sm:text-base text-gray-600 mt-1" }, " Monitor and manage all sent emails to patients ")
                  ]),
                  createVNode("div", { class: "mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" }, [
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(selectionFilter, (selection) => {
                        return createVNode("button", {
                          key: selection,
                          onClick: ($event) => applyFilters(selection),
                          class: [
                            selectedFilter.value === selection ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700",
                            "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all hover:shadow-md capitalize"
                          ]
                        }, toDisplayString(selection), 11, ["onClick"]);
                      }), 64))
                    ]),
                    createVNode("div", { class: "flex flex-col sm:flex-row gap-2 w-full lg:w-auto" }, [
                      createVNode("div", { class: "relative flex-1 lg:flex-initial" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          type: "text",
                          placeholder: "Search by patient name...",
                          onKeydown: handleSearchKeydown,
                          class: "w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-primaryDark lg:w-80"
                        }, null, 40, ["onUpdate:modelValue"]), [
                          [vModelText, searchQuery.value]
                        ]),
                        createVNode("span", { class: "absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" }, "🔍")
                      ]),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode("button", {
                          onClick: ($event) => applyFilters(),
                          class: "flex-1 sm:flex-initial px-4 py-2 text-sm font-semibold text-white bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg transition whitespace-nowrap"
                        }, " Search ", 8, ["onClick"]),
                        createVNode("button", {
                          onClick: clearFilters,
                          class: "flex-1 sm:flex-initial px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-700 hover:shadow-lg transition whitespace-nowrap"
                        }, " Clear ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mb-4 text-xs sm:text-sm text-gray-600" }, [
                    createVNode("p", null, " Showing " + toDisplayString(__props.emails.from || 0) + " to " + toDisplayString(__props.emails.to || 0) + " of " + toDisplayString(__props.emails.total) + " emails ", 1)
                  ]),
                  createVNode("div", { class: "lg:hidden space-y-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.emails.data, (email) => {
                      return openBlock(), createBlock("div", {
                        key: email.id,
                        class: "bg-white rounded-xl shadow-md p-4 space-y-3"
                      }, [
                        createVNode("div", { class: "flex justify-between items-start" }, [
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("h3", {
                              class: [
                                "font-semibold text-gray-800 truncate",
                                email.patient ? "text-gray-800" : "text-red-800"
                              ]
                            }, toDisplayString(email.patient === null ? "Deleted Patient" : email.patient.full_name), 3),
                            createVNode("p", { class: "text-sm text-gray-600 truncate" }, toDisplayString(email.patient === null ? "Deleted Patient" : email.patient.email), 1)
                          ]),
                          createVNode("span", {
                            class: [{
                              "bg-green-100 text-green-800": email.status === "sent",
                              "bg-red-100 text-red-800": email.status === "failed",
                              "bg-orange-100 text-orange-800": email.status === "pending",
                              "bg-primaryDark text-white": email.status === "scheduled"
                            }, "rounded-full px-2.5 py-1 text-xs font-semibold capitalize whitespace-nowrap ml-2"]
                          }, toDisplayString(email.status), 3)
                        ]),
                        createVNode("div", { class: "space-y-1 text-sm" }, [
                          createVNode("p", { class: "text-gray-700 truncate" }, [
                            createVNode("span", { class: "font-medium" }, "Subject:"),
                            createTextVNode(" " + toDisplayString(email.subject), 1)
                          ]),
                          createVNode("p", { class: "text-gray-600 text-xs" }, toDisplayString(formatDate(email.sent_at)), 1)
                        ]),
                        createVNode("div", { class: "flex gap-2 pt-2" }, [
                          email.patient ? (openBlock(), createBlock("button", {
                            key: 0,
                            onClick: ($event) => previewEmail.value = email,
                            class: "flex-1 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-200"
                          }, " View Details ", 8, ["onClick"])) : createCommentVNode("", true),
                          email.status === "failed" || email.status === "scheduled" ? (openBlock(), createBlock("button", {
                            key: 1,
                            onClick: ($event) => retryEmail(email),
                            disabled: retrying.value === email.id,
                            class: "flex-1 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          }, toDisplayString(retrying.value === email.id ? "Retrying..." : "Retry"), 9, ["onClick", "disabled"])) : createCommentVNode("", true)
                        ])
                      ]);
                    }), 128)),
                    __props.emails.data.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white rounded-xl shadow-md p-8 text-center text-gray-500"
                    }, [
                      createVNode("div", { class: "text-4xl mb-2" }, "📧"),
                      createVNode("p", null, "No emails found.")
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "hidden lg:block overflow-x-auto rounded-xl bg-white shadow-md" }, [
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
                            createVNode("td", {
                              class: [
                                "px-4 py-3 font-medium",
                                email.patient ? "text-gray-800" : "text-red-800"
                              ]
                            }, toDisplayString(email.patient === null ? "Deleted Patient" : email.patient.full_name), 3),
                            createVNode("td", {
                              class: [
                                "px-4 py-3 font-medium",
                                email.patient ? "text-gray-800" : "text-red-800"
                              ]
                            }, toDisplayString(email.patient === null ? "Deleted Patient" : email.patient.email), 3),
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
                              }, toDisplayString(email.status), 3)
                            ]),
                            createVNode("td", { class: "px-4 py-3" }, [
                              createVNode("div", { class: "flex gap-2" }, [
                                email.patient ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => previewEmail.value = email,
                                  class: "rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-200"
                                }, " View ", 8, ["onClick"])) : createCommentVNode("", true),
                                email.status === "failed" || email.status === "scheduled" ? (openBlock(), createBlock("button", {
                                  key: 1,
                                  onClick: ($event) => retryEmail(email),
                                  disabled: retrying.value === email.id,
                                  class: "rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 transition hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                }, toDisplayString(retrying.value === email.id ? "Retrying..." : "Retry"), 9, ["onClick", "disabled"])) : createCommentVNode("", true)
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
                    class: "mt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                  }, [
                    createVNode("button", {
                      onClick: ($event) => goToPage(__props.emails.prev_page_url),
                      disabled: !__props.emails.prev_page_url,
                      class: "w-full sm:w-auto rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    }, " Previous ", 8, ["onClick", "disabled"]),
                    createVNode("span", { class: "text-sm text-gray-600" }, " Page " + toDisplayString(__props.emails.current_page) + " of " + toDisplayString(__props.emails.last_page), 1),
                    createVNode("button", {
                      onClick: ($event) => goToPage(__props.emails.next_page_url),
                      disabled: !__props.emails.next_page_url,
                      class: "w-full sm:w-auto rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    }, " Next ", 8, ["onClick", "disabled"])
                  ])) : createCommentVNode("", true),
                  previewEmail.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4",
                    onClick: withModifiers(($event) => previewEmail.value = null, ["self"])
                  }, [
                    createVNode("div", { class: "w-full max-w-4xl bg-white rounded-xl max-h-[90vh] overflow-y-auto" }, [
                      createVNode("div", { class: "sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-start justify-between gap-4" }, [
                        createVNode("h3", { class: "text-lg sm:text-2xl font-bold text-gray-800 break-words flex-1" }, toDisplayString(previewEmail.value.subject), 1),
                        createVNode("button", {
                          onClick: ($event) => previewEmail.value = null,
                          class: "flex-shrink-0 rounded-lg bg-gray-200 px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 transition"
                        }, " Close ", 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "p-4 sm:p-6 space-y-6" }, [
                        createVNode("div", { class: "text-sm sm:text-base text-gray-600 space-y-2" }, [
                          createVNode("p", { class: "break-words" }, [
                            createVNode("strong", null, "To:"),
                            createTextVNode(" " + toDisplayString(previewEmail.value.patient?.full_name) + " (" + toDisplayString(previewEmail.value.patient_email) + ") ", 1)
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
                                "text-primaryDark": previewEmail.value.status === "scheduled"
                              }, "font-semibold capitalize"]
                            }, toDisplayString(previewEmail.value.status), 3)
                          ]),
                          previewEmail.value.delivery_attempts > 1 ? (openBlock(), createBlock("p", { key: 0 }, [
                            createVNode("strong", null, "Delivery Attempts:"),
                            createTextVNode(" " + toDisplayString(previewEmail.value.delivery_attempts), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "rounded-lg bg-gray-50 p-4 text-sm sm:text-base text-gray-700" }, [
                          createVNode("p", { class: "whitespace-pre-wrap break-words" }, toDisplayString(previewEmail.value.message_preview), 1)
                        ]),
                        previewEmail.value.result && previewEmail.value.result.files && previewEmail.value.result.files.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-4"
                        }, [
                          createVNode("h4", { class: "text-base sm:text-lg font-semibold text-gray-800" }, " Attachments (" + toDisplayString(previewEmail.value.result.files.length) + ") ", 1),
                          (openBlock(true), createBlock(Fragment, null, renderList(previewEmail.value.result.files, (file) => {
                            return openBlock(), createBlock("div", {
                              key: file.id,
                              class: "bg-gray-50 rounded-lg p-4 sm:p-6"
                            }, [
                              file.file_type === "image/png" || file.file_type === "image/jpg" || file.file_type === "image/jpeg" ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-center space-y-4"
                              }, [
                                createVNode("img", {
                                  src: file.file_url,
                                  alt: file.original_file_name,
                                  class: "max-w-full max-h-96 mx-auto rounded-lg shadow"
                                }, null, 8, ["src", "alt"]),
                                createVNode("div", { class: "flex flex-col sm:flex-row gap-2 justify-center" }, [
                                  createVNode("p", { class: "text-sm text-gray-600 break-all" }, toDisplayString(file.original_file_name), 1),
                                  createVNode("button", {
                                    onClick: ($event) => downloadResult(file),
                                    class: "px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                                  }, " Download ", 8, ["onClick"])
                                ])
                              ])) : file.file_type === "application/pdf" ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "space-y-4"
                              }, [
                                createVNode("iframe", {
                                  src: file.file_url,
                                  class: "w-full h-96 rounded-lg"
                                }, null, 8, ["src"]),
                                createVNode("div", { class: "flex flex-col sm:flex-row gap-2 justify-center items-center" }, [
                                  createVNode("p", { class: "text-sm text-gray-600 break-all text-center" }, toDisplayString(file.original_file_name), 1),
                                  createVNode("button", {
                                    onClick: ($event) => downloadResult(file),
                                    class: "px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                                  }, " Download PDF ", 8, ["onClick"])
                                ])
                              ])) : (openBlock(), createBlock("div", {
                                key: 2,
                                class: "text-center space-y-4"
                              }, [
                                createVNode("span", { class: "text-4xl sm:text-6xl" }, "📄"),
                                createVNode("p", { class: "text-sm sm:text-base text-gray-600 font-medium break-all px-4" }, toDisplayString(file.original_file_name), 1),
                                createVNode("p", { class: "text-xs sm:text-sm text-gray-500" }, toDisplayString(formatFileSize(file.file_size)), 1),
                                createVNode("button", {
                                  onClick: ($event) => downloadResult(file),
                                  class: "px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                                }, " Download File ", 8, ["onClick"])
                              ]))
                            ]);
                          }), 128))
                        ])) : createCommentVNode("", true)
                      ])
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
