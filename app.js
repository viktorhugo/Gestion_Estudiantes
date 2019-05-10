import '@babel/polyfill';
import app from './server';
import {json} from 'express';
import indexRoutes from './routes/index.routes';
import estudiantesRoutes from './routes/estudiantes.routes';
import cursosRoutes from './routes/cursos.routes';
import notasRoutes from './routes/notas.routes';
import mongoose from 'mongoose';
import morgan from 'morgan';
import conf from './config/db-conf';


//---DB
mongoose.connect(`mongodb://${conf.mongo.host}/${conf.mongo.database}`,{ useNewUrlParser: true } )
    .then(() => console.log('Connected DB MONGO'))
    .catch(err => console.log(err))
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


//Middlewares
app.use(json())
app.use(morgan('dev'))


//ROUTES
app.use('/api', indexRoutes)
app.use('/api/estudiantes', estudiantesRoutes)
app.use('/api/cursos', cursosRoutes)
app.use('/api/notas', notasRoutes)

async function main() {
    await app.listen(app.get('port'))
    console.log('server Running on PORT', app.get('port'));    
}

main() 

