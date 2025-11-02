// ====================== MASPORTS MAIN SCRIPT ======================
let hls, selectedChannel = null;
let activeCategory = "all";

// ====================== CHANNEL LIST ==============================
const channels = [
  }
    category: "Basketball",
    title: "🏀 New Orleans Pelicans vs Oklahoma City Thunder",
    date: "2025-11-03",
    time: "10:00 AM",
    server1: "https://honortvph.dpdns.org/nba1/index.m3u8",
    server2: "https://streamcenter.pro/embed/ch65.php"
  },
  {
    category: "Basketball",
    title: "🏀 Philadelphia 76ers vs Brooklyn Nets",
    date: "2025-11-03",
    time: "10:00 AM",
    server1: "https://honortvph.dpdns.org/nba2/index.m3u8",
    server2: "https://streamcenter.pro/embed/ch66.php"
  },
  {
    category: "Basketball",
    title: "🏀 Utah Jazz vs Charlotte Hornets",
    date: "2025-11-03",
    time: "10:00 AM",
    server1: "https://honortvph.dpdns.org/nba3/index.m3u8",
    server2: "https://streamcenter.pro/embed/ch67.php"
  },
  {
    category: "Basketball",
    title: "🏀 Atlanta Hawks vs Cleveland Cavaliers",
    date: "2025-11-03",
    time: "10:00 AM",
    server1: "https://honortvph.dpdns.org/nba4/index.m3u8",
    server2: "https://streamcenter.pro/embed/ch68.php"
  },
  {
    category: "Basketball",
    title: "🏀 Memphis Grizzlies vs Toronto Raptors",
    date: "2025-11-03",
    time: "10:00 AM",
    server1: "https://honortvph.dpdns.org/nba5/index.m3u8",
    server2: "https://streamcenter.pro/embed/ch69.php"
  },
  {
    category: "Basketball",
    title: "🏀 Chicago Bulls vs New York Knicks",
    date: "2025-11-03",
    time: "10:00 AM",
    server1: "https://honortvph.dpdns.org/nba6/index.m3u8",
    server2: "https://streamcenter.pro/embed/ch70.php"
  },
  {
    category: "Basketball",
    title: "🏀 San Antonio Spurs vs. Phoenix Suns",
    date: "2025-11-03",
    time: "10:00 AM",
    server1: "https://honortvph.dpdns.org/nba7/index.m3u8",
    server2: "https://streamcenter.pro/embed/ch71.php"
  },
  {
    category: "Basketball",
    title: "🏀 Miami Heat vs. Los Angeles Lakers",
    date: "2025-11-03",
    time: "10:00 AM",
    server1: "https://honortvph.dpdns.org/nba8/index.m3u8",
    server2: "https://streamcenter.pro/embed/ch72.php"
  },
];

// ====================== DOM ELEMENTS ==============================
const categoryBar = document.getElementById("categoryBar");
const channelList = document.getElementById("channelList");
const searchBar = document.getElementById("searchBar");
const videoContainer = document.getElementById("videoContainer");
const videoPlayer = document.getElementById("videoPlayer");
const iframePlayer = document.getElementById("iframePlayer");
const loadingSpinner = document.getElementById("loadingSpinner");
const serverSelect = document.getElementById("serverSelect");
const server1Btn = document.getElementById("server1Btn");
const server2Btn = document.getElementById("server2Btn");

// ====================== CHANNEL RENDER ============================
function renderChannels() {
  const searchQuery = searchBar.value.toLowerCase();
  channelList.innerHTML = "";

  const filtered = channels.filter(ch => {
    const matchCategory = activeCategory === "all" || ch.category === activeCategory;
    const matchSearch = ch.title.toLowerCase().includes(searchQuery);
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    channelList.innerHTML = `<p style="text-align:center;">No matches found.</p>`;
    return;
  }

  filtered.forEach(ch => {
    const div = document.createElement("div");
    div.className = "channel-box";
    div.innerHTML = `
      <img src="https://i.imgur.com/Bk5D8Fh.png" alt="icon"/>
      <div>${ch.title}</div>
      <div style="font-size:0.85rem;opacity:0.8;">${ch.category}</div>
    `;
    div.onclick = () => openServerSelect(ch);
    channelList.appendChild(div);
  });
}

// ====================== CATEGORY SELECTION ========================
categoryBar.addEventListener("click", e => {
  if (!e.target.classList.contains("category-btn")) return;

  document.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
  e.target.classList.add("active");

  activeCategory = e.target.dataset.cat;
  renderChannels();
});

// ====================== SEARCH FUNCTION ==========================
searchBar.addEventListener("input", renderChannels);

// ====================== OPEN SERVER SELECT =======================
function openServerSelect(ch) {
  selectedChannel = ch;
  serverSelect.style.display = "flex";
  videoContainer.style.display = "none";
}

// ====================== SERVER SELECTION HANDLER =================
server1Btn.addEventListener("click", () => {
  playStream(selectedChannel.server1);
});
server2Btn.addEventListener("click", () => {
  playStream(selectedChannel.server2);
});

// ====================== PLAY STREAM ==============================
function playStream(url) {
  serverSelect.style.display = "none";
  videoContainer.style.display = "flex";
  loadingSpinner.style.display = "block";
  iframePlayer.style.display = "none";
  videoPlayer.style.display = "none";

  if (hls) {
    hls.destroy();
    hls = null;
  }

  setTimeout(() => {
    loadingSpinner.style.display = "none";
    if (url.includes(".php") || url.includes("iframe")) {
      iframePlayer.src = url;
      iframePlayer.style.display = "block";
    } else if (url.endsWith(".m3u8")) {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(videoPlayer);
        videoPlayer.style.display = "block";
      } else if (videoPlayer.canPlayType("application/vnd.apple.mpegurl")) {
        videoPlayer.src = url;
        videoPlayer.style.display = "block";
      } else {
        alert("Your browser does not support HLS playback.");
      }
    } else {
      window.open(url, "_blank");
    }
  }, 800);
}

// ====================== CLOSE VIDEO ==============================
function closeVideo() {
  if (hls) {
    hls.destroy();
    hls = null;
  }
  videoPlayer.pause();
  videoPlayer.removeAttribute("src");
  iframePlayer.removeAttribute("src");
  videoContainer.style.display = "none";
}

// ====================== TOGGLE CHANNEL LIST ======================
function toggleList() {
  if (channelList.style.display === "none") {
    channelList.style.display = "grid";
  } else {
    channelList.style.display = "none";
  }
}

// ====================== INITIAL LOAD =============================
window.addEventListener("DOMContentLoaded", () => {
  renderChannels();
});
