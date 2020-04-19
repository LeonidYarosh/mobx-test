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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'

Cypress.Commands.add('matchPageSnapshots', () => {
  const sizes = [ [ 400, 3000 ], [ 1024, 3000 ], [ 1400, 3000 ] ]
  sizes.forEach((size) => {
    // cy.get('nav').invoke('css', 'display', 'none')
    // cy.get('aside').invoke('css', 'display', 'none')
    if (Cypress._.isArray(size)) {
      cy.viewport(size[0], size[1])
      cy.matchImageSnapshot(`${size[0]}`)
    }
    else {
      cy.viewport(size)
      cy.matchImageSnapshot(size)
    }
  })
})

addMatchImageSnapshotCommand()
