import rgbHex from "rgb-hex";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import axios from "axios";
import cors from "cors";

const app = express();
const port = "8000";

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({ secret: "ssshhhhh", saveUninitialized: true, resave: false })
);
app.use(cors());

export const fetchColors = async () => {
  const url = "http://colormind.io/api/";
  const body = {
    model: "ui",
    input: ["N", "N", "N"],
  };

  try {
    const response = await axios.post(url, body);
    const paletteColors = response.data.result.map(([r, g, b]) => {
      const hexValue = rgbHex(r, g, b);
      return hexValue;
    });
    console.log("paletteColors: ", paletteColors);
    return paletteColors;
  } catch (error) {
    console.error("Error fetching colors:", error);
  }
};

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/random-palette", async (req, res) => {
  const colors = await fetchColors();
  return res.json({ colors });
});

app.listen(port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);

