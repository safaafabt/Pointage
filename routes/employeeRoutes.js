const express = require('express');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getEmployees);
router.get('/:dateCreated', employeeController.getEmployeesByDateCreated);
router.post('/check-in', employeeController.checkIn);
router.post('/check-out', employeeController.checkOut);

module.exports = router;