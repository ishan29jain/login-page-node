const express = require ('express');
const router = express.Router();

//mongodb user model
const User = require('../models/User');

//Password Handler
const bcrypt = require('bcrypt');

//Signup
router.post('/signup', (req,res) => {
    let {name, email, password, dateOfBirth} = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();

    if (name == "" || email == "" || password == "" || dateOfBirth == ""){
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
    }
    else if (!/^[a-zA-Z ]*$/.test(name)){
        res.json({
            status: "FAILED",
            message: "Invalid name entered!"
        })
    }
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            status: "FAILED",
            message: "Invalid email entered!"
        })
    }
    else if (isNaN(new Date(dateOfBirth).getTime())){
        res.json({
            status: "FAILED",
            message: "Invalid date of birth entered!"
        })
    }
    else if (password.length < 8){
        res.json({
            status: "FAILED",
            message: "Password must be at least 8 characters long!"
        })
    }
    else{
        //check kro ki user already existing na ho bas
        User.find({email}).then(result => {
            if (result.length) {
                //that means user already exists
                res.json({
                    status: "FAILED",
                    message: "User already exists!"
                })
            }
            else{
                //Try create a new user

                //password Handling
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new User({
                        name,
                        email,
                        password: hashedPassword,
                        dateOfBirth
                    });

                    newUser.save().then(result => {
                        res.json({
                            status: "SUCCESS",
                            message: "User created successfully!"
                        })
                    })
                    .catch(err =>{
                        res.json({
                        status: "FAILED",
                        message: "Error in saving user account!"
                    })
                    })
                })
                .catch(err =>{
                    res.json({
                        status: "FAILED",
                        message: "Error in hashing password!"
                    })
                })
            }
        }).catch(err =>{
            console.log(err);
            res.json({
                status: "FAILED",
                message: "Error in database while checking for existing User!"
            })
        })
    }
})

router.post('/login', (req,res) =>{
    let {email, password} = req.body;
    email = email.trim();
    password = password.trim();

    if (email == "" || password == ""){
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
    }
    else{
        User.find({email})
        .then(data => {
            if (data.length) {
                //User exists

                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result => {
                    if (result) {
                        //Password is correct
                        res.json({
                            status: "SUCCESS",
                            message: "Login Successful!"
                        })
                    }
                    else{
                        res.json({
                            status: "FAILED",
                            message: "Incorrect Password!"
                        })
                    }
                })
                .catch(err => {
                    res.json ({
                        status: "FAILED",
                        message: "Error in comparing password!"
                    })
                })
            }
            else{
                res.json({
                    status: "FAILED",
                    message: "User does not exist!"
                    })
            }
        })
        .catch(err => {
            res.json({
                status: "FAILED",
                message: "Error in finding user!"
                })
        })
    }
})

module.exports = router;