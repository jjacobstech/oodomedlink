import { defineComponent, unref, mergeProps, withCtx, renderSlot, createVNode, useSSRContext, ref, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, withDirectives, vModelText, withModifiers, vModelSelect, createTextVNode, Transition } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { A as AuthenticatedLayout, _ as _sfc_main$4 } from "./AuthenticatedLayout-Br3x_ZsV.js";
import { useForm, Head, router } from "@inertiajs/vue3";
import { CheckCircle, CloseCircle } from "@solar-icons/vue";
import { u as useToast, _ as _sfc_main$3 } from "./index-CyWCJ_Mb.js";
import { reactiveOmit } from "@vueuse/core";
import { Check } from "lucide-vue-next";
import { useForwardPropsEmits, CheckboxRoot, CheckboxIndicator, Label } from "reka-ui";
import { c as cn } from "./utils-H80jjgLf.js";
import axios from "axios";
import "./index-tVDjCcDH.js";
import "class-variance-authority";
import "./ApplicationLogo-_si3TCMD.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "clsx";
import "tailwind-merge";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    defaultValue: { type: [Boolean, String] },
    modelValue: { type: [Boolean, String, null] },
    disabled: { type: Boolean },
    value: {},
    id: {},
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean },
    class: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CheckboxRoot), mergeProps(unref(forwarded), {
        class: unref(cn)(
          "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CheckboxIndicator), { class: "grid place-content-center text-current" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, () => {
                    _push3(ssrRenderComponent(unref(Check), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default", {}, () => [
                      createVNode(unref(Check), { class: "h-4 w-4" })
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(CheckboxIndicator), { class: "grid place-content-center text-current" }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    createVNode(unref(Check), { class: "h-4 w-4" })
                  ])
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/checkbox/Checkbox.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Label",
  __ssrInlineRender: true,
  props: {
    for: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Label), mergeProps(unref(delegatedProps), {
        class: unref(cn)(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/label/Label.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    user: {},
    results: {},
    stats: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const showUploadModal = ref(false);
    const selectedFilter = ref(props.filters?.filter || "all");
    const searchQuery = ref(props.filters?.search || "");
    const previewFile = ref(null);
    const { toast } = useToast();
    const noErrors = ref(false);
    const foundError = ref(false);
    const checking = ref(false);
    ref(null);
    const error = ref(null);
    const dragActive = ref(false);
    const stats = [
      {
        name: "total uploads",
        count: props.stats?.total_uploads || 0,
        icon: "📤",
        color: "primaryDark"
      },
      {
        name: "pending results",
        count: props.stats?.pending_results || 0,
        icon: "⏳",
        color: "primaryDark"
      },
      {
        name: "completed results",
        count: props.stats?.completed_result || 0,
        icon: "✅",
        color: "primaryDark"
      },
      {
        name: "total patients",
        count: props.stats?.total_patients || 0,
        icon: "👥",
        color: "primaryDark"
      }
    ];
    const selectionFilter = ["all", "pending", "sent", "failed"];
    const uploadForm = useForm({
      patient_name: "Jacobs",
      patient_email: "jacobs@gmail.com",
      patient_phone_no: "07059579655",
      test_date: "2025-12-06",
      test_name: "Software Engineer",
      result_type: "Blood Test",
      file: [],
      notes: "",
      sendViaEmail: true,
      sendViaWhatsapp: false,
      scheduleDate: "",
      scheduleTime: ""
    });
    const uploadedFiles = ref([]);
    const handleFileChange = (event) => {
      const target = event.target;
      if (target.files && target.files.length > 0) {
        for (let file2 of target.files) {
          uploadedFiles.value.push(file2);
          uploadForm.file.push(file2);
        }
      }
      checkDocument();
      return 1;
    };
    const handleFileRemove = (index) => {
      uploadedFiles.value.splice(index, 1);
      uploadForm.file.splice(index, 1);
    };
    const handleDrop = (e) => {
      dragActive.value = false;
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        uploadedFiles.value.push(e.dataTransfer.files[0]);
        uploadForm.file.push(e.dataTransfer.files[0]);
        error.value = null;
      }
    };
    const checkDocument = async () => {
      checking.value = true;
      noErrors.value = false;
      foundError.value = false;
      const formData = new FormData();
      formData.append("patient_name", uploadForm.patient_name);
      formData.append("test_date", uploadForm.test_date);
      formData.append("test_name", uploadForm.test_name);
      formData.append("result_type", uploadForm.result_type);
      if (uploadForm.file && uploadForm.file.length > 0) {
        for (let i = 0; i < uploadForm.file.length; i++) {
          formData.append("file[]", uploadForm.file[i]);
        }
      } else {
        return;
      }
      try {
        const check = await axios.post(route("user.result.check"), formData);
        console.log("Upload successful:", check.data.error);
        if (!check.data.status) {
          toast({
            title: "Connection Error",
            description: "Document Check failed , check your connection",
            type: "foreground",
            variant: "default",
            class: "text-primaryDark bg-white shadow-lg",
            open: true
          });
          checking.value = false;
          noErrors.value = false;
          foundError.value = true;
          return 0;
        }
        if (check.data.status) {
          checking.value = false;
          noErrors.value = true;
          foundError.value = false;
          return 1;
        } else if (!check.data.status) {
          checking.value = false;
          noErrors.value = false;
          foundError.value = true;
          return;
        } else {
          toast({
            title: "Connection Error",
            description: "Document Check failed , check your connection",
            type: "foreground",
            variant: "default",
            class: "text-primaryDark bg-white shadow-lg",
            open: true
          });
          checking.value = false;
          noErrors.value = false;
          foundError.value = true;
          return 0;
        }
      } catch (error2) {
      }
      checking.value = false;
      foundError.value = true;
      return 0;
    };
    const submitUpload = () => {
      uploadForm.post(route("user.result.upload"), {
        onSuccess: (response) => {
          uploadForm.reset();
          uploadedFiles.value = [];
          showUploadModal.value = false;
          toast({
            title: response.props.error ? "Error" : "Success",
            description: response.props.error ? response.props.error : "Upload successful",
            type: "foreground",
            variant: "default",
            class: "text-primaryDark bg-white shadow-lg",
            open: true
          });
          router.get(route("user.dashboard"));
        },
        onError: (errors) => {
          console.error("Upload error:", errors);
        }
      });
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
      router.get(route("user.dashboard"), payload, {
        onError: (response) => {
        },
        preserveScroll: true,
        preserveState: true
      });
    };
    const clearFilters = () => {
      selectedFilter.value = "all";
      searchQuery.value = "";
      router.get(route("user.dashboard"), {}, {
        onError: (response) => {
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
    const downloadResult = (file2) => {
      window.open(file2.file_url, "_blank");
    };
    const viewPreview = (result) => {
      previewFile.value = result;
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getFileIcon = (fileType) => {
      switch (fileType) {
        case "pdf":
          return "📄";
        case "image":
          return "🖼️";
        case "csv":
          return "📊";
        default:
          return "📁";
      }
    };
    const handleSearchKeydown = (event) => {
      if (event.key === "Enter") {
        applyFilters();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Clinic Dashboard" }, null, _parent));
      _push(ssrRenderComponent(AuthenticatedLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, null, null, _parent2, _scopeId));
            _push2(`<div class="flex w-full gap-1 overflow-y-hidden bg-primaryLight"${_scopeId}><div class="w-full p-6 mb-16 overflow-y-auto bg-transparent scrollbar-thin scrollbar-thumb-primaryDark scrollbar-track-primaryLight"${_scopeId}><div class="mb-6"${_scopeId}><h1 class="text-4xl font-bold text-gray-800"${_scopeId}>Dashboard</h1><p class="text-gray-600 text-xl font-bold"${_scopeId}> Manage patient test results and uploads </p></div><div class="p-6 rounded-xl"${_scopeId}><div class="flex items-center justify-center mb-4"${_scopeId}><button class="px-6 py-5 text-xl font-bold text-white bg-primaryDark rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-150"${_scopeId}> + Upload New Result </button></div></div><div class="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4"${_scopeId}><!--[-->`);
            ssrRenderList(stats, (stat) => {
              _push2(`<div class="p-6 bg-white shadow-md rounded-xl group hover:shadow-lg transition-all duration-150"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-lg capitalize font-bold text-gray-600"${_scopeId}>${ssrInterpolate(stat.name)}</p><p class="mt-2 text-3xl font-bold text-blue-600"${_scopeId}>${ssrInterpolate(stat.count)}</p></div><div class="p-3 bg-blue-100 rounded-full"${_scopeId}><span class="text-2xl"${_scopeId}>${ssrInterpolate(stat.icon)}</span></div></div></div>`);
            });
            _push2(`<!--]--></div><div class="p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-xl"${_scopeId}><div class="mb-4 sm:mb-6"${_scopeId}><h2 class="mb-3 sm:mb-4 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800"${_scopeId}> Patient Results </h2><div class="flex flex-col gap-3 sm:gap-4 mb-4"${_scopeId}><div class="flex flex-wrap gap-2 sm:gap-3"${_scopeId}><!--[-->`);
            ssrRenderList(selectionFilter, (selection) => {
              _push2(`<button class="${ssrRenderClass([
                selectedFilter.value === selection ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700",
                "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base font-medium rounded-lg transition-all hover:shadow-md"
              ])}"${_scopeId}>${ssrInterpolate(selection.charAt(0).toUpperCase() + selection.slice(1))}</button>`);
            });
            _push2(`<!--]--></div><div class="flex gap-2 sm:gap-3 justify-between items-center w-full"${_scopeId}><div class="relative flex-1 sm:flex-initial sm:max-w-md lg:max-w-xl"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search patient or result type..." class="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 text-sm sm:text-base border border-gray-300 rounded-lg placeholder:text-gray-400 placeholder:text-sm sm:placeholder:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"${_scopeId}><span class="absolute text-base sm:text-lg text-gray-400 transform -translate-y-1/2 left-3 top-1/2"${_scopeId}> 🔍 </span></div><div class="flex gap-2 items-center"${_scopeId}><button class="px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg whitespace-nowrap"${_scopeId}> Search </button><button class="px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all bg-gray-600 rounded-lg hover:bg-gray-700 hover:shadow-lg whitespace-nowrap"${_scopeId}> Clear </button></div></div></div></div><div class="mb-4 text-sm text-gray-600"${_scopeId}><p${_scopeId}> Showing ${ssrInterpolate(__props.results.from || 0)} to ${ssrInterpolate(__props.results.to || 0)} of ${ssrInterpolate(__props.results.total)} results </p></div><div class="overflow-x-auto -mx-4 sm:mx-0 rounded-lg"${_scopeId}><div class="inline-block min-w-full align-middle"${_scopeId}><div class="overflow-hidden border-b border-gray-200 sm:rounded-lg"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase"${_scopeId}> Patient </th><th class="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase"${_scopeId}> Result Type </th><th class="hidden lg:table-cell px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase"${_scopeId}> File </th><th class="hidden xl:table-cell px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase"${_scopeId}> Upload Date </th><th class="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase"${_scopeId}> Status </th><th class="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase"${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.results.data, (result) => {
              _push2(`<tr class="transition-colors hover:bg-gray-50"${_scopeId}><td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4"${_scopeId}><div class="text-xs sm:text-sm lg:text-base font-medium text-gray-900"${_scopeId}>${ssrInterpolate(result.patient.full_name)}</div><div class="md:hidden text-xs text-gray-500 mt-1"${_scopeId}>${ssrInterpolate(result.result_type)}</div></td><td class="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-base text-gray-700"${_scopeId}>${ssrInterpolate(result.result_type)}</td><td class="hidden lg:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4"${_scopeId}>`);
              if (result.files && result.files.length > 0) {
                _push2(`<div class="space-y-1"${_scopeId}><!--[-->`);
                ssrRenderList(result.files, (file2) => {
                  _push2(`<span class="flex items-center gap-2 text-xs sm:text-sm text-gray-700"${_scopeId}><span${_scopeId}>${ssrInterpolate(getFileIcon(
                    result.file_type
                  ))}</span><span class="truncate max-w-[150px] xl:max-w-[200px]"${_scopeId}>${ssrInterpolate(file2.original_file_name)}</span></span>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="hidden xl:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700"${_scopeId}>${ssrInterpolate(formatDate(
                result.uploaded_at
              ))}</td><td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4"${_scopeId}><span class="${ssrRenderClass([{
                "bg-orange-100 text-orange-800": result.status === "pending",
                "bg-green-100 text-green-800": result.status === "uploaded",
                "bg-red-100 text-red-800": result.status === "failed"
              }, "inline-flex px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold rounded-full whitespace-nowrap capitalize"])}"${_scopeId}>${ssrInterpolate(result.status)}</span></td><td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4"${_scopeId}><div class="flex flex-col sm:flex-row gap-1 sm:gap-2"${_scopeId}><button class="px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-blue-700 transition-all bg-blue-100 rounded hover:bg-blue-200 hover:shadow-sm whitespace-nowrap"${_scopeId}> View </button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.results.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="6" class="px-4 py-8 sm:py-12 text-center sm:text-base lg:text-lg text-gray-600"${_scopeId}> No results found </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.results.last_page > 1) {
              _push2(`<div class="mt-6 flex items-center justify-between px-4"${_scopeId}><button${ssrIncludeBooleanAttr(!__props.results.prev_page_url) ? " disabled" : ""} class="rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed"${_scopeId}> Previous </button><span class="text-sm text-gray-600"${_scopeId}> Page ${ssrInterpolate(__props.results.current_page)} of ${ssrInterpolate(__props.results.last_page)}</span><button${ssrIncludeBooleanAttr(!__props.results.next_page_url) ? " disabled" : ""} class="rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed"${_scopeId}> Next </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
            if (showUploadModal.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6 lg:p-10"${_scopeId}><div class="w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl p-6 sm:p-8 lg:p-10 xl:p-16 bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto"${_scopeId}><h3 class="mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800"${_scopeId}> Upload Patient Result </h3><form class="space-y-4 sm:space-y-5 lg:space-y-6"${_scopeId}><div${_scopeId}><label class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700"${_scopeId}> Patient Name </label><input${ssrRenderAttr("value", unref(uploadForm).patient_name)} type="text" required class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Enter patient name" autocomplete="name"${_scopeId}></div><div${_scopeId}><label class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700"${_scopeId}> Patient Email </label><input${ssrRenderAttr("value", unref(uploadForm).patient_email)} type="email" required class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Enter patient email" autocomplete="email"${_scopeId}></div><div${_scopeId}><label class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700"${_scopeId}> Patient Phone Number </label><input${ssrRenderAttr("value", unref(uploadForm).patient_phone_no)} type="tel" required class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Enter patient email" autocomplete="phone number"${_scopeId}></div><div${_scopeId}><label class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700"${_scopeId}> Test Name </label><input${ssrRenderAttr("value", unref(uploadForm).test_name)} type="text" required class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Enter test name"${_scopeId}></div><div${_scopeId}><label class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700"${_scopeId}> Result Type </label><select required class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "") : ssrLooseEqual(unref(uploadForm).result_type, "")) ? " selected" : ""}${_scopeId}>Select result type</option><option value="Blood Test"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "Blood Test") : ssrLooseEqual(unref(uploadForm).result_type, "Blood Test")) ? " selected" : ""}${_scopeId}>Blood Test</option><option value="X-Ray"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "X-Ray") : ssrLooseEqual(unref(uploadForm).result_type, "X-Ray")) ? " selected" : ""}${_scopeId}>X-Ray</option><option value="MRI"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "MRI") : ssrLooseEqual(unref(uploadForm).result_type, "MRI")) ? " selected" : ""}${_scopeId}>MRI</option><option value="CT Scan"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "CT Scan") : ssrLooseEqual(unref(uploadForm).result_type, "CT Scan")) ? " selected" : ""}${_scopeId}>CT Scan</option><option value="Lab Analysis"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "Lab Analysis") : ssrLooseEqual(unref(uploadForm).result_type, "Lab Analysis")) ? " selected" : ""}${_scopeId}> Lab Analysis </option><option value="Other"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "Other") : ssrLooseEqual(unref(uploadForm).result_type, "Other")) ? " selected" : ""}${_scopeId}>Other</option></select></div><div${_scopeId}><label class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700"${_scopeId}> Test Date </label><input${ssrRenderAttr("value", unref(uploadForm).test_date)} type="date" required class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" autocomplete="date"${_scopeId}></div><div${_scopeId}><label class="block mb-2 text-sm font-extrabold sm:text-base text-gray-700"${_scopeId}> Notes </label><textarea rows="3" class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="e.g referrals, prescriptions etc"${_scopeId}>${ssrInterpolate(unref(uploadForm).notes)}</textarea></div><div class="flex flex-col items-center justify-center w-full"${_scopeId}><label class="flex flex-col items-center justify-center w-full h-48 sm:h-56 lg:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-primaryLight/30 transition-colors group"${_scopeId}><div class="flex flex-col items-center justify-center px-4"${_scopeId}><svg class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-3 sm:mb-4 text-gray-500 group-hover:text-gray-600 transition-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"${_scopeId}><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"${_scopeId}></path></svg>`);
              if (!dragActive.value) {
                _push2(`<p class="mb-2 text-sm sm:text-base lg:text-lg text-gray-500 text-center"${_scopeId}><span class="font-semibold"${_scopeId}>Click to upload</span> or drag and drop </p>`);
              } else {
                _push2(`<!---->`);
              }
              if (dragActive.value) {
                _push2(`<p class="mb-2 text-sm sm:text-base lg:text-lg text-gray-500 text-center"${_scopeId}><span class="font-semibold"${_scopeId}>Click to upload</span> or drag and drop </p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p class="text-xs sm:text-sm text-gray-500 text-center"${_scopeId}> PDF, PNG, JPG (MAX. 10MB per file) </p></div><input id="dropzone-file" type="file"${ssrIncludeBooleanAttr(unref(uploadForm).file.length > 0) ? " disabled" : ""} accept=".pdf,.png,.jpg,.jpeg" class="hidden"${_scopeId}></label><div class="py-5 flex items-center justify-start gap-2 w-full"${_scopeId}>`);
              if (checking.value) {
                _push2(`<button class="flex items-center gap-1 bg-primaryDark text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-primaryDark/90 disabled:cursor-not-allowed" disabled size="md"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(_sfc_main$4), null, null, _parent2, _scopeId));
                _push2(` Checking for errors... </button>`);
              } else {
                _push2(`<!---->`);
              }
              if (noErrors.value) {
                _push2(`<button class="flex items-center gap-1 bg-primaryDark text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-primaryDark/90 disabled:cursor-not-allowed" disabled size="md"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(CheckCircle), { size: "20" }, null, _parent2, _scopeId));
                _push2(` No Errors Found </button>`);
              } else {
                _push2(`<!---->`);
              }
              if (foundError.value) {
                _push2(`<button class="flex items-center gap-1 bg-primaryDark text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-primaryDark/90 disabled:cursor-not-allowed" disabled size="md"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(CheckCircle), { size: "20" }, null, _parent2, _scopeId));
                _push2(` Errors Found. Please check the results. </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
              if (uploadedFiles.value.length > 0) {
                _push2(`<div class="space-y-2"${_scopeId}><p class="text-sm font-semibold text-gray-700 mb-2"${_scopeId}> Selected Files (${ssrInterpolate(uploadedFiles.value.length)}) </p><!--[-->`);
                ssrRenderList(uploadedFiles.value, (file2, index) => {
                  _push2(`<div class="w-full flex justify-between items-center px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50"${_scopeId}><span class="truncate max-w-[200px] md:max-w-[300px] xl:max-w-[400px]"${_scopeId}>${ssrInterpolate(file2.name)}</span><button type="button" class="text-red-600 hover:text-red-800 transition-colors"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(CloseCircle), {
                    weight: "Bold",
                    size: 24
                  }, null, _parent2, _scopeId));
                  _push2(`</button></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="lg:flex space-y-2 items-center justify-between gap-2 sm:gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                class: "hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-primaryDark has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-primaryDark dark:has-[[aria-checked=true]]:bg-primaryDark",
                for: "whatsappToogle"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$2, {
                      id: "whatsappToogle",
                      modelValue: unref(uploadForm).sendViaWhatsapp,
                      "onUpdate:modelValue": ($event) => unref(uploadForm).sendViaWhatsapp = $event,
                      "default-value": unref(uploadForm).sendViaWhatsapp,
                      class: "data-[state=checked]:border-primaryDark data-[state=checked]:bg-primaryDark border-primaryDark data-[state=checked]:text-white dark:data-[state=checked]:border-primaryDark dark:data-[state=checked]:bg-primaryDark"
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="grid gap-1.5 font-normal"${_scopeId2}><p class="text-md text-gray-600 leading-none font-extrabold"${_scopeId2}> Send via Whatsapp </p><p class="text-muted-foreground font-bold text-md"${_scopeId2}> Select this option if you want to send the result through Whatsapp </p></div>`);
                  } else {
                    return [
                      createVNode(_sfc_main$2, {
                        id: "whatsappToogle",
                        modelValue: unref(uploadForm).sendViaWhatsapp,
                        "onUpdate:modelValue": ($event) => unref(uploadForm).sendViaWhatsapp = $event,
                        "default-value": unref(uploadForm).sendViaWhatsapp,
                        class: "data-[state=checked]:border-primaryDark data-[state=checked]:bg-primaryDark border-primaryDark data-[state=checked]:text-white dark:data-[state=checked]:border-primaryDark dark:data-[state=checked]:bg-primaryDark"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "default-value"]),
                      createVNode("div", { class: "grid gap-1.5 font-normal" }, [
                        createVNode("p", { class: "text-md text-gray-600 leading-none font-extrabold" }, " Send via Whatsapp "),
                        createVNode("p", { class: "text-muted-foreground font-bold text-md" }, " Select this option if you want to send the result through Whatsapp ")
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1, {
                class: "hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-primaryDark has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-primaryDark dark:has-[[aria-checked=true]]:bg-primaryDark",
                for: "emailToogle"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$2, {
                      id: "emailToogle",
                      modelValue: unref(uploadForm).sendViaEmail,
                      "onUpdate:modelValue": ($event) => unref(uploadForm).sendViaEmail = $event,
                      "default-value": unref(uploadForm).sendViaEmail,
                      class: "data-[state=checked]:border-primaryDark data-[state=checked]:bg-primaryDark border-primaryDark data-[state=checked]:text-white dark:data-[state=checked]:border-primaryDark dark:data-[state=checked]:bg-primaryDark"
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="grid gap-1.5 font-normal"${_scopeId2}><p class="text-md text-gray-600 leading-none font-extrabold"${_scopeId2}> Upload and send result immediately </p><p class="text-muted-foreground font-bold text-md"${_scopeId2}> Select this option if you want to send the result immediately after uploading </p></div>`);
                  } else {
                    return [
                      createVNode(_sfc_main$2, {
                        id: "emailToogle",
                        modelValue: unref(uploadForm).sendViaEmail,
                        "onUpdate:modelValue": ($event) => unref(uploadForm).sendViaEmail = $event,
                        "default-value": unref(uploadForm).sendViaEmail,
                        class: "data-[state=checked]:border-primaryDark data-[state=checked]:bg-primaryDark border-primaryDark data-[state=checked]:text-white dark:data-[state=checked]:border-primaryDark dark:data-[state=checked]:bg-primaryDark"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "default-value"]),
                      createVNode("div", { class: "grid gap-1.5 font-normal" }, [
                        createVNode("p", { class: "text-md text-gray-600 leading-none font-extrabold" }, " Upload and send result immediately "),
                        createVNode("p", { class: "text-muted-foreground font-bold text-md" }, " Select this option if you want to send the result immediately after uploading ")
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              if (!unref(uploadForm).sendViaEmail) {
                _push2(`<div class="space-y-2 origin-top overflow-hidden"${_scopeId}><div${_scopeId}><label class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700"${_scopeId}> Schedule Date </label><input${ssrRenderAttr("value", unref(uploadForm).scheduleDate)} type="date"${ssrIncludeBooleanAttr(!unref(uploadForm).sendViaEmail) ? " required" : ""} class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-all duration-300 ease-in-out hover:border-blue-400 hover:shadow-md"${_scopeId}></div><div${_scopeId}><label class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700"${_scopeId}> Schedule Time </label><input${ssrRenderAttr("value", unref(uploadForm).scheduleTime)} type="time"${ssrIncludeBooleanAttr(!unref(uploadForm).sendViaEmail) ? " required" : ""} class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-all duration-300 ease-in-out hover:border-blue-400 hover:shadow-md"${_scopeId}></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex flex-col sm:flex-row sm:justify-end gap-4 pt-2 sm:pt-4"${_scopeId}><div class="flex gap-2 sm:gap-3 w-full sm:w-auto"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(!unref(uploadForm).sendViaEmail && (!unref(uploadForm).scheduleDate || !unref(uploadForm).scheduleTime) || uploadedFiles.value.length === 0 || unref(uploadForm).processing || foundError.value || checking.value) ? " disabled" : ""} class="flex-1 sm:flex-none sm:min-w-[100px] hover:-translate-y-1 duration-150 px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:transform-none"${_scopeId}>${ssrInterpolate(unref(uploadForm).processing ? "Uploading..." : "Upload")}</button><button type="button" class="flex-1 sm:flex-none sm:min-w-[100px] px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-gray-700 transition-all hover:-translate-y-1 duration-150 bg-gray-200 rounded-lg hover:bg-gray-300 hover:shadow-lg"${_scopeId}> Cancel </button></div></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (previewFile.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"${_scopeId}><div class="w-full max-w-4xl p-6 bg-white rounded-xl max-h-[90vh] overflow-y-auto"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h3 class="text-2xl font-bold text-gray-800"${_scopeId}>${ssrInterpolate(previewFile.value.patient.full_name || "Patient")} - ${ssrInterpolate(previewFile.value.result_type)}</h3><button class="px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"${_scopeId}> Close </button></div><div class="p-4 mb-4 bg-gray-50 rounded-lg space-y-2"${_scopeId}><p class="text-sm text-gray-600"${_scopeId}><strong${_scopeId}>Patient:</strong> ${ssrInterpolate(previewFile.value.patient.full_name)} (${ssrInterpolate(previewFile.value.patient.email)}) </p><p class="text-sm text-gray-600"${_scopeId}><strong${_scopeId}>Result Type:</strong> ${ssrInterpolate(previewFile.value.result_type)}</p><p class="text-sm text-gray-600"${_scopeId}><strong${_scopeId}>Uploaded:</strong> ${ssrInterpolate(formatDate(previewFile.value.uploaded_at))}</p><p class="text-sm text-gray-600"${_scopeId}><strong${_scopeId}>Status:</strong><span class="${ssrRenderClass([{
                "text-orange-700": previewFile.value.status === "pending",
                "text-green-700": previewFile.value.status === "uploaded",
                "text-red-700": previewFile.value.status === "failed"
              }, "font-semibold capitalize"])}"${_scopeId}>${ssrInterpolate(previewFile.value.status)}</span></p></div>`);
              if (previewFile.value.files && previewFile.value.files.length > 0) {
                _push2(`<div class="space-y-4"${_scopeId}><h4 class="text-lg font-semibold text-gray-800"${_scopeId}> Attached Files (${ssrInterpolate(previewFile.value.files.length)}) </h4><!--[-->`);
                ssrRenderList(previewFile.value.files, (file2) => {
                  _push2(`<div class="flex items-center justify-center p-8 bg-gray-100 rounded-lg"${_scopeId}>`);
                  if (file2.file_type === "image/png" || file2.file_type === "image/jpg" || file2.file_type === "image/jpeg") {
                    _push2(`<div class="text-center w-full"${_scopeId}><img${ssrRenderAttr("src", file2.file_url)}${ssrRenderAttr("alt", file2.original_file_name)} class="max-w-full max-h-96 mx-auto rounded-lg shadow"${_scopeId}><p class="mt-2 text-sm text-gray-600"${_scopeId}>${ssrInterpolate(file2.original_file_name)}</p><button class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"${_scopeId}> Download Image </button></div>`);
                  } else if (file2.file_type === "application/pdf") {
                    _push2(`<div class="text-center w-full"${_scopeId}><iframe${ssrRenderAttr("src", file2.file_url)} class="w-full h-96 rounded-lg"${_scopeId}></iframe><p class="mt-2 text-sm text-gray-600"${_scopeId}>${ssrInterpolate(file2.original_file_name)}</p><button class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"${_scopeId}> Download PDF </button></div>`);
                  } else {
                    _push2(`<div class="text-center"${_scopeId}><span class="text-6xl"${_scopeId}>📄</span><p class="mt-4 text-gray-600 font-medium"${_scopeId}>${ssrInterpolate(file2.original_file_name)}</p><button class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"${_scopeId}> Download File </button></div>`);
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
              createVNode(_sfc_main$3),
              createVNode("div", { class: "flex w-full gap-1 overflow-y-hidden bg-primaryLight" }, [
                createVNode("div", { class: "w-full p-6 mb-16 overflow-y-auto bg-transparent scrollbar-thin scrollbar-thumb-primaryDark scrollbar-track-primaryLight" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("h1", { class: "text-4xl font-bold text-gray-800" }, "Dashboard"),
                    createVNode("p", { class: "text-gray-600 text-xl font-bold" }, " Manage patient test results and uploads ")
                  ]),
                  createVNode("div", { class: "p-6 rounded-xl" }, [
                    createVNode("div", { class: "flex items-center justify-center mb-4" }, [
                      createVNode("button", {
                        onClick: ($event) => showUploadModal.value = true,
                        class: "px-6 py-5 text-xl font-bold text-white bg-primaryDark rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-150"
                      }, " + Upload New Result ", 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(stats, (stat) => {
                      return createVNode("div", {
                        key: stat.name,
                        class: "p-6 bg-white shadow-md rounded-xl group hover:shadow-lg transition-all duration-150"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-lg capitalize font-bold text-gray-600" }, toDisplayString(stat.name), 1),
                            createVNode("p", { class: "mt-2 text-3xl font-bold text-blue-600" }, toDisplayString(stat.count), 1)
                          ]),
                          createVNode("div", { class: "p-3 bg-blue-100 rounded-full" }, [
                            createVNode("span", { class: "text-2xl" }, toDisplayString(stat.icon), 1)
                          ])
                        ])
                      ]);
                    }), 64))
                  ]),
                  createVNode("div", { class: "p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-xl" }, [
                    createVNode("div", { class: "mb-4 sm:mb-6" }, [
                      createVNode("h2", { class: "mb-3 sm:mb-4 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800" }, " Patient Results "),
                      createVNode("div", { class: "flex flex-col gap-3 sm:gap-4 mb-4" }, [
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
                        createVNode("div", { class: "flex gap-2 sm:gap-3 justify-between items-center w-full" }, [
                          createVNode("div", { class: "relative flex-1 sm:flex-initial sm:max-w-md lg:max-w-xl" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                              type: "text",
                              placeholder: "Search patient or result type...",
                              onKeydown: handleSearchKeydown,
                              class: "w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 text-sm sm:text-base border border-gray-300 rounded-lg placeholder:text-gray-400 placeholder:text-sm sm:placeholder:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            }, null, 40, ["onUpdate:modelValue"]), [
                              [vModelText, searchQuery.value]
                            ]),
                            createVNode("span", { class: "absolute text-base sm:text-lg text-gray-400 transform -translate-y-1/2 left-3 top-1/2" }, " 🔍 ")
                          ]),
                          createVNode("div", { class: "flex gap-2 items-center" }, [
                            createVNode("button", {
                              onClick: ($event) => applyFilters(),
                              class: "px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg whitespace-nowrap"
                            }, " Search ", 8, ["onClick"]),
                            createVNode("button", {
                              onClick: clearFilters,
                              class: "px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all bg-gray-600 rounded-lg hover:bg-gray-700 hover:shadow-lg whitespace-nowrap"
                            }, " Clear ")
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "mb-4 text-sm text-gray-600" }, [
                      createVNode("p", null, " Showing " + toDisplayString(__props.results.from || 0) + " to " + toDisplayString(__props.results.to || 0) + " of " + toDisplayString(__props.results.total) + " results ", 1)
                    ]),
                    createVNode("div", { class: "overflow-x-auto -mx-4 sm:mx-0 rounded-lg" }, [
                      createVNode("div", { class: "inline-block min-w-full align-middle" }, [
                        createVNode("div", { class: "overflow-hidden border-b border-gray-200 sm:rounded-lg" }, [
                          createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                            createVNode("thead", { class: "bg-gray-50" }, [
                              createVNode("tr", null, [
                                createVNode("th", { class: "px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase" }, " Patient "),
                                createVNode("th", { class: "hidden md:table-cell px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase" }, " Result Type "),
                                createVNode("th", { class: "hidden lg:table-cell px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase" }, " File "),
                                createVNode("th", { class: "hidden xl:table-cell px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase" }, " Upload Date "),
                                createVNode("th", { class: "px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase" }, " Status "),
                                createVNode("th", { class: "px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase" }, " Actions ")
                              ])
                            ]),
                            createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.results.data, (result) => {
                                return openBlock(), createBlock("tr", {
                                  key: result.id,
                                  class: "transition-colors hover:bg-gray-50"
                                }, [
                                  createVNode("td", { class: "px-3 sm:px-4 lg:px-6 py-3 sm:py-4" }, [
                                    createVNode("div", { class: "text-xs sm:text-sm lg:text-base font-medium text-gray-900" }, toDisplayString(result.patient.full_name), 1),
                                    createVNode("div", { class: "md:hidden text-xs text-gray-500 mt-1" }, toDisplayString(result.result_type), 1)
                                  ]),
                                  createVNode("td", { class: "hidden md:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-base text-gray-700" }, toDisplayString(result.result_type), 1),
                                  createVNode("td", { class: "hidden lg:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4" }, [
                                    result.files && result.files.length > 0 ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "space-y-1"
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(result.files, (file2) => {
                                        return openBlock(), createBlock("span", {
                                          key: file2.id,
                                          class: "flex items-center gap-2 text-xs sm:text-sm text-gray-700"
                                        }, [
                                          createVNode("span", null, toDisplayString(getFileIcon(
                                            result.file_type
                                          )), 1),
                                          createVNode("span", { class: "truncate max-w-[150px] xl:max-w-[200px]" }, toDisplayString(file2.original_file_name), 1)
                                        ]);
                                      }), 128))
                                    ])) : createCommentVNode("", true)
                                  ]),
                                  createVNode("td", { class: "hidden xl:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700" }, toDisplayString(formatDate(
                                    result.uploaded_at
                                  )), 1),
                                  createVNode("td", { class: "px-3 sm:px-4 lg:px-6 py-3 sm:py-4" }, [
                                    createVNode("span", {
                                      class: [{
                                        "bg-orange-100 text-orange-800": result.status === "pending",
                                        "bg-green-100 text-green-800": result.status === "uploaded",
                                        "bg-red-100 text-red-800": result.status === "failed"
                                      }, "inline-flex px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold rounded-full whitespace-nowrap capitalize"]
                                    }, toDisplayString(result.status), 3)
                                  ]),
                                  createVNode("td", { class: "px-3 sm:px-4 lg:px-6 py-3 sm:py-4" }, [
                                    createVNode("div", { class: "flex flex-col sm:flex-row gap-1 sm:gap-2" }, [
                                      createVNode("button", {
                                        onClick: ($event) => viewPreview(result),
                                        class: "px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-blue-700 transition-all bg-blue-100 rounded hover:bg-blue-200 hover:shadow-sm whitespace-nowrap"
                                      }, " View ", 8, ["onClick"])
                                    ])
                                  ])
                                ]);
                              }), 128)),
                              __props.results.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                                createVNode("td", {
                                  colspan: "6",
                                  class: "px-4 py-8 sm:py-12 text-center sm:text-base lg:text-lg text-gray-600"
                                }, " No results found ")
                              ])) : createCommentVNode("", true)
                            ])
                          ])
                        ]),
                        __props.results.last_page > 1 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-6 flex items-center justify-between px-4"
                        }, [
                          createVNode("button", {
                            onClick: ($event) => goToPage(__props.results.prev_page_url),
                            disabled: !__props.results.prev_page_url,
                            class: "rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
                          }, " Previous ", 8, ["onClick", "disabled"]),
                          createVNode("span", { class: "text-sm text-gray-600" }, " Page " + toDisplayString(__props.results.current_page) + " of " + toDisplayString(__props.results.last_page), 1),
                          createVNode("button", {
                            onClick: ($event) => goToPage(__props.results.next_page_url),
                            disabled: !__props.results.next_page_url,
                            class: "rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
                          }, " Next ", 8, ["onClick", "disabled"])
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  showUploadModal.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6 lg:p-10",
                    onClick: withModifiers(($event) => showUploadModal.value = false, ["self"])
                  }, [
                    createVNode("div", { class: "w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl p-6 sm:p-8 lg:p-10 xl:p-16 bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto" }, [
                      createVNode("h3", { class: "mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800" }, " Upload Patient Result "),
                      createVNode("form", {
                        onSubmit: withModifiers(submitUpload, ["prevent"]),
                        class: "space-y-4 sm:space-y-5 lg:space-y-6"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm sm:text-base font-extrabold text-gray-700" }, " Patient Name "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(uploadForm).patient_name = $event,
                            type: "text",
                            required: "",
                            class: "w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all",
                            placeholder: "Enter patient name",
                            autocomplete: "name"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(uploadForm).patient_name]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm sm:text-base font-extrabold text-gray-700" }, " Patient Email "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(uploadForm).patient_email = $event,
                            type: "email",
                            required: "",
                            class: "w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all",
                            placeholder: "Enter patient email",
                            autocomplete: "email"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(uploadForm).patient_email]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm sm:text-base font-extrabold text-gray-700" }, " Patient Phone Number "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(uploadForm).patient_phone_no = $event,
                            type: "tel",
                            required: "",
                            class: "w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all",
                            placeholder: "Enter patient email",
                            autocomplete: "phone number"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(uploadForm).patient_phone_no]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm sm:text-base font-extrabold text-gray-700" }, " Test Name "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(uploadForm).test_name = $event,
                            type: "text",
                            required: "",
                            class: "w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all",
                            placeholder: "Enter test name"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(uploadForm).test_name]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm sm:text-base font-extrabold text-gray-700" }, " Result Type "),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(uploadForm).result_type = $event,
                            required: "",
                            class: "w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          }, [
                            createVNode("option", { value: "" }, "Select result type"),
                            createVNode("option", { value: "Blood Test" }, "Blood Test"),
                            createVNode("option", { value: "X-Ray" }, "X-Ray"),
                            createVNode("option", { value: "MRI" }, "MRI"),
                            createVNode("option", { value: "CT Scan" }, "CT Scan"),
                            createVNode("option", { value: "Lab Analysis" }, " Lab Analysis "),
                            createVNode("option", { value: "Other" }, "Other")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(uploadForm).result_type]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm sm:text-base font-extrabold text-gray-700" }, " Test Date "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(uploadForm).test_date = $event,
                            type: "date",
                            required: "",
                            class: "w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all",
                            autocomplete: "date"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(uploadForm).test_date]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm font-extrabold sm:text-base text-gray-700" }, " Notes "),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(uploadForm).notes = $event,
                            rows: "3",
                            class: "w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all",
                            placeholder: "e.g referrals, prescriptions etc"
                          }, "                                ", 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(uploadForm).notes]
                          ])
                        ]),
                        createVNode("div", { class: "flex flex-col items-center justify-center w-full" }, [
                          createVNode("label", {
                            onDragenter: withModifiers(($event) => dragActive.value = true, ["prevent"]),
                            onDragleave: withModifiers(($event) => dragActive.value = false, ["prevent"]),
                            onDragover: withModifiers(() => {
                            }, ["prevent"]),
                            onDrop: withModifiers(handleDrop, ["prevent"]),
                            class: "flex flex-col items-center justify-center w-full h-48 sm:h-56 lg:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-primaryLight/30 transition-colors group"
                          }, [
                            createVNode("div", { class: "flex flex-col items-center justify-center px-4" }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-3 sm:mb-4 text-gray-500 group-hover:text-gray-600 transition-colors",
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 20 16"
                              }, [
                                createVNode("path", {
                                  stroke: "currentColor",
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                })
                              ])),
                              !dragActive.value ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "mb-2 text-sm sm:text-base lg:text-lg text-gray-500 text-center"
                              }, [
                                createVNode("span", { class: "font-semibold" }, "Click to upload"),
                                createTextVNode(" or drag and drop ")
                              ])) : createCommentVNode("", true),
                              dragActive.value ? (openBlock(), createBlock("p", {
                                key: 1,
                                class: "mb-2 text-sm sm:text-base lg:text-lg text-gray-500 text-center"
                              }, [
                                createVNode("span", { class: "font-semibold" }, "Click to upload"),
                                createTextVNode(" or drag and drop ")
                              ])) : createCommentVNode("", true),
                              createVNode("p", { class: "text-xs sm:text-sm text-gray-500 text-center" }, " PDF, PNG, JPG (MAX. 10MB per file) ")
                            ]),
                            createVNode("input", {
                              id: "dropzone-file",
                              type: "file",
                              disabled: unref(uploadForm).file.length > 0,
                              accept: ".pdf,.png,.jpg,.jpeg",
                              onChange: handleFileChange,
                              class: "hidden"
                            }, null, 40, ["disabled"])
                          ], 40, ["onDragenter", "onDragleave", "onDragover"]),
                          createVNode("div", { class: "py-5 flex items-center justify-start gap-2 w-full" }, [
                            checking.value ? (openBlock(), createBlock("button", {
                              key: 0,
                              class: "flex items-center gap-1 bg-primaryDark text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-primaryDark/90 disabled:cursor-not-allowed",
                              disabled: "",
                              size: "md"
                            }, [
                              createVNode(unref(_sfc_main$4)),
                              createTextVNode(" Checking for errors... ")
                            ])) : createCommentVNode("", true),
                            noErrors.value ? (openBlock(), createBlock("button", {
                              key: 1,
                              class: "flex items-center gap-1 bg-primaryDark text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-primaryDark/90 disabled:cursor-not-allowed",
                              disabled: "",
                              size: "md"
                            }, [
                              createVNode(unref(CheckCircle), { size: "20" }),
                              createTextVNode(" No Errors Found ")
                            ])) : createCommentVNode("", true),
                            foundError.value ? (openBlock(), createBlock("button", {
                              key: 2,
                              class: "flex items-center gap-1 bg-primaryDark text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-primaryDark/90 disabled:cursor-not-allowed",
                              disabled: "",
                              size: "md"
                            }, [
                              createVNode(unref(CheckCircle), { size: "20" }),
                              createTextVNode(" Errors Found. Please check the results. ")
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        uploadedFiles.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-2"
                        }, [
                          createVNode("p", { class: "text-sm font-semibold text-gray-700 mb-2" }, " Selected Files (" + toDisplayString(uploadedFiles.value.length) + ") ", 1),
                          (openBlock(true), createBlock(Fragment, null, renderList(uploadedFiles.value, (file2, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "w-full flex justify-between items-center px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50"
                            }, [
                              createVNode("span", { class: "truncate max-w-[200px] md:max-w-[300px] xl:max-w-[400px]" }, toDisplayString(file2.name), 1),
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => handleFileRemove(index),
                                class: "text-red-600 hover:text-red-800 transition-colors"
                              }, [
                                createVNode(unref(CloseCircle), {
                                  weight: "Bold",
                                  size: 24
                                })
                              ], 8, ["onClick"])
                            ]);
                          }), 128))
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "lg:flex space-y-2 items-center justify-between gap-2 sm:gap-3" }, [
                          createVNode(_sfc_main$1, {
                            class: "hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-primaryDark has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-primaryDark dark:has-[[aria-checked=true]]:bg-primaryDark",
                            for: "whatsappToogle"
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$2, {
                                id: "whatsappToogle",
                                modelValue: unref(uploadForm).sendViaWhatsapp,
                                "onUpdate:modelValue": ($event) => unref(uploadForm).sendViaWhatsapp = $event,
                                "default-value": unref(uploadForm).sendViaWhatsapp,
                                class: "data-[state=checked]:border-primaryDark data-[state=checked]:bg-primaryDark border-primaryDark data-[state=checked]:text-white dark:data-[state=checked]:border-primaryDark dark:data-[state=checked]:bg-primaryDark"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "default-value"]),
                              createVNode("div", { class: "grid gap-1.5 font-normal" }, [
                                createVNode("p", { class: "text-md text-gray-600 leading-none font-extrabold" }, " Send via Whatsapp "),
                                createVNode("p", { class: "text-muted-foreground font-bold text-md" }, " Select this option if you want to send the result through Whatsapp ")
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$1, {
                            class: "hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-primaryDark has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-primaryDark dark:has-[[aria-checked=true]]:bg-primaryDark",
                            for: "emailToogle"
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$2, {
                                id: "emailToogle",
                                modelValue: unref(uploadForm).sendViaEmail,
                                "onUpdate:modelValue": ($event) => unref(uploadForm).sendViaEmail = $event,
                                "default-value": unref(uploadForm).sendViaEmail,
                                class: "data-[state=checked]:border-primaryDark data-[state=checked]:bg-primaryDark border-primaryDark data-[state=checked]:text-white dark:data-[state=checked]:border-primaryDark dark:data-[state=checked]:bg-primaryDark"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "default-value"]),
                              createVNode("div", { class: "grid gap-1.5 font-normal" }, [
                                createVNode("p", { class: "text-md text-gray-600 leading-none font-extrabold" }, " Upload and send result immediately "),
                                createVNode("p", { class: "text-muted-foreground font-bold text-md" }, " Select this option if you want to send the result immediately after uploading ")
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(Transition, {
                          "enter-active-class": "transition-all duration-700 ease-out",
                          "enter-from-class": "opacity-0 max-h-0 scale-y-95",
                          "enter-to-class": "opacity-100 max-h-[500px] scale-y-100",
                          "leave-active-class": "transition-all duration-500 ease-in",
                          "leave-from-class": "opacity-100 max-h-[500px] scale-y-100",
                          "leave-to-class": "opacity-0 max-h-0 scale-y-95"
                        }, {
                          default: withCtx(() => [
                            !unref(uploadForm).sendViaEmail ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "space-y-2 origin-top overflow-hidden"
                            }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "block mb-2 text-sm sm:text-base font-extrabold text-gray-700" }, " Schedule Date "),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(uploadForm).scheduleDate = $event,
                                  type: "date",
                                  required: !unref(uploadForm).sendViaEmail,
                                  class: "w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-all duration-300 ease-in-out hover:border-blue-400 hover:shadow-md"
                                }, null, 8, ["onUpdate:modelValue", "required"]), [
                                  [vModelText, unref(uploadForm).scheduleDate]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block mb-2 text-sm sm:text-base font-extrabold text-gray-700" }, " Schedule Time "),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(uploadForm).scheduleTime = $event,
                                  type: "time",
                                  required: !unref(uploadForm).sendViaEmail,
                                  class: "w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-all duration-300 ease-in-out hover:border-blue-400 hover:shadow-md"
                                }, null, 8, ["onUpdate:modelValue", "required"]), [
                                  [vModelText, unref(uploadForm).scheduleTime]
                                ])
                              ])
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "flex flex-col sm:flex-row sm:justify-end gap-4 pt-2 sm:pt-4" }, [
                          createVNode("div", { class: "flex gap-2 sm:gap-3 w-full sm:w-auto" }, [
                            createVNode("button", {
                              type: "submit",
                              disabled: !unref(uploadForm).sendViaEmail && (!unref(uploadForm).scheduleDate || !unref(uploadForm).scheduleTime) || uploadedFiles.value.length === 0 || unref(uploadForm).processing || foundError.value || checking.value,
                              class: "flex-1 sm:flex-none sm:min-w-[100px] hover:-translate-y-1 duration-150 px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:transform-none"
                            }, toDisplayString(unref(uploadForm).processing ? "Uploading..." : "Upload"), 9, ["disabled"]),
                            createVNode("button", {
                              type: "button",
                              onClick: () => {
                                showUploadModal.value = false;
                                unref(uploadForm).reset();
                                uploadedFiles.value = [];
                              },
                              class: "flex-1 sm:flex-none sm:min-w-[100px] px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-gray-700 transition-all hover:-translate-y-1 duration-150 bg-gray-200 rounded-lg hover:bg-gray-300 hover:shadow-lg"
                            }, " Cancel ", 8, ["onClick"])
                          ])
                        ])
                      ], 32)
                    ])
                  ], 8, ["onClick"])) : createCommentVNode("", true),
                  previewFile.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",
                    onClick: withModifiers(($event) => previewFile.value = null, ["self"])
                  }, [
                    createVNode("div", { class: "w-full max-w-4xl p-6 bg-white rounded-xl max-h-[90vh] overflow-y-auto" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("h3", { class: "text-2xl font-bold text-gray-800" }, toDisplayString(previewFile.value.patient.full_name || "Patient") + " - " + toDisplayString(previewFile.value.result_type), 1),
                        createVNode("button", {
                          onClick: ($event) => previewFile.value = null,
                          class: "px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
                        }, " Close ", 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "p-4 mb-4 bg-gray-50 rounded-lg space-y-2" }, [
                        createVNode("p", { class: "text-sm text-gray-600" }, [
                          createVNode("strong", null, "Patient:"),
                          createTextVNode(" " + toDisplayString(previewFile.value.patient.full_name) + " (" + toDisplayString(previewFile.value.patient.email) + ") ", 1)
                        ]),
                        createVNode("p", { class: "text-sm text-gray-600" }, [
                          createVNode("strong", null, "Result Type:"),
                          createTextVNode(" " + toDisplayString(previewFile.value.result_type), 1)
                        ]),
                        createVNode("p", { class: "text-sm text-gray-600" }, [
                          createVNode("strong", null, "Uploaded:"),
                          createTextVNode(" " + toDisplayString(formatDate(previewFile.value.uploaded_at)), 1)
                        ]),
                        createVNode("p", { class: "text-sm text-gray-600" }, [
                          createVNode("strong", null, "Status:"),
                          createVNode("span", {
                            class: [{
                              "text-orange-700": previewFile.value.status === "pending",
                              "text-green-700": previewFile.value.status === "uploaded",
                              "text-red-700": previewFile.value.status === "failed"
                            }, "font-semibold capitalize"]
                          }, toDisplayString(previewFile.value.status), 3)
                        ])
                      ]),
                      previewFile.value.files && previewFile.value.files.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-4"
                      }, [
                        createVNode("h4", { class: "text-lg font-semibold text-gray-800" }, " Attached Files (" + toDisplayString(previewFile.value.files.length) + ") ", 1),
                        (openBlock(true), createBlock(Fragment, null, renderList(previewFile.value.files, (file2) => {
                          return openBlock(), createBlock("div", {
                            key: file2.id,
                            class: "flex items-center justify-center p-8 bg-gray-100 rounded-lg"
                          }, [
                            file2.file_type === "image/png" || file2.file_type === "image/jpg" || file2.file_type === "image/jpeg" ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center w-full"
                            }, [
                              createVNode("img", {
                                src: file2.file_url,
                                alt: file2.original_file_name,
                                class: "max-w-full max-h-96 mx-auto rounded-lg shadow"
                              }, null, 8, ["src", "alt"]),
                              createVNode("p", { class: "mt-2 text-sm text-gray-600" }, toDisplayString(file2.original_file_name), 1),
                              createVNode("button", {
                                onClick: ($event) => downloadResult(file2),
                                class: "px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                              }, " Download Image ", 8, ["onClick"])
                            ])) : file2.file_type === "application/pdf" ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "text-center w-full"
                            }, [
                              createVNode("iframe", {
                                src: file2.file_url,
                                class: "w-full h-96 rounded-lg"
                              }, null, 8, ["src"]),
                              createVNode("p", { class: "mt-2 text-sm text-gray-600" }, toDisplayString(file2.original_file_name), 1),
                              createVNode("button", {
                                onClick: ($event) => downloadResult(file2),
                                class: "px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                              }, " Download PDF ", 8, ["onClick"])
                            ])) : (openBlock(), createBlock("div", {
                              key: 2,
                              class: "text-center"
                            }, [
                              createVNode("span", { class: "text-6xl" }, "📄"),
                              createVNode("p", { class: "mt-4 text-gray-600 font-medium" }, toDisplayString(file2.original_file_name), 1),
                              createVNode("button", {
                                onClick: ($event) => downloadResult(file2),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
