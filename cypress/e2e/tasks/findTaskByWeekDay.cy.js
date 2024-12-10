/// <reference types="cypress" />

describe("GET /task/week/:weekDay/:userId" , () => {

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

    it("Find task by weekDay", () => {
        cy.createTask(userId, token)
        cy.request({
            method: 'GET',
            url: `/task/week/Domingo/${userId}`,
            headers: {
                authorization: `bearer ${token}`
            }
        }).then(response => {
            expect(response.status).to.eql(200)
            expect(response.body.data).not.null
        })
    })

})