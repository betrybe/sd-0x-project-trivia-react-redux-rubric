const INPUT_PLAYER_NAME_SELECTOR = '[data-testid="input-player-name"]';
const INPUT_PLAYER_EMAIL_SELECTOR = '[data-testid="input-gravatar-email"]';
const BUTTON_PLAY_SELECTOR = '[data-testid="btn-play"]';
const HEADER_IMAGE_SELECTOR = '[data-testid="header-profile-picture"]';
const HEADER_NAME_SELECTOR = '[data-testid="header-player-name"]';
const HEADER_SCORE_SELECTOR = '[data-testid="header-score"]';
const QUESTION_CATEGORY_SELECTOR = '[data-testid="question-category"]';
const QUESTION_TEXT_SELECTOR = '[data-testid="question-text"]';
const CORRECT_ALTERNATIVE_SELECTOR = '[data-testid="correct-answer"]';
const WRONG_ALTERNATIVES_SELECTOR = '[data-testid*="wrong-answer"]';
const LOCAL_STORAGE_STATE_KEY = 'state';
const BUTTON_NEXT_QUESTION_SELECTOR = '[data-testid="btn-next"]';
const FEEDBACK_TEXT_SELECTOR = '[data-testid="feedback-text"]';

const BUTTON_SETTINGS_SELECTOR = '[data-testid="btn-settings"]';
const SETTINGS_TITLE_SELECTOR = '[data-testid="settings-title"]';
const TOKEN_KEY = 'token';

const name = 'Nome da pessoa';
const email = 'email@pessoa.com';

const name1 = 'Nome da pessoa';
const email1 = 'email@pessoa.com';

const name2 = 'Outra pessoa';
const email2 = 'outra@pessoa.com';

const name3 = 'Mais uma pessoa';
const email3 = 'mais@pessoa.com';

const LOCAL_STORAGE_RANKING_KEY = 'ranking';
const BUTTON_RANKING_SELECTOR = '[data-testid="btn-ranking"]';
const RANKING_TITLE_SELECTOR = '[data-testid="ranking-title"]';
const RANKING_PLAYERS_NAME_SELECTOR = '[data-testid*="player-name"]';
const BUTTON_GO_HOME_SELECTOR = '[data-testid="btn-go-home"]';

const FEEDBACK_TOTAL_SCORE_SELECTOR = '[data-testid="feedback-total-score"]';
const FEEDBACK_TOTAL_QUESTION_SELECTOR = '[data-testid="feedback-total-question"]';
const BUTTON_PLAY_AGAIN_SELECTOR = '[data-testid="btn-play-again"]';

// login

describe('1 - [TELA DE LOGIN] Crie a tela de login, onde a pessoa que joga deve preencher as informações para iniciar um jogo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Será validado se é possível escrever o nome da pessoa jogadora', () => {
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type('Nome da pessoa');
  });

  it('Será validado se é possível escrever o email da pessoa jogadora', () => {
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type('email@pessoa.com');
  });

  it('Será validado se o botão Jogar está desabilitado quando a pessoa jogadora não preencher nenhum campo', () => {
    cy.get(BUTTON_PLAY_SELECTOR).should('be.disabled');
  });

  it('Será validado se o botão Jogar está desabilitado quando a pessoa jogadora escrever apenas o nome', () => {
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type('Nome da pessoa');
    cy.get(BUTTON_PLAY_SELECTOR).should('be.disabled');
  });

  it('Será validado se o botão Jogar está desabilitado quando a pessoa jogadora escrever apenas o email', () => {
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type('email@pessoa.com');
    cy.get(BUTTON_PLAY_SELECTOR).should('be.disabled');
  });

  it('Será validado se o botão Jogar está habilitado quando a pessoa jogadora preencher os campos de nome e email', () => {
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type('Nome da pessoa');
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type('email@pessoa.com');
    cy.get(BUTTON_PLAY_SELECTOR).should('not.be.disabled');
  });
});

