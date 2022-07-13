const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

class Contenedor {
    constructor (file){
        this.file = file;
    }

    //Get all the objects
    async getAll(){
        try {
            const data = await fs.promises.readFile(this.file);
            const object = JSON.parse(data);
            //console.log(object);
            return object;
        } catch (err) {
            throw new Error(err);
        }
    }

    //Get one random object
    async getOne(){
        try {
            const data = await fs.promises.readFile(this.file);
            const object = JSON.parse(data);
            const random = Math.floor(Math.random() * object.length);
            return object[random];
        } catch (err) {
            throw new Error(err);
        }
    }
}

let contenedor = new Contenedor('./productos.txt');


const server = app.listen(port, () => {
    console.log(`Servidor http escuchando en el puerto ${port}`)
})
server.on("error", error => console.log(`Error en servidor: ${error}`))
app.get('/', (req, res) => {
    res.send('<h1 style="color:green;">Mi primer servidor express</h1><h2>Click <a href="/productos">aquí</a> para ver todos los productos</h2><h2>Click <a href="/productoRandom">aquí</a> para ver un producto random</h2>')
})
app.get('/productos', (req, res) => {
    contenedor.getAll().then(data => {
        res.send(`<h1 style="color:green;">Todos los productos</h1><div>${JSON.stringify(data)}</div><h2 style="color:green"></div>`);
    }).catch(err => {
        res.send(err);
    })
    
})
app.get('/productoRandom', (req, res) => {
    contenedor.getOne().then(data => {
        res.send(`<h1 style="color:green;">Producto random</h1><div>${JSON.stringify(data)}</div>`);
    }).catch(err => {
        res.send(err);
    })
})