// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('deleteUser', (email, password) => {
    cy.request({
        method: 'DELETE',
        url: 'https://automationexercise.com/api/deleteAccount',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            email,
            password
        }
    })
    .then((response) => {
        expect(response.status).to.eq(200)
        return response;
    })
})