const mongoose = require("mongoose");

const systemAccount_schema = mongoose.Schema({
    systemAccountBalance: {type:Number, default:0}
})
module.exports = mongoose.model("SystemAccount", systemAccount_schema);