/// <reference types="cypress" />

describe("GET /followers/:userId", () => {
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

    it("Get all user followers", () => {
        cy.request({
            method: 'GET',
            url: `/followers/${userId}`,
            headers: {
                authorization: `bearer ${token}`
            }
        }).then(res => {
            expect(res.status).to.eql(200)
            expect(res.body.data.seguindo).not.null
        })
    })
})