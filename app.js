const express = require("express");
const os = require("os");
const app = express();
const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "atvclouding"
});

db.connect((err) => {
    if (err) {
        console.error("Sem conexão com o banco de dados:", err);
    } else {
        console.log("Conexão realizada no banco de dados!");
    }
});

app.get('/', (request, response) => {
    return response
        .status(200)
        .json({
            message: "Welcome!"
        });
});

//rodar de um banco de dados sql
//modelo apresentado na aula
app.get("/consulta-dados", (req, res) => {
    db.query("SELECT * FROM consultadados", (err, result) => {
        if (err)
            return res.status(500).json(err);
        else
            return res.status(200).json({ message: result });
    });

});













app.get('/liveness', (request, response) => {
    // const gid = process.getgid ? process.getgid() : null;
    // const uid = process.getuid ? process.getuid() : null;
    return response
        .status(200)
        .json({
            message: "Meu app está vivo!",
            path: process.cwd(),
            // gid: process.getegid(),
            // uid: process.geteuid(),
            // gid: gid,
            // uid: uid,
            date: new Date().getTime()
        });
});

app.get('/readiness', (request, response) => {
    //consumo de cache
    //utiliza banco de dados
    //consulta serviço em outros sites
    //aqui eu check se todos as consultas acima estão de pé
    return response
        .status(200)
        .json({
            message: "Meu app está pronto!",
            platform: os.platform(), //plataforma do sistema
            freemem: os.freemem(), //memória livre
            homedir: os.homedir(), //diretório padrão
            date: new Date().getTime()
        });
});

module.exports = app;