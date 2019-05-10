import Router from 'express';
import modelCursos from '../models/cursos';

const router = Router()

router.get('/', async (req, res) => {
    try {
        const all_Cursos = await modelCursos.find({})
        res.json(all_Cursos)
    } catch (e) {
       console.log(e);
    }
});

router.post('/', async (req, res) => {
    try {
        const {nombre} = req.body
        const nuevoCurso = new modelCursos({ nombre})    
        await nuevoCurso.save()
    res.redirect('/api/cursos')
    } catch (e) {
        console.log(e);        
    } 
});

router.put('/:id', async (req, res) => {
    try {
        const {nombre} = req.body 
        const {id} = req.params   
        await modelCursos.findByIdAndUpdate(id, {nombre})
        res.json(`Curso con id: ${id} has updated `)   
    } catch (e) {
        console.log(e);        
    }     
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params   
        await modelCursos.findByIdAndDelete(id)
        res.json(`Curso con id: ${id} has deleted `)   
    } catch (e) {
        console.log(e);        
    }     
});

export default router