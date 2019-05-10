import Router from 'express';
import modelEstudiante from '../models/estudiantes';

const router = Router()

router.get('/', async (req, res) => {
    try {
        const all_Est = await modelEstudiante.find({})
        res.json(all_Est)
    } catch (e) {
       console.log(e);
    }
});

router.post('/', async (req, res) => {
    try {
        const {nombre, edad} = req.body
        const newEstud = new modelEstudiante({ nombre, edad })    
        await newEstud.save()
    res.redirect('/api/estudiantes')
    } catch (e) {
        console.log(e);        
    } 
});

router.put('/:id', async (req, res) => {
    try {
        const {nombre, edad} = req.body 
        const {id} = req.params   
        await modelEstudiante.findByIdAndUpdate(id, {nombre, edad})
        res.json(`Estudiante con id: ${id} has updated `)   
    } catch (e) {
        console.log(e);        
    }     
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params   
        await modelEstudiante.findByIdAndDelete(id)
        res.json(`Estudiante con id: ${id} has deleted `)   
    } catch (e) {
        console.log(e);        
    }     
});


export default router