// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')

const {
    validateActionId,
    validateAction    
      } = require('../middleware/middleware')


const router = express.Router()

router.get('/',(req,res,next)=>{
    Actions.get()
    .then(actions=>{
        res.status(200).json(actions)
    })
    .catch(next)
})

router.get('/:id',validateActionId,(req,res,next)=>{
    res.status(200).json(req.action)
})

router.post('/',validateAction,async(req,res,next)=>{
   try{
       const result = await Actions.insert({           
           description:req.description,
           notes:req.notes
       })
        
          res.status(201).json(result) 

    }catch(error){
        next(error)
    }
})

router.put('/:id',validateActionId,validateAction,(req,res,next)=>{
    Actions.update(req.params.id,{
        description:req.description,
        notes:req.notes
    })
    .then(()=>{
        return Actions.get(req.params.id)
    })
    .then(action =>{
        res.json(action)
    })
    .catch(next)
})

router.delete('/:id',validateActionId,async(req,res,next)=>{
    try{
        await Actions.remove(req.params.id)

    }catch(error){
        next(error)
    }
})

router.use((err,req,res,next)=>{
    res.status(err.status || 500).json({
      customMessage:'Some error',
    message:err.message,
    stack:err.stack
    })
  })

  module.exports = router