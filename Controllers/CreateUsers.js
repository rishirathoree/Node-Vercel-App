import Users from "../Model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const JWT_PRIVATE_KEY = 'vok2becibeub3fb2iubdxcbqx32dg932'

const checkEmail = (emailVal) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(emailVal);
  return isValidEmail;
};

export const CreateAuthentication = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const findEmail = await Users.findOne({ email });
    const isValidEmail = checkEmail(email);

    if (findEmail) {
      return res.json({ msg: `User already exists with this email: ${email}` });
    }
    if (!isValidEmail) {
      return res.json({
        EmailError:
          "Check your email please, only users with Gmail accounts are allowed to login.",
      });
    }

    const saltRounds = 10;

    const becryptedPassword = await bcrypt.hash(password, saltRounds);

    const profileLink = `http://localhost:8000/images/${req.files[0].filename}`;

    const createUsers = new Users({
      name,
      email,
      password: becryptedPassword,
      profilePic: profileLink,
    });

    await createUsers.save()

    return res.json({
      msg: "created user succeessfully",
      success: 1,
      user: createUsers,
    });
  } catch (error) {
    throw error;
  }
};

export const CheckAuthTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ tokenError: "Token Required", success: 0 });
  }
  try {
    const tokenWithoutBearer = token.split("Bearer ")[1];

    const decodedJwtToken = jwt.verify(
      tokenWithoutBearer,
      JWT_PRIVATE_KEY
    );

    if (!decodedJwtToken) {
      return res
        .status(200)
        .json({ tokenErr: "token not verified", success: 0 });
    }

    req.user = decodedJwtToken.Email;

    next();
  } catch (error) {
    return res.status(500).json({ success: 0, msg: "Internet error" });
  }
};

export const AuthenticateSomeone = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email && !Password) {
    return res.status(200).json({
      EmailRequired: "Email are required",
      PasswordRequired: "Password are  required",
      success: 0,
    });
  } else {
    if (!Email) {
      return res
        .status(200)
        .json({ EmailRequired: "Email are required", success: 0 });
    }
    if (!Password) {
      return res
        .status(200)
        .json({ PasswordRequired: "Password are required", success: 0 });
    }
  }

  try {
    const GettingUserInsideDatabase = await Users.findOne({ email:Email });
    console.log(GettingUserInsideDatabase)

    if (!GettingUserInsideDatabase) {
      return res.status(200).json({ ExistEmail: "User Not Found", success: 0 });
    }

    const EncryptingPassword = await bcrypt.compare(
      Password,
      GettingUserInsideDatabase.password
    );

    if (EncryptingPassword) {
      const createToken = jwt.sign({ email:Email }, JWT_PRIVATE_KEY);
      return res
        .status(200)
        .json({
          msg: "successful login",
          success: 1,
          User: GettingUserInsideDatabase,
          token: createToken,
        });
    } else {
      return res
        .status(200)
        .json({ PasswordIncorrect: "Password Not Valid", success: 0 });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(200)
        .json({ msg: "Validation error", errors: error.errors, success: 0 });
    } else {
      return res.status(200).json({ msg: "Internal server error", success: 0 });
    }
  }
};

export const checkRoles = (roles) => {
  return async (req, res, next) => {
    const user = await Users.findOne({ Email: req.user });

    const userRoles = user.role;

    const hasRequiredRole = roles.some((role) => userRoles.includes(role));

    if (hasRequiredRole) {
      next();
    } else {
      return res
        .status(200)
        .json({
          RoleRestricted: "Cannot Access the api because role wasn't matched",
          success: 0,
        });
    }
  };
};
