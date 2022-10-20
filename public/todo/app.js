const taskInputDOM = document.querySelector("#task-i");
const fourContainerDOM = document.querySelector("#four-c");
const threeContainerDOM = document.querySelector("#three-c");
const formAlertDOM = document.querySelector(".form-alert");
const textLeftDOM = document.querySelector("#text-l");
const todoAppDOM = document.querySelector("#todoApp");
const optnBtnDOM = document.querySelectorAll(".optn-btn");
const optnBtnAllDOM = document.querySelector("#all");
const optnBtnActiveDOM = document.querySelector("#active");
const optnBtnCompletedDOM = document.querySelector("#completed");
const deleteAllBtnDOM = document.querySelector("#delete-all");
const iconUserDOM = document.querySelector('.icons');

const app = {
  userId: null,
  async renderTask() {
    try {
      const createBy = this.userId;
      const {
        data: { tasks },
      } = await axios.get("http://localhost:3000/api/to-do");

      this.tasksLeft(tasks);

      const allTasks = tasks
        .filter(task => task.createBy === createBy)
        .map((task) => {
          const { completed, _id: taskID, name } = task;

          return `
                <div class="output-d all ${
                  completed ? "completed" : "active"
                }" id="${taskID}">
                    <div id="btn-div">
                        <button class="btn-ok ${
                          completed ? "check-icon" : ""
                        }"></button>
                    </div>
                    <p class="output-i ${
                      completed ? "ok-effect" : ""
                    }"> ${name} </p>
                    <div id="delete" class="delete">
                        <svg xmlns="http://www.w3.org/2000/svg"  class="delete-btn"  width="18" height="18">
                            <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
                        </svg>
                    </div>
                </div>
            `;
        });

        if (allTasks.length === 0) {
          textLeftDOM.textContent = `0 items left`;
          threeContainerDOM.innerHTML =
            '<h5 class="empty-list">No tasks in your list</h5>';
          return;
        }

      threeContainerDOM.innerHTML = allTasks.join(' ');

      const outputDDOM = document.querySelectorAll(".output-d");

      optnBtnAllDOM.onclick = () => {
        this.removeActiveOption();
        optnBtnAllDOM.classList.add("active");

        for (let task of outputDDOM) {
          if (task.classList.contains("all")) {
            task.style.display = "flex";
          } else {
            task.style.display = "none";
          }
        }
      };

      optnBtnActiveDOM.onclick = () => {
        this.removeActiveOption();
        optnBtnActiveDOM.classList.add("active");

        for (let task of outputDDOM) {
          if (task.classList.contains("active")) {
            task.style.display = "flex";
          } else {
            task.style.display = "none";
          }
        }
      };

      optnBtnCompletedDOM.onclick = () => {
        this.removeActiveOption();
        optnBtnCompletedDOM.classList.add("active");

        for (let task of outputDDOM) {
          if (task.classList.contains("completed")) {
            task.style.display = "flex";
          } else {
            task.style.display = "none";
          }
        }
      };
    } catch (err) {
      threeContainerDOM.innerHTML =
        '<h5 class="empty-list">There was an error, please try later....</h5>';
    }
  },

  removeActiveOption() {
    for (let optnBtn of optnBtnDOM) {
      if (optnBtn.classList.contains("active")) {
        optnBtn.classList.remove("active");
      }
    }
  },

  tasksLeft(tasks) {
    const tasksLeft = tasks.filter((task) => !task.completed);
    textLeftDOM.textContent = `${tasksLeft.length} items left`;
  },

  addTask() {
    taskInputDOM.onkeypress = async (e) => {
      if (e.key === "Enter") {
        const name = taskInputDOM.value;
        const createBy = this.userId;

        try {
          await axios.post("http://localhost:3000/api/to-do", { name, createBy });
          this.renderTask();
          taskInputDOM.value = "";

          formAlertDOM.style.display = "block";
          formAlertDOM.textContent = `Success, Task added`;
          formAlertDOM.style.color = 'hsl(154, 59%, 51%)';
          formAlertDOM.classList.add("text-success");
        } catch (error) {
          formAlertDOM.style.display = "block";
          formAlertDOM.style.color = 'hsl(0, 100%, 74%)';
          formAlertDOM.innerHTML = error.response.data.msg;
        }

        setTimeout(() => {
          formAlertDOM.style.display = "none";
          formAlertDOM.classList.remove("text-success");
        }, 3000);
      }
    };
  },

  deleteTask() {
    threeContainerDOM.onclick = async (e) => {
      const element = e.target;

      if (element.classList.contains("delete")) {
        const id = element.parentElement.id;

        try {
          await axios.delete("http://localhost:3000/api/to-do/" + id);
          this.renderTask();
        } catch (err) {
          formAlertDOM.style.display = "block";
          formAlertDOM.style.color = 'hsl(0, 100%, 74%)';
          formAlertDOM.innerHTML = err.response.data.msg;
        }

        setTimeout(() => {
          formAlertDOM.style.display = "none";
          formAlertDOM.classList.remove("text-success");
        }, 3000);
      }
    };
  },

  clearAllCompletedTasks() {
    deleteAllBtnDOM.onclick = async () => {
      try {
        const {
          data: { tasks },
        } = await axios.get("http://localhost:3000/api/to-do");

        tasks.forEach(async (task) => {
          const { completed, _id: taskID } = task;
          if (completed) {
            await axios.delete("http://localhost:3000/api/to-do/" + taskID);
          }

          if (optnBtnCompletedDOM.classList.contains("active")) {
            this.removeActiveOption();
            optnBtnAllDOM.classList.add("active");
          }
          this.renderTask();
        });
      } catch (err) {
          formAlertDOM.style.display = "block";
          formAlertDOM.style.color = 'hsl(0, 100%, 74%)';
          formAlertDOM.innerHTML = err.response.data.msg;
      }

      setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
      }, 3000);
    };
  },

  updateTask() {
    todoAppDOM.onclick = async (e) => {
      const element = e.target;
      const outputDDOM = element.parentElement;

      if (element.id === "btn-div") {
        const id = outputDDOM.id;
        let isCompleted;

        if (outputDDOM.classList.contains("completed")) {
          outputDDOM.classList.remove("completed");
          outputDDOM.classList.add("active");

          element.children[0].classList.remove("check-icon");

          element.nextSibling.nextSibling.classList.remove("ok-effect");

          isCompleted = false;
        } else if (outputDDOM.classList.contains("active")) {
          outputDDOM.classList.remove("active");
          outputDDOM.classList.add("completed");

          element.children[0].classList.add("check-icon");

          element.nextSibling.nextSibling.classList.add("ok-effect");

          isCompleted = true;
        }

        const name = document.querySelector('.output-i').textContent;
        try {
          await axios.put("http://localhost:3000/api/to-do/" + id, {
            completed: isCompleted,
            name: name
          });
        } catch (err) {
          formAlertDOM.style.display = "block";
          formAlertDOM.style.color = 'hsl(0, 100%, 74%)';
          formAlertDOM.innerHTML = err.response.data.msg;
        }

        setTimeout(() => {
          formAlertDOM.style.display = "none";
          formAlertDOM.classList.remove("text-success");
        }, 3000);
      }
    };
  },

  auth() {
    window.onload = async () => {
      const { data: { user } } = await axios.get('http://localhost:3000/api/users/me', {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",                
        }
      });
      this.userId = user.id;
      document.querySelector('.user-name').textContent = user.name;

      this.renderTask();
    }
  },

  run() {
    this.auth();
    this.addTask();
    this.deleteTask();
    this.updateTask();
    this.clearAllCompletedTasks();
  },
};

app.run();
