/// <reference types="cypress" />

describe("GET /activitie/:userId", () => {
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

    it("Get user activities", () => {
        cy.request({
            method: 'GET',
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
            method: 'GET',
            url: `/activitie/111`,
            headers: {
                authorization: `bearer ${token}`
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eql(404)
            expect(res.body.message).to.eql('Nenhum dado de conquista localizado.')
        })
    })
})