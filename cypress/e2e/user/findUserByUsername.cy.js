/// <reference types="cypress" />

describe('GET /user/username/:username', () => {
    let username
    let token

    before(() => {
        cy.createUser().then(res => {
            username = res.username
        })

        cy.login().then(res => {
            token = res
        })
    })

    it('Find user by username', () => {
        cy.request({
            method: 'GET',
            url: `/user/username/${username}`,
            headers: {
                authorization: `bearer ${token}`
            }
        }).then(res => {
            expect(res.status).to.eql(200)
            expect(res.body.data.username).to.eql(username)
        })
    })

    it('Send invalid username', () => {
        cy.request({
            method: 'GET',
            url: `/user/username/invalid`,
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
            url: `/user/username/${username}`,
            headers: {
                authorization: `bearer invalid`
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eql(403)
        })
    })
})