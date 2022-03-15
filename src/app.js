const pokeName = document.querySelector('.pokemon-name');
const pokeImg = document.querySelector('.pokemon-image');
const pokeImgContainer = document.querySelector('.pokemon-image-container');
const pokeId = document.querySelector('.pokemon-id');
const pokeTypes = document.querySelector('.pokemon-type');
const pokeStats = document.querySelector('.stats-list');

//Array of colors according to pokemon type
const typeColors = {
  electric: '#FFEA70',
  normal: '#B09398',
  fire: '#FF675C',
  water: '#0596C7',
  ice: '#AFEAFD',
  rock: '#999799',
  flying: '#7AE7C7',
  grass: '#4A9681',
  psychic: '#FFC6D9',
  ghost: '#561D25',
  bug: '#A2FAA3',
  fairy:'#01fbfb',
  poison: '#795663',
  ground: '#D2B074',
  dragon: '#DA627D',
  steel: '#1D8A99',
  fighting: '#2F2F2F',
  default: '#2A1A1F',
};

const searchPokemon = event => {
  event.preventDefault();
  const { value } = event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
      .then(data => data.json())
      .then(response => renderPokemonData(response))
}


const renderPokemonData = data => {
  const sprite =  data.sprites.front_default;
  const { stats, types } = data;
  console.log(data);
  //Shows the pokemon name
  pokeName.style.opacity = 1;
  pokeName.textContent = data.name;
  //Shows pokemon image
  pokeImg.setAttribute('src', sprite);
  //Shows pokemon ID
  pokeId.style.opacity = 1;
  pokeId.textContent = `Nº ${data.id}`;
  //Set pokemon background color according to type
  setColor(types);
  //Show pokemon types
  pokemonTypes(types);
  pokemonStats(stats);
}

const setColor = types =>{
  const color = typeColors[types[0].type.name];
  pokeImg.style.background = color;
}

const pokemonTypes = types => {
  pokeTypes.innerHTML = '';
  types.forEach(type => {
      const typeTextElement = document.createElement("div");
      typeTextElement.style.color = typeColors[type.type.name];
      typeTextElement.textContent = type.type.name;
      pokeTypes.style.opacity = 1;
      pokeTypes.appendChild(typeTextElement);
  });
}

const pokemonStats = stats => {
  pokeStats.innerHTML = '';
  stats.forEach(stat => {
    const statElement = document.createElement('div');
    const statName = document.createElement('div');
    const statValue = document.createElement('div');
    statName.textContent = (stat.stat.name + ': ');
    statValue.textContent = stat.base_stat;
    pokeStats.style.opacity = 1;
    statElement.style.display = 'flex';  
    statElement.style.justifyContent = 'space-between';
    statElement.appendChild(statName);
    statElement.appendChild(statValue);
    pokeStats.appendChild(statElement);    
  })
}