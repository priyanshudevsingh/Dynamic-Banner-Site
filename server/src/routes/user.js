const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const {
  signupInput,
  signinInput,
} = require("@priyanshudevsingh/medium-common");
const userMiddleware = require("../middleware/user");

const userRouter = Router();
const prisma = new PrismaClient();

// signup route
userRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupInput.safeParse(body);
  if (!success) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return res.status(201).json({ jwt: token });
  } catch (err) {
    console.log(err);
  }
});

// signin route
userRouter.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinInput.safeParse(body);
  if (!success) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return res.status(201).json({ jwt: token });
  } catch (err) {
    console.log(err);
  }
});

// get user details route
userRouter.get("/details", userMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userdata.id,
      },
      select: {
        name: true,
        email: true,
        id: true,
      },
    });

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = userRouter;
