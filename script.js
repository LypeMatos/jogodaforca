/* Elemento HTML referente a categoria */
const categoria = document.querySelector("#category");
/* Elemento HTML referente a lista das letras erradas*/
const letrasErradas = document.querySelector(".wrongLetters");
/* Elemento HTML referente a palavra oculta
   Utilizaremos esse mesmo elemento para exibir as mensagens do jogo*/
const palavraInterface = document.querySelector(".dashes");
/* Array com elementos HTML referentes aos olhos do personagem */
const olhos = Array.from(document.querySelectorAll(".eyes"));
/* Array com elementos HTML referentes as partes do corpo */
let partesBoneco = Array.from(document.querySelectorAll("#person div"));
partesBoneco = partesBoneco.slice(2, partesBoneco.length);
/* Palavra corrente */
let palavraProposta;
/* Lista das letras erradas */
let letrasErradasArray = [];
/* Index da parte do corpo corrente */
let indiceBoneco;
/* Numero de chances do jogador */
const numTentativas = 7;
/* Valor para opacidade dos olhos */
const opacidadeOlhos = 0.3;
//Criando categorias para o jogo da forca
const categorias = {
    frutas: ['banana', 'maça', 'laranja', 'mamao', 'uva', 'melancia', 'melao'],
    profissoes: ['engenheiro', 'advogado', 'medico', 'professor', 'pescador'],
    animais: ['papagaio', 'cachorro', 'galo', 'gato', 'cavalo', 'macaco', 'elefante'],
    cores: ['azul', 'branco', 'laranja', 'preto', 'vermelho', 'rosa', 'amarelo'],
}
//AQUI CRIA UMA ARRAY COM AS PROPRIEDADES DO OBJETO CATEGORIA
let arrayDeCategoria = Object.keys(categorias);

//AQUI SORTEIA UMA CATEGORIA
    function sorteioCategoria() {
        const arrayCategorias = arrayDeCategoria;
        let indiceCategoria = Math.floor(Math.random() * arrayCategorias.length);
        return arrayCategorias[indiceCategoria];
    }

//AQUI EXIBE A CATEGORIA NA TELA
function exibeCategoria() {
    categoria.innerHTML = sorteioCategoria();
}

//FUNÇÃO PARA SORTEAR A PALAVRA DA CATEGORIA ESCOLHIDA
function sorteioPalavra() {
    const arrayPalavras = categorias[categoria.innerHTML];
    let indicePalavra = Math.floor(Math.random() * arrayPalavras.length);
    palavraProposta = arrayPalavras[indicePalavra];
    console.log(palavraProposta);
    ocultaPalavra();
}

//TROCA AS LETRAS DA PALAVRA POR - PARA FICAR OCULTA NA TELA
function ocultaPalavra() {
    let palavraOcultada = '';
    for (let i = 0; i < palavraProposta.length; i++) {
        palavraOcultada += '-';
    }
    exibePalavra(palavraOcultada)
}

//AQUI EXIBE A PALAVRA SORTEADA
function exibePalavra(palavra) {
    palavraInterface.innerHTML = palavra;
}

function tentativa(letra) {
    if (palavraProposta.includes(letra)) {
        atualizaPalavra(letra);
    } else {
        letrasErradasArray.push(letra);
        letrasErradas.innerHTML = 'Letras Erradas: ' + letrasErradasArray;
        if (partesBoneco.length > indiceBoneco) {
            desenhaBoneco();
        }
    }
    verificaFimDeJogo()
}

function atualizaPalavra(letra) {
    let palavraAux = '';
    for (let index = 0; index < palavraProposta.length; index++) {
        if (palavraProposta[index] === letra) {
            palavraAux += letra;
        } else if (palavraInterface.innerHTML[index] != '-') {
            palavraAux += palavraInterface.innerHTML[index];
        } else {
            palavraAux += '-';
        }
    }
    exibePalavra(palavraAux);
}

function verificaFimDeJogo(){
    if(!palavraInterface.innerHTML.includes('-')){
        exibePalavra('Você Venceu!');
        window.removeEventListener('keypress', retornaLetra);
    }else if (letrasErradasArray.length >= numTentativas){
        desenhaOlhos();
        exibePalavra('Você perdeu!');
        window.removeEventListener('keypress', retornaLetra);
    }
}

/*
Recebe o evento do teclado e passa apenas o valor da letra para a função tentativa
*/
function retornaLetra(e) {
    tentativa(e.key);
}

/*
Desenha a parte do corpo corrente
*/
function desenhaBoneco() {
    partesBoneco[indiceBoneco].classList.remove("hide");
    indiceBoneco++;
}

/* 
Desenha os olhos do personagem
*/
function desenhaOlhos() {
    olhos.forEach((olho => {
        olho.style.opacity = 1;
        olho.style.zIndex = 10;
    }));
}

/*
Oculta as partes do corpo do personagem
*/
function ocultaBoneco() {
    olhos.forEach((olho => {
        olho.style.opacity = opacidadeOlhos;
    }));
    partesBoneco.forEach(parteBoneco => {
        parteBoneco.classList.add("hide");
    });
}

/*
Inicia as configurações do jogo
*/
function iniciaJogo() {
    indiceBoneco = 0;
    letrasErradasArray = [];
    exibeCategoria();
    sorteioPalavra();
    letrasErradas.innerHTML = "Letras erradas: ";
    window.addEventListener("keypress", retornaLetra);
}

window.addEventListener("load", iniciaJogo);