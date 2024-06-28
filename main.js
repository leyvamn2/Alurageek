import checkAllFields from "./js/displayError.js";
import cleanInputs from "./js/cleanInputs.js";
import { servicesProductos } from "./js/products-services.js";

const listaCard = document.querySelector("[data-list]");
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
    servicesProductos.deleteProducto(id)
      .then(() => {
        card.remove();
      })
      .catch((err) => console.log(err));
  });

  listaCard.appendChild(card);
  return card;
}

const render = async () => {
  try {
    const itemList = await servicesProductos.productosList();
    itemList.forEach(item => {
      listaCard.appendChild(createCard(
        item.id,
        item.name,
        item.price,
        item.image_url
      ));
    });
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  // Verificar campos antes de enviar el formulario
  if (!checkAllFields()) {
    return; // Detener el envío si hay campos inválidos
  }

  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const image_url = document.querySelector("[data-url]").value;

  servicesProductos.createProductos(name, price, image_url)
    .then((res) => {
      console.log(res);
      render(); // Renderizar de nuevo para incluir el nuevo producto
      cleanInputs(); // Limpia los inputs después de agregar un producto exitosamente
    })
    .catch((err) => console.log(err));
});

render();

// Agrega el listener para limpiar los inputs cuando se haga clic en el botón "Limpiar"
document.querySelector('.button__clear').addEventListener('click', cleanInputs);