describe('2 - [TELA DE LOGIN] Crie o botão de iniciar o jogo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
  });

  it('Será validado se ao clicar no botão Jogar o jogo é iniciado salvando um token de jogador', () => {
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type('Nome da pessoa');
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type('email@pessoa.com');
    cy.get(BUTTON_PLAY_SELECTOR).click().should(() => {
      expect(localStorage.getItem(TOKEN_KEY)).not.to.be.null;
    });
  });
});

describe('3 - [TELA DE LOGIN] Crie um botão na tela inicial que leve para a tela de configurações', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Será validado se o botão existe na página', () => {
    cy.get(BUTTON_SETTINGS_SELECTOR).should('exist');
  });

  it('Será validado se a tela de configurações possui um título', () => {
    cy.get(BUTTON_SETTINGS_SELECTOR).click();
    cy.get(SETTINGS_TITLE_SELECTOR).should('exist');
  });
});

// game

describe('4 - [TELA DE JOGO] Crie um _header_ que deve conter as informações da pessoa jogadora', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(HEADER_NAME_SELECTOR);
  });

  it('Será validado se a imagem do Gravatar está presente no header', () => {
    cy.get(HEADER_IMAGE_SELECTOR).should('exist');
  });

  it('Será validado se o nome da pessoa está presente no header', () => {
    cy.get(HEADER_NAME_SELECTOR).contains(name);
  });

  it('Será validado se o placar zerado está presente no header', () => {
    cy.get(HEADER_SCORE_SELECTOR).contains('0');
  });
});

describe('5 - [TELA DE JOGO] Crie a página de jogo que deve conter as informações relacionadas à pergunta', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  afterEach(() => {
    const storage = Object.keys(localStorage).length;
    expect(storage).to.be.lessThan(4);
  });

  it('Será validado se a categoria da pergunta está presente', () => {
    cy.get(QUESTION_CATEGORY_SELECTOR).should('exist');
  });

  it('Será validado se o texto da pergunta está presente', () => {
    cy.get(QUESTION_TEXT_SELECTOR).should('exist');
  });

  it('Será validado se as alternativas estão presentes', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('exist');
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('exist');
  });
});

describe('6 - [TELA DE JOGO] Desenvolva o jogo onde só deve ser possível escolher uma resposta correta por pergunta', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('Será validado se a quantidade de alternativas corretas é 1', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.length', 1);
  });
});

describe('7 - [TELA DE JOGO] Desenvolva o estilo que, ao clicar em uma resposta, a correta deve ficar verde e as incorretas, vermelhas', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('Será validado se a cor da alternativa correta é "rgb(6, 240, 15)" ao acertar a questão', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border-color', 'rgb(6, 240, 15)');
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border-style', 'solid');
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border-width', '3px');
  });

  it('Será validado se a cor das alternativas incorretas é "rgb(255, 0, 0)" ao acertar a questão', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border-color', 'rgb(255, 0, 0)');
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border-style', 'solid');
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border-width', '3px');
  });

  it('Será validado se a cor da alternativa correta é "rgb(6, 240, 15)" ao errar a questão', () => {
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border-color', 'rgb(6, 240, 15)');
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border-style', 'solid');
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border-width', '3px');
  });

  it('Será validado se a cor das alternativas incorretas é "rgb(255, 0, 0)" ao errar a questão', () => {
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border-color', 'rgb(255, 0, 0)');
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border-style', 'solid');
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border-width', '3px');
  });
});

describe('8 - [TELA DE JOGO] Desenvolva um timer onde a pessoa que joga tem 30 segundos para responder', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('Será validado se é possível aguardar 5 segundos e responder a alternativa correta', () => {
    cy.wait(5000);
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('not.be.disabled').click();
  });

  it('Será validado se ao aguardar mais de 30 segundos para responder, todos botões estão desabilitados', () => {
    cy.wait(32000);
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('be.disabled');
  });
});

