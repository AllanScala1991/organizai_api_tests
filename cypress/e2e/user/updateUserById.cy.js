/// <reference types="cypress" />
import { Chance } from "chance";

describe("PUT /update/user/:id", () => {
    let userId
    let token
    before(() => {
        cy.createUser().then(res => {
            userId = res.id
        })

        cy.login().then(res => {
            token = res
        })
    })

    it("Update user by id", () => {
        cy.request({
            method: 'PUT',
            url: `/update/user/${userId}`,
            headers: {
                authorization: `bearer ${token}`
            },
            body: {
                name: Chance().first(),
                username: Chance().first(),
                password: '654321',
                photoUrl: 'http://test.com/test2.jpg'
            }
        }).then(response => {
            expect(response.status).to.eql(200)
            expect(response.body.message).to.eql('Informações do usuário atualizadas com sucesso.')
        })
    })

    it("Send empty payload", () => {
        cy.request({
            method: 'PUT',
            url: `/update/user/${userId}`,
            headers: {
                authorization: `bearer ${token}`
            },
            body: {
                name: '',
                username: Chance().first(),
                password: '654321',
                photoUrl: 'http://test.com/test2.jpg'
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eql(400)
            expect(response.body.message).to.eql('Todos os campos devem ser preenchidos.')
        })
    })

    it("Send invalid user id", () => {
        cy.request({
            method: 'PUT',
            url: `/update/user/111`,
            headers: {
                authorization: `bearer ${token}`
            },
            body: {
                name: Chance().first(),
                username: Chance().first(),
                password: '654321',
                photoUrl: 'http://test.com/test2.jpg'
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eql(404)
            expect(response.body.message).to.eql('Usuário não localizado.')
        })
    })
})