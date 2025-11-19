import { defineComponent, ref, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, withDirectives, vModelText, withModifiers, vModelSelect, createTextVNode, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-hu7FW2Vw.js";
import { usePage, useForm, Head, router } from "@inertiajs/vue3";
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
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    user: {},
    results: {},
    stats: {},
    prevPage: {},
    nextPage: {}
  },
  setup(__props) {
    const page = usePage();
    const base_url = page.props.ziggy.base_url;
    const props = __props;
    const showUploadModal = ref(false);
    const selectedFilter = ref("all");
    const searchQuery = ref("");
    const previewFile = ref(null);
    const stats = [
      {
        name: "total uploads",
        count: props.stats?.total_uploads,
        icon: "📤",
        color: "primaryDark"
      },
      {
        name: "pending results",
        count: props.stats?.pending_results,
        icon: "⏳",
        color: "primaryDark"
      },
      {
        name: "completed results",
        count: props.stats?.completed_result,
        icon: "✅",
        color: "primaryDark"
      },
      {
        name: "total patients",
        count: props.stats?.total_patients,
        icon: "👥",
        color: "primaryDark"
      }
    ];
    let results = props.results || [];
    let filtered = results;
    const selectionFilter = ["all", "pending", "sent", "failed"];
    const uploadForm = useForm({
      patient_name: "",
      patient_email: "",
      test_date: "",
      test_name: "",
      result_type: "",
      file: [],
      notes: "",
      sendViaEmail: false
    });
    const uploadedFiles = ref([]);
    const handleFileChange = (event) => {
      const target = event.target;
      if (target.files && target.files[0]) {
        for (let file of target.files) {
          uploadedFiles.value.push(file);
          uploadForm?.file?.push(file);
        }
        console.log(uploadedFiles.value, uploadForm.file);
      }
    };
    const submitUpload = () => {
      uploadForm.post(route("clinic.result.upload"), {
        onSuccess: (response) => {
          console.log(response);
          uploadForm.reset();
          uploadedFiles.value = [];
          showUploadModal.value = false;
        },
        onError: (response) => {
          console.log(response);
        }
      });
    };
    const filteredResults = (filter) => {
      router.get(route("user.dashboard"), { filter });
    };
    const getPage = (page2) => {
      if (page2 === null) {
        return;
      }
      page2 = 1;
      return router.get(route("user.dashboard"), { page: page2 });
    };
    const downloadResult = (file) => {
      window.open(`${base_url}/storage/${file.file_path}`, "_blank");
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Clinic Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex w-full gap-1 overflow-y-hidden bg-primaryLight"${_scopeId}><div class="w-full p-6 mb-16 overflow-y-auto bg-transparent scrollbar-thin scrollbar-thumb-primaryDark scrollbar-track-primaryLight"${_scopeId}><div class="mb-6"${_scopeId}><h1 class="text-4xl font-bold text-gray-800"${_scopeId}>Dashboard</h1><p class="text-gray-600 text-xl font-bold"${_scopeId}>Manage patient test results and uploads</p></div><div class="p-6 rounded-xl"${_scopeId}><div class="flex items-center justify-center mb-4"${_scopeId}><button class="px-6 py-5 text-xl font-bold text-white bg-primaryDark rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-150"${_scopeId}> + Upload New Result </button></div></div><div class="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4"${_scopeId}><!--[-->`);
            ssrRenderList(stats, (stat) => {
              _push2(`<div class="p-6 bg-white shadow-md rounded-xl group hover:shadow-lg transition-all duration-150"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-lg capitalize font-bold text-gray-600"${_scopeId}>${ssrInterpolate(stat.name)}</p><p class="mt-2 text-3xl font-bold text-blue-600"${_scopeId}>${ssrInterpolate(stat.count)}</p></div><div class="p-3 bg-blue-100 rounded-full"${_scopeId}><span class="text-2xl"${_scopeId}>${ssrInterpolate(stat.icon)}</span></div></div></div>`);
            });
            _push2(`<!--]--></div><div class="p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-xl"${_scopeId}><div class="mb-4 sm:mb-6"${_scopeId}><h2 class="mb-3 sm:mb-4 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800"${_scopeId}> Patient Results </h2><div class="flex flex-col gap-3 sm:gap-4 mb-4"${_scopeId}><div class="flex flex-wrap gap-2 sm:gap-3"${_scopeId}><!--[-->`);
            ssrRenderList(selectionFilter, (selection) => {
              _push2(`<button class="${ssrRenderClass([selectedFilter.value === selection ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700", "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base font-medium rounded-lg transition-all hover:shadow-md"])}"${_scopeId}>${ssrInterpolate(selection.charAt(0).toUpperCase() + selection.slice(1))}</button>`);
            });
            _push2(`<!--]--></div><div class="relative w-full sm:w-auto sm:max-w-md lg:max-w-lg"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search patient or result type..." class="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 text-sm sm:text-base border border-gray-300 rounded-lg placeholder:text-gray-400 placeholder:text-sm sm:placeholder:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"${_scopeId}><span class="absolute text-base sm:text-lg text-gray-400 transform -translate-y-1/2 left-3 top-1/2"${_scopeId}> 🔍 </span></div></div></div><div class="overflow-x-auto -mx-4 sm:mx-0 rounded-lg"${_scopeId}><div class="inline-block min-w-full align-middle"${_scopeId}><div class="overflow-hidden border-b border-gray-200 sm:rounded-lg"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase"${_scopeId}> Patient </th><th class="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase"${_scopeId}> Result Type </th><th class="hidden lg:table-cell px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase"${_scopeId}> File </th><th class="hidden xl:table-cell px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase"${_scopeId}> Upload Date </th><th class="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase"${_scopeId}> Status </th><th class="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider text-left text-gray-700 uppercase"${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(unref(filtered), (result) => {
              _push2(`<tr class="transition-colors hover:bg-gray-50"${_scopeId}><td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4"${_scopeId}><div class="text-xs sm:text-sm lg:text-base font-medium text-gray-900"${_scopeId}>${ssrInterpolate(result.patient.full_name)}</div><div class="md:hidden text-xs text-gray-500 mt-1"${_scopeId}>${ssrInterpolate(result.result_type)}</div></td><td class="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm lg:text-base text-gray-700"${_scopeId}>${ssrInterpolate(result.result_type)}</td><td class="hidden lg:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4"${_scopeId}><!--[-->`);
              ssrRenderList(result.files, (file) => {
                _push2(`<span class="flex items-center gap-2 text-xs sm:text-sm text-gray-700"${_scopeId}><span${_scopeId}>${ssrInterpolate(getFileIcon(result.file_type))}</span><span class="truncate max-w-[150px] xl:max-w-[200px]"${_scopeId}>${ssrInterpolate(file.original_file_name)}</span></span>`);
              });
              _push2(`<!--]--></td><td class="hidden xl:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700"${_scopeId}>${ssrInterpolate(formatDate(result.uploaded_at))}</td><td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4"${_scopeId}><span class="${ssrRenderClass([{
                "bg-orange-100 text-orange-800": result.status === "pending",
                "bg-green-100 text-green-800": result.status === "completed",
                "bg-purple-100 text-purple-800": result.status === "reviewed"
              }, "inline-flex px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold rounded-full whitespace-nowrap"])}"${_scopeId}>${ssrInterpolate(result.status.charAt(0).toUpperCase() + result.status.slice(1))}</span></td><td class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4"${_scopeId}><div class="flex flex-col sm:flex-row gap-1 sm:gap-2"${_scopeId}><button class="px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-blue-700 transition-all bg-blue-100 rounded hover:bg-blue-200 hover:shadow-sm whitespace-nowrap"${_scopeId}> View </button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (unref(filtered).length === 0) {
              _push2(`<tr${_scopeId}><td colspan="6" class="px-4 py-8 sm:py-12 text-center sm:text-base lg:text-lg text-gray-600"${_scopeId}> No results found </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div><div class="w-full py-3 bg-transparent flex items-center h-full gap-10 justify-end px-5"${_scopeId}><button class="btn bg-primaryDark rounded-xl hover:text-primaryDark hover:bg-white hover:shadow-primaryDark/30 px-3 text-lg font-bold py-2 shadow-md text-white"${_scopeId}>Prev</button><button class="btn bg-primaryDark rounded-xl hover:text-primaryDark hover:bg-white hover:shadow-primaryDark/30 px-3 text-lg font-bold py-2 shadow-md text-white"${_scopeId}>Next</button></div></div></div></div>`);
            if (showUploadModal.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6 lg:p-10"${_scopeId}><div class="w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl p-6 sm:p-8 lg:p-10 xl:p-16 bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto"${_scopeId}><h3 class="mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800"${_scopeId}> Upload Patient Result </h3><form class="space-y-4 sm:space-y-5 lg:space-y-6"${_scopeId}><div${_scopeId}><label class="block mb-2 text-sm sm:text-base font-medium text-gray-700"${_scopeId}> Patient Name </label><input${ssrRenderAttr("value", unref(uploadForm).patient_name)} type="text" required class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Enter patient name" autofocus autocomplete="name"${_scopeId}></div><div${_scopeId}><label class="block mb-2 text-sm sm:text-base font-medium text-gray-700"${_scopeId}> Patient Email </label><input${ssrRenderAttr("value", unref(uploadForm).patient_email)} type="email" required class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Enter patient email" autofocus autocomplete="email"${_scopeId}></div><div${_scopeId}><label class="block mb-2 text-sm sm:text-base font-medium text-gray-700"${_scopeId}> Test Name </label><input${ssrRenderAttr("value", unref(uploadForm).test_name)} type="text" required class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Enter patient email" autofocus autocomplete="date"${_scopeId}></div><div${_scopeId}><label class="block mb-2 text-sm sm:text-base font-medium text-gray-700"${_scopeId}> Result Type </label><select required class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "") : ssrLooseEqual(unref(uploadForm).result_type, "")) ? " selected" : ""}${_scopeId}>Select result type</option><option value="Blood Test"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "Blood Test") : ssrLooseEqual(unref(uploadForm).result_type, "Blood Test")) ? " selected" : ""}${_scopeId}>Blood Test</option><option value="X-Ray"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "X-Ray") : ssrLooseEqual(unref(uploadForm).result_type, "X-Ray")) ? " selected" : ""}${_scopeId}>X-Ray</option><option value="MRI"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "MRI") : ssrLooseEqual(unref(uploadForm).result_type, "MRI")) ? " selected" : ""}${_scopeId}>MRI</option><option value="CT Scan"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "CT Scan") : ssrLooseEqual(unref(uploadForm).result_type, "CT Scan")) ? " selected" : ""}${_scopeId}>CT Scan</option><option value="Lab Analysis"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "Lab Analysis") : ssrLooseEqual(unref(uploadForm).result_type, "Lab Analysis")) ? " selected" : ""}${_scopeId}>Lab Analysis</option><option value="Other"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "Other") : ssrLooseEqual(unref(uploadForm).result_type, "Other")) ? " selected" : ""}${_scopeId}>Other</option></select></div><div${_scopeId}><label class="block mb-2 text-sm sm:text-base font-medium text-gray-700"${_scopeId}> Test Date </label><input${ssrRenderAttr("value", unref(uploadForm).test_date)} type="date" required class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Enter patient email" autofocus autocomplete="date"${_scopeId}></div><div${_scopeId}><label class="block mb-2 text-sm sm:text-base font-medium text-gray-700"${_scopeId}> Notes </label><textarea class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="e.g referrals, prescriptions etc "${_scopeId}>${ssrInterpolate(unref(uploadForm).notes)}</textarea></div><div class="flex items-center justify-center w-full"${_scopeId}><label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-48 sm:h-56 lg:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-primaryLight/30 transition-colors group"${_scopeId}><div class="flex flex-col items-center justify-center px-4"${_scopeId}><svg class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-3 sm:mb-4 text-gray-500 group-hover:text-gray-600 transition-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"${_scopeId}><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"${_scopeId}></path></svg><p class="mb-2 text-sm sm:text-base lg:text-lg text-gray-500 text-center"${_scopeId}><span class="font-semibold"${_scopeId}>Click to upload</span> or drag and drop </p><p class="text-xs sm:text-sm text-gray-500 text-center"${_scopeId}> SVG, PNG, JPG or GIF (MAX. 800x400px) </p></div><input id="dropzone-file" type="file" multiple class="hidden"${_scopeId}></label></div><div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(uploadedFiles.value, (files) => {
                _push2(`<p class="w-full flex justify-between items-center px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="e.g referrals, prescriptions etc "${_scopeId}><span${_scopeId}>${ssrInterpolate(files.name)}</span><span class="font-extrabold text-lg text-primaryDark"${_scopeId}>X</span></p>`);
              });
              _push2(`<!--]--></div><div class="flex flex-col sm:flex-row sm:justify-between gap-4 pt-2 sm:pt-4"${_scopeId}><div class="flex items-center gap-2 sm:gap-3"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).sendViaEmail) ? ssrLooseContain(unref(uploadForm).sendViaEmail, null) : unref(uploadForm).sendViaEmail) ? " checked" : ""} class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all flex-shrink-0"${_scopeId}><span class="text-xs sm:text-sm lg:text-base text-gray-700"${_scopeId}> Upload and send result immediately </span></div><div class="flex gap-2 sm:gap-3 w-full sm:w-auto"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(uploadForm).processing) ? " disabled" : ""} class="flex-1 sm:flex-none sm:min-w-[100px] hover:-translate-y-1 duration-150 px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:transform-none"${_scopeId}>${ssrInterpolate(unref(uploadForm).processing ? "Uploading..." : "Upload")}</button><button type="button" class="flex-1 sm:flex-none sm:min-w-[100px] px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-gray-700 transition-all hover:-translate-y-1 duration-150 bg-gray-200 rounded-lg hover:bg-gray-300 hover:shadow-lg"${_scopeId}> Cancel </button></div></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (previewFile.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"${_scopeId}><div class="w-full max-w-4xl p-6 bg-white rounded-xl max-h-[90vh] overflow-y-auto"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h3 class="text-2xl font-bold text-gray-800"${_scopeId}>${ssrInterpolate(previewFile.value.patient.full_name ?? "Patient")} - ${ssrInterpolate(previewFile.value.result_type)}</h3><button class="px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"${_scopeId}> Close </button></div><div class="p-4 mb-4 bg-gray-50 rounded-lg"${_scopeId}><!--[-->`);
              ssrRenderList(previewFile.value.files, (file) => {
                _push2(`<p class="text-sm text-gray-600"${_scopeId}>File: ${ssrInterpolate(file.original_file_name)}</p>`);
              });
              _push2(`<!--]--><p class="text-sm text-gray-600"${_scopeId}>Uploaded: ${ssrInterpolate(formatDate(previewFile.value.uploaded_at))}</p></div><!--[-->`);
              ssrRenderList(previewFile.value.files, (file) => {
                _push2(`<div class="flex items-center justify-center p-8 my-2 bg-gray-100 rounded-lg"${_scopeId}>`);
                if (file.file_type === "image/png" || file.file_type === "image/jpg" || file.file_type === "image/jpeg") {
                  _push2(`<div class="text-center"${_scopeId}><img${ssrRenderAttr("src", unref(base_url) + "/storage/" + file.file_path)} alt="Result preview" class="max-w-full max-h-96"${_scopeId}><button class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"${_scopeId}> Download Image </button></div>`);
                } else {
                  _push2(`<div class="text-center"${_scopeId}><span class="text-6xl"${_scopeId}>📊</span><p class="mt-4 text-gray-600"${_scopeId}> File</p><button class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"${_scopeId}> Download </button></div>`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex w-full gap-1 overflow-y-hidden bg-primaryLight" }, [
                createVNode("div", { class: "w-full p-6 mb-16 overflow-y-auto bg-transparent scrollbar-thin scrollbar-thumb-primaryDark scrollbar-track-primaryLight" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("h1", { class: "text-4xl font-bold text-gray-800" }, "Dashboard"),
                    createVNode("p", { class: "text-gray-600 text-xl font-bold" }, "Manage patient test results and uploads")
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
                              onClick: ($event) => filteredResults(selection),
                              class: [selectedFilter.value === selection ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700", "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base font-medium rounded-lg transition-all hover:shadow-md"]
                            }, toDisplayString(selection.charAt(0).toUpperCase() + selection.slice(1)), 11, ["onClick"]);
                          }), 64))
                        ]),
                        createVNode("div", { class: "relative w-full sm:w-auto sm:max-w-md lg:max-w-lg" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                            type: "text",
                            placeholder: "Search patient or result type...",
                            class: "w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 text-sm sm:text-base border border-gray-300 rounded-lg placeholder:text-gray-400 placeholder:text-sm sm:placeholder:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, searchQuery.value]
                          ]),
                          createVNode("span", { class: "absolute text-base sm:text-lg text-gray-400 transform -translate-y-1/2 left-3 top-1/2" }, " 🔍 ")
                        ])
                      ])
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
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(filtered), (result) => {
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
                                    (openBlock(true), createBlock(Fragment, null, renderList(result.files, (file) => {
                                      return openBlock(), createBlock("span", {
                                        key: file.id,
                                        class: "flex items-center gap-2 text-xs sm:text-sm text-gray-700"
                                      }, [
                                        createVNode("span", null, toDisplayString(getFileIcon(result.file_type)), 1),
                                        createVNode("span", { class: "truncate max-w-[150px] xl:max-w-[200px]" }, toDisplayString(file.original_file_name), 1)
                                      ]);
                                    }), 128))
                                  ]),
                                  createVNode("td", { class: "hidden xl:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700" }, toDisplayString(formatDate(result.uploaded_at)), 1),
                                  createVNode("td", { class: "px-3 sm:px-4 lg:px-6 py-3 sm:py-4" }, [
                                    createVNode("span", {
                                      class: [{
                                        "bg-orange-100 text-orange-800": result.status === "pending",
                                        "bg-green-100 text-green-800": result.status === "completed",
                                        "bg-purple-100 text-purple-800": result.status === "reviewed"
                                      }, "inline-flex px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold rounded-full whitespace-nowrap"]
                                    }, toDisplayString(result.status.charAt(0).toUpperCase() + result.status.slice(1)), 3)
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
                              unref(filtered).length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                                createVNode("td", {
                                  colspan: "6",
                                  class: "px-4 py-8 sm:py-12 text-center sm:text-base lg:text-lg text-gray-600"
                                }, " No results found ")
                              ])) : createCommentVNode("", true)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "w-full py-3 bg-transparent flex items-center h-full gap-10 justify-end px-5" }, [
                          createVNode("button", {
                            onClick: ($event) => getPage(props.nextPage),
                            class: "btn bg-primaryDark rounded-xl hover:text-primaryDark hover:bg-white hover:shadow-primaryDark/30 px-3 text-lg font-bold py-2 shadow-md text-white"
                          }, "Prev", 8, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => getPage(props.prevPage),
                            class: "btn bg-primaryDark rounded-xl hover:text-primaryDark hover:bg-white hover:shadow-primaryDark/30 px-3 text-lg font-bold py-2 shadow-md text-white"
                          }, "Next", 8, ["onClick"])
                        ])
                      ])
                    ])
                  ]),
                  showUploadModal.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6 lg:p-10"
                  }, [
                    createVNode("div", { class: "w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl p-6 sm:p-8 lg:p-10 xl:p-16 bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto" }, [
                      createVNode("h3", { class: "mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800" }, " Upload Patient Result "),
                      createVNode("form", {
                        onSubmit: withModifiers(submitUpload, ["prevent"]),
                        class: "space-y-4 sm:space-y-5 lg:space-y-6"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm sm:text-base font-medium text-gray-700" }, " Patient Name "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(uploadForm).patient_name = $event,
                            type: "text",
                            required: "",
                            class: "w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all",
                            placeholder: "Enter patient name",
                            autofocus: "",
                            autocomplete: "name"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(uploadForm).patient_name]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm sm:text-base font-medium text-gray-700" }, " Patient Email "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(uploadForm).patient_email = $event,
                            type: "email",
                            required: "",
                            class: "w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all",
                            placeholder: "Enter patient email",
                            autofocus: "",
                            autocomplete: "email"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(uploadForm).patient_email]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm sm:text-base font-medium text-gray-700" }, " Test Name "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(uploadForm).test_name = $event,
                            type: "text",
                            required: "",
                            class: "w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all",
                            placeholder: "Enter patient email",
                            autofocus: "",
                            autocomplete: "date"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(uploadForm).test_name]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm sm:text-base font-medium text-gray-700" }, " Result Type "),
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
                            createVNode("option", { value: "Lab Analysis" }, "Lab Analysis"),
                            createVNode("option", { value: "Other" }, "Other")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(uploadForm).result_type]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm sm:text-base font-medium text-gray-700" }, " Test Date "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(uploadForm).test_date = $event,
                            type: "date",
                            required: "",
                            class: "w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all",
                            placeholder: "Enter patient email",
                            autofocus: "",
                            autocomplete: "date"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(uploadForm).test_date]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm sm:text-base font-medium text-gray-700" }, " Notes "),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(uploadForm).notes = $event,
                            class: "w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all",
                            placeholder: "e.g referrals, prescriptions etc "
                          }, "                                                ", 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(uploadForm).notes]
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center justify-center w-full" }, [
                          createVNode("label", {
                            for: "dropzone-file",
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
                              createVNode("p", { class: "mb-2 text-sm sm:text-base lg:text-lg text-gray-500 text-center" }, [
                                createVNode("span", { class: "font-semibold" }, "Click to upload"),
                                createTextVNode(" or drag and drop ")
                              ]),
                              createVNode("p", { class: "text-xs sm:text-sm text-gray-500 text-center" }, " SVG, PNG, JPG or GIF (MAX. 800x400px) ")
                            ]),
                            createVNode("input", {
                              id: "dropzone-file",
                              type: "file",
                              multiple: "",
                              onChange: handleFileChange,
                              onDragenter: ($event) => console.log("dragenter"),
                              onDragleave: ($event) => console.log("dragleave"),
                              onDragover: ($event) => console.log("dragover"),
                              onDrop: ($event) => console.log("drop"),
                              class: "hidden"
                            }, null, 40, ["onDragenter", "onDragleave", "onDragover", "onDrop"])
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(uploadedFiles.value, (files) => {
                            return openBlock(), createBlock("p", {
                              key: files.name,
                              class: "w-full flex justify-between items-center px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all",
                              placeholder: "e.g referrals, prescriptions etc "
                            }, [
                              createVNode("span", null, toDisplayString(files.name), 1),
                              createVNode("span", { class: "font-extrabold text-lg text-primaryDark" }, "X")
                            ]);
                          }), 128))
                        ]),
                        createVNode("div", { class: "flex flex-col sm:flex-row sm:justify-between gap-4 pt-2 sm:pt-4" }, [
                          createVNode("div", { class: "flex items-center gap-2 sm:gap-3" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              "onUpdate:modelValue": ($event) => unref(uploadForm).sendViaEmail = $event,
                              class: "w-4 h-4 sm:w-5 sm:h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all flex-shrink-0"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(uploadForm).sendViaEmail]
                            ]),
                            createVNode("span", { class: "text-xs sm:text-sm lg:text-base text-gray-700" }, " Upload and send result immediately ")
                          ]),
                          createVNode("div", { class: "flex gap-2 sm:gap-3 w-full sm:w-auto" }, [
                            createVNode("button", {
                              type: "submit",
                              disabled: unref(uploadForm).processing,
                              class: "flex-1 sm:flex-none sm:min-w-[100px] hover:-translate-y-1 duration-150 px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:transform-none"
                            }, toDisplayString(unref(uploadForm).processing ? "Uploading..." : "Upload"), 9, ["disabled"]),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => showUploadModal.value = false,
                              class: "flex-1 sm:flex-none sm:min-w-[100px] px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-gray-700 transition-all hover:-translate-y-1 duration-150 bg-gray-200 rounded-lg hover:bg-gray-300 hover:shadow-lg"
                            }, " Cancel ", 8, ["onClick"])
                          ])
                        ])
                      ], 32)
                    ])
                  ])) : createCommentVNode("", true),
                  previewFile.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                  }, [
                    createVNode("div", { class: "w-full max-w-4xl p-6 bg-white rounded-xl max-h-[90vh] overflow-y-auto" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("h3", { class: "text-2xl font-bold text-gray-800" }, toDisplayString(previewFile.value.patient.full_name ?? "Patient") + " - " + toDisplayString(previewFile.value.result_type), 1),
                        createVNode("button", {
                          onClick: ($event) => previewFile.value = null,
                          class: "px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
                        }, " Close ", 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "p-4 mb-4 bg-gray-50 rounded-lg" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(previewFile.value.files, (file) => {
                          return openBlock(), createBlock("p", {
                            key: file.id,
                            class: "text-sm text-gray-600"
                          }, "File: " + toDisplayString(file.original_file_name), 1);
                        }), 128)),
                        createVNode("p", { class: "text-sm text-gray-600" }, "Uploaded: " + toDisplayString(formatDate(previewFile.value.uploaded_at)), 1)
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(previewFile.value.files, (file) => {
                        return openBlock(), createBlock("div", {
                          key: file.id,
                          class: "flex items-center justify-center p-8 my-2 bg-gray-100 rounded-lg"
                        }, [
                          file.file_type === "image/png" || file.file_type === "image/jpg" || file.file_type === "image/jpeg" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center"
                          }, [
                            createVNode("img", {
                              src: unref(base_url) + "/storage/" + file.file_path,
                              alt: "Result preview",
                              class: "max-w-full max-h-96"
                            }, null, 8, ["src"]),
                            createVNode("button", {
                              onClick: ($event) => downloadResult(file),
                              class: "px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            }, " Download Image ", 8, ["onClick"])
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-center"
                          }, [
                            createVNode("span", { class: "text-6xl" }, "📊"),
                            createVNode("p", { class: "mt-4 text-gray-600" }, " File"),
                            createVNode("button", {
                              onClick: ($event) => downloadResult(file),
                              class: "px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            }, " Download ", 8, ["onClick"])
                          ]))
                        ]);
                      }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
