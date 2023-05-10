const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    //Used as foregin key here from user database......
    user: {
        //syntax :
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
});


const note = mongoose.model('note', NotesSchema);
// user.createIndexes();
module.exports = note