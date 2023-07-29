const meeseeksPopUp = document.getElementById("meeseeks-pop-up");

function showMeeseeksPopUp() {
  if (meeseeksPopUp) {
    meeseeksPopUp.style.display = "block";
  }
}

function hideMeeseeksPopUp() {
  if (meeseeksPopUp) {
    meeseeksPopUp.style.display = "none";
  }
}

function displayCharacterInfo(characters) {
  const characterInfoDiv = document.getElementById("character-info");
  characterInfoDiv.innerHTML = "";

  characters.forEach((character) => {
    const characterDiv = document.createElement("div");
    characterDiv.innerHTML = `
      <h2>${character.name}</h2>
      <p>Species: ${character.species}</p>
      <p>Status: ${character.status}</p>
      <img src="${character.image}" alt="${character.name}">
      <hr>
    `;
    characterInfoDiv.appendChild(characterDiv);
  });
}

function searchCharacter() {
  const characterName = document.getElementById("character-name").value;
  if (characterName.trim() === "") {
    alert("Please enter a character name.");
    return;
  }

  // Show the Meeseeks pop-up while searching
  showMeeseeksPopUp();

  // Fetch character data from the Rick and Morty API
  fetch(`https://rickandmortyapi.com/api/character/?name=${characterName}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      // Display the character information in the "character-info" div
      displayCharacterInfo(json.results);

      // After the character search is done, hide the Meeseeks pop-up
      hideMeeseeksPopUp();
    })
    .catch((err) => {
      console.error(err);
      // If there's an error, hide the Meeseeks pop-up as well
      hideMeeseeksPopUp();
    });
}

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", function() {
  searchCharacter();
  searchButton.classList.add("clicked");
  setTimeout(() => {
    searchButton.classList.remove("clicked");
  }, 5000); // 5000 milliseconds (5 seconds)
});

