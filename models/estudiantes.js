import mongoose from 'mongoose';

const schemaEstudiante = new mongoose.Schema({
        nombre : {
            type: String,
            required: true
        },
        edad : {
            type: String,
            required: true
        }
    })

const estudiantes = mongoose.model('estudiantes', schemaEstudiante)

export default estudiantes