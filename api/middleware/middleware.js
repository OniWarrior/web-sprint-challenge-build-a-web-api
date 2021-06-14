const Actions = require('../actions/actions-model')
const Projects = require('../projects/projects-model')


const validateProjectId = async(req,res,next)=>{
    try{
        const project = await Projects.get(req.params.id)
        if(!project){
            next({status:404 ,message: 'Project not found'})
        }
        else{
            req.project=project
            next()
        }

    }catch(error){
        res.status(500).json("problem retrieving project")
    }
}

const validateProject=(req,res,next)=>{
    const {name,description}=req.body
    if(!name || !name.trim() && !description || !description.trim()){
        next({status:400 , message:'missing required name and description field'})
    }
    else{
        req.name=name.trim()
        req.description=description.trim()
        next()
    }
}

const validateActionId = async(req,res,next)=>{
    try{
        const action = await Actions.get(req.params.id)
        if(!action){
            next({status:404 ,message: 'Action not found'})
        }
        else{
            req.action=action
            next()
        }

    }catch(error){
        res.status(500).json("problem retrieving action")
    }
}

const validateAction=(req,res,next)=>{
    const {description,notes}=req.body
    if(!description || !description.trim() && !notes || !notes.trim()){
        next({status:400 , message:'missing required description and notes'})
    }
    else{
        req.description=description.trim()
        req.notes=notes.trim()
        next()
    }
}


module.exports={
    validateProjectId,
    validateProject,
    validateAction,
    validateActionId
}