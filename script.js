
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

const missions = [
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
    id: "follow-account",
    text: "Follow the series account: @IVSBDragon",
    link: SERIES_ACCOUNT_URL,
    linkText: "@IVSBDragon"
  },
  {
    id: "series-repost",
    text: "Like and repost the new series post on @IVSBDragon",
    link: SERIES_POST_URL
  },
  {
    id: "series-reply",
    text: "Reply to the new series post on @IVSBDragon",
    link:
      "https://x.com/intent/tweet?in_reply_to=1993292545854734599&text=" +
      encodeURIComponent(replyText)
  },
  {
    id: "series-quote",
    text: "Quote the new series post on @IVSBDragon",
    link:
      "https://x.com/intent/tweet?url=" +
      encodeURIComponent(SERIES_POST_URL) +
      "&text=" +
      encodeURIComponent(replyText)
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
  },
  {
    id: "hashtag-posts",
    text: "Publish at least 10 posts using #TheInvisibleDragon",
    link:
      "https://x.com/intent/tweet?text=" +
      encodeURIComponent(replyText)
  }
];

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
  if (mission.linkText) {
    return mission.text.replace(
      mission.linkText,
      `<a href="${mission.link}" target="_blank" rel="noopener noreferrer">${mission.linkText}</a>`
    );
  }

  return `<a href="${mission.link}" target="_blank" rel="noopener noreferrer">${mission.text}</a>`;
}

function renderMissions() {
  const container = document.getElementById("missionList");
  const savedProgress = getSavedProgress();

  container.innerHTML = missions.map((mission) => {
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
}

function updateProgress() {
  const savedProgress = getSavedProgress();

  const completed = missions.filter(
    (mission) => savedProgress[mission.id]
  ).length;

  const total = missions.length;
  const percentage = (completed / total) * 100;

  document.getElementById("progressText").textContent =
    `You've completed ${completed}/${total} missions!`;

  document.getElementById("progressBar").style.width =
    `${percentage}%`;

  document.getElementById("progressTrack").setAttribute(
    "aria-valuenow",
    completed
  );

  const congratulations =
    document.getElementById("congratulations");

  congratulations.hidden = completed !== total;

  const shareButton = document.getElementById("shareButton");

  shareButton.innerHTML =
    completed === total
      ? 'Share Your Achievement <span aria-hidden="true">↗</span>'
      : 'Share Your Achievement <span aria-hidden="true">↗</span>';
}

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

function shareAchievement() {
  const progress = getSavedProgress();

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

renderMissions();
updateProgress();

document.getElementById("missionList").addEventListener(
  "change",
  handleMissionChange
);

document.getElementById("shareButton").addEventListener(
  "click",
  shareAchievement
);

