const fs = require('fs');
var CryptoJS = require("crypto-js");

exports.add = async (data) => {
    return new Promise((resolve, reject) => {
        fs.readFile('./storage/users.txt', 'UTF-8', (err, fileData) => {
            if (err) {
                throw err;
            }
            const users = fileData;

            if (!exists(users, data)) {
                registerUser(data);
                resolve();
            }
            reject();
        });
    });
}

function exists(fileData, user) {
    var userToInsert = '"email":"' + user.email + '"';
    if (fileData.includes(userToInsert)) {
        return true;
    }
    return false;
}

function registerUser(user) {
    user.password = CryptoJS.MD5(user.password).toString();
    fs.appendFile('./storage/users.txt', JSON.stringify(user) + '\r\n', (err) => {
        if (err) {
            throw err;
        }
    });
}

exports.login = async (data) => {
    return new Promise((resolve, reject) => {
        fs.readFile('./storage/users.txt', 'UTF-8', async (err, fileData) => {
            if (err) {
                throw err;
            }
            const users = fileData;
            var isRegistered = await exists(users, data);
            if (!isRegistered) {
                reject(false);
            }
            var isPasswordOk = await passwordOk(users, data);
            if (!isPasswordOk) {
                reject(false);
            }
            resolve(true);
        });
    });
}

async function passwordOk(fileData, data) {
    var user = '"email":"' + data.email + '","password":"' + CryptoJS.MD5(data.password).toString() + '"';
    if (await fileData.includes(user)) {
        return true;
    }
    return false;
}