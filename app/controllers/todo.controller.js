const { v4: uuidv4 } = require("uuid");
const Todos = require("../../models").Todo;

const createTodoController = async (req, res) => {
  try {
    const { title } = req.body;
    const { id } = req;

    const todoCreate = await Todos.build({
      id: uuidv4(),
      title,
      userId: id,
    });

    await todoCreate.save();

    if (!todoCreate) {
      return res.status(404).send({
        message: "No data found",
      });
    }
    res.status(200).send(todoCreate);
  } catch (error) {
    return res.status(500).send({
      error: error.message || "something went wrong while creating todo",
    });
  }
};

const getTodoController = async (req, res) => {
  try {
    const todoStatus = ["completed", "pending"];
    const findQuery = {};
    const { id } = req;
    const { status } = req.query;

    findQuery.userId = id;

    // If status query is specified
    if (status && todoStatus.includes(status)) {
      findQuery.isComplete = status === todoStatus[0] ? true : false;
    }

    const todos = await Todos.findAll({
      where: findQuery,
    });

    return res.status(200).send(todos);
  } catch (error) {
    return res.status(500).send({
      error: error.message || "something went wrong while fething todo",
    });
  }
};

const completeTaskController = async (req, res) => {
  try {
    const { id } = req;
    const { todoId } = req.params;

    const updateTodo = await Todos.update(
      {
        isComplete: true,
      },
      {
        where: {
          id: todoId,
          userId: id,
        },
      }
    );

    if (!updateTodo) {
      return res.status(404).send({
        message: "No data found",
      });
    }

    return res.status(200).send(updateTodo);
  } catch (error) {
    res.status(500).send({
      error: error.message || "something went wrong while updating todo",
    });
  }
};

const removeTaskController = async (req, res) => {
  try {
    const { id } = req;
    const { todoId } = req.params;

    const removeTodo = await Todos.destroy({
      where: {
        id: todoId,
        userId: id,
      },
    });

    if (!removeTodo) {
      return res.status(404).send({
        message: "No data found",
      });
    }

    return res
      .status(200)
      .send({ message: "Data Deleted Successfully", dataCount: removeTodo });
  } catch (error) {
    res.status(500).send({
      error: error.message || "something went wrong while removing todo",
    });
  }
};

module.exports = {
  createTodoController,
  getTodoController,
  completeTaskController,
  removeTaskController,
};
