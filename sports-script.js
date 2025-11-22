let hls;

const channels = [
{
  title: "Indiana Pacers vs. Cleveland Cavaliers",
  date: "2025-11-22",
  time: "08:00",
  url: "https://e22cd317d72ce9c3afea3614629c9397.livehwc4.com/nami.videobss.com/live/hd-en-2-3867021.m3u8?sub_m3u8=true&edge_slice=true&user_session_id=fbb4b50518abc0f6bff1bdf7882fa32d"
},
{
  title: "Brooklyn Nets vs. Boston Celtics",
  date: "2025-11-22",
  time: "08:30",
  url: "https://e22cd317d72ce9c3afea3614629c9397.livehwc4.com/nami.videobss.com/live/hd-en-2-3866912.m3u8?sub_m3u8=true&edge_slice=true&user_session_id=2b20ee713a7af01dc7a9e0f33de86a3f"
},
{ 
  title: "Washington Wizards vs. Toronto Raptors",
  date: "2025-11-22",
  time: "08:30",
  url: "https://e22cd317d72ce9c3afea3614629c9397.livehwc4.com/nami.videobss.com/live/hd-en-2-3866135.m3u8?sub_m3u8=true&edge_slice=true&user_session_id=e66fc0ceb694c13fb90112c9fc050ff3"
},
{
  title: "Miami Heat vs. Chicago Bulls",
  date: "2025-11-22",
  time: "09:00",
  url: "https://e22cd317d72ce9c3afea3614629c9397.livehwc4.com/nami.videobss.com/live/hd-en-2-3867128.m3u8?sub_m3u8=true&edge_slice=true&user_session_id=3befd21de5c811a5b9b80a680285a7a1"
},
{
  title: "New Orleans Pelicans vs. Dallas Mavericks",
  date: "2025-11-22",
  time: "09:30",
  url: "https://e22cd317d72ce9c3afea3614629c9397.livehwc4.com/nami.videobss.com/live/hd-en-2-3866348.m3u8?sub_m3u8=true&edge_slice=true&user_session_id=32e867ddeebae4eb7ff609a7d80a3ae4"
},
{
  title: "Minnesota Timberwolves vs. Phoenix Suns",
  date: "2025-11-22",
  time: "10:00",
  url: "https://gg.poocloud.in/nba_phoenixsuns/index.m3u8"
},
{
  title: "Denver Nuggets vs. Houston Rockets",
  date: "2025-11-22",
  time: "10:30",
  url: "https://gg.poocloud.in/nba_houstonrockets/index.m3u8"
},
{
  title: "Oklahoma City Thunder vs. Utah Jazz",
  date: "2025-11-22",
  time: "11:00",
  url: "https://gg.poocloud.in/nba_utahjazz/index.m3u8"
},
{
  title: "Portland Trail Blazers vs. Golden State Warriors",
  date: "2025-11-22",
  time: "11:00",
  url: "https://gg.poocloud.in/nba_goldenstatewarriors/index.m3u8"
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
