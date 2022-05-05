
const validarRoles = (rol) => {

    if (rol != 'ADMIN_ROLE' || rol != 'USER_ROLE') {
        throw new Error(`El ${rol} no es un rol valido`)
    }

}

export default validarRoles