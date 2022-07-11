const transactions = require("./transaction.mongo");

async function getAllTransactions() {
  try {
    return await transactions.find({});
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getTransaction(_id) {
  try {
    return await transactions.findOne({ _id }, { __v: 0 });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createTransaction(transaction) {
  try {
    return await transactions.create(transaction);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateTransaction(_id, transactionData) {
  try {
    const query = await transactions.findOne({ _id }, { expenses: 1 });
    const oldExpenses = transactionData.expenses || [];
    const newExpenses = [...oldExpenses, ...query.expenses];
    // console.log("updateTransactionExpenses,expenses:", newExpenses);
    const newTransaction = { ...transactionData, expenses: newExpenses };
    const response = await transactions.updateOne({ _id }, newTransaction);
    return (
      response.acknowledged === true &&
      response.matchedCount === 1 &&
      response.modifiedCount === 1
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

// EXPENSES OPERATIONS

async function updateExpense(transactionId, expenseId, expenseData) {
  try {
    const foundTransaction = await transactions.findOne(
      { _id: transactionId },
      { expenses: 1 }
    );
    const updatedExpenses = foundTransaction.expenses.map((expenseItem) => {
      if (expenseItem["_id"].toString() === expenseId) {
        // console.log("ExpenseItem:", expenseItem);
        return {
          _id: expenseItem["_id"],
          title: expenseData.title ? expenseData.title : expenseItem.title,
          income: expenseData.income ? expenseData.income : expenseItem.income,
          amount: expenseData.amount ? expenseData.amount : expenseItem.amount,
        };
      } else {
        return expenseItem;
      }
    });
    console.log("updatedExpenses:", updatedExpenses);
    const response = await transactions.updateOne(
      { _id: transactionId },
      { expenses: updatedExpenses }
    );
    console.log("UpdateExpense res:", response);
    return (
      response.acknowledged === true &&
      response.matchedCount === 1 &&
      response.modifiedCount === 1
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getExpensesSumary(_id) {
  try {
    const transaction = await transactions.findOne({ _id }, { expenses: 1 });
    const expenses = transaction.expenses;
    // const totalBalance = expenses.reduce(
    //   (accumulator, expenseItem) => accumulator + expenseItem.amount,
    //   0
    // );
    const totalExpenseIncome = expenses.reduce((accumulator, expenseItem) => {
      if (expenseItem.income) {
        return accumulator + expenseItem.amount;
      } else {
        return accumulator;
      }
    }, 0);

    const totalExpenseOutcome = expenses.reduce((accumulator, expenseItem) => {
      if (!expenseItem.income) {
        return accumulator + expenseItem.amount;
      } else {
        return accumulator;
      }
    }, 0);

    return {
      totalExpenseIncome,
      totalExpenseOutcome,
      difference: totalExpenseIncome - totalExpenseOutcome,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteExpense(transactionId, expenseId) {
  try {
    const foundTransaction = await transactions.findOne(
      { _id: transactionId },
      { expenses: 1 }
    );
    const newExpenses = foundTransaction.expenses.filter(
      (expenseItem) => expenseItem["_id"].toString() !== expenseId
    );
    const response = await transactions.updateOne(
      { _id: transactionId },
      { expenses: newExpenses }
    );
    return (
      response.acknowledged === true &&
      response.matchedCount === 1 &&
      response.modifiedCount === 1
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getAllTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  updateExpense,
  getExpensesSumary,
  deleteExpense,
};
