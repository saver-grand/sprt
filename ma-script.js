let hls, selectedURLs = {}, activeCategory = "all";

// ====================== CHANNEL LIST ============================
const channels = [
    {
    category: "Live TV",
    title: "📺 ABC East",
    date: "2025-11-03",
    time: "24/7",
    server1: "https://fl1.moveonjoy.com/ABC_EAST/index.m3u8",
    server2: "https://honotvph.42web.io/masports.php?channel=nba1"
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
    server2: "https://honotvph.42web.io/masports.php?channel=nba1"
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
      category: "WWE",
    title: "🤼 AEW: Saturday Night Collision",
    date: "2025-11-23",
    time: "8:00 AM",
    server1: "",
    server2: "https://watchlive.top/embed/aew/collision/25-11-22"
  },
  {    
    category: "F1",
    title: "🏎️ Las Vegas Grand Prix - Race",
    date: "2025-11-23",
    time: "11:00 AM",
    server1: "https://s.rocketdns.info:443/live/xmltv/02a162774b/2189.m3u8",
    server2: "https://watchlive.top/embed/f1/2025/las-vegas/race"
  },
    {
            category: "UFC/MMA",
    title: "UFC- Fight Night: Tsarukyan vs. Hooker",
    date: "2025-11-22",
    time: "11:00 PM",
    server1: "https://streams.honotvph.42web.io/stream/live/tntsports1/master.m3u8?u=honortv&p=b69f5a41f79712041caed2b676cb8c40148bce33eddb3472c786c97a557c0793",
    server2: "https://watchlive.top/embed/ufc-fight-night-tsarukyan-vs.-hooker"
          },
    {
            category: "UFC/MMA",
    title: "OKTAGON 80",
    date: "2025-11-23",
    time: "1:00 AM",
    server1: "https://streams.honotvph.42web.io/stream/live/tntsports1/master.m3u8?u=honortv&p=b69f5a41f79712041caed2b676cb8c40148bce33eddb3472c786c97a557c0793",
    server2: "https://watchlive.top/embed/oktagon-80-english"
                  },
    {
            category: "UFC/MMA",
    title: "UFC- Ring IV: Night Of Champions - Benavidez vs. Yarde",
    date: "2025-11-23",
    time: "3:00 AM",
    server1: "https://streams.honotvph.42web.io/stream/live/tntsports1/master.m3u8?u=honortv&p=b69f5a41f79712041caed2b676cb8c40148bce33eddb3472c786c97a557c0793",
    server2: "https://watchlive.top/embed/ring-iv-night-of-champions---benavidez-vs-yarde"
        },
{
    category: "Basketball",
    title: "🏀 🇵🇭PBA - Gilas Pilipinas vs. Guam",
    date: "2025-11-28",
    time: "8:00 AM",
    server1: "https://streams.honotvph.42web.io/stream/live/pba/master.m3u8?u=honortv&p=b69f5a41f79712041caed2b676cb8c40148bce33eddb3472c786c97a557c0793",
    server2: "https://masports.dpdns.org/app/nba1.html"
  },
{
    category: "Basketball",
    title: "🏀 NBA - Detroit Pistons vs. Indiana Pacers",
    date: "2025-11-24",
    time: "8:00 AM",
    server1: "https://play.streameast247.com/playlist/stream_nba1.m3u8",
    server2: "https://streamcenter.xyz/embed/ch65.php"
},
{
    category: "Basketball",
    title: "🏀 NBA - Cleveland Cavaliers vs. Toronto Raptors",
    date: "2025-11-24",
    time: "8:00 AM",
    server1: "https://play.streameast247.com/playlist/stream_nba2.m3u8",
    server2: "https://streamcenter.xyz/embed/ch66.php"
},
{
    category: "Basketball",
    title: "🏀 NBA - New York Knicks vs. Brooklyn Nets",
    date: "2025-11-24",
    time: "8:30 AM",
    server1: "https://play.streameast247.com/playlist/stream_nba3.m3u8",
    server2: "https://streamcenter.xyz/embed/ch67.php"
},
{
    category: "Basketball",
    title: "🏀 NBA - Dallas Mavericks vs. Miami Heat",
    date: "2025-11-24",
    time: "8:30 AM",
    server1: "https://play.streameast247.com/playlist/stream_nba4.m3u8",
    server2: "https://streamcenter.xyz/embed/ch68.php"
},
{
    category: "Basketball",
    title: "🏀 NBA - Denver Nuggets vs. Memphis Grizzlies",
    date: "2025-11-24",
    time: "9:00 AM",
    server1: "https://play.streameast247.com/playlist/stream_nba5.m3u8",
    server2: "https://streamcenter.xyz/embed/ch69.php"
},
{
    category: "Basketball",
    title: "🏀 NBA - Portland Trail Blazers vs. Milwaukee Bucks",
    date: "2025-11-24",
    time: "9:00 AM",
    server1: "https://play.streameast247.com/playlist/stream_nba6.m3u8",
    server2: "https://streamcenter.xyz/embed/ch70.php"
},
{
    category: "Basketball",
    title: "🏀 NBA - Chicago Bulls vs. New Orleans Pelicans",
    date: "2025-11-24",
    time: "9:00 AM",
    server1: "https://play.streameast247.com/playlist/stream_nba7.m3u8",
    server2: "https://streamcenter.xyz/embed/ch71.php"
},
{
    category: "Basketball",
    title: "🏀 NBA - Houston Rockets vs. Phoenix Suns",
    date: "2025-11-24",
    time: "10:30 AM",
    server1: "https://play.streameast247.com/playlist/stream_nba8.m3u8",
    server2: "https://streamcenter.xyz/embed/ch72.php"
},
{
    category: "Basketball",
    title: "🏀 NBA - Utah Jazz vs. Golden State Warriors",
    date: "2025-11-24",
    time: "11:00 AM",
    server1: "https://play.streameast247.com/playlist/stream_nba9.m3u8",
    server2: "https://streamcenter.xyz/embed/ch73.php"
},
{
    category: "Basketball",
    title: "🏀 NBA - Minnesota Timberwolves vs. Sacramento Kings",
    date: "2025-11-24",
    time: "11:00 AM",
    server1: "https://play.streameast247.com/playlist/stream_nba10.m3u8",
    server2: "https://streamcenter.xyz/embed/ch74.php"
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

  // =========== SPECIAL RULE ===========
  // LIVE TV uses HLS player
  // ALL OTHER CATEGORIES → USE EMBED IFRAME
  if (selectedURLs.category === "Live TV") {
    playChannel(selectedURLs.server1);  // keep using HLS video player
  } else {
    playIframe(selectedURLs.server1);   // use EMBED style for server1
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
renderChannels(channels);
