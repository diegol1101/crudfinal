
/*
json server comandos

npm init -y
npm i json-server
"server": "json-server --watch db.json"
npm run server
*/ 


const URL = "http://localhost:3000"
const headers = new Headers ({'Content-Type': 'application/json'});

const formuruta = document.getElementById("formruta");
const tbodyrutas = document.getElementById("tbodyRutas");
const formactualizaruta = document.getElementById("formactualizaruta");
const formpunto = document.getElementById("formpunto");

/*formulario rutas*/
getrutas();
formuruta.addEventListener("submit",(e)=>{

    e.preventDefault();

    let data = Object.fromEntries(new FormData(e.target));
    console.log(data);

    postRutas(data)
})

/*formulario puntos*/
formpunto.addEventListener("submit",(e)=>{
    e.preventDefault();

    let data = Object.fromEntries(new FormData(e.target));
    console.log(data);
    postPuntos(data);
})

/*select puntos*/
function selectruta(rutas){

    let selectruta = document.querySelector("#selectrutas");
    selectruta.innerHTML = "";
    rutas.forEach((element) => {
        let option = document.createElement("option");
        console.log(element);
        option.setAttribute("value", `${element.id}`);
        option.innerHTML = `${element.NomRuta}`;
        selectruta.appendChild(option);
    });
}

/*select rutas*/ 
function conocerutas(rutas) {
    let categoryId = document.querySelector("#conopuntos");
    categoryId.innerHTML = "";
    rutas.forEach((element) => {
        let option = document.createElement("option");
        console.log(element);
        option.setAttribute("value", `${element.id}`);
        option.innerHTML = `${element.NomRuta}`;
        categoryId.appendChild(option);
    });
}

function renderizarutas(data){

    const tbodyRutas=document.getElementById("tbodyRutas");

    tbodyRutas.innerHTML = "";

    data.forEach((ruta)=>{

        let tr = document.createElement("tr");
        tr.setAttribute("id",`${ruta.id}`);
        tr.setAttribute("class","tr");
        tr.innerHTML = `
        <td>${ruta.id}</td>
        <td>${ruta.NomRuta}</td>
        <td>
            <input type="submit" data-accion="Eliminar" value="Eliminar" class="btn-guardar bg-danger border-0 rounded bg-secondary px-2">
            <input type="button" data-bs-toggle="modal" data-bs-target="#modalModificar"  data-accion="Actualizar" value="Actualizar" class="btn-guardar bg-warning border-0 rounded bg-secondary px-2">
        </td>
        `;

        tbodyRutas.appendChild(tr);
    })

}

tbodyrutas.addEventListener("click",(e)=>{
    e.preventDefault();

    let tr = e.target.closest("tr");
    let id = tr.id;

    let accion = e.target.dataset.accion;
    console.log(accion)

    if(accion==="Eliminar"){
        deleterutas(tr,id);
        tr.remove();
    } 
    else if(accion==="Actualizar"){

        formactualizaruta.addEventListener("submit",(e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            
            putrutas(data,id);
        })
    }
})


/*metodo post rutas*/

async function postRutas (data){

    let config ={
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }

    let rutas = await(await fetch(`${URL}/Rutas`,config)).json();


}

/*metodo post puntos*/
async function postPuntos (data){

    let config ={
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }

    let puntos = await(await fetch(`${URL}/Puntos`,config)).json();


}

/*metodo get rutas*/

async function getrutas(){
    let rutas = await(await fetch(`${URL}/Rutas`)).json();
    conocerutas(rutas)
    renderizarutas(rutas)
    selectruta(rutas)
}

/*metodo put rutas*/

async function putrutas(data,id){

    let config = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    };

    let put = await(await fetch(`${URL}/Rutas/${id}`,config)).json();
}


/*metodo eliminar rutas*/

async function deleterutas(tr,id){

    let data = Object.fromEntries(new FormData(tr.target));

    let config = {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(data)
    };

    let del = await(await fetch(`${URL}/Rutas/${id}`,config)).json();

}


/*puntos*/
async function filtro(identificacion) {
    let puntos = await (await fetch(`${URL}/Puntos?Rutaid=${identificacion}`)).json();
    return puntos
}
const select = document.getElementById("conopuntos");
select.addEventListener("change", async (e) => {
    e.preventDefault();

    let identificacion = e.target.value;

    let puntos = await filtro(identificacion);

    console.log(identificacion);

    let tbody = document.getElementById("renderpuntos")
    let str = ""
    puntos.forEach((element) => {
        str += `
        <div class="col-2" id="punto-${element.id}">
            <div class="card" style="width: 18rem;">
                <img src="${element.Imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.NomPuntos}</h5>
                    <button> editar</button>
                    <button> eliminar</button>
                </div>
            </div>
        </div>
        `
    })
    tbody.innerHTML = str 
});





