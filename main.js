import { servicesProductos } from "./js/products-services.js";

const listaCard = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard(id, name, price, image_url) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="imagen-container">
      <img src="${image_url}" alt="${name}">
      <div class="informacion">
        <p class="car-titulo">${name}</p>  
      </div>
      <div class="value">
        <p>$ ${price}</p> 
        <button class="delete-button" data-id="${id}">
          <img class="borrar" src="./assets/trash.svg" data-remove="true">
        </button>
      </div>
    </div>
  `;
  const deleteButton = card.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    servicesProductos.deleteProducto(id).then(() => {
      card.remove();
    }).catch((err) => console.log(err));
  });

  listaCard.appendChild(card);
  return card;
}

const render = async () => {
  try {
    const listProduc = await servicesProductos.productosList();
    listProduc.forEach(productos => {
      listaCard.appendChild(createCard(
        productos.id,
        productos.name,
        productos.price,
        productos.image_url
      ));
    });
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const image_url = document.querySelector("[data-image]").value;

  servicesProductos.createProductos(name, price, image_url)
    .then((res) => {
      console.log(res);
      // Podrías agregar la nueva tarjeta aquí también si lo deseas
      render(); // Renderizar de nuevo para incluir el nuevo producto
    })
    .catch((err) => console.log(err));
});

render();
