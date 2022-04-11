const basicBlock = document.getElementById("basicBlock");
const button = document.getElementById("registButton");
const deleteBlock = document.getElementById("register");
const login = document.getElementById("login");
const password = document.getElementById("password");

password.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    deleteBlock.remove();
    addNewText();
  }
});
button.addEventListener("click", function () {
  if (login.value === "" && password.value === "") {
    deleteBlock.remove();
    addNewText();
  }
});

function addNewText() {
  const inputBlock = `
  <div class="op">
     <h1 class= 'h1'>To Do List</h1>
     <input class='inp' id="inputText" />
     <button id='addButton' class="addButton">add</button>
  </div>
  <div id='newli' class='divli'>
    <ul id='Newul'></ul>
  </div>`;
  basicBlock.innerHTML = inputBlock;

  addFromLS();

  const inpp = document.getElementById("inputText");
  const addButton = document.getElementById("addButton");

  addButton.addEventListener("click", function (event) {
    if (inpp.value.length > 0) {
      addNewLi(inpp.value);

      inpp.value = "";
    }
  });

  inpp.addEventListener("keydown", function (event) {
    if (event.code === "Enter" && inpp.value.length > 0) {
      addNewLi(inpp.value);

      inpp.value = "";
    }
  });
}

function addNewLi(value, id = generateId()) {
  const ul = document.getElementById("Newul");
  const neLi = document.createElement("li");
  const newInputReload = document.createElement("input");
  const NewDiv = document.createElement("div");
  const newDelateButton = document.createElement("img");
  const NewReloadButton = document.createElement("img");
  const newSpan = document.createElement("span");
  newDelateButton.setAttribute("src", "../todo list/style/img..jpg");
  NewReloadButton.setAttribute("src", "../todo list/style/13.png");
  NewReloadButton.setAttribute("class", "img");
  NewDiv.setAttribute("class", "div2");

  neLi.setAttribute("id", id);

  localStorage.setItem(id, value);

  ul.appendChild(neLi);
  neLi.appendChild(newSpan);
  neLi.appendChild(NewDiv);
  NewDiv.appendChild(NewReloadButton);
  NewDiv.appendChild(newDelateButton);

  newDelateButton.addEventListener("click", function () {
    NewDiv.parentElement.remove();
    localStorage.removeItem(NewDiv.parentElement.getAttribute("id"));
  });
  NewReloadButton.addEventListener("click", function () {
    const text = newSpan.innerHTML;
    newSpan.remove();
    NewDiv.remove();
    neLi.appendChild(newInputReload);
    neLi.appendChild(NewDiv);
    NewDiv.appendChild(newDelateButton);
    NewReloadButton.remove();
    newInputReload.setAttribute("value", text);

    newInputReload.addEventListener("keydown", function (event) {
      if (event.code === "Enter" && newInputReload.value.length > 0) {
        neLi.appendChild(newSpan);
        neLi.appendChild(NewDiv);
        NewDiv.appendChild(NewReloadButton);
        NewDiv.appendChild(newDelateButton);
        newSpan.innerHTML = newInputReload.value;

        localStorage.setItem(neLi.getAttribute("id"), newInputReload.value);

        newInputReload.remove();
      }
    });
  });

  newSpan.innerHTML = value;
}
function generateId() {
  const ul = document.getElementById("Newul");
  const lastElementOfTheList = ul.children[ul.children.length - 1];

  return lastElementOfTheList ? +lastElementOfTheList.id + 1 : 0;
}

function addFromLS() {
  const todosFromLS = sortAndTransformEntriesFromLS(
    Object.entries(localStorage)
  );

  console.log(todosFromLS);
  todosFromLS.forEach((el) => {
    addNewLi(el.value, el.id);
  });
}

function sortAndTransformEntriesFromLS(entries) {
  return entries
    .map((el) => ({ id: Number(el[0]), value: el[1] }))
    .sort((a, b) => a.id - b.id);
}
