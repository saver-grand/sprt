let hls;

const channels = [
  {
    title: "Cleveland Cavaliers vs Detroit Pistons",
    date: "2025-10-27",
    time: "07:00",
    url: "https://e1.thetvapp.to/hls/NBA01/tracks-v1a1/mono.m3u8"
  },
  {
    title: "Orlando Magic vs Philadelphia 76ers",
    date: "2025-10-27",
    time: "07:00",
    url: "https://e1.thetvapp.to/hls/NBA02/tracks-v1a1/mono.m3u8"
  },
  {
    title: "Atlanta Hawks vs Chicago Bulls",
    date: "2025-10-27",
    time: "08:00",
    url: "https://e3.thetvapp.to/hls/NBA14/tracks-v1a1/mono.m3u8"
  },
  {
    title: "Brooklyn Nets vs Houston Rockets",
    date: "2025-10-27",
    time: "08:00",
    url: "https://e1.thetvapp.to/hls/NBA04/tracks-v1a1/mono.m3u8"
  },
  {
    title: "Boston Celtics vs New Orleans Pelicans",
    date: "2025-10-27",
    time: "08:00",
    url: "https://e1.thetvapp.to/hls/NBA05/tracks-v1a1/mono.m3u8"
  },
  {
    title: "Toronto Raptors vs San Antonio Spurs",
    date: "2025-10-27",
    time: "08:00",
    url: "https://e1.thetvapp.to/hls/NBA06/tracks-v1a1/mono.m3u8"
  },
  {
    title: "Oklahoma City Thunder vs Dallas Mavericks",
    date: "2025-10-27",
    time: "08:30",
    url: "https://e1.thetvapp.to/hls/NBA07/tracks-v1a1/mono.m3u8"
  },
  {
    title: "Phoenix Suns vs Utah Jazz",
    date: "2025-10-27",
    time: "09:00",
    url: "https://e1.thetvapp.to/hls/NBA08/tracks-v1a1/mono.m3u8"
  },
  {
    title: "Denver Nuggets vs Minnesota Timberwolves",
    date: "2025-10-27",
    time: "09:30",
    url: "https://e1.thetvapp.to/hls/NBA09/tracks-v1a1/mono.m3u8"
  },
  {
    title: "Memphis Grizzlies vs Golden State Warriors",
    date: "2025-10-27",
    time: "10:00",
    url: "https://e1.thetvapp.to/hls/NBA10/tracks-v1a1/mono.m3u8"
  },
  {
    title: "Portland Trail Blazers vs Los Angeles Lakers",
    date: "2025-10-27",
    time: "10:30",
    url: "https://e1.thetvapp.to/hls/NBA11/tracks-v1a1/mono.m3u8"
  }
];

const logos =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUDu-D6tpUgnxurH9_AkBQ6a9TzVVpBfNE0VJArNbaWwsFTAEddxVTgHs&s=10";

// Render channels
function renderChannels(list) {
  const container = document.getElementById("channelList");
  container.innerHTML = list
    .map(
      (ch, i) => `
      <div class="channel-box" onclick="playChannel('${ch.url}')">
        <img src="${logos}" alt="${ch.title}">
        <h3>${ch.title}</h3>
        <small class="game-date">📅 ${ch.date} — ${ch.time} PH</small>
        <div id="timer-${i}" class="countdown">Loading...</div>
      </div>
    `
    )
    .join("");
}

// Countdown logic
function updateCountdowns() {
  const now = new Date();
  // Convert to Philippine time (Asia/Manila)
  const phTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));

  // Update PH Time display
  const timeDisplay = document.getElementById("phTime");
  if (timeDisplay) {
    timeDisplay.textContent =
      "🇵🇭 Philippine Time: " +
      phTime.toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }

  channels.forEach((ch, i) => {
    const el = document.getElementById(`timer-${i}`);
    if (!el) return;

    // Properly build target time (as PH time)
    const [hour, minute] = ch.time.split(":").map(Number);
    const [year, month, day] = ch.date.split("-").map(Number);
    const target = new Date(Date.UTC(year, month - 1, day, hour - 8, minute)); // UTC correction for PH (+8)

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
document.getElementById("searchBar").addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  renderChannels(channels.filter((c) => c.title.toLowerCase().includes(q)));
});

// Init
window.onload = () => {
  renderChannels(channels);
  updateCountdowns();
  setInterval(updateCountdowns, 1000);
};
