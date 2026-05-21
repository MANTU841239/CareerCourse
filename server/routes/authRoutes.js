const express = require("express");

const bcrypt = require("bcryptjs");

const db = require("../db");

const router = express.Router();



// REGISTER

router.post("/register", async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }



    // CHECK USER

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

          (err) => {

            if (err) {

              console.log(err);

              return res.status(500).json({
                success: false,
                message: "Insert failed",
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
});



// LOGIN

router.post("/login", (req, res) => {

  const { email, password } = req.body;

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

      if (result.length === 0) {

        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }

      const user = result[0];



      // PASSWORD MATCH

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
});



module.exports = router;