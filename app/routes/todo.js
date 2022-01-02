const router = require("express").Router();
const { createTodoValidator } = require("../validators/todo.validator");
const {
  createTodoController,
  getTodoController,
  completeTaskController,
  removeTaskController,
} = require("../controllers/todo.controller");

router.post("/", createTodoValidator, createTodoController);
router.get("/", getTodoController);
router.put("/:todoId", completeTaskController);
router.delete("/:todoId", removeTaskController);

module.exports = router;
