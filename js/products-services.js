const productosList = () => {
    return fetch("http://localhost:3001/items")
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
  
  const createProductos = (name, price, image_url) => {
    return fetch("http://localhost:3001/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        image_url,
      }),
    }).then((res) => res.json()).catch((err) => console.log(err));
  }
  
  const deleteProducto = (id) => {
    return fetch(`http://localhost:3001/items/${id}`, {
      method: "DELETE",
    }).catch((err) => console.log(err));
  }; 
  
  export const servicesProductos = {
    productosList,
    createProductos,
    deleteProducto,
  };
  