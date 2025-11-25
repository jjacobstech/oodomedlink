import { defineComponent, ref, resolveComponent, unref, withCtx, createVNode, createBlock, createCommentVNode, createTextVNode, toDisplayString, openBlock, Fragment, renderList, withModifiers, withDirectives, vModelText, vModelSelect, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-ZGkphgCd.js";
import { usePage, useForm, Head, router } from "@inertiajs/vue3";
import { u as useToast } from "./index-D9olpTuq.js";
import "./index-Cx41EZFO.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Patient",
  __ssrInlineRender: true,
  props: {
    patient: {}
  },
  setup(__props) {
    const props = __props;
    usePage();
    const { toast } = useToast();
    ref(false);
    const selectedResult = ref(null);
    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const formatDateTime = (dateString) => {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const showUploadModal = ref(false);
    const p = props.patient;
    const uploadForm = useForm({
      patient_name: p.full_name ?? "",
      patient_email: p.email ?? "",
      test_date: "",
      test_name: "",
      result_type: "",
      file: [],
      notes: "",
      sendViaEmail: true,
      scheduleDate: "",
      scheduleTime: ""
    });
    const handleFileChange = (event) => {
      const target = event.target;
      if (target.files && target.files.length > 0) {
        for (let file of target.files) {
          uploadedFiles.value.push(file);
          uploadForm.file.push(file);
        }
      }
    };
    const uploadedFiles = ref([]);
    const handleFileRemove = (index) => {
      uploadedFiles.value.splice(index, 1);
      uploadForm.file.splice(index, 1);
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
            class: "text-primaryDark bg-white shadow-lg bottom-96",
            open: true
          });
        },
        onError: (errors) => {
          console.error("Upload error:", errors);
        }
      });
    };
    const calculateAge = (dob) => {
      if (!dob) return "N/A";
      const birthDate = new Date(dob);
      const today = /* @__PURE__ */ new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) {
        age--;
      }
      return `${age} years`;
    };
    const goBack = () => {
      router.visit(route("user.patients"));
    };
    const deletePatient = () => {
      if (confirm(
        "Are you sure you want to delete this patient? This action cannot be undone."
      )) {
        router.delete(route("user.patients.destroy", props.patient.id), {
          onSuccess: (response) => {
            toast({
              title: response.props.success ? "Patient Deleted" : "Patient Deletion Error",
              description: response.props.success ?? response.props.error,
              variant: "default",
              open: true,
              class: "text-primaryDark bg-white shadow-lg bottom-96",
              duration: 1e4
            });
          },
          onError: (error) => {
            toast({
              title: "Deletion Failed",
              description: "Failed to delete patient. Please try again.",
              variant: "destructive",
              duration: 5e3
            });
          }
        });
      }
    };
    const getStatusColor = (status) => {
      switch (status) {
        case "sent":
          return "bg-green-100 text-green-800";
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "failed":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };
    const viewResult = (result) => {
      selectedResult.value = result;
    };
    const downloadFile = (file) => {
      window.open(file.file_url, "_blank");
    };
    const formatFileSize = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CloseCircle = resolveComponent("CloseCircle");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Patient: ${__props.patient.full_name}`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex w-full gap-1 overflow-y-hidden bg-primaryLight"${_scopeId}><div class="overflow-y-scroll w-full p-4 sm:p-6"${_scopeId}><div class="mb-6"${_scopeId}><button class="mb-4 flex items-center gap-2 text-primaryDark hover:text-primaryDark/80 font-semibold transition text-sm sm:text-base"${_scopeId}><span${_scopeId}>←</span> Back to Patients </button><div class="flex flex-col sm:flex-row justify-between items-start gap-4"${_scopeId}><div class="flex-1 min-w-0"${_scopeId}><h1 class="text-2xl sm:text-3xl font-bold text-gray-800 break-words"${_scopeId}>${ssrInterpolate(__props.patient.full_name)}</h1><p class="text-sm sm:text-base text-gray-600 mt-1"${_scopeId}> Patient Details &amp; Medical Records </p></div><div class="flex gap-2 sm:gap-3 w-full sm:w-auto"${_scopeId}><button class="flex-1 sm:flex-initial rounded-md bg-red-600 px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all duration-150 hover:-translate-y-1 hover:shadow-lg"${_scopeId}> Delete </button></div></div></div><div class="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6"${_scopeId}><h2 class="text-lg sm:text-xl font-bold text-gray-800 mb-4 pb-2 border-b"${_scopeId}> Personal Information </h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"${_scopeId}><div class="space-y-1"${_scopeId}><label class="text-xs sm:text-sm font-semibold text-gray-500 uppercase"${_scopeId}>Full Name</label><p class="text-base sm:text-lg text-gray-800 break-words"${_scopeId}>${ssrInterpolate(__props.patient.full_name)}</p></div><div class="space-y-1"${_scopeId}><label class="text-xs sm:text-sm font-semibold text-gray-500 uppercase"${_scopeId}>Email</label><p class="text-base sm:text-lg text-gray-800 break-all"${_scopeId}>${ssrInterpolate(__props.patient.email)}</p></div><div class="space-y-1"${_scopeId}><label class="text-xs sm:text-sm font-semibold text-gray-500 uppercase"${_scopeId}>Phone Number</label><p class="text-base sm:text-lg text-gray-800"${_scopeId}>${ssrInterpolate(__props.patient.phone_no || "N/A")}</p></div><div class="space-y-1"${_scopeId}><label class="text-xs sm:text-sm font-semibold text-gray-500 uppercase"${_scopeId}>Gender</label><p class="text-base sm:text-lg text-gray-800"${_scopeId}>${ssrInterpolate(__props.patient.gender || "N/A")}</p></div><div class="space-y-1"${_scopeId}><label class="text-xs sm:text-sm font-semibold text-gray-500 uppercase"${_scopeId}>Date of Birth</label><p class="text-base sm:text-lg text-gray-800"${_scopeId}>${ssrInterpolate(formatDate(__props.patient.date_of_birth))} `);
            if (__props.patient.date_of_birth) {
              _push2(`<span class="text-gray-500 text-sm sm:text-base ml-2"${_scopeId}> (${ssrInterpolate(calculateAge(__props.patient.date_of_birth))}) </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</p></div><div class="space-y-1"${_scopeId}><label class="text-xs sm:text-sm font-semibold text-gray-500 uppercase"${_scopeId}>Patient Since</label><p class="text-base sm:text-lg text-gray-800"${_scopeId}>${ssrInterpolate(formatDate(__props.patient.created_at))}</p></div><div class="sm:col-span-2 space-y-1"${_scopeId}><label class="text-xs sm:text-sm font-semibold text-gray-500 uppercase"${_scopeId}>Address</label><p class="text-base sm:text-lg text-gray-800 break-words"${_scopeId}>${ssrInterpolate(__props.patient.address || "N/A")}</p></div></div></div><div class="bg-white rounded-xl shadow-md p-4 sm:p-6"${_scopeId}><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 pb-2 border-b"${_scopeId}><h2 class="text-lg sm:text-xl font-bold text-gray-800"${_scopeId}> Medical Results (${ssrInterpolate(__props.patient.results?.length || 0)}) </h2><button class="w-full sm:w-auto rounded-md bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition-all duration-150 hover:shadow-lg"${_scopeId}> + Upload Result </button></div>`);
            if (__props.patient.results && __props.patient.results.length > 0) {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.patient.results, (result) => {
                _push2(`<div class="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition"${_scopeId}><div class="flex flex-col sm:flex-row justify-between items-start gap-3"${_scopeId}><div class="flex-1 w-full min-w-0"${_scopeId}><div class="flex flex-wrap items-center gap-2 mb-2"${_scopeId}><h3 class="text-base sm:text-lg font-semibold text-gray-800 break-words"${_scopeId}>${ssrInterpolate(result.result_type || "Medical Result")}</h3><span class="${ssrRenderClass([getStatusColor(result.status), "px-2 sm:px-3 py-1 rounded-full text-xs font-semibold uppercase whitespace-nowrap"])}"${_scopeId}>${ssrInterpolate(result.status)}</span></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600"${_scopeId}><div${_scopeId}><span class="font-semibold"${_scopeId}>Uploaded:</span> ${ssrInterpolate(formatDateTime(
                  result.uploaded_at
                ))}</div><div${_scopeId}><span class="font-semibold"${_scopeId}>Files:</span> ${ssrInterpolate(result.files?.length || 0)} file(s) </div></div></div><div class="w-full sm:w-auto"${_scopeId}><button class="w-full sm:w-auto rounded bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-200"${_scopeId}> View Details </button></div></div>`);
                if (result.files && result.files.length > 0) {
                  _push2(`<div class="mt-4 pt-4 border-t"${_scopeId}><p class="text-xs sm:text-sm font-semibold text-gray-700 mb-2"${_scopeId}> Attached Files: </p><div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"${_scopeId}><!--[-->`);
                  ssrRenderList(result.files, (file) => {
                    _push2(`<div class="border rounded-lg p-2 sm:p-3 hover:shadow-md transition cursor-pointer"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><span class="text-xl sm:text-2xl"${_scopeId}>📄</span><div class="flex-1 min-w-0"${_scopeId}><p class="text-xs font-medium text-gray-800 truncate"${ssrRenderAttr(
                      "title",
                      file.original_file_name
                    )}${_scopeId}>${ssrInterpolate(file.original_file_name)}</p><p class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(formatFileSize(
                      file.file_size
                    ))}</p></div></div></div>`);
                  });
                  _push2(`<!--]--></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-8 sm:py-12 text-gray-500"${_scopeId}><div class="text-4xl sm:text-6xl mb-4"${_scopeId}>📋</div><p class="text-base sm:text-lg font-medium"${_scopeId}> No medical results found </p><p class="text-xs sm:text-sm mt-2 px-4"${_scopeId}> Upload results to start tracking this patient&#39;s medical history </p></div>`);
            }
            _push2(`</div>`);
            if (selectedResult.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"${_scopeId}><div class="w-full max-w-3xl bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto"${_scopeId}><div class="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-start justify-between gap-4"${_scopeId}><h3 class="text-lg sm:text-2xl font-bold text-gray-800 break-words flex-1"${_scopeId}> Result Details </h3><button class="flex-shrink-0 text-gray-400 hover:text-gray-600 text-2xl font-bold"${_scopeId}> × </button></div><div class="p-4 sm:p-6 space-y-4"${_scopeId}><div class="space-y-1"${_scopeId}><label class="text-xs sm:text-sm font-semibold text-gray-500 uppercase"${_scopeId}>Result Type</label><p class="text-base sm:text-lg text-gray-800 break-words"${_scopeId}>${ssrInterpolate(selectedResult.value.result_type)}</p></div><div class="space-y-1"${_scopeId}><label class="text-xs sm:text-sm font-semibold text-gray-500 uppercase"${_scopeId}>Status</label><span class="${ssrRenderClass([
                getStatusColor(selectedResult.value.status),
                "inline-block mt-1 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase"
              ])}"${_scopeId}>${ssrInterpolate(selectedResult.value.status)}</span></div><div class="space-y-1"${_scopeId}><label class="text-xs sm:text-sm font-semibold text-gray-500 uppercase"${_scopeId}>Uploaded</label><p class="text-base sm:text-lg text-gray-800"${_scopeId}>${ssrInterpolate(formatDateTime(
                selectedResult.value.uploaded_at
              ))}</p></div><div class="space-y-2"${_scopeId}><label class="text-xs sm:text-sm font-semibold text-gray-500 uppercase"${_scopeId}>Files (${ssrInterpolate(selectedResult.value.files?.length || 0)})</label><div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(selectedResult.value.files, (file) => {
                _push2(`<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 border rounded-lg hover:bg-gray-50"${_scopeId}><div class="flex items-center gap-3 flex-1 min-w-0"${_scopeId}><span class="text-2xl"${_scopeId}>📄</span><div class="min-w-0 flex-1"${_scopeId}><p class="font-medium text-gray-800 text-sm sm:text-base break-all"${_scopeId}>${ssrInterpolate(file.original_file_name)}</p><p class="text-xs sm:text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatFileSize(
                  file.file_size
                ))}</p></div></div><button class="w-full sm:w-auto px-4 py-2 bg-primaryDark text-white rounded-lg hover:bg-primaryDark/90 transition text-sm font-semibold whitespace-nowrap"${_scopeId}> Download </button></div>`);
              });
              _push2(`<!--]--></div></div></div><div class="border-t p-4 sm:p-6"${_scopeId}><button class="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold text-sm sm:text-base"${_scopeId}> Close </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showUploadModal.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6 lg:p-10"${_scopeId}><div class="w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl p-6 sm:p-8 lg:p-10 xl:p-16 bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto"${_scopeId}><h3 class="mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800"${_scopeId}> Upload Patient Result </h3><form class="space-y-4 sm:space-y-5 lg:space-y-6"${_scopeId}><div${_scopeId}><label class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700"${_scopeId}> Patient Name </label><input${ssrRenderAttr("value", unref(uploadForm).patient_name)} type="text" required class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Enter patient name" autocomplete="name"${_scopeId}></div><div${_scopeId}><label class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700"${_scopeId}> Patient Email </label><input${ssrRenderAttr("value", unref(uploadForm).patient_email)} type="email" required class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Enter patient email" autocomplete="email"${_scopeId}></div><div${_scopeId}><label class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700"${_scopeId}> Test Name </label><input${ssrRenderAttr("value", unref(uploadForm).test_name)} type="text" required class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Enter test name"${_scopeId}></div><div${_scopeId}><label class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700"${_scopeId}> Result Type </label><select required class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "") : ssrLooseEqual(unref(uploadForm).result_type, "")) ? " selected" : ""}${_scopeId}>Select result type</option><option value="Blood Test"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "Blood Test") : ssrLooseEqual(unref(uploadForm).result_type, "Blood Test")) ? " selected" : ""}${_scopeId}>Blood Test</option><option value="X-Ray"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "X-Ray") : ssrLooseEqual(unref(uploadForm).result_type, "X-Ray")) ? " selected" : ""}${_scopeId}>X-Ray</option><option value="MRI"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "MRI") : ssrLooseEqual(unref(uploadForm).result_type, "MRI")) ? " selected" : ""}${_scopeId}>MRI</option><option value="CT Scan"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "CT Scan") : ssrLooseEqual(unref(uploadForm).result_type, "CT Scan")) ? " selected" : ""}${_scopeId}>CT Scan</option><option value="Lab Analysis"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "Lab Analysis") : ssrLooseEqual(unref(uploadForm).result_type, "Lab Analysis")) ? " selected" : ""}${_scopeId}> Lab Analysis </option><option value="Other"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "Other") : ssrLooseEqual(unref(uploadForm).result_type, "Other")) ? " selected" : ""}${_scopeId}>Other</option></select></div><div${_scopeId}><label class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700"${_scopeId}> Test Date </label><input${ssrRenderAttr("value", unref(uploadForm).test_date)} type="date" required class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" autocomplete="date"${_scopeId}></div><div${_scopeId}><label class="block mb-2 text-sm font-extrabold sm:text-base text-gray-700"${_scopeId}> Notes </label><textarea rows="3" class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="e.g referrals, prescriptions etc"${_scopeId}>${ssrInterpolate(unref(uploadForm).notes)}</textarea></div><div class="flex items-center justify-center w-full"${_scopeId}><label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-48 sm:h-56 lg:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-primaryLight/30 transition-colors group"${_scopeId}><div class="flex flex-col items-center justify-center px-4"${_scopeId}><svg class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-3 sm:mb-4 text-gray-500 group-hover:text-gray-600 transition-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"${_scopeId}><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"${_scopeId}></path></svg><p class="mb-2 text-sm sm:text-base lg:text-lg text-gray-500 text-center"${_scopeId}><span class="font-semibold"${_scopeId}>Click to upload</span> or drag and drop </p><p class="text-xs sm:text-sm text-gray-500 text-center"${_scopeId}> PDF, PNG, JPG (MAX. 10MB per file) </p></div><input id="dropzone-file" type="file" multiple accept=".pdf,.png,.jpg,.jpeg" class="hidden"${_scopeId}></label></div>`);
              if (uploadedFiles.value.length > 0) {
                _push2(`<div class="space-y-2"${_scopeId}><p class="text-sm font-semibold text-gray-700 mb-2"${_scopeId}> Selected Files (${ssrInterpolate(uploadedFiles.value.length)}) </p><!--[-->`);
                ssrRenderList(uploadedFiles.value, (file, index) => {
                  _push2(`<div class="w-full flex justify-between items-center px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50"${_scopeId}><span class="truncate max-w-[200px] md:max-w-[300px] xl:max-w-[400px]"${_scopeId}>${ssrInterpolate(file.name)}</span><button type="button" class="text-red-600 hover:text-red-800 transition-colors"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_CloseCircle, {
                    weight: "Bold",
                    size: 24
                  }, null, _parent2, _scopeId));
                  _push2(`</button></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(uploadForm).sendViaEmail) {
                _push2(`<div class="space-y-2"${_scopeId}><label class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700"${_scopeId}> Schedule Date </label><input${ssrRenderAttr("value", unref(uploadForm).scheduleDate)} type="date" class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"${_scopeId}><label class="block mb-2 text-sm sm:text-base font-extrabold text-gray-700"${_scopeId}> Schedule Time </label><input${ssrRenderAttr("value", unref(uploadForm).scheduleTime)} type="time" class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex flex-col sm:flex-row sm:justify-between gap-4 pt-2 sm:pt-4"${_scopeId}><div class="flex items-center gap-2 sm:gap-3"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).sendViaEmail) ? ssrLooseContain(unref(uploadForm).sendViaEmail, null) : unref(uploadForm).sendViaEmail) ? " checked" : ""} class="w-4 h-4 sm:w-5 sm:h-5 text-primaryDark bg-gray-100 border-gray-300 rounded focus:ring-primaryDark focus:ring-2 transition-all flex-shrink-0"${_scopeId}><span class="text-xs font-extrabold sm:text-sm lg:text-base text-gray-700"${_scopeId}> Upload and send result immediately </span></div><div class="flex gap-2 sm:gap-3 w-full sm:w-auto"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(
                unref(uploadForm).processing || uploadedFiles.value.length === 0
              ) ? " disabled" : ""} class="flex-1 sm:flex-none sm:min-w-[100px] hover:-translate-y-1 duration-150 px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:transform-none"${_scopeId}>${ssrInterpolate(unref(uploadForm).processing ? "Uploading..." : "Upload")}</button><button type="button" class="flex-1 sm:flex-none sm:min-w-[100px] px-4 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-gray-700 transition-all hover:-translate-y-1 duration-150 bg-gray-200 rounded-lg hover:bg-gray-300 hover:shadow-lg"${_scopeId}> Cancel </button></div></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex w-full gap-1 overflow-y-hidden bg-primaryLight" }, [
                createVNode("div", { class: "overflow-y-scroll w-full p-4 sm:p-6" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("button", {
                      onClick: goBack,
                      class: "mb-4 flex items-center gap-2 text-primaryDark hover:text-primaryDark/80 font-semibold transition text-sm sm:text-base"
                    }, [
                      createVNode("span", null, "←"),
                      createTextVNode(" Back to Patients ")
                    ]),
                    createVNode("div", { class: "flex flex-col sm:flex-row justify-between items-start gap-4" }, [
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createVNode("h1", { class: "text-2xl sm:text-3xl font-bold text-gray-800 break-words" }, toDisplayString(__props.patient.full_name), 1),
                        createVNode("p", { class: "text-sm sm:text-base text-gray-600 mt-1" }, " Patient Details & Medical Records ")
                      ]),
                      createVNode("div", { class: "flex gap-2 sm:gap-3 w-full sm:w-auto" }, [
                        createVNode("button", {
                          onClick: deletePatient,
                          class: "flex-1 sm:flex-initial rounded-md bg-red-600 px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white transition-all duration-150 hover:-translate-y-1 hover:shadow-lg"
                        }, " Delete ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6" }, [
                    createVNode("h2", { class: "text-lg sm:text-xl font-bold text-gray-800 mb-4 pb-2 border-b" }, " Personal Information "),
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" }, [
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode("label", { class: "text-xs sm:text-sm font-semibold text-gray-500 uppercase" }, "Full Name"),
                        createVNode("p", { class: "text-base sm:text-lg text-gray-800 break-words" }, toDisplayString(__props.patient.full_name), 1)
                      ]),
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode("label", { class: "text-xs sm:text-sm font-semibold text-gray-500 uppercase" }, "Email"),
                        createVNode("p", { class: "text-base sm:text-lg text-gray-800 break-all" }, toDisplayString(__props.patient.email), 1)
                      ]),
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode("label", { class: "text-xs sm:text-sm font-semibold text-gray-500 uppercase" }, "Phone Number"),
                        createVNode("p", { class: "text-base sm:text-lg text-gray-800" }, toDisplayString(__props.patient.phone_no || "N/A"), 1)
                      ]),
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode("label", { class: "text-xs sm:text-sm font-semibold text-gray-500 uppercase" }, "Gender"),
                        createVNode("p", { class: "text-base sm:text-lg text-gray-800" }, toDisplayString(__props.patient.gender || "N/A"), 1)
                      ]),
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode("label", { class: "text-xs sm:text-sm font-semibold text-gray-500 uppercase" }, "Date of Birth"),
                        createVNode("p", { class: "text-base sm:text-lg text-gray-800" }, [
                          createTextVNode(toDisplayString(formatDate(__props.patient.date_of_birth)) + " ", 1),
                          __props.patient.date_of_birth ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-gray-500 text-sm sm:text-base ml-2"
                          }, " (" + toDisplayString(calculateAge(__props.patient.date_of_birth)) + ") ", 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode("label", { class: "text-xs sm:text-sm font-semibold text-gray-500 uppercase" }, "Patient Since"),
                        createVNode("p", { class: "text-base sm:text-lg text-gray-800" }, toDisplayString(formatDate(__props.patient.created_at)), 1)
                      ]),
                      createVNode("div", { class: "sm:col-span-2 space-y-1" }, [
                        createVNode("label", { class: "text-xs sm:text-sm font-semibold text-gray-500 uppercase" }, "Address"),
                        createVNode("p", { class: "text-base sm:text-lg text-gray-800 break-words" }, toDisplayString(__props.patient.address || "N/A"), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-xl shadow-md p-4 sm:p-6" }, [
                    createVNode("div", { class: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 pb-2 border-b" }, [
                      createVNode("h2", { class: "text-lg sm:text-xl font-bold text-gray-800" }, " Medical Results (" + toDisplayString(__props.patient.results?.length || 0) + ") ", 1),
                      createVNode("button", {
                        onClick: ($event) => showUploadModal.value = true,
                        class: "w-full sm:w-auto rounded-md bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition-all duration-150 hover:shadow-lg"
                      }, " + Upload Result ", 8, ["onClick"])
                    ]),
                    __props.patient.results && __props.patient.results.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.patient.results, (result) => {
                        return openBlock(), createBlock("div", {
                          key: result.id,
                          class: "border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition"
                        }, [
                          createVNode("div", { class: "flex flex-col sm:flex-row justify-between items-start gap-3" }, [
                            createVNode("div", { class: "flex-1 w-full min-w-0" }, [
                              createVNode("div", { class: "flex flex-wrap items-center gap-2 mb-2" }, [
                                createVNode("h3", { class: "text-base sm:text-lg font-semibold text-gray-800 break-words" }, toDisplayString(result.result_type || "Medical Result"), 1),
                                createVNode("span", {
                                  class: [getStatusColor(result.status), "px-2 sm:px-3 py-1 rounded-full text-xs font-semibold uppercase whitespace-nowrap"]
                                }, toDisplayString(result.status), 3)
                              ]),
                              createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600" }, [
                                createVNode("div", null, [
                                  createVNode("span", { class: "font-semibold" }, "Uploaded:"),
                                  createTextVNode(" " + toDisplayString(formatDateTime(
                                    result.uploaded_at
                                  )), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("span", { class: "font-semibold" }, "Files:"),
                                  createTextVNode(" " + toDisplayString(result.files?.length || 0) + " file(s) ", 1)
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "w-full sm:w-auto" }, [
                              createVNode("button", {
                                onClick: ($event) => viewResult(result),
                                class: "w-full sm:w-auto rounded bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-200"
                              }, " View Details ", 8, ["onClick"])
                            ])
                          ]),
                          result.files && result.files.length > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-4 pt-4 border-t"
                          }, [
                            createVNode("p", { class: "text-xs sm:text-sm font-semibold text-gray-700 mb-2" }, " Attached Files: "),
                            createVNode("div", { class: "grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(result.files, (file) => {
                                return openBlock(), createBlock("div", {
                                  key: file.id,
                                  class: "border rounded-lg p-2 sm:p-3 hover:shadow-md transition cursor-pointer",
                                  onClick: ($event) => downloadFile(file)
                                }, [
                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                    createVNode("span", { class: "text-xl sm:text-2xl" }, "📄"),
                                    createVNode("div", { class: "flex-1 min-w-0" }, [
                                      createVNode("p", {
                                        class: "text-xs font-medium text-gray-800 truncate",
                                        title: file.original_file_name
                                      }, toDisplayString(file.original_file_name), 9, ["title"]),
                                      createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(formatFileSize(
                                        file.file_size
                                      )), 1)
                                    ])
                                  ])
                                ], 8, ["onClick"]);
                              }), 128))
                            ])
                          ])) : createCommentVNode("", true)
                        ]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center py-8 sm:py-12 text-gray-500"
                    }, [
                      createVNode("div", { class: "text-4xl sm:text-6xl mb-4" }, "📋"),
                      createVNode("p", { class: "text-base sm:text-lg font-medium" }, " No medical results found "),
                      createVNode("p", { class: "text-xs sm:text-sm mt-2 px-4" }, " Upload results to start tracking this patient's medical history ")
                    ]))
                  ]),
                  selectedResult.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4",
                    onClick: withModifiers(($event) => selectedResult.value = null, ["self"])
                  }, [
                    createVNode("div", { class: "w-full max-w-3xl bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto" }, [
                      createVNode("div", { class: "sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-start justify-between gap-4" }, [
                        createVNode("h3", { class: "text-lg sm:text-2xl font-bold text-gray-800 break-words flex-1" }, " Result Details "),
                        createVNode("button", {
                          onClick: ($event) => selectedResult.value = null,
                          class: "flex-shrink-0 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                        }, " × ", 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "p-4 sm:p-6 space-y-4" }, [
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode("label", { class: "text-xs sm:text-sm font-semibold text-gray-500 uppercase" }, "Result Type"),
                          createVNode("p", { class: "text-base sm:text-lg text-gray-800 break-words" }, toDisplayString(selectedResult.value.result_type), 1)
                        ]),
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode("label", { class: "text-xs sm:text-sm font-semibold text-gray-500 uppercase" }, "Status"),
                          createVNode("span", {
                            class: [
                              getStatusColor(selectedResult.value.status),
                              "inline-block mt-1 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase"
                            ]
                          }, toDisplayString(selectedResult.value.status), 3)
                        ]),
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode("label", { class: "text-xs sm:text-sm font-semibold text-gray-500 uppercase" }, "Uploaded"),
                          createVNode("p", { class: "text-base sm:text-lg text-gray-800" }, toDisplayString(formatDateTime(
                            selectedResult.value.uploaded_at
                          )), 1)
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("label", { class: "text-xs sm:text-sm font-semibold text-gray-500 uppercase" }, "Files (" + toDisplayString(selectedResult.value.files?.length || 0) + ")", 1),
                          createVNode("div", { class: "space-y-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(selectedResult.value.files, (file) => {
                              return openBlock(), createBlock("div", {
                                key: file.id,
                                class: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 border rounded-lg hover:bg-gray-50"
                              }, [
                                createVNode("div", { class: "flex items-center gap-3 flex-1 min-w-0" }, [
                                  createVNode("span", { class: "text-2xl" }, "📄"),
                                  createVNode("div", { class: "min-w-0 flex-1" }, [
                                    createVNode("p", { class: "font-medium text-gray-800 text-sm sm:text-base break-all" }, toDisplayString(file.original_file_name), 1),
                                    createVNode("p", { class: "text-xs sm:text-sm text-gray-500" }, toDisplayString(formatFileSize(
                                      file.file_size
                                    )), 1)
                                  ])
                                ]),
                                createVNode("button", {
                                  onClick: ($event) => downloadFile(file),
                                  class: "w-full sm:w-auto px-4 py-2 bg-primaryDark text-white rounded-lg hover:bg-primaryDark/90 transition text-sm font-semibold whitespace-nowrap"
                                }, " Download ", 8, ["onClick"])
                              ]);
                            }), 128))
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "border-t p-4 sm:p-6" }, [
                        createVNode("button", {
                          onClick: ($event) => selectedResult.value = null,
                          class: "w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold text-sm sm:text-base"
                        }, " Close ", 8, ["onClick"])
                      ])
                    ])
                  ], 8, ["onClick"])) : createCommentVNode("", true),
                  showUploadModal.value ? (openBlock(), createBlock("div", {
                    key: 1,
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
                              createVNode("p", { class: "text-xs sm:text-sm text-gray-500 text-center" }, " PDF, PNG, JPG (MAX. 10MB per file) ")
                            ]),
                            createVNode("input", {
                              id: "dropzone-file",
                              type: "file",
                              multiple: "",
                              accept: ".pdf,.png,.jpg,.jpeg",
                              onChange: handleFileChange,
                              class: "hidden"
                            }, null, 32)
                          ])
                        ]),
                        uploadedFiles.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-2"
                        }, [
                          createVNode("p", { class: "text-sm font-semibold text-gray-700 mb-2" }, " Selected Files (" + toDisplayString(uploadedFiles.value.length) + ") ", 1),
                          (openBlock(true), createBlock(Fragment, null, renderList(uploadedFiles.value, (file, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "w-full flex justify-between items-center px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50"
                            }, [
                              createVNode("span", { class: "truncate max-w-[200px] md:max-w-[300px] xl:max-w-[400px]" }, toDisplayString(file.name), 1),
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => handleFileRemove(index),
                                class: "text-red-600 hover:text-red-800 transition-colors"
                              }, [
                                createVNode(_component_CloseCircle, {
                                  weight: "Bold",
                                  size: 24
                                })
                              ], 8, ["onClick"])
                            ]);
                          }), 128))
                        ])) : createCommentVNode("", true),
                        unref(uploadForm).sendViaEmail ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-2"
                        }, [
                          createVNode("label", { class: "block mb-2 text-sm sm:text-base font-extrabold text-gray-700" }, " Schedule Date "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(uploadForm).scheduleDate = $event,
                            type: "date",
                            class: "w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(uploadForm).scheduleDate]
                          ]),
                          createVNode("label", { class: "block mb-2 text-sm sm:text-base font-extrabold text-gray-700" }, " Schedule Time "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(uploadForm).scheduleTime = $event,
                            type: "time",
                            class: "w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(uploadForm).scheduleTime]
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex flex-col sm:flex-row sm:justify-between gap-4 pt-2 sm:pt-4" }, [
                          createVNode("div", { class: "flex items-center gap-2 sm:gap-3" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              "onUpdate:modelValue": ($event) => unref(uploadForm).sendViaEmail = $event,
                              class: "w-4 h-4 sm:w-5 sm:h-5 text-primaryDark bg-gray-100 border-gray-300 rounded focus:ring-primaryDark focus:ring-2 transition-all flex-shrink-0"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(uploadForm).sendViaEmail]
                            ]),
                            createVNode("span", { class: "text-xs font-extrabold sm:text-sm lg:text-base text-gray-700" }, " Upload and send result immediately ")
                          ]),
                          createVNode("div", { class: "flex gap-2 sm:gap-3 w-full sm:w-auto" }, [
                            createVNode("button", {
                              type: "submit",
                              disabled: unref(uploadForm).processing || uploadedFiles.value.length === 0,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Patient.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
