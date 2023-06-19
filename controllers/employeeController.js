const employeeService = require('../services/employeeService');

async function createEmployee(req, res) {
    try {
        const employeeData = req.body;
        const employee = await employeeService.createEmployee(employeeData);
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getEmployees(req, res) {
    try {
        const employees = await employeeService.getEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getEmployeesByDateCreated(req, res) {
    try {
        const dateCreated = req.params.dateCreated;
        const employees = await employeeService.getEmployeesByDateCreated(dateCreated);
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function checkIn(req, res) {
    try {
        const { employeeId, comment } = req.body;
        const employee = await employeeService.checkIn(employeeId, comment);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function checkOut(req, res) {
    try {
        const { employeeId, comment } = req.body;
        const employee = await employeeService.checkOut(employeeId, comment);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    createEmployee,
    getEmployees,
    getEmployeesByDateCreated,
    checkIn,
    checkOut,
};