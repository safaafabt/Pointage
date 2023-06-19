const Employee = require('../models/employee');
const {
    createEmployee,
    getEmployees,
    getEmployeesByDateCreated,
    checkIn,
    checkOut,
} = require('../services/employeeService');

jest.mock('../models/employee');

describe('Employee Management', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });


    describe('createEmployee', () => {
        it('should create a new employee', async () => {
            const mockEmployeeData = {
                name: 'John Doe',
                firstName: 'John',
                department: 'Engineering',
            };

            const mockNewEmployee = {
                _id: 'mockId',
                name: 'John Doe',
                firstName: 'John',
                dateCreated: new Date(),
                department: 'Engineering',
                save: jest.fn().mockResolvedValue(),
            };

            Employee.mockImplementation(() => mockNewEmployee);

            const result = await createEmployee(mockEmployeeData);

            expect(Employee).toHaveBeenCalledTimes(1);
            expect(mockNewEmployee.save).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockNewEmployee);
        });
    });

    describe('getEmployees', () => {
        it('should retrieve all employees', async () => {
            const mockEmployees = [
                { _id: 'mockId1', name: 'John Doe', firstName: 'John' },
                { _id: 'mockId2', name: 'Jane Smith', firstName: 'Jane' },
            ];

            Employee.find.mockResolvedValue(mockEmployees);

            const result = await getEmployees();

            expect(Employee.find).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockEmployees);
        });
    });

    describe('checkIn', () => {
        it('should check in an employee', async () => {
            const mockEmployeeId = 'mockId';
            const mockComment = 'Check-in comment';

            const mockEmployee = {
                _id: mockEmployeeId,
                name: 'John Doe',
                firstName: 'John',
                save: jest.fn().mockResolvedValue(),
            };

            Employee.findById.mockResolvedValue(mockEmployee);

            const result = await checkIn(mockEmployeeId, mockComment);

            expect(Employee.findById).toHaveBeenCalledTimes(1);
            expect(mockEmployee.checkIn).toBeInstanceOf(Date);
            expect(mockEmployee.checkInComment).toBe(mockComment);
            expect(mockEmployee.save).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockEmployee);
        });
    });

    describe('checkOut', () => {
        it('should check out an employee', async () => {
            const mockEmployeeId = 'mockId';
            const mockComment = 'Check-out comment';

            const mockEmployee = {
                _id: mockEmployeeId,
                name: 'John Doe',
                firstName: 'John',
                checkIn: new Date('2023-06-18T09:00:00.000Z'),
                save: jest.fn().mockResolvedValue(),
            };

            Employee.findById.mockResolvedValue(mockEmployee);

            const result = await checkOut(mockEmployeeId, mockComment);

            expect(Employee.findById).toHaveBeenCalledTimes(1);
            expect(mockEmployee.checkOut).toBeInstanceOf(Date);
            expect(mockEmployee.checkOutComment).toBe(mockComment);
            expect(mockEmployee.duration).toEqual(expect.any(String));
            expect(mockEmployee.save).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockEmployee);
        });

        it('should not calculate duration if employee has no check-in time', async () => {
            const mockEmployeeId = 'mockId';
            const mockComment = 'Check-out comment';

            const mockEmployee = {
                _id: mockEmployeeId,
                name: 'John Doe',
                firstName: 'John',
                checkIn: undefined,
                save: jest.fn().mockResolvedValue(),
            };

            Employee.findById.mockResolvedValue(mockEmployee);

            const result = await checkOut(mockEmployeeId, mockComment);

            expect(Employee.findById).toHaveBeenCalledTimes(1);
            expect(mockEmployee.checkOut).toBeInstanceOf(Date);
            expect(mockEmployee.checkOutComment).toBe(mockComment);
            expect(mockEmployee.duration).toBeUndefined();
            expect(mockEmployee.save).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockEmployee);
        });
    });

});