// const meeseeksPopUp = document.getElementById("meeseeks-pop-up");
const meeseeksGif = document.getElementById("meeseeks-gif");
const searchButton = document.getElementById("search-button");

// function showMeeseeksPopUp() {
//   if (meeseeksPopUp) {
//     meeseeksPopUp.style.display = "block";
//   }
// }

// function hideMeeseeksPopUp() {
//   if (meeseeksPopUp) {
//     meeseeksPopUp.style.display = "none";
//   }
// }

function getEpisodes(episodeUrls, episodeList) {
  episodeList.innerHTML = ""; // Clear the list

  // Fetch each episode and add it to the list
  episodeUrls.forEach((url) => {
    fetch(url)
      .then((response) => response.json())
      .then((episode) => {
        const episodeItem = document.createElement("li");
        episodeItem.classList.add("episode-info"); // Add class for episode info
        episodeItem.textContent = `${episode.name} - ${episode.episode}`;
        episodeList.appendChild(episodeItem);
      })
      .catch((err) => {
        console.error("Error fetching episodes:", err);
      });
  });
}

function displayCharacterInfo(characters) {
  const characterInfoDiv = document.getElementById("character-info");
  characterInfoDiv.innerHTML = "";

  characters.forEach((character) => {
    const characterDiv = document.createElement("div");
    characterDiv.classList.add("character-info"); // Add class for character info
    characterDiv.innerHTML = `
      <h2>${character.name}</h2>
      <p>Species: ${character.species}</p>
      <p>Status: ${character.status}</p>
      <img src="${character.image}" alt="${character.name}">
      <h3>Episodes:</h3>
      <ul class="episode-info"></ul>
      <hr>
    `;
    characterInfoDiv.appendChild(characterDiv);

    // Select the episode list for the current character
    const episodeList = characterDiv.querySelector(".episode-info");

    // Fetch character's episodes and display them in the "episode-info" list
    getEpisodes(character.episode, episodeList);
  });
}

function fetchEpisodes(characterId) {
  const characterEpisodesElement = document.getElementById(`episodes-${characterId}`);

  fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
    .then((response) => response.json())
    .then((characterData) => {
      const episodeURLs = characterData.episode;
      const episodesPromises = episodeURLs.map((url) => fetch(url).then((response) => response.json()));
      Promise.all(episodesPromises)
        .then((episodes) => {
          episodes.forEach((episode) => {
            const episodeListItem = document.createElement("li");
            episodeListItem.textContent = `${episode.episode} - ${episode.name}`;
            characterEpisodesElement.appendChild(episodeListItem);
          });
        })
        .catch((err) => {
          console.error("Error fetching episodes:", err);
        });
    })
    .catch((err) => {
      console.error("Error fetching character data:", err);
    });
}




function searchCharacter() {
  const characterName = document.getElementById("character-name").value;
  if (characterName.trim() === "") {
    alert("Please enter a character name.");
    return;
  }
  meeseeksGif.style.display = "none"; // Hide the GIF initially
  setTimeout(() => {
    meeseeksGif.style.display = "block"; // Show the GIF after the delay
  }, 1000); // Set the delay in milliseconds (1000ms = 1 second)

  searchButton.disabled = true;

  

  // Fetch character data from the Rick and Morty API
  fetch(`https://rickandmortyapi.com/api/character/?name=${characterName}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      // Display the character information in the "character-info" div
      displayCharacterInfo(json.results);

      // After the character search is done, hide the Meeseeks pop-up and enable the search button
      meeseeksGif.style.display = "none";
      searchButton.disabled = false;
    })
    .catch((err) => {
      console.error(err);
      // If there's an error, hide the Meeseeks pop-up as well
      meeseeksGif.style.display = "none";
      searchButton.disabled = false;
    });
}

searchButton.addEventListener("click", function() {
  searchCharacter();
});

// Additional event listener to hide the Meeseeks GIF when the page is loaded
document.addEventListener("DOMContentLoaded", function() {
  meeseeksGif.style.display = "none";
});

