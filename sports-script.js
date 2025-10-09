let hls;
const channels = [
  { title: "San Antonio Spurs vs Miami Heat", time: "07:00", url: "https://e3.thetvapp.to/hls/NBATV/tracks-v1a1/mono.m3u8" },
  { title: "Boston Celtics vs Memphis Grizzlies", time: "08:00", url: "https://e3.thetvapp.to/hls/nbc-sports-boston/tracks-v1a1/mono.m3u8" },
  { title: "Utah Jazz vs Houston Rockets", time: "08:00", url: "https://live-pull.w02uat.com/live/LIV764027813860777984.m3u8" },
  { title: "Portland Trail Blazers @ Golden State Warriors", time: "10:00", url: "https://e5.thetvapp.to/hls/NBATV/tracks-v1a1/mono.m3u8" },
  { title: "Toronto Raptors vs Sacramento Kings", time: "10:00", url: "https://v17.thetvapp.to/hls/tsn1/tracks-v1a1/mono.m3u8?token=0HFYSe0FQspGAzpir2G5Cw&expires=1759966634&user_id=S0RkZHFUQnhFaUlXTkZHM3NlblZPZVVhbHc1clREZmY5YnJ4T28wVQ==" }
];

const logos = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUDu-D6tpUgnxurH9_AkBQ6a9TzVVpBfNE0VJArNbaWwsFTAEddxVTgHs&s=10";

// Render all channels
function renderChannels(list) {
  const container = document.getElementById("channelList");
  container.innerHTML = list.map((ch, i) => `
    <div class="channel-box" onclick="playChannel('${ch.url}')">
      <img src="${logos}" alt="${ch.title}">
      <h3>${ch.title}</h3>
      <div id="timer-${i}" class="countdown">Loading...</div>
    </div>
  `).join("");
}

// Countdown updater
function updateCountdowns() {
  const now = new Date();
  const phTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
  document.getElementById("phTime").textContent =
    "🇵🇭 Philippine Time: " + phTime.toLocaleTimeString();

  channels.forEach((ch, i) => {
    const target = new Date(phTime);
    const [h, m] = ch.time.split(":").map(Number);
    target.setHours(h, m, 0, 0);

    const diff = target - phTime;
    const el = document.getElementById(`timer-${i}`);
    if (!el) return;

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

// Video handling
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

// Initialize
window.onload = () => {
  renderChannels(channels);
  setInterval(updateCountdowns, 1000);
};
