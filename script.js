
const STORAGE_KEY = "somsomChecklistProgress";

const GMMTV_FK_POST =
  "https://x.com/GMMTV/status/2117539840992661646";

const GMMTV_YUZUMUMU_POST =
  "https://x.com/GMMTV/status/2117519980816384435";

const SEASON_GMMTV_POST =
  "https://x.com/GMMTV/status/2117556593642627315";

const SEASON_ACCOUNT =
  "https://x.com/SeasonRemember";

const SEASON_ACCOUNT_POST =
  "https://x.com/SeasonRemember/status/2117560439014138362";

const YOUTUBE_URL =
  "https://www.youtube.com/watch?v=PxzcfYOXCYU";

const GENERAL_POST_TEXT =
  "FIRSTKHAOTUNG NEXT CHAPTER\n\n" +
  "#GMMTVNEXT\n" +
  "#Firstkhaotung";

const SEASON_POST_TEXT =
  "FIRSTKHAOTUNG NEXT CHAPTER\n\n" +
  "#GMMTVNEXT\n" +
  "#ASeasonToRememberSeries\n" +
  "#Firstkhaotung";


// =====================================
// X POST / REPLY / QUOTE LINK HELPERS
// =====================================

function createPostLink(text) {
  return (
    "https://x.com/intent/tweet?text=" +
    encodeURIComponent(text)
  );
}

function createReplyLink(postUrl, text) {
  const postId = postUrl.split("/status/")[1];

  return (
    "https://x.com/intent/tweet?in_reply_to=" +
    postId +
    "&text=" +
    encodeURIComponent(text)
  );
}

function createQuoteLink(postUrl, text) {
  return (
    "https://x.com/intent/tweet?url=" +
    encodeURIComponent(postUrl) +
    "&text=" +
    encodeURIComponent(text)
  );
}


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
        text:
          "Post about FirstKhaotung (better with photo/video) " +
          "with keywords and hashtags",
        link: createPostLink(GENERAL_POST_TEXT)
      },

      {
        id: "general-engage",
        text:
          "Like / Repost / Quote / Reply other Somsoms' posts"
      }
    ]
  },


  {
    id: "gmmtv-fk-yuzumumu",
    title: "FirstKhaotung + YUZUMUMU post on @GMMTV",

    missions: [
      {
        id: "gmmtv-fk-repost",
        text:
          "Like and repost FirstKhaotung check-in post on @GMMTV",
        link: GMMTV_FK_POST
      },

      {
        id: "gmmtv-fk-reply",
        text:
          "Reply to the FirstKhaotung check-in post " +
          "(better with photo/video) with keywords and hashtags",
        link: createReplyLink(
          GMMTV_FK_POST,
          GENERAL_POST_TEXT
        )
      },

      {
        id: "gmmtv-fk-quote",
        text:
          "Quote the FirstKhaotung check-in post " +
          "(better with photo/video) with keywords and hashtags",
        link: createQuoteLink(
          GMMTV_FK_POST,
          GENERAL_POST_TEXT
        )
      },

      {
        id: "gmmtv-fk-share",
        text:
          "Copy the link of the FirstKhaotung post and share it",
        link: GMMTV_FK_POST
      },

      {
        id: "gmmtv-yuzumumu",
        text:
          "Like / Repost / Quote / Reply YUZUMUMU check-in post on @GMMTV",
        link: GMMTV_YUZUMUMU_POST
      }
    ]
  },


  {
    id: "a-season-to-remember",
    title: "ตรีวัชรกาล A SEASON TO REMEMBER",

    missions: [
      {
        id: "season-gmmtv-repost",
        text:
          "Like and repost posters on @GMMTV",
        link: SEASON_GMMTV_POST
      },

      {
        id: "season-gmmtv-reply",
        text:
          "Reply to posters on @GMMTV " +
          "(better with photo/video) with keywords and hashtags",
        link: createReplyLink(
          SEASON_GMMTV_POST,
          SEASON_POST_TEXT
        )
      },

      {
        id: "season-gmmtv-quote",
        text:
          "Quote posters on @GMMTV " +
          "(better with photo/video) with keywords and hashtags",
        link: createQuoteLink(
          SEASON_GMMTV_POST,
          SEASON_POST_TEXT
        )
      },

      {
        id: "season-gmmtv-share",
        text:
          "Copy the link of the @GMMTV post and share it",
        link: SEASON_GMMTV_POST
      },

      {
        id: "season-follow",
        text:
          "Follow the series account @SeasonRemember",
        link: SEASON_ACCOUNT,
        linkText: "@SeasonRemember"
      },

      {
        id: "season-account-repost",
        text:
          "Like and repost the series post on @SeasonRemember",
        link: SEASON_ACCOUNT_POST
      },

      {
        id: "season-account-reply",
        text:
          "Reply to the series post on @SeasonRemember " +
          "(better with photo/video) with keywords and hashtags",
        link: createReplyLink(
          SEASON_ACCOUNT_POST,
          SEASON_POST_TEXT
        )
      },

      {
        id: "season-account-quote",
        text:
          "Quote the series post on @SeasonRemember " +
          "(better with photo/video) with keywords and hashtags",
        link: createQuoteLink(
          SEASON_ACCOUNT_POST,
          SEASON_POST_TEXT
        )
      },

      {
        id: "season-account-share",
        text:
          "Copy the link of the @SeasonRemember post and share it",
        link: SEASON_ACCOUNT_POST
      },

      {
        id: "season-youtube-share",
        text:
          "Watch it on YouTube + like + share",
        link: YOUTUBE_URL
      },

      {
        id: "season-youtube-views",
        text:
          "Watch it on YouTube at least 10 times",
        link: YOUTUBE_URL
      }
    ]
  }
];


