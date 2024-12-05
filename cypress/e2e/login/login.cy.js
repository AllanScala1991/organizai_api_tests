/// <reference types="cypress" />

describe("POST /login", () => {
    let username

    before(() => {
        cy.createUser().then(res => {
            username = res.username
        })
    })

    it("Login user by username and password", () => {
        cy.request({
            method: 'POST',
            url: '/login',
            body: {
                username: username,
                password: '123456'
            }
        }).then(response => {
            expect(response.status).to.eql(200);
            expect(response.body.data.token).not.null;
        })
    })

    it("Send empty username", () => {
        cy.request({
            method: 'POST',
            url: '/login',
            body: {
                username: '',
                password: '123456'
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eql(400);
            expect(response.body.message).to.eql('Usuário e Senha são campos obrigatórios.')
        })
    })

    it("Send invalid username", () => {
        cy.request({
            method: 'POST',
            url: '/login',
            body: {
                username: 'invalid',
                password: '123456'
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eql(404);
            expect(response.body.message).to.eql('Usuário ou Senha inválidos, tente novamente.')
        })
    })

    it("Send invalid password", () => {
        cy.request({
            method: 'POST',
            url: '/login',
            body: {
                username: username,
                password: '111'
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eql(404);
            expect(response.body.message).to.eql('Usuário ou Senha inválidos, tente novamente.')
        })
    })
})