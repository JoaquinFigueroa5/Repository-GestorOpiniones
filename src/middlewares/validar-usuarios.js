import User from '../users/user-model.js'

export const onlyOneStudent = async(req, res, next) => {
    const { id } = req.params;
    const authenticatedUser = req.user.id;

    try {
        if(authenticatedUser !== id){
            return res.status(403).json({
                success: false,
                msg: "Solo puede editar su perfil"
            })
        }
    
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al modificar el usuario"
        })
    }
}

export const beforePassword = async(req, res, next) => {
    const { id } = req.params;
    const authenticatedUser = req.user.password;

    try {
        if(authenticatedUser !== id){
            return res.status(403).json({
                success: false,
                msg: "Tiene que ingresar tu antigua contraseña"
            })
        }
    } catch (error) {
        
    }
}