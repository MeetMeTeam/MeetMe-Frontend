// describe("TC-CREATE-USER", ()=>{
//    it('passes', () => {
//     cy.visit('/register')
//     cy.get('.data-email').type("final.pro@gmail.com")
//     cy.get('.data-username').type("project")
//     cy.get('.data-displayname').type("final")
//     cy.get('.data-password').type("finalpro123")
//     cy.get('.data-repassword').type("finalpro123")
//     cy.get('.data-birthdate').type("9{enter}")
//     cy.get('.data-birthmonth').type("March{enter}")
//     cy.get('.data-birthyear').type("2002{enter}")
//     cy.get('.button-create').click()
//   })
// })

describe('TC-VALIDATE-USER-CREATE-1', () => {
  it('[FAIL] Enter Email, username, displayname, birthday, charactor but NOT password', () => {
    cy.visit('/register')

    cy.get('.data-email').type("final.pro@gmail.com")
    cy.get('.data-username').type("project")
    cy.get('.data-displayname').type("final")
    cy.get('.data-birthdate').type("9{enter}")
    cy.get('.data-birthmonth').type("March{enter}")
    cy.get('.data-birthyear').type("2002{enter}")
    cy.get('.button-create').should('be.disabled')
  })

})

describe('TC-VALIDATE-USER-CREATE-2', () => {
  it('[FAIL] Enter Email, username, displayname, password, charactor but NOT birthday.', () => {
    cy.visit('/register')

    cy.get('.data-email').type("final.pro@gmail.com")
    cy.get('.data-username').type("project")
    cy.get('.data-displayname').type("final")
    cy.get('.data-password').type("finalpro123")
    cy.get('.data-repassword').type("finalpro123")
    cy.get('.button-create').should('be.disabled')
  })
})

describe('TC-VALIDATE-USER-CREATE-3', () => {
  it('[FAIL]Enter username, displayname, birthday, charactor, password but NOT Email. ', () => {
    cy.visit('/register')

    cy.get('.data-username').type("project")
    cy.get('.data-displayname').type("final")
    cy.get('.data-password').type("finalpro123")
    cy.get('.data-repassword').type("finalpro123")
    cy.get('.data-birthdate').type("9{enter}")
    cy.get('.data-birthmonth').type("March{enter}")
    cy.get('.data-birthyear').type("2002{enter}")
    cy.get('.button-create').should('be.disabled')
  })
})

describe('TC-VALIDATE-USER-CREATE-4', () => {
  it('[FAIL] Enter Email, username, password ,birthday,charactor but NOT displayname.', () => {
    cy.visit('/register')

    cy.get('.data-email').type("final.pro@gmail.com")
    cy.get('.data-username').type("project")
    cy.get('.data-password').type("finalpro123")
    cy.get('.data-repassword').type("finalpro123")
    cy.get('.data-birthdate').type("9{enter}")
    cy.get('.data-birthmonth').type("March{enter}")
    cy.get('.data-birthyear').type("2002{enter}")
    cy.get('.button-create').should('be.disabled')
  })
})

describe('TC-VALIDATE-USER-CREATE-5', () => {
  it('[FAIL] Enter displayname, username, password ,birthday,charactor but NOT username.', () => {
    cy.visit('/register')

    cy.get('.data-email').type("final.pro@gmail.com")
    cy.get('.data-displayname').type("final")
    cy.get('.data-password').type("finalpro123")
    cy.get('.data-repassword').type("finalpro123")
    cy.get('.data-birthdate').type("9{enter}")
    cy.get('.data-birthmonth').type("March{enter}")
    cy.get('.data-birthyear').type("2002{enter}")
    cy.get('.button-create').should('be.disabled')
  })
})

describe("TC-VALIDATE-CREATE-USER-DOB-FUTURE", () => {
  it('[FAIL] Date of birth of user must be a past.', () => {
    cy.visit('/register')

    cy.get('.data-birthyear').find('2025').should('not.exist')
  })
})

describe("TC-VALIDATE-USER-EMAIL-1", () => {
  it('[FAIL] Enter email as shown in TD-VALIDATE-EMAIL-1.', () => {
    cy.visit('/register')

    cy.get('.data-email').type('winner.w')
    cy.get('.validate-mail').contains('Invalid email')
  })
})
describe("TC-VALIDATE-USER-EMAIL-2", () => {
  it('[FAIL] Enter email as shown in TD-VALIDATE-EMAIL-2.', () => {
    cy.visit('/register')

    cy.get('.data-email').type('winner.w@')
    cy.get('.validate-mail').contains('Invalid email')
  })
})

