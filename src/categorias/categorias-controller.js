import Categoria from "./categorias-model.js";

export const saveCategoria = async(req, res) => {
    try{
        const data = req.body;

        const categoria = new Categoria({
            nombre: data.nombre
        })

        await categoria.save();

        res.status(200).json({
            success: true,
            categoria
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            msg: "Error al crear la categoria"
        })

    }
}

export const getCategorias = async(req, res) => {
    try {
        const query = { state: true};
        const categorias = await Categoria.find()

        const total = await Categoria.countDocuments(query);

        return res.status(200).json({
            success: true,
            msg: "Categorias obtenidas con exito",
            total,
            categorias
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error al obtener las categorias"
        })   
    }

}

export const deleteCategorias = async(req, res) => {
    const { id } = req.params;
    try{
        await Categoria.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            msg: "Categoria eliminada con exito!"
        })
    }catch(error){
        res.status(500).json({
            success: false,
            msg: "Error al eliminar la categoria",
            error: error.message || error
        })
    }
}

export const updateCategoria = async(req, res) => {
    try {
        const { id } = req.params;
        const { _id, nombre, ...data} = req.body;

        const catego = await Categoria.findByIdAndUpdate(id, data, {new: true});

        catego.nombre = nombre;
        await catego.save(); 

        res.status(200).json({
            success: true,
            msg: "Categoria actualizada",
            catego
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar la categoria",
            error: error.message || error
        })
    }
}