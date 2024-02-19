describe("TC-SIGN-IN-1", () => {
    it('[PASS]', () => {
        cy.visit('/login')
        cy.get('.data-email').type('final.pro@gmail.com')
        cy.get('.data-password').type('finalpro123')
        cy.get('.button-create').click()
        cy.url().should('include', '/home')
    })
})

describe("TC-SIGN-IN-2", () => {
    it('[FAIl] valid e-mail', () => {
        cy.visit('/login')
        cy.get('.data-email').type('winner.w')
        cy.get('.validate-mail').contains('Invalid email')
    })
})

describe("TC-SIGN-IN-3", () => {
    it('[FAIL] password incorrect.', () => {
        cy.visit('/login')
        cy.get('.data-email').type('winner.kypt@kmutt.ac.th')
        cy.get('.data-password').type('abc1234')
        cy.get('.button-create').click()
        cy.get('.popup').contains("Email or password incorrect.")
    })
})

describe("TC-SIGN-OUT", () => {
    it('[PASS]', () => {
        cy.visit('/login')
        cy.get('.data-email').type('final.pro@gmail.com')
        cy.get('.data-password').type('finalpro123')
        cy.get('.button-create').click()
        cy.get('.button-profile').click()
        cy.get('.button-logout').click()
        cy.url().should('include', '/login')
    })
})