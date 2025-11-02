// ====================== MASPORTS MAIN SCRIPT ======================
let hls, selectedChannel = null;
let activeCategory = "all";

// ====================== CHANNEL LIST ==============================
const channels = [
  {
    category: "Basketball",
    title: "🏀 Orlando Magic vs. Charlotte Hornets",
    date: "2025-10-31",
    time: "7:00 AM",
    server1: "https://nami.videobss.com/live/hd-en-2-3866892.m3u8",
    server2: "http://honortvph.totalh.net/nba.php?ch=cows"
  },
  {
    category: "Basketball",
    title: "🏀 Milwaukee Bucks vs. Chicago Bulls",
    date: "2025-10-31",
    time: "9:00 AM",
    server1: "https://nami.videobss.com/live/hd-en-1-3866895.m3u8",
    server2: "http://honortvph.totalh.net/nba.php?ch=buks"
  },
  {
    category: "Soccer",
    title: "⚽ Premier League Live",
    date: "2025-10-31",
    time: "10:00 PM",
    server1: "https://sports.example.com/epl.m3u8",
    server2: "https://honortvph.totalh.net/epl.php"
  }
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