// =====================================
// GET ALL MISSIONS
// =====================================

function getAllMissions() {
  return missionGroups.flatMap(
    (group) => group.missions
  );
}


// =====================================
// SAVE / LOAD PROGRESS
// =====================================

function getSavedProgress() {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    ) || {};
  } catch (error) {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(progress)
  );
}


// =====================================
// CREATE MISSION LINK
// =====================================

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

  return (
    `<a href="${mission.link}" target="_blank" rel="noopener noreferrer">` +
    `${mission.text}</a>`
  );
}


// =====================================
// RENDER GROUPS
// =====================================

function renderMissions() {
  const container =
    document.getElementById("missionList");

  const savedProgress = getSavedProgress();

  container.innerHTML = missionGroups.map(
    (group, index) => {

      const isFirstGroup = index === 0;

      const missionHTML = group.missions.map(
        (mission) => {

          const checked =
            savedProgress[mission.id] ? "checked" : "";

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
        }
      ).join("");

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

              <span class="group-hint">
                Click to see full list
              </span>

            </span>

            <span
              class="group-icon"
              aria-hidden="true"
            ></span>

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
    }
  ).join("");
}


// =====================================
// UPDATE OVERALL PROGRESS
// =====================================

function updateProgress() {
  const savedProgress = getSavedProgress();
  const missions = getAllMissions();

  const completed = missions.filter(
    (mission) => savedProgress[mission.id]
  ).length;

  const total = missions.length;

  const percentage =
    total > 0 ? (completed / total) * 100 : 0;

  document.getElementById("progressText").textContent =
    `You've completed ${completed}/${total} missions!`;

  document.getElementById("progressBar").style.width =
    `${percentage}%`;

  const progressTrack =
    document.getElementById("progressTrack");

  progressTrack.setAttribute(
    "aria-valuemax",
    total
  );

  progressTrack.setAttribute(
    "aria-valuenow",
    completed
  );

  const congratulations =
    document.getElementById("congratulations");

  congratulations.hidden =
    completed !== total;
}


// =====================================
// CHECKBOX CHANGE
// =====================================

function handleMissionChange(event) {
  if (
    !event.target.matches(".mission-checkbox")
  ) {
    return;
  }

  const progress = getSavedProgress();

  const missionId =
    event.target.dataset.missionId;

  progress[missionId] =
    event.target.checked;

  saveProgress(progress);
  updateProgress();
}


// =====================================
// GROUP OPEN / CLOSE
// =====================================

function handleGroupToggle(event) {
  const button =
    event.target.closest(".group-toggle");

  if (!button) {
    return;
  }

  const group =
    button.closest(".mission-group");

  const content =
    group.querySelector(".group-content");

  const isOpen =
    button.getAttribute("aria-expanded") === "true";

  button.setAttribute(
    "aria-expanded",
    String(!isOpen)
  );

  content.hidden = isOpen;

  group.classList.toggle(
    "is-open",
    !isOpen
  );
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
    `#FirstKhaotung at #GMMTVNEXT! ` +
    `Join me and let's support them together!\n\n` +
    `https://trangttq1105.github.io/somsomchecklist/`;

  if (completed === total) {
    postText =
      `I've completed all ${total}/${total} missions to support ` +
      `#FirstKhaotung at #GMMTVNEXT! ` +
      `Join the mission and invite your moots too!\n\n` +
      `https://trangttq1105.github.io/somsomchecklist/`;
  }

  const shareUrl =
    "https://x.com/intent/tweet?text=" +
    encodeURIComponent(postText);

  window.open(
    shareUrl,
    "_blank",
    "noopener,noreferrer"
  );
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
