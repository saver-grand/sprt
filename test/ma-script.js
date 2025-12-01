// ======= Full Fixed & Optimized Countdown + Channel Render =======

let hls = null;
let selectedURLs = {};
let activeCategory = "Basketball"; // DEFAULT CATEGORY
let renderedList = [];            // currently rendered channels (used by showServerSelect)
let countdownInterval = null;     // single interval for countdown updates

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

// ====================== LOGO ============================
const logos = "https://i.imgur.com/y7rtkDI.jpeg";

// ====================== HELPERS ============================
/** Create a stable unique id for a channel element based on content */
function makeStableId(ch) {
  const raw = `${ch.title}|${ch.date}|${ch.time}`;
  try {
    return "timer-" + btoa(unescape(encodeURIComponent(raw))).replace(/=/g, "");
  } catch (e) {
    // fallback if btoa unavailable for some reason
    return "timer-" + raw.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_]/g, "");
  }
}

/** Parse date + time into ms (Manila tz). Returns null for 24/7 or parse failure */
function parseTargetTimestamp(dateStr, timeStr) {
  if (!dateStr || !timeStr) return null;
  if (/24\/7/i.test(timeStr)) return null; // treat specially

  // Normalize: ensure time like "8:00 AM" or "8 AM"
  const parts = timeStr.trim().split(/\s+/);
  let timePart = parts[0];
  let period = parts[1] || "";
  if (!timePart.includes(":")) timePart = timePart + ":00";

  const [hhStr, mmStr] = timePart.split(":").map(s => s.trim());
  let hours = parseInt(hhStr || "0", 10);
  const minutes = parseInt(mmStr || "0", 10);

  if (period) {
    const p = period.toUpperCase();
    if (p === "PM" && hours < 12) hours += 12;
    if (p === "AM" && hours === 12) hours = 0;
  }

  // Construct ISO string with Manila offset +08:00
  const iso = `${dateStr}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2,"0")}:00+08:00`;
  const dt = new Date(iso);
  if (isNaN(dt.getTime())) {
    // fallback: try Date(dateStr) and set hours
    const f = new Date(dateStr);
    if (!isNaN(f.getTime())) {
      f.setHours(hours, minutes, 0, 0);
      return f.getTime();
    }
    return null;
  }
  return dt.getTime();
}

/** Manila 'now' ms */
function nowManilaMs() {
  const s = new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" });
  return new Date(s).getTime();
}

/** Format remaining ms into "Xh Ym Zs" (compact) */
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

/** Only update element text/style if changed to avoid DOM thrash/blink */
function safeUpdate(el, text, color) {
  if (!el) return;
  if (el.textContent !== text) el.textContent = text;
  if (color && el.style.color !== color) el.style.color = color;
}

// ====================== RENDER CHANNELS ============================
function renderChannels(list) {
  renderedList = list.slice(); // clone so showServerSelect references it safely
  const container = document.getElementById("channelList");
  if (!container) return;
  if (list.length === 0) {
    container.innerHTML = "<p style='text-align:center;color:#f55;'>No matches found</p>";
    return;
  }

  container.innerHTML = list.map((ch, idx) => {
    const safeTitle = (ch.title || "").replace(/"/g, "&quot;");
    const id = makeStableId(ch);
    // include duration data if present; default basketball duration 3 hours
    const durHours = ch.durationHours ?? (ch.category === "Basketball" ? 3 : 0);
    return `
      <div class="channel-box" tabindex="0" onclick="showServerSelect(${idx})">
        <img src="${logos}" alt="logo">
        <h3>${safeTitle}</h3>
        <small>🏷️ ${ch.category || "N/A"}</small><br>
        <small>📅 ${ch.date || "—"} - ${ch.time || "—"}</small>
        <div id="${id}" class="countdown"
             data-date="${ch.date || ""}"
             data-time="${ch.time || ""}"
             data-duration="${durHours}">
             Loading...
        </div>
      </div>
    `;
  }).join("");

  // start (or restart) countdown loop
  startCountdown();
  // immediate update
  updateCountdownOnce();
}

// ====================== COUNTDOWN LOOP & LOGIC ============================
function updateCountdownOnce() {
  const nowMs = nowManilaMs();
  document.querySelectorAll(".countdown").forEach(el => {
    const dateStr = el.dataset.date || "";
    const timeStr = el.dataset.time || "";
    const durationHours = Number(el.dataset.duration || 0);
    const is247 = /24\/7/i.test(timeStr);

    if (is247) {
      // 24/7 channels always show LIVE badge
      safeUpdate(el, "🟢 24/7 • LIVE", "limegreen");
      el.dataset.state = "live";
      return;
    }

    const startMs = parseTargetTimestamp(dateStr, timeStr);
    if (!startMs) {
      safeUpdate(el, "—", "#999");
      return;
    }

    // compute end time: start + durationHours (default 0 means only instant)
    // For Basketball we expect durationHours=3 (set via render channels)
    const endMs = startMs + (durationHours * 3600000);

    const diffToStart = startMs - nowMs;
    const diffToEnd = endMs - nowMs;

    // If within live window (now >= start && now < end) => LIVE
    if (diffToStart <= 0 && diffToEnd > 0) {
      // lock live state so it doesn't revert accidentally
      if (el.dataset.state !== "live") {
        el.dataset.state = "live";
      }
      safeUpdate(el, "🟢 LIVE NOW", "limegreen");
      return;
    }

    // if past end => ENDED
    if (diffToEnd <= 0) {
      safeUpdate(el, "⚪️ ENDED", "#aaa");
      el.dataset.state = "ended";
      return;
    }

    // upcoming: show countdown to start (only update text if changed)
    const remaining = formatRemaining(diffToStart);
    safeUpdate(el, `⏳ Starts in ${remaining}`, "#ffcc66");
    el.dataset.state = "upcoming";
  });
}

function startCountdown() {
  // clear existing interval (prevents duplicates)
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
  // update once immediately
  updateCountdownOnce();
  // then run every 1s
  countdownInterval = setInterval(updateCountdownOnce, 1000);
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

// attach search input listener (guard if element missing)
document.getElementById("searchBar")?.addEventListener("input", filterChannels);

// category buttons (expected to have .category-btn and data-cat attributes)
document.querySelectorAll(".category-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.getAttribute("data-cat") || "all";
    filterChannels();
  });
});

