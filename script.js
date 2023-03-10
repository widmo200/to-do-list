{
    let tasks = [];
    let hideDoneTask = false;

    const toggleHideDoneTask = () => {
        hideDoneTask = !hideDoneTask
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent.value.trim() }
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ]
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        const previousDoneValue = tasks[taskIndex].done

        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !previousDoneValue },
            ...tasks.slice(taskIndex + 1)
        ]
        render();
    };

    const markAllTaskDone = () => {
        tasks = tasks.map(task => { return { ...task, done: true } });
        render();
    };

    const renderButtons = () => {
        let htmlButtonString = "";

        if (tasks.length > 0) {
            htmlButtonString = `
                <button class="section__button js-hiddenTask">
                    ${hideDoneTask ? "Pokaż" : "Ukryj"} ukończone
                </button>
                <button class="section__button js-doneAllTask" ${tasks.every(task => task.done) ? "disabled" : ""}>
                    Ukończ wszystkie
                </button>
            `;
        };
        document.querySelector(".js-hidden").innerHTML = htmlButtonString;
    };

    const renderTasks = () => {
        const taskToHTML = task => `
        <li class="section__listItem ${task.done && hideDoneTask ? "section__listItem--hide" : ""}"> 
            <button class="button js-done">
                ${task.done ? "✔" : ""}
            </button>
            <span ${task.done ? "class=\"section__content\"" : ""}>
                ${task.content}
            </span>
            <button class="button button--remove js-remove">
                🗑️
            </button>
        </li>
        `;
        const taskElement = document.querySelector(".js-tasks");
        taskElement.innerHTML = tasks.map(taskToHTML).join("");
    }

    const render = () => {
        renderTasks();
        renderButtons();
        bindEvents();
        bindButtonEvents();
    };

    const bindButtonEvents = () => {
        if (tasks.length > 0) {
            const hideTaskButton = document.querySelector(".js-hiddenTask");
            hideTaskButton.addEventListener("click", () => {
                toggleHideDoneTask();
            });

            const buttonAllTaskDone = document.querySelector(".js-doneAllTask");
            buttonAllTaskDone.addEventListener("click", () => {
                markAllTaskDone();
            });
        };
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const onFormSubmit = (event) => {
        const form = document.querySelector(".js-form")

        event.preventDefault();
        const newTaskContent = document.querySelector(".js-task")
        if (newTaskContent === "") {
            return;
        };
        addNewTask(newTaskContent);
        newTaskContent.focus();
        form.reset();
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
};