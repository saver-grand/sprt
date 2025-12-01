let hls, selectedURLs = {}, activeCategory = "Basketball";
let countdownInterval = null;

// ====================== CHANNEL LIST ============================
const channels = [ 
    {
    category: "Live TV",
    title: "📺 ABC East",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/ABC_EAST/index.m3u8",
    server2: "https://honotvph.42web.io/masports.php?channel=nba1"
  },
  {
    category: "Live TV",
    title: "🏈 ACC Network",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/ACC_NETWORK/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🐾 Animal Planet",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/Animal_Planet/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🎬 AMC Network",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/AMC_NETWORK/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🎖️ American Heroes Channel",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/American_Heroes_Channel/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "💃 Bravo",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BRAVO/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🔥 TNT",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/TNT/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🌍 BBC America",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BBC_AMERICA/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🌍 BBC World News",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BBC_WORLD_NEWS/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🏆 BeIN Sports",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BEIN_SPORTS/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🎶 BET East",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BET_EAST/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "💃 BET Her",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BET_HER/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🎤 BET Soul",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BET_SOUL/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🎧 BET Jams",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BET_Jams/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "💼 Bloomberg TV",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BLOOMBERG/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🐰 Boomerang",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BOOMERANG/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🏛️ C-SPAN",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/C-SPAN/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🏈 CBS Sports Network",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/CBS_SPORTS_NETWORK/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "📺 CBS East",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/CBSEAST/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🎸 CMT (Country Music Television)",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/CMT/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "😂 Comedy Central",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/Comedy_Central/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🍳 Cooking Channel",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/COOKING_CHANNEL/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🦋 Discovery Family Channel",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/DISCOVERY_FAMILY_CHANNEL/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🎬 E! Entertainment Television",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/E_ENTERTAINMENT_TELEVISION/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🍔 Food Network",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/FOOD_NETWORK/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🕵️ Investigation Discovery",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/INVESTIGATION_DISCOVERY/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "📡 ION TV",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/ION_TV/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🎥 Lifetime Movie Network",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/LIFETIME_MOVIE_NETWORK/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "📺 Me TV",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/ME_TV/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "⚾ MLB Network",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/MLB_NETWORK/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🏎️ Motor Trend",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/MOTOR_TREND/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "📰 MSNBC",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/MSNBC/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🗞️ News Nation",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/NEWS_NATION/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🏈 NFL Network",
    date: "",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/NFL_NETWORK/index.m3u8",
    server2: "https://honotvph.42web.io/masports.php?channel=nba1"
  },
  {
    category: "Live TV",
    title: "🤼 WWE Network",
    date: "",
    time: "24/7",
    server1: "https://fl3.moveonjoy.com/WWE/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🎬 Movie Sphere",
    date: "",
    time: "24/7",
    server1: "https://samsunguk-moviesphereuk-samsung-uk-s7xaa.amagi.tv/ts-eu-w1-n2/playlist/samsunguk-moviesphereuk-samsung-uk/playlist.m3u8",
    server2: ""
        },
  {
      category: "WWE",
    title: "🤼 WWE EVENT",
    date: "2025-11-23",
    time: "8:00 AM",
    server1: "https://masports.dpdns.org/app/wwe.html",
    server2: "https://watchlive.top/embed/aew/collision/25-11-22"
  },
  {    
    category: "F1",
    title: "🏎️ Las Vegas Grand Prix - Race",
    date: "2025-11-26",
    time: "11:00 AM",
    server1: "https://streamcenter.xyz/embed/ch49.php",
    server2: "https://watchlive.top/embed/f1/2025/las-vegas/race"
        },
  {    
        category: "UFC/MMA",
    title: "UFC 323: Dvalishvili vs. Yan 2",
    date: "2025-12-07",
    time: "7:00 AM",
    server1: "https://masports.dpdns.org/app/ufc1.html",
    server2: "https://embednow.top/embed/ufc-323"
        },
  {  
    category: "NFL",
    title: "NFL - New York Giants vs. New England Patriots",
    date: "2025-12-01",
    time: "9:15 AM",
    server1: "https://masports.dpdns.org/app/nfl1.html",
    server2: "https://embednow.top/embed/nfl/7350/7350-ne"
    },
{
  category: "Basketball",
  title: "🏀 NBA - Atlanta Hawks vs. Detroit Pistons",
  date: "2025-12-02",
  time: "8:00 AM",
  server1: "https://masports.dpdns.org/app/nba1.html",
  server2: "https://streamcenter.xyz/embed/ch65.php"
},
{
  category: "Basketball",
  title: "🏀 NBA - Cleveland Cavaliers vs. Indiana Pacers",
  date: "2025-12-02",
  time: "8:00 AM",
  server1: "https://masports.dpdns.org/app/nba2.html",
  server2: "https://streamcenter.xyz/embed/ch66.php"
},
{
  category: "Basketball",
  title: "🏀 NBA - Milwaukee Bucks vs. Washington Wizards",
  date: "2025-12-02",
  time: "8:00 AM",
  server1: "https://masports.dpdns.org/app/nba3.html",
  server2: "https://streamcenter.xyz/embed/ch67.php"
},
{
  category: "Basketball",
  title: "🏀 NBA - Charlotte Hornets vs. Brooklyn Nets",
  date: "2025-12-02",
  time: "8:30 AM",
  server1: "https://masports.dpdns.org/app/nba4.html",
  server2: "https://streamcenter.xyz/embed/ch68.php"
},
{
  category: "Basketball",
  title: "🏀 NBA - LA Clippers vs. Miami Heat",
  date: "2025-12-02",
  time: "8:30 AM",
  server1: "https://masports.dpdns.org/app/nba5.html",
  server2: "https://streamcenter.xyz/embed/ch69.php"
},
{
  category: "Basketball",
  title: "🏀 NBA - Chicago Bulls vs. Orlando Magic",
  date: "2025-12-02",
  time: "8:30 AM",
  server1: "https://masports.dpdns.org/app/nba6.html",
  server2: "https://streamcenter.xyz/embed/ch70.php"
},
{
  category: "Basketball",
  title: "🏀 NBA - Dallas Mavericks vs. Denver Nuggets",
  date: "2025-12-02",
  time: "10:00 AM",
  server1: "https://masports.dpdns.org/app/nba7.html",
  server2: "https://streamcenter.xyz/embed/ch71.php"
},
{
  category: "Basketball",
  title: "🏀 NBA - Houston Rockets vs. Utah Jazz",
  date: "2025-12-02",
  time: "10:00 AM",
  server1: "https://masports.dpdns.org/app/nba8.html",
  server2: "https://streamcenter.xyz/embed/ch72.php"
},
{
  category: "Basketball",
  title: "🏀 NBA - Phoenix Suns vs. Los Angeles Lakers",
  date: "2025-12-02",
  time: "11:00 AM",
  server1: "https://masports.dpdns.org/app/nba9.html",
  server2: "https://streamcenter.xyz/embed/ch73.php"
}
];

