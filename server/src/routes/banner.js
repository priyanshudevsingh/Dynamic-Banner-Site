const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
const userMiddleware = require("../middleware/user");

const bannerRouter = Router();
const prisma = new PrismaClient();

// banner create route
bannerRouter.post("/create",userMiddleware, async (req, res) => {
  try {
    const body = req.body;
    const banner = await prisma.banner.create({
      data: {
        description: body.description,
        url: body.url,
        timer: body.timer,
      },
    });

    return res.status(201).json({ id: banner.id });
  } catch (err) {
    console.log(err);
  }
});

// banner update route
bannerRouter.put("/update", userMiddleware, async (req, res) => {
  try {
    const body = req.body;
    const banner = await prisma.banner.update({
      where: {
        id: body.id,
      },
      data: {
        description: body.description,
        url: body.url,
        timer: body.timer,
      },
    });

    return res.status(201).json({ id: banner.id });
  } catch (err) {
    console.log(err);
  }
});

//banner getter route
bannerRouter.get("/get", async (req, res) => {
  try {
    const banner = await prisma.banner.findFirst();
    return res.status(200).json(banner);
  } catch (err) {
    console.log(err);
  }
});

module.exports = bannerRouter;
