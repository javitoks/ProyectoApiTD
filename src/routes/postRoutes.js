const { Router } = require('express');
const postsRouter = Router();

// Posts
postsRouter.get('/', (req, res) => {
    res.send('Estos son los posteos');
});

postsRouter.get('/:id', (req, res) => {
    res.send('Este es el detalle de un post');
});

postsRouter.post('/', (req, res) => {
    res.send('Estos son los posteos');
});

postsRouter.put('/:id', (req, res) => {
    res.send('Actualizo un posteo');
});

postsRouter.delete('/', (req, res) => {
    res.send('Elimino un posteo');
});



module.exports = postsRouter;