const logos = "https://i.imgur.com/y7rtkDI.jpeg";

// ====================== RENDER CHANNELS ============================
function renderChannels(list) {
  const container = document.getElementById("channelList");
  if (!list.length) {
    container.innerHTML = "<p style='text-align:center;color:#f55;'>No matches found</p>";
    return;
  }

  container.innerHTML = list.map((ch, i) => `
    <div class="channel-box" onclick='showServerSelect(${JSON.stringify(ch)})'>
      <img src="${logos}" alt="logo">
      <h3>${ch.title}</h3>
      <small>🏷️ ${ch.category}</small><br>
      <small>📅 ${ch.date} - ${ch.time}</small>
      <div id="timer-${i}" class="countdown">Loading…</div>
    </div>
  `).join("");

  startCountdown(list);
}

// ====================== COUNTDOWN FIX – NO BLINKING ============================
function startCountdown(list) {
  if (countdownInterval) clearInterval(countdownInterval);

  function parsePH(date, time) {
    const [raw, mer] = time.split(" ");
    let [h, m] = raw.split(":").map(Number);
    if (mer === "PM" && h < 12) h += 12;
    if (mer === "AM" && h === 12) h = 0;

    const iso = `${date}T${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:00+08:00`;
    return new Date(iso).getTime(); // stable Manila timestamp
  }

  countdownInterval = setInterval(() => {
    const now = Date.now();

    list.forEach((ch, i) => {
      const el = document.getElementById(`timer-${i}`);
      if (!el) return;

      const start = parsePH(ch.date, ch.time);
      const liveEnd = start + 3 * 60 * 60 * 1000; // 3 hours

      if (now >= start && now <= liveEnd) {
        el.textContent = "🟢 LIVE NOW";
        el.style.color = "limegreen";
        return;
      }

      if (now > liveEnd) {
        el.textContent = "🔴 EVENT ENDED";
        el.style.color = "#ff4444";
        return;
      }

      const diff = start - now;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      el.textContent = `⏳ Starts in ${h}h ${m}m ${s}s`;
      el.style.color = "#ffcc66";
    });

  }, 1000);
}

// ====================== CATEGORY + SEARCH ============================
function filterChannels() {
  const search = document.getElementById("searchBar").value.toLowerCase();
  const filtered = channels.filter(c =>
    (activeCategory === "all" || c.category === activeCategory) &&
    c.title.toLowerCase().includes(search)
  );

  renderChannels(filtered);
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

  if (selectedURLs.category === "Live TV") {
    playChannel(selectedURLs.server1);
  } else {
    playIframe(selectedURLs.server1);
  }
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

  c.style.display = "flex";
  i.style.display = "none";
  v.style.display = "block";
  document.getElementById("channelCard").style.display = "none";

  if (hls) hls.destroy();
  if (Hls.isSupported()) {
    hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(v);
    hls.on(Hls.Events.MANIFEST_PARSED, () => v.play());
  } else {
    v.src = url;
  }
}

function playIframe(url) {
  const c = document.getElementById("videoContainer"),
        v = document.getElementById("videoPlayer"),
        i = document.getElementById("iframePlayer");

  c.style.display = "flex";
  v.style.display = "none";
  i.style.display = "block";
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

// ====================== INIT ============================
renderChannels(channels.filter(c => c.category === "Basketball"));
document.querySelector(`[data-cat="Basketball"]`).classList.add("active");
