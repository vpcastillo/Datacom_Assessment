/// <reference types = "Cypress" />

describe('Get API User Test', () => 
{
    let authtoken = '9746ddc8d401c5eb5775d9680c94c49db6b16f969f5b5e10df548929e68069e2'
    let homeurl = 'http://jsonplaceholder.typicode.com/'
    
    it('TC1', () => 
    {
        cy.log('Verify GET Users request')
        cy.request({

            method : 'GET',
            url : homeurl+'users',
            headers : {
                'authorization' : "Bearer " + authtoken
            }
        }).then((res) =>{
            expect(res.status).to.eq(200)
            //Missing total count of users
        })
    })

    it('TC2', () => 
    {
        cy.log('Verify GET User request by Id')
        cy.request({

            method : 'GET',
            url : homeurl+'users/?id=8',
            headers : {
                'authorization' : "Bearer " + authtoken
            }
        }).then((response) =>{
            expect(response.status).to.eq(200)
            //expect(response).contains('Nicholas Runolfsdottir V')
            //Missing Verify if user with id8 is Nicholas Runolfsdottir V
        })

    })

    it('TC3', () => 
    {
        cy.log('Verify POST Users request')        
        cy.request({

            method : 'POST',
            url : homeurl+'posts',
            headers : {
                'authorization' : "Bearer " + authtoken
            }
        }).then((response) =>{
            expect(response.status).to.eq(201)
        })
        //Missing Verify that the posted data are showing up in the result
    })
})