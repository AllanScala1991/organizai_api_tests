/// <reference types="cypress" />

describe("PUT /task", () => {
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

    it("Update task title", () => {
        cy.request({
            method: 'PUT',
            url: "/task",
            headers: {
                authorization: `bearer ${token}`
            },
            body: {
                id: taskId,
                userId: userId,
                weekDay: 'Domingo',
                title: 'Titulo Atualizado',
                time: '16:00',
                priority: 'alto'
            }
        }).then(res => {
            expect(res.status).to.eql(200)
            expect(res.body.data.title).to.eql('Titulo Atualizado')
        })
    })

    it("Send invalid task id", () => {
        cy.request({
            method: 'PUT',
            url: "/task",
            headers: {
                authorization: `bearer ${token}`
            },
            body: {
                id: '111',
                userId: userId,
                weekDay: 'Domingo',
                title: 'Titulo Atualizado',
                time: '16:00',
                priority: 'alto'
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eql(404)
            expect(res.body.message).to.eql('Tarefa não localizada.')
        })
    })

    it("Send empty payload value", () => {
        cy.request({
            method: 'PUT',
            url: "/task",
            headers: {
                authorization: `bearer ${token}`
            },
            body: {
                id: taskId,
                userId: userId,
                weekDay: '',
                title: 'Titulo Atualizado',
                time: '16:00',
                priority: 'alto'
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eql(400)
            expect(res.body.message).to.eql('Todos os campos devem ser preenchidos.')
        })
    })
})