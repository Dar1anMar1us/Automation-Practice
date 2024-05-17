/// <reference types="cypress" />

const { generateRandomPassword } = require("../utils/common")

describe('Signs up with a new user via API', () => {
    /* it('Makes a POST request to create a new account', () => {
        cy.fixture('users.json').as('users')
        const formData = new FormData()
        cy.get('@users').then($users => {
            const defaultUser = $users["default"]
            formData.append('name', defaultUser.name)
            formData.append('email', defaultUser.email)
            formData.append('password', generateRandomPassword(12))
            formData.append('title', defaultUser.title)
            formData.append('birth_date', defaultUser.birth_date)
            formData.append('birth_month', defaultUser.birth_month)
            formData.append('birth_year', defaultUser.birth_year)
            formData.append('firstname', defaultUser.firstname)
            formData.append('lastname', defaultUser.lastname)
            formData.append('company', defaultUser.company)
            formData.append('address1', defaultUser.address1)
            formData.append('address2', defaultUser.address2)
            formData.append('country', defaultUser.country)
            formData.append('zipcode', defaultUser.zipcode)
            formData.append('state', defaultUser.state)
            formData.append('city', defaultUser.city)
            formData.append('mobile_number', defaultUser.mobile_number)
        })
        const info = {
            method: 'POST',
            url: 'https://automationexercise.com/api/createAccount',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        cy.request({
            ...info,
            body: formData,
        }).then((response) => {
            console.log(response)
            // Assertions on the response
            expect(response.status).to.equal(201)
        })
    }) */

    it('Test API using CURL', () => {
        cy.fixture('users.json').as('users')
        cy.get('@users').then($users => {
            const defaultUser = $users["default"]
            const sequentialRun = Cypress.env('SEQUENTIAL_RUN') || null
            const currentDate = new Date()
            const emailPrefix = `${currentDate.getDate()}${currentDate.getMonth() + 1}${currentDate.getFullYear()}`
            // We use getMilliseconds() to be able to have multiple signups for demo purposes using paralel execution
            const email = `${emailPrefix}-${currentDate.getMilliseconds()}@yopmail.com`
            const pass = generateRandomPassword(12)
            cy.exec(`curl -X POST -H "Content-Type: multipart/form-data" \
                -F "name=John Doe" \
                -F "email=${email}" \
                -F "password=${pass}" \
                -F "title=${defaultUser.title}" \
                -F "birth_date=${defaultUser.birth_date}" \
                -F "birth_month=${defaultUser.birth_month}" \
                -F "birth_year=${defaultUser.birth_year}" \
                -F "firstname=${defaultUser.firstname}" \
                -F "lastname=${defaultUser.lastname}" \
                -F "company=${defaultUser.company}" \
                -F "address1=${defaultUser.address1}" \
                -F "address2=${defaultUser.address2}" \
                -F "country=${defaultUser.country}" \
                -F "zipcode=${defaultUser.zipcode}" \
                -F "state=${defaultUser.state}" \
                -F "city=${defaultUser.city}" \
                -F "mobile_number=${defaultUser.mobile_number}" \
                https://automationexercise.com/api/createAccount`)
                .then((response) => {
                    // Handle the response (stdout)
                    console.log('Curl Response:', response.stdout)
                    const jsonResponse = JSON.parse(response.stdout)
                    cy.wrap(jsonResponse.responseCode).should('eq', 201)
                    cy.wrap(jsonResponse.message).should('eq', 'User created!')
                })

            // Delete the test user from the database
            if (!Cypress.env('PERSIST_USERS')) {
                cy.deleteUser(email, pass)
            } else {
                // We store the new credentials inside an artifact for download later
                if (sequentialRun) {
                    Cypress.env('LAST_IN_SEQUENCE') ?
                        cy.exec(`echo '${email}:${pass}' > users.txt`) :
                        cy.deleteUser(email, pass)
                } else {
                    cy.exec(`echo '${email}:${pass}' > users.txt`)
                }
            }
        })
    })
})