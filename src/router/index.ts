import { createRouter, createWebHistory } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import Home from "@/views/Home.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import ProductListing from "@/views/ProductListing.vue";
import Linktree from "@/views/Linktree.vue";

const AdminLogin = () => import("@/views/admin/AdminLogin.vue");
const AdminLayout = () => import("@/components/admin/AdminSidebar.vue");
const AdminDashboard = () => import("@/views/admin/AdminDashboard.vue");
const AdminProducts = () => import("@/views/admin/AdminProducts.vue");
const AdminTestimonials = () => import("@/views/admin/AdminTestimonials.vue");
const AdminScentFamilies = () => import("@/views/admin/AdminScentFamilies.vue");
const AdminContent = () => import("@/views/admin/AdminContent.vue");

let authResolved = false;
let currentUser: any = null;

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  authResolved = true;
});

function waitForAuth(): Promise<boolean> {
  if (authResolved) return Promise.resolve(!!currentUser);
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      currentUser = user;
      authResolved = true;
      unsub();
      resolve(!!user);
    });
  });
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/product",
      name: "product-listing",
      component: ProductListing,
    },
    {
      path: "/product/:slug",
      name: "product-detail",
      component: ProductDetail,
    },
    {
      path: "/linktree",
      name: "linktree",
      component: Linktree,
    },
    {
      path: "/admin/login",
      name: "admin-login",
      component: AdminLogin,
      meta: { requiresGuest: true },
    },
    {
      path: "/admin",
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "admin-dashboard",
          component: AdminDashboard,
        },
        {
          path: "products",
          name: "admin-products",
          component: AdminProducts,
        },
        {
          path: "testimonials",
          name: "admin-testimonials",
          component: AdminTestimonials,
        },
        {
          path: "scent-families",
          name: "admin-scent-families",
          component: AdminScentFamilies,
        },
        {
          path: "content",
          name: "admin-content",
          component: AdminContent,
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to) => {
  const needsAuth = to.matched.some((r) => r.meta.requiresAuth);
  const needsGuest = to.meta.requiresGuest;

  if (!needsAuth && !needsGuest) return true;

  const isAuthed = await waitForAuth();

  if (needsAuth && !isAuthed) {
    return { name: "admin-login" };
  }
  if (needsGuest && isAuthed) {
    return { name: "admin-dashboard" };
  }
  return true;
});

export default router;
