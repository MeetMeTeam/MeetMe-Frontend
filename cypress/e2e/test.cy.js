describe('template spec', () => {
  it('passes', () => {
    cy.visit('/register')
    cy.get('.data-email').type("final.pro@gmail.com")
    cy.get('.data-username').type("project")
    cy.get('.data-displayname').type("final")
    cy.get('.data-password').type("finalpro123")
    cy.get('.data-repassword').type("finalpro123")
    cy.get('.data-birthdate').type("9{enter}")
    cy.get('.data-birthmonth').type("March{enter}")
    cy.get('.data-birthyear').type("2002{enter}")
    cy.get('.button-create').click()
  })
})