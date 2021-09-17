console.log("hola")

let id = 1

const capitalize = text => {
    const txt = text.toLowerCase()
    return txt.charAt(0).toUpperCase() + txt.slice(1)
}

const fetchData = () =>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then((dataPokemon) =>{
            const pokemon = {
                nombre: capitalize(dataPokemon.name),
                img: dataPokemon.sprites.other.dream_world.front_default,
                exp: dataPokemon.base_experience,
                hp: dataPokemon.stats[0].base_stat,
                tipo: capitalize(dataPokemon.types[0].type.name),
                ability: capitalize(dataPokemon.abilities[0].ability.name),
                height: dataPokemon.height,
                weight: dataPokemon.weight
            }
            mostrarPokemon(pokemon)
        })   
}

const mostrarPokemon = (id) => {
    const main = document.getElementById('main')
    const template = document.getElementById('template-card').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.getElementById('image').setAttribute("src", id.img)

    clone.getElementById('body-title').innerHTML = `${id.nombre}<span> ${id.hp}hp</span>`

    clone.getElementById('type').textContent = id.tipo

    clone.getElementById('ability').textContent = id.ability

    clone.getElementById('exp').textContent = id.exp

    clone.getElementById('height').textContent = id.height

    fragment.appendChild(clone)

    main.appendChild(fragment)
}

fetchData()