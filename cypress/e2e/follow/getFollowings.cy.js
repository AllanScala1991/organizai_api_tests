/// <reference types="cypress" />

describe("GET /followings/:userid", () => {
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

    it("Get all user followings", () => {
        cy.request({
            method: 'GET',
            url: `/followings/${userId}`,
            headers: {
                authorization: `bearer ${token}`
            }
        }).then(res => {
            expect(res.status).to.eql(200)
            expect(res.body.data.seguidores).not.null
        })
    })
})