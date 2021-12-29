const { response } = require('express')
require('dotenv').config()
const express = require('express')
const cors = require("cors");
const Person = require('./models/person')

const app = express()

const morgan = require('morgan')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('content', (request) => {
    return JSON.stringify(request.body)
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :content"))
/*
let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5433523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]


*/
app.get('/',(req, res) => {
    res.send('<h1>Hello World!</h1>')
})
app.get('/api/persons',(req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})
/*
app.get('/info', (req,res) => {
    res.send(info)
})
*/
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
   
   Person.findById(id).then(person => {
       res.json(person)
   })
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndRemove(id)
        .then(result => {
            res.status(204).end()        
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: 'Name missing'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'Number missing'
        })
    }
    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

