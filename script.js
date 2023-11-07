const tareas = [];
let ultimoId = 0;

function agregarTarea(title, description, dueDate) {
  ultimoId++;
  const tarea = {
    id: ultimoId,
    title,
    description,
    dueDate,
  };

  tareas.push(tarea);
  return tarea;
}

function eliminarTarea(id) {
  const index = tareas.findIndex((tarea) => tarea.id === id);
  if (index !== -1) {
    tareas.splice(index, 1);
  }
}

function mostrarTareasEnTarjetas() {
  const taskList = document.getElementById('task-list');

  function agregarTareaATarjetas(tarea) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = tarea.title;

    const description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = tarea.description;

    const dueDate = document.createElement('p');
    dueDate.textContent = `Fecha límite: ${tarea.dueDate}`;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-outline-danger', 'delete-task-button');
    deleteButton.setAttribute('data-id', tarea.id);
    deleteButton.innerHTML = '<i class="bi bi-trash"></i> Eliminar';

    deleteButton.addEventListener('click', function (event) {
      const taskId = event.target.getAttribute('data-id');
      eliminarTarea(parseInt(taskId));
      mostrarTareasEnTarjetas();
    });

    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(dueDate);
    cardBody.appendChild(deleteButton);

    card.appendChild(cardBody);
    taskList.appendChild(card);
  }

  taskList.innerHTML = '';

  tareas.forEach((tarea) => {
    agregarTareaATarjetas(tarea);
  });
}

const taskForm = document.getElementById('task-form');
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('due-date').value;

  if (title && dueDate) {
    agregarTarea(title, description, dueDate);
    taskForm.reset();
    mostrarTareasEnTarjetas();
  }
});

mostrarTareasEnTarjetas();