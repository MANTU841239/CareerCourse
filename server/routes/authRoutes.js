const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../db");

const router = express.Router();



// REGISTER USER

router.post("/register", async (req, res) => {

  try {

    const { email, password } = req.body;

    // CHECK EMPTY FIELDS

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // CHECK USER EXISTS

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],

      async (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500).json({
            success: false,
            message: "Database Error",
          });
        }

        // USER ALREADY EXISTS

        if (result.length > 0) {

          return res.status(400).json({
            success: false,
            message: "User already exists",
          });
        }

        // HASH PASSWORD

        const hashedPassword =
          await bcrypt.hash(password, 10);

        // INSERT USER

        db.query(
          "INSERT INTO users (email, password) VALUES (?, ?)",
          [email, hashedPassword],

          (err, insertResult) => {

            if (err) {

              console.log(err);

              return res.status(500).json({
                success: false,
                message: "Registration Failed",
              });
            }

            return res.status(201).json({
              success: true,
              message: "Registration Successful",
              user: {
                id: insertResult.insertId,
                email: email,
              },
            });
          }
        );
      }
    );

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});



// LOGIN USER

router.post("/login", (req, res) => {

  try {

    const { email, password } = req.body;

    // CHECK EMPTY FIELDS

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // FIND USER

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],

      async (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500).json({
            success: false,
            message: "Database Error",
          });
        }

        // USER NOT FOUND

        if (result.length === 0) {

          return res.status(400).json({
            success: false,
            message: "User not found",
          });
        }

        const user = result[0];

        console.log("Entered Password:", password);
        console.log("Stored Password:", user.password);

        // CHECK PASSWORD

        const isMatch =
          await bcrypt.compare(
            password,
            user.password
          );

        if (!isMatch) {

          return res.status(400).json({
            success: false,
            message: "Invalid password",
          });
        }

        // LOGIN SUCCESS

        return res.status(200).json({
          success: true,
          message: "Login Successful",
          user: {
            id: user.id,
            email: user.email,
          },
        });
      }
    );

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});



module.exports = router;


