import {Schema, model} from 'mongoose';

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true,
    versionkey: false
});

export default model('Categoria', CategoriaSchema);