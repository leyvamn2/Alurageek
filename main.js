import { servicesProductos } from "./js/products-services.js";

const listaCard= document.querySelector("[data-product]");
const form=document.querySelector("[data-form]")

function createCard(id,Nombre, Precio, image){

   const card=document.createElement("div");
   card.classList.add("card");
   card.innerHTML=
   `<div class="imagen-container">
           <img src="${image}" alt="${Nombre}">
            <div class="informacion">
                <p class="car-titulo">"${Nombre}"</p>  
            </div>
            <div class="value">
                <p>$ ${Precio}</p> 
                <button class="delete-button"data-id="${id}">
                <img class="borrar" src="./assets/trash.svg" data-remove="true">
            </button>
            </div>
        </div>`
        ;
        const deleteButton = card.querySelector(".delete-button");
deleteButton.addEventListener("click", () => {
    servicesProductos.deleteProducto(id).then(() => {
        card.remove();
    }).catch((err) => console.log(err));
}); 

        listaCard.appendChild(card);
        return card;
}




const render= async()=>{
    try{
        const listProduc=await servicesProductos.productosList(); 
listProduc.forEach(productos => {
    listaCard.appendChild(createCard(
        productos.id,
        productos.Nombre,
        productos.Precio,
        productos.image
    ))
});
    }catch(error){
        console.log(error)
    }

};

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const name= document.querySelector("[data-name]").value;
    const price= document.querySelector("[data-price]").value;
    const image= document.querySelector("[data-image]").value;
    
    servicesProductos.createProductos(name,price,image).then((res)=>console.log(res)).catch((err)=>console.log(err))
})
render();