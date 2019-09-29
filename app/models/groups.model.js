const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
    gname: String,
    status: String,
    extraInfo: {}
}, {
    timestamps: true
});


module.exports = mongoose.model('Groups', GroupSchema);