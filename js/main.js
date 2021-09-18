let id = JSON.parse(sessionStorage.getItem('id'))
const button = document.getElementById('button')
const input = document.getElementById('input')
const flechaizq = document.getElementById('flecha-izq')
const flechader = document.getElementById('flecha-der')

// Por si el pokemon que busco no existe
const errorPokemon = () =>{
    Swal.fire({
        icon: 'error',
        title: "Not found :(",
        text: "We couldn't find that pokemon, try it again",
        footer: "Maybe pokemon's name is not well writen "
      })
}

// 2 Eventos para buscar el pokemon después de escribirlo
button.addEventListener('click', () =>{
    const pokename = input.value.trim().toLowerCase()
    fetchData(pokename)
    input.value = ""
})
input.addEventListener('keydown', () =>{
    let codigo = event.keyCode
    if (codigo == 13){
        const pokename = input.value.trim().toLowerCase()
        fetchData(pokename)
        input.value = ""
    }
})

// Pasar a Capitalize
const capitalize = text => {
    const txt = text.toLowerCase()
    return txt.charAt(0).toUpperCase() + txt.slice(1)
}
// Función para traer la información de la API
const fetchData = (id) =>{
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
            weight: dataPokemon.weight,
            id: dataPokemon.id
        }
        mostrarPokemon(pokemon)
    })
    .catch(err => errorPokemon())
}
// Mostrar el pokemon en la página
const mostrarPokemon = (id) => {
    const template = document.getElementById('template-card').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()
    const poke = document.getElementById('pokemon')

    poke.innerHTML = ""

    clone.getElementById('image').setAttribute("src", id.img)

    clone.getElementById('body-title').innerHTML = `${id.nombre}<span> ${id.hp}hp</span>`

    clone.getElementById('type').textContent = id.tipo

    clone.getElementById('ability').textContent = id.ability

    clone.getElementById('exp').textContent = id.exp

    clone.getElementById('height').textContent = id.height

    fragment.appendChild(clone)

    poke.appendChild(fragment)

    id = id.id
    sessionStorage.setItem('id', JSON.stringify(id))

}

// Al cargar el DOM
document.addEventListener('DOMContentLoaded', () =>{
    if (sessionStorage.getItem('id')){
        id = JSON.parse(sessionStorage.getItem('id'))
        fetchData(id)
    } else{
        fetchData(1)
    }    
})

// Funcionalidad de las flechas
flechaizq.addEventListener('click', () =>{
    id = JSON.parse(sessionStorage.getItem('id'))
    id -= 1
    fetchData(id)
    sessionStorage.setItem('id', JSON.stringify(id))
})
flechader.addEventListener('click', () =>{
    id = JSON.parse(sessionStorage.getItem('id'))
    id += 1
    fetchData(id)
    sessionStorage.setItem('id', JSON.stringify(id))
})

