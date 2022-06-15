const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log(
        "Please provide the password as an argument: node mongo.js <password>"
    )
    process.exit(1)
}

// J2dueFqEisB6i7nu
const password =
    process.argv[2] === "password" ? "J2dueFqEisB6i7nu" : process.argv[2]

const url = `mongodb+srv://noledge0120:${password}@yycluster.znspblz.mongodb.net/yynotes?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model("Note", noteSchema)

const note = new Note({
    content: "Mongoose makes use of mongo easy",
    date: new Date(),
    important: false,
})

// note.save().then((result) => {
//     console.log("note saved!")
//     mongoose.connection.close()
// })

Note.find({}).then((result) => {
    result.forEach((note) => {
        console.log(note)
    })
    mongoose.connection.close()
})
