const express = require('express');
const User = require('../models/User');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "TEjaslovessaili";

//Route 1 : Create A new user  

router.post('/createuser',
      [body('name', "Enter valid name").isLength({ min: 3 }),
      body('email', "Enter valid email").isEmail(),
      body('password', "write strong password").isLength({ min: 5 })
      ],
      async (req, res) => {
            let success = false;
            // console.log(req.body);

            // to give error if user gives wrong information....

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({ success, errors: errors.array() });
            }

            //use try catch if there is any problem occured

            try {
                  // check whether the user exist in db.. and if not create a new user in db....

                  let user = await User.findOne({ email: req.body.email });
                  if (user) { return res.status(400).json({ success, message: "cant use this email...." }) }

                  //using BCRUPTJS to create hash password .....

                  const salt = await bcrypt.genSalt(4);
                  const hashPass = await bcrypt.hash(req.body.password, salt);


                  user = await User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: hashPass,
                        date: req.body.date
                  })

                  //JWT (jsonwebtoken) use to send this to user for user idetification after user autherized.....

                  const data = {
                        user: { id: user.id }
                  }
                  const authtoken = jwt.sign(data, JWT_SECRET);
                  // console.log(authtoken);

                  // .then(user => res.json(user)).catch(err=>{console.log(err)
                  // res.json(err)});
                  success = true
                  res.json({ success, authtoken });
            } catch (error) {
                  console.error(error.message);
                  res.status(500).send({ message: error.message });
            }

      })

//Route 2 : Login page ........
router.post('/login',
      [
            body('email', "Enter valid email").isEmail(),
            body('password', "this field cannot be empty").exists()
      ],
      async (req, res) => {
            let success = false;
            // to give error if user gives wrong information....

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({ errors: errors.array() });
            }
            const { email, password } = req.body;
            try {

                  //check if user writen email is exist or not....

                  const user = await User.findOne({ email });
                  if (!user) {
                        success = false;
                        return res.status(400).json({ message: "please try with write credentials.." })
                  }

                  //checking passwored given by user is correct or not....

                  const passcomp = await bcrypt.compare(password, user.password);
                  if (!passcomp) {
                        success = false
                        return res.status(400).json({ success, message: "please try with write credentials.." })
                  }

                  //JWT (jsonwebtoken) use to send this to user for user idetification after user autherized.....

                  const data = {
                        user: { id: user.id }
                  }
                  const authtoken = jwt.sign(data, JWT_SECRET);
                  success = true
                  // console.log(authtoken);

                  // .then(user => res.json(user)).catch(err=>{console.log(err)
                  // res.json(err)});
                  res.json({ success, authtoken });
            } catch (error) {
                  console.error(error.message);
                  res.status(500).send({ message: "Internal error occured....." });
            }
      })

//Route 3: get user information using token (token is send in header)
router.post('/getuser', fetchuser, async (req, res) => {
      try {
            let userId = req.user.id;

            const user = await User.findById(userId).select("-password");

            res.send(user);

      } catch (error) {
            console.error(error.message);
            res.status(500).send({ message: "Internal error occured....." });
      }
})

module.exports = router