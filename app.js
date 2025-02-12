let participantes = [];
let sorteioRealizado = false;
let nmForm = document.getElementById("listaAmigos");
let tipoSorteio = "";


//Escolhe o Tipo de Sorteio
function escolhaSorteio() {
    let checkTp = document.getElementsByName("tpSorteio");
    for (var i = 0; i < checkTp.length; i++) {
        if (checkTp[i].checked) 
            tipoSorteio = checkTp[i].value;
    }
    if (tipoSorteio == "") {
        alert("NECESSÁRIO ESCOLHER UM TIPO DE SORTEIO PARA PROSSEGUIR!")
        return(0);
    }
    document.getElementById('escolheSorteio').style.display = "none";  // - Esconde o Span da Escolha de Sorteio
    document.getElementById('listaSorteio').style.display = "block";   // - Exibe o Span da Lista de Sorteio
    
    //Foco no Input para Digitar o Nome
    document.getElementById("amigo").focus();
}


function adicionarAmigo() {
    let input = document.getElementById("amigo");
    let nome = input.value.trim();
    if (nome && !participantes.includes(nome)) {
        participantes.push(nome);
        input.value = "";
        exibirParticipantes();
    }
    //Conta o Numero de Pessoas do Array
    document.querySelector('#digitados').textContent = participantes.length;

    //Habilita o Botao Depois do Quarto Nome 
    if (participantes.length >=4) {
        document.getElementById("sorteio").style.display = "block";
        //Habilita ou Desabilita o Botao
        if ((participantes.length % 2) === 0) {  //PAR
            document.getElementById("btSorteio").disabled = false;
            document.getElementById("btSorteio").style.color = 'white';
            document.querySelector('#btSorteio').innerHTML = '<img src="assets/reload.png" height="36" width="36" alt="Ícone para Novo Sorteio">Fazer o Sorteio';
        } else {  //IMPAR
            document.getElementById("btSorteio").disabled = true;
            document.getElementById("btSorteio").style.color = '#0000FF';
            document.querySelector('#btSorteio').innerHTML = "Não é Possível com Essa Quantidade de Pessoas";
        }

    }

    //Mudar o Texto Assim que vc disgitar o seu nome
    if (participantes.length > 0) {
        document.querySelector('#ordem').textContent = "Digite o nome dos seus amigos";
    }

    //Foco no Input para Digitar o Nome
    document.getElementById("amigo").focus();
}

function exibirParticipantes() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    participantes.forEach(nome => {
        let item = document.createElement("li");
        item.textContent = nome;
        lista.appendChild(item);
    });
}

function sortearAmigo() {
    if (sorteioRealizado) {
        alert("O sorteio já foi realizado! Recarregue a página para fazer um novo sorteio.");
        return;
    }
    
    if (participantes.length < 2) {
        alert("É necessário pelo menos 2 participantes!");
        return;
    }
    
    let sorteados = [...participantes];
    let resultado = {};
    let disponiveis = [...participantes];
    
    for (let participante of participantes) {
        if (disponiveis.length === 1 && disponiveis[0] === participante) {
            return sortearAmigo(); // Reinicia o sorteio se houver erro
        }
        
        let indiceSorteado;
        do {
            indiceSorteado = Math.floor(Math.random() * disponiveis.length);
        } while (disponiveis[indiceSorteado] === participante);
        
        resultado[participante] = disponiveis[indiceSorteado];
        disponiveis.splice(indiceSorteado, 1);
    }
    
    let resultadoLista = document.getElementById("resultado");
    resultadoLista.innerHTML = "";
    for (let [amigo, sorteado] of Object.entries(resultado)) {
        let item = document.createElement("li");
        item.textContent = `${amigo} → ${sorteado}`;
        resultadoLista.appendChild(item);

        //Pega o seu Amigo Secreto pelo seu Nome
        if (amigo == participantes[0]) { 
            document.querySelector('#nomeSeuAmigo').textContent = sorteado;     // - Esconde o Botão de Sorteio 
            document.getElementById('seuAmigo').style.display = "block";  // - Mostra o Botão de Novo Sorteio
        }

    }
        //Apos o Sorteio
        document.getElementById('listaAmigos').style.display = "none";   // - Esconde a lista de digitados
        document.getElementById('sorteio').style.display = "none";       // - Esconde o Botão de Sorteio 
        document.getElementById('novoSorteio').style.display = "block";  // - Mostra o Botão de Novo Sorteio
    if (tipoSorteio == "0") { 
        document.getElementById('resultado').style.display = "none";   // - Esconde a lista de digitados
    }
    sorteioRealizado = true;
}


//Tecla Enter 
const inputEle = document.getElementById('amigo');
inputEle.addEventListener('keyup', function(e){
  var key = e.which || e.keyCode;
  if (key == 13) { // Codigo da Tecla Enter
    adicionarAmigo()  // Funcao Depois do Enter
  }
});