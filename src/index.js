import axios from "axios";

const ulNew = document.querySelector("#new-list");
const ulInProg = document.querySelector("#in-progress-list");
const ulDone = document.querySelector("#done-list");
const form = document.querySelector("form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const assignee = document.querySelector("#assignee");
const dueDate = document.querySelector("#dueDate");

const renderNew = () => {
  const html = newStories
    .map((story) => {
      return `<li>
        <span> <b><u>Title: ${story.title}</u></b> </span> </br> </br>
        <span> <b>Details:</b> ${story.description} </span> </br>
        <span> <b>Assignee: </b> ${story.assignee}</span> </br>
        <span> <b>Due Date: </b> ${story.dueDate}</span> </br> </br>
        <button class="progress" data-id="${story.id}"> o </button>
        <button class="done" data-id="${story.id}"> o </button>
        <button class="delete" data-id="${story.id}" data-loc="new"> x </button>
        </li>`;
    })
    .join("");
  ulNew.innerHTML = html;
};

const renderInProg = () => {
  const html = inProgStories
    .map((story) => {
      return `<li>
        <span> <b><u> Title: ${story.title} </u></b> </span> </br> </br>
        <span> <b>Details:</b> ${story.description} </span> </br>
        <span> <b>Assignee: </b> ${story.assignee}</span> </br>
        <span> <b>Due Date: </b> ${story.dueDate}</span> </br> </br>
        <button class="new" data-id="${story.id}"> o </button>
        <button class="done" data-id="${story.id}"> o </button>
        <button class="delete" data-id="${story.id}" data-loc="prog"> x </button>
      </li>`;
    })
    .join("");
  ulInProg.innerHTML = html;
};

const renderDone = () => {
  const html = doneStories
    .map((story) => {
      return `<li>
        <span> <b><u> Title: ${story.title} </u></b> </span> </br> </br>
        <span> <b>Details:</b> ${story.description} </span> </br>
        <span> <b>Assignee: </b> ${story.assignee}</span> </br>
        <span> <b>Due Date: </b> ${story.dueDate}</span> </br> </br>
        <button class="new" data-id="${story.id}"> o </button>
        <button class="progress" data-id="${story.id}"> o </button>
        <button class="delete" data-id="${story.id}" data-loc="done"> x </button>
      </li>`;
    })
    .join("");
  ulDone.innerHTML = html;
};

let stories, newStories, inProgStories, doneStories;

const setup = async () => {
  try {
    stories = (await axios.get("/api/stories")).data;
    newStories = stories.filter((story) => {
      return story.status === "New";
    });
    inProgStories = stories.filter((story) => {
      return story.status === "In-progress";
    });
    doneStories = stories.filter((story) => {
      return story.status === "Done";
    });
    renderNew();
    renderInProg();
    renderDone();
  } catch (ex) {
    console.log(ex);
  }
};

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  try {
    const story = {
      title: title.value,
      description: description.value,
      assignee: assignee.value,
      dueDate: dueDate.value,
    };
    const response = await axios.post("/api/stories", story);
    newStories.push(response.data);
    renderNew();
  } catch (ex) {
    console.log(ex);
  }
  form.reset();
});

ulNew.addEventListener("click", async (ev) => {
  const target = ev.target;
  const id = target.getAttribute("data-id");
  if (target.tagName === "BUTTON") {
    switch (target.getAttribute("class")) {
      case "delete":
        await axios.delete(`/api/stories/${id}`);
        newStories = newStories.filter((story) => story.id !== id);
        break;
      case "progress":
        const inProgResponse = await axios.put(`/api/stories/${id}`, {
          status: "In-progress",
        });
        const inProgStory = inProgResponse.data;
        newStories = newStories.filter((story) => story.id !== id);
        inProgStories.push(inProgStory);
        renderInProg();
        break;
      case "done":
        const doneResponse = await axios.put(`/api/stories/${id}`, {
          status: "Done",
        });
        const doneStory = doneResponse.data;
        newStories = newStories.filter((story) => story.id !== id);
        doneStories.push(doneStory);
        renderDone();
    }
    renderNew();
  }
});

ulInProg.addEventListener("click", async (ev) => {
  const target = ev.target;
  const id = target.getAttribute("data-id");
  if (target.tagName === "BUTTON") {
    switch (target.getAttribute("class")) {
      case "delete":
        await axios.delete(`/api/stories/${id}`);
        inProgStories = inProgStories.filter((story) => story.id !== id);
        break;
      case "new":
        const newResponse = await axios.put(`/api/stories/${id}`, {
          status: "New",
        });
        const newStory = newResponse.data;
        inProgStories = inProgStories.filter((story) => story.id !== id);
        newStories.push(newStory);
        renderNew();
        break;
      case "done":
        const doneResponse = await axios.put(`/api/stories/${id}`, {
          status: "Done",
        });
        const doneStory = doneResponse.data;
        inProgStories = inProgStories.filter((story) => story.id !== id);
        doneStories.push(doneStory);
        renderDone();
    }
    renderInProg();
  }
});

ulDone.addEventListener("click", async (ev) => {
  const target = ev.target;
  const id = target.getAttribute("data-id");
  if (target.tagName === "BUTTON") {
    switch (target.getAttribute("class")) {
      case "delete":
        await axios.delete(`/api/stories/${id}`);
        doneStories = doneStories.filter((story) => story.id !== id);
        break;
      case "new":
        const newResponse = await axios.put(`/api/stories/${id}`, {
          status: "New",
        });
        const newStory = newResponse.data;
        doneStories = doneStories.filter((story) => story.id !== id);
        newStories.push(newStory);
        renderNew();
        break;
      case "progress":
        const inProgResponse = await axios.put(`/api/stories/${id}`, {
          status: "In-progress",
        });
        const inProgStory = inProgResponse.data;
        doneStories = doneStories.filter((story) => story.id !== id);
        inProgStories.push(inProgStory);
        renderInProg();
    }
    renderDone();
  }
});

setup();
