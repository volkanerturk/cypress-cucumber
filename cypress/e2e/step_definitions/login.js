import {
    Given,
    When,
    Then,
  } from "@badeball/cypress-cucumber-preprocessor";
  
  Given('I go facebook url', () => {
    cy.visit('www.facebook.com')
  })
  When('Send e-mail', () => {
    cy.get('[data-testid="royal_email"]').type('test@gmail.com')
  })
  Then('Click login btn', ()=> {
    cy.get('[data-testid="royal_login_button"]').click()
  })
