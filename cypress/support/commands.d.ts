// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {

    interface Chainable {
        /**
        * Custom command to delete a user via api.
        *
        * @returns the api response
        *
        * @example cy.deleteUser()
        */
        deleteUser(email: string, password: any): Chainable<Cypress.Response>
    }

}