// ====================== SERVER SELECTION ============================
function showServerSelect(renderedIndex) {
  const ch = renderedList[renderedIndex];
  if (!ch) return;
  selectedURLs = ch;
  // toggle server2 button state
  const server2Btn = document.getElementById("server2Btn");
  if (server2Btn) server2Btn.disabled = !ch.server2;
  const sel = document.getElementById("serverSelect");
  if (sel) sel.style.display = "flex";
}

// server buttons handlers (guard for missing elements)
document.getElementById("server1Btn")?.addEventListener("click", () => {
  const selDiv = document.getElementById("serverSelect");
  if (selDiv) selDiv.style.display = "none";
  if (!selectedURLs) return;
  if (selectedURLs.category === "Live TV") {
    playChannel(selectedURLs.server1);
  } else {
    playIframe(selectedURLs.server1);
  }
});

document.getElementById("server2Btn")?.addEventListener("click", () => {
  const selDiv = document.getElementById("serverSelect");
  if (selDiv) selDiv.style.display = "none";
  if (!selectedURLs?.server2) return;
  playIframe(selectedURLs.server2);
});

// ====================== PLAYER CONTROL ============================
function playChannel(url) {
  const c = document.getElementById("videoContainer");
  const v = document.getElementById("videoPlayer");
  const i = document.getElementById("iframePlayer");
  if (!c || !v || !i) return;

  c.style.display = "flex";
  i.style.display = "none";
  v.style.display = "block";
  const card = document.getElementById("channelCard");
  if (card) card.style.display = "none";

  // destroy previous Hls instance safely
  if (hls) {
    try { hls.destroy(); } catch (e) { /* ignore */ }
    hls = null;
  }

  if (window.Hls && Hls.isSupported()) {
    hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(v);
    hls.on(Hls.Events.MANIFEST_PARSED, () => v.play().catch(()=>{}));
  } else {
    // fallback to native src
    v.src = url;
    v.play?.().catch(()=>{});
  }
}

function playIframe(url) {
  const c = document.getElementById("videoContainer");
  const v = document.getElementById("videoPlayer");
  const i = document.getElementById("iframePlayer");
  if (!c || !v || !i) return;

  c.style.display = "flex";
  v.style.display = "none";
  i.style.display = "block";
  const card = document.getElementById("channelCard");
  if (card) card.style.display = "none";
  i.src = url || "";
}

function closeVideo() {
  const container = document.getElementById("videoContainer");
  const card = document.getElementById("channelCard");
  const v = document.getElementById("videoPlayer");
  const i = document.getElementById("iframePlayer");
  if (container) container.style.display = "none";
  if (card) card.style.display = "block";
  if (v) { v.pause?.(); v.src = ""; }
  if (i) i.src = "";
}

function toggleList() {
  const c = document.getElementById("channelCard");
  if (!c) return;
  c.style.display = c.style.display === "none" ? "block" : "none";
}

// ====================== INIT ============================
// initial render: only basketball by default (as you requested)
document.addEventListener("DOMContentLoaded", () => {
  // prepare rendered list by applying initial filter
  const initial = channels.filter(c => c.category === "Basketball");
  renderChannels(initial);

  // highlight button if present
  const btn = document.querySelector(`[data-cat="${activeCategory}"]`);
  if (btn) btn.classList.add("active");
});
