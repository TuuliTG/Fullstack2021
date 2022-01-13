describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
        cy.createUser({ username: 'TuuliTG', password: '12345', name: 'Tuuli T-G' })
    })

    it('Login form is shown', function() {
        cy.get('#login-form')
    })

    describe('Login', function() {
        it('login form can be opened', function() {
            cy.contains('Log in').click()  
        })
        
        it('succeeds with correct credentials', function() {
          cy.contains('Log in').click()
          cy.get('#username').type('TuuliTG')
          cy.get('#password').type('12345')
          cy.get('#login-button').click()
          /* eslint-disable cypress/no-unnecessary-waiting */
          cy.wait(2000)
          /* eslint-enable cypress/no-unnecessary-waiting */
          cy.get('#logout-button').click()
        })

        it('fails with wrong credentials', function() {
          cy.contains('Log in').click()
          cy.get('#username').type('wrong')
          cy.get('#password').type('12345')
          cy.get('#login-button').click()
          cy.contains('wrong credentials')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login( { username: 'TuuliTG', password: '12345' })
        })

        it('A blog can be created', function() {
          cy.contains('Create a new Blog').click()
          cy.get('#title').type('A new cypress Blog')
          cy.get('#author').type('Cypress Author')
          cy.get('#url').type('blog url')
          cy.get('#submit-button').click()
          cy.contains('A new cypress Blog')
        })

        describe('and several blogs exist', function() {
            beforeEach(function () {
                cy.createBlog({ title: 'Test Blog', author: 'Test author', url: 'Test url'})
                cy.createBlog({ title: 'Test Blog2', author: 'Test author2', url: 'Test url2'})
                cy.createBlog({ title: 'Test Blog3', author: 'Test author3', url: 'Test url3'})
            })

            it('A blog can be liked', function() {
              cy.get('#view-button').click()
              cy.get('#like-button').click()
              cy.contains('likes: 1')
            })

            it('A blog can be deleted by the user who has added the blog', function() {
                cy.contains('Test Blog')
                cy.get('#view-button').click()
                cy.get('#delete-button').click()
                cy.contains(/^Test Blog$/).should('not.exist')
            })

            it('blogs are shown in order according to the amount of likes', function() {
                cy.get('#TestBlog2').within(() => {
                    cy.get('#view-button').click()
                    cy.get('#like-button').click()
                })

                cy.get('#TestBlog3').within(() => {
                    cy.get('#view-button').click()
                    cy.get('#like-button').click()
                    /* eslint-disable cypress/no-unnecessary-waiting */
                    cy.wait(1000)
                    /* eslint-enable cypress/no-unnecessary-waiting */
                    cy.get('#like-button').click()
                    /* eslint-disable cypress/no-unnecessary-waiting */
                    cy.wait(1000)
                    /* eslint-enable cypress/no-unnecessary-waiting */
                })
                cy.get('div').within(() => {
                  cy.get('#b-title')
                    .first()
                    .contains('Test Blog3')
                  cy.get('#b-title')
                    .eq(1)
                    .contains('Test Blog2')
                
                  cy.get('#b-title')
                    .last()
                    .contains(/^Test Blog$/)          
                })
            })
        })
    })
})