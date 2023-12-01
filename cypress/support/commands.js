/*In order to test the logout functionality we need a login step before testng
 * This command should not rely on UI, should be like this:
 * cy.sessions(() =>{
 *   const user = Cypress.env('user')
 *   cy.request({
 *       method: 'POST',
 *       url:Cypress.env('signup_url'),
 *       username: user.name,
 *       password: user.password
 *   }).then((responce)=>{
 *       expect(responce.status).to.be(200);
 *       });
 * })
 */
Cypress.Commands.add("login", (user) => {
  cy.get("#login2").should("be.visible").click();
  cy.get("#logInModal").should("be.visible").should("be.focused");
  cy.get("#loginusername").focus().should("be.visible").type(user.name);
  cy.get("#loginpassword")
    .focus()
    .should("be.visible")
    .type(user.password)
    .blur();
  cy.get("#logInModal")
    .find("[type=button]")
    .contains("Log in")
    .should("be.visible")
    .click();
  cy.intercept("POST", "/login").as("login");
  cy.wait("@login");
});

/*Sample command for deleting users
 *   cy.request({
 *    method: 'DELETE',
 *    url: `${Cypress.env('delete_url)}/${Cypress.env('user_id')}
 *   }).then((responce)=>{
 *      expect(responce.status).to.be(204);
 *      })
 *
 */
