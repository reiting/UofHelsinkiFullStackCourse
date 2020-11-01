describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Rachel',
            username: 'racheleiting',
            password: 'secret'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Blogs')
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('racheleiting')
            cy.get('#password').type('secret')
            cy.get('#login-button').click()

            cy.contains('racheleiting is logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('Tigress')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error').should('contain', 'Wrong credentials')

            cy.get('html').should('not.contain', 'Tigress logged in')
        })
    })

    describe.only('When logged in', function () {
        beforeEach(function () {
            cy.get('#username').type('racheleiting')
            cy.get('#password').type('secret')
            cy.get('#login-button').click()
        })

        it('A blog can be created', function () {
            cy.contains('New Blog').click()
            cy.get('#title').type('this is the title')
            cy.get('#author').type('this is the author')
            cy.get('#url').type('this is the url')
            cy.get('#create-button').click()

            cy.contains('this is the title')
        })
    })
    describe('User actions', function () {
        beforeEach(function () {
            cy.get('#username').type('racheleiting')
            cy.get('#password').type('secret')
            cy.get('#login-button').click()
            cy.contains('New Blog').click()
            cy.get('#title').type('this is the title')
            cy.get('#author').type('this is the author')
            cy.get('#url').type('this is the url')
            cy.get('#create-button').click()
        })
        it('A user can like a blog', function () {
            cy.get(`#view-button`).click()
            cy.get('#like-button').click()
            cy.get('#likes-number').should('contain', '1')
        })
        it('A user can delete their blog', function () {
            cy.get('#view-button').click()
            cy.get('#delete-button').click()
            cy.should('not.contain', 'this is the title')
        })
        it("Blogs are ordered desc according to likes", function () {
            cy.get('#title').type('this is the second title')
            cy.get('#author').type('this is the second author')
            cy.get('#url').type('this is the second url')
            cy.get('#create-button').click()

            cy.get('#title').type('this is the third title')
            cy.get('#author').type('this is the third author')
            cy.get('#url').type('this is the third url')
            cy.get('#create-button').click()
            
        });
    });
});