import User from '../users/user-model.js';
import argon2 from "argon2";

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

export const createAdminuser = async() => {
    try {
        const adminExists = await User.findOne({ role: "ADMIN_ROLE" });

        if(!adminExists){
            const hashedPassword = await argon2.hash("admin1234");

            const adminUser = new User({
                name: "Admin",
                surname: "User",
                username: "admin",
                email: "admin@gmail.com",
                password: hashedPassword,
                phone: "11223344",
                role: "ADMIN_ROLE",
                state: true
            });
    
            await adminUser.save();
            console.log("Usuario creado con exito")
        } else {
            console.log("ADMIN ya existente")
        }

        
    } catch (error) {
        console.log("Error al crear el usuario");
    }

}

export const createCategoria = async() => {
    try {
        
    } catch (error) {
        console.log("Error al crear la categoria")
    }
}