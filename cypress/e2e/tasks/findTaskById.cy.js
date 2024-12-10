/// <reference types="cypress" />

describe("GET /task/:id", () => {
    let userId
    let token
    let taskId
    before(() => {
        cy.createUser().then(res => {
            userId = res.id
            cy.login().then(res => {
                token = res
            }).then(() => {

                cy.createTask(userId, token).then(res => {
                    taskId = res
                })
            })
    
        })

    })

    it("Find task by id", () => {
        cy.request({
            method: 'GET',
            url: `/task/${taskId}`,
            headers: {
                authorization: `bearer ${token}`
            }
        }).then(res => {
            expect(res.status).to.eql(200)
            expect(res.body.data).not.null
        })
    })

    it("Send invalid task id", () => {
        cy.request({
            method: 'GET',
            url: `/task/111`,
            headers: {
                authorization: `bearer ${token}`
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eql(404)
            expect(res.body.message).to.eql("Tarefa não localizada.")
        })
    })
})