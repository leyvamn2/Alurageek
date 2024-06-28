const productosList=()=>{
    return fetch("http://localhost:3001/items")
    .then((res)=>res.json())
    .catch((err)=>console.log(err));
};

const createProductos=( Nombre,Precio,image)=>{
    return fetch("http://localhost:3001/items",{
method:"POST",
headers:{
    "Content-Type":"application/json",
},
body:JSON.stringify({

Nombre,
Precio,
image,

})
    }).then((res)=>res.json()).catch((err)=>console.log(err));
}

const deleteProducto = (id) => {
    return fetch(`http://localhost:3001/items/${id}`, {
        method: "DELETE",
    }).catch((err) => console.log(err));
}; 
    

export const servicesProductos={
    productosList,
    createProductos,
    deleteProducto,
};