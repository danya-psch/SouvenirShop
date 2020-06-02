const mongoose = require("mongoose");

const souvenir_schema = new mongoose.Schema({
    name : { type: String },
    ava_url : { type: String },
    description : { type: String}
    
});

const Souvenir_model = mongoose.model('Souvenir', souvenir_schema);

class Souvenir {
    constructor (name, ava_url, description) {
        this.name = name;
        this.ava_url = ava_url;
        this.description = description;
    }

    static getById(id) {
        return Souvenir_model.findById(id);
    }

    static getAll() {
        return Souvenir_model.find().exec()//.sort({ created: -1});
    }

    static getMy(id) {
        return Souvenir_model.find({ creator : id}).exec();
    }

    static insert(souvenir) {
        return new Souvenir_model(souvenir).save();
    }

    static update(id, souvenir) {
        return Souvenir_model.findByIdAndUpdate(id, souvenir, {new: true}).exec();
    }

}

module.exports = Souvenir;