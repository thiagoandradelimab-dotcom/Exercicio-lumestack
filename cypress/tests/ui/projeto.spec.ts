describe('template spec', () => {
  it('Acessar o site', () => {
    cy.visit('http://localhost:3000/signin')
  })

  it('Login Fail', () => {
    cy.visit('http://localhost:3000/signin')
    cy.get('#username').type('Admin')
    cy.get('#password').type('Admin1234')
    cy.get('button[type="submit"]').click()
    cy.contains('invalid')
  })

  it('Criar Usuário para acesso válido', () => {
    cy.visit('http://localhost:3000/signup')
    cy.get('[data-test="signup-first-name"]').type('Joao')
    cy.get('[data-test="signup-last-name"]').type('Silva')
    cy.get('[data-test="signup-username"]').type('JSilva')  
    cy.get('[data-test="signup-password"]').type('Joao1234')
    cy.get('[data-test="signup-confirmPassword"]').type('Joao1234')
    cy.get('[data-test="signup-submit"]').click()
  })

  it('Login com sucesso', () => {
    cy.visit('http://localhost:3000/signin')
    cy.get('#username').type('JSilva')
    cy.get('#password').type('Joao1234')
    cy.get('button[type="submit"]').click()
  })
  
  it('Criar Conta Bancária', () => {
    cy.visit('http://localhost:3000/signin')
    cy.get('#username').type('JSilva')
    cy.get('#password').type('Joao1234')
    cy.get('button[type="submit"]').click()
    cy.get('[data-test="sidenav-bankaccounts"]').click()
    cy.get('[data-test="user-onboarding-next"]').click({ force: true })
    cy.get('[data-test="bankaccount-bankName-input"]').type('Bradesco')
    cy.get('[data-test="bankaccount-routingNumber-input"]').type('026013444')
    cy.get('[data-test="bankaccount-accountNumber-input"]').type('951234567')
    cy.get('[data-test="bankaccount-submit"]').click()
    cy.get('data-test="user-onboarding-next"').click({ force: true })
  })
  it('Movimentação com sucesso', () => {
     cy.visit('http://localhost:3000')
     cy.get('#username').type('JSilva')
     cy.get('#password').type('Joao1234')
     cy.get('button[type="submit"]').click()
     cy.get('[data-test="nav-top-new-transaction"]').click()         
     const nomeCompleto = 'Ted Parisian'
     cy.get('[data-test="user-list-search-input"]').type('Ted Parisian', { force: true })
     cy.get('[data-test="user-list-item-uBmeaz5pX"]').click()
     cy.get('[data-test="transaction-create-amount-input"]').type('10')
     cy.get('[data-test="transaction-create-description-input"]').type('Empréstimo')
     cy.get('[data-test="transaction-create-submit-request"]').click()
     cy.get('[data-test="alert-bar-success"]').contains('Transaction Submitted')
  })

  it('Com histórico', () => {
    cy.visit('http://localhost:3000/signin')
    cy.get('#username').type('JSilva')
    cy.get('#password').type('Joao1234')
    cy.get('button[type="submit"]').click()
  })

  it('Sem histórico', () => {
    cy.visit('http://localhost:3000/signin')
    cy.get('#username').type('JSilva')
    cy.get('#password').type('Joao1234')
    cy.get('button[type="submit"]').click()
    cy.get('[data-test="nav-contacts-tab"]').click()
    cy.get('[data-test="empty-list-header"]').contains('No Transactions', {timeout:350000})
  })
})