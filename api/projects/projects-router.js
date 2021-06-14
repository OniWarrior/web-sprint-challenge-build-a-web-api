/// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const {
    validateProjectId,
    validateProject    
      } = require('../middleware/middleware')


const projectsRouter = express.Router()


projectsRouter.get('/',(req,res,next)=>{
    Projects.get()
    .then(projects =>{
        res.status(200).json(projects)
    })
    .catch(next)
})

projectsRouter.get('/:id',validateProjectId,(req,res,next)=>{
    res.status(200).json(req.project)
})

projectsRouter.post('/',validateProject,(req,res,next)=>{
    Projects.insert({name: req.name , description: req.description})
    .then(project =>{
        res.status(201).json(project)
    })
    .catch(next)
})

projectsRouter.put('/:id',validateProjectId,validateProject,(req,res,next)=>{
    Projects.update(req.params.id,{name:req.name, description:req.description})
    .then(()=>{
        return Projects.get(req.params.id)
    })
    .then(project =>{
        res.json(project)
    })
    .catch(next)
})

projectsRouter.delete('/:id',validateProjectId,async(req,res,next)=>{
    try{
        await Projects.remove(req.params.id)
        res.json(req.project)

    }catch(error){
        next(error)
    }
})

projectsRouter.get('/:id/actions',validateProjectId,async (req,res,next)=>{
    try{
        const result = await Projects.getProjectActions(req.params.id)
        res.json(result)

    }catch(error){
        next(error)
    }
})


projectsRouter.use((err,req,res,next)=>{
    res.status(err.status || 500).json({
      customMessage:'Some error',
    message:err.message,
    stack:err.stack
    })
  })

  module.exports = projectsRouter