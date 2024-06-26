const Category = require('../models/Category');

module.exports = {
    getCategories: async (req, res) => {
        const cats = await Category.find();

        let categories = [];

        for(let i in cats){
            categories.push({
                ...cats[i]._doc,
                img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`
            })
        };

        res.json({categories});
    },

    addAction: async (req, res) => {
        let { title, price, priceneg, desc, cat, token} = req.body;

        const user = await User.findOne({token}).exec()

        if(!title || !cat){
            res.json({error: "titulo e/ou categoria não foram inseridos"})
            return;
        }

        if(price){
            
        }else{
            price = 0;
        }
    },

    getList: async (req, res) => {

    },

    getItem: async (req, res) => {

    },

    editAction: async (req, res) => {

    }
}