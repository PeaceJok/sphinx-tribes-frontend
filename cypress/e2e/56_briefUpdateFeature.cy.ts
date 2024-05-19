describe('Update feature To Workspace', () => {
  it('Updating A Workspace Feature', () => {
    cy.login('carol');
    cy.wait(1000);

    const WorkSpaceName = 'Brief Feature Update';

    const workspace = {
      loggedInAs: 'carol',
      name: WorkSpaceName,
      description: 'We are testing out our workspace feature',
      website: 'https://community.sphinx.chat',
      github: 'https://github.com/stakwork/sphinx-tribes-frontend'
    };

    cy.create_workspace(workspace);
    cy.wait(1000);

    cy.contains(workspace.name).contains('Manage').click();
    cy.wait(1000);

    cy.get('[data-testid="mission-link"]')
      .invoke('show')
      .then(($link: JQuery<HTMLElement>) => {
        const modifiedHref = $link.attr('href');
        cy.wrap($link).invoke('removeAttr', 'target');
        cy.wrap($link).click();
        cy.url().should('include', modifiedHref);
      });
    cy.wait(1000);

    cy.contains('No mission yet');
    cy.contains('No tactics yet');

    cy.get('[data-testid="new-feature-btn"]').click();
    cy.wait(1000);

    cy.contains('Add New Feature');

    const newFeature = 'A new Feature';
    cy.get('[data-testid="feature-input"]').type(newFeature);
    cy.get('[data-testid="add-feature-btn"]').click();
    cy.wait(1000);

    cy.contains(newFeature).should('exist', { timeout: 3000 });
    cy.wait(1000);

    cy.get('[data-testid="brief-option-btn"]').click();
    cy.get('[data-testid="brief-edit-btn"]').click();

    const updatedFeature = 'Feature Brief';
    cy.get('[data-testid="brief-textarea"]').type(updatedFeature);
    cy.get('[data-testid="brief-update-btn"]').click();
    cy.wait(1000);

    cy.contains(updatedFeature).should('exist', { timeout: 1000 });

    cy.logout('carol');
  });
});
