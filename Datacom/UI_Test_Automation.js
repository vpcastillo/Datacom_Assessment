//const { get } = require("cypress/types/lodash")
require('@cypress/skip-test/support')

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('jQuery is not defined')) {
        return false
    }
    if(err.message.includes('undefined'))
    {
        return false
    }
  })

process.on('uncaughtException', function (err) {
    console.error(err.stack);
    console.log("Node NOT Exiting...");
  });



describe('UI Test Automation', function()
{  
    const PayeeName = 'John Smith'
              
    it('Navigate to web page', function()
    {
        cy.visit('https://www.demo.bnz.co.nz/client/', {headers: { "Accept-Encoding": "gzip, deflate" }}) //Go to Website; headers was used to fix loading error
        cy.title().should('eq', 'Internet Banking')
        cy.wait(5000)
        cy.location().should((loc) => {
              if(loc.pathname == ('https://www.demo.bnz.co.nz/demo/'))
              {
                cy.get('.button').contains('Check it out').click()
              }
            })
                  
    })

    it('TC1', function()
    {          
        
        cy.get('body').then(($body) => {
        if ($body.find('body > div > div.intro-wrapper > div.logo-wrapper').length >0)
        {
            cy.log('Verify you can navigate to Payees page using the navigation menu')
            cy.get('.js-main-menu-button-text > :nth-child(1) > .Language__container')
                .contains('span', 'Menu').click()
            cy.get('.js-main-menu-payees > .Button > .Language__container')
                .contains('span', 'Payees').click()  
            cy.get('.CustomPage-heading > :nth-child(2)')
            .should('be.visible').and('have.text', 'Payees')
        }        
        else        
        cy.log('Verify you can navigate to Payees page using the navigation menu')
        cy.get('.js-main-menu-button-text > :nth-child(1) > .Language__container')
            .contains('span', 'Menu').click()
        cy.get('.js-main-menu-payees > .Button > .Language__container')
            .contains('span', 'Payees').click()  
        cy.get('.CustomPage-heading > :nth-child(2)')
            .should('be.visible').and('have.text', 'Payees')            
        })
    })

    it('TC2', function() 
    {
        cy.get('.CustomPage-heading > :nth-child(2)')
                    .should('be.visible').and('have.text', 'Payees')
        cy.get(':nth-child(3) > .Button').click()
        cy.log('Verify you can add new payee in the Payees page')
        cy.get('#ComboboxInput-apm-name').type(PayeeName+'{enter}')
        cy.get('#apm-bank').type('12')
        cy.get('#apm-branch').type('3456')
        cy.get('#apm-account').type('7890123')
        cy.get('#apm-account').type('001')
        cy.get('.js-submit').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Payee Added')
          })
        cy.get('.CustomSection > :nth-child(1)').find('.js-payee-name').nextUntil(PayeeName)
    })
        
    it('TC3', function() 
    {
        cy.reload()        
        cy.log('Verify payee name is a required field')
        cy.get('.CustomPage-heading > :nth-child(2)')
                    .should('be.visible').and('have.text', 'Payees')        
        cy.get(':nth-child(3) > .Button').click()                         
        cy.get('.js-submit').click()    
        cy.get('.error-header').should('contain','A problem was found. Please correct the field highlighted below.')
        cy.get('#ComboboxInput-apm-name').type(PayeeName+'{enter}')
        cy.get('#apm-bank').type('12')
        cy.get('#apm-branch').type('3456')
        cy.get('#apm-account').type('7890123')
        cy.get('#apm-account').type('002')
        cy.get('.js-modal-inner').should('not.contain.text','A problem was found. Please correct the field highlighted below.')

    })

    it('TC4', function() 
    {
        cy.reload()
        cy.log('Verify that payees can be sorted by name')
        cy.get('.CustomPage-heading > :nth-child(2)').then(function($PayeesPage){
            const currPage = $PayeesPage.text()
            cy.log(currPage)
            expect(currPage).eq('Payees')
        })
        cy.get(':nth-child(3) > .Button').click()
        cy.log('Verify you can add new payee in the Payees page')
        cy.get('#ComboboxInput-apm-name').type(PayeeName+'{enter}')
        cy.get('#apm-bank').type('12')
        cy.get('#apm-branch').type('3456')
        cy.get('#apm-account').type('7890123')
        cy.get('#apm-account').type('003')
        cy.get('.js-submit').click()
        cy.get('.js-payee-name-column > .Icon').should('have.class', 'Icon IconChevronDownSolid')
        cy.get('.js-payee-name-column > .Icon').click()
        cy.get('.js-payee-name-column > .Icon').should('have.class', 'Icon IconChevronUpSolid')
        cy.go('back')
    })
    var i = 0
    for(i = 0; i < 3 ; i++)
    {
        it('TC5', function() 
        {
            const payee = 'Everyday'
            const payto = 'Bills'
            cy.get('#account-ACC-1 > .account-info > .account-balance').then(function($payeebal){
                const payeebal = $payeebal.text()
                cy.log(payeebal).as('payeebal')
            cy.get('#account-ACC-5 > .account-info > .account-balance').then(function($paytobal){
                const paytobal = $paytobal.text()
                cy.log(paytobal).as('paytobal')
            cy.log('Navigate to Payments page')
            cy.get('.js-main-menu-btn').click()
            //cy.get('.js-main-menu-paytransfer > .Button').click()
            cy.contains('Pay or transfer').click()
            cy.get('.ReactModal__Overlay').within(() => {
                //From Payee
                cy.get('[data-testid="from-account-chooser"]').click()
                cy.contains(payee).click()
                
                //To Recepient
                cy.get('[data-testid="to-account-chooser"]').click()
                cy.get('[data-testid="to-account-accounts-tab"]').click()
                cy.contains(payto).click()
                cy.get('[name=amount]').click().type('500')
                //cy.get('#paymentForm > div.container-1-1-57 > div > button.Button-component-88.Button-component-106.Button-normalSize-96.Button-midblueColor-92.Button-solidVariant-89.Button-solidVariant-107 > span').click()
                cy.contains('Transfer').click()  
                cy.wait(5000)
            })
            //cy.pause() 
            cy.on('window:alert', (text) => {
                expect(text).to.contains('Transfer successful')
                cy.log(text)
            })
            cy.get('#account-ACC-1 > .account-info > .account-balance').then(function($payeebal2){
                const payeebal2 = $payeebal2.text()
                cy.log('New balance is '+payeebal2)
                cy.log('Old balance is '+payeebal)
                expect(payeebal).is.not.eq(payeebal2)
            })
            cy.get('#account-ACC-5 > .account-info > .account-balance').then(function($paytobal2){
                const paytobal2 = $paytobal2.text()
                cy.log('New balance is '+paytobal2)
                cy.log('Old balance is '+paytobal)
                expect(paytobal).is.not.eq(paytobal2)                
            })
            })
            })
            cy.wait(5000)
        })
        
    }

})