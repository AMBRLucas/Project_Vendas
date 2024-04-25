const { checkSchema } = require('express-validator')

module.exports = {
    singUp: checkSchema({
        
        name:{
            trim: true,
            isLength: {
                options: { min: 3}
            },
            errorMessage: {errorMessage: "Nome precisa ter pelo dois caracteres!"}
        },

        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "Email invalido"
        },

        password: {
            isLength: {
                options: {min: 6}
            },
            errorMessage: "Senha precisa ter no minimo quatro digitos"
        }, 

        state: {
            notEmpty: true,
            errorMessage: "Estado não preenchido"
        }

    }),

    singIn: checkSchema({

        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "Email invalido"
        },

        password: {
            isLength: {
                options: {min: 6}
            },
            errorMessage: "Senha precisa ter no minimo quatro digitos"
        } 

    }) 
}