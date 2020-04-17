const {Router} = require('express')
const {Todos,Notes} = require('../writedb')
const { Op } = require("sequelize");
const route = Router()
route.get('/', async (req, res) => {
    const todos = await Todos.findAll()
    res.send(todos)
})
route.get('/:id',async(req,res) => {
    if(isNaN(Number(req.params.id))){
       return res.status(400).send({
           error:'todo id must be an integre',
       })
    }
    const todo = await Todos.findByPk(req.params.id)
    if(!todo){
        return res.status(404).send({
            error:'No todo found with id = ' +req.params.id,
        })
    }
    res.send(todo)
    })
    route.post('/',async (req,res) =>{
        if(typeof req.body.Title !== 'string'){
            return res.status(400).send({error: 'title name not provided'})
            
        }
        if(req.body.Status == 'true'){
            req.body.Status= true
        }
        else{
            req.body.Status = false
        }
        const newTodo = await Todos.create({
            Title: req.body.Title,
            Description:req.body.Description,
            DueDate:req.body.DueDate,
            Status:req.body.Status,
            Priority:req.body.Priority,
        })
        res.status(201).send({success:'New task added',data:newTodo})
        
    })
    route.put( '/:id', (req, res) =>
    
    Todos.update({
     DueDate:req.body.DueDate,
     Priority:req.body.Priority,
     Status:req.params.Status
    },
    {
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
  );
    
route.get('/:id/notes',async(req,res) => {
    if(isNaN(Number(req.params.id))){
        return res.status(400).send({
            error:'todo id must be an integre',
        })
     }
     const note = await Notes.findAll({
         where: {
             todoId:{
                 [Op.eq] : req.params.id  
             }
         }

     });
         
    if(!note){
        return res.status(404).send({
            error:'No todo found with id = ' +req.params.id,
        })
    }
    res.send(note)
})
    route.post('/:id/notes',async(req,res) =>{
        if(typeof req.body.summary !=='string'){
            return res.status(400).send({error:'summary not provided'})
        }
        const newnotes = await Notes.create({
            summary : req.body.summary,
            todoId : req.params.id,
        })
    })
module.exports = route