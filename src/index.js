import axios from "axios";

const ulNew = document.querySelector("#new-list");
const ulInProg = document.querySelector("#in-progress-list");
const ulDone = document.querySelector("#done-list");

const renderNew = () => {
  const html = newStories
    .map((story) => {
      return `<li>${story.title} / ${story.description}</li>`;
    })
    .join("");
  ulNew.innerHTML = html;
};

const renderInProg = () => {
  const html = inProgStories
    .map((story) => {
      return `<li>${story.title} / ${story.description}</li>`;
    })
    .join("");
  ulInProg.innerHTML = html;
};

const renderDone = () => {
  const html = doneStories
    .map((story) => {
      return `<li>${story.title} / ${story.description}</li>`;
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
    console.log(newStories);
    renderNew();
    renderInProg();
    renderDone();
  } catch (ex) {
    console.log(ex);
  }
};

setup();
