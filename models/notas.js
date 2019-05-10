import mongoose from 'mongoose';
   
    const schemaNotas = new mongoose.Schema({
        idEstudiante: {
            type: String,
            required: true
        },
        idCurso: {
            type: String,
            required: true
        },
        nombreEvaluacion: {
            type: String,
            default: "null"
        },
        calificacion: {
            type: String,
            default: "null"
        }
    })

const notas = mongoose.model('notas', schemaNotas)

export default notas
