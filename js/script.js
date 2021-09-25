
let cardapio = document.querySelector("#cardapio");
let formCriarPrato = document.querySelector("#inserirPrato");
let listaCardapio = [];


updateCardapio = () => {
  cardapio.innerHTML = "";
  listaCardapio.forEach((element) => {
    let item = createItem(element);
    cardapio.appendChild(item);
  });
};
createItem = (element) => {
  let div, h1, h2, preco;
  let item = document.createElement("li");

  div = document.createElement("div");
  div.classList.add("bardesign");
  div.innerHTML = `
    <div class="bardesign">
            </div>
  `;
  item.appendChild(div);
  
  h1 = document.createElement("h1");
  let text = document.createTextNode(element.prato);
  h1.appendChild(text);
  item.appendChild(h1);
  

  h2 = document.createElement("h2");
  text = "Ingredientes: " + element.ingredientes;
  text = document.createTextNode(text);
  h2.appendChild(text);
  item.appendChild(h2);

  
  preco = document.createElement("h3");
  text = "R$ " + element.preco + ".00";
  text = document.createTextNode(text);
  preco.appendChild(text);
  preco.classList.add("preco");
  item.appendChild(preco);

  div = document.createElement("div");
  div.classList.add("bardesign");
  div.innerHTML = `
    <div class="bardesign">
            </div>
  `;
  item.appendChild(div);

  return item;
};


formCriarPrato.addEventListener("submit", (event) => {
  let prato = document.querySelector("#prato").value;
  let ingredientes = document.querySelector("#ingredientes").value;
  let preco = document.querySelector("#preco").value;
  let object = {};
  object.prato = prato;
  object.ingredientes = ingredientes;
  object.preco = preco;
  listaCardapio.push(object);
  saveOnLocalStorage();
  updateCardapio();
});


saveOnLocalStorage = () => {
  localStorage.setItem("cardapio", JSON.stringify(listaCardapio));
};


getItemsOnLocalStorage = () => {
  let localStorageData = JSON.parse(localStorage.getItem("cardapio"));
  if (localStorageData != null) {
    localStorageData.forEach((element) => {
      listaCardapio.push(element);
    });
  } else {
    let prato = {
      prato: "fricasse",
      ingredientes: "frango, batata palha",
      preco: 10
    };
    let prato2 = {
      prato: "lasanha",
      ingredientes: "frango, macarrão, ",
      preco: 30
    };
    listaCardapio.push(prato);
    listaCardapio.push(prato2);
    localStorage.setItem("cardapio", JSON.stringify(listaCardapio));
  }
};


getItemsOnLocalStorage();
updateCardapio();


let elementosDoCardapio = document.querySelectorAll("li");
elementosDoCardapio.forEach(element => {
  element.addEventListener("mouseenter", (event) => {
    
    event.target.childNodes[1].style = "display: flex;";
    event.target.childNodes[2].style = "display: flex;";
    event.target.childNodes[3].style = "display: flex;";
    
    
    
  });
});
elementosDoCardapio.forEach(element => {
  element.addEventListener("mouseleave", (event) => {
    event.target.childNodes[2].style = "display: none;";
    event.target.childNodes[3].style = "display: none;";
    
  });
});


let userInput = document.querySelector("#search");
userInput.addEventListener("keyup", (event) => {
  console.log(event.target.value);
  filtrarCardapio(event.target.value);
});


filtrarCardapio = (userInput) => {
  userInput = userInput.toUpperCase();
  let pratos = document.querySelectorAll("li");
  pratos.forEach(element => {
    let text = element.textContent.toUpperCase();
    if(text.indexOf(userInput) < "0"){
      element.style = "display: none;";
    } else {
      element.style = "display: flex";
    }
  });
}