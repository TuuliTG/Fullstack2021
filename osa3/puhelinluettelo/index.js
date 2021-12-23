const { response } = require('express')
const express = require('express')
const cors = require("cors");

const app = express()

const morgan = require('morgan')

app.use(express.json())
app.use(cors())

morgan.token('content', (request) => {
    return JSON.stringify(request.body)
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :content"))

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

const info = 
    `<p>Phonebook has info for ${persons.length} people</p>
    <br>
    ${new Date()}
    `
const generatedId = () => {
    return Math.floor(Math.random() * 100000)
}

app.get('/',(req, res) => {
    res.send('<h1>Hello World!</h1>')
})
app.get('/api/persons',(req, res) => {
    res.json(persons)
})

app.get('/info', (req,res) => {
    res.send(info)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !==id)

    res.status(204).end()
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
    } else if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({
            error: `Name ${body.name} is already on the list`
        })
    }
    
    const newId = generatedId()

    const person = req.body
    person.id = newId
    persons = persons.concat(person)
    
    console.log(person)
    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

