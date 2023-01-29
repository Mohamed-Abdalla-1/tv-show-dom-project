//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  // const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  getAllEpisodes().forEach((element) => {
    let container = document.createElement("a");
    container.href = element.url
    container.target = "blank"
    container.className = "container"
    const rootElem = document.getElementById("root");
    rootElem.appendChild(container);
    let showTitle = document.createElement("h1");
    showTitle.innerText =
      `${element.name} - S${twoDigitsPlaces(element.season)}E${twoDigitsPlaces(element.number)}`;
    container.appendChild(showTitle);
    let showImage = document.createElement("img");
    showImage.src = element.image.medium;
    container.appendChild(showImage);
    let showSummary = document.createElement("p");
    showSummary.innerText = element.summary;
    container.appendChild(showSummary);
  });
}

function twoDigitsPlaces(num) {
  return num < 10 ? "0" + num : num
}

window.onload = setup;
