const mongoose = require('mongoose');

const grupoSchema = new mongoose.Schema({
    grupo: {type: String, require: true},
    descricao: { type: String, require: true },
    participantes: [{ type: String, require: true }]
})

const grupoModel = mongoose.model('grupo', grupoSchema);

module.exports = { grupoModel }