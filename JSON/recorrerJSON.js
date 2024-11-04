
const URL = "data/personas.json"

/* funcion para consumir el JSON y mostrar los datos */
fetch (URL)
.then(respuesta=>{
    return respuesta.json()
})
.then (personasJSON=>{

/*2- seleccionamos el contenedor  donde queremos mostrar la informacion */
const contenedor = document.querySelector ("#contenedor")

/* 3- recorrer cada persona del JSON y creamos HTML para mostrar sus datos */
personasJSON.forEach (persona=>{
 /*    crear un div para mostrar cada persona */
const divPersona = document.createElement("div")
divPersona.classList.add("persona") // luego le damos estilo
/* creamos contenido para mostrar el nombre la edad y ciudad de cada persona */
divPersona.innerHTML = `
<p><strong>Nombre: </strong>${persona.nombre}</p>
<p><strong>Edad: </strong>${persona.edad}</p>
<p><strong>Ciudad: </strong>${persona.ciudad}</p>

`
/* añadimos el div de la persona al contenedor */
contenedor.appendChild(divPersona)
})

})

