const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const { validationResult, matchedData } = require("express-validator");

const User = require('../models/User');
const State = require("../models/State");

module.exports = {
    singIn: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);

        const user = await User.findOne({email: data.email});

        if(!user){
            res.json({error: "Email e/ou Senha não encontrados"});
            return;
        }

        const match = bcrypt.compare(data.password, user.passwordHash);
        
        if(!match){
            res.json({error: "Email e/ou Senha não encontrados"});
            return;
        }

        const payload = (Date.now() + Math.random()).toString();

        const token = await bcrypt.hash(payload, 10);

        user.token = token;
        await user.save();

        res.json({token, email: data.email});
    },

    singUp: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);

        const user = await User.findOne({
            email: data.email
        })

        if(user){
            res.json({Error: {email: {msg: "Email já cadastrado"}}})
            return;
        }

        if(mongoose.Types.ObjectId.isValid(data.state)){
            const stateItem = await State.findById(data.state);
            if(!stateItem){
                res.json({Error: {state: {msg: "Estado Nao existe"}}})
                return;
            }
        }else{
            res.json({Error: {state: {msg: "Estado Invalido"}}});
            return;
        }

        const passwordHash = await bcrypt.hash(data.password, 10)

        const payload = (Date.now() + Math.random()).toString();

        const token = await bcrypt.hash(payload, 10);

        const newUser = new User({
            name: data.name,
            email: data.email,
            passwordHash,
            token,
            state: data.state
        });

        newUser.save();

        res.json({token});
    }

}