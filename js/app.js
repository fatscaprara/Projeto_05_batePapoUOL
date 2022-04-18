let nome;

function entrarSala() {
    nome = {
        name: prompt("Qual é o seu nome?")
    }
    console.log(nome);
    while (verificarDisponibilidadeNome(nome) === false) {
        nome.name = prompt("Nome indisponível! Digite outro nome.")
        verificarDisponibilidadeNome(nome);
    }
}

function verificarDisponibilidadeNome(nome) {
    const url = 'https://mock-api.driven.com.br/api/v6/uol/participants';
    const promise = axios.post(url, nome);
    console.log(promise);
    let disponivel;
    promise.catch(tratarErroDisponibilidade);
    promise.then(tratarSucessoDisponibilidade);
    return disponivel;
}

function tratarErroDisponibilidade() {
    console.log('deu ruim');
    disponivel = false;
}

function tratarSucessoDisponibilidade() {
    console.log('deu certo');
    disponivel = true;
}

function manterConexao() {
    const url = 'https://mock-api.driven.com.br/api/v6/uol/status';
    const promise = axios.post(url, nome);
    console.log('to on');
}

function buscarMensagens() {
    const url = 'https://mock-api.driven.com.br/api/v6/uol/messages';
    const promise = axios.get(url);
    promise.then(exibirChat);
}

function exibirChat(response) {
    console.log('buscando mensagens...')
    response.data.map(exibirMensagem);
}

function exibirMensagem(mensagem) {
    if (mensagem.type === 'status') {
        document.querySelector(".chat").innerHTML += `
        <li class="status">
            <p class="time">${mensagem.time}</p>
            <p class="from-to">${mensagem.from}</p>
            <p class="text">${mensagem.text}</p>
        </li>
        `
    }
    if (mensagem.type === 'message') {
        document.querySelector(".chat").innerHTML += `
        <li class="message">
            <p class="time">${mensagem.time}</p>
            <p class="from-to">${mensagem.from}</p>
            <p class="text">${mensagem.text}</p>
        </li>
        `
    }
    if (mensagem.type === 'private_message') {
        document.querySelector(".chat").innerHTML += `
        <li class="private_message">
            <p class="time">${mensagem.time}</p>
            <p class="from-to">${mensagem.from}</p>
            <p class="text"> reservadamente para </p>
            <p class="from-to">${mensagem.to}</p>
            <p class="text">${mensagem.text}</p>
        </li>
        `
    }
    const chat = document.querySelector('.chat');
    chat.scrollIntoView(false);
}

function enviarMensagem() {
    const url = 'https://mock-api.driven.com.br/api/v6/uol/messages';
    const mensagem = {
        from: nome.name,
        to: "Todos",
        text: document.querySelector("input").value,
        type: "message"
    }
    const promise = axios.post(url, mensagem);
    promise.catch(tratarErroMensagem);
    promise.then(tratarSucessoMensagem);
}

//enviando mensagens com a tecla enter
document.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        const btn = document.querySelector(".send-message");
        btn.click();
    }
});

function tratarErroMensagem() {
    alert("Você foi desconectado, a seguir a página será atualizada para a sua reconexão.")
    window.location.reload();
}

function tratarSucessoMensagem() {
    document.querySelector("input").value = '';
    buscarMensagens();
}

entrarSala();
setInterval(manterConexao, 4000);//4
setInterval(buscarMensagens, 3000);//3