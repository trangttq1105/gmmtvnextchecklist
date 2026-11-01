
const POSTER_URL =
  "https://x.com/GMMTV/status/1993291330819440690";

const SERIES_POST_URL =
  "https://x.com/IVSBDragon/status/1993292545854734599";

const SERIES_ACCOUNT_URL =
  "https://x.com/IVSBDragon";

// Replace this with the official YouTube pilot URL when available.
const YOUTUBE_PILOT_URL = "https://www.youtube.com/";

const HASHTAG = "#TheInvisibleDragon";

const STORAGE_KEY = "somsomChecklistProgress";

const replyText = "\n" + HASHTAG;


// =====================================
// MISSION GROUPS
// =====================================

const missionGroups = [
  {
    id: "general",
    title: "General",
    missions: [
      {
        id: "general-post",
        text: "Post about FirstKhaotung with keywords and hashtags"
      },
      {
        id: "general-engage",
        text: "Engage with other posts"
      }
    ]
  },

  {
    id: "gmmtv-posts",
    title: "FirstKhaotung Posts on @GMMTV",
    missions: [
      {
        id: "poster-repost",
        text: "Like and repost the new series poster",
        link: POSTER_URL
      },
      {
        id: "poster-reply",
        text: "Reply to the new series poster",
        link:
          "https://x.com/intent/tweet?in_reply_to=1993291330819440690&text=" +
          encodeURIComponent(replyText)
      },
      {
        id: "poster-quote",
        text: "Quote the new series poster",
        link:
          "https://x.com/intent/tweet?url=" +
          encodeURIComponent(POSTER_URL) +
          "&text=" +
          encodeURIComponent(replyText)
      },
      {
        id: "poster-share",
        text: "Copy the post link and share it",
        link: POSTER_URL
      }
    ]
  },

  {
    id: "series",
    title: "FirstKhaotung Series",
    missions: [
      {
        id: "series-gmmtv-repost",
        text: "Like and repost posters on @GMMTV",
        link: POSTER_URL
      },
      {
        id: "series-gmmtv-reply",
        text: "Reply to posters on @GMMTV with photo/video, keywords and hashtags",
        link:
          "https://x.com/intent/tweet?in_reply_to=1993291330819440690&text=" +
          encodeURIComponent(replyText)
      },
      {
        id: "series-gmmtv-quote",
        text: "Quote posters on @GMMTV with photo/video, keywords and hashtags",
        link:
          "https://x.com/intent/tweet?url=" +
          encodeURIComponent(POSTER_URL) +
          "&text=" +
          encodeURIComponent(replyText)
      },
      {
        id: "series-gmmtv-share",
        text: "Copy the post link and share it",
        link: POSTER_URL
      },
      {
        id: "follow-account",
        text: "Follow the series account: @IVSBDragon",
        link: SERIES_ACCOUNT_URL,
        linkText: "@IVSBDragon"
      },
      {
        id: "series-account-repost",
        text: "Like and repost posters on @IVSBDragon",
        link: SERIES_POST_URL
      },
      {
        id: "series-account-reply",
        text: "Reply to posters on @IVSBDragon with photo/video, keywords and hashtags",
        link:
          "https://x.com/intent/tweet?in_reply_to=1993292545854734599&text=" +
          encodeURIComponent(replyText)
      },
      {
        id: "series-account-quote",
        text: "Quote posters on @IVSBDragon with photo/video, keywords and hashtags",
        link:
          "https://x.com/intent/tweet?url=" +
          encodeURIComponent(SERIES_POST_URL) +
          "&text=" +
          encodeURIComponent(replyText)
      },
      {
        id: "series-account-share",
        text: "Copy the post link and share it",
        link: SERIES_POST_URL
      },
      {
        id: "youtube-share",
        text: "Watch the new series pilot on YouTube, like and share it",
        link: YOUTUBE_PILOT_URL
      },
      {
        id: "youtube-views",
        text: "Watch the new series pilot on YouTube at least 10 times",
        link: YOUTUBE_PILOT_URL
      }
    ]
  }
];


// =====================================
// HELPER FUNCTIONS
// =====================================

function getAllMissions() {
  return missionGroups.flatMap((group) => group.missions);
}

function getSavedProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (error) {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function createMissionLink(mission) {
  if (!mission.link) {
    return mission.text;
  }

  if (mission.linkText) {
    return mission.text.replace(
      mission.linkText,
      `<a href="${mission.link}" target="_blank" rel="noopener noreferrer">${mission.linkText}</a>`
    );
  }

  return `<a href="${mission.link}" target="_blank" rel="noopener noreferrer">${mission.text}</a>`;
}


// =====================================
// RENDER MISSION GROUPS
// =====================================

function renderMissions() {
  const container = document.getElementById("missionList");
  const savedProgress = getSavedProgress();

  container.innerHTML = missionGroups.map((group, index) => {
    const isFirstGroup = index === 0;

    const missionHTML = group.missions.map((mission) => {
      const checked = savedProgress[mission.id] ? "checked" : "";

      return `
        <div class="mission-item">
          <input
            class="mission-checkbox"
            type="checkbox"
            id="mission-${mission.id}"
            data-mission-id="${mission.id}"
            ${checked}
          >

          <div class="mission-label">
            ${createMissionLink(mission)}
          </div>
        </div>
      `;
    }).join("");

    return `
      <section class="mission-group ${isFirstGroup ? "is-open" : ""}">

        <button
          class="group-toggle"
          type="button"
          aria-expanded="${isFirstGroup}"
          aria-controls="group-content-${group.id}"
        >
<span class="group-title">
  <span class="group-name">
    <span class="group-number">
      ${String(index + 1).padStart(2, "0")}
    </span>
    ${group.title}
  </span>

  <span class="group-hint">Click to see full list</span>
</span>

<span class="group-icon" aria-hidden="true"></span>
        </button>

        <div
          class="group-content"
          id="group-content-${group.id}"
          ${isFirstGroup ? "" : "hidden"}
        >
          <div class="group-missions">
            ${missionHTML}
          </div>
        </div>

      </section>
    `;
  }).join("");
}


// =====================================
// OVERALL PROGRESS
// =====================================

function updateProgress() {
  const savedProgress = getSavedProgress();
  const missions = getAllMissions();

  const completed = missions.filter(
    (mission) => savedProgress[mission.id]
  ).length;

  const total = missions.length;
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  document.getElementById("progressText").textContent =
    `You've completed ${completed}/${total} missions!`;

  document.getElementById("progressBar").style.width =
    `${percentage}%`;

  const progressTrack = document.getElementById("progressTrack");

  progressTrack.setAttribute("aria-valuemax", total);
  progressTrack.setAttribute("aria-valuenow", completed);

  const congratulations =
    document.getElementById("congratulations");

  congratulations.hidden = completed !== total;
}


// =====================================
// EVENT HANDLERS
// =====================================

function handleMissionChange(event) {
  if (!event.target.matches(".mission-checkbox")) {
    return;
  }

  const progress = getSavedProgress();
  const missionId = event.target.dataset.missionId;

  progress[missionId] = event.target.checked;

  saveProgress(progress);
  updateProgress();
}

function handleGroupToggle(event) {
  const button = event.target.closest(".group-toggle");

  if (!button) {
    return;
  }

  const group = button.closest(".mission-group");
  const content = group.querySelector(".group-content");

  const isOpen = button.getAttribute("aria-expanded") === "true";

  button.setAttribute("aria-expanded", String(!isOpen));
  content.hidden = isOpen;

  group.classList.toggle("is-open", !isOpen);
}


// =====================================
// SHARE ACHIEVEMENT
// =====================================

function shareAchievement() {
  const progress = getSavedProgress();
  const missions = getAllMissions();

  const completed = missions.filter(
    (mission) => progress[mission.id]
  ).length;

  const total = missions.length;

  let postText =
    `I've completed ${completed}/${total} missions to support ` +
    `#FirstKhaotung and #TheInvisibleDragon at #GMMTVNEXT! ` +
    `Join me and let's support them together!\n\n` +
    `https://trangttq1105.github.io/somsomchecklist/`;

  if (completed === total) {
    postText =
      `I've completed all ${total}/${total} missions to support ` +
      `#FirstKhaotung and #TheInvisibleDragon at #GMMTVNEXT! ` +
      `Join the mission and invite your moots too!\n\n` +
      `https://trangttq1105.github.io/somsomchecklist/`;
  }

  const shareUrl =
    "https://x.com/intent/tweet?text=" +
    encodeURIComponent(postText);

  window.open(shareUrl, "_blank", "noopener,noreferrer");
}


// =====================================
// INITIALIZE
// =====================================

renderMissions();
updateProgress();

document.getElementById("missionList").addEventListener(
  "change",
  handleMissionChange
);

document.getElementById("missionList").addEventListener(
  "click",
  handleGroupToggle
);

document.getElementById("shareButton").addEventListener(
  "click",
  shareAchievement
);
