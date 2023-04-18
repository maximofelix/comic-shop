const pessoas = JSON.parse(localStorage.getItem("usuarios")) || []

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

function incluir(){
    const pessoa  = {
        nome : document.getElementById("txtNome").value,
        email : document.getElementById("txtEmail").value,
        dataNasc : document.getElementById("dteNascimento").value,
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
        carregarGrade();
    }
}

function iniciarGrade(){
    //alert('Bem vindo ao Comic-Shop')
    const status = document.getElementById("divStatus")
    status.innerText = "online";
    status.style.color = "limegreen";
    
    carregarGrade();
}

function iniciarIncluir(){
    //alert('Bem vindo ao Comic-Shop')
    const status = document.getElementById("divStatus")
    status.innerText = "inclusão - online";
    status.style.color = "limegreen";
}

function iniciarAlterar(){
    //alert('Bem vindo ao Comic-Shop')
    const status = document.getElementById("divStatus")
    status.innerText = "alteração - online";
    status.style.color = "limegreen";

    const query = window.location.search;
    const param = new URLSearchParams(query);
    const _login = param.get('login');
    const _opera = param.get('op');

    console.log('usuário informado..: ' + _login)
    
    if (_login == null){ 
        window.location.href = "../";
    }

    var pessoa = null;
    pessoas.forEach(pes => {
        if (pes.login == _login)
            pessoa = pes
    });
    if (pessoa == undefined){ 
        alert('login ['+_login+'] não localizado!')
        window.location.href = "../";
    }
    document.getElementById("txtNome").value = pessoa.nome;
    document.getElementById("txtEmail").value = pessoa.email;
    document.getElementById("dteNascimento").value = pessoa.dataNasc;
    document.getElementById("cbxSexo").value = pessoa.sexo;
    document.getElementById("txtEndereco").value = pessoa.endereco;
    document.getElementById("txtLogin").value = pessoa.login;
    document.getElementById("txtSenha").value = pessoa.senha;
}
function carregarGrade(){
    limparGrade();
    if (pessoas == null)
        return;
    const tabela = document.getElementById("tabUsuarios");
     pessoas.forEach(pessoa => {    
         tabela.appendChild(criarLinha(pessoa));
     })
}

function limparGrade(){
    var linhas = document.getElementsByTagName("tr").length;
    var lin = 2;
    while(lin++ <= linhas-1){
        linha = document.getElementsByTagName("tr")[2];
        linha.remove();
    }
}

function criarLinha(pessoa){
    const linha = document.createElement("tr");
    const tdlogin = document.createElement("td");
    tdlogin.setAttribute("id", pessoa.login);
    
    const link = document.createElement('a');
    link.href = "alterar/?login=" + pessoa.login;
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
    linha.appendChild(tddatanasc);

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