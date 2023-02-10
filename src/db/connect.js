import mongoose from 'mongoose';

export async function initDb() {
    return mongoose.connect('mongodb://mongodb:27017/database', { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })    
}
