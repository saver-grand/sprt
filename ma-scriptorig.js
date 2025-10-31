let hls, selectedURLs = {}, activeCategory = "all";

// ====================== CHANNEL LIST ============================
const channels = [
  {category:"Basketball",title:"🏀 Orlando Magic vs. Charlotte Hornets",date:"2025-10-31",time:"7:00 AM",
    server1:"https://nami.videobss.com/live/hd-en-2-3866892.m3u8",
    server2:"http://honortvph.totalh.net/nba.php?ch=cows",
    server3:"http://honortvph.totalh.net/nba.php?ch=cows"
  },
  {category:"Basketball",title:"🏀 Golden State Warriors vs. Milwaukee Bucks",date:"2025-10-31",time:"08:00 AM",
    server1:"https://e22cd317d72ce9c3afea3614629c9397.livehwc4.com/nami.videobss.com/live/hd-en-2-3866783.m3u8?sub_m3u8=true&edge_slice=true&user_session_id=7ebb921583fe228e8019ca004b8d6cf6",
    server2:"https://streamcenter.pro/embed/ch66.php",
    server3:"http://honortvph.totalh.net/nba.php?ch=gsw"
  },
  {category:"Basketball",title:"🏀 Washington Wizards vs. Oklahoma City Thunder",date:"2025-10-31",time:"08:00 AM",
    server1:"https://e4.thetvapp.to/hls/NBA20/tracks-v1a1/mono.m3u8",
    server2:"https://streamcenter.pro/embed/ch67.php",
    server3:"http://honortvph.totalh.net/nba.php?ch=wiz"
  },
  {category:"Basketball",title:"🏀 Miami Heat vs. San Antonio Spurs",date:"2025-10-31",time:"08:30 AM",
    server1:"https://e4.thetvapp.to/hls/NBA10/tracks-v1a1/mono.m3u8",
    server2:"https://streamcenter.pro/embed/ch68.php",
    server3:"http://honortvph.totalh.net/nba.php?ch=mia"
  }
];

const logos = "https://i.imgur.com/y7rtkDI.jpeg";

// ====================== RENDER CHANNELS ============================
function renderChannels(list) {
  const container = document.getElementById("channelList");
  if (list.length === 0) {
    container.innerHTML = "<p style='text-align:center;color:#f55;'>No matches found</p>";
    return;
  }
  container.innerHTML = list.map((ch, i) => `
    <div class="channel-box" onclick='showServerSelect(${JSON.stringify(ch)})'>
      <img src="${logos}" alt="logo">
      <h3>${ch.title}</h3>
      <small>🏷️ ${ch.category}</small><br>
      <small>📅 ${ch.date} - ${ch.time} PH</small>
      <div id="timer-${i}" class="countdown">Loading...</div>
    </div>
  `).join("");
  startCountdown(list);
}

// ====================== COUNTDOWN ============================
function startCountdown(list) {
  function parseTime(date, time) {
    const [t, period] = time.split(" ");
    let [hours, minutes] = t.split(":").map(Number);
    if (period.toUpperCase() === "PM" && hours < 12) hours += 12;
    if (period.toUpperCase() === "AM" && hours === 12) hours = 0;
    return new Date(`${date}T${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:00+08:00`);
  }

  function update() {
    const nowPH = new Date(new Date().toLocaleString("en-US", { timeZone:"Asia/Manila" }));
    list.forEach((ch, i) => {
      const target = parseTime(ch.date, ch.time);
      const diff = target - nowPH;
      const el = document.getElementById(`timer-${i}`);
      if (!el) return;
      if (diff <= 0) {
        el.textContent = "🟢 LIVE NOW";
        el.style.color = "limegreen";
      } else {
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        el.textContent = `⏳ Starts in ${h}h ${m}m ${s}s`;
        el.style.color = "#ffcc66";
      }
    });
  }

  update();
  setInterval(update, 1000);
}

// ====================== CATEGORY + SEARCH ============================
function filterChannels() {
  const search = document.getElementById("searchBar").value.toLowerCase();
  renderChannels(channels.filter(c =>
    (activeCategory === "all" || c.category === activeCategory) &&
    c.title.toLowerCase().includes(search)
  ));
}

document.getElementById("searchBar").addEventListener("input", filterChannels);
document.querySelectorAll(".category-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.getAttribute("data-cat");
    filterChannels();
  });
});

// ====================== SERVER SELECTION ============================
function showServerSelect(ch) {
  selectedURLs = ch;
  const modal = document.getElementById("serverSelect");
  modal.style.display = "flex";

  document.getElementById("server1Btn").style.display = ch.server1 ? "block" : "none";
  document.getElementById("server2Btn").style.display = ch.server2 ? "block" : "none";
  document.getElementById("server3Btn").style.display = ch.server3 ? "block" : "none";
}

document.getElementById("server1Btn").onclick = () => {
  document.getElementById("serverSelect").style.display = "none";
  playChannel(selectedURLs.server1);
};
document.getElementById("server2Btn").onclick = () => {
  document.getElementById("serverSelect").style.display = "none";
  playIframe(selectedURLs.server2);
};
document.getElementById("server3Btn").onclick = () => {
  document.getElementById("serverSelect").style.display = "none";
  playPhpStream(selectedURLs.server3);
};

// ====================== PLAYER CONTROL ============================
function playChannel(url) {
  const c = document.getElementById("videoContainer"),
        v = document.getElementById("videoPlayer"),
        i = document.getElementById("iframePlayer");
  c.style.display = "flex"; i.style.display = "none"; v.style.display = "block";
  document.getElementById("channelCard").style.display = "none";
  if (hls) hls.destroy();
  if (Hls.isSupported()) {
    hls = new Hls(); hls.loadSource(url); hls.attachMedia(v);
    hls.on(Hls.Events.MANIFEST_PARSED, () => v.play());
  } else v.src = url;
}

function playIframe(url) {
  const c = document.getElementById("videoContainer"),
        v = document.getElementById("videoPlayer"),
        i = document.getElementById("iframePlayer");
  c.style.display = "flex"; v.style.display = "none"; i.style.display = "block";
  document.getElementById("channelCard").style.display = "none";
  i.src = url;
}

// 🆕 Server 3 PHP handler
function playPhpStream(url) {
  if (url.includes(".php?ch=")) {
    playIframe(url);
  } else {
    playChannel(url);
  }
}

function closeVideo() {
  document.getElementById("videoContainer").style.display = "none";
  document.getElementById("channelCard").style.display = "block";
  document.getElementById("videoPlayer").pause();
  document.getElementById("iframePlayer").src = "";
}

// ====================== PHILIPPINE TIME CLOCK ============================
function updateTime() {
  const now = new Date();
  const ph = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
  document.getElementById("phTime").textContent =
    "🇵🇭 Philippine Time: " + ph.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// ====================== INIT ============================
renderChannels(channels);
