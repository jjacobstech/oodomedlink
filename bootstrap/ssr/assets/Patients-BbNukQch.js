import { defineComponent, watch, ref, unref, withCtx, createVNode, createBlock, createCommentVNode, withDirectives, vModelText, toDisplayString, openBlock, Fragment, renderList, createTextVNode, withModifiers, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-Dyav4ti9.js";
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
  __name: "Patients",
  __ssrInlineRender: true,
  props: {
    patients: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const { toast } = useToast();
    watch(
      () => page.props.success,
      (newValue) => {
        if (newValue) {
          toast({
            title: "Success",
            description: newValue,
            variant: "default",
            class: "text-primaryDark bg-white shadow-lg",
            duration: 5e3
          });
        }
      },
      { immediate: true }
    );
    const selectedFilter = ref(props.filters?.gender || "all");
    const searchQuery = ref(props.filters?.search || "");
    const showAddPatientModal = ref(false);
    const showEditPatientModal = ref(false);
    const editingPatient = ref(null);
    const addPatientForm = useForm({
      full_name: "",
      email: "",
      phone_no: "",
      gender: "",
      date_of_birth: "",
      address: ""
    });
    const editPatientForm = useForm({
      full_name: "",
      email: "",
      phone_no: "",
      gender: "",
      date_of_birth: "",
      address: ""
    });
    const applyFilters = (genderFilter) => {
      if (genderFilter !== void 0) {
        selectedFilter.value = genderFilter;
      }
      const payload = {};
      if (selectedFilter.value && selectedFilter.value !== "all") {
        payload.gender = selectedFilter.value;
      }
      if (searchQuery.value && searchQuery.value.trim() !== "") {
        payload.search = searchQuery.value.trim();
      }
      router.get(route("user.patients"), payload, {
        preserveScroll: true,
        preserveState: true
      });
    };
    const clearFilters = () => {
      selectedFilter.value = "all";
      searchQuery.value = "";
      router.get(
        route("user.patients"),
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
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const viewPatient = (patient) => {
      router.visit(route("user.patients.show", patient.id));
    };
    const openEditModal = (patient) => {
      editingPatient.value = patient;
      editPatientForm.full_name = patient.full_name;
      editPatientForm.email = patient.email;
      editPatientForm.phone_no = patient.phone_no;
      editPatientForm.gender = patient.gender;
      editPatientForm.date_of_birth = patient.date_of_birth || "";
      editPatientForm.address = patient.address || "";
      showEditPatientModal.value = true;
    };
    const submitAddPatient = () => {
      addPatientForm.post(route("user.patients.store"), {
        onSuccess: () => {
          addPatientForm.reset();
          showAddPatientModal.value = false;
        },
        onError: (errors) => {
        }
      });
    };
    const submitEditPatient = () => {
      if (!editingPatient.value) return;
      editPatientForm.put(route("user.patients.update", editingPatient.value.id), {
        onSuccess: () => {
          editPatientForm.reset();
          showEditPatientModal.value = false;
          editingPatient.value = null;
        },
        onError: (errors) => {
        }
      });
    };
    const handleSearchKeydown = (event) => {
      if (event.key === "Enter") {
        applyFilters();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Manage Patients" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex w-full gap-1 h-full overflow-y-hidden bg-primaryLight"${_scopeId}><div class="overflow-y-scroll w-full p-4 sm:p-6"${_scopeId}><div class="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6"${_scopeId}><div class="flex-1"${_scopeId}><h1 class="text-2xl sm:text-3xl font-bold text-gray-800"${_scopeId}> Patients Management </h1><p class="text-sm sm:text-base text-gray-600 mt-1"${_scopeId}> View and manage all registered patients and their test results </p></div><div class="w-full sm:w-auto"${_scopeId}><button class="w-full sm:w-auto rounded-md bg-primaryDark px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white transition-all duration-150 hover:-translate-y-1 hover:shadow-lg"${_scopeId}> + Add Patient </button></div></div><div class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"${_scopeId}><div class="flex flex-wrap gap-2"${_scopeId}><button class="${ssrRenderClass([
              selectedFilter.value === "all" ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700",
              "rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium transition-all hover:shadow-md"
            ])}"${_scopeId}> All </button><button class="${ssrRenderClass([
              selectedFilter.value === "Male" ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700",
              "rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium transition-all hover:shadow-md"
            ])}"${_scopeId}> Male </button><button class="${ssrRenderClass([
              selectedFilter.value === "Female" ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700",
              "rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium transition-all hover:shadow-md"
            ])}"${_scopeId}> Female </button></div><div class="flex flex-col sm:flex-row gap-2 w-full lg:w-auto"${_scopeId}><div class="relative flex-1 lg:flex-initial"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search by name, email or phone..." class="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-primaryDark lg:w-80"${_scopeId}><span class="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"${_scopeId}>🔍</span></div><div class="flex gap-2"${_scopeId}><button class="flex-1 sm:flex-initial px-4 py-2 text-sm font-semibold text-white bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg whitespace-nowrap transition"${_scopeId}> Search </button><button class="flex-1 sm:flex-initial px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-700 hover:shadow-lg whitespace-nowrap transition"${_scopeId}> Clear </button></div></div></div><div class="mb-4 text-xs sm:text-sm text-gray-600"${_scopeId}><p${_scopeId}> Showing ${ssrInterpolate(__props.patients.from || 0)} to ${ssrInterpolate(__props.patients.to || 0)} of ${ssrInterpolate(__props.patients.total)} patients </p></div><div class="lg:hidden space-y-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.patients.data, (patient) => {
              _push2(`<div class="bg-white rounded-xl shadow-md p-4 space-y-3"${_scopeId}><div class="flex justify-between items-start"${_scopeId}><div class="flex-1 min-w-0"${_scopeId}><h3 class="font-semibold text-gray-800 truncate"${_scopeId}>${ssrInterpolate(patient.full_name)}</h3><p class="text-sm text-gray-600 truncate"${_scopeId}>${ssrInterpolate(patient.email)}</p></div><span class="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800 ml-2"${_scopeId}>${ssrInterpolate(patient.results_count)}</span></div><div class="grid grid-cols-2 gap-2 text-xs text-gray-600"${_scopeId}><div${_scopeId}><span class="font-medium"${_scopeId}>Phone:</span> ${ssrInterpolate(patient.phone_no || "N/A")}</div><div${_scopeId}><span class="font-medium"${_scopeId}>Gender:</span> ${ssrInterpolate(patient.gender || "N/A")}</div><div${_scopeId}><span class="font-medium"${_scopeId}>DOB:</span> ${ssrInterpolate(formatDate(patient.date_of_birth))}</div><div${_scopeId}><span class="font-medium"${_scopeId}>Last Result:</span> ${ssrInterpolate(patient.latest_result ? formatDate(patient.latest_result.uploaded_at) : "N/A")}</div></div><div class="flex gap-2 pt-2"${_scopeId}><button class="flex-1 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-200"${_scopeId}> View </button><button class="flex-1 rounded-lg bg-green-100 px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-200"${_scopeId}> Edit </button></div></div>`);
            });
            _push2(`<!--]-->`);
            if (__props.patients.data.length === 0) {
              _push2(`<div class="bg-white rounded-xl shadow-md p-8 text-center text-gray-500"${_scopeId}><div class="text-4xl mb-2"${_scopeId}>👥</div><p${_scopeId}>No patients found.</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="hidden lg:block overflow-x-auto rounded-xl bg-white shadow-md"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Name </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Email </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Phone </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Gender </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Date of Birth </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Total Results </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Last Result </th><th class="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"${_scopeId}> Actions </th></tr></thead><tbody class="divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.patients.data, (patient) => {
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-4 py-3 font-medium text-gray-800"${_scopeId}>${ssrInterpolate(patient.full_name)}</td><td class="px-4 py-3 text-gray-700"${_scopeId}>${ssrInterpolate(patient.email)}</td><td class="px-4 py-3 text-gray-700"${_scopeId}>${ssrInterpolate(patient.phone_no || "N/A")}</td><td class="px-4 py-3 text-gray-700"${_scopeId}>${ssrInterpolate(patient.gender || "N/A")}</td><td class="px-4 py-3 text-gray-700"${_scopeId}>${ssrInterpolate(formatDate(patient.date_of_birth))}</td><td class="px-4 py-3 text-center text-gray-700"${_scopeId}><span class="inline-flex items-center justify-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800"${_scopeId}>${ssrInterpolate(patient.results_count)}</span></td><td class="px-4 py-3 text-gray-600"${_scopeId}>${ssrInterpolate(patient.latest_result ? formatDate(
                patient.latest_result.uploaded_at
              ) : "N/A")}</td><td class="px-4 py-3"${_scopeId}><div class="flex gap-2"${_scopeId}><button class="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-200"${_scopeId}> View </button><button class="rounded bg-green-100 px-3 py-1 text-xs font-medium text-green-700 transition hover:bg-green-200"${_scopeId}> Edit </button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.patients.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="8" class="px-4 py-8 text-center text-gray-500"${_scopeId}> No patients found. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.patients.last_page > 1) {
              _push2(`<div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4"${_scopeId}><button${ssrIncludeBooleanAttr(!__props.patients.prev_page_url) ? " disabled" : ""} class="w-full sm:w-auto rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed"${_scopeId}> Previous </button><span class="text-sm text-gray-600"${_scopeId}> Page ${ssrInterpolate(__props.patients.current_page)} of ${ssrInterpolate(__props.patients.last_page)}</span><button${ssrIncludeBooleanAttr(!__props.patients.next_page_url) ? " disabled" : ""} class="w-full sm:w-auto rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed"${_scopeId}> Next </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showAddPatientModal.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"${_scopeId}><div class="w-full max-w-2xl bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto"${_scopeId}><div class="sticky top-0 bg-white border-b p-4 sm:p-6"${_scopeId}><h3 class="text-xl sm:text-2xl font-bold text-gray-800"${_scopeId}> Add New Patient </h3></div><form class="p-4 sm:p-6 space-y-4"${_scopeId}><div${_scopeId}><label class="block mb-2 text-sm font-bold text-gray-700"${_scopeId}> Full Name * </label><input${ssrRenderAttr("value", unref(addPatientForm).full_name)} type="text" required class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent" placeholder="Enter full name"${_scopeId}>`);
              if (unref(addPatientForm).errors.full_name) {
                _push2(`<p class="text-red-500 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(addPatientForm).errors.full_name)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block mb-2 text-sm font-bold text-gray-700"${_scopeId}> Email * </label><input${ssrRenderAttr("value", unref(addPatientForm).email)} type="email" required class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent" placeholder="Enter email address"${_scopeId}>`);
              if (unref(addPatientForm).errors.email) {
                _push2(`<p class="text-red-500 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(addPatientForm).errors.email)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block mb-2 text-sm font-bold text-gray-700"${_scopeId}> Phone Number * </label><input${ssrRenderAttr("value", unref(addPatientForm).phone_no)} type="tel" required class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent" placeholder="Enter phone number"${_scopeId}>`);
              if (unref(addPatientForm).errors.phone_no) {
                _push2(`<p class="text-red-500 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(addPatientForm).errors.phone_no)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block mb-2 text-sm font-bold text-gray-700"${_scopeId}> Gender * </label><select required class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(addPatientForm).gender) ? ssrLooseContain(unref(addPatientForm).gender, "") : ssrLooseEqual(unref(addPatientForm).gender, "")) ? " selected" : ""}${_scopeId}>Select gender</option><option value="Male"${ssrIncludeBooleanAttr(Array.isArray(unref(addPatientForm).gender) ? ssrLooseContain(unref(addPatientForm).gender, "Male") : ssrLooseEqual(unref(addPatientForm).gender, "Male")) ? " selected" : ""}${_scopeId}>Male</option><option value="Female"${ssrIncludeBooleanAttr(Array.isArray(unref(addPatientForm).gender) ? ssrLooseContain(unref(addPatientForm).gender, "Female") : ssrLooseEqual(unref(addPatientForm).gender, "Female")) ? " selected" : ""}${_scopeId}>Female</option><option value="Other"${ssrIncludeBooleanAttr(Array.isArray(unref(addPatientForm).gender) ? ssrLooseContain(unref(addPatientForm).gender, "Other") : ssrLooseEqual(unref(addPatientForm).gender, "Other")) ? " selected" : ""}${_scopeId}>Other</option></select></div><div${_scopeId}><label class="block mb-2 text-sm font-bold text-gray-700"${_scopeId}> Date of Birth </label><input${ssrRenderAttr("value", unref(addPatientForm).date_of_birth)} type="date" class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"${_scopeId}></div><div${_scopeId}><label class="block mb-2 text-sm font-bold text-gray-700"${_scopeId}> Address </label><textarea rows="3" class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent" placeholder="Enter address"${_scopeId}>${ssrInterpolate(unref(addPatientForm).address)}</textarea></div><div class="flex flex-col sm:flex-row gap-3 pt-4"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(addPatientForm).processing) ? " disabled" : ""} class="flex-1 px-4 py-2 text-sm sm:text-base font-semibold text-white bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"${_scopeId}>${ssrInterpolate(unref(addPatientForm).processing ? "Adding..." : "Add Patient")}</button><button type="button" class="flex-1 px-4 py-2 text-sm sm:text-base font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 hover:shadow-lg transition"${_scopeId}> Cancel </button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showEditPatientModal.value && editingPatient.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"${_scopeId}><div class="w-full max-w-2xl bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto"${_scopeId}><div class="sticky top-0 bg-white border-b p-4 sm:p-6"${_scopeId}><h3 class="text-xl sm:text-2xl font-bold text-gray-800"${_scopeId}> Edit Patient: ${ssrInterpolate(editingPatient.value.full_name)}</h3></div><form class="p-4 sm:p-6 space-y-4"${_scopeId}><div${_scopeId}><label class="block mb-2 text-sm font-bold text-gray-700"${_scopeId}> Full Name * </label><input${ssrRenderAttr("value", unref(editPatientForm).full_name)} type="text" required class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"${_scopeId}>`);
              if (unref(editPatientForm).errors.full_name) {
                _push2(`<p class="text-red-500 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(editPatientForm).errors.full_name)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block mb-2 text-sm font-bold text-gray-700"${_scopeId}> Email * </label><input${ssrRenderAttr("value", unref(editPatientForm).email)} type="email" required class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"${_scopeId}>`);
              if (unref(editPatientForm).errors.email) {
                _push2(`<p class="text-red-500 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(editPatientForm).errors.email)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block mb-2 text-sm font-bold text-gray-700"${_scopeId}> Phone Number * </label><input${ssrRenderAttr("value", unref(editPatientForm).phone_no)} type="tel" required class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"${_scopeId}>`);
              if (unref(editPatientForm).errors.phone_no) {
                _push2(`<p class="text-red-500 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(editPatientForm).errors.phone_no)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block mb-2 text-sm font-bold text-gray-700"${_scopeId}> Gender * </label><select required class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(editPatientForm).gender) ? ssrLooseContain(unref(editPatientForm).gender, "") : ssrLooseEqual(unref(editPatientForm).gender, "")) ? " selected" : ""}${_scopeId}>Select gender</option><option value="Male"${ssrIncludeBooleanAttr(Array.isArray(unref(editPatientForm).gender) ? ssrLooseContain(unref(editPatientForm).gender, "Male") : ssrLooseEqual(unref(editPatientForm).gender, "Male")) ? " selected" : ""}${_scopeId}>Male</option><option value="Female"${ssrIncludeBooleanAttr(Array.isArray(unref(editPatientForm).gender) ? ssrLooseContain(unref(editPatientForm).gender, "Female") : ssrLooseEqual(unref(editPatientForm).gender, "Female")) ? " selected" : ""}${_scopeId}>Female</option><option value="Other"${ssrIncludeBooleanAttr(Array.isArray(unref(editPatientForm).gender) ? ssrLooseContain(unref(editPatientForm).gender, "Other") : ssrLooseEqual(unref(editPatientForm).gender, "Other")) ? " selected" : ""}${_scopeId}>Other</option></select></div><div${_scopeId}><label class="block mb-2 text-sm font-bold text-gray-700"${_scopeId}> Date of Birth </label><input${ssrRenderAttr("value", unref(editPatientForm).date_of_birth)} type="date" class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"${_scopeId}></div><div${_scopeId}><label class="block mb-2 text-sm font-bold text-gray-700"${_scopeId}> Address </label><textarea rows="3" class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"${_scopeId}>${ssrInterpolate(unref(editPatientForm).address)}</textarea></div><div class="flex flex-col sm:flex-row gap-3 pt-4"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(editPatientForm).processing) ? " disabled" : ""} class="flex-1 px-4 py-2 text-sm sm:text-base font-semibold text-white bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"${_scopeId}>${ssrInterpolate(unref(editPatientForm).processing ? "Updating..." : "Update Patient")}</button><button type="button" class="flex-1 px-4 py-2 text-sm sm:text-base font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 hover:shadow-lg transition"${_scopeId}> Cancel </button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex w-full gap-1 h-full overflow-y-hidden bg-primaryLight" }, [
                createVNode("div", { class: "overflow-y-scroll w-full p-4 sm:p-6" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row justify-between items-start gap-4 mb-6" }, [
                    createVNode("div", { class: "flex-1" }, [
                      createVNode("h1", { class: "text-2xl sm:text-3xl font-bold text-gray-800" }, " Patients Management "),
                      createVNode("p", { class: "text-sm sm:text-base text-gray-600 mt-1" }, " View and manage all registered patients and their test results ")
                    ]),
                    createVNode("div", { class: "w-full sm:w-auto" }, [
                      createVNode("button", {
                        onClick: ($event) => showAddPatientModal.value = true,
                        class: "w-full sm:w-auto rounded-md bg-primaryDark px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white transition-all duration-150 hover:-translate-y-1 hover:shadow-lg"
                      }, " + Add Patient ", 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" }, [
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      createVNode("button", {
                        onClick: ($event) => applyFilters("all"),
                        class: [
                          selectedFilter.value === "all" ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700",
                          "rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium transition-all hover:shadow-md"
                        ]
                      }, " All ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => applyFilters("Male"),
                        class: [
                          selectedFilter.value === "Male" ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700",
                          "rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium transition-all hover:shadow-md"
                        ]
                      }, " Male ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => applyFilters("Female"),
                        class: [
                          selectedFilter.value === "Female" ? "bg-primaryDark text-white" : "bg-gray-200 text-gray-700",
                          "rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium transition-all hover:shadow-md"
                        ]
                      }, " Female ", 10, ["onClick"])
                    ]),
                    createVNode("div", { class: "flex flex-col sm:flex-row gap-2 w-full lg:w-auto" }, [
                      createVNode("div", { class: "relative flex-1 lg:flex-initial" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                          type: "text",
                          placeholder: "Search by name, email or phone...",
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
                          class: "flex-1 sm:flex-initial px-4 py-2 text-sm font-semibold text-white bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg whitespace-nowrap transition"
                        }, " Search ", 8, ["onClick"]),
                        createVNode("button", {
                          onClick: clearFilters,
                          class: "flex-1 sm:flex-initial px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-700 hover:shadow-lg whitespace-nowrap transition"
                        }, " Clear ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mb-4 text-xs sm:text-sm text-gray-600" }, [
                    createVNode("p", null, " Showing " + toDisplayString(__props.patients.from || 0) + " to " + toDisplayString(__props.patients.to || 0) + " of " + toDisplayString(__props.patients.total) + " patients ", 1)
                  ]),
                  createVNode("div", { class: "lg:hidden space-y-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.patients.data, (patient) => {
                      return openBlock(), createBlock("div", {
                        key: patient.id,
                        class: "bg-white rounded-xl shadow-md p-4 space-y-3"
                      }, [
                        createVNode("div", { class: "flex justify-between items-start" }, [
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("h3", { class: "font-semibold text-gray-800 truncate" }, toDisplayString(patient.full_name), 1),
                            createVNode("p", { class: "text-sm text-gray-600 truncate" }, toDisplayString(patient.email), 1)
                          ]),
                          createVNode("span", { class: "inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800 ml-2" }, toDisplayString(patient.results_count), 1)
                        ]),
                        createVNode("div", { class: "grid grid-cols-2 gap-2 text-xs text-gray-600" }, [
                          createVNode("div", null, [
                            createVNode("span", { class: "font-medium" }, "Phone:"),
                            createTextVNode(" " + toDisplayString(patient.phone_no || "N/A"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("span", { class: "font-medium" }, "Gender:"),
                            createTextVNode(" " + toDisplayString(patient.gender || "N/A"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("span", { class: "font-medium" }, "DOB:"),
                            createTextVNode(" " + toDisplayString(formatDate(patient.date_of_birth)), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("span", { class: "font-medium" }, "Last Result:"),
                            createTextVNode(" " + toDisplayString(patient.latest_result ? formatDate(patient.latest_result.uploaded_at) : "N/A"), 1)
                          ])
                        ]),
                        createVNode("div", { class: "flex gap-2 pt-2" }, [
                          createVNode("button", {
                            onClick: ($event) => viewPatient(patient),
                            class: "flex-1 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-200"
                          }, " View ", 8, ["onClick"]),
                          createVNode("button", {
                            onClick: ($event) => openEditModal(patient),
                            class: "flex-1 rounded-lg bg-green-100 px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-200"
                          }, " Edit ", 8, ["onClick"])
                        ])
                      ]);
                    }), 128)),
                    __props.patients.data.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white rounded-xl shadow-md p-8 text-center text-gray-500"
                    }, [
                      createVNode("div", { class: "text-4xl mb-2" }, "👥"),
                      createVNode("p", null, "No patients found.")
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "hidden lg:block overflow-x-auto rounded-xl bg-white shadow-md" }, [
                    createVNode("table", { class: "w-full text-sm" }, [
                      createVNode("thead", { class: "bg-gray-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Name "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Email "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Phone "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Gender "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Date of Birth "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Total Results "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Last Result "),
                          createVNode("th", { class: "px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700" }, " Actions ")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-gray-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.patients.data, (patient) => {
                          return openBlock(), createBlock("tr", {
                            key: patient.id,
                            class: "hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "px-4 py-3 font-medium text-gray-800" }, toDisplayString(patient.full_name), 1),
                            createVNode("td", { class: "px-4 py-3 text-gray-700" }, toDisplayString(patient.email), 1),
                            createVNode("td", { class: "px-4 py-3 text-gray-700" }, toDisplayString(patient.phone_no || "N/A"), 1),
                            createVNode("td", { class: "px-4 py-3 text-gray-700" }, toDisplayString(patient.gender || "N/A"), 1),
                            createVNode("td", { class: "px-4 py-3 text-gray-700" }, toDisplayString(formatDate(patient.date_of_birth)), 1),
                            createVNode("td", { class: "px-4 py-3 text-center text-gray-700" }, [
                              createVNode("span", { class: "inline-flex items-center justify-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800" }, toDisplayString(patient.results_count), 1)
                            ]),
                            createVNode("td", { class: "px-4 py-3 text-gray-600" }, toDisplayString(patient.latest_result ? formatDate(
                              patient.latest_result.uploaded_at
                            ) : "N/A"), 1),
                            createVNode("td", { class: "px-4 py-3" }, [
                              createVNode("div", { class: "flex gap-2" }, [
                                createVNode("button", {
                                  onClick: ($event) => viewPatient(patient),
                                  class: "rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-200"
                                }, " View ", 8, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => openEditModal(patient),
                                  class: "rounded bg-green-100 px-3 py-1 text-xs font-medium text-green-700 transition hover:bg-green-200"
                                }, " Edit ", 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128)),
                        __props.patients.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "8",
                            class: "px-4 py-8 text-center text-gray-500"
                          }, " No patients found. ")
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  __props.patients.last_page > 1 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                  }, [
                    createVNode("button", {
                      onClick: ($event) => goToPage(__props.patients.prev_page_url),
                      disabled: !__props.patients.prev_page_url,
                      class: "w-full sm:w-auto rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    }, " Previous ", 8, ["onClick", "disabled"]),
                    createVNode("span", { class: "text-sm text-gray-600" }, " Page " + toDisplayString(__props.patients.current_page) + " of " + toDisplayString(__props.patients.last_page), 1),
                    createVNode("button", {
                      onClick: ($event) => goToPage(__props.patients.next_page_url),
                      disabled: !__props.patients.next_page_url,
                      class: "w-full sm:w-auto rounded-lg bg-primaryDark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryDark/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    }, " Next ", 8, ["onClick", "disabled"])
                  ])) : createCommentVNode("", true),
                  showAddPatientModal.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4",
                    onClick: withModifiers(($event) => showAddPatientModal.value = false, ["self"])
                  }, [
                    createVNode("div", { class: "w-full max-w-2xl bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto" }, [
                      createVNode("div", { class: "sticky top-0 bg-white border-b p-4 sm:p-6" }, [
                        createVNode("h3", { class: "text-xl sm:text-2xl font-bold text-gray-800" }, " Add New Patient ")
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submitAddPatient, ["prevent"]),
                        class: "p-4 sm:p-6 space-y-4"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm font-bold text-gray-700" }, " Full Name * "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(addPatientForm).full_name = $event,
                            type: "text",
                            required: "",
                            class: "w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent",
                            placeholder: "Enter full name"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(addPatientForm).full_name]
                          ]),
                          unref(addPatientForm).errors.full_name ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-red-500 text-xs mt-1"
                          }, toDisplayString(unref(addPatientForm).errors.full_name), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm font-bold text-gray-700" }, " Email * "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(addPatientForm).email = $event,
                            type: "email",
                            required: "",
                            class: "w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent",
                            placeholder: "Enter email address"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(addPatientForm).email]
                          ]),
                          unref(addPatientForm).errors.email ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-red-500 text-xs mt-1"
                          }, toDisplayString(unref(addPatientForm).errors.email), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm font-bold text-gray-700" }, " Phone Number * "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(addPatientForm).phone_no = $event,
                            type: "tel",
                            required: "",
                            class: "w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent",
                            placeholder: "Enter phone number"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(addPatientForm).phone_no]
                          ]),
                          unref(addPatientForm).errors.phone_no ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-red-500 text-xs mt-1"
                          }, toDisplayString(unref(addPatientForm).errors.phone_no), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm font-bold text-gray-700" }, " Gender * "),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(addPatientForm).gender = $event,
                            required: "",
                            class: "w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"
                          }, [
                            createVNode("option", { value: "" }, "Select gender"),
                            createVNode("option", { value: "Male" }, "Male"),
                            createVNode("option", { value: "Female" }, "Female"),
                            createVNode("option", { value: "Other" }, "Other")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(addPatientForm).gender]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm font-bold text-gray-700" }, " Date of Birth "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(addPatientForm).date_of_birth = $event,
                            type: "date",
                            class: "w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(addPatientForm).date_of_birth]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm font-bold text-gray-700" }, " Address "),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(addPatientForm).address = $event,
                            rows: "3",
                            class: "w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent",
                            placeholder: "Enter address"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(addPatientForm).address]
                          ])
                        ]),
                        createVNode("div", { class: "flex flex-col sm:flex-row gap-3 pt-4" }, [
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(addPatientForm).processing,
                            class: "flex-1 px-4 py-2 text-sm sm:text-base font-semibold text-white bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                          }, toDisplayString(unref(addPatientForm).processing ? "Adding..." : "Add Patient"), 9, ["disabled"]),
                          createVNode("button", {
                            type: "button",
                            onClick: () => {
                              showAddPatientModal.value = false;
                              unref(addPatientForm).reset();
                            },
                            class: "flex-1 px-4 py-2 text-sm sm:text-base font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 hover:shadow-lg transition"
                          }, " Cancel ", 8, ["onClick"])
                        ])
                      ], 32)
                    ])
                  ], 8, ["onClick"])) : createCommentVNode("", true),
                  showEditPatientModal.value && editingPatient.value ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4",
                    onClick: withModifiers(($event) => showEditPatientModal.value = false, ["self"])
                  }, [
                    createVNode("div", { class: "w-full max-w-2xl bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto" }, [
                      createVNode("div", { class: "sticky top-0 bg-white border-b p-4 sm:p-6" }, [
                        createVNode("h3", { class: "text-xl sm:text-2xl font-bold text-gray-800" }, " Edit Patient: " + toDisplayString(editingPatient.value.full_name), 1)
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submitEditPatient, ["prevent"]),
                        class: "p-4 sm:p-6 space-y-4"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm font-bold text-gray-700" }, " Full Name * "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(editPatientForm).full_name = $event,
                            type: "text",
                            required: "",
                            class: "w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(editPatientForm).full_name]
                          ]),
                          unref(editPatientForm).errors.full_name ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-red-500 text-xs mt-1"
                          }, toDisplayString(unref(editPatientForm).errors.full_name), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm font-bold text-gray-700" }, " Email * "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(editPatientForm).email = $event,
                            type: "email",
                            required: "",
                            class: "w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(editPatientForm).email]
                          ]),
                          unref(editPatientForm).errors.email ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-red-500 text-xs mt-1"
                          }, toDisplayString(unref(editPatientForm).errors.email), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm font-bold text-gray-700" }, " Phone Number * "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(editPatientForm).phone_no = $event,
                            type: "tel",
                            required: "",
                            class: "w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(editPatientForm).phone_no]
                          ]),
                          unref(editPatientForm).errors.phone_no ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-red-500 text-xs mt-1"
                          }, toDisplayString(unref(editPatientForm).errors.phone_no), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm font-bold text-gray-700" }, " Gender * "),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(editPatientForm).gender = $event,
                            required: "",
                            class: "w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"
                          }, [
                            createVNode("option", { value: "" }, "Select gender"),
                            createVNode("option", { value: "Male" }, "Male"),
                            createVNode("option", { value: "Female" }, "Female"),
                            createVNode("option", { value: "Other" }, "Other")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(editPatientForm).gender]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm font-bold text-gray-700" }, " Date of Birth "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(editPatientForm).date_of_birth = $event,
                            type: "date",
                            class: "w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(editPatientForm).date_of_birth]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block mb-2 text-sm font-bold text-gray-700" }, " Address "),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(editPatientForm).address = $event,
                            rows: "3",
                            class: "w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDark focus:border-transparent"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(editPatientForm).address]
                          ])
                        ]),
                        createVNode("div", { class: "flex flex-col sm:flex-row gap-3 pt-4" }, [
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(editPatientForm).processing,
                            class: "flex-1 px-4 py-2 text-sm sm:text-base font-semibold text-white bg-primaryDark rounded-lg hover:bg-primaryDark/90 hover:shadow-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                          }, toDisplayString(unref(editPatientForm).processing ? "Updating..." : "Update Patient"), 9, ["disabled"]),
                          createVNode("button", {
                            type: "button",
                            onClick: () => {
                              showEditPatientModal.value = false;
                              unref(editPatientForm).reset();
                              editingPatient.value = null;
                            },
                            class: "flex-1 px-4 py-2 text-sm sm:text-base font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 hover:shadow-lg transition"
                          }, " Cancel ", 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Patients.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
