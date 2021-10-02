const Employee = require("../models/Employee");

module.exports = {
  errorMessage: "An error occured!",
  index: async function (req, res, next) {
    try {
      const employees = await Employee.find();

      return res.json({ employees });
    } catch (error) {
      res.json({ message: this.errorMessage, error });
    }
  },
  show: async function (req, res, next) {
    try {
      const { employeeID } = req.body;
      const foundEmployee = await Employee.findById(employeeID);

      return res.json({ foundEmployee });
    } catch (error) {
      res.json({ message: this.errorMessage, error });
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

      if (req.files) {
        let path = "";
        req.files.forEach((file) => {
          path += file.path + ",";
        });
        console.log(path);
        console.log(
          "path.lastIndexOf(",
          ")",
          path.substring(0, path.lastIndexOf(","))
        );
        path = path.substring(0, path.lastIndexOf(","));
        employee.avatar = path;
      }
      await employee.save();

      return res.json({ message: "Employee added successfully!", employee });
    } catch (error) {
      res.json({ message: this.errorMessage, error });
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
      res.json({ message: this.errorMessage, error });
    }
  },
  destory: async function (req, res, next) {
    try {
      const { employeeID } = req.body;
      await Employee.findByIdAndRemove(employeeID);

      return res.json({ message: "Employee deleted successfully!" });
    } catch (error) {
      res.json({ message: this.errorMessage, error });
    }
  },
};
