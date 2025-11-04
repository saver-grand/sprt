let hls, selectedURLs = {}, activeCategory = "all";

// ====================== CHANNEL LIST ============================
const channels = [
    {
    category: "Live TV",
    title: "📺 ABC East",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/ABC_EAST/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🏈 ACC Network",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/ACC_NETWORK/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🐾 Animal Planet",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/Animal_Planet/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🎬 AMC Network",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/AMC_NETWORK/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🎖️ American Heroes Channel",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/American_Heroes_Channel/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "💃 Bravo",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BRAVO/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🔥 TNT",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/TNT/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🌍 BBC America",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BBC_AMERICA/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🌍 BBC World News",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BBC_WORLD_NEWS/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🏆 BeIN Sports",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BEIN_SPORTS/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🎶 BET East",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BET_EAST/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "💃 BET Her",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BET_HER/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🎤 BET Soul",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BET_SOUL/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🎧 BET Jams",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BET_Jams/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "💼 Bloomberg TV",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BLOOMBERG/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🐰 Boomerang",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/BOOMERANG/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🏛️ C-SPAN",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/C-SPAN/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🏈 CBS Sports Network",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/CBS_SPORTS_NETWORK/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "📺 CBS East",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/CBSEAST/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🎸 CMT (Country Music Television)",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/CMT/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "😂 Comedy Central",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/Comedy_Central/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🍳 Cooking Channel",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/COOKING_CHANNEL/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🦋 Discovery Family Channel",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/DISCOVERY_FAMILY_CHANNEL/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🎬 E! Entertainment Television",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/E_ENTERTAINMENT_TELEVISION/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🍔 Food Network",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/FOOD_NETWORK/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🕵️ Investigation Discovery",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/INVESTIGATION_DISCOVERY/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "📡 ION TV",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/ION_TV/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🎥 Lifetime Movie Network",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/LIFETIME_MOVIE_NETWORK/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "📺 Me TV",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/ME_TV/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "⚾ MLB Network",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/MLB_NETWORK/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🏎️ Motor Trend",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/MOTOR_TREND/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "📰 MSNBC",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/MSNBC/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🗞️ News Nation",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/NEWS_NATION/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🏈 NFL Network",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/NFL_NETWORK/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🤼 WWE Network",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl3.moveonjoy.com/WWE/index.m3u8",
    server2: ""
  },
  {
    category: "Live TV",
    title: "🎬 Movie Sphere",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://samsunguk-moviesphereuk-samsung-uk-s7xaa.amagi.tv/ts-eu-w1-n2/playlist/samsunguk-moviesphereuk-samsung-uk/playlist.m3u8",
    server2: ""
  },
  {
    category: "Basketball",
    title: "🏀 Minnesota Timberwolves vs. Brooklyn Nets",
    date: "2025-11-04",
    time: "8:00 AM",
    server1: "https://e22cd317d72ce9c3afea3614629c9397.livehwc4.com/nami.videobss.com/live/hd-en-2-3866094.m3u8?sub_m3u8=true&edge_slice=true&user_session_id=805cb148624582cc7d2157a502fc0d52",
    server2: "https://streamcenter.pro/embed/ch65.php"
  },
  {
    category: "Basketball",
    title: "🏀 Milwaukee Bucks vs. Indiana Pacers",
    date: "2025-11-04",
    time: "8:00 AM",
    server1: "https://e22cd317d72ce9c3afea3614629c9397.livehwc4.com/nami.videobss.com/live/hd-en-2-3867088.m3u8?sub_m3u8=true&edge_slice=true&user_session_id=3d08c1751e216ee94ce5dd9970c6004b",
    server2: "https://streamcenter.pro/embed/ch66.php"
  },
  {
    category: "Basketball",
    title: "🏀 Utah Jazz vs. Boston Celtics",
    date: "2025-11-04",
    time: "8:30 AM",
    server1: "https://e22cd317d72ce9c3afea3614629c9397.livehwc4.com/nami.videobss.com/live/hd-en-2-3866309.m3u8?sub_m3u8=true&edge_slice=true&user_session_id=03325089ef75f28fe5660287c084eb7d",
    server2: "https://streamcenter.pro/embed/ch67.php"
  },
  {
    category: "Basketball",
    title: "🏀 Washington Wizards vs. New York Knicks",
    date: "2025-11-04",
    time: "8:30 AM",
    server1: "https://e22cd317d72ce9c3afea3614629c9397.livehwc4.com/nami.videobss.com/live/hd-en-2-3866202.m3u8?sub_m3u8=true&edge_slice=true&user_session_id=a9b5d0a509e5a708bcf8ed881b7707ed",
    server2: "https://streamcenter.pro/embed/ch68.php"
  },
  {
    category: "Basketball",
    title: "🏀 Dallas Mavericks vs. Houston Rockets",
    date: "2025-11-04",
    time: "9:00 AM",
    server1: "https://e22cd317d72ce9c3afea3614629c9397.livehwc4.com/nami.videobss.com/live/hd-en-2-3866524.m3u8?sub_m3u8=true&edge_slice=true&user_session_id=64c6ac7cdf98e5d4935f01141ad0b131",
    server2: "https://streamcenter.pro/embed/ch69.php"
  },
  {
    category: "Basketball",
    title: "🏀 Detroit Pistons vs. Memphis Grizzlies",
    date: "2025-11-04",
    time: "9:00 AM",
    server1: "https://e22cd317d72ce9c3afea3614629c9397.livehwc4.com/nami.videobss.com/live/hd-en-2-3866416.m3u8?sub_m3u8=true&edge_slice=true&user_session_id=3dad2604cb1b18e485698ed7d187da9d",
    server2: "https://streamcenter.pro/embed/ch70.php"
  },
  {
    category: "Basketball",
    title: "🏀 Sacramento Kings vs. Denver Nuggets",
    date: "2025-11-04",
    time: "10:00 AM",
    server1: "https://e22cd317d72ce9c3afea3614629c9397.livehwc4.com/nami.videobss.com/live/hd-en-2-3866740.m3u8?sub_m3u8=true&edge_slice=true&user_session_id=c8ab028b0089c2c5a49e4c2da7baefe2",
    server2: "https://streamcenter.pro/embed/ch71.php"
  },
  {
    category: "Basketball",
    title: "🏀 Los Angeles Lakers vs. Portland Trail Blazers",
    date: "2025-11-04",
    time: "11:00 AM",
    server1: "https://e22cd317d72ce9c3afea3614629c9397.livehwc4.com/nami.videobss.com/live/hd-en-2-3866631.m3u8?sub_m3u8=true&edge_slice=true&user_session_id=f0f236a8ce26ad46d72e97ac8492850f",
    server2: "https://streamcenter.pro/embed/ch72.php"
  },
      {
    category: "Basketball",
    title: "🏀 Miami Heat vs. LA Clippers",
    date: "2025-11-04",
    time: "11:030 AM",
    server1: "https://e22cd317d72ce9c3afea3614629c9397.livehwc4.com/nami.videobss.com/live/hd-en-2-3866961.m3u8?sub_m3u8=true&edge_slice=true&user_session_id=50b07527813aaedb7eb5830d437889ea",
    server2: "https://streamcenter.pro/embed/ch73.php"
  },
          {
    category: "Basketball",
    title: "🏀 PBA LIVE 🇵🇭",
    date: "2025-11-04",
    time: "11:030 AM",
    server1: "https://one1-o1u3.onrender.com/stream/pba/pba/master.m3u8",
    server2: ""
  },
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
      <small>📅 ${ch.date} - ${ch.time}</small>
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
    return new Date(`${date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00+08:00`);
  }

  function update() {
    const nowPH = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" }));
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
renderChannels(channels);
