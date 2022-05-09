
const rolsValidation = (rol) => {

    if (rol != 'ADMIN_ROLE' || rol != 'USER_ROLE') {
        throw new Error(`${rol} is not a valid role`)
    }

}

export default rolsValidation