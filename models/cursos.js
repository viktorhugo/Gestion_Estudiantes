import mongoose from 'mongoose';

const schemaCursos = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
})

const cursos = mongoose.model('cursos', schemaCursos)

export default cursos