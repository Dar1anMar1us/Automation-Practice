/// <reference types="cypress" />

import {
  homeNavLocators,
  loginLocators,
  signUpLocators
} from "../locators"
import { generateRandomPassword } from "../utils/common"

describe('User Signup UI', () => {
  before(() => {
    cy.visit('https://automationexercise.com/')
  })

  it('Signs up with a new user and checks login', () => {

    cy.get(homeNavLocators.listMenuLinks)
      .find(homeNavLocators.signUpLogInBtn)
      .click()

    const sequentialRun = Cypress.env('SEQUENTIAL_RUN')
    const currentDate = new Date()
    const emailPrefix = `${currentDate.getFullYear()}_${currentDate.getMonth() + 1}_${currentDate.getDate()}`
    // We use getMilliseconds() to be able to have multiple signups for demo purposes using paralel execution with DB persist.
    // const email = `${emailPrefix}-${currentDate.getMilliseconds()}@yopmail.com`
    const email = `${emailPrefix}@yopmail.com`
    const pass = generateRandomPassword(12)

    // Fill the first form
    cy.get(loginLocators.loginForm)
      .find(loginLocators.emailFieldLoginForm)
      .type(email)

    cy.get(loginLocators.loginForm)
      .find(loginLocators.passwordFieldLoginForm)
      .type(pass)

    // Check the user is available for SignUp
    cy.get(loginLocators.loginBtn)
      .click()
      .then(() => {
        cy.contains('Your email or password is incorrect!').then($el => {
          // If the validation text is not present then it means the user already exists or there is a problem.
          !$el.length && assert.fail('The user is already registered or the validation of the user is wrong!')
        })
      })

    // Fill the second form since the user+pass combination is free
    cy.get(loginLocators.signUpForm)
      .find(loginLocators.nameFieldSignUpForm)
      .type(`Darian+${currentDate.getDate()}`)

    cy.get(loginLocators.signUpForm)
      .find(loginLocators.emailFieldSignUpForm)
      .type(email)

    // Click the register button
    cy.get(loginLocators.signUpBtn)
      .click()

    // Fill new account information
    cy.fixture('users.json').as('users')

    cy.get('@users').then($users => {
      const {
        state,
        city,
        company,
        address1,
        zipcode,
        country,
        firstname,
        lastname,
        mobile_number
      } = $users["default"]

      cy.get(signUpLocators.maleCheckbox)
        .click()

      cy.get(signUpLocators.passwordField)
        .type(pass)

      cy.get(signUpLocators.dateOfBirthDay)
        .select(11)

      cy.get(signUpLocators.dateOfBirthMonth)
        .select(5)

      cy.get(signUpLocators.dateOfBirthYear)
        .select(35)

      cy.get(signUpLocators.newsletterCheckBox)
        .click()

      cy.get(signUpLocators.specialOffersCheckBox)
        .click()

      cy.get(signUpLocators.firstNameField)
        .type(firstname)

      cy.get(signUpLocators.lastNameField)
        .type(lastname)

      cy.get(signUpLocators.companyField)
        .type(company)

      cy.get(signUpLocators.addressField)
        .type(address1)

      cy.get(signUpLocators.countryField)
        .select(country)

      cy.get(signUpLocators.stateField)
        .type(state)

      cy.get(signUpLocators.cityField)
        .type(city)

      cy.get(signUpLocators.zipCodeField)
        .type(zipcode)

      cy.get(signUpLocators.mobileNumber)
        .type(mobile_number)

      cy.get(signUpLocators.submitBtn)
        .click()

      cy.get('[data-qa=account-created]')

      // Delete the test user from the database
      if (!Cypress.env('PERSIST_USERS')) {
        cy.deleteUser(email, pass)
      } else {
        // We store the new credentials inside an artifact for download later
        if (sequentialRun) {
          Cypress.env('LAST_IN_SEQUENCE') &&
            cy.exec(`echo '${email}:${pass}' > users.txt`)
            cy.deleteUser(email, pass)
        } else {
          cy.exec(`echo '${email}:${pass}' > users.txt`)
        }
      }

    })

  })

})
