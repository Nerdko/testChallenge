const user = Cypress.env("user");
const loginButtom = "Log in";
const signupButton = "Sign up";
describe("Test user cycle", () => {
  //In order to isolate tests, we visit the page and validate we are in the spected landing page before every test
  beforeEach(() => {
    /*Here we should clean the environment by deleting the users on the system
     * Example command:
     * cy.deleteUsers();
     */
    cy.visit("/index.html");
    cy.contains("PRODUCT STORE").should("be.visible");
  });

  it("Should create a user", () => {
    //Setin up a listener for the sig up post to occur
    cy.intercept("POST", "/signup").as("signup");

    cy.contains(loginButtom).should("exist");
    cy.get("#signin2").should("be.visible").click();
    cy.get("#signInModal")
      .as("popup")
      .should("be.visible")
      .should("be.focused");
    cy.contains("Username").should("be.visible");
    cy.get("#sign-username").focus().should("have.text", "").type(user.name);
    cy.get("#sign-password")
      .focus()
      .should("have.text", "")
      .type(user.password)
      .blur();
    cy.get("@popup")
      .find("[type=button]")
      .contains(signupButton)
      .should("be.visible")
      .click();
    cy.on("window:alert", (text) => {
      //if this assertion fail, please change the user name in the cypress.env.json file
      if (text.startsWith("This user already exist")) {
        console.log(
          `Is expected that alert shows '${text}' when user already exist, will be corrected when we have access to delete command`
        );
      } else {
        expect(text).to.contains("Sign up successful.");
      }
    });
    cy.wait("@signup");
  });

  it("Should log in with created user", () => {
    //Setting up a listener for the login post to occur
    cy.intercept("POST", "/login").as("login");

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
      .contains(loginButtom)
      .should("be.visible")
      .click();
    cy.wait("@login");
    cy.contains(user.name).should("be.visible");
  });

  it("Should log out", () => {
    cy.login(user).then(() => {
      cy.contains(user.name).should("be.visible");
      cy.get("#logout2").should("exist").click();
      cy.contains(user.name).should("not.exist");
    });
  });
});
