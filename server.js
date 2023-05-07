// Importa o módulo express do pacote NPM e atribui à constante express
const express = require("express")

// Criamos uma instância da aplicação Express, que é atribuída à constante app. 
// É por meio desta instância que a aplicação Express é configurada e executada.
const app = express()

//Número da porta para onde os dados da requisição serão enviados
const port = 3333

function showServerPort (){
    console.log(`Server was created and running at ${port} port`)
}

// Método inicia o servidor na porta definida e chama a função showServerPort assim que servidor estiver rodando
app.listen(port, showServerPort)