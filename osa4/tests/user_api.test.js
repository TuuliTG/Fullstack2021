const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('salasana', 10)
        const user = new User({
            username: 'TestUser',
            passwordHash,
            name: 'Test Name'
        })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'TGTUULI',
            password: '12345',
            name: 'Tuuli'
        }
        await api
          .post('/api/users')
          .send(newUser)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)

    })
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'TestUser',
            password: 'salasana',
            name: 'Test Name2'
        }
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

          expect(result.body.error).toContain('`username` to be unique')

          const usersAtEnd = await helper.usersInDb()
          expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})
describe('Creating a new user', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('fails when username is too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ab',
            password: 'salasana',
            name: 'Test Name2'
        }
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

          expect(result.body.error).toContain(`\`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length`)
          const usersAtEnd = await helper.usersInDb()
          expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('fails when password is too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Valid username',
            password: '12',
            name: 'Test Name2'
        }
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

          expect(result.body.error).toContain('Password needs to be at least 3 characters long')
          const usersAtEnd = await helper.usersInDb()
          expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})
afterAll(() => {
    mongoose.connection.close()
})
