import Router from 'express';
import modelNotas from '../models/notas';
import modelEstudiantes from '../models/estudiantes';
import modelCursos from '../models/cursos';

const router = Router()


router.get('/asignarcursos', async (req, res) => { //muestra los estudiantes y los cursos que existen
    try {
        const all_Est = await modelEstudiantes.find({})
        const all_Courses = await modelCursos.find({})
        res.json({all_Est, all_Courses })
    } catch (e) {
       console.log(e);
    }
});

router.post('/asignarCursos/:id', async (req, res) => { //asigna el curso a un estudiante para poder evaluarlo
    try {
        const idCurso = req.body.idCurso        
        const idEstudiante = req.params.id
        //console.log('id_curso:'+idCurso, 'id_est: '+idEstudiante);
        const newAsig = new modelNotas({ idEstudiante :idEstudiante, idCurso :idCurso })    
        await newAsig.save()
    res.redirect('/api/notas')
    } catch (e) {
        console.log(e);        
    } 
});

router.get('/', async (req, res) => { //consulta los estudiantes para ver sus notas
    try {
        const all_Est = await modelNotas.find({})
        res.json({all_Est})
    } catch (e) {
       console.log(e);
    }
});

router.post('/:id', async (req, res) => { // VER Los cursos y notas del estudiante 
    try {

        const all_Notas = await modelNotas.find({ idEstudiante:req.params.id }) 

        const promises = all_Notas.map(async item => {//muestra 
            const curso = await modelCursos.find({_id: item.idCurso})
            console.log(curso);
            return curso[0]
        
        });

        const result = await Promise.all(promises)

       res.json(result)
    } catch (e) {
       console.log(e);
    }
});


router.put('/agg/:id', async (req, res) => { //consulta los estudiantes para ver sus notas
    try {
        const{nombreEvaluacion, calificacion} = req.body        
        const idEstudiante = req.params.id   
        const notaAdd = await modelNotas.findOneAndUpdate({idEstudiante}, {nombreEvaluacion, calificacion})        
        res.json(notaAdd)
    } catch (e) {
       console.log(e);
    }
});


router.post('/promedio/:id', async (req, res) => { // retorna el promedio de un curso
    try {
        const Courses = await modelNotas.find({idCurso:req.params.id }) //busca las todas notas de un curso

        const rep = await Courses.map((item) => { // filtra solo el estudiante y la nota para poder sacar el promedio 
            return {
                idEstudiante : item.idEstudiante,
                calificacion: parseInt(item.calificacion)
            }
        });
        const log =0
        const calificaciones = await rep.map((item) => {
                return item.calificacion
            }).reduce((previous, current) => {
                return previous + current   
            });
        const promedio = calificaciones/rep.length 
        console.log(promedio);

        res.json(rep)
    } catch (e) {
       console.log(e);
    }
});

export default router