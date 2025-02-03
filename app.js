let participantes = [];
let sorteioRealizado = false;

function adicionarAmigo() {
    let input = document.getElementById("amigo");
    let nome = input.value.trim();
    if (nome && !participantes.includes(nome)) {
        participantes.push(nome);
        input.value = "";
        exibirParticipantes();
    }
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
    }
    
    sorteioRealizado = true;
}