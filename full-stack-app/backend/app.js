import { main } from "./Db.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { User } from "./Schema.js";
import jwt from "jsonwebtoken";
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.post("/signupDetails", async (req, res) => {
  const data = req.body;
  const { name, phoneNumber, email, password } = data;

  try {
    const { user_details } = await main();

    const existingUser = await user_details.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", existingUser);
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const newUser = new User({ name, phoneNumber, email, password });
    await user_details.insertOne(newUser);
    console.log("newUser", newUser);
    res.status(200).json({ message: "Succesfully inserted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
});

app.post("/signinDetails", async (req, res) => {
  const { user_details } = await main();
  const data = req.body;
  const { email, password } = data;

  try {
    const user = await user_details.findOne({ email });

    console.log(user);
    if (!user) {
      res.status(400).send({ message: "User not Found in the Database" });
    }

    if (user.password === password) {
      const token = jwt.sign({ email: user.email }, "Please like video", {
        expiresIn: "2h",
      });

      res.status(200).send({ message: "User in the Database" });
    } else {
      res.status(400).send({ message: "Invalid Password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/InsertVegitableData", async (req, res) => {
  const { vegitable_data } = await main();
  const dataArray = req.body; // Assuming req.body is an array of objects

  try {
    // Insert each object in the array into MongoDB
    const insertResults = await Promise.all(
      dataArray.map(async (data) => {
        return await vegitable_data.insertOne(data);
      })
    );

    console.log("Successfully inserted into vegitable_data", insertResults);
    res.status(200).json({
      message: "Data inserted successfully into vegitable_data",
      data: insertResults,
    });
  } catch (error) {
    console.error("Error inserting data into vegitable_data", error);
    res
      .status(500)
      .json({ message: "Failed to insert data into vegitable_data", error });
  }
});

app.get("/getAllVegetables", async (req, res) => {
  const { vegitable_data } = await main();

  try {
    // Fetch all documents from the vegitable_data collection
    const vegetables = await vegitable_data.find({}).toArray();
    console.log(vegetables);
    res.status(200).json(vegetables);
  } catch (error) {
    console.error("Error fetching vegetables", error);
    res.status(500).json({ message: "Failed to fetch vegetables", error });
  }
});

main();
app.listen(3820, () => {
  console.log("3820");
});
