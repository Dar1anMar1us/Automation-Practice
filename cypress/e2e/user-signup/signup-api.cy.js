/// <reference types="cypress" />

const { generateRandomPassword } = require("../utils/common");

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
        cy.exec(`curl -X POST -H "Content-Type: multipart/form-data" \
            -F "name=John Doe" \
            -F "email=${generateRandomPassword(12)}@example.com" \
            -F "password=${generateRandomPassword(12)}" \
            -F "title=Mr" \
            -F "birth_date=10" \
            -F "birth_month=05" \
            -F "birth_year=1990" \
            -F "firstname=John" \
            -F "lastname=Doe" \
            -F "company=Acme Inc." \
            -F "address1=123 Main St" \
            -F "address2=Apt 4B" \
            -F "country=United States" \
            -F "zipcode=12345" \
            -F "state=California" \
            -F "city=Los Angeles" \
            -F "mobile_number=1234567890" \
            https://automationexercise.com/api/createAccount`)
            .then((response) => {
                // Handle the response (stdout)
                console.log('Curl Response:', response.stdout)
                const jsonResponse = JSON.parse(response.stdout)
                cy.wrap(jsonResponse.responseCode).should('eq', 201)
                cy.wrap(jsonResponse.message).should('eq', 'User created!')
            });
    });
})