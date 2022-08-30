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

app.post("/api/stories", async (req, res, next) => {
  try {
    res.send(await Story.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put("/api/stories/:id", async (req, res, next) => {
  try {
    const story = await Story.findByPk(req.params.id);
    res.send(await story.update(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/stories/:id", async (req, res, next) => {
  try {
    const story = await Story.findByPk(req.params.id);
    await story.destroy();
    res.sendStatus(204);
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
        "List all apps needing migration, provide details needed by Controls.",
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
      description: "Use new texts from Legal.",
      assignee: "Robin",
      dueDate: "2022-10-31",
      status: "In-progress",
    }),
    Story.create({
      title: "Create Kanban board",
      description:
        "Purchase Jeera license. Set-up Kanban board for team FSA-2207, with basic features.",
      assignee: "Prof",
      dueDate: "2022-08-27",
      status: "Done",
    }),
    Story.create({
      title: "Product discovery with PAG and DCE",
      description: "Brainstorm on opportunities from the new DOL guidelines",
      assignee: "Beejay",
      dueDate: "2022-08-15",
      status: "Done",
    }),
  ]);

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

setup();
