/// <reference types="cypress" />

describe("DELETE /user/:id", () => {
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
    
    it("Delete user by id", () => {
        cy.request({
            method: 'DELETE',
            url: `/user/${userId}`,
            headers: {
                authorization: `bearer ${token}`
            }
        }).then(response => {
            expect(response.status).to.eql(200)
            expect(response.body.message).to.eql('Usuário deletado com sucesso.')
        })
    })

    it("Send invalid user id", () => {
        cy.request({
            method: 'DELETE',
            url: `/user/111`,
            headers: {
                authorization: `bearer ${token}`
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eql(404)
            expect(response.body.message).to.eql('Usuário não localizado ou já foi deletado.')
        })
    })
})