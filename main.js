const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const button = document.querySelectorAll('.app__card-button'); //pegando todos os elementos da classe ou seja todos os botões foco, curto e longo.
const startPauseBt = document.querySelector('#start-pause')
const imgPlayPause = document.querySelector('#start-pause img')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');//objeto javaScript do tipo audio poderia ser usado o readFile() porém ele só é utilizado no caso do arquivo ser utilizado de fato, porém não é recomendado pois carrega o site.
const tempoNaTela = document.querySelector('#timer');

const pauseMusic = new Audio ('./sons/pause.mp3');
const playMusic = new Audio ('./sons/play.wav');
const playZero = new Audio ('./sons/beep.mp3');

let tempoEmSeg = 1500;
let intervaloId = null;

musica.loop = true; // ativando o looping da música pois a mesma só tem 6min.

musicaFocoInput.addEventListener('change', ()=>{
    if(musica.paused)/*propriedade do Audio*/{
        musica.play()
    } else{
        musica.pause()
    }
})

//adicionando um escutador de evento com uma função de flecha onde ao clicar no botão foco o elemento data-contexto dentro do HTML muda para foco.
focoBt.addEventListener('click',() => {
    tempoEmSeg = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')

    // html.setAttribute('data-contexto', 'foco') 
    // banner.setAttribute('src', './imagens/foco.png')
    //indicando atributo e o que será colocado no lugar.
})

//adicionando um escutador de evento com uma função de flecha onde ao clicar no botão DESCANSO CURTO o elemento data-contexto dentro do HTML muda para Descanso Curto.
curtoBt.addEventListener('click',() =>{
    tempoEmSeg = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')

    // html.setAttribute('data-contexto', 'descanso-curto')
    // banner.setAttribute('src', './imagens/descanso-curto.png')
    //indicando atributo e o que será colocado no lugar.
})

//adicionando um escutador de evento com uma função de flecha onde ao clicar no botão DESCANSO LONGO o elemento data-contexto dentro do HTML muda para Descanso Longo.
longoBt.addEventListener('click', () => {
    tempoEmSeg = 600
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')

    // html.setAttribute('data-contexto', 'descanso-longo')
    // banner.setAttribute('src', './imagens/descanso-longo.png')
    //indicando atributo e o que será colocado no lugar.
})

function alterarContexto(contexto){
    mostrarTempo()//trazendo a função de mostrar tempo para cada contexto foco, curto e longo.
    button.forEach(function(contexto){
        contexto.classList.remove('active') //removendo a class ativa dos botões quando esses não estiverem em uso.
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`) 
    //colocando entre crase pois estamos colocando uma informação de HTML (string) e no meio uma informação do java script, não esquecer que precisa colocar a informação na função do que quer que altere que é o contexto.

    switch(contexto){
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade.<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar a superfície. <br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        default:
            break;
    }
}

const contagemRegressiva = () =>{
    if(tempoEmSeg <= 0){
        playZero.play()
        alert('Tempo Finalizado!')
        zerar()
        return
    } // informando para a função que se a var for menor ou igual à 0 ele vai dar um alerta e o return vai parar o cronometro.
    tempoEmSeg -= 1
    mostrarTempo() //Necessário colocar a função de mostrar tempo na contagem ou a mesma não conta para baixo.
}
// não pode fazer evento de clique antes da funçpão ser escrita

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        pauseMusic.play();
        zerar()
        return
    }
    playMusic.play();
    iniciarOuPausarBt.textContent ='Pausar' //text content não aceita tags junto com texto. Por exemplo uma tag <strong> vai aparecer junto com o texto se colocado.
    imgPlayPause.src=('./imagens/pause.png') // alterando o item de source da imagem de play para pause. CONSEGUI SOZINHO uiiii

    intervaloId = setInterval(contagemRegressiva, 1000)
}
//setInterval é um metodo que solicita dois parâmetros, normalmente o primeiro é o metodo que deseja executar e o segundo o tempo que espera que seja ex

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent='Começar' 
    imgPlayPause.src=('./imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date (tempoEmSeg *1000)// a constante tempo foi criada para deixar claro que esse item vai receber a informação de tempo e não que está alterando a div timer do html. Estamos criando o new Date que basicamente puxa as informações do objeto nativo de data hora existente no JS, é chamado de instancia do objeto javascript
    const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'})// toLocaleString é um metodo existente no objeto Date onde ele pede alguns parametros: localidade, horas/min/sec e senpre com a quantidade de digitos.
    tempoNaTela.innerHTML = `${tempoFormatado}` // o metodo innerHTML insere texto na tela e tem que receber crase pois você está está trabalhando dentro do html e ${} pois está colocando um item do JS direto no HTML.Alterando a div timer do html.
}

mostrarTempo()//colocando ela no escopo global