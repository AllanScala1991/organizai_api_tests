/// <reference types="cypress" />

describe("PUT /user/level/:id", () => {
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

    it("Update user level", () => {
        cy.request({
            method: 'PUT',
            url: `/user/level/${userId}`,
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
            url: `/user/level/111`,
            headers: {
                authorization: `bearer ${token}`
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eql(404)
            expect(res.body.message).to.eql("Erro ao localizar o nível do usuário.")
        })
    })
})