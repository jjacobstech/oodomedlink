import { ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "FAQ",
  __ssrInlineRender: true,
  setup(__props) {
    const searchQuery = ref("");
    const selectedCategory = ref("All Topics");
    const expandedArticles = ref([]);
    const categories = [
      "All Topics",
      "Results Management",
      "Staff Management",
      "Delivery Setup",
      "Troubleshooting"
    ];
    const quickLinks = [
      {
        title: "Upload Results",
        description: "Quick guide to uploading",
        icon: "📤",
        bgColor: "bg-blue-100",
        category: "Results Management"
      },
      {
        title: "Add Staff",
        description: "Manage team accounts",
        icon: "👥",
        bgColor: "bg-purple-100",
        category: "Staff Management"
      },
      {
        title: "Setup Delivery",
        description: "Configure WhatsApp/Email",
        icon: "⚙️",
        bgColor: "bg-green-100",
        category: "Delivery Setup"
      },
      {
        title: "Fix Issues",
        description: "Common problems solved",
        icon: "🔧",
        bgColor: "bg-orange-100",
        category: "Troubleshooting"
      }
    ];
    const articles = [
      {
        id: 1,
        title: "How to Upload and Send Patient Results",
        subtitle: "Step-by-step guide for uploading test results",
        category: "Results Management",
        icon: "📤",
        iconBg: "bg-blue-100",
        steps: [
          { title: "Navigate to Results Section", description: 'Go to the dashboard and click on "Upload Results" in the main menu.' },
          { title: "Select Patient Record", description: "Search for the patient using their ID, name, or phone number." },
          { title: "Upload Result File", description: 'Click "Choose File" and select the PDF result document from your computer.' },
          { title: "Review and Confirm", description: 'Check all details are correct, then click "Send Result" to deliver via WhatsApp or email.' }
        ],
        tips: "Always verify patient details before sending. Results can be scheduled for future delivery if needed."
      },
      {
        id: 2,
        title: "Managing Staff Accounts and Permissions",
        subtitle: "Add, edit, and control staff access",
        category: "Staff Management",
        icon: "👥",
        iconBg: "bg-purple-100",
        steps: [
          { title: "Access Staff Management", description: "Navigate to Settings > Staff Management from your admin dashboard." },
          { title: "Add New Staff Member", description: 'Click "Add Staff", enter their email, name, and role (Admin, Lab Technician, etc.).' },
          { title: "Set Permissions", description: "Choose what actions they can perform: upload results, view reports, manage patients." },
          { title: "Send Invitation", description: "The staff member will receive an email invitation to set up their account." }
        ],
        tips: "Regularly review staff permissions to maintain security. You can temporarily suspend accounts without deleting them."
      },
      {
        id: 3,
        title: "Setting Up WhatsApp Result Delivery",
        subtitle: "Configure automated WhatsApp notifications",
        category: "Delivery Setup",
        icon: "💬",
        iconBg: "bg-green-100",
        steps: [
          { title: "Connect WhatsApp Business", description: 'Go to Settings > Integrations and click "Connect WhatsApp Business Account".' },
          { title: "Verify Your Number", description: "Enter your business phone number and complete the verification process." },
          { title: "Customize Message Template", description: "Edit the default message template that patients will receive with their results." },
          { title: "Test the Integration", description: "Send a test result to your own number to ensure everything works correctly." }
        ],
        tips: "WhatsApp Business API requires approval. Keep your message templates professional and compliant with healthcare regulations."
      },
      {
        id: 4,
        title: "Setting Up Email Result Delivery",
        subtitle: "Configure email notifications for patients",
        category: "Delivery Setup",
        icon: "📧",
        iconBg: "bg-indigo-100",
        steps: [
          { title: "Configure Email Settings", description: "Navigate to Settings > Email Configuration in your dashboard." },
          { title: "Enter SMTP Details", description: "Add your email server information or use our default delivery service." },
          { title: "Design Email Template", description: "Customize the email layout, add your logo, and set the message content." },
          { title: "Set Up Auto-Delivery", description: "Enable automatic email sending when results are uploaded and approved." }
        ],
        tips: "Use your lab's official email domain for better deliverability. Always include a secure access link rather than attaching results directly."
      },
      {
        id: 5,
        title: "Editing and Resending Patient Results",
        subtitle: "How to modify or resend results",
        category: "Results Management",
        icon: "✏️",
        iconBg: "bg-blue-100",
        steps: [
          { title: "Locate the Result", description: "Find the patient record in your Results History or search by patient name/ID." },
          { title: "Edit Result Details", description: 'Click "Edit" to modify result values, add notes, or replace the PDF file.' },
          { title: "Save Changes", description: 'Review all modifications and click "Save" to update the result.' },
          { title: "Resend to Patient", description: 'Click "Resend" to deliver the updated result via WhatsApp or email again.' }
        ],
        tips: "All edits are logged for audit purposes. Patients are notified when results are updated."
      },
      {
        id: 6,
        title: "Removing or Deactivating Staff Accounts",
        subtitle: "Safely remove staff access",
        category: "Staff Management",
        icon: "🚫",
        iconBg: "bg-purple-100",
        steps: [
          { title: "Go to Staff List", description: "Access Settings > Staff Management to view all team members." },
          { title: "Select Staff Member", description: "Click on the staff member you want to remove or deactivate." },
          { title: "Choose Action", description: 'Select "Deactivate" (temporary) or "Remove" (permanent deletion).' },
          { title: "Confirm Action", description: "Confirm your decision. Deactivated accounts can be reactivated later." }
        ],
        tips: "Deactivating is safer than deletion as you can restore access later. All actions are logged for security."
      },
      {
        id: 7,
        title: "Troubleshooting: Results Not Sending",
        subtitle: "Fix common delivery issues",
        category: "Troubleshooting",
        icon: "🔧",
        iconBg: "bg-orange-100",
        steps: [
          { title: "Check Patient Contact Info", description: "Verify the patient's phone number or email address is correct and properly formatted." },
          { title: "Verify Delivery Settings", description: "Ensure WhatsApp and email integrations are properly configured in Settings." },
          { title: "Check Delivery Status", description: "Go to Result History and check the delivery status column for error messages." },
          { title: "Resend or Contact Support", description: "Try resending the result. If it fails again, contact our support team with the error details." }
        ],
        tips: "Common issues include incorrect phone number format (+234 instead of 0) or patient's email blocking automated messages."
      },
      {
        id: 8,
        title: "Troubleshooting: Cannot Upload Result Files",
        subtitle: "Resolve file upload problems",
        category: "Troubleshooting",
        icon: "⚠️",
        iconBg: "bg-orange-100",
        steps: [
          { title: "Check File Format", description: "Ensure your file is in PDF format. Other formats are not currently supported." },
          { title: "Verify File Size", description: "Files must be under 10MB. Compress larger PDFs before uploading." },
          { title: "Check Internet Connection", description: "Ensure you have a stable internet connection. Try refreshing the page." },
          { title: "Clear Browser Cache", description: "Clear your browser cache and cookies, then try uploading again." }
        ],
        tips: "If uploads consistently fail, try using a different browser or contact support for assistance."
      },
      {
        id: 9,
        title: "Troubleshooting: Login or Access Issues",
        subtitle: "Fix account access problems",
        category: "Troubleshooting",
        icon: "🔐",
        iconBg: "bg-orange-100",
        steps: [
          { title: "Reset Your Password", description: 'Click "Forgot Password" on the login page and follow the email instructions.' },
          { title: "Check Account Status", description: "Your account may be deactivated. Contact your admin or our support team." },
          { title: "Clear Browser Data", description: "Clear cookies and cache, or try logging in from an incognito/private window." },
          { title: "Verify Email Address", description: "Ensure you're using the correct email address associated with your account." }
        ],
        tips: "After 5 failed login attempts, accounts are temporarily locked for security. Wait 15 minutes before trying again."
      }
    ];
    const filteredArticles = computed(() => {
      let filtered = articles;
      if (selectedCategory.value !== "All Topics") {
        filtered = filtered.filter((article) => article.category === selectedCategory.value);
      }
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (article) => article.title.toLowerCase().includes(query) || article.subtitle.toLowerCase().includes(query) || article.steps.some(
            (step) => step.title.toLowerCase().includes(query) || step.description.toLowerCase().includes(query)
          )
        );
      }
      return filtered;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50" }, _attrs))}><header class="bg-primaryDark shadow-sm border-b border-slate-200"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="text-center"><h1 class="text-3xl font-extrabold text-white">Help Center</h1><p class="text-white text-lg font-bold mt-2">Always available to help you work smoothly </p></div></div></header><section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="relative"><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search for help articles..." class="w-full px-6 py-4 pr-12 rounded-xl border-2 border-slate-200 focus:border-primaryDark focus:outline-none text-xl shadow-sm"><svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div></section><section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><h2 class="text-2xl font-bold text-slate-900 mb-6">Quick Access</h2><div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4"><!--[-->`);
      ssrRenderList(quickLinks, (quick) => {
        _push(`<button class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-left group"><div class="${ssrRenderClass(["w-12 h-12 rounded-lg mb-4 flex items-center justify-center", quick.bgColor])}"><span class="text-2xl">${ssrInterpolate(quick.icon)}</span></div><h3 class="font-semibold text-slate-900 group-hover:text-primaryDark transition">${ssrInterpolate(quick.title)}</h3><p class="text-lg text-slate-600 mt-1">${ssrInterpolate(quick.description)}</p></button>`);
      });
      _push(`<!--]--></div></section><section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="flex flex-wrap gap-3 mb-8"><!--[-->`);
      ssrRenderList(categories, (category) => {
        _push(`<button class="${ssrRenderClass([
          "px-4 py-2 rounded-full text-lg font-bold transition",
          selectedCategory.value === category ? "bg-primaryDark text-white" : "bg-white text-slate-700 hover:bg-slate-100"
        ])}">${ssrInterpolate(category)}</button>`);
      });
      _push(`<!--]--></div><div class="space-y-4"><!--[-->`);
      ssrRenderList(filteredArticles.value, (article) => {
        _push(`<div class="bg-white rounded-lg shadow-sm hover:shadow-md transition"><button class="w-full px-6 py-4 flex items-center justify-between text-left"><div class="flex items-center gap-4 flex-1"><div class="${ssrRenderClass(["w-10 h-10 rounded-lg flex items-center justify-center text-xl", article.iconBg])}">${ssrInterpolate(article.icon)}</div><div class="flex-1"><h3 class="font-semibold text-slate-900 text-xl">${ssrInterpolate(article.title)}</h3><p class="text-lg text-slate-600">${ssrInterpolate(article.subtitle)}</p></div></div><svg class="${ssrRenderClass(["w-5 h-5 text-slate-400 transition-transform", expandedArticles.value.includes(article.id) ? "rotate-180" : ""])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>`);
        if (expandedArticles.value.includes(article.id)) {
          _push(`<div class="px-6 pb-6 border-t border-slate-100"><div class="pt-4 space-y-4"><!--[-->`);
          ssrRenderList(article.steps, (step, index) => {
            _push(`<div class="flex gap-4"><div class="flex-shrink-0 w-8 h-8 bg-blue-100 text-primaryDark rounded-full flex items-center justify-center font-semibold text-lg">${ssrInterpolate(index + 1)}</div><div class="flex-1"><h4 class="font-bold text-slate-900 mb-1">${ssrInterpolate(step.title)}</h4><p class="text-slate-600 text-lg">${ssrInterpolate(step.description)}</p></div></div>`);
          });
          _push(`<!--]-->`);
          if (article.tips) {
            _push(`<div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4"><div class="flex gap-2"><span class="text-xl">💡</span><div><h4 class="font-semibold text-amber-900 mb-1">Pro Tip</h4><p class="text-lg text-amber-800">${ssrInterpolate(article.tips)}</p></div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></section><section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-16"><div class="bg-primaryDark rounded-2xl p-8 text-white text-center"><h3 class="text-2xl font-bold mb-3">Still Need Help?</h3><p class="text-blue-100 mb-6 max-w-2xl mx-auto"> Can&#39;t find what you&#39;re looking for? Our support team is ready to assist you with any questions or issues. </p><div class="flex flex-wrap justify-center gap-4"><a href="mailto:support@oodomedlink.com" class="bg-white text-primaryDark px-6 py-3 rounded-lg hover:bg-blue-50 transition font-bold"> 📧 Email Support </a><button disabled class="bg-primaryDark text-white px-6 py-3 rounded-lg hover:bg-blue-400 transition font-bold"> 💬 Live Chat </button><button disabled class="bg-primaryDark text-white px-6 py-3 rounded-lg hover:bg-blue-400 transition font-bold"> 📱 WhatsApp Support </button></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/FAQ.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
