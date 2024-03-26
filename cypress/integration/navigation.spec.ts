/// <reference types="cypress" />

export { };

describe("Navigation", () => {
    it("should render home page", () => {
        cy.visit("http://localhost:3000/");
        ///cy.get(".page-layout_page-slot-SiteContext__M5Jjr").as('sitecontext');
        ///cy.get("@sitecontext").get("select").first().select("English").should("have.value", "en").should("be.visible");
        ///cy.get("@sitecontext").get("select").eq(1).select("$ USD").should("have.value", "USD").should("be.visible");
        ///cy.get('[data-cy="context-selector-LANGUAGE"]').select('[data-cy="option-LANGUAGE-en"]').should("have.value", "en").should("be.visible");
        cy.get('[data-cy="site-context"]').as('sitecontext');
        cy.get("@sitecontext").get('[data-cy="context-selector-LANGUAGE"]').select('English').should("have.value", "en").should("be.visible");
        cy.get("@sitecontext").get('[data-cy="context-selector-CURRENCY"]').select("$ USD").should("have.value", "USD").should("be.visible");
        cy.get("label").type("tripod");

    })
})