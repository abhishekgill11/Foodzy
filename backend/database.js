const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const mongoURI = 'mongodb+srv://Food:H8i1m4..@cluster0.rypssog.mongodb.net/food?retryWrites=true&w=majority';

// var database = mongoURI.getDb("foodzy");
const connectToMongo =async() =>{
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err)
            console.log(err);
        else {
            console.log("connected!");
            // console.log(mongoose.connection);
            const fetched_data = await mongoose.connection.db.collection("food_menu");
            fetched_data.find({}).toArray(function (err, data) {
                if (err)
                    console.log(err);
                else
                    console.log("Done");
            });
        }
    });
} 
module.exports = connectToMongo;
