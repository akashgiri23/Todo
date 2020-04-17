const Sequelize = require('sequelize')
const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/test1.db'

})
const Todos = db.define('todo',{
   
    Title: {
        type:Sequelize.STRING(50)
        
    },
    Description:{
        type:Sequelize.STRING(100),
    },
    DueDate:{
        type:Sequelize.DATE
    },
    Status:{
        type:Sequelize.BOOLEAN
    },
    Priority:{
        type:Sequelize.STRING
    }
})
const Notes = db.define('notes',{
   
    summary: {
        type:Sequelize.STRING(100)


    },
   })
   Todos.hasMany(Notes,{constraints: true});
   Notes.belongsTo(Todos,{constraints: true});
   



   
db.sync()
    .then(() => {
        console.log("db works")

    })
    .catch((err) =>{
        console.error(err)
    })
module.exports = {
    db,Todos,Notes
}