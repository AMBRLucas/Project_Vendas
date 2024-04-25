const { checkSchema } = require('express-validator')

module.exports = {
    editAction: checkSchema({
        
        token: {
            notEmpty: true
        },

        name:{
            optional: true,
            trim: true,
            isLength: {
                options: { min: 3}
            },
            errorMessage: {errorMessage: "Nome precisa ter pelo dois caracteres!"}
        },

        email: {
            optional: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "Email invalido"
        },

        password: {
            optional: true,
            isLength: {
                options: {min: 6}
            },
            errorMessage: "Senha precisa ter no minimo quatro digitos"
        }, 

        state: {
            optional: true,
            notEmpty: true,
            errorMessage: "Estado não preenchido"
        }

    })
}