const mongoose = require('mongoose');
require("dotenv").config();
const MongoDBErrors = require("mongoose-mongodb-errors");

mongoose.Promise = global.Promise;
mongoose.plugin(MongoDBErrors);
mongoose.connect(process.env.MONGOURI,{
    useNewUrlParser: true
    // UseMongoClient: true
})
.then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));
