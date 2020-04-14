const router = require("express").Router();
const bcrypt = require('bcryptjs');

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
    const userInfo = req.body;

    // hashSync will re-hash password for 2^8 times
    const ROUNDS = process.env.HASHING_ROUNDS || 8;
    const hashpwd = bcrypt.hashSync(userInfo.password, ROUNDS);

    userInfo.password = hashpwd;

    Users.add(userInfo)
        .then(user => {
        res.json(user);
        })
        .catch(err => res.send(err));
});

router.post("/login", (req, res) => {
    const {username, password } = req.body;

    Users.findBy({username})
        // note the [] array. ([user]) - grabbing user out of array
        .then(([user]) => {
            if(user && bcrypt.compareSync(password, user.password)) {
                // remember this client into a session cookie
                req.session.user = {
                    id: user.id,
                    username: user.username
                };
                res.status(200).json({"Login successful" : user.username })
            } else {
                res.status(401).json({ message: "Invalid credential"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "error finding user: ", username})
        })
});

router.get("/logout", (req,res)=>{
    if(req.session) {
        req.session.destroy()
        res.status(200).json({message: "Successfully logout"})
    }else{
        res.status(200).json({message: "Already logout"})
    }
});

module.exports = router;
