const mongoose = require('mongoose')
require('dotenv').config()

async function connectDatabase(){
    try {
        console.log('The connection with database has been initialized.')

        await mongoose.connect(process.env.MONGO_URL)
    }
    catch(erro) {
        console.log(erro)
    }
}

module.exports = connectDatabase