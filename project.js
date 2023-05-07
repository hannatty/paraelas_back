const express = require("express")
const router = express.Router()

const app = express()
const port = 3333

function showProject(request, response) {
    response.json(
        {
        tile: 'Programaria',
        description: 'A Programaria é uma organização sem fins lucrativos que tem como missão promover a inclusão e a diversidade de gênero na área de tecnologia. A organização busca ampliar as oportunidades para mulheres por meio de ações educacionais, como cursos, workshops e mentorias, além de iniciativas de empoderamento, como grupos de apoio, palestras e eventos de networking.',
        image: 'https://www.programaria.org/wp-content/uploads/2015/08/logo-04.png',
        }                   
    )
}

function showServerPort (){
    console.log(`Server was created and running at ${port} port`)
}

app.use(router.get('/project', showProject))
app.listen(port, showServerPort)
