const mongoose = require('mongoose');
const Expense = require('../models/expense');

exports.create_entry = (req, res, next) => {
    const expense = new Expense({
        _id: new mongoose.Types.ObjectId(),
        date: req.body.date,
        'mode': req.body.mode,
        'amount': req.body.amount,
        'description': req.body.description

    });
    expense.save()
        .then((results) => {
            console.log(results);
            const response = {
                success: true,
                data: results
            };
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                error: error
            })
        })

};

exports.get_entries = (req, res, next) => {
    Expense.find().select("_id date mode amount description").exec()
        .then(results => {
            const response = {
                count: results.length,
                data: results
            }
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
};

exports.get_single_entry = (req, res, next) => {
    const id = req.params.expenseId;
    Expense.findById(id).select("_id date mode amount description").exec()
        .then(record => {

            if (record) {
                res.status(200).json(record);
            } else {
                res.status(404).json({
                    error: 'no valid entry found'
                })
            }


        })
        .catch(error => {
            res.status(500).json({
                success: false,
                error: error
            })
        })
};

exports.delete_single_entry = (req, res, next) => {
    const id = req.params.expenseId;
    Expense.deleteOne({ _id: id }).exec()
        .then((result) => {
            res.status(200).json({
                successs: true,
                record: result
            })
        })
        .catch(error => {
            res.status(500).json({
                successs: false,
                error: error
            })
        })
};

exports.update_entry = (req, res, next) => {
    const id = req.params.expenseId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Expense.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                successs: true,
                updated: result
            });
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                error: error
            })
        })

};

