const {
  getAllTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  updateExpense,
  getExpensesSumary,
  deleteExpense,
} = require("../../models/transaction/transaction.model.js");
const { isTransactionValid } = require("../../services/validation.service.js");

async function httpGetAllTransactions(_, res) {
  try {
    const response = await getAllTransactions();
    // console.log("httpGetAllTransactions Response:", response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function httpGetTransaction(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Empty required field" });
    }
    const response = await getTransaction(id);
    if (response) {
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ message: "Can' get transaction" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function httpCreateTransaction(req, res) {
  try {
    const transaction = req.body;
    if (!isTransactionValid(transaction)) {
      return res.status(400).json({ message: "Empty required fiels!" });
    }
    const response = await createTransaction(transaction);
    // console.log("httpCreateTransaction response:", response);
    if (!response) {
      return res.status(400).json({ message: "Can't create transaction" });
    }

    return res.status(200).json({ message: "Transaction created" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function httpUpdateTransaction(req, res) {
  try {
    const transactionData = req.body;
    const id = req.params.id;
    const response = await updateTransaction(id, transactionData);
    // console.log("Response:", response);
    if (response) {
      return res.status(200).json({ message: "Transaction updated" });
    } else {
      return res.status(400).json({ message: "Can't update transaction" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

// ///////////////////////////////////////
// EXPENSES

async function httpUpdateExpense(req, res) {
  try {
    const { transactionId, expenseId } = req.params;
    const data = req.body;
    const response = await updateExpense(transactionId, expenseId, data);
    if (response) {
      return res.status(200).json({ message: "Expense updated successfully" });
    } else {
      return res.status(400).json({ message: "Can't update expense" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function httpGetExpensesSumary(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Empty required field" });
    }
    const response = await getExpensesSumary(id);
    if (response) {
      return res.status(200).json(response);
    } else {
      return res
        .status(400)
        .json({ message: "Can't get difference of expenses" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function httpDeleteExpense(req, res) {
  try {
    const { transactionId, expenseId } = req.params;
    const response = await deleteExpense(transactionId, expenseId);
    if (response) {
      return res.status(200).json({ message: "Deleted" });
    } else {
      return res.status(404).json({ message: "Can't delete expense" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  httpGetAllTransactions,
  httpGetTransaction,
  httpCreateTransaction,
  httpUpdateTransaction,
  httpUpdateExpense,
  httpGetExpensesSumary,
  httpDeleteExpense,
};
