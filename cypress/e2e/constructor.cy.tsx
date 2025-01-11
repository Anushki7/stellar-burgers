describe('Страница конструктора бургера', () => {
    const categoryBun = '[data-testid=category-bun]';
    const categoryMain = '[data-testid=category-main]';
    const categorySauce = '[data-testid=category-sauce]';
    const modals = '[id=modals]';
    const button = '[type=button]';

    beforeEach(() => { // инициализируем пустое хранилище перед каждым тестом
        cy.visit('/');
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('fetchUser');
        cy.setCookie('accessToken', 'mockAccessToken');
        localStorage.setItem('refreshToken', 'testRefreshToken');
    });

    afterEach(() => { // очищаем хранилище после каждого теста
        cy.clearLocalStorage();
        cy.clearCookies();
    });

    describe('Добавление в конструктор бургеров', () => {
        beforeEach(() => {
            cy.wait('@getIngredients');
        });

        it('добавить булочки в конструктор', () => {
          cy.contains('Выберите булки').should('exist');
          cy.get(categoryBun).should('exist').contains('Добавить').click();
          cy.get('.constructor-element_pos_top')
            .contains('Краторная булка N-200i')
            .should('exist');
        });
    
        it('добавить ингредиенты в конструктор', () => {
          cy.contains('Выберите начинку').should('exist');
          cy.get(categoryMain).should('exist').contains('Добавить').click();
          cy.get('.constructor-element')
            .contains('Биокотлета из марсианской Магнолии')
            .should('exist');
        });
    
        it('добавить соусы в конструктор', () => {
          cy.contains('Выберите начинку').should('exist');
          cy.get(categorySauce).should('exist').contains('Добавить').click();
          cy.get('.constructor-element')
            .contains('Соус традиционный галактический')
            .should('exist');
        });
    });

    describe('Ингредиенты в модальном окне', () => {
        it('показать и закрыть детали ингредиента', () => {
          cy.wait('@getIngredients');
          cy.get(categoryBun).should('exist').find('li').first().click();
          cy.get(modals)
            .contains('Краторная булка N-200i')
            .should('be.visible');
          cy.get(modals).find('button').click().should('not.exist');
        });
    });
    
    describe('Обработка заказа', () => {
        it('показать данные пользователя в заголовке', () => {
          cy.wait('@fetchUser');
          cy.get('header').contains('user').should('exist');
        });
    
        it('успешно создать заказ и очистить конструктор', () => {
          cy.wait('@getIngredients');
          cy.get(categoryBun).should('exist').contains('Добавить').click();
          cy.get(categoryMain).contains('Добавить').click();
          cy.get(categoryMain).contains('Добавить').click();
          cy.get(categorySauce).contains('Добавить').click();
          cy.get(button).contains('Оформить заказ').click();

          cy.wait('@createOrder')
            .its('response.statusCode')
            .should('eq', 200);

          cy.get(modals).contains('12345').should('be.visible');
          cy.get(modals).find('button').click().should('not.exist');

          cy.get('.constructor-element_pos_top').should('not.exist');
          cy.get('.constructor-element').should('not.exist');
        });
    });
});