describe('9 - [TELA DE JOGO] Crie o placar com as seguintes características:', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(HEADER_SCORE_SELECTOR);
  });

  afterEach(() => {
    const storage = Object.keys(localStorage).length;
    expect(storage).to.be.lessThan(4);
  });

  it('Será validado se os pontos são somados ao acertar uma questão', () => {
    const then = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click().then(() => {
      const now = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(then.player.score).to.be.lt(now.player.score);
    });
  });

  it('Será validado se os pontos não são somados ao errar uma questão', () => {
    const then = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click().then(() => {
      const now = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(then.player.score).to.be.eq(now.player.score);
    });
  });
});

describe('10 - [TELA DE JOGO] Crie um botão de \"Próxima\" que apareça após a resposta ser dada', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(QUESTION_TEXT_SELECTOR);
  });

  it('Será validado se o botão de próxima pergunta não é visível no início do jogo', () => {
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).should('not.be.visible');
  });

  it('Será validado se o botão de próxima pergunta é visível quando a pergunta é respondida corretamente', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).should('be.visible');
  });

  it('Será validado se o botão de próxima pergunta é visível quando a pergunta é respondida incorretamente', () => {
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).should('be.visible');
  });
});

describe('11 - [TELA DE JOGO] Desenvolva o jogo de forma que a pessoa que joga deve responder 5 perguntas no total', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(HEADER_SCORE_SELECTOR);
  });

  afterEach(() => {
    const storage = Object.keys(localStorage).length;
    expect(storage).to.be.lessThan(4);
  });

  it('Será validado se os pontos são somados de forma correta ao acertar todas as respostas', () => {
    const before = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click().then(() => {
      const after = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(before.player.score).to.be.lt(after.player.score);
    });
  });

  it('Será validado se os pontos são somados de forma correta ao errar todas as respostas', () => {
    const before = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click().then(() => {
      const after = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(before.player.score).to.be.eq(after.player.score);
    });
  });

  it('Será validado se a pessoa usuária é redirecionada para a tela de _feedback_ após a quinta pergunta', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(FEEDBACK_TEXT_SELECTOR).should('exist');
  });
});

// feedback

describe('12 - [TELA DE FEEDBACK] Desenvolva o header de _feedback_ que deve conter as informações da pessoa jogadora', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
  });

  afterEach(() => {
    const storage = Object.keys(localStorage).length;
    expect(storage).to.be.lessThan(4);
  });

  it('Será validado se a imagem do Gravatar está presente no header', () => {
    cy.get(HEADER_IMAGE_SELECTOR).should('exist');
  });

  it('Será validado se o nome da pessoa está presente no header', () => {
    cy.get(HEADER_NAME_SELECTOR).contains(name);
  });

  it('Será validado se o placar com o valor atual está presente no header', () => {
    cy.get(HEADER_SCORE_SELECTOR).should(($el) => {
      const state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(parseInt($el.text())).to.be.eq(state.player.score);
    });
  });
});

describe('13 - [TELA DE FEEDBACK] Crie a mensagem de _feedback_ para ser exibida a pessoa usuária', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('Será validado se ao acertar menos de 3 perguntas a mensagem de _feedback_ é "Podia ser melhor..."', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(FEEDBACK_TEXT_SELECTOR).contains('Podia ser melhor...');
  });

  it('Será validado se ao acertar 3 perguntas a mensagem de _feedback_ é "Mandou bem!"', () => {
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(FEEDBACK_TEXT_SELECTOR).contains('Mandou bem!');
  });

  it('Será validado se ao acertar mais de 3 perguntas a mensagem de _feedback_ é "Mandou bem!"', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(FEEDBACK_TEXT_SELECTOR).contains('Mandou bem!');
  });
});

