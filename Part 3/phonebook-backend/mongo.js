const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
contact = process.argv[3];
number = process.argv[4];

const url =
    `mongodb+srv://reiting:${password}@cluster0.f5c80.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3) {
    Contact.find({}).then(contacts => {
        contacts.forEach(contact => {
            console.log(contact.name, contact.number)
        });
        mongoose.connection.close()
    })
}
else if (process.argv.length == 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    const contact = new Contact({
        name: name,
        number: number
    })
    contact.save().then(result => {
        console.log("added", result.name, "number", result.number, "to phonebook")
        mongoose.connection.close()
    })
}