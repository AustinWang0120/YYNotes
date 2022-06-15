require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const Note = require("./models/notes")

const requestLogger = (req, res, next) => {
    console.log("Method:", req.method)
    console.log("Path  :", req.path)
    console.log("Body  :", req.body)
    console.log("-------")
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({
        error: "unknown endpoint",
    })
}

// json -> javascript
app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(requestLogger)

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>")
})

app.get("/api/notes", (req, res) => {
    Note.find({}).then((notes) => {
        res.json(notes)
    })
})

app.get("/api/notes/:id", (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find((note) => note.id === id)

    if (note) {
        res.json(note)
    } else {
        res.statusMessage = `note${id} not found`
        res.status(404).end()
    }
})

app.post("/api/notes", (req, res) => {
    const body = req.body

    if (!body.content) {
        return res.status(400).json({
            error: "content missing",
        })
    }

    const maxId =
        notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0
    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: maxId + 1,
    }

    notes = notes.concat(note)

    res.json(note)
})

app.delete("/api/notes/:id", (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter((note) => note.id !== id)

    res.status(204).end()
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
