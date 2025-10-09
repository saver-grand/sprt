let hls;

// Channel list
const channels = [
  { title: "Timberwolves vs Knicks", time: "07:30", url: "https://e3.thetvapp.to/hls/NBATV/tracks-v1a1/mono.m3u8" },
  { title: "Pistons vs Bucks", time: "08:00", url: "https://e3.thetvapp.to/hls/nbc-sports-boston/tracks-v1a1/mono.m3u8" },
  { title: "Hornets vs Thunder", time: "08:00", url: "https://live-pull.w02uat.com/live/LIV764027813860777984.m3u8" },
  { title: "Cavaliers vs Bulls", time: "08:00", url: "https://e5.thetvapp.to/hls/NBATV/tracks-v1a1/mono.m3u8" },
  { title: "Loong-Lions vs Clippers", time: "10:30", url: "https://live-pull.w02uat.com/live/LIV763160652403306496.m3u8" }
];

// Default logo for all channels
const logos = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUDu-D6tpUgnxurH9_AkBQ6a9TzVVpBfNE0VJArNbaWwsFTAEddxVTgHs&s=10";

/* =========================================================
   RENDER CHANNELS
========================================================= */
function renderChannels(list) {
  const container = document.getElementById("channelList");
  if (!container) return;

  container.innerHTML = list.map((ch, i) => `
    <div class="channel-box" onclick="playChannel('${ch.url}')">
      <img src="${logos}" alt="${ch.title}">
      <h3>${ch.title}</h3>
      <div id="timer-${i}" class="countdown">Loading...</div>
    </div>
  `).join("");
}

/* =========================================================
   COUNTDOWN & TIME DISPLAY
========================================================= */
function updateCountdowns() {
  const phTimeDisplay = document.getElementById("phTime");
  if (!phTimeDisplay) return;

  const now = new Date();
  const phTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
  phTimeDisplay.textContent = "🇵🇭 Philippine Time: " + phTime.toLocaleTimeString();

  channels.forEach((ch, i) => {
    const el = document.getElementById(`timer-${i}`);
    if (!el) return;

    const target = new Date(phTime);
    const [h, m] = ch.time.split(":").map(Number);
    target.setHours(h, m, 0, 0);

    const diff = target - phTime;

    if (diff <= 0) {
      el.textContent = "LIVE NOW 🟢";
      el.style.color = "var(--accent)";
    } else if (diff <= 5 * 60 * 1000) {
      el.textContent = "Starting Soon 🔴";
      el.style.color = "var(--warning)";
    } else {
      const hrs = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      el.textContent = `Starts in ${hrs}h ${mins}m ${secs}s`;
      el.style.color = "#ffcc66";
    }
  });
}

/* =========================================================
   VIDEO PLAYER HANDLING
========================================================= */
function playChannel(url) {
  const container = document.getElementById("videoContainer");
  const video = document.getElementById("videoPlayer");
  if (!video || !container) return;

  container.style.display = "flex";

  // Cleanup old HLS instance
  if (hls) {
    hls.destroy();
    hls = null;
  }

  video.pause();
  video.removeAttribute("src");
  video.load();

  if (Hls.isSupported()) {
    hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play().catch(() => {
        console.warn("Autoplay prevented — showing controls.");
        video.controls = true;
      });
    });

    // Error handling
    hls.on(Hls.Events.ERROR, (event, data) => {
      console.error("HLS error:", data);
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            alert("Network error — please check your internet or stream source.");
            hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            alert("Media error — attempting recovery...");
            hls.recoverMediaError();
            break;
          default:
            alert("Fatal error — please refresh or try another stream.");
            hls.destroy();
            break;
        }
      }
    });

  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = url;
    video.addEventListener("loadedmetadata", () => {
      video.play().catch(() => (video.controls = true));
    });
  } else {
    alert("Your browser does not support live streaming playback.");
  }
}

/* =========================================================
   CLOSE VIDEO
========================================================= */
function closeVideo() {
  const video = document.getElementById("videoPlayer");
  const container = document.getElementById("videoContainer");
  if (!video || !container) return;

  if (hls) {
    hls.destroy();
    hls = null;
  }
  video.pause();
  video.removeAttribute("src");
  container.style.display = "none";
}

/* =========================================================
   SEARCH FILTER
========================================================= */
const searchBar = document.getElementById("searchBar");
if (searchBar) {
  searchBar.addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    const filtered = channels.filter(c => c.title.toLowerCase().includes(q));
    renderChannels(filtered);
  });
}

/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeVideo();
});

/* =========================================================
   INITIALIZE APP
========================================================= */
window.onload = () => {
  renderChannels(channels);
  updateCountdowns();
  setInterval(updateCountdowns, 1000);
};
