/// <reference types = "Cypress" />

const { url } = require("inspector")

describe('Get API User Test', () => 
{
    let homeurl = 'http://jsonplaceholder.typicode.com/users/'
    
    it('TC1', () => 
    {
        cy.log('Verify GET Users request')
        cy.request({

            method : 'GET',
            url : homeurl

        }).then((response) =>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.length.of.at.most(10)
        })
    })

    it('TC2', () => 
    {
        cy.log('Verify GET User request by Id')
        cy.request({

            method : 'GET',
            url : homeurl+'/8'

        }).then((response) =>{
            expect(response.status).to.eq(200)
            expect(response.body).has.property('name', 'Nicholas Runolfsdottir V')
        })

    })

    it('TC3', () => 
    {
        cy.log('Verify POST Users request')        
        cy.request({

            method : 'POST',
            url : homeurl,

            body : {
                    "id": "11",
                    "name": "Jojo Smith",
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
            expect(response.status).to.eq(201)
            expect(response.body).has.property('id', 11)
            expect(response.body).has.property('username', 'Jojo')
        })
    })
})