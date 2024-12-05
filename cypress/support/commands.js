import { Chance } from "chance";

Cypress.Commands.add('createUser', (username = Chance().first()) => {
    cy.request({
        method: 'POST',
        url: '/create/user',
        body: {
            name: Chance().name(),
            username: username,
            password: '123456',
            photoUrl: 'http://test.com/test.jpg'
        }
    }).then(response => {
        expect(response.status).to.eql(201)
        return response.body.data
    })
})

Cypress.Commands.add('login', () => {
    let username = Chance().first()
    cy.createUser(username)
    cy.request({
        method: 'POST',
        url: '/login',
        body: {
            username: username,
            password: '123456'
        }
    }).then(response => {
        expect(response.status).to.eql(200)
        return response.body.data.token
    })
})