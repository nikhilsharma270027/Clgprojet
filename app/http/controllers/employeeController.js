// employeeController.js
const Employee = require('../../models/employee');

exports.getEmployees = async (req, res) => {
    try {
      
      // Fetch all employees and render the employee list
      const employees = await Employee.find({});
      res.render('employee', { employees });
    } catch (err) {
      console.error(err);
      res.send('Error fetching from the database.');
    }
  };
  
  exports.submitEmployee = async (req, res) => {
    const { firstname, lastname, age, dob, address, phone,role } = req.body;
  
    const employee = new Employee({
      firstname,
      lastname,
      role,
      age,
      dob,
      address,
      phone,
    });
  
    try {
      await employee.save();
  
      // Fetch all employees and render the employee list
      const employees = await Employee.find({});
      res.render('employee', { employees });
    } catch (err) {
      console.error(err);
      res.send('Error saving to the database.');
    }
  };