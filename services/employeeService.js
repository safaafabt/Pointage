const Employee = require('../models/employee');

async function createEmployee(employeeData) {
    const {  name, firstName, department } = employeeData;
        const dateCreated = new Date();

        const employee = new Employee({
            name,
            firstName,
            dateCreated,
            department,
        });

        await employee.save();
    return employee;
}

async function getEmployees() {
    const employees = await Employee.find();
    return employees;
}

async function getEmployeesByDateCreated(dateCreated) {
    const startOfDay = new Date(dateCreated).toISOString();
    const endOfDay = new Date(dateCreated);
    endOfDay.setDate(endOfDay.getDate() + 1);
    endOfDay.setMilliseconds(-1);
    const endOfDayISOString = endOfDay.toISOString();

    const employees = await Employee.find({
        dateCreated: { $gte: startOfDay, $lt: endOfDayISOString },
    });
    return employees;
}

async function checkIn(employeeId, comment) {
    const employee = await Employee.findById(employeeId);
    if (employee) {
        employee.checkIn = new Date();
        employee.checkInComment = comment;
        await employee.save();
    }

    return employee;
}
const formatDuration = (duration) => {
    const hours = Math.floor(duration / (60 * 60 * 1000));
    const minutes = Math.floor((duration % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((duration % (60 * 1000)) / 1000);

    return `${hours} hours ${minutes} minutes ${seconds} seconds`;
}

async function checkOut(employeeId, comment) {
    const employee = await Employee.findById(employeeId);
        if (employee) {
            employee.checkOut = new Date();
            employee.checkOutComment = comment;

            if (employee.checkIn) {
                const checkInTime = employee.checkIn.getTime();
                const checkOutTime = employee.checkOut.getTime();
                employee.duration = formatDuration(checkOutTime - checkInTime);
            }

            await employee.save();
        }

    return employee;
}

module.exports = {
    createEmployee,
    getEmployees,
    getEmployeesByDateCreated,
    checkIn,
    checkOut,
};