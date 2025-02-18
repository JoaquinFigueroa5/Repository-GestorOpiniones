import Publication from "../publication/publication-model.js";
import User from "../users/user-model.js";

export const updateComent = async(req, res) => {
    try {
        const { id } = req.params;
        const { comentario } = req.body;
        const authenticatedUser = req.user.id;

        const publi = await Publication.findById(id);
        if (!publi) {
            return res.status(404).json({
                success: false,
                msg: "Publicación no encontrada"
            });
        }

        const newComment = {
            comentario,
            titular: authenticatedUser,
            createdAt: new Date()
        };

        publi.comentarios.push(newComment);


        await publi.save();


        const savedPubli = await Publication.findById(id).populate({
            path: "comentarios.titular",
            select: "name"
        });

        res.status(200).json({
            success: true,
            msg: "Comentario agregado",
            publi: savedPubli
        })
        
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al subir el comentario"
        })
    }
}