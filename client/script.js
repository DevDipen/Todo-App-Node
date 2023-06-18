let arr = [];
const btn = document.getElementById("addButton");
const inp = document.getElementById("inputTab");

const cardsContainer = document.getElementById("cardsContainer");

var showToast = (message) => {
  var toast = document.querySelector(".toast");
  var toastBody = toast.querySelector(".toast-body");
  toastBody.innerHTML = message;
  return new bootstrap.Toast(toast, { delay: 2000 }).show();
};

function addToTODO(element, index) {
  cardsContainer.innerHTML += `<div class="card d-flex flex-row mb-3" >
          <div ${
            element?.isCompleted
              ? `class="card-body taskDone"`
              : `class="card-body"`
          } id="card${index}">
             ${element?.todoTitle}
          </div>
      
          <div class="d-flex flex-row ">
              <button class="btn btn-outline-success mr-1" type="button" id="done${index}" ${
    element?.isCompleted ? "disabled" : ""
  }>
                  Done
              </button>
      
              <button class="btn btn-outline-danger" type="button" id="remove${index}">
                  Remove
              </button>
              
          </div>
        
          <div id="id_${element._id}" hidden>
              </div>
      
      </div>`;

  inp.value = "";

  return true;
}

function onInit() {
  cardsContainer.innerHTML = "";

  let isMounted = false;
  arr.forEach((ele, index) => {
    isMounted = addToTODO(ele, index);
  });

  if (isMounted) attachListeners();
}

function attachListeners() {
  arr.forEach((ele, index) => {
    const done = document.getElementById(`done${index}`);
    const remove = document.getElementById(`remove${index}`);

    done.addEventListener("click", () => {
      //const id = document.querySelectorAll("[id^=id]")[index].id.substring(3);
      const id = arr[index]._id;
      updateTodoFunction(id, ele, done);
      //onInit();
    });

    remove.addEventListener("click", () => {
      const id = document.querySelectorAll("[id^=id]")[index].id.substring(3);
      console.log(id);
      deleteTodoFunction(id, index);
      // onInit();
    });
  });
}

// onInit();

btn.addEventListener("click", () => {
  const todo = { todoTitle: inp?.value, isCompleted: false };

  if (todo.todoTitle) {
    fetch("http://localhost:3050/api/addTodo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    })
      .then((data) => data.json())
      .then((res) => {
        showToast("Todo Added");
      })
      .catch((err) => console.log(err));

    getAllTodos();
  }
});

const getAllTodos = () => {
  fetch("http://localhost:3050/api/todos", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      arr = data?.todos;
      onInit();
    });
};

getAllTodos();

const deleteTodoFunction = (id, index) => {
  fetch("http://localhost:3050/api/deleteTodo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      arr.splice(index, 1);
      showToast("Todo Deleted");
      onInit();
    });
};

const updateTodoFunction = (id, ele, done) => {
  fetch("http://localhost:3050/api/updateTodo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  })
    .then((res) => {
      // console.log(res);
      return res.json();
    })
    .then((data) => {
      ele.isCompleted = true;
      done.disabled = true;
      showToast("Task Completed");
      onInit();
    });
};
