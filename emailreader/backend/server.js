import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const users = [
  { email: "user1@example.com", password: "password123" },
];

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.json({ message: "Login successful", token: "fake-jwt-token" });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
