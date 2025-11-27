import { ref, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Blog",
  __ssrInlineRender: true,
  setup(__props) {
    const categories = [
      "All Posts",
      "Digital Transformation",
      "Patient Experience",
      "Health-Tech Trends",
      "Result Management",
      "AI & Diagnostics"
    ];
    const selectedCategory = ref("All Posts");
    const posts = [
      {
        id: 1,
        title: "Digital Transformation in Nigerian Laboratories",
        excerpt: "How modern labs are leveraging technology to improve efficiency, accuracy, and patient outcomes across Nigeria.",
        category: "Digital Transformation",
        date: "Nov 25, 2025",
        readTime: 5,
        gradient: "from-blue-400 to-indigo-500"
      },
      {
        id: 2,
        title: "Enhancing Patient Experience Through Digital Solutions",
        excerpt: "Exploring innovative approaches to streamline patient interactions and improve satisfaction in diagnostic services.",
        category: "Patient Experience",
        date: "Nov 22, 2025",
        readTime: 4,
        gradient: "from-purple-400 to-pink-500"
      },
      {
        id: 3,
        title: "Health-Tech Innovation Trends in Nigeria",
        excerpt: "A deep dive into emerging technologies reshaping healthcare delivery and diagnostics in the Nigerian market.",
        category: "Health-Tech Trends",
        date: "Nov 20, 2025",
        readTime: 6,
        gradient: "from-green-400 to-teal-500"
      },
      {
        id: 4,
        title: "Best Practices for Laboratory Result Management",
        excerpt: "Essential strategies for secure, efficient, and compliant handling of diagnostic results in modern laboratories.",
        category: "Result Management",
        date: "Nov 18, 2025",
        readTime: 5,
        gradient: "from-orange-400 to-red-500"
      },
      {
        id: 5,
        title: "AI-Powered Diagnostics: The Future is Now",
        excerpt: "How artificial intelligence is revolutionizing diagnostic accuracy and speed in medical laboratories.",
        category: "AI & Diagnostics",
        date: "Nov 15, 2025",
        readTime: 7,
        gradient: "from-cyan-400 to-blue-500"
      },
      {
        id: 6,
        title: "Cloud-Based Lab Management Systems",
        excerpt: "The advantages of moving laboratory operations to the cloud for better accessibility and scalability.",
        category: "Digital Transformation",
        date: "Nov 12, 2025",
        readTime: 4,
        gradient: "from-indigo-400 to-purple-500"
      },
      {
        id: 7,
        title: "Patient-Centric Care in Modern Diagnostics",
        excerpt: "Putting patients first: strategies for creating seamless and compassionate diagnostic experiences.",
        category: "Patient Experience",
        date: "Nov 10, 2025",
        readTime: 5,
        gradient: "from-pink-400 to-rose-500"
      },
      {
        id: 8,
        title: "Regulatory Compliance in Nigerian Health-Tech",
        excerpt: "Navigating the regulatory landscape for health technology solutions in Nigeria's evolving healthcare sector.",
        category: "Health-Tech Trends",
        date: "Nov 8, 2025",
        readTime: 6,
        gradient: "from-teal-400 to-green-500"
      },
      {
        id: 9,
        title: "Machine Learning in Laboratory Diagnostics",
        excerpt: "Practical applications of machine learning algorithms in improving diagnostic precision and efficiency.",
        category: "AI & Diagnostics",
        date: "Nov 5, 2025",
        readTime: 8,
        gradient: "from-blue-500 to-cyan-500"
      }
    ];
    const filteredPosts = computed(() => {
      if (selectedCategory.value === "All Posts") {
        return posts;
      }
      return posts.filter((post) => post.category === selectedCategory.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" }, _attrs))} data-v-96884ab8><header class="bg-white shadow-sm border-b border-slate-200" data-v-96884ab8><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-v-96884ab8><div class="flex items-center justify-between" data-v-96884ab8><div data-v-96884ab8><h1 class="text-3xl font-bold text-slate-900" data-v-96884ab8>Lab Insights Blog</h1><p class="text-slate-600 mt-1" data-v-96884ab8>Stay informed. Stay ahead.</p></div><div class="flex justify-between items-center gap-5" data-v-96884ab8>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "bg-primaryDark text-xl text-white px-6 py-2 rounded-lg hover:bg-primaryDark/80 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Back `);
          } else {
            return [
              createTextVNode(" Back ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a href="#subscribe" class="bg-primaryDark text-white px-6 py-2 rounded-lg text-xl hover:bg-primaryDark/80 transition" data-v-96884ab8> Subscribe </a></div></div></div></header><section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-v-96884ab8><div class="bg-primaryDark rounded-2xl p-8 text-white" data-v-96884ab8><h2 class="text-4xl font-bold mb-4" data-v-96884ab8>Transforming Healthcare Through Innovation</h2><p class="text-lg text-blue-100 max-w-3xl" data-v-96884ab8> Explore cutting-edge insights on digital transformation, AI diagnostics, and health-tech trends shaping Nigeria&#39;s healthcare landscape. </p></div></section><section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-v-96884ab8><div class="flex flex-wrap gap-3" data-v-96884ab8><!--[-->`);
      ssrRenderList(categories, (category) => {
        _push(`<button class="${ssrRenderClass([
          "px-4 py-2 rounded-full text-sm font-medium transition",
          selectedCategory.value === category ? "bg-primaryDark text-white" : "bg-white text-slate-700 hover:bg-slate-100"
        ])}" data-v-96884ab8>${ssrInterpolate(category)}</button>`);
      });
      _push(`<!--]--></div></section><section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16" data-v-96884ab8><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-v-96884ab8><!--[-->`);
      ssrRenderList(filteredPosts.value, (post) => {
        _push(`<article class="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group cursor-pointer" data-v-96884ab8><div class="h-48" data-v-96884ab8><img src="/assets/med1.jpg" alt="" data-v-96884ab8></div><div class="p-6 mt-3" data-v-96884ab8><div class="flex items-center gap-2 mb-3" data-v-96884ab8><span class="text-xs font-semibold text-primaryDark bg-blue-50 px-3 py-1 rounded-full" data-v-96884ab8>${ssrInterpolate(post.category)}</span><span class="text-xs text-primaryDark font-bold bg-white rounded-full px-2 py-1" data-v-96884ab8>${ssrInterpolate(post.date)}</span></div><h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition" data-v-96884ab8>${ssrInterpolate(post.title)}</h3><p class="text-slate-600 mb-4 line-clamp-3" data-v-96884ab8>${ssrInterpolate(post.excerpt)}</p><div class="flex items-center justify-between" data-v-96884ab8><span class="text-sm text-slate-500" data-v-96884ab8>${ssrInterpolate(post.readTime)} min read</span><span class="text-blue-600 font-medium group-hover:translate-x-1 transition inline-block" data-v-96884ab8> Read More → </span></div></div></article>`);
      });
      _push(`<!--]--></div></section><section id="subscribe" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-v-96884ab8><div class="bg-primaryDark rounded-2xl p-8 text-center" data-v-96884ab8><h3 class="text-2xl font-bold text-white mb-3" data-v-96884ab8>Stay Updated</h3><p class="text-slate-300 mb-6" data-v-96884ab8>Get the latest insights delivered to your inbox</p><div class="flex max-w-md mx-auto gap-3" data-v-96884ab8><input type="email" placeholder="Enter your email" class="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 text-md font-extrabold focus:ring-primaryLight" data-v-96884ab8><button class="bg-primaryLight text-primaryDark font-extrabold px-6 py-3 rounded-lg hover:bg-primaryDark hover:text-white hover:ring hover:ring-white transition text-md" data-v-96884ab8> Subscribe </button></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Blog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Blog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-96884ab8"]]);
export {
  Blog as default
};
