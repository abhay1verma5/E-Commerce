const bcrypt = require('bcryptjs');

const User = require("../models/User")

const jwt = require("jsonwebtoken")





exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(201).json({
        success: false,
        message: 'Please fill up all the required fields',
      });
    }

   

    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(201).json({
        success: false,
        message: 'Email is already registered',
      });
    }
    console.log(existingUser,"sdjds")
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      }
    );

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: { name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({
      success: false,
      message: 'Signup failed. Please try again.',
    });
  }
};


exports.login = async (req, res) => {
  try {
   
    const { email, password } = req.body

   
    if (!email || !password) {
    
      return res.status(201).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      })
    }

   
    const user = await User.findOne({ email })

  
    if (!user) {
     
      return res.status(201).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      })
    }  

    
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      )

   
     
      user.password = undefined
     
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }
      res.cookie("token", token, options).status(201).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      })
    } else {
      return res.status(201).json({
        success: false,
        message: `Password is incorrect`,
      })
    }
  } catch (error) {
    console.error(error)
   
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    })
  }
}
