// describe("TC-TOPUP-FLOWER-1", () => {
//     it('Cancel topup flower.', () => {
//         cy.visit('/login')
//         cy.get('.data-email').type('winner.kypt@kmutt.ac.th')
//         cy.get('.data-password').type('winkypt123456')
//         cy.get('.button-create').click()
//         cy.url().should('include', '/home')

//         cy.get('.button-shop').click()
//         cy.url().should('include', '/shop')

//         cy.get('.button-flower').eq(2).click()
//         cy.get('.button-cancel').click()
//         cy.url().should('include', '/shop')
//     })
// })

describe("TC-TOPUP-FLOWER-2", () => {
    it('Confirm topup flower.', () => {
        cy.visit('/login')
        cy.get('.data-email').type('winner.kypt@kmutt.ac.th')
        cy.get('.data-password').type('winkypt123456')
        cy.get('.button-create').click()
        cy.url().should('include', '/home')

        cy.get('.button-shop').click()
        cy.url().should('include', '/shop')

        cy.get('.button-flower').eq(2).click()
        cy.get('.button-confirm').click()
        // cy.request()
    })
})