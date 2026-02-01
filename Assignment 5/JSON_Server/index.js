const db = require('./db');
const jsonServer = require('json-server');
const server = jsonServer.create();
const PORT = process.env.PORT || 3000;

const router = jsonServer.router(db());
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(router);
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});
