import {Schema, model} from 'mongoose';

const ComentarioSchema = Schema({
    titular: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true,
    versionKey: false
})

export default model('Comentario', ComentarioSchema)