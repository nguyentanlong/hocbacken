const mongoose = require("mongoose");

//create table
const taoBang = new mongoose.Schema({
    name: String
})
const userTable = mongoose.model("tableusers", taoBang);
module.exports = userTable;