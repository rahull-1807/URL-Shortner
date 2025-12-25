const USER = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check existing user
    const existingUser = await USER.findOne({ emailid: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await USER.create({
      name: username,
      emailid: email,
      password: hashedPassword
    });

    return res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

async function loginUser(req, res) {
  try {
    

    const { email, password } = req.body || {};
   

    const user = await USER.findOne({ emailid: email });
  

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }


    const isMatch = await bcrypt.compare(password, user.password);
 

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

   const token = jwt.sign(
  { id: user._id, email: user.emailid },
  "SECRET_KEY",
  { expiresIn: "1d" }
);

    return res.json({ token });

  } catch (err) {

    return res.status(500).json({ message: "Server error" });
  }
}



module.exports = { createUser , loginUser };
