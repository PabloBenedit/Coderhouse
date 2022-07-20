const express = require("express");
const router = require('./src/routes/routes')


const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(express.static(__dirname +"/public"))

const server = app.listen(8080, () => console.log(`Server UP on port 8080`))
server.on('error', (err) => {
console.log(`El servidor tuvo un error: ${error}`)})
