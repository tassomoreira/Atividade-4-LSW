import {
  adicionarItem,
  imprimirItens,
  listarItens,
  marcar,
  verificarComprado,
} from "./lista.js";

const nomeItem = document.querySelector("#nomeItem");
const precoItem = document.querySelector("#precoItem");
const btnAdicionar = document.querySelector("#btnAdicionar");
const tabelaItens = document.querySelector("#tabelaItens");

class Item {
  constructor(nomeItem, precoItem) {
    this.codBarra = Math.floor(Math.random() * 1000000000);
    this.nomeItem = nomeItem;
    this.precoItem = precoItem;
    this.comprado = false;
  }
}

window.addEventListener("load", () => {
  imprimirItens(listarItens(), tabelaItens);
  verificarComprado(listarItens());
});

btnAdicionar.addEventListener("click", (event) => {
  event.preventDefault();

  let nNomeItem = nomeItem.value;
  let nPrecoItem = precoItem.value;

  let novoItem = new Item(nNomeItem, nPrecoItem);

  adicionarItem(novoItem);
  imprimirItens(listarItens(), tabelaItens);
  verificarComprado(listarItens());

  nomeItem.value = "";
  precoItem.value = "";
});
