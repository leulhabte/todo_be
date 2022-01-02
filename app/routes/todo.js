const router = require("express").Router();
const { createTodoValidator } = require("../validators/todo.validator");
const {
  createTodoController,
  getTodoController,
  completeTaskController,
  removeTaskController,
} = require("../controllers/todo.controller");

// CREATE TODO
router.post("/", createTodoValidator, createTodoController);

// GET TODO LISTS
router.get("/", getTodoController);

// CHECK or UNCHECK TODO
router.put("/:todoId", completeTaskController);

// REMOVE TODO
router.delete("/:todoId", removeTaskController);

module.exports = router;
