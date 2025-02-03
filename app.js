let participantes = [];
let sorteioRealizado = false;

// Adiciona amigos no sorteio
function adicionarAmigo() {
    let input = document.getElementById('amigo');
    let nome = input.value.trim();
    if (nome && !participantes.includes(nome)) {
        participantes.push(nome);
        input.value = "";
        exibirParticipantes();
    }
}

// Exibe os participantes
function exibirParticipantes() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = "";
    participantes.forEach(nome => {
        let item = document.createElement('li');
        item.textContent = nome;
        lista.appendChild(item);
    });
}

// Sorteia apenas um nome
function sortearAmigo() {
    if (sorteioRealizado) {
        alert('O sorteio já foi realizado! Recarregue a página para fazer um novo sorteio.');
        return;
    }
    
    if (participantes.length < 1) {
        alert('É necessário pelo menos 1 participante!');
        return;
    }
    
    let indiceSorteado = Math.floor(Math.random() * participantes.length);
    let amigoSorteado = participantes[indiceSorteado];
    
    // Exibir resultado do sorteio
    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<p>Seu amigo secreto é: <strong>${amigoSorteado}</strong></p>`;

        // Remover nomes digitados após o sorteio
        document.getElementById('listaAmigos').innerHTML = ""; 
        document.getElementById('amigo').value = '';  
    
    
    sorteioRealizado = true;
}
