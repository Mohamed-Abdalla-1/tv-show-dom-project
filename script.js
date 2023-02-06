//You can edit ALL of the code here
function setup() {
  makePageForEpisodes();
}

async function makePageForEpisodes() {
  const request = await fetch("https://api.tvmaze.com/shows/82/episodes");
  const promise = await request.json();

  let shows = promise.map((show) => {
    let container = document.createElement("a");
    container.href = show.url;
    container.target = "blank";
    container.className = "container";

    const rootElem = document.getElementById("root");
    rootElem.appendChild(container);

    let SeasonEpisode = `S${twoDigitsPlaces(show.season)}E${twoDigitsPlaces(
      show.number
    )}`;

    let showTitle = document.createElement("h1");
    showTitle.innerText = `${show.name} - ${SeasonEpisode}`;
    container.appendChild(showTitle);
    container.id = SeasonEpisode;

    let showImage = document.createElement("img");
    showImage.src = show.image.medium;
    container.appendChild(showImage);
    let showSummary = document.createElement("p");
    showSummary.innerHTML = show.summary;
    container.appendChild(showSummary);

    return {
      name: show.name,
      summary: show.summary,
      element: container,
      showSeasonEpisode: SeasonEpisode,
    };
  });

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

  let selectInput = document.getElementById("episodes-selection");

  shows.forEach((show) => {
    let selectionOption = document.createElement("option");

    selectionOption.innerText = show.showSeasonEpisode + " - " + show.name;
    selectInput.appendChild(selectionOption);

    selectionOption.value = `#${show.showSeasonEpisode}`;

    // selectionOption.addEventListener("change" , () => {
    //           window.location.href=option.value
    // });
  });
}

function twoDigitsPlaces(num) {
  return num < 10 ? "0" + num : num;
}

window.onload = setup;
