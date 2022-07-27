const { Router } = require('express');

const router = Router();

let productos = [];

router.get('/productos', (req, res) => {
    try {
    res.render('form');
    } catch (error) {
    res.status(500).send(error)
    }
})

router.get('/listaproductos', (req, res) => {
    try {
        res.render('productos', { productos });
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/productos', (req, res) => {
    try {
        const { name, price, picture } = req.body;
        productos.push({ name, price, picture });
        res.render('form');
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;