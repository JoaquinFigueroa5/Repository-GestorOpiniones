import {Schema, model} from 'mongoose';

const ComentarioSchema = Schema({
    titular: {
        type: Schema.Types.ObjectId,
        ref: 'Publication'
    },
    comentario: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
})

export default model('Comentario', ComentarioSchema)