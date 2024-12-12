/// <reference types="cypress" />

describe("PUT /follow/:userId/:followerId", () => {
    let userId
    let followerId
    let token

    before(() => {
        cy.createUser().then(res => {
            userId = res.id
        })

        cy.login().then(res => {
            token = res
        })

    })

    it("Follow new user", () => {
        cy.createUser().then(res => {
            followerId = res.id
            cy.request({
                method: 'PUT',
                url: `/follow/${userId}/${followerId}`,
                headers: {
                    authorization: `bearer ${token}`
                }
            }).then(res => {
                expect(res.status).to.eql(200)
            })
        })

    })
})