/// <reference types="cypress" />

describe("DELETE /task/:id", () => {
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

    it("Delete task by id", () => {
        cy.request({
            method: 'DELETE',
            url: `/task/${taskId}`,
            headers: {
                authorization: `bearer ${token}`
            }
        }).then(res => {
            expect(res.status).to.eql(200)
            expect(res.body.message).to.eql("Tarefa deletada com sucesso.")
        })
    })

    it("Send invalid task id", () => {
        cy.request({
            method: 'DELETE',
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