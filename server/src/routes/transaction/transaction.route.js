const express = require("express");
const {
  httpGetAllTransactions,
  httpCreateTransaction,
  httpUpdateTransaction,
  httpUpdateExpense,
  httpGetTransaction,
  httpGetExpensesSumary,
  httpDeleteExpense,
} = require("./transaction.controller");

const transactionRoute = express.Router();

transactionRoute.get("/", httpGetAllTransactions);
transactionRoute.get("/:id", httpGetTransaction);
transactionRoute.get("/:id/sumary", httpGetExpensesSumary);
transactionRoute.post("/new", httpCreateTransaction);
transactionRoute.put("/:id/update", httpUpdateTransaction);
transactionRoute.post("/:transactionId/:expenseId/update", httpUpdateExpense);
transactionRoute.delete("/:transactionId/:expenseId/delete", httpDeleteExpense);

module.exports = transactionRoute;
