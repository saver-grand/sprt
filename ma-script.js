let hls, selectedURLs = {}, activeCategory = "all";

// ====================== CHANNEL LIST ============================
const channels = [
 {category:"Basketball",title:"🏀 Orlando Magic vs. Charlotte Hornets",date:"2025-10-31",time:"7:00 AM",server1:"https://nami.videobss.com/live/hd-en-2-3866892.m3u8",server2:"https://streamcenter.pro/embed/ch65.php"},
  {category:"Basketball",title:"🏀 Golden State Warriors vs. Milwaukee Bucks",date:"2025-10-31",time:"08:00 AM",server1:"https://honortvph.dpdns.org/nba2/index.m3u8",server2:"https://streamcenter.pro/embed/ch66.php"},
  {category:"Basketball",title:"🏀 Washington Wizards vs. Oklahoma City Thunder",date:"2025-10-31",time:"08:00 AM",server1:"https://e4.thetvapp.to/hls/NBA20/tracks-v1a1/mono.m3u8",server2:"https://streamcenter.pro/embed/ch67.php"},
  {category:"Basketball",title:"🏀 Miami Heat vs. San Antonio Spurs",date:"2025-10-31",time:"08:30 AM",server1:"https://e4.thetvapp.to/hls/NBA10/tracks-v1a1/mono.m3u8",server2:"https://streamcenter.pro/embed/ch68.php"},
  {category:"MLB",title:"⚾ Los Angeles Dodgers vs Toronto Blue Jays",date:"2025-11-02",time:"08:00 AM",server1:"https://honortvph.dpdns.org/mlb1/index.m3u8",server2:"https://streamcenter.pro/embed/ch15.php"},
  {category:"Soccer",title:"⚽ Cagliari vs Sassuolo",date:"2025-10-31",time:"01:30 AM",server1:"https://honortvph.dpdns.org/soccer1/index.m3u8",server2:"https://streamcenter.pro/embed/ch9.php"},
  {category:"Soccer",title:"⚽ Pisa vs Lazio",date:"2025-10-31",time:"03:00 AM",server1:"https://honortvph.dpdns.org/soccer2/index.m3u8",server2:"https://streamcenter.pro/embed/ch9.php"},  
  {category:"UFC/MMA",title:"🥋 Steve Garcia vs David Onama",date:"2025-11-02",time:"07:00 AM",server1:"https://honortvph.dpdns.org/ufc1/index.m3u8",server2:"https://streamcenter.pro/embed/ch9.php"},  
  {category:"Hockey",title:"🏑 Buffalo Sabres vs Boston Bruins",date:"2025-10-31",time:"07:00 AM",server1:"https://honortvph.dpdns.org/hockey1/index.m3u8",server2:"https://streamcenter.pro/embed/ch50.php"},  
  {category:"Hockey",title:"🏑 Calgary Flames vs Ottawa Senators",date:"2025-11-31",time:"07:00 AM",server1:"https://honortvph.dpdns.org/hockey2/index.m3u8",server2:"https://streamcenter.pro/embed/ch51.php"},  
  {category:"Hockey",title:"🏑 Dallas Stars vs Tampa Bay Lightning",date:"2025-11-31",time:"07:00 AM",server1:"https://honortvph.dpdns.org/hockey3/index.m3u8",server2:"https://streamcenter.pro/embed/ch52.php"},  
  {category:"Hockey",title:"🏑 Nashville Predators vs Philadelphia Flyers",date:"2025-10-31",time:"07:00 AM",server1:"https://honortvph.dpdns.org/hockey4/index.m3u8",server2:"https://streamcenter.pro/embed/ch53.php"},  
  {category:"Hockey",title:"🏑 New York Islanders vs Carolina Hurricanes",date:"2025-10-31",time:"07:30 AM",server1:"https://honortvph.dpdns.org/hockey5/index.m3u8",server2:"https://streamcenter.pro/embed/ch54.php"},  
 
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
  document.getElementById("serverSelect").style.display = "flex";
}
document.getElementById("server1Btn").onclick = () => {
  document.getElementById("serverSelect").style.display = "none";
  playChannel(selectedURLs.server1);
};
document.getElementById("server2Btn").onclick = () => {
  document.getElementById("serverSelect").style.display = "none";
  playIframe(selectedURLs.server2);
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

function closeVideo() {
  document.getElementById("videoContainer").style.display = "none";
  document.getElementById("channelCard").style.display = "block";
  document.getElementById("videoPlayer").pause();
  document.getElementById("iframePlayer").src = "";
}

function toggleList() {
  const c = document.getElementById("channelCard");
  c.style.display = c.style.display === "none" ? "block" : "none";
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
