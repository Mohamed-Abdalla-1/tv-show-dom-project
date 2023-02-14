//You can edit ALL of the code here

function setup() {
  makePageForShows(getAllShows());
}
/////////
function makePageForShows(data) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  const pageTitle = document.getElementById("current-display");
  pageTitle.innerText = "";
  pageTitle.innerText = "ALL SHOWS";

  let shows = data.map((show) => {
    let container = document.createElement("a");
    container.target = "blank";
    container.className = "container";
    rootElem.appendChild(container);
    let showTitle = document.createElement("h1");

    showTitle.innerText = show.name;
    container.appendChild(showTitle);
    container.id = show.id;

    let showImage = document.createElement("img");
    if (show.image) showImage.src = show.image.medium;
    showImage.alt = "";
    container.appendChild(showImage);

    let showSummary = document.createElement("p");
    showSummary.innerHTML = show.summary;
    container.appendChild(showSummary);

    let showInfo = document.createElement("div");
    container.appendChild(showInfo);
    let showRating = document.createElement("p");
    showRating.innerHTML = `Rated: ${show.rating.average}`;
    showInfo.appendChild(showRating);
    let showGenres = document.createElement("p");
    showGenres.innerHTML = `Genres: ${show.genres}`;
    showInfo.appendChild(showGenres);
    let showStatus = document.createElement("p");
    showStatus.innerHTML = `Status: ${show.status}`;
    showInfo.appendChild(showStatus);
    let showRuntime = document.createElement("p");
    showRuntime.innerHTML = `Runtime: ${show.runtime}`;
    showInfo.appendChild(showRuntime);

    let selectShow = document.getElementById("episodes-selection");
    selectShow.style.display = "none";
    return {
      name: show.name,
      summary: show.summary,
      element: container,
      showId: show.id,
      Genres: show.genres,
    };
  });

  /////////

  shows.forEach((show) => {
    show.element.addEventListener("click", async (e) => {
      const request = await fetch(
        `https://api.tvmaze.com/shows/${e.target.id}/episodes`
      );
      const respond = await request.json();

      makePageForEpisodes(respond);
      // console.log(e.target);
      window.location.href = "#H";
      document.getElementById("show-selection").value = e.target.id;
      pageTitle.innerText = "";
      pageTitle.innerText = `${show.name}`;
    });
  });
  /////////
  document.getElementById("resultTotal").innerText = 0;
  document.getElementById("resultTotal").innerText = data.length;
  document.getElementById("resultsCount").innerText = data.length;
  let searchResult = document.getElementById("search");
  searchResult.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    let numberOfResult = 0;
    shows.forEach((show) => {
      const isVisible =
        show.name.toLowerCase().includes(value) ||
        show.Genres.map((x) => x.toLowerCase()).includes(value) ||
        show.summary.toLowerCase().includes(value);
      show.element.classList.toggle("hide", !isVisible);
      if (isVisible) numberOfResult++;
    });
    document.getElementById("resultsCount").innerText = numberOfResult;
  });

  /////////
  // let selectInput = document.getElementById("episodes-selection");
  // selectInput.innerHTML = "";

  // shows.forEach((show) => {
  //   let selectionOption = document.createElement("option");

  //   selectionOption.innerText = show.name;

  //   selectInput.appendChild(selectionOption);

  //   selectionOption.value = `${show.showId}`;
  // });

  // selectInput.addEventListener("change", (e) => {
  //   window.location.href = "#" + e.target.value;
  // });
  /////////////
  let selectShow = document.getElementById("show-selection");

  shows.forEach((show) => {
    let showOption = document.createElement("option");

    showOption.innerText = show.name;
    selectShow.appendChild(showOption);

    showOption.value = `${show.showId}`;
  });
  // /////////
  selectShow.addEventListener("change", async (e) => {
    window.location.href = "#" + e.target.value;
  });
}
/////////
function makePageForEpisodes(data) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  let shows = data.map((show) => {
    let container = document.createElement("a");
    container.href = show.url;
    container.target = "blank";
    container.className = "container";
    rootElem.appendChild(container);
    let showTitle = document.createElement("h1");

    let SeasonEpisode = `S${twoDigitsPlaces(show.season)}E${twoDigitsPlaces(
      show.number
    )}`;
    showTitle.innerText = `${show.name} - ${SeasonEpisode}`;

    container.appendChild(showTitle);
    container.id = SeasonEpisode;

    let showImage = document.createElement("img");
    if (show.image) showImage.src = show.image.medium;
    showImage.alt = "";
    container.appendChild(showImage);
    let showSummary = document.createElement("p");
    showSummary.innerHTML = show.summary;
    container.appendChild(showSummary);

    let selectShow = document.getElementById("episodes-selection");
    selectShow.style.display = "block";
    selectShow.toggle;

    return {
      name: show.name,
      summary: show.summary,
      element: container,
      showSeasonEpisode: SeasonEpisode,
    };
  });

  /////////
  document.getElementById("resultTotal").innerText = 0;
  document.getElementById("resultTotal").innerText = data.length;
  document.getElementById("resultsCount").innerText = data.length;
  let searchResult = document.getElementById("search");
  searchResult.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    let numberOfResult = 0;
    shows.forEach((show) => {
      const isVisible =
        show.name.toLowerCase().includes(value) ||
        show.summary.toLowerCase().includes(value);
      show.element.classList.toggle("hide", !isVisible);
      if (isVisible) numberOfResult++;
    });
    document.getElementById("resultsCount").innerText = numberOfResult;
  });
  /////////
  let selectInput = document.getElementById("episodes-selection");
  selectInput.innerHTML =
    '<option value="" selected >Select Season & Episode...</option>';

  shows.forEach((show) => {
    let selectionOption = document.createElement("option");

    selectionOption.innerText = show.showSeasonEpisode + " - " + show.name;

    selectInput.appendChild(selectionOption);

    selectionOption.value = `${show.showSeasonEpisode}`;
  });

  selectInput.addEventListener("change", (e) => {
    window.location.href = "#" + e.target.value;
  });

  ///////////
  let selectShow = document.getElementById("show-selection");

  shows.forEach((show) => {
    let showOption = document.createElement("option");

    showOption.innerText = show.name;
    selectShow.appendChild(showOption);

    showOption.value = `${show.id}`;
    // showOption.id = `${show.name}`;
  });
  // /////////
  selectShow.addEventListener("change", async (e) => {
    let showId = e.target.value;

    if (showId === "shows-list") {
      makePageForShows(getAllShows());
    } else {
      const showsRequest = await fetch(
        `https://api.tvmaze.com/shows/${showId}/episodes`
      );
      const showRespond = await showsRequest.json();

      makePageForEpisodes(showRespond);
      const pageTitle = document.getElementById("current-display");
      pageTitle.innerText = "";
      pageTitle.innerText = `${e.target.selectedOptions[0].text}`;
    }
  });
}
/////////
// let selectShow = document.getElementById("show-selection");
// let tvShows = getAllShows();

// tvShows.forEach((show) => {
//   let showOption = document.createElement("option");

//   showOption.innerText = show.name;
//   selectShow.appendChild(showOption);

//   showOption.value = `${show.id}`;
// });
// // /////////
// selectShow.addEventListener("change", async (e) => {
//   let showId = e.target.value.toString();
//   if (showId === "shows-list") {
//     makePageForShows(getAllShows());
//   } else {
//     const showsRequest = await fetch(
//       `https://api.tvmaze.com/shows/${showId}/episodes`
//     );
//     const showRespond = await showsRequest.json();
//     makePageForEpisodes(showRespond);
//   }
// });
/////////
function twoDigitsPlaces(num) {
  return num < 10 ? "0" + num : num;
}

window.onload = setup;
