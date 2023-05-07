const express = require("express")
const router = express.Router()

const app = express()
const port = 3333

const projects_list = [
    {
        title: 'Programaria',
        description: 'A Programaria é uma organização sem fins lucrativos que tem como missão promover a inclusão e a diversidade de gênero na área de tecnologia. A organização busca ampliar as oportunidades para mulheres por meio de ações educacionais, como cursos, workshops e mentorias, além de iniciativas de empoderamento, como grupos de apoio, palestras e eventos de networking.',
        image: 'https://www.programaria.org/wp-content/uploads/2015/08/logo-04.png'
    },
    {
        title: 'Quero Ser Dev',
        description: 'O podcast "Quero ser dev" é apresentado por Simara Conceição, engenheira de software, e tem como proposta oferecer dicas e insights para quem deseja ingressar na área de tecnologia e se tornar um desenvolvedor de software. O programa também aborda assuntos como a importância da diversidade e da inclusão na tecnologia, além de dar destaque para a trajetória de mulheres e pessoas negras na área de programação.',
        image: 'https://i.scdn.co/image/cf015b317e7adf6cb981220aa661d7863a3b074a',
    },
    {
        title: 'Girls Make Games',
        description: 'Girls Make Games é uma organização sem fins lucrativos que oferece programas de verão e workshops para meninas de 8 a 18 anos interessadas em aprender a criar jogos de vídeo games. A iniciativa foi fundada por  Laila Shabir em 2014 nos Estados Unidos e se expandiu para outros países, incluindo o Brasil. O objetivo é incentivar e apoiar a participação das meninas no mundo dos games e da tecnologia, bem como aumentar a diversidade e inclusão nessa área',
        image: 'https://images.squarespace-cdn.com/content/v1/5c88336eda50d31190b37459/1552497709564-GF8F0MNGWWB2MA4JUESU/GMG%2BLOGO%2BOFFICIAL%2B2019.jpg?format=1500w',
    },
    {
        title: 'Reprograma',
        description: 'A Reprograma é uma iniciativa de impacto social que foca em ensinar programação, de forma gratuita, para mulheres cis e trans que não têm recursos e/ou oportunidades para aprender a programar.',
        image: 'https://avatars.githubusercontent.com/u/27314899?s=200&v=4',
    },
    {
        title: 'TechInovationGirls',
        description: 'O TechInnovation Girls é uma iniciativa global, que capacita meninas de 10 a 18 anos em empreendedorismo e habilidades técnicas, desenvolvendo aplicativos móveis para resolver problemas sociais em suas comunidades, promovendo a diversidade e estimulando a inovação e criatividade. O programa incentiva as meninas a se tornarem líderes em STEM, capacitando-as a criar mudanças positivas em suas comunidades e no mundo.',
        image: 'https://static.wixstatic.com/media/254964_6019bb71bd9b460e86b7895b4c3b8164~mv2.png/v1/crop/x_150,y_96,w_1632,h_415/fill/w_451,h_101,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/TechnovationGirls-RGB-Brasil.png',
    },
    {
        title: 'B2Mamy',
        description: 'O B2Mamy é uma aceleradora de negócios que oferece mentoria e capacitação para mães empreendedoras. Fundada em 2016, a iniciativa busca promover a independência financeira e o empreendedorismo materno, por meio de programas de aceleração, eventos e uma rede de apoio. O objetivo é fomentar a inclusão social e econômica das mães no mercado de trabalho e na sociedade como um todo.',
        image: 'data:image/png;base64,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',
    },
    {
        title: 'Se Candidate Mulher!',
        description: 'A Se Candidate, Mulher! é uma startup de impacto social que busca resolver o problema da desigualdade de gênero dentro das organizações por meio da inserção de mulheres no mercado de trabalho. A iniciativa tem como objetivo emponderar as mulheres a se candidatarem às vagas que desejarem. Por outro lado, promove projetos e ações afirmativas em parceria com empresas para atrair e contratar mulheres.',
        image: 'https://secandidatemulher.com.br/v2/wp-content/uploads/2023/01/scm_logo-p1wewi9ca6x39gadlgv2wdup89h4ib7jo8mbmx762y.png',
    },
]

function showProjects(request, response) {
    response.json(projects_list)
}

function showServerPort (){
    console.log(`Server was created and running at ${port} port`)
}

app.use(router.get('/projects', showProjects))
app.listen(port, showServerPort)
