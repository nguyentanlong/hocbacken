const mongoose = require("mongoose");

//create table
const taoBang = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: String,
    address: String
})
const userTable = mongoose.model("tableusers", taoBang);
module.exports = userTable;