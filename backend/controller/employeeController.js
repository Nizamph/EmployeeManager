const Employee = require('../models/employeeModel');

const addEmployee = async (req, res) => {
  try {
    const { imgUrl, name, designation, age, contactNo, salary } = req.body;
    console.log('route working');
    if (!name || !age || !contactNo || !salary || !designation) {
      console.log('inside if');
      res.status(400);
      throw new Error('Please add all details');
    }
    let EmployeeData = {};
    if (imgUrl) {
      EmployeeData = new Employee({
        name: name,
        designation: designation,
        age: age,
        contactNo: contactNo,
        salary: salary,
        pic: imgUrl,
      });
    } else {
      EmployeeData = new Employee({
        name: name,
        designation: designation,
        age: age,
        contactNo: contactNo,
        salary: salary,
      });
    }
    console.log('employeeData', EmployeeData);
    const savedEmployee = await EmployeeData.save();
    console.log('employeeData', savedEmployee);
    res.status(201).json(savedEmployee);
  } catch (err) {
    console.log('error', err);
    res.status(500).json({ errorMessage: 'something went wrong' });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id, imgUrl, name, age, contactNo, salary, designation } = req.body;
    if (!id || !name || !age || !contactNo || !salary || !designation) {
      res.status(400);
      throw new Error('Please add all details');
    }
    const updatedEmployee = await Employee.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        age: age,
        contactNo: contactNo,
        salary: salary,
        pic: imgUrl,
        designation: designation,
      },
      { new: true }
    );
    console.log('updatedCartData', updatedEmployee);
    if (updateEmployee) {
      res.status(201).json({
        updatedEmployee: updatedEmployee,
      });
    }
  } catch (err) {
    console.log('error from update', err);
    res.status(500).json({ errorMessage: 'internal server error' });
  }
};

const getEmployees = async (req, res) => {
  try {
    const allEmployees = await Employee.find({});
    console.log('all Employees', allEmployees);
    res.status(201).json({ allEmployees: allEmployees });
  } catch (err) {
    res.status(500).json({
      message: 'internal server error',
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400);
      throw new Error('Please provide id to delete');
    }
    const deletedItem = await Employee.findOneAndDelete({
      _id: id,
    });
    res.status(201).json({ deletedItem: deletedItem });
  } catch (err) {
    res.status(501).json({
      error: 'internal server error',
    });
  }
};

const paginationEmployees = async (req, res) => {
  try {
    const { page, limit } = req.query;
    console.log('page', page);
    console.log('limit', limit);
    if (!page || !limit) {
      res.status(400).json({
        errorMessage: 'add page and limit for pagination',
      });
    }
    const allEmployees = await Employee.find({});
    console.log('allEmployeed', allEmployees.length);
    const data = allEmployees.slice(page * limit - limit, page * limit);
    console.log('data after slicing', data);
    res
      .status(201)
      .json({ totalLimit: allEmployees.length, paginatedData: data });
  } catch (err) {
    res.status(501).json({ error: 'internal server error' });
    throw new Error('internal server error');
  }
};

module.exports = {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees,
  paginationEmployees,
};
