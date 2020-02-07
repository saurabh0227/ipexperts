const Users = require('./model');
const bcrypt = require('bcryptjs');
const { sign } = require('./jwt');

exports.postLogin = (req, res, next) => {
    if (req.body) {
        const userId = !req.body.userId ? null : req.body.userId;
        const password = req.body.password;
        if (!userId || !password) {
            return res.status(400).json('Enter userId and Password');
        }
        Users.findOne({ userId: userId })
            .then(user => {
                if (!user) {
                    throw new Error('Enter correct userId');
                }
                return bcrypt.compare(password, user.password)
                    .then(match => {
                        if (match) { return sign(user); }
                        res.status(200).json('Password is incorrect')
                    })
            })
            .then(token => {
                return res.status(200).json({ token })
            })
            .catch(err => console.log(err))
    } else {
        res.status(500).json("Internal Error.")
    }
}

exports.createUser = ({ body }, res, next) => {
    if (body) {
        // const userName = !body.userName ? null : body.userName.toString().toUpperCase().trim();
        const password = body.password;
        const name = body.name;
        const phone = body.phone;
        const role = body.role;
        if (!password || !name) {
            return res.status(400).json('Enter userName and Password and Name');
        }
        bcrypt.hash(password, 12)
            .then(password => Users.create({
                name: name,
                password,
                phone: phone,
                role: role
            })).then(() => {
                res.status(201).json({ message: 'User created successfully' })
            }).catch(err => {
                console.log(`Error in creating User ${err}`)
            })
    }
}

exports.getAllUser = (req, res, next) => {
    let query = {}
    if (req.query.role === 'Admin') {
        query.role = 'Admin'
        Users.find(query)
            .then(users => {
                res.status(200).json({ users: users })
            })
            .catch(err => {
                console.log(`Error in getting user list ${err}`)
            })
    }
    else {
        res.status(200).json({ message: 'User role must be admin' })
    }
}