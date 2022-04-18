function entrarSala(){
    const nome = {
        name: prompt("Qual é o seu nome?")
    }
    console.log(nome);
    verificarDisponibilidadeNome(nome);
}

function verificarDisponibilidadeNome(nome){
    const url = 'https://mock-api.driven.com.br/api/v6/uol/participants';
    const promise = axios.post(url, nome);
    console.log(promise);
    promise.catch(tratarErroDisponibilidade);
    promise.then(tratarSucessoDisponibilidade);
}

function tratarErroDisponibilidade(error){
    console.log('deu ruim');
    return false;
}

function tratarSucessoDisponibilidade(){
    console.log('deu certo');
    return true;
}

entrarSala();