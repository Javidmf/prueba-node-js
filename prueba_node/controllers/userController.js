const userDataAccess = require('../storage/usersDataAccess.js');
const jsonWebToken = require('jsonwebtoken');

exports.register = async (req, res) => {

    try{
        await userDataAccess.add(req.body);
        res.status(201).send('User created');
    } catch (e){
        res.status(400).send('user already exists');
    }
}

exports.authenticate = async (req, res) => {
    try {
        if (await userDataAccess.login(req.body)) {
            const token = jsonWebToken.sign({ email: req.body.email }, 'SECRET', { expiresIn: '48h' });
            res.status(200).json({ token: token });
        }
    } catch (e) {
        res.status(400).send('Incorrect password');
    }
}