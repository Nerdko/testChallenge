describe("Shopping Cart cycle", () => {
  const lapName = Cypress.env("laptop_name");
  const addCardButtom = "Add to cart";
  beforeEach(() => {
    cy.visit("");
    cy.contains("PRODUCT STORE").should("be.visible");
  });

  it("Should add a laptop to the cart", () => {
    //Setting listener for waithing for the Add to card event
    cy.intercept("POST", "/addtocart").as("addtocart");

    cy.get(".list-group")
      .contains("Laptops")
      .should("be.visible")
      .focus()
      .click();
    cy.get("#tbodyid")
      .should("be.visible")
      .contains(lapName)
      .should("be.visible")
      .focus()
      .click();
    cy.get(".name").contains(lapName).should("be.visible");
    cy.contains(addCardButtom).should("be.visible").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Product added");
    });
    cy.wait("@addtocart");
    cy.get("#cartur").should("be.visible").click();
    cy.get("#tbodyid").contains(lapName).should("be.visible");
  });
});
