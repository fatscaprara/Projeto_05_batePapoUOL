let nome;

function entrarSala(){
    nome = {
        name: prompt("Qual é o seu nome?")
    }
    console.log(nome);
    while(verificarDisponibilidadeNome(nome) === false){
        nome.name = prompt("Nome indisponível! Digite outro nome.")
        verificarDisponibilidadeNome(nome);
    }
}

function verificarDisponibilidadeNome(nome){
    const url = 'https://mock-api.driven.com.br/api/v6/uol/participants';
    const promise = axios.post(url, nome);
    console.log(promise);
    let disponivel;
    promise.catch(tratarErroDisponibilidade);
    promise.then(tratarSucessoDisponibilidade);
    return disponivel;
}

function tratarErroDisponibilidade(){
    console.log('deu ruim');
    disponivel = 'false';
}

function tratarSucessoDisponibilidade(){
    console.log('deu certo');
    disponivel = 'true';
}

function manterConexao(){
    const url = 'https://mock-api.driven.com.br/api/v6/uol/status';
    const promise = axios.post(url, nome);
    console.log('to on');
}

entrarSala();
setInterval(manterConexao, 4000);