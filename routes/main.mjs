import express from "express";
const router = express.Router();
import { content, user } from "./../models/post.mjs";
import bcrypt from "bcrypt";
import { email } from "./../models/forgotemail/email.mjs";

router.post(
  "/user/post/store",
  (req, res, next) => {
    if (req.session.userId) {
      next();
    } else {
      res.redirect("/");
    }
  },
  async (req, res) => {
    let data = null;
    data = req.body;
    data.imageName = req.files.image.name;
    data.data = req.files.image.data;
    data.size = req.files.image.size;
    data.mimetype = req.files.image.mimetype;
    data.encoding = req.files.image.encoding;

    // console.log(data);
    const a = await content.create(data);

    res.redirect("/");
  }
);

router.get(
  "/activepost",
  (req, res, next) => {
    if (req.session.userId) {
      next();
    } else {
      res.redirect("/");
    }
  },
  async (req, res) => {
    let value = await content.find({ email: req.session.email });

    if (value.length >= 1) {
      res.render("./../views/activepost.ejs", { value: value });
    } else {
      res.send("<h1>No Record Found</h1>");
    }
  }
);

router.get("/user/register", (req, res) => {
  res.render("./../views/newuser.ejs");
});

router.post("/register", async (req, res) => {
  // This Is Doing Password Encryption
  let enPass = await bcrypt.hash(req.body.password, 10);
  // This will Create A User Collection Data
  try {
    let a = await user.create({
      Email: req.body.email,
      Password: enPass,
      orgEmail: req.body.password,
    });

    res.redirect("/");
  } catch (err) {
    res.redirect("/user/register");
  }
});

router.post("/user/login", async (req, res) => {
  let ans = await user.find({ Email: req.body.email }); // if Empty it will return empty array.
  // res.json(ans)
  if (ans.length === 1) {
    let value = await bcrypt.compare(req.body.password, ans[0].Password);
    if (value === true) {
      req.session.userId = ans[0]._id;
      req.session.email = req.body.email;
      console.log(req.session);
      res.render("./../views/userauthdashboard.ejs", { value: null });
    } else if (value === false) {
      res.json({ Value: "Invalid Password" });
    }
  } else {
    res.json({ Value: "Record Not Found" });
  }
});

router.get(
  "/user/forgotpassword",
  (req, res, next) => {
    if (req.session.userId) {
      next();
    } else {
      res.redirect("/");
    }
  },
  (req, res) => {
    res.render("./../views/forgotpassword.ejs");
  }
);
router.post("/send/password", email);

export default router;
