const reader = require('readline-sync')
const mongoose = require('mongoose')
const User = mongoose.model('User', require('./schemas/User'))

mongoose.connect('mongodb://localhost:27017/blog', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

let firstName = reader.question('First name: ')
let lastName = reader.question('Last name: ')
let username = reader.question('Username: ')
let password = reader.question('Password: ', {
    hideEchoBack: true
})

if(firstName === '' || lastName === '' || username === '' || password === '') {
    console.log('Unable to create admin user.  Please give a value for all requested fields')
    process.exit()
}

User.findOne({
    username: username
}).then((user) => {
    if(user) {
        console.log('That username already exists')
        process.exit()
    }
}).then(() => {
    let user = new User({
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        role: 'admin'
    })
    user.save().then(() => {
        console.log('Admin user created for', firstName, lastName, 'with username', username)
        process.exit()
    })
}).catch((err) => {
    console.error(err)
})