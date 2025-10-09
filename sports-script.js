let hls;
const channels = [
  { title: "Timberwolves vs Knicks", date: "2025-10-09", time: "07:30", url: "https://e3.thetvapp.to/hls/NBATV/tracks-v1a1/mono.m3u8" },
  { title: "Pistons vs Bucks", date: "2025-10-09", time: "08:00", url: "https://e3.thetvapp.to/hls/nbc-sports-boston/tracks-v1a1/mono.m3u8" },
  { title: "Hornets vs Thunder", date: "2025-10-09", time: "08:00", url: "https://live-pull.w02uat.com/live/LIV764027813860777984.m3u8" },
  { title: "Cavaliers vs Bulls", date: "2025-10-09", time: "08:00", url: "https://e5.thetvapp.to/hls/NBATV/tracks-v1a1/mono.m3u8" },
  { title: "Loong-Lions vs Clippers", date: "2025-10-09", time: "10:30", url: "https://live-pull.w02uat.com/live/LIV763160652403306496.m3u8" }
];

const logos = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUDu-D6tpUgnxurH9_AkBQ6a9TzVVpBfNE0VJArNbaWwsFTAEddxVTgHs&s=10";

// Render channels
function renderChannels(list) {
  const container = document.getElementById("channelList");
  container.innerHTML = list.map((ch, i) => `
    <div class="channel-box" onclick="playChannel('${ch.url}')">
      <img src="${logos}" alt="${ch.title}">
      <h3>${ch.title}</h3>
      <small class="game-date">📅 ${ch.date} — ${ch.time} PH</small>
      <div id="timer-${i}" class="countdown">Loading...</div>
    </div>
  `).join("");
}

// Countdown logic
function updateCountdowns() {
  const now = new Date();
  const phTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
  document.getElementById("phTime").textContent =
    "🇵🇭 Philippine Time: " + phTime.toLocaleTimeString("en-US", { hour12: true });

  channels.forEach((ch, i) => {
    const el = document.getElementById(`timer-${i}`);
    if (!el) return;

    const target = new Date(`${ch.date}T${ch.time}:00+08:00`); // PH time base
    const diff = target - phTime;

    if (diff <= 0) {
      el.textContent = "LIVE NOW 🟢";
      el.style.color = "limegreen";
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    // Smart display
    if (diff <= 5 * 60 * 1000) {
      el.textContent = "Starting Soon 🔴";
      el.style.color = "#ff4444";
    } else {
      const dPart = days > 0 ? `${days}d ` : "";
      el.textContent = `Starts in ${dPart}${hours}h ${mins}m ${secs}s`;
      el.style.color = "#ffcc66";
    }
  });
}

// Video player logic
function playChannel(url) {
  const container = document.getElementById("videoContainer");
  const video = document.getElementById("videoPlayer");
  container.style.display = "flex";

  if (hls) hls.destroy();
  video.pause();
  video.removeAttribute("src");
  video.load();

  if (Hls.isSupported()) {
    hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = url;
    video.addEventListener("loadedmetadata", () => video.play());
  } else {
    alert("This stream format is not supported.");
  }
}

function closeVideo() {
  const video = document.getElementById("videoPlayer");
  document.getElementById("videoContainer").style.display = "none";
  video.pause();
  video.removeAttribute("src");
}

// Search filter
document.getElementById("searchBar").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  renderChannels(channels.filter(c => c.title.toLowerCase().includes(q)));
});

// Init
window.onload = () => {
  renderChannels(channels);
  updateCountdowns();
  setInterval(updateCountdowns, 1000);
};
