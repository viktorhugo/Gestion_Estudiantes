import mongoose from 'mongoose'
import conf from './db-conf';

export async function connect() {
    try {
        const db = await mongoose.connect(`mongodb://${conf.mongo.host}/${conf.mongo.database}`,{ useNewUrlParser: true } )
        return db    
    } catch (e) {
        console.log('Error Connected Whit MongoDB'+ e)
    }
    
}