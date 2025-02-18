import {Schema, model} from 'mongoose';

const PublicationSchema = Schema({
    titulo: {
        type: String,
        required: [true, "El titulo es obligatorio"]
    },
    categoria: {
        type: String,
        required: [true, "La categoria es obligatoria"]
    },
    texto: {
        type: String,
        required: [true, "El texto es obligatorio"]
    },
    comentarios: [{
        type: Schema.Types.ObjectId,
        
    }],
    state: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true,
    versionKey: false
});

export default model('Publication', PublicationSchema)