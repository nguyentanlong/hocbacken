const connection = require('../config/database');
const { getAllUsers, getUserById,
    updateUserById, deleteUserById } = require('../services/CRUDService');

// const User = require("../models/user");
const tableusers = require("../models/tableusers");

const getHomepage = async (req, res) => {
    let results = await tableusers.find({});//=> select * from table
    return res.render('home.ejs', { listUsers: results }) // x <- y
}

const getABC = (req, res) => {
    res.send('check ABC')
}

const getHoiDanIT = (req, res) => {
    // res.send('<h1>hoi dan it voi Eric </h1>')
    res.render('sample.ejs')
}

const postCreateUser = async (req, res) => {
    let name = req.body.myname;
    let phoneNumber = req.body.numberPhone;
    let email = req.body.email;
    let address = req.body.address;
    // await User.create({
    //     email: email,
    //     name: name,
    //     city: city
    // })
    // trên là mysql2
    await tableusers.create({//lần đầu sử dung .save
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        address: address
    })
    res.send(' Created user succeed !')
}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id;
    // let user = await getUserById(userId);
    let user = await tableusers.findById(userId).exec();
    res.render('edit.ejs', { userEdit: user }); //x <- y
}
const postUpdateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.myname;
    let address = req.body.address;
    let phoneNumber = req.body.phoneNumber
    let userId = req.body.userId;

    await tableusers.updateOne({ _id: userId }, { email: email, name: name, address: address, phoneNumber: phoneNumber });
    res.redirect('/');
}

const postDeleteUser = async (req, res) => {
    const userId = req.params.id;
    let user = await tableusers.findById(userId).exec();
    res.render('delete.ejs', { userEdit: user })
}

const postHandleRemoveUser = async (req, res) => {
    const id = req.body.userId;

    // await deleteUserById(id);
    let result = await tableusers.deleteOne({
        _id: id
    })

    // console.log(">>> result: ", result)
    res.redirect('/');
}
module.exports = {
    getHomepage, getABC, getHoiDanIT,
    postCreateUser, getCreatePage, getUpdatePage,
    postUpdateUser, postDeleteUser,
    postHandleRemoveUser
}