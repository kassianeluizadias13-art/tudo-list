var tarefas = JSON.parse(localStorage.getItem(tarefas) || "[]");

var listaTarefas = document.getElementsByClassName("lista-tarefas")[0]
var inputTarefa = document.getElementById("input-tarefa")

function salvarTarefaLocalStorage(){
    var tarefaString = JSON.stringify(tarefas)
    localStorage.setItem("tarefas", tarefaString)

}

    function adicionarTarefa(){
        //pegar o texto que o usuario digitou
        var texto = inputTarefa.value.trim()

        //VALIDACAO DE TEXTO
        if(texto === ""){
            alert("VOCE PRECISA DIGITAR ALGO NO CAMPO PRA ADICIONAR")
            return;
        }
        if(texto.length <= 3){
            alert("O TEXTO DEVE TER MAIS DE 3 CARACTERES")
            return;
        }

        //criar um objeto que representa a tarefa
        var novaTarefa = {
            id: tarefas.length ? tarefas[tarefas.length - 1].id + 1 : 1, /// pegar o ultimo item da lista
            texto: texto,
            concluida: false
        }
        //adiciona na lista
        tarefas.push(novaTarefa)

        salvarTarefaLocalStorage()

        desenhar()
        inputTarefa.value = ""
    }   

function excluirTarefa(id){
   tarefas = tarefas.filter(tarefa => tarefa.id !== id)

  salvarTarefaLocalStorage()


    desenhar()

}
    
function alterarTarefa(id){
    // var tarefa = tarefas.find(tarefa => tarefa.id === id)
    // tarefa.concluida = !tarefa.concluida                         FORMA SIMPLIFICADA DA |
    // desenhar()                                                                         V

var index
 for(var i = 0; i < tarefas.length; i++){
    if(tarefas[i].id === id){
        index = i
    }
  }

  tarefas[index].concluida = tarefas[index].concluida === true ? false : true
  // tarefas[index].concluida = !tarefas[index].concluida

  salvarTarefaLocalStorage()

  desenhar()
} 

function desenhar() { 
    listaTarefas.innerHTML = ""

for(var i = 0; i < tarefas.length; i++){
var icone = tarefas[i].concluida  ? "radio_button_checked" : "radio_button_unchecked"
var classes = tarefas[i].concluida ? "tarefa tarefa-concluida" : "tarefa"

listaTarefas.innerHTML += `
                <ul id="lista-tarefas" class="lista-tarefas" >
                    <li class="${classes}">
                        <button class="botao-check" onclick="alterarTarefa(${tarefas[i].id})">
                            <span class="material-symbols-outlined">
                                ${icone}
                            </span>
                        </button>
                    
                    <span class="tarefa-texto">
                    ${tarefas[i].texto}
                    </span>

                    <button class="botao-excluir">
                        <span class="material-symbols-outlined" onclick="excluirTarefa(${tarefas[i].id})">
                            delete
                        </span>
                    </button>
                    </li>
                </ul>`
    }
}




desenhar()
