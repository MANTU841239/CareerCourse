const bcrypt = require("bcryptjs");
const db = require("../db");



// REGISTER

exports.registerUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],

      async (err, result) => {

        if (err) {
          return res.status(500).json({
            success: false,
            message: "Database error",
          });
        }

        if (result.length > 0) {
          return res.status(400).json({
            success: false,
            message: "User already exists",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          "INSERT INTO users (email, password) VALUES (?, ?)",
          [email, hashedPassword],

          (err) => {

            if (err) {
              return res.status(500).json({
                success: false,
                message: "Registration failed",
              });
            }

            res.status(201).json({
              success: true,
              message: "Registration successful",
            });
          }
        );
      }
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// LOGIN

exports.loginUser = (req, res) => {

  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],

    async (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }

      if (result.length === 0) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid password",
        });
      }

      res.status(200).json({
        success: true,
        message: "Login successful",
      });
    }
  );
};