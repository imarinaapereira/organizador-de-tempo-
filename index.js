let button = document.querySelector("button");

function tempoMedioDoUsuario() {
  let trabalha = document.querySelector('#trabalha').value
  if (trabalha === '') {

    let dorme = document.querySelector("#dorme").value;
    let temp = 24 - parseFloat(dorme);
    return parseFloat(temp);
  } else {
    let dorme = document.querySelector("#dorme").value;
    let temp = 24 - parseFloat(dorme) - parseFloat(trabalha);
    return parseFloat(temp);
  }



}

function SepararPrincipaisTarefas() {
  // Pegar os valores dos campos de entrada dentro da função

  removerResultadosAnteriores()
  let dorme = document.querySelector("#dorme").value;
  let tarefas = document.querySelector("#tarefas").value.toUpperCase();
  let principaisTarefas = document.querySelector("#principaisTarefas").value.toUpperCase();

  // Validar os campos
  if (dorme === '' || tarefas === '' || principaisTarefas === '') {
    let resultado = document.querySelector('.resultado');
    resultado.style.display = 'none';
    return alert('Você deixou um campo obrigatório vazio ');
  }

  // Separar e formatar os valores em arrays
  let arrayDeTarefas = tarefas.split(',').map(tarefa => tarefa.trim().toLowerCase());
  let arrayDePrincipaisTarefas = principaisTarefas.split(',').map(tarefa => tarefa.trim().toLowerCase());

  // Imprimir o resultado no console
  let novoArray = filtrarElementosIguais(arrayDeTarefas, arrayDePrincipaisTarefas);

  let tempoMedio = tempoMedioDoUsuario();

  // Calcular o tempo disponível para as tarefas não principais
  let tempoDisponivelNaoPrincipais = tempoMedio - (arrayDePrincipaisTarefas.length * 3);
  let numeroTarefasNaoPrincipais = arrayDeTarefas.length - arrayDePrincipaisTarefas.length;
  let tempoPorTarefaNaoPrincipal = tempoDisponivelNaoPrincipais / numeroTarefasNaoPrincipais;
  // Calcular o tempo para cada tarefa não principal dividindo pelo número de tarefas
  let horas = Math.floor(tempoPorTarefaNaoPrincipal); // Parte inteira (horas)
  let minutos = Math.round((tempoPorTarefaNaoPrincipal - horas) * 60);
  tempoPorTarefaNaoPrincipal = `${horas} horas ${minutos} minutos`;
  // Imprimir o resultado para cada tarefa
  let trabalha = document.querySelector('#trabalha').value
  arrayDePrincipaisTarefas.forEach(tarefaPrincipal => {
    if (!arrayDeTarefas.includes(tarefaPrincipal)) {
      alert('A tarefa principal não foi encontrada entre as tarefas.')
      let resultado = document.querySelector('.resultado')
      resultado.style.display = 'none'
    }
  })



  novoArray.forEach((tarefa, index) => {
    if (index !== 0) {
      tempoMedio -= 3
    }
    if (tempoMedio < 3) {
      let p = document.createElement('p')
      p.textContent = `Tempo para ${tarefa}: ${tempoMedio} horas`
      let resultado = document.querySelector('.resultado')
      resultado.appendChild(p)
    } else {
      let p = document.createElement('p')
      p.textContent = `Tempo para ${tarefa}: 3 horas`
      let resultado = document.querySelector('.resultado')
      resultado.appendChild(p)
      console.log(tempoMedio)
    }

  });

  arrayDeTarefas.forEach(tarefa => {
    if (!arrayDePrincipaisTarefas.includes(tarefa)) {

      let p = document.createElement('p')
      if (tempoDisponivelNaoPrincipais <= 0) {
        p.textContent = `Infelizmente você não terá tempo para realizar a tarefa ${tarefa}`
      } else {
        let output = `Tempo para ${tarefa}: ${horas} horas`;
        if (minutos > 0) {
          output += ` ${minutos} minutos`;
        }
        p.textContent = output;
      }
      let resultado = document.querySelector('.resultado')
      resultado.appendChild(p)
    }
  });

  arrayDePrincipaisTarefas.forEach(tarefaPrincipal => {
    if (arrayDeTarefas.includes(tarefaPrincipal)) {
      let resultado = document.querySelector('.resultado')
      resultado.style.display = 'flex'
    }
  })




  document.querySelector("#dorme").value = '';
  document.querySelector("#tarefas").value = '';
  document.querySelector("#principaisTarefas").value = '';
  document.querySelector("#trabalha").value = '';
}

function removerResultadosAnteriores() {
  // Pegar o elemento que contém os resultados
  let resultado = document.querySelector('.resultado');

  // Remover todos os elementos filhos (resultados anteriores)
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
  let h1 = document.createElement('h1')
  h1.textContent = 'Resultado :'
  resultado.appendChild(h1)

}

function filtrarElementosIguais(array1, array2) {
  return array1.filter(elemento => array2.includes(elemento));
}

button.addEventListener('click', SepararPrincipaisTarefas);