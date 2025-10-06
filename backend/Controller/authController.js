const db = require("../database/db"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists in the database
    db.get("SELECT * FROM employee WHERE email = ?", [email], async (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error", success: false });
      }

      if (!user) {
        return res.status(404).json({
          message: "User doesn't exist. Please register first.",
          success: false,
        });
      }

      // Compare password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(403).json({
          message: "Incorrect password. Check your details.",
          success: false,
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { email: user.email, id: user.emp_id, role: user.role || "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Login successful",
        success: true,
        token,
        email: user.email,
        user: user.name,
        role: user.role || "admin",
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err, success: false });
  }
};

module.exports = { login };
