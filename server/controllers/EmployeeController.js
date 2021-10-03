const Employee = require("../models/Employee");

module.exports = {
  errorMessage: "An error occured!",
  index: async function (req, res) {
    try {
      const employees = await Employee.find();

      return res.json({ employees });
    } catch (error) {
      res.json({ message: this.errorMessage, error });
    }
  },
  show: async function (req, res) {
    try {
      const { employeeID } = req.body;
      const foundEmployee = await Employee.findById(employeeID);

      return res.json({ foundEmployee });
    } catch (error) {
      res.json({ message: this.errorMessage, error });
    }
  },
  store: async function (req, res) {
    try {
      const employee = new Employee(req.body);

      if (req.files) {
        let path = "";
        req.files.forEach((file) => {
          path += file.path + ",";
        });
        path = path.substring(0, path.lastIndexOf(","));
        employee.avatar = path;
      }
      employee.save();

      return res.json({ message: "Employee added successfully!" });
    } catch (error) {
      res.json({ message: this.errorMessage, error });
    }
  },
  update: async function (req, res) {
    try {
      const { name, designation, email, phone, age, employeeID } = req.body;
      const updatedData = { name, designation, email, phone, age };

      const employee = await Employee.findByIdAndUpdate(
        employeeID,
        { $set: updatedData },
        { new: true }
      );

      return res.json({ message: "Employee updated successfully!", employee });
    } catch (error) {
      res.json({ message: this.errorMessage, error });
    }
  },
  destory: async function (req, res) {
    try {
      const { employeeID } = req.body;
      await Employee.findByIdAndRemove(employeeID);

      return res.json({ message: "Employee deleted successfully!" });
    } catch (error) {
      res.json({ message: this.errorMessage, error });
    }
  },
};
