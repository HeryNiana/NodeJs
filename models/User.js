const mysql = require('mysql');
const Schema = require('mysql-schema');
const UserSchema = new Schema({
name: {
type: String,
required: true
},
email: {
type: String,
required: true
},
password: {
type: String,
required: true
},
avatar: {
type: String
},
date: {
type: Date,
default: Date.now
}
});
const User = mysqlModel('users', UserSchema);
module.exports = User;