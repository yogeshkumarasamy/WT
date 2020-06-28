const mongoose = require( 'mongoose' );

const expenseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: { type: Date, required: true },
    mode: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true }
});
module.exports = mongoose.model('Expense', expenseSchema); 