/// <reference types="cypress" />
import { Chance } from "chance";

describe('POST /create/user', () => {
    it("Create new user successfully", () => {
        cy.request({
            method: 'POST',
            url: '/create/user',
            body: {
                name: Chance().name(),
                username: Chance().first(),
                password: '123456',
                photoUrl: 'http://test.com/test.jpg'
            }
        }).then(response => {
            expect(response.status).to.eql(201)
            expect(response.body.data.id).not.be.null
        })
    })

    it("Send empty name in payload", () => {
        cy.request({
            method: 'POST',
            url: '/create/user',
            body: {
                name: "",
                username: Chance().first() + Chance().integer({ min:0, max:999 }),
                password: '123456',
                photoUrl: 'http://test.com/test.jpg'
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eql(400)
            expect(response.body.message).to.eql("Todos os campos devem ser preenchidos.")
        })
    })

    it("Send duplicated username", () => {
        const username = Chance().first()
        cy.request({
            method: 'POST',
            url: '/create/user',
            body: {
                name: Chance().name(),
                username: username,
                password: '123456',
                photoUrl: 'http://test.com/test.jpg'
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eql(201)
        })

        cy.request({
            method: 'POST',
            url: '/create/user',
            body: {
                name: Chance().name(),
                username: username,
                password: '123456',
                photoUrl: 'http://test.com/test.jpg'
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eql(400)
            expect(response.body.message).to.eql("Já existe um usuário cadastrado com esses dados.")
        })
    })
})