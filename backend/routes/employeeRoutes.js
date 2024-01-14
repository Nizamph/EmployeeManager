const express = require('express');
const router = express.Router();
const {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  paginationEmployees,
} = require('../controller/employeeController');
router.get('/employeesList', getEmployees);
router.post('/addEmployee', addEmployee);
router.put('/updateEmployee', updateEmployee);
router.delete('/deleteEmployee', deleteEmployee);
router.get('/paginatedEmployees', paginationEmployees);

module.exports = router;
