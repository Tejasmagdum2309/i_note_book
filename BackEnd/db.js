const mongoose = require('mongoose');

var mongoURI = "mongodb://127.0.0.1:27017/iNoteBook";

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(mongoURI);
        console.log("db is connected to nodejs.....");


    }
    catch(error){
        // console.log(error);
        process.exit()
    }
  
}

module.exports = connectToMongo;