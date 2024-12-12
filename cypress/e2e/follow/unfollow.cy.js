/// <reference types="cypress" />

describe("PUT /unfollow/:userId/:followerId", () => {
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

    it('Unfollow user', () => {
        cy.followUser(userId, token)
        .then((followerId) => {
            cy.request({
                method: 'PUT',
                url: `/unfollow/${userId}/${followerId}`,
                headers: {
                    authorization: `bearer ${token}`
                }
            }).then(res => {
                expect(res.status).to.eql(200)
            })
        })
    })
})