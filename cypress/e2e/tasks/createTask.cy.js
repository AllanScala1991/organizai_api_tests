/// <reference types="cypress" />

describe("POST /task", () => {
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

    it("Create new task", () => {
        cy.request({
            method: 'POST',
            url: '/task',
            headers: {
                authorization: `bearer ${token}`
            },
            body: {
                userId: userId,
                weekDay: 'Domingo',
                title: 'Fazer almoço',
                time: '16:00',
                priority: 'alto'
            }
        }).then(response => {
            expect(response.status).to.eql(201)
            expect(response.body.data).not.null
        })
    })

    it("Send empty payload value", () => {
        cy.request({
            method: 'POST',
            url: '/task',
            headers: {
                authorization: `bearer ${token}`
            },
            body: {
                userId: userId,
                weekDay: '',
                title: 'Fazer almoço',
                time: '16:00',
                priority: 'alto'
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eql(400)
            expect(response.body.message).to.eql('Todos os campos devem ser preenchidos.')
        })
    })
})