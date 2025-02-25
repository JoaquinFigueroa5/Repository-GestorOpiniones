import Publication from './publication-model.js';
import Categoria from '../categorias/categorias-model.js';

export const savePublication = async(req, res) => {
    try {
        console.log("Body recibido:", req.body);

        const data = req.body;
        const categoria = await Categoria.findOne({ categoria: data.categoria} );
        const titular = req.user.id;

        console.log("Categoría encontrada:", categoria);
        
        if(!categoria){
            return res.status(404).json({
                success: false,
                msg: "Property not found"
            })
        } 

        const publication = new Publication({
            ...data,
            categoria: categoria._id,
            titular: titular
        })

        await publication.save();

        const savedTitular = await Publication.findById(publication._id)
        .populate({
            path: "comentarios",
            select: "titular comentario -_id",
            populate: {
                path: "titular",
                select: "username -_id"
            }
        })
        .populate("categoria", "categoria -_id")
        .populate("titular", "username -_id")

        

        res.status(200).json({
            success: true,
            publication: savedTitular
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al subir la publicacion",
            error
        })
    }
}

export const getPublications = async(req, res) => {
    const { limit = 10, desde = 0 } = req.query;
    const query = { state: true };

    try {
        const publications = await Publication.find()
            .skip(Number(desde))
            .limit(Number(limit))
            .populate({
                path: "comentarios",
                select: "titular comentario -_id",
                populate: {
                    path: "titular",
                    select: "username -_id"
                }
            })
            .populate("categoria", "categoria -_id")
            .populate("titular", "username -_id");
            
        const total = await Publication.countDocuments(query);

        return res.status(200).json({
            success: true,
            msg: "Publicaciones obtenidas con exito",
            total,
            publications
        })
    } catch (error) {
        console.error("Error al obtener publicaciones:", error);
        return res.status(500).json({
            success: false,
            msg: "Error al obtener las publicaciones",
            error: error.message || error
        })
    }
}

export const eliminarPubli = async(req, res) => {
    try {
        const { id } = req.params;

        await Publication.findByIdAndUpdate(id, { state: false })
        
        const publi = await Publication.findById(id);
        if (!publi) {
            return res.status(404).json({
                success: false,
                msg: "Publicación no encontrada"
            });
        }

        res.status(200).json({
            success: true,
            msg: "Publicacion eliminada",
            publi
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al eliminar la publicacion"
        })
    }
}