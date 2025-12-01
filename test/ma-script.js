// ======= Improved Countdown + Channel Render (replace your script) =======

let hls, selectedURLs = {}, activeCategory = "Basketball"; // DEFAULT CATEGORY
let renderedList = [];               // currently rendered channels (used by showServerSelect)
let countdownInterval = null;        // single interval for countdown updates

// ====================== CHANNEL LIST ============================
// (keep your channels array exactly as you had it)
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

// use your existing logos constant
const logos = "https://i.imgur.com/y7rtkDI.jpeg";

// ====================== RENDER CHANNELS ============================
function renderChannels(list) {
  renderedList = list.slice(); // clone so showServerSelect references it safely
  const container = document.getElementById("channelList");
  if (!container) return;
  if (list.length === 0) {
    container.innerHTML = "<p style='text-align:center;color:#f55;'>No matches found</p>";
    return;
  }

  // Build markup. Use index-based onclick to avoid JSON string issues.
  container.innerHTML = list.map((ch, i) => {
    // sanitize values used in attributes (simple replacement for quotes)
    const safeTitle = (ch.title || "").replace(/"/g, "&quot;");
    return `
      <div class="channel-box" tabindex="0" onclick="showServerSelect(${i})">
        <img src="${logos}" alt="logo">
        <h3>${safeTitle}</h3>
        <small>🏷️ ${ch.category || "N/A"}</small><br>
        <small>📅 ${ch.date || "—"} - ${ch.time || "—"}</small>
        <!-- store date/time raw in data attrs so the updater can read them -->
        <div id="timer-${i}" class="countdown" data-date="${ch.date || ""}"
             data-time="${ch.time || ""}" data-24="${(ch.time||"").toLowerCase().includes("24/7") ? "1" : "0"}">
             Loading...
        </div>
      </div>
    `;
  }).join("");

  // Start countdown loop only once (safe if already started)
  if (!countdownInterval) startCountdown();
  // Immediately run one update so timers show soon.
  updateCountdownOnce();
}

// ====================== TIME PARSING & HELPERS ============================
/**
 * Parse date + time string (expects date in YYYY-MM-DD and time like "8:00 AM" or "24/7").
 * Returns timestamp in ms (number) or null for special cases (e.g. 24/7).
 */
function parseTargetTimestamp(dateStr, timeStr) {
  if (!dateStr || !timeStr) return null;
  const timeLower = timeStr.trim().toLowerCase();
  if (timeLower.includes("24/7") || timeLower.includes("24/7") || timeLower.includes("24/7")) {
    return null; // special marker for 24/7
  }

  // Normalize time, handle missing minutes (e.g., "8 AM" -> "8:00 AM")
  let parts = timeStr.trim().split(" ");
  let timePart = parts[0];
  let period = parts[1] || "";
  if (!timePart.includes(":")) timePart = timePart + ":00";

  // Convert to 24-hour hours/minutes
  const [hhStr, mmStr] = timePart.split(":").map(s => s.trim());
  let hours = parseInt(hhStr, 10);
  const minutes = parseInt(mmStr || "0", 10);

  if (period) {
    const p = period.toUpperCase();
    if (p === "PM" && hours < 12) hours += 12;
    if (p === "AM" && hours === 12) hours = 0;
  }

  // Construct ISO string with Manila offset (+08:00) to ensure correct timezone
  // Expect dateStr already in YYYY-MM-DD format (as in your data). If not, fallback:
  const isoDate = `${dateStr}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00+08:00`;
  const dt = new Date(isoDate);
  if (isNaN(dt.getTime())) {
    // fallback: try Date.parse with manual components
    const fallback = new Date(dateStr);
    if (!isNaN(fallback.getTime())) {
      fallback.setHours(hours, minutes, 0, 0);
      return fallback.getTime();
    }
    return null;
  }
  return dt.getTime();
}

/** Get current time in Manila as ms since epoch */
function nowManilaMs() {
  // Create a date string using Intl with Asia/Manila then parse to Date to get correct local value
  const s = new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" });
  return new Date(s).getTime();
}

/** Format remaining ms into "Xh Ym Zs" */
function formatRemaining(ms) {
  if (ms <= 0) return "0s";
  const sTotal = Math.floor(ms / 1000);
  const h = Math.floor(sTotal / 3600);
  const m = Math.floor((sTotal % 3600) / 60);
  const s = sTotal % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

// ====================== COUNTDOWN LOOP ============================
function updateCountdownOnce() {
  const nowMs = nowManilaMs();
  document.querySelectorAll(".countdown").forEach(el => {
    const dateStr = el.dataset.date || "";
    const timeStr = el.dataset.time || "";
    const is24 = el.dataset['24'] === "1" || /24\/7/i.test(timeStr);
    // If explicitly 24/7 -> show that
    if (is24) {
      el.textContent = "🟢 24/7 • LIVE";
      el.style.color = "limegreen";
      return;
    }

    const targetMs = parseTargetTimestamp(dateStr, timeStr);
    if (!targetMs) {
      // Could not parse target (or missing), show placeholder
      el.textContent = "—";
      el.style.color = "#999";
      return;
    }

    const diff = targetMs - nowMs;

    if (diff <= 0 && diff > -1000 * 60 * 60 * 4) {
      // within 4 hours after start -> show LIVE NOW (tweakable)
      el.textContent = "🟢 LIVE NOW";
      el.style.color = "limegreen";
    } else if (diff <= -1000 * 60 * 60 * 4) {
      // long past -> ended
      el.textContent = "⚪️ ENDED";
      el.style.color = "#aaa";
    } else {
      // upcoming
      el.textContent = `⏳ Starts in ${formatRemaining(diff)}`;
      el.style.color = "#ffcc66";
    }
  });
}

function startCountdown() {
  // clear existing interval if any (safety)
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
  // run every 1s
  countdownInterval = setInterval(updateCountdownOnce, 1000);
  // run immediately once
  updateCountdownOnce();
}

// ====================== CATEGORY + SEARCH ============================
function filterChannels() {
  const search = (document.getElementById("searchBar")?.value || "").toLowerCase();
  const filtered = channels.filter(c =>
    (activeCategory === "all" || c.category === activeCategory) &&
    (c.title || "").toLowerCase().includes(search)
  );
  renderChannels(filtered);
}

// hook up UI (guarding for missing elements)
document.getElementById("searchBar
