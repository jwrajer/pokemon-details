// retrieve pokemon

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
  const h2 = document.querySelector(`h2`);
  const section = document.querySelector(`section`);
  h2.innerHTML = `No.${pokemon.id}<br>${capitilize(pokemon.name)}`;
  console.log(pokemon);
  section.innerHTML = `<img src='${pokemon.sprites.front_shiny}'/>`;
}

const capitilize = (pokemonName) => {
  const firstLetter = pokemonName.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = pokemonName.slice(1);
  return firstLetterCap + remainingLetters;
}

const init = async() => {
await getPokeCollection();
selectPokemon();
}

init();