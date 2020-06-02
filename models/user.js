const mongoose = require("mongoose");
const config = require('../config');
const md5 = require('md5');
const Check = require('./check_auth');
const Souvenir = require("./souvenir");

mongoose.set('useFindAndModify', false);

const user_schema = new mongoose.Schema({
    name : { type: String, required: true },
    password : { type: String, required: true },
    favorite_souvenirs : [ { type: mongoose.Schema.Types.ObjectId, ref : "Souvenir" } ],
    role : { type: String },
    ava_url : {type: String}
});

const User_model = mongoose.model('User', user_schema);

class User {
    constructor (name, password, favorite_souvenirs, role, ava_url) {
        this.name = name;
        this.password = password;
        this.favorite_souvenirs = favorite_souvenirs;
        this.role = role;
        this.ava_url = ava_url;
    }

    static getById(id) {
        return User_model.findById(id).populate('favorite_souvenirs').exec();
    }

    static getAllAdmins() {
        User_model.find()
        .then(users => {
            return Promise.resolve(users.find(auth => auth.role === Check.Role.Admin));
        });
    }

    static getAll() {
        return User_model.find();
    }

    static insert(user) {
        user.password = md5(`${user.password}${config.salt}`);
        return new User_model(user).save();
    }
        
    static update(id, user) {
        //user.password = md5(`${user.password_}${config.salt}`);
        return User_model.findByIdAndUpdate(id, user, {new: true}).populate('favorite_souvenirs').exec();
    }
    static delete(id) {
        return User_model.deleteOne({ _id: id }).exec();
    }

    static findUser(name) {
        return User_model.find({name : name}).populate('favorite_souvenirs');
    }

    static authorization(name , password) {
        return User_model.find({ name: name }).populate('favorite_souvenirs').exec()
            .then(result => {     
                if (result.length > 1 || result.length <= 0) Promise.reject(new Error(`Error: incorrect login`));
                else {
                    const auth = result[0];
                    if (md5(`${password}${config.salt}`) === auth.password) return Promise.resolve(auth);
                    throw new Error(`Error: incorrect password`);
                }
            });

        // return User_model.find({ name_: name }).exec(result => {
        //     if (result.length > 1 || result.length <= 0) Promise.reject(new Error(`Error: incorrect login`));
        //     else {
        //         const auth = result[0];
        //         if (md5(`${password}${config.salt}`) === auth.password_) return Promise.resolve(auth);
        //         Promise.reject(new Error(`Error: incorrect login`));
        //     }
        // });
    }
}

module.exports = User;