import { defineComponent, ref, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, withDirectives, vModelText, withModifiers, vModelSelect, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-BJU7AtiY.js";
import { usePage, useForm, Head } from "@inertiajs/vue3";
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
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    results: {},
    stats: {}
  },
  setup(__props) {
    const page = usePage();
    console.log(page.props.auth);
    const uploadForm = useForm({
      patient_name: "",
      result_type: "",
      file: null
    });
    const showUploadModal = ref(false);
    const selectedFilter = ref("all");
    const searchQuery = ref("");
    const previewFile = ref(null);
    const mockStats = [
      {
        name: "total uploads",
        count: 156,
        icon: "📤",
        color: "primaryLight"
      },
      {
        name: "pending reviews",
        count: 12,
        icon: "⏳",
        color: "primaryDark"
      },
      {
        name: "completed results",
        count: 132,
        icon: "✅",
        color: "primaryDark"
      },
      {
        name: "total patients",
        count: 89,
        icon: "👥",
        color: "primaryDark"
      }
    ];
    let results = [];
    let filtered = results;
    const handleFileChange = (event) => {
      const target = event.target;
      if (target.files && target.files[0]) {
        uploadForm.file = target.files[0];
      }
    };
    const submitUpload = () => {
      uploadForm.post("/clinic/results/upload", {
        onSuccess: () => {
          uploadForm.reset();
          showUploadModal.value = false;
        }
      });
    };
    const filteredResults = (filter) => {
      selectedFilter.value = filter;
      if (selectedFilter.value !== "all") {
        filtered = results.filter((p) => p.status === selectedFilter.value);
      }
      if (selectedFilter.value === "all") {
        filtered = results;
      }
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = results.filter(
          (p) => p.patient_name.toLowerCase().includes(query) || p.result_type.toLowerCase().includes(query) || p.file_name.toLowerCase().includes(query)
        );
      }
    };
    const downloadResult = (result) => {
      window.open(result.file_path, "_blank");
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
    const loadFile = (event) => {
      console.log(event);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Clinic Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex w-full h-full gap-1 overflow-hidden bg-white"${_scopeId}><div class="w-full p-6 mb-16 overflow-y-scroll bg-white scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100"${_scopeId}><div class="mb-6"${_scopeId}><h1 class="text-4xl font-bold text-gray-800"${_scopeId}>Dashboard</h1><p class="text-gray-600 text-xl font-bold"${_scopeId}>Manage patient test results and uploads</p></div><div class="p-6 rounded-xl"${_scopeId}><div class="flex items-center justify-center mb-4"${_scopeId}><button class="px-6 py-3 text-xl font-bold text-white bg-primaryDark rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-150"${_scopeId}> + Upload New Result </button></div></div><div class="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4"${_scopeId}><!--[-->`);
            ssrRenderList(mockStats, (stat) => {
              _push2(`<div class="p-6 bg-white shadow-md rounded-xl group hover:shadow-lg transition-all duration-150"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-lg capitalize font-bold text-gray-600"${_scopeId}>${ssrInterpolate(stat.name)}</p><p class="mt-2 text-3xl font-bold text-blue-600"${_scopeId}>${ssrInterpolate(stat.count)}</p></div><div class="p-3 bg-blue-100 rounded-full"${_scopeId}><span class="text-2xl"${_scopeId}>${ssrInterpolate(stat.icon)}</span></div></div></div>`);
            });
            _push2(`<!--]--></div><div class="p-6 bg-white shadow-md rounded-xl"${_scopeId}><div class="mb-6"${_scopeId}><h2 class="mb-4 text-2xl font-bold text-gray-800"${_scopeId}>Patient Results</h2><div class="flex flex-col gap-4 mb-4 md:flex-row md:items-center text-xl font-extrabold md:justify-between"${_scopeId}><div class="flex gap-2"${_scopeId}><button class="${ssrRenderClass([selectedFilter.value === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700", "px-4 py-2 font-medium rounded-lg transition-colors"])}"${_scopeId}> All </button><button class="${ssrRenderClass([selectedFilter.value === "pending" ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700", "px-4 py-2 font-medium rounded-lg transition-colors"])}"${_scopeId}> Pending </button><button class="${ssrRenderClass([selectedFilter.value === "completed" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700", "px-4 py-2 font-medium rounded-lg transition-colors"])}"${_scopeId}> Completed </button><button class="${ssrRenderClass([selectedFilter.value === "reviewed" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700", "px-4 py-2 font-medium rounded-lg transition-colors"])}"${_scopeId}> Reviewed </button></div><div class="relative"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search patient or result type..." class="w-full px-4 py-2 pl-10 border placeholder:font-extrabold placeholder:text-md border-gray-300 rounded-lg md:w-80 focus:ring-2 focus:ring-blue-500 focus:border-transparent"${_scopeId}><span class="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"${_scopeId}>🔍</span></div></div></div><div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-md font-extrabold tracking-wider text-left text-gray-700 uppercase"${_scopeId}> Patient</th><th class="px-4 py-3 text-md font-extrabold tracking-wider text-left text-gray-700 uppercase"${_scopeId}> Result Type</th><th class="px-4 py-3 text-md font-extrabold tracking-wider text-left text-gray-700 uppercase"${_scopeId}> File</th><th class="px-4 py-3 text-md font-extrabold tracking-wider text-left text-gray-700 uppercase"${_scopeId}> Upload Date</th><th class="px-4 py-3 text-md font-extrabold tracking-wider text-left text-gray-700 uppercase"${_scopeId}> Status</th><th class="px-4 py-3 text-md font-extrabold tracking-wider text-left text-gray-700 uppercase"${_scopeId}> Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200 text-lg font-extrabold"${_scopeId}><!--[-->`);
            ssrRenderList(unref(filtered), (result) => {
              _push2(`<tr class="transition-colors hover:bg-gray-50"${_scopeId}><td class="px-4 py-4 text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(result.patient_name)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(result.result_type)}</td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}><span class="flex items-center gap-2"${_scopeId}><span${_scopeId}>${ssrInterpolate(getFileIcon(result.file_type))}</span><span class="truncate max-w-[200px]"${_scopeId}>${ssrInterpolate(result.file_name)}</span></span></td><td class="px-4 py-4 text-sm text-gray-700"${_scopeId}>${ssrInterpolate(formatDate(result.upload_date))}</td><td class="px-4 py-4 text-sm"${_scopeId}><span class="${ssrRenderClass([{
                "bg-orange-100 text-orange-800": result.status === "pending",
                "bg-green-100 text-green-800": result.status === "completed",
                "bg-purple-100 text-purple-800": result.status === "reviewed"
              }, "px-3 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(result.status.charAt(0).toUpperCase() + result.status.slice(1))}</span></td><td class="px-4 py-4 text-sm"${_scopeId}><div class="flex gap-2"${_scopeId}><button class="px-3 py-1 text-xs font-medium text-blue-700 transition-colors bg-blue-100 rounded hover:bg-blue-200"${_scopeId}> View </button><button class="px-3 py-1 text-xs font-medium text-green-700 transition-colors bg-green-100 rounded hover:bg-green-200"${_scopeId}> Download </button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (filteredResults.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="6" class="px-4 py-8 text-center text-gray-500"${_scopeId}> No results found </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div>`);
            if (showUploadModal.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black py-10 bg-opacity-50"${_scopeId}><div class="w-1/2 p-10 2xl:p-20 bg-white rounded-xl"${_scopeId}><h3 class="mb-4 text-2xl font-bold text-gray-800"${_scopeId}>Upload Patient Result</h3><form class="space-y-4"${_scopeId}><div${_scopeId}><label class="block mb-2 text-sm font-medium text-gray-700"${_scopeId}>Patient Name</label><input${ssrRenderAttr("value", unref(uploadForm).patient_name)} type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter patient name"${_scopeId}></div><div${_scopeId}><label class="block mb-2 text-sm font-medium text-gray-700"${_scopeId}>Patient Email</label><input${ssrRenderAttr("value", unref(uploadForm).patient_name)} type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter patient name"${_scopeId}></div><div${_scopeId}><label class="block mb-2 text-sm font-medium text-gray-700"${_scopeId}>Result Type</label><select required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"${_scopeId}><option class="font-chillax-bold" value=""${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "") : ssrLooseEqual(unref(uploadForm).result_type, "")) ? " selected" : ""}${_scopeId}>Select result type </option><option value="Blood Test"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "Blood Test") : ssrLooseEqual(unref(uploadForm).result_type, "Blood Test")) ? " selected" : ""}${_scopeId}>Blood Test</option><option value="X-Ray"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "X-Ray") : ssrLooseEqual(unref(uploadForm).result_type, "X-Ray")) ? " selected" : ""}${_scopeId}>X-Ray</option><option value="MRI"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "MRI") : ssrLooseEqual(unref(uploadForm).result_type, "MRI")) ? " selected" : ""}${_scopeId}>MRI</option><option value="CT Scan"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "CT Scan") : ssrLooseEqual(unref(uploadForm).result_type, "CT Scan")) ? " selected" : ""}${_scopeId}>CT Scan</option><option value="Lab Analysis"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "Lab Analysis") : ssrLooseEqual(unref(uploadForm).result_type, "Lab Analysis")) ? " selected" : ""}${_scopeId}>Lab Analysis</option><option value="Other"${ssrIncludeBooleanAttr(Array.isArray(unref(uploadForm).result_type) ? ssrLooseContain(unref(uploadForm).result_type, "Other") : ssrLooseEqual(unref(uploadForm).result_type, "Other")) ? " selected" : ""}${_scopeId}>Other</option></select></div><div class="flex items-center justify-center w-full"${_scopeId}><label for="dropzone-file" class="flex flex-col items-center justify-center w-full group h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-primaryLight/30"${_scopeId}><div class="flex flex-col items-center justify-center pt-5 pb-6"${_scopeId}><svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"${_scopeId}><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"${_scopeId}></path></svg><p class="mb-2 text-lg text-gray-500 dark:text-gray-400"${_scopeId}><span class="font-bold"${_scopeId}>Click to upload</span> or drag and drop </p><p class="text-md text-gray-500 dark:text-gray-400"${_scopeId}>SVG, PNG, JPG or GIF (MAX. 800x400px)</p></div><input id="dropzone-file" type="file" class="hidden"${_scopeId}></label></div><div class="flex justify-between"${_scopeId}><div class="flex items-center gap-3 w-1/2 pt-4"${_scopeId}><input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"${_scopeId}><span${_scopeId}>Click to upload and send result</span></div><div class="flex gap-3 w-1/2 pt-4"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(uploadForm).processing) ? " disabled" : ""} class="flex-1 hover:-translate-y-1 duration-150 px-4 py-2 font-semibold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"${_scopeId}>${ssrInterpolate(unref(uploadForm).processing ? "Uploading..." : "Upload")}</button><button type="button" class="flex-1 px-4 py-2 font-semibold text-gray-700 transition-all hover:-translate-y-1 duration-150 bg-gray-200 rounded-lg hover:bg-gray-300"${_scopeId}> Cancel </button></div></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (previewFile.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"${_scopeId}><div class="w-full max-w-4xl p-6 bg-white rounded-xl max-h-[90vh] overflow-y-auto"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h3 class="text-2xl font-bold text-gray-800"${_scopeId}>${ssrInterpolate(previewFile.value.patient_name)} - ${ssrInterpolate(previewFile.value.result_type)}</h3><button class="px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"${_scopeId}> Close </button></div><div class="p-4 mb-4 bg-gray-50 rounded-lg"${_scopeId}><p class="text-sm text-gray-600"${_scopeId}>File: ${ssrInterpolate(previewFile.value.file_name)}</p><p class="text-sm text-gray-600"${_scopeId}>Uploaded: ${ssrInterpolate(formatDate(previewFile.value.upload_date))}</p></div><div class="flex items-center justify-center p-8 bg-gray-100 rounded-lg"${_scopeId}>`);
              if (previewFile.value.file_type === "pdf") {
                _push2(`<div class="text-center"${_scopeId}><span class="text-6xl"${_scopeId}>📄</span><p class="mt-4 text-gray-600"${_scopeId}>PDF Preview</p><button class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"${_scopeId}> Open PDF </button></div>`);
              } else if (previewFile.value.file_type === "image") {
                _push2(`<div class="text-center"${_scopeId}><img${ssrRenderAttr("src", previewFile.value.file_path)} alt="Result preview" class="max-w-full max-h-96"${_scopeId}></div>`);
              } else {
                _push2(`<div class="text-center"${_scopeId}><span class="text-6xl"${_scopeId}>📊</span><p class="mt-4 text-gray-600"${_scopeId}>CSV Data File</p><button class="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"${_scopeId}> Download CSV </button></div>`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex w-full h-full gap-1 overflow-hidden bg-white" }, [
                createVNode("div", { class: "w-full p-6 mb-16 overflow-y-scroll bg-white scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("h1", { class: "text-4xl font-bold text-gray-800" }, "Dashboard"),
                    createVNode("p", { class: "text-gray-600 text-xl font-bold" }, "Manage patient test results and uploads")
                  ]),
                  createVNode("div", { class: "p-6 rounded-xl" }, [
                    createVNode("div", { class: "flex items-center justify-center mb-4" }, [
                      createVNode("button", {
                        onClick: ($event) => showUploadModal.value = true,
                        class: "px-6 py-3 text-xl font-bold text-white bg-primaryDark rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-150"
                      }, " + Upload New Result ", 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(mockStats, (stat) => {
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
                  createVNode("div", { class: "p-6 bg-white shadow-md rounded-xl" }, [
                    createVNode("div", { class: "mb-6" }, [
                      createVNode("h2", { class: "mb-4 text-2xl font-bold text-gray-800" }, "Patient Results"),
                      createVNode("div", { class: "flex flex-col gap-4 mb-4 md:flex-row md:items-center text-xl font-extrabold md:justify-between" }, [
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode("button", {
                            onClick: ($event) => filteredResults("all"),
                            class: [selectedFilter.value === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700", "px-4 py-2 font-medium rounded-lg transition-colors"]
                          }, " All ", 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => filteredResults("pending"),
                            class: [selectedFilter.value === "pending" ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700", "px-4 py-2 font-medium rounded-lg transition-colors"]
                          }, " Pending ", 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => filteredResults("completed"),
                            class: [selectedFilter.value === "completed" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700", "px-4 py-2 font-medium rounded-lg transition-colors"]
                          }, " Completed ", 10, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => filteredResults("reviewed"),
                            class: [selectedFilter.value === "reviewed" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700", "px-4 py-2 font-medium rounded-lg transition-colors"]
                          }, " Reviewed ", 10, ["onClick"])
                        ]),
                        createVNode("div", { class: "relative" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                            type: "text",
                            placeholder: "Search patient or result type...",
                            class: "w-full px-4 py-2 pl-10 border placeholder:font-extrabold placeholder:text-md border-gray-300 rounded-lg md:w-80 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, searchQuery.value]
                          ]),
                          createVNode("span", { class: "absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" }, "🔍")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "w-full" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-4 py-3 text-md font-extrabold tracking-wider text-left text-gray-700 uppercase" }, " Patient"),
                            createVNode("th", { class: "px-4 py-3 text-md font-extrabold tracking-wider text-left text-gray-700 uppercase" }, " Result Type"),
                            createVNode("th", { class: "px-4 py-3 text-md font-extrabold tracking-wider text-left text-gray-700 uppercase" }, " File"),
                            createVNode("th", { class: "px-4 py-3 text-md font-extrabold tracking-wider text-left text-gray-700 uppercase" }, " Upload Date"),
                            createVNode("th", { class: "px-4 py-3 text-md font-extrabold tracking-wider text-left text-gray-700 uppercase" }, " Status"),
                            createVNode("th", { class: "px-4 py-3 text-md font-extrabold tracking-wider text-left text-gray-700 uppercase" }, " Actions")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200 text-lg font-extrabold" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(filtered), (result) => {
                            return openBlock(), createBlock("tr", {
                              key: result.id,
                              class: "transition-colors hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-4 py-4 text-sm font-medium text-gray-900" }, toDisplayString(result.patient_name), 1),
                              createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(result.result_type), 1),
                              createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, [
                                createVNode("span", { class: "flex items-center gap-2" }, [
                                  createVNode("span", null, toDisplayString(getFileIcon(result.file_type)), 1),
                                  createVNode("span", { class: "truncate max-w-[200px]" }, toDisplayString(result.file_name), 1)
                                ])
                              ]),
                              createVNode("td", { class: "px-4 py-4 text-sm text-gray-700" }, toDisplayString(formatDate(result.upload_date)), 1),
                              createVNode("td", { class: "px-4 py-4 text-sm" }, [
                                createVNode("span", {
                                  class: [{
                                    "bg-orange-100 text-orange-800": result.status === "pending",
                                    "bg-green-100 text-green-800": result.status === "completed",
                                    "bg-purple-100 text-purple-800": result.status === "reviewed"
                                  }, "px-3 py-1 text-xs font-semibold rounded-full"]
                                }, toDisplayString(result.status.charAt(0).toUpperCase() + result.status.slice(1)), 3)
                              ]),
                              createVNode("td", { class: "px-4 py-4 text-sm" }, [
                                createVNode("div", { class: "flex gap-2" }, [
                                  createVNode("button", {
                                    onClick: ($event) => viewPreview(result),
                                    class: "px-3 py-1 text-xs font-medium text-blue-700 transition-colors bg-blue-100 rounded hover:bg-blue-200"
                                  }, " View ", 8, ["onClick"]),
                                  createVNode("button", {
                                    onClick: ($event) => downloadResult(result),
                                    class: "px-3 py-1 text-xs font-medium text-green-700 transition-colors bg-green-100 rounded hover:bg-green-200"
                                  }, " Download ", 8, ["onClick"])
                                ])
                              ])
                            ]);
                          }), 128)),
                          filteredResults.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                            createVNode("td", {
                              colspan: "6",
                              class: "px-4 py-8 text-center text-gray-500"
                            }, " No results found ")
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ])
                  ]),
                  showUploadModal.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "fixed inset-0 z-50 flex items-center justify-center bg-black py-10 bg-opacity-50"
                  }, [
                    createVNode("div", { class: "w-1/2 p-10 2xl:p-20 bg-white rounded-xl" }, [
                      createVNode("h3", { class: "mb-4 text-2xl font-bold text-gray-800" }, "Upload Patient Result"),
                      createVNode("form", {
                        onSubmit: withModifiers(submitUpload, ["prevent"]),
                        class: "space-y-4"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm font-medium text-gray-700" }, "Patient Name"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(uploadForm).patient_name = $event,
                            type: "text",
                            required: "",
                            class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                            placeholder: "Enter patient name"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(uploadForm).patient_name]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm font-medium text-gray-700" }, "Patient Email"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(uploadForm).patient_name = $event,
                            type: "text",
                            required: "",
                            class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                            placeholder: "Enter patient name"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(uploadForm).patient_name]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm font-medium text-gray-700" }, "Result Type"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(uploadForm).result_type = $event,
                            required: "",
                            class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          }, [
                            createVNode("option", {
                              class: "font-chillax-bold",
                              value: ""
                            }, "Select result type "),
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
                        createVNode("div", { class: "flex items-center justify-center w-full" }, [
                          createVNode("label", {
                            for: "dropzone-file",
                            class: "flex flex-col items-center justify-center w-full group h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-primaryLight/30"
                          }, [
                            createVNode("div", { class: "flex flex-col items-center justify-center pt-5 pb-6" }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-8 h-8 mb-4 text-gray-500 dark:text-gray-400",
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
                              createVNode("p", { class: "mb-2 text-lg text-gray-500 dark:text-gray-400" }, [
                                createVNode("span", { class: "font-bold" }, "Click to upload"),
                                createTextVNode(" or drag and drop ")
                              ]),
                              createVNode("p", { class: "text-md text-gray-500 dark:text-gray-400" }, "SVG, PNG, JPG or GIF (MAX. 800x400px)")
                            ]),
                            createVNode("input", {
                              id: "dropzone-file",
                              type: "file",
                              onDragenter: handleFileChange,
                              onDrop: ($event) => console.log("drop"),
                              onChange: loadFile,
                              class: "hidden"
                            }, null, 40, ["onDrop"])
                          ])
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("div", { class: "flex items-center gap-3 w-1/2 pt-4" }, [
                            createVNode("input", {
                              type: "checkbox",
                              class: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            }),
                            createVNode("span", null, "Click to upload and send result")
                          ]),
                          createVNode("div", { class: "flex gap-3 w-1/2 pt-4" }, [
                            createVNode("button", {
                              type: "submit",
                              disabled: unref(uploadForm).processing,
                              class: "flex-1 hover:-translate-y-1 duration-150 px-4 py-2 font-semibold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                            }, toDisplayString(unref(uploadForm).processing ? "Uploading..." : "Upload"), 9, ["disabled"]),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => showUploadModal.value = false,
                              class: "flex-1 px-4 py-2 font-semibold text-gray-700 transition-all hover:-translate-y-1 duration-150 bg-gray-200 rounded-lg hover:bg-gray-300"
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
                        createVNode("h3", { class: "text-2xl font-bold text-gray-800" }, toDisplayString(previewFile.value.patient_name) + " - " + toDisplayString(previewFile.value.result_type), 1),
                        createVNode("button", {
                          onClick: ($event) => previewFile.value = null,
                          class: "px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
                        }, " Close ", 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "p-4 mb-4 bg-gray-50 rounded-lg" }, [
                        createVNode("p", { class: "text-sm text-gray-600" }, "File: " + toDisplayString(previewFile.value.file_name), 1),
                        createVNode("p", { class: "text-sm text-gray-600" }, "Uploaded: " + toDisplayString(formatDate(previewFile.value.upload_date)), 1)
                      ]),
                      createVNode("div", { class: "flex items-center justify-center p-8 bg-gray-100 rounded-lg" }, [
                        previewFile.value.file_type === "pdf" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center"
                        }, [
                          createVNode("span", { class: "text-6xl" }, "📄"),
                          createVNode("p", { class: "mt-4 text-gray-600" }, "PDF Preview"),
                          createVNode("button", {
                            onClick: ($event) => downloadResult(previewFile.value),
                            class: "px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                          }, " Open PDF ", 8, ["onClick"])
                        ])) : previewFile.value.file_type === "image" ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-center"
                        }, [
                          createVNode("img", {
                            src: previewFile.value.file_path,
                            alt: "Result preview",
                            class: "max-w-full max-h-96"
                          }, null, 8, ["src"])
                        ])) : (openBlock(), createBlock("div", {
                          key: 2,
                          class: "text-center"
                        }, [
                          createVNode("span", { class: "text-6xl" }, "📊"),
                          createVNode("p", { class: "mt-4 text-gray-600" }, "CSV Data File"),
                          createVNode("button", {
                            onClick: ($event) => downloadResult(previewFile.value),
                            class: "px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                          }, " Download CSV ", 8, ["onClick"])
                        ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
