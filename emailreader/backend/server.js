import { OAuth2Client } from "google-auth-library";
import express from "express";
import cors from "cors";

const app = express();
const client = new OAuth2Client("807669090767-llgvrlojm7amhibj90u0baqit39f4rh0.apps.googleusercontent.com");

app.use(cors());
app.use(express.json());

app.post("/api/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "807669090767-llgvrlojm7amhibj90u0baqit39f4rh0.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    // Optionally, create or find the user in your database
    console.log("Google user verified:", email);

    // Respond with a token
    res.json({ message: "Google Login successful", token: "fake-jwt-token" });
  } catch (err) {
    res.status(401).json({ message: "Invalid Google token" });
  }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
