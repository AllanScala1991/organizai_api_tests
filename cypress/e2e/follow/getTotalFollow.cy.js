/// <reference types="cypress" />

describe("GET /follow/total/:userId", () => {
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

    it("Get total user follower and followings", () => {
        cy.request({
            method: 'GET',
            url: `/follow/total/${userId}`,
            headers: {
                authorization: `bearer ${token}`
            }
        }).then(res => {
            expect(res.status).to.eql(200)
            expect(res.body.data.seguindo).not.null
            expect(res.body.data.seguidores).not.null
        })
    })

    
})