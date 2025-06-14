import { useEffect, useRef } from "react";
import { parse, format, isBefore, dayStart } from "@formkit/tempo";
import { kyAspDotnet } from "../api/ky";
import { useUserStore } from "../stores/userStore";

const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes
const CHECK_INTERVAL = 60 * 1000; // 1 minute
const STORAGE_KEY = "user_activity_tracker";

export default function useUserActivityTracker() {
  const lastActivity = useRef(Date.now());
  const timerId = useRef(null);

  const user = useUserStore(state => state.user);

  useEffect(() => {
    if (!user?.id) return;

    const now = new Date();
    const todayStr = format(now, "YYYY-MM-DD");
    let stored = { minutes: 0, date: todayStr, userId: user.id };

    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const obj = JSON.parse(raw);

        // If the stored user doesn't match, reset
        if (obj.userId !== user.id) {
          console.log("Different user detected, resetting tracker.");
        } else {
          const storedDate = parse(obj.date, "YYYY-MM-DD");
          const startToday = dayStart(now);

          if (isBefore(storedDate, startToday)) {
            sendActivityToAPI(user.id, obj.minutes, obj.date);
          } else {
            stored = obj;
          }
        }
      } catch (e) {
        console.error("Storage parse error:", e);
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

    function update() {
      if (Date.now() - lastActivity.current >= INACTIVITY_LIMIT) {
        const latest = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (latest.minutes > 0 && latest.userId === user.id) {
          sendActivityToAPI(user.id, latest.minutes, latest.date);
        }
        const reset = {
          minutes: 0,
          date: format(new Date(), "YYYY-MM-DD"),
          userId: user.id,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
        return;
      }

      const latest = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (latest.userId === user.id) {
        latest.minutes += 1;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(latest));
      }
    }

    function onActivity() {
      lastActivity.current = Date.now();
    }

    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach(evt => window.addEventListener(evt, onActivity));
    timerId.current = setInterval(update, CHECK_INTERVAL);

    return () => {
      events.forEach(evt => window.removeEventListener(evt, onActivity));
      clearInterval(timerId.current);
    };
  }, [user]); // rerun effect if user changes
}

async function sendActivityToAPI(userId, minutes, date) {
  try {
    console.log(`Sending ${minutes} mins for user ${userId} on ${date}`);
    await kyAspDotnet.post(`api/useractivity/log/${userId}`, {
      searchParams: {
        useTimeInMinutes: minutes,
      },
    });
  } catch (err) {
    console.error("Failed to send activity:", err);
  }
}
