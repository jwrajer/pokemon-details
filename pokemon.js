const getPokeCollection = async() => {
  try {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const data = await response.json();
  renderPokeCollection(data.results);
  } catch (err) {
    console.log(err);
  }
}

const renderPokeCollection = (pokeArr) => {
  const pokeCollection = pokeArr.map(singlePokemon => {
    const pokeName = singlePokemon.name;
    const splitURL = singlePokemon.url.split(`/`);
    const pokeID = splitURL[6];
    return `<li><a href='' data-pokeDexNum='${pokeID}'>${pokeName}</a></li>`;
  }).join(``);
  const ul = document.querySelector(`ul`);
  ul.innerHTML = pokeCollection;
}

const selectPokemon = () => {
  const links = document.querySelectorAll(`a`);
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    link.addEventListener(`click`, async(event) => {
      event.preventDefault();
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${link.dataset.pokedexnum}`);
      const selection = await response.json();
      renderSelectPokemon(selection);
    })
  }
}

const renderSelectPokemon = (pokemon) => {
  const pokemonName = document.querySelector(`#pokemon-name`);
  const section = document.querySelector(`section`);
  pokemonName.innerHTML = `No. ${pokemon.id}<br>${capitilize(pokemon.name)}`;
  section.innerHTML = `<img src='${pokemon.sprites.front_default}'/>`;
  getStats(pokemon);
  totalStats(pokemon);
  getType(pokemon);
}

const capitilize = (pokemonName) => {
  const firstLetter = pokemonName.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = pokemonName.slice(1);
  return firstLetterCap + remainingLetters;
}

const getStats = (pokemon) => {
  const stats = pokemon.stats.map(stat => {
    return `<ul>${stat.stat.name}<li>${stat.base_stat}<li></ul>`
  }).join(``);
  const statsList = document.querySelector(`#stats`);
  statsList.innerHTML = stats;
}

const totalStats = (pokemon) => {
  let bst = 0;
  for (let i = 0; i < pokemon.stats.length; i++) {
    bst += pokemon.stats[i].base_stat;
  }
  const bstNumber = document.querySelector(`#bst-number`);
  const h2BST = document.querySelector(`#BST`);
  h2BST.innerText = `BST`;
  bstNumber.innerText = bst;
}

// Used a for loop here to break out of mapping everything, I don't feel as if this was the best choice at the moment

const getType = (pokemon) => {
  const types = pokemon.types;
  let typeText = ``;
  for (let i = 0; i < types.length; i++) {
    typeText += `${types[i].type.name} `;
  }
  const typingContainer = document.querySelector(`#typing`);
  typingContainer.innerHTML = typeText;
}

const init = async() => {
await getPokeCollection();
selectPokemon();
}

init();