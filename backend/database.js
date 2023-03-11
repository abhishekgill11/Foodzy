const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoURI = 'mongodb+srv://Foody:H8i1m4%2E%40@cluster0.j4oy6pv.mongodb.net/foodzy?retryWrites=true&w=majority';

// var database = mongoURI.getDb("foodzy");
const connectToMongo =async() =>{
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err)
            console.log(err);
        else {
            console.log("connected!");
            const fetched_data = await mongoose.connection.database.collection("foodmenu");
            fetched_data.find({}).toArray(function (err, data) {
                if (err)
                    console.log(err);
                else
                    console.log(data);
            });
        }
    });
} 
module.exports = connectToMongo;
