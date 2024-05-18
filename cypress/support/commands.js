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
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    cy.request({
        method: 'DELETE',
        url: 'https://automationexercise.com/api/deleteAccount',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept-Encoding': 'deflate, gzip;q=1.0, *;q=0.5'
        },
        body: formData,
    })
    .then((response) => {
        console.info("Delete email: ", response)
        expect(response.status).to.eq(200)
        return response;
    })
})