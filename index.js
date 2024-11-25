const pokeContainer = document.getElementById("#container-pokemons");
const searchBar = document.getElementById("searchBar");
const pokemonCount = 250;

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

let allPokemons = [];

const handlePokemons = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    await fetchPokemons(i);
  }
};

const fetchPokemons = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
    (res) => res.json()
  );
  allPokemons.push(response);
  createPokemonCard(response);
  // console.log(response.id)
};

const createPokemonCard = (poke) => {
  const card = document.createElement("div");
  card.classList.add("pokemon");

  const name = poke.name;
  const id = poke.id;
  const type = poke.types[0].type.name;
  const color = colors[type];

  card.style.backgroundColor = color;

  const pokemonRender = `
  <div class="imgContainer">
  <img
    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png"
    alt="${name}"
  />
  </div>
  <div class="infoContainer">
    <span class="number">#${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
  </div>
  `;

  card.innerHTML = pokemonRender;
  pokeContainer.append(card);
};

const filterPokemons = (searchItem) => {
  pokeContainer.innerHTML = "";
  const filteredPokemons = allPokemons.filter((poke) => {
    const name = poke.name.toLowerCase();
    const type = poke.types[0].type.name.toLowerCase();
    return name.includes(searchItem) || type.includes(searchItem);
  });
  filteredPokemons.map(createPokemonCard);
};

searchBar.addEventListener("input", (e) => {
  const searchItem = e.target.value.toLowerCase();
  filterPokemons(searchItem);
});

handlePokemons();
