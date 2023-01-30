//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  // const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  let shows = getAllEpisodes().map((show) => {
    let container = document.createElement("a");
    container.href = show.url;
    container.target = "blank";
    container.className = "container";
    const rootElem = document.getElementById("root");
    rootElem.appendChild(container);
    let showTitle = document.createElement("h1");
    showTitle.innerText = `${show.name} - S${twoDigitsPlaces(
      show.season
    )}E${twoDigitsPlaces(show.number)}`;
    container.appendChild(showTitle);
    let showImage = document.createElement("img");
    showImage.src = show.image.medium;
    container.appendChild(showImage);
    let showSummary = document.createElement("p");
    showSummary.innerText = show.summary;
    container.appendChild(showSummary);
    return { name: show.name, summary: show.summary, element: container };
  });

  let searchResult = document.getElementById("search");
  searchResult.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    shows.forEach((show) => {
      const isVisible =
        show.name.toLowerCase().includes(value) ||
        show.summary.toLowerCase().includes(value);
      show.element.classList.toggle("hide", !isVisible);
    });
    // document.getElementById("resultsCount").innerText = shows.filter((show)=>{
    //   !show.element.classList.contains("hide")
    // }).length

    console.log(
      shows.filter((show) => {
        show.element.classList.contains("hide");
      }).length
    );
  });
}

function twoDigitsPlaces(num) {
  return num < 10 ? "0" + num : num;
}

window.onload = setup;
