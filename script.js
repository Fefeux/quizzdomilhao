const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const passButton = document.getElementById('pass-btn')
const helpButton = document.getElementById('help-btn')
const stopButton = document.getElementById('stop-btn')
const yellowElement = document.getElementsByClassName('yellow')
const premioElement = document.getElementById('premio')



let helpUse = false
let passLimit = 3
let shuffledQuestions, currentQuestionIndex

stopButton.addEventListener('click', stopGame)
helpButton.addEventListener('click',help)
passButton.addEventListener('click', passQuestion)
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  window.alert("REGRAS DO JOGO: O JOGO É COMPOSTO DE 3 RODADAS E UMA PERGUNTA FINAL. SELECINONE A ALTERNATIVA CORRETA DE CADA PERGUNTA E PRESSIONE 'PRÓX' PARA AVANÇAR PARA PRÓXIMA PERGUNA. ---- VOCÊ PODE PULAR PERGUNTAS 3 VEZES, NÃO MAIS QUE ISSO, CLICANDO EM 'PULO' ----- VOCÊ PODE PEDIR AJUDA, ASSIM O COUMPUTADOR DECIDE SE VAI TE AJUDAR TIRANDO 1, 2 OU 3 ALTERNATIVAS ERRADAS DAS OPÇÕES, AUMENTANDO SUAS CHANCES DE CHUTE. ------- SE A TELA FICAR VERMELHA, NÃO TRAPACEIE E REINICIE O JOGO. ISSO É TUDO, AGORA VÁ ATRÁS DOS SEUS TÃO DESEJADOS 1 MILHÃO DE REAIS E BOA SORTE!! "),2000
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()

  var audio = new Audio('music.mp3');
audio.play();

}

function help(){ 
  
  
  var numCard = Math.floor(Math.random() * 3)+1
    helpButton.innerText = ("Help = " + numCard)
    answers = answerButtonsElement.children;
    for (var i = 0; i<=answers.length; i++) {
        if (!answers[i].dataset.correct) {
         
          setStatusClass(answers[i], answers[i].dataset.correct);
          answers[i].disabled = true
          numCard--;
          if (numCard==0 ) {
           
            break;
          }
        }
      }
      helpUse = true 
}

function passQuestion(){
  if (passLimit > 0) {
    currentQuestionIndex++
    setNextQuestion()
  
  }
  if (passLimit == 1){
    passButton.classList.add('hide')
  }
  passLimit--
  currentQuestionIndex--
}

function setNextQuestion() {  price()
  resetState()
  if (currentQuestionIndex > 15){
    end()
 }
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  if (passLimit == 0) {
    passButton.classList.add('hide')
  }else{
    passButton.classList.remove('hide')
  }
  stopButton.classList.remove('hide')
  if (!helpUse){
    helpButton.classList.remove('hide')
  }else{
    helpButton.classList.add('hide')
  }
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}


