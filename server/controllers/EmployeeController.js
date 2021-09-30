const Employee = require("../models/Employee");

module.exports = {
  errorMessage: "An error occured!",
  index: async function (req, res, next) {
    try {
      const employees = await Employee.find();

      return res.json({ employees });
    } catch (error) {
      res.json({ message: this.errorMessage });
    }
  },
  show: async function (req, res, next) {
    try {
      const { employeeID } = req.body;
      const foundEmployee = await Employee.findById(employeeID);

      return res.json({ foundEmployee });
    } catch (error) {
      res.json({ message: this.errorMessage });
    }
  },
  store: async function (req, res, next) {
    try {
      const { name, designation, email, phone, age } = req.body;
      const employee = new Employee({
        name,
        designation,
        email,
        phone,
        age,
      });
      await employee.save();

      return res.json({ message: "Employee added successfully!" });
    } catch (error) {
      res.json({ message: this.errorMessage });
    }
  },
  update: async function (req, res, next) {
    try {
      const { employeeID } = req.body;
      const { name, designation, email, phone, age } = req.body;
      const updatedData = { name, designation, email, phone, age };

      const employee = await Employee.findByIdAndUpdate(
        employeeID,
        { $set: updatedData },
        { new: true }
      );

      return res.json({ message: "Employee updated successfully!", employee });
    } catch (error) {
      res.json({ message: this.errorMessage });
    }
  },
  destory: async function (req, res, next) {
    try {
      const { employeeID } = req.body;
      await Employee.findByIdAndRemove(employeeID);

      return res.json({ message: "Employee deleted successfully!" });
    } catch (error) {
      res.json({ message: this.errorMessage });
    }
  },
};