describe("TC-VALIDATE-USER-EMAIL-3", () => {
  it('[FAIL] Enter email as shown in TD-VALIDATE-EMAIL-3.', () => {
    cy.visit('/register')

    cy.get('.data-email').type('@kmutt.ac.th')
    cy.get('.validate-mail').contains('Invalid email')
  })
})

describe("TC-VALIDATE-USER-EMAIL-4", () => {
  it('[FAIL] Enter email as shown in TD-VALIDATE-EMAIL-4.', () => {
    cy.visit('/register')

    cy.get('.data-email').type('winner.w@kmutt@ac.th')
    cy.get('.validate-mail').contains('Invalid email')
  })
})

describe("TD-VALIDATE-CREATE-USER-DUPLICATE-EMAIL", ()=>{
   it("Fill correct form register but use e-mail as 'meetme.admin@gmail.com'. ", () => {
    cy.visit('/register')
    cy.get('.data-email').type("meetme.admin@gmail.com")
    cy.get('.data-username').type("project")
    cy.get('.data-displayname').type("final")
    cy.get('.data-password').type("finalpro123")
    cy.get('.data-repassword').type("finalpro123")
    cy.get('.data-birthdate').type("9{enter}")
    cy.get('.data-birthmonth').type("March{enter}")
    cy.get('.data-birthyear').type("2002{enter}")
    cy.get('.button-create').click()
    cy.get('.popup').contains("meetme.admin@gmail.com is already exist.")
  })
})

describe("TD-VALIDATE-CREATE-USER-DUPLICATE-USERNAME", ()=>{
  it(" Fill correct form register but use username as 'admins'", () => {
   cy.visit('/register')
   cy.get('.data-email').type("final.pro@gmail.com")
   cy.get('.data-username').type("admins")
   cy.get('.data-displayname').type("final")
   cy.get('.data-password').type("finalpro123")
   cy.get('.data-repassword').type("finalpro123")
   cy.get('.data-birthdate').type("9{enter}")
   cy.get('.data-birthmonth').type("March{enter}")
   cy.get('.data-birthyear').type("2002{enter}")
   cy.get('.button-create').click()
   cy.get('.popup').contains("admins is already exist.")
 })
})

describe("TD-VALIDATE-CREATE-USER-MATCH-PASSWORD-1", ()=>{
  it("Password does not match", () => {
   cy.visit('/register')
   cy.get('.data-email').type("burats@kmutt.ac.th")
   cy.get('.data-username').type("BuratsaBew")
   cy.get('.data-displayname').type("Burass")
   cy.get('.data-password').type("Bew@123")
   cy.get('.data-repassword').type("Bew@1234")
   cy.get('.data-birthdate').type("30{enter}")
   cy.get('.data-birthmonth').type("September{enter}")
   cy.get('.data-birthyear').type("2000{enter}")
   cy.get('.data-character').eq(1).click()
   cy.get('.validate-repassword').contains('Password does not match.')
 })
})
describe("TD-VALIDATE-CREATE-USER-LENGHT-PASSWORD", () => {
  it('[FAIL] Enter password length more than 6.', () => {
    cy.visit('/register')

    cy.get('.data-password').type('Bew')
    cy.get('.validate-password').contains('Please enter more than 6.')
  })
})

describe("TC-VALIDATE-CREATE-USER-LENGHT-USERNAME-1", () => {
  it('[FAIL] Enter username length must be 2-15 character.', () => {
    cy.visit('/register')

    cy.get('.data-username').type('F')
    cy.get('.validate-username').contains('Username must be 2-15 character.')
  })
})

describe("TC-VALIDATE-CREATE-USER-LENGHT-USERNAME-2", () => {
  it('[FAIL] Enter username length must be 2-15 character.', () => {
    cy.visit('/register')

    cy.get('.data-username').type('onetwothreefourfive')
    cy.get('.validate-username').contains('Username must be 2-15 character.')
  })
})

describe("TC-VALIDATE-CREATE-USER-LENGHT-DISPLAYNAME-1", () => {
  it('[FAIL] Enter displayname length must be 2-15 character.', () => {
    cy.visit('/register')

    cy.get('.data-displayname').type('S')
    cy.get('.validate-displayname').contains('Displayname must be 2-15 character.')
  })
})

describe("TC-VALIDATE-CREATE-USER-LENGHT-DISPLAYNAME-1", () => {
  it('[FAIL] Enter displayname length must be 2-15 character.', () => {
    cy.visit('/register')

    cy.get('.data-displayname').type('Seveneleven7-111')
    cy.get('.validate-displayname').contains('Displayname must be 2-15 character.')
  })
})