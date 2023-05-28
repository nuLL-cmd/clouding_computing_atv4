const http = require("http");
const app = require("./app");

const port = 3000;

const server = http.createServer(app);
server.listen(port, () =>{
    console.log("Server on port " + port);
});


// const db = mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     password: "root",
//     database: "docker"
// });