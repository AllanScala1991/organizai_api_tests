/// <reference types="cypress" />

describe("PUT /activitie/:userId", () => {
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

    it("Update user activitie", () => {
        cy.request({
            method: 'PUT',
            url: `/activitie/${userId}`,
            headers: {
                authorization: `bearer ${token}`
            }
        }).then(res => {
            expect(res.status).to.eql(200)
            expect(res.body.data).not.null
        })
    })

    it("Send invalid user id", () => {
        cy.request({
            method: 'PUT',
            url: `/activitie/111`,
            headers: {
                authorization: `bearer ${token}`
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eql(404)
            expect(res.body.message).to.eql('Dados de conquistas não localizado.')
        })
    })
})