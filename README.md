 # Pointage API - Employee Check-in and Check-out System

The Pointage API is a RESTful Node.js application that manages employee check-in and check-out records. 
It provides endpoints to create employees, retrieve employee records by date,
 and perform check-in/check-out operations.

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/safaafabt/pointage.git
 2. Clone the repository:
    ```shell
    cd pointage
    npm install
    
 3.  Set up the database connection in `utils/database.js`:
     - Open utils/database.js
     - Modify the database connection URL to match your MongoDB configuration.
 
 4. Start the server:
     ```shell
     npm start
    
 ## Endpoints
 
 ### Create Employee
  - Method: POST
  - URL: `/employees`
  - Request Body:
    ```json
     {
    "name": "Doe",
    "firstName": "John",
    "department": "HR"
    }
  - Response Body:
      ```json
      {
        "_id": "648ec34d4590637bdadddf13",
        "name": "Doe",
        "firstName": "John",
        "dateCreated": "2023-06-18T09:00:00.000Z",
        "department": "HR"
      }
    
 ### Get Employees
  - Method: GET
  - URL: `/employees`
  - Response Body:
    ```json
     [
     {
     "_id": "648ec34d4590637bdadddf13",
     "name": "Doe",
     "firstName": "John",
     "dateCreated": "2023-06-18T09:00:00.000Z",
     "department": "HR"
     },
     {
     "_id": "648ec34d4590637bdadddf14",
     "name": "Smith",
     "firstName": "Jane",
     "dateCreated": "2023-06-18T09:00:00.000Z",
     "department": "Finance"
     }
     ]
    
 ### Get Employees by Date Created
  - Method: GET
  - URL: `/employees/:dateCreated`
  - Response Body:
    ```json
     [
     {
     "_id": "648ec34d4590637bdadddf13",
     "name": "Doe",
     "firstName": "John",
     "dateCreated": "2023-06-18T09:00:00.000Z",
     "department": "HR"
     },
     {
     "_id": "648ec34d4590637bdadddf14",
     "name": "Smith",
     "firstName": "Jane",
     "dateCreated": "2023-06-18T09:00:00.000Z",
     "department": "Finance"
     }
     ]

    
 ### Check-In
 
  - Method: POST 
   - URL: `/employees/check-in`
   - Request Body:
     ```json
      {
       "employeeId": "648ec34d4590637bdadddf13",
       "comment": "Arrived at the office"
     }
   - Response Body:
       ```json
       {
         "_id": "648ec34d4590637bdadddf13",
         "name": "Doe",
         "firstName": "John",
         "dateCreated": "2023-06-18T09:00:00.000Z",
         "department": "HR",
         "checkIn": "2023-06-18T10:43:01.799Z",
         "checkInComment": "Arrived at the office"
       }
     
 ### Check-Out
 
  - Method: POST 
   - URL: `/employees/check-out`
   - Request Body:
     ```json
      {
       "employeeId": "648ec34d4590637bdadddf13",
       "comment": "Leaving the office"
     }
   - Response Body:
       ```json
       {
         "_id": "648ec34d4590637bdadddf13",
         "name": "Doe",
         "firstName": "John",
         "dateCreated": "2023-06-18T09:00:00.000Z",
         "department": "HR",
         "checkIn": "2023-06-18T10:43:01.799Z",
         "checkInComment": "Arrived at the office",
         "checkOut": "2023-06-18T11:27:49.453Z",
         "checkOutComment": "Leaving the office",
         "duration": "0 hours 44 minutes 47 seconds"
       }
     
## Configuration
The MongoDB connection URL should be set in the utils/database.js file.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose

## Testing
Unit tests are available for the services.To run the unit tests, execute the following command:
  ```shell
  npm test