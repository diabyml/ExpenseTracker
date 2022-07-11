const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  loggedInUser: { type: String, required: true },
  by: { type: String, required: true },
  date: { type: Date, default: Date.now(), required: true },
  expenses: [
    {
      title: { type: String, required: true },
      income: { type: Boolean, required: true },
      amount: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Transaction", transactionSchema);
