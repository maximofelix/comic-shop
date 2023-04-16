// Lê o localStorage e se não existir a entrada, cria uma lista vazia
const pessoas = JSON.parse(localStorage.getItem("usuarios") || [])

function atualizar(){
    console.log('atualizar()')
    if (pessoas == null)
        return;
    const tabela = document.getElementById("tabUsuarios");
    //  tabela.childNodes.forEach(linha => {
    //      input.log('removendo '  + linha)
    // //     // tabela.removeChild(linha)
    //  });
    
     const filtrado = []
     console.log('check...: ' + document.getElementById("chkFeminino").checked);
     if (document.getElementById("chkFeminino").checked){
            const filtro = filtrado.concat(pessoas.filter((p) => p.sexo == "F"))
            while (filtro.length) {
                filtrado.push(filtro.shift());
            }
    }
    if (document.getElementById("chkMasculino").checked){
            const filtro = filtrado.concat(pessoas.filter((p) => p.sexo == "M"))
            while (filtro.length) {
                filtrado.push(filtro.shift());
            }
    }

     filtrado.forEach(pessoa => {    
        tabela.appendChild(criarLinha(pessoa));
    });
}

function carregar(){
    console.log('carregar()')
    const query = window.location.search;
    const param = new URLSearchParams(query);
    const _login = param.get('login');
    const _opera = param.get('op');
    
    console.log('usuário informado..: ' + _login)
    
    if (_login == null){ 
        return;
    }

    var pessoa = null;
    pessoas.forEach(pes => {
        if (pes.login == _login)
            pessoa = pes
    });

    const btn = document.getElementById('btnCadastrar');
    if (pessoa == null) {
        //alert(`usuário [${_login}] não localizado`)
        //return;
        pessoa = new Pessoa('','', null, 'M', '', _login, ''); 
    }
    else{
        btn.innerHTML = 'Alterar'
    }
    console.log('entrou')
    console.log(pessoa.login)
    carregarPessoa(pessoa)
}

function carregarPessoa(pessoa){    
    console.log('carregarPessoa()')
    document.getElementById("txtNome").value = pessoa.nome;
    document.getElementById("txtEmail").value = pessoa.email;
    document.getElementById("txtDataNasc").value = pessoa.dataNasc;
    document.getElementById("cbxSexo").value = pessoa.sexo;
    document.getElementById("txtEndereco").value = pessoa.endereco;
    document.getElementById("txtLogin").value = pessoa.login;
    document.getElementById("txtSenha").value = pessoa.senha;
}

function criarLinha(pessoa){
    console.log('criarlinha()')
    const linha = document.createElement("tr");
    const tdlogin = document.createElement("td");
    tdlogin.setAttribute("id", pessoa.login);
    
    const link = document.createElement('a');
    link.href = "../cadastro/?login=" + pessoa.login;
    link.target = '_top'
    link.innerHTML = pessoa.login;
    tdlogin.appendChild(link)
    linha.appendChild(tdlogin);
    
    const tdnome = document.createElement("td");
    tdnome.innerHTML = pessoa.nome;
    linha.appendChild(tdnome);
    const tdsexo = document.createElement("td");
    tdsexo.innerHTML = pessoa.sexo;
    linha.appendChild(tdsexo);
    const tdemail = document.createElement("td");
    tdemail.innerHTML = pessoa.email;
    linha.appendChild(tdemail);
    const tddatanasc = document.createElement("td");
    tddatanasc.innerHTML = pessoa.dataNasc;
    linha.appendChild(tddatanasc);
    linha.appendChild(tdemail);

    const tdExcluir = document.createElement("td");
    const btnExcluir = document.createElement('button');
    btnExcluir.name = 'btnExcluir'
    btnExcluir.type = 'button'
    btnExcluir.innerHTML = 'excluir'
    btnExcluir.onclick = function(){ excluir(pessoa.login) }
    tdExcluir.appendChild(btnExcluir)
    linha.appendChild(tdExcluir);
    return linha
}

class Pessoa  {
    constructor(nome, email, dataNasc, sexo, endereco, login, senha){
        this.nome = nome;
        this.email = email;
        this.dataNasc = dataNasc;
        this.sexo = sexo;
        this.endereco = endereco;
        this.login = login;
        this.senha = senha;
    }
}


function cadastrar() {
    console.log('cadastrar()')
    const pessoa  = {
        nome : document.getElementById("txtNome").value,
        email : document.getElementById("txtEmail").value,
        dataNasc : document.getElementById("txtDataNasc").value,
        sexo : document.getElementById("cbxSexo").value,
        endereco : document.getElementById("txtEndereco").value,
        login : document.getElementById("txtLogin").value,
        senha : document.getElementById("txtSenha").value
    }
    
    if (pessoa.login.trim() == "") {
        alert("Login é obrigatório");
    }
    else if (pessoa.login.includes(" ")) {
        alert("Login não pode ter espaços");
    }
    else if (pessoa.nome.trim() == "") {
        alert("Nome é obrigatório");
    }
    else {
        
        // Excluir se já existir
        const index = pessoas.findIndex((pes) => pes.login ==  pessoa.login);
        if (index >= 0){
            const x = pessoas.splice(index, 1);
        }
        // Adicionar no vetor
        pessoas.push(pessoa);
        // grava no armazenamento
        localStorage.setItem("usuarios", JSON.stringify(pessoas))

        alert("Usuário cadastrado com sucesso!");
    }
    window.location.href = "../";
}

function excluir(login){
    const index = pessoas.findIndex((pes) => pes.login ==  login);
    if (index >= 0){
        const x = pessoas.splice(index, 1);
        localStorage.setItem("usuarios", JSON.stringify(pessoas))
        alert('[' + login + '] excluído com sucesso')
        window.location.href = "../";
    }
}

function testarApi() {
    console.log('testarApi()')
    const fillList = document.getElementById("fillList");
    // fetch('https://jsonplaceholder.typicode.com/todos/', method: 'GET');
    fetch('https://jsonplaceholder.typicode.com/todos/')
        .then(response => response.json())
        .then(data => {
            // obtem a lista (html)
            const list = document.querySelector('#fillList')
            // para cada item do retorno json
            data.map((item) => {
                const li = document.createElement('li')
                li.setAttribute('id', item.id);
                li.innerHTML = item.title;
                list.appendChild(li);
            })
        })
}