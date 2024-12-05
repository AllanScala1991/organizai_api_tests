/// <reference types="cypress" />

describe('GET /user/id/:id', () => {
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

    it('Get user by id', () => {
        cy.request({
            method: 'GET',
            url: `/user/id/${userId}`,
            headers: {
                authorization: `bearer ${token}`
            }
        }).then(res => {
            expect(res.status).to.eql(200)
            expect(res.body.data.user.id).to.eql(userId)
        })
    })

    it('Send invalid id', () => {
        cy.request({
            method: 'GET',
            url: `/user/id/999`,
            headers: {
                authorization: `bearer ${token}`
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eql(404)
            expect(res.body.message).to.eql("Usuário não localizado.")
        })
    })

    
    it('Send invalid token', () => {
        cy.request({
            method: 'GET',
            url: `/user/id/${userId}`,
            headers: {
                authorization: `bearer invalid`
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eql(403)
        })
    })
})