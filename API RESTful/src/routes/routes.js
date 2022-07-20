const express = require("express");
const { Router } = express;
const Controller = require("../controllers/producto.controller.js");
const router = Router();


router.get("/productos", (req, res) => {
    const productos = Controller.getAll()
        res.send(productos);
});

router.get("/productos/:id", (req, res) => {
    const { id } = req.params;
        res.send(Controller.find(parseInt(id)))
});

router.post('/productos', (req, res) => {
    res.send(Controller.create(req.body))
});
router.put('/productos/:id', (req, res) =>{
    const {id} = req.params;
    const body = req.body;
    res.send(Controller.update(id, body))
})

router.delete('/productos/:id', (req, res) =>{
    res.send(Controller.remove(req.params.id))
})

module.exports = router;