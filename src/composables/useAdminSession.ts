import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

export const SESSION_ACTIVITY_KEY = "fegance_admin_last_activity";
export const INACTIVITY_LIMIT_MS = 10 * 60 * 1000; // 10 minutes in milliseconds

export function updateSessionActivity() {
  localStorage.setItem(SESSION_ACTIVITY_KEY, Date.now().toString());
}

export function isSessionExpired(): boolean {
  const lastActivityStr = localStorage.getItem(SESSION_ACTIVITY_KEY);
  if (!lastActivityStr) return false;
  const lastActivity = parseInt(lastActivityStr, 10);
  if (isNaN(lastActivity)) return false;
  return Date.now() - lastActivity > INACTIVITY_LIMIT_MS;
}

export function clearSessionActivity() {
  localStorage.removeItem(SESSION_ACTIVITY_KEY);
}

export function useAdminSession() {
  const router = useRouter();
  const isExpired = ref(false);
  let timerId: ReturnType<typeof setInterval> | null = null;
  let lastUpdate = 0;

  function onUserActivity() {
    const now = Date.now();
    // Throttle localStorage writes to once every 2 seconds
    if (now - lastUpdate > 2000) {
      lastUpdate = now;
      updateSessionActivity();
    }
  }

  async function checkInactivity() {
    if (isSessionExpired()) {
      isExpired.value = true;
      clearSessionActivity();
      try {
        await signOut(auth);
      } catch (e) {
        console.error("Logout on timeout error:", e);
      }
      router.push({ name: "admin-login", query: { reason: "timeout" } });
    }
  }

  onMounted(() => {
    updateSessionActivity();
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((evt) => window.addEventListener(evt, onUserActivity, { passive: true }));

    // Check inactivity status every 5 seconds
    timerId = setInterval(checkInactivity, 5000);
  });

  onUnmounted(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((evt) => window.removeEventListener(evt, onUserActivity));
    if (timerId) clearInterval(timerId);
  });

  return {
    updateSessionActivity,
    checkInactivity,
  };
}
