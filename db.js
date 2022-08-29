const Sequelize = require("sequelize");
const { ENUM, STRING, UUID, UUIDV4, DATEONLY } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/dealers_choice_spa_db"
);

const Story = conn.define("story", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  assignee: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  dueDate: {
    type: DATEONLY,
    allowNull: false,
  },
  status: {
    type: ENUM,
    values: ["New", "In-progress", "Done"],
    allowNull: false,
  },
});

module.exports = {
  conn,
  Story,
};
