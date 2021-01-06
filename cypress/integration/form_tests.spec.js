describe('Form tests', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/pizza')
	})
	
	const nameInput = () => cy.get('input[name="name"]')
	const pizzaSize = () => cy.get('select[name="pizzaSize"]')
	const bacon = () => cy.get('input[name="bacon"]')
	const tomato = () => cy.get('input[name="tomato"]')
	const feta = () => cy.get('input[name="feta"]')
	const spinich = () => cy.get('input[name="spinich"]')
	const specialInst = () => cy.get('textarea[name="specialInst"]')
	const submitBtn = () => cy.get('button[id="submitBtn"]')
	const response = () => cy.get('pre')


	it('Elements exist', () => {
		nameInput().should('exist')
		pizzaSize().should('exist')
		bacon().should('exist')
		tomato().should('exist')
		feta().should('exist')
		spinich().should('exist')
		specialInst().should('exist')
		submitBtn().should('exist')
		response().should('exist')

	})

	it('Name input works', () => {
		nameInput()
			.type('Luke')
			.should('have.value', 'Luke')
	})

	it('Can select multiple toppings', () => {
		bacon()
			.check()
			.should('be.checked')

		feta()
			.check()
			.should('be.checked')
	})

	it('Can submit form', () => {
		nameInput().type('Luke')
		pizzaSize().select('small')
		bacon().check()
		feta().check()
		specialInst().type('none')
		submitBtn().click()
		cy.contains(`"name": "Luke",`)

	})

})