function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    passButton.classList.add('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

function stopGame() {
  
  document.getElementById('parou').play();

  setTimeout(window.alert("Você clickou em STOP "),2000)
  resetState()
  currentQuestionIndex = 0
  passLimit = 3
  helpUse = false 
  passButton.classList.add('hide')
  helpButton.classList.add('hide')
  stopButton.classList.add('hide')
  questionContainerElement.classList.add('hide')
  startButton.classList.remove('hide')
  setTimeout(window.location.reload(),2000)
}


function end(){
  window.alert("PARABÉNS! VOCÊ ACABA DE GANHAR 1 MILHÃO DE REAIS")
  document.getElementById('milhao').play();
  window.location.reload()
}

function price (){
  if (currentQuestionIndex === 5){
    window.alert("Parabéns! Você agora possui 5mil reais")
  }
  if (currentQuestionIndex === 10){
    window.alert("Parabéns! Você agora possui 50mil reais")
  }
  if (currentQuestionIndex === 15){
    document.getElementById('ultima').play();
    window.alert("Parabéns! Você agora possui 500mil reais")
  }

}


const questions = [
  {
    question: 'Qual é o nome dado ao estado da água em forma de gelo?',
    
    answers: [
      { text: 'SÓLIDO', correct: true },
      { text: 'LÍQUIDO', correct: false },
      { text: 'GASOSO', correct: false },
      { text: 'GELOSO', correct: false }
    ]
  },
  {
    question: 'Quem foi o criador dos personagens Pedrinho, Narizinho e Emília?',
    answers: [
      { text: 'Machado de Assis', correct: false },
      { text: 'Monteiro Lobato', correct: true },
      { text: 'Ziraldo', correct: false },
      { text: 'Maurício de Souza', correct: false }
    ]
  },
  {
    question: 'Quem fundou a Microsoft?',
    answers: [
      { text: 'Steve Jobs', correct: false },
      { text: 'Principe Charles', correct: false },
      { text: 'Maicon Souza', correct: false },
      { text: 'Bill Gates', correct: true }
    ]
  },
  {
    question: 'Qual é o nome dado ao pneu reserva do carro? ',
    answers: [
      { text: 'Calota', correct: false },
      { text: 'Estepe', correct: true },
      { text: 'Solteirão', correct: false },
      { text: 'Macaco', correct: false }
    ]
  },
  {
    question: 'Qual nome do cachorro medroso do Salsicha, dos desenhos animados? ',
    answers: [
      { text: 'Coragem', correct: false },
      { text: 'Scooby-Doo', correct: true },
      { text: 'Krypto', correct: false },
      { text: 'Floquinho', correct: false }
    ]
  },
  {
    question: 'Quantos signos formam o zodíaco? ',
    answers: [
      { text: '9', correct: false },
      { text: '10', correct: false },
      { text: '11', correct: false},
      { text: '12', correct: true }
    ]
  },
  {
    question: 'Qual é o nome dado ao pneu reserva do carro? ',
    answers: [
      { text: 'Calota', correct: false },
      { text: 'Estepe', correct: true },
      { text: 'Solteirão', correct: false },
      { text: 'Macaco', correct: false }
    ]
  },
  {
    question: 'Quem foi o grande amor de Julieta? ',
    answers: [
      { text: 'Plebeu', correct: false },
      { text: 'Romeu', correct: true },
      { text: 'Roteu', correct: false },
      { text: 'Ronosso', correct: false }
    ]
  },
  {
    question: 'Qual é o réptil muda de cor de acordo com o ambiente em que está? ',
    answers: [
      { text: 'Réptil', correct: false },
      { text: 'Lagarto', correct: false },
      { text: 'Camaleão', correct: true },
      { text: 'Jacaré', correct: false }
    ]
  },
  {
    question: 'Onde fica o centro cinematográfico dos EUA?',
    answers: [
      { text: 'Nova York', correct: false },
      { text: 'Bolywood', correct: false },
      { text: 'Nova Jersey', correct: false },
      { text: 'Holywood', correct: true }
    ]
  },
  
  {
    question: 'Qual é o nome da ponte que liga o Rio de Janeiro à Niterói? ',
    answers: [
      { text: 'Ponte Rio-Niterói', correct: true },
      { text: 'Golden Bridge', correct: false },
      { text: 'Ponte José Augusto', correct: false},
      { text: 'Ponte do ponto', correct: false }
    ]
  },
  {
    question: 'O que é medido por um termômetro? ',
    answers: [
      { text: 'Força', correct: false },
      { text: 'Temperatura', correct: true },
      { text: 'Altura', correct: false },
      { text: 'Magnitude', correct: false }
    ]
  },
  {
    question: 'Qual é a moeda oficial dos Estados Unidos? ',
    answers: [
      { text: 'Coin', correct: false },
      { text: 'Euro', correct: false },
      { text: 'Dólar', correct: true },
      { text: 'Trumper', correct: false }
    ]
  },
  {
    question: 'Quantas folhas tem o trevo da sorte? ',
    answers: [
      { text: 'Não tem folhas', correct: false },
      { text: 'Duas folhas', correct: false },
      { text: 'Três folhas', correct: false },
      { text: 'Quatro folhas', correct: true }
    ]
  },
  {
    question: 'Turmalina é uma espécie de que? ',
    answers: [
      { text: 'Pedra', correct: true },
      { text: 'Flor', correct: false },
      { text: 'Fruto', correct: false },
      { text: 'Verdura', correct: false }
    ]
  },
  {
    question: 'Que metal em contato com a umidade cria uma camada vermelha? ',
    answers: [
      { text: 'Ouro', correct: false },
      { text: 'Ferro', correct: true },
      { text: 'Platina', correct: false },
      { text: 'Mercúrio', correct: false }
    ]
  },
  {
    question: 'Qual é o réptil muda de cor de acordo com o ambiente em que está? ',
    answers: [
      { text: 'Réptil', correct: false },
      { text: 'Lagarto', correct: false },
      { text: 'Camaleão', correct: true },
      { text: 'Jacaré', correct: false }
    ]
  },

  {
    question: 'Qual é o réptil muda de cor de acordo com o ambiente em que está? ',
    answers: [
      { text: 'Réptil', correct: false },
      { text: 'Lagarto', correct: false },
      { text: 'Camaleão', correct: true },
      { text: 'Jacaré', correct: false }
    ]
  },

  {
    question: 'Qual é o nome da cor que é a junção de todas as outras? ',
    answers: [
      { text: 'Roxo', correct: false },
      { text: 'Marrom', correct: false },
      { text: 'Preto', correct: false },
      { text: 'Branco', correct: true }
    ]
  },
  {
  question: 'Quem é a namorada do Mickey? ',
    answers: [
      { text: 'Minney', correct: true },
      { text: 'Cisney', correct: false },
      { text: 'Margarida', correct: false },
      { text: 'Florescida', correct: false }
    ]
  },
  {
    question: 'A água ferve à quantos graus centígrados? ',
      answers: [
        { text: '100', correct: true },
        { text: '200', correct: false },
        { text: '300', correct: false },
        { text: '400', correct: false }
      ]
    },
    {
      question: 'Qual personagem da tumra da Mônica que tem apenas 5 fios de cabelo? ',
        answers: [
          { text: 'Mônica', correct: false },
          { text: 'Magali', correct: false },
          { text: 'Cebolinha', correct: true },
          { text: 'Cascão', correct: false }
        ]
      },
      {
        question: 'Quantos centavos equivalem à um real?',
          answers: [
            { text: '60 centavos', correct: false },
            { text: '120 centavos', correct: false },
            { text: '100 centavos', correct: true },
            { text: '10 centavos', correct: false }
          ]
        },
        {
          question: 'De acordo com a bíblia, qual era o fruto proibido?',
            answers: [
              { text: 'Maçã', correct: true },
              { text: 'Banana', correct: false },
              { text: 'Uva', correct: false },
              { text: 'Abacaxi', correct: false }
            ]
          },
          {
            question: 'O saquê é uma bebida típica de qual país?',
              answers: [
                { text: 'Estados Unidos', correct: false},
                { text: 'Japão', correct: true },
                { text: 'Noruega', correct: false},
                { text: 'Tailandia', correct: false }
              ]
            },
            {
              question: 'Um adulto sadio tem quantos dentes na boca??',
                answers: [
                  { text: '28', correct: false },
                  { text: '40', correct: false },
                  { text: '32', correct: true },
                  { text: '20', correct: false }
                ]
              },
              {
                question: 'Cavalo, rainha e torre são peças de que jogo?',
                  answers: [
                    { text: 'Quadribol', correct: false },
                    { text: 'Futebol', correct: false },
                    { text: 'Tic-tac-toe', correct: false },
                    { text: 'Xadrez', correct: true }
                  ]
                },
                {
                  question: 'Qual significado da frase inglesa "I love you"?',
                    answers: [
                      { text: 'Vou te pegar', correct: false },
                      { text: 'Eu te odeio', correct: false },
                      { text: 'Eu te adoro', correct: false},
                      { text: 'Eu te amo', correct: true }
                    ]
                  },
                  {
                    question: 'Qual é a cor da pedra Rubi?',
                      answers: [
                        { text: 'Azul', correct: false },
                        { text: 'Vermelho', correct: true },
                        { text: 'Amarelo', correct: false },
                        { text: 'Verde', correct: false }
                      ]
                    },
                    {
                      question: 'Qual é a cor da pedra Esmeralda?',
                        answers: [
                          { text: 'Azul', correct: false },
                          { text: 'Vermelho', correct: false },
                          { text: 'Amarelo', correct: false },
                          { text: 'Verde', correct: true }
                        ]
                      },
                      {
                        question: 'Qual é a cor da pedra Citrino?',
                          answers: [
                            { text: 'Azul', correct: false },
                            { text: 'Vermelho', correct: false },
                            { text: 'Amarelo', correct: true },
                            { text: 'Verde', correct: false }
                          ]
                        },
                        {
                          question: 'Qual é a planta que fortalece o marinheiro Popeye?',
                            answers: [
                              { text: 'Brocolis', correct: false },
                              { text: 'Espinafre', correct: true },
                              { text: 'Rúcula', correct: false },
                              { text: 'Salsinha', correct: false }
                            ]
                          },
                          {
                            question: 'Qual é o país do Tango?',
                              answers: [
                                { text: 'Espanha', correct: false },
                                { text: 'Bolívia', correct: true },
                                { text: 'Argentina', correct: false },
                                { text: 'Cuba', correct: false }
                              ]
                            },
                            {
                              question: 'O que é um oboé?',
                                answers: [
                                  { text: 'Comida', correct: false },
                                  { text: 'Ritmo de dança', correct: true },
                                  { text: 'instrumento', correct: false },
                                  { text: 'Vulcão', correct: false }
                                ]
                              },
                              {
                                question: 'No filme, quem era o parceiro de crimes de Bonnie?',
                                  answers: [
                                    { text: 'Clyde', correct: true },
                                    { text: 'Syde', correct: false },
                                    { text: 'Flight', correct: false },
                                    { text: 'Pait', correct: false }
                                  ]
                                },

              
          

]


                                                 /* ---------------- webcam----------- */
                                                 var constraints = {
                                                  video: true
                                                };
                                                
                                                var video = document.querySelector('video');
                                                
                                                function handleSuccess(stream) {
                                                  window.stream = stream; // only to make stream available to console
                                                  video.srcObject = stream;
                                                }
                                                
                                                function handleError(error) {
                                                  console.log('getUserMedia error: ', error);
                                                }
                                                
                                                navigator.mediaDevices.getUserMedia(constraints).
                                                  then(handleSuccess).catch(handleError);

                                              
                                                  