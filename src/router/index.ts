import { createRouter, createWebHistory } from "vue-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { isSessionExpired, clearSessionActivity } from "@/composables/useAdminSession";
import Home from "@/views/Home.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import ProductListing from "@/views/ProductListing.vue";
import Linktree from "@/views/Linktree.vue";
import OurStory from "@/views/OurStory.vue";

const AdminLogin = () => import("@/views/admin/AdminLogin.vue");
const AdminLayout = () => import("@/components/admin/AdminSidebar.vue");
const AdminDashboard = () => import("@/views/admin/AdminDashboard.vue");
const AdminProducts = () => import("@/views/admin/AdminProducts.vue");
const AdminOurStory = () => import("@/views/admin/AdminOurStory.vue");
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
      path: "/our-story",
      name: "our-story",
      component: OurStory,
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
          path: "our-story",
          name: "admin-our-story",
          component: AdminOurStory,
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

  if (needsAuth) {
    if (!isAuthed || isSessionExpired()) {
      if (isSessionExpired()) {
        clearSessionActivity();
        try {
          await signOut(auth);
        } catch (e) {
          // ignore
        }
        return { name: "admin-login", query: { reason: "timeout" } };
      }
      return { name: "admin-login" };
    }
  }

  if (needsGuest && isAuthed) {
    if (isSessionExpired()) {
      clearSessionActivity();
      try {
        await signOut(auth);
      } catch (e) {
        // ignore
      }
      return true;
    }
    return { name: "admin-dashboard" };
  }

  return true;
});

export default router;