describe('14 - [TELA DE FEEDBACK] Exiba as informações relacionadas aos resultados obtidos para a pessoa usuária', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  afterEach(() => {
    const storage = Object.keys(localStorage).length;
    expect(storage).to.be.lessThan(4);
  });

  it('Será validado se o número exibido é correto quando a pessoa usuária não acerta nenhuma pergunta', () => {
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(FEEDBACK_TOTAL_SCORE_SELECTOR).should(($el) => {
      const state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(parseInt($el.text())).to.be.eq(state.player.score);
    });
    cy.get(FEEDBACK_TOTAL_QUESTION_SELECTOR).should(($el) => {
      const state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(parseInt($el.text())).to.be.eq(state.player.assertions);
    });
  });

  it('Será validado se o número exibido é correto quando a pessoa usuária acerta 2 perguntas', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(FEEDBACK_TOTAL_SCORE_SELECTOR).should(($el) => {
      const state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(parseInt($el.text())).to.be.eq(state.player.score);
    });
    cy.get(FEEDBACK_TOTAL_QUESTION_SELECTOR).should(($el) => {
      const state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(parseInt($el.text())).to.be.eq(state.player.assertions);
    });
  });

  it('Será validado se o número exibido é correto quando a pessoa usuária acerta 4 perguntas', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(FEEDBACK_TOTAL_SCORE_SELECTOR).should(($el) => {
      const state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(parseInt($el.text())).to.be.eq(state.player.score);
    });
    cy.get(FEEDBACK_TOTAL_QUESTION_SELECTOR).should(($el) => {
      const state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(parseInt($el.text())).to.be.eq(state.player.assertions);
    });
  });
});

describe('15 - [TELA DE FEEDBACK] Crie a opção para a pessoa jogadora poder jogar novamente', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
  });

  it('Será validado se a pessoa é redirecionada para tela inicial ao clicar no botão "Jogar novamente"', () => {
    cy.get(BUTTON_PLAY_AGAIN_SELECTOR).click();
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).should('exist');
  });
});

describe('16 - [TELA DE FEEDBACK] Crie a opção para a pessoa jogadora poder visualizar a tela de _ranking_', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
  });

  it('Será validado se ao clicar no botão "Ver Ranking" a pessoa é redirecionada para tela de ranking', () => {
    cy.get(BUTTON_RANKING_SELECTOR).click();
    cy.get(RANKING_TITLE_SELECTOR).should('exist');
  });
});

// ranking

describe('17 - [TELA DE RANKING] Crie a tela de _ranking_', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name1);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email1);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(BUTTON_RANKING_SELECTOR).click();
  });

  afterEach(() => {
    const storage = Object.keys(localStorage).length;
    expect(storage).to.be.lessThan(4);
  });

  it('Será validado se existe uma pessoa no _ranking_', () => {
    cy.get(RANKING_PLAYERS_NAME_SELECTOR).should(($el) => {
      expect($el).to.have.lengthOf(1);
    });
  });

  it('Será validado se existem duas pessoas no _ranking_', () => {
    cy.get(BUTTON_GO_HOME_SELECTOR).click();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).clear();
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).clear();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name2);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email2);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(BUTTON_RANKING_SELECTOR).click();

    cy.get(RANKING_PLAYERS_NAME_SELECTOR).should(($el) => {
      expect($el).to.have.lengthOf(2);
    });
  });

  it('Será validado se o _ranking_ é ordenado pela pontuação', () => {
    cy.get(BUTTON_GO_HOME_SELECTOR).click();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).clear();
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).clear();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name2);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email2);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(BUTTON_RANKING_SELECTOR).click();

    cy.get(BUTTON_GO_HOME_SELECTOR).click();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).clear();
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).clear();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name3);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email3);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(BUTTON_RANKING_SELECTOR).click();

    const ranking = [name1, name3, name2];

    cy.get(RANKING_PLAYERS_NAME_SELECTOR).should(($el) => {
      expect($el).to.have.lengthOf(3);
    });

    cy.get(RANKING_PLAYERS_NAME_SELECTOR).each(($el, $index) => {
      expect($el.text()).to.be.eq(ranking[$index]);
    });
  });
});

describe('18 - [TELA DE RANKING] Crie um botão para ir ao início', () => {
  it('Será validado se ao clicar no botão a pessoa volta para a tela inicial', () => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name1);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email1);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(BUTTON_RANKING_SELECTOR).click();
    cy.get(BUTTON_GO_HOME_SELECTOR).click();
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).should('exist');
  
    const storage = Object.keys(localStorage).length;
    expect(storage).to.be.lessThan(4);
  });
});
