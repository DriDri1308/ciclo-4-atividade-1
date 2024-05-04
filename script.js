const characterList = document.getElementById("character-list");
const prevPageButton = document.getElementById("prev-page");
const nextPageButton = document.getElementById("next-page");
const pageInfo = document.getElementById("page-info");

let currentPage = 1;
let totalPages = 1;
const charactersPerPage = 4; // Limite de 16 personagens por página

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("A resposta da rede não foi bem-sucedida");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        handleError(error);
    }
};

const displayCharacters = async (page = 1) => {
    const apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;
    const data = await fetchData(apiUrl);
    const charactersToShow = data.results.slice(0, charactersPerPage); // Limita o número de personagens por página

    characterList.innerHTML = "";
    charactersToShow.forEach(character => {
        const characterCard = document.createElement("div");
        characterCard.classList.add("character-card");

        const characterImage = document.createElement("img");
        characterImage.src = character.image; // Adiciona a imagem do personagem
        characterImage.alt = character.name; // Define o texto alternativo da imagem
        characterCard.appendChild(characterImage);

        const characterName = document.createElement("h2");
        characterName.textContent = `Nome: ${character.name}`; // Alterado para português
        characterCard.appendChild(characterName);

        const characterStatus = document.createElement("p");
        characterStatus.textContent = `Status: ${character.status}`; // Alterado para português
        characterCard.appendChild(characterStatus);

        const characterSpecies = document.createElement("p");
        characterSpecies.textContent = `Espécie: ${character.species}`; // Alterado para português
        characterCard.appendChild(characterSpecies);

        characterList.appendChild(characterCard);
    });

    currentPage = page;
    totalPages = Math.ceil(data.info.count / charactersPerPage);
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
};

const handleError = error => {
    characterList.innerHTML = `<div class="character-card">Erro: ${error.message}</div>`; // Alterado para português
};

prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
        displayCharacters(currentPage - 1);
    }
});

nextPageButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
        displayCharacters(currentPage + 1);
    }
});

displayCharacters();