onPageLoad();

function onPageLoad() {
  var storedNames = JSON.parse(localStorage.getItem("item"));
  if (!storedNames) {
    itemArray = [];
  } else {
    itemArray = storedNames;
  }
  createTodoList(storedNames);
}

function addItemToList() {
  var items = document.getElementById('item-modal').children;

  if (typeof(Storage) !== "undefined") {
    var object = new Object();
    for (var i = 0; i < items.length; i++) {
      if (items[i].getElementsByTagName('input')[0]) {
        var label = items[i].getElementsByTagName('label')[0].textContent;
        var text = items[i].getElementsByTagName('input')[0].value;
        object[label] = text;
      }
    }
    itemArray.push(object);
    localStorage.setItem("item", JSON.stringify(itemArray));
  }
  createTodoList(itemArray)
}

function createTodoList(items) {
  // if (document.getElementById('todo-list').children.length !== 0) {
  //   for (var c = 0; c < document.getElementById('todo-list').children.length; c++) {
  //   // debugger
  //     document.getElementById('todo-list').removeChild(document.getElementById('todo-list').children[c]);
  //   }
  // }
  document.getElementById('todo-list').innerHTML = "";
  for (var i = 0; i < items.length; i++) {
    var li = document.createElement("li");
    document.getElementById('todo-list').appendChild(li);
    for (var z in items[i]) {

      var itemSpan = document.createElement("span");
      itemSpan.innerHTML = items[i][z] + " ";
      li.appendChild(itemSpan);

    }
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete Task"
    deleteButton.id = i;
    deleteButton.addEventListener('click', function(ev) {
      deleteItem(ev, this.id);
    });
    li.appendChild(deleteButton);
  }
}

function deleteItem(ev, index) {
  var storedNames = JSON.parse(localStorage.getItem("item"));
  storedNames.splice(index, 1);
  localStorage.setItem('item', JSON.stringify(storedNames));
  createTodoList(storedNames);
}
