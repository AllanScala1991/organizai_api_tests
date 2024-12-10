/// <reference types="cypress" />

describe("GET /task/done/:userId", () => {
    let userId
    let token
    let taskId
    before(() => {
        cy.createUser().then(res => {
            userId = res.id
            cy.login().then(res => {
                token = res
            }).then(() => {

                cy.createTask(userId, token, true).then(res => {
                    taskId = res
                })
            })
    
        })

    })

    it("Get isDone tasks", () => {
        cy.request({
            method: 'GET',
            url: `/task/done/${userId}`,
            headers: {
                authorization: `bearer ${token}`
            }
        }).then(res => {
            expect(res.status).to.eql(200)
            expect(res.body.data).not.null
        })
    })
})