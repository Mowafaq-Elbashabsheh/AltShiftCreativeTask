describe('homeComponent', () =>{
    beforeEach(() =>{
        cy.visit('http://localhost:4200');
    });

    it('clicking button on register or login', () => {
        cy.get('.logbut').click();
    });

});