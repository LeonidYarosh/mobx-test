describe('Test main page', () => {
  it('toMatchSnapshot - page', () => {
    cy.matchPageSnapshots()
  })

  it('should visit main page', () => {
    cy.get('h1').contains('Sprint Board:')
    cy.get('table > tbody > tr').should(($tr) => {
      expect($tr).to.have.length(3)
    })
  })

  it('should clear table', () => {
    cy.get('.controls > button:first').click()
    cy.get('table > tbody > tr').should(($tr) => {
      expect($tr).to.have.length(0)
    })
  })

  it('should type in filter', () => {
    cy.get('.controls > input').type('jack')
    cy.get('table > tbody > tr:first > td:first').should(($td) => {
      expect($td).to.contain('Jack')
    })
  })
})
