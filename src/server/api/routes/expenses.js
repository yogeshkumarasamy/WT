const express = require('express');
const routes = express.Router();

// Import product controller
const expenseController = require('../controllers/expense');

routes.get('/', expenseController.get_entries);

routes.post('/', expenseController.create_entry); 

routes.get('/:expenseId', expenseController.get_single_entry);

routes.patch('/:expenseId', expenseController.update_entry);

routes.delete('/:expenseId', expenseController.delete_single_entry);

module.exports = routes;