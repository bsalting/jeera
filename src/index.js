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
        <button class="progress"> o </button>
        <button class="done"> o </button>
        <button class="delete"> x </button>
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
        <button class="new"> o </button>
        <button class="done"> o </button>
        <button class="delete"> x </button>
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
        <button class="new"> o </button>
        <button class="progress"> o </button>
        <button class="delete"> x </button>
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

setup();
