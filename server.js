const express = require("express");
const app = express();
const { conn, Story } = require("./db");
const path = require("path");

app.use(express.json());

app.use("/dist", express.static("dist"));

app.use("/assets", express.static("assets"));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/api/stories", async (req, res, next) => {
  try {
    res.send(await Story.findAll());
  } catch (ex) {
    next(ex);
  }
});

const setup = async () => {
  await conn.sync({ force: true });
  await Promise.all([
    Story.create({
      title: "Impact analysis for VSI decomm",
      description:
        "List all apps needing migration, and next steps, including timelines",
      assignee: "Beejay",
      dueDate: "2022-09-30",
      status: "New",
    }),
    Story.create({
      title: "Add quarterly analytics in Advisor Suite",
      description:
        "Mimic FINRA analytic pages into portfolio reporting on-demand",
      assignee: "Sam",
      dueDate: "2022-12-31",
      status: "New",
    }),
    Story.create({
      title: "Rebranding of headers/footers/disclaimers in Salesforce",
      description: "Replace JPMS with JPMA; use new verbiage from Compliance",
      assignee: "Robin",
      dueDate: "2022-10-31",
      status: "In-progress",
    }),
    Story.create({
      title: "Create Jeera board",
      description: "Set-up Kanban board for team Alpha",
      assignee: "Natalie",
      dueDate: "2022-08-31",
      status: "Done",
    }),
  ]);

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

setup();
