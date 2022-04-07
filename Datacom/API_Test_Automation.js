/// <reference types = "Cypress" />

const { url } = require("inspector")

describe('Get API User Test', () => 
{
    const homeURL = 'http://jsonplaceholder.typicode.com/users/'
    const userid = '/8'
    const uName = 'Nicholas Runolfsdottir V'

    
    it('TC1', () => 
    {
        cy.log('Verify GET Users request')
        cy.request({

            method : 'GET',
            url : homeURL

        }).then((response) =>{
            expect(response.status).to.eq(200)
            expect(response.body.length).to.equal(10)
        })
    })

    it('TC2', () => 
    {
        cy.log('Verify GET User request by Id')
        cy.request({

            method : 'GET',
            url : homeURL+userid

        }).then((response) =>{
            expect(response.status).to.eq(200)
            expect(response.body).has.property('name', uName)
        })

    })

    it('TC3', () => 
    {
        cy.request({

            method : 'GET',
            url : homeURL

        }).then((response) =>{
            expect(response.status).to.eq(200)
            expect(response.body.length).to.equal(10)

            let uId = response.body.length +1            

            cy.log('Verify POST Users request')        
            cy.request({

                method : 'POST',
                url : homeURL,

                body : {
                        "id": uId,
                        "name": "Jotaro Kujo",
                        "username": "Jojo",
                        "email": "star@platinum.stand",
                        "address": {
                            "street": "Kulas Light",
                            "suite": "Apt. 556",
                            "city": "Gwenborough",
                            "zipcode": "92998-3874",
                            "geo": {
                                "lat": "-37.3159",
                                "lng": "81.1496"
                            }
                        },
                        "phone": "1-770-736-8031 x56442",
                        "website": "hildegard.org",
                        "company": {
                            "name": "Romaguera-Crona",
                            "catchPhrase": "Multi-layered client-server neural-net",
                            "bs": "harness real-time e-markets"
                        }
                    }

            }).then((response) =>{
                cy.log(JSON.stringify(response))
                expect(response.status).to.eq(201)
                expect(response.body).has.property('id', 11)
                expect(response.body).has.property('name', 'Jotaro Kujo')
                expect(response.body).has.property('username', 'Jojo')
                expect(response.body).has.property('email', 'star@platinum.stand')
            })
        })
    })
})