const express = require("express") //starting express
const router = express.Router() //configuring the first part of route
const cors = require('cors')

const connectDatabase = require('./DataBase')
connectDatabase()
const Project = require('./projectModel')


const app = express() //starting the app
app.use(express.json());
app.use(cors())

const port = 3333 //creating port


// GET
// Estou esperando a conexão. Quando ela acontecer quero buscar todos os projetos que estiverem na lista projects
async function showProjects(request, response) {
    try{
        const projectsFromDataBase = await Project.find()
        response.json(projectsFromDataBase)
    }catch(erro) {
        console.log(erro)
    }
}

//POST
async function createProject(request, response) {
    const newProject = new Project({
        title: request.body.title,
        description: request.body.description,
        image: request.body.image
    })
    try{
        //constante guarda info nova
        const projectCreated = await newProject.save()
        response.status(201).json(projectCreated)
    }   catch (erro) {
        console.log(erro)
    }
}

//PATCH
// se encontrar algum projeto que tenha o id exatamente igual ao id passado na request, me retorne esse projeto
async function updateProject(request, response){
    try{
        const  foundProject = await Project.findById(request.params.id)
        if (request.body.title) {
            foundProject.title = request.body.title
        }
        if (request.body.description) {
            foundProject.description = request.body.description
        }
        if (request.body.image) {
            foundProject.image = request.body.image
        }

        const projectUpdatedOnDataBase = await foundProject.save()
        response.json(projectUpdatedOnDataBase)

    } catch(erro) {
        console.log(erro)
    }
}

//DELETE
async function deleteProject(request, response){
    try{
        await Project.findByIdAndDelete(request.params.id)
        response.json({message: 'Projeto deletado com sucesso!'})
    } catch(erro) {
        console.log(erro)
    }
}

//PORT
function showServerPort (){
    console.log(`Server was created and running at ${port} port`)
}

//Routes Config
app.use(router.get('/projects', showProjects)) 
app.use(router.post('/projects', createProject))
app.use(router.patch('/projects/:id', updateProject))
app.use(router.delete('/projects/:id', deleteProject))
app.listen(port, showServerPort)
