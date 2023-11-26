function adicionarItem(novoItem) {
  let arrayItens = JSON.parse(localStorage.getItem("arrayItens")) || [];
  arrayItens.push(novoItem);
  localStorage.setItem("arrayItens", JSON.stringify(arrayItens));
}

function listarItens() {
  return JSON.parse(localStorage.getItem("arrayItens")) || [];
}

function imprimirCabecalho(novoFragmento) {
  let linhaCabecalho = document.createElement("tr");

  ["Código de Barra:", "Nome:", "Preço (R$)", "Remover:", "Comprado:"].forEach(
    (textoCabecalho) => {
      let th = document.createElement("th");
      th.textContent = textoCabecalho;
      linhaCabecalho.appendChild(th);
    }
  );

  novoFragmento.appendChild(linhaCabecalho);
}

function removerItem(index) {
  let arrayItens = listarItens();
  arrayItens.splice(index, 1);
  localStorage.setItem("arrayItens", JSON.stringify(arrayItens));
  imprimirItens(listarItens(), document.querySelector("#tabelaItens"));
}

function addBtnRemover(index) {
  let btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.addEventListener("click", () => removerItem(index));
  return btnRemover;
}

function addCheckbox(index) {
  let arrayItens = listarItens();

  let btnCheckbox = document.createElement("input");
  btnCheckbox.type = "checkbox";
  btnCheckbox.checked = arrayItens[index].comprado || false;

  btnCheckbox.addEventListener("change", () => {
    if (btnCheckbox.checked) {
      arrayItens[index].comprado = true;
      localStorage.setItem("arrayItens", JSON.stringify(arrayItens));

      marcar(index);
    } else {
      arrayItens[index].comprado = false;
      localStorage.setItem("arrayItens", JSON.stringify(arrayItens));

      desmarcar(index);
    }
  });

  return btnCheckbox;
}

function marcar(index) {
  let linhaTabela = document
    .querySelector("#tabelaItens")
    .getElementsByTagName("tr")[index + 1];

  let elementosTexto = linhaTabela.querySelectorAll("td");

  elementosTexto.forEach((elemento) => {
    elemento.classList.add("line-through");
  });
}

function desmarcar(index) {
  let linhaTabela = document
    .querySelector("#tabelaItens")
    .getElementsByTagName("tr")[index + 1];

  let elementosTexto = linhaTabela.querySelectorAll("td");

  elementosTexto.forEach((elemento) => {
    elemento.classList.remove("line-through");
  });
}

function verificarComprado(arrayItens) {
  for (let i = 0; i < arrayItens.length; i++) {
    if (arrayItens[i].comprado) {
      marcar(i);
    }
  }
}

function imprimirItens(arrayItens, tabelaItens) {
  let novoFragmento = document.createDocumentFragment();

  if (arrayItens.length > 0) {
    imprimirCabecalho(novoFragmento);
  }

  for (let i = 0; i < arrayItens.length; i++) {
    let linhaTabela = document.createElement("tr");

    let codBarra = document.createElement("td");
    codBarra.textContent = arrayItens[i].codBarra;

    let nomeItem = document.createElement("td");
    nomeItem.textContent = arrayItens[i].nomeItem;

    let precoItem = document.createElement("td");
    precoItem.textContent = arrayItens[i].precoItem;

    let btnRemover = document.createElement("td");
    btnRemover.appendChild(addBtnRemover(i));

    let btnCheckbox = document.createElement("td");
    btnCheckbox.appendChild(addCheckbox(i));

    linhaTabela.appendChild(codBarra);
    linhaTabela.appendChild(nomeItem);
    linhaTabela.appendChild(precoItem);
    linhaTabela.appendChild(btnRemover);
    linhaTabela.appendChild(btnCheckbox);

    novoFragmento.appendChild(linhaTabela);
  }
  tabelaItens.replaceChildren(novoFragmento);
}

export { adicionarItem, listarItens, imprimirItens, marcar, verificarComprado };
