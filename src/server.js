// import express from "express";
// import cors from "cors";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const app = express();
// const PORT = 5000;

// app.use(cors());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// function getProducts() {
//     const shoesDir = path.join(__dirname, "../public/shoes"); // Adjusted path
//     if (!fs.existsSync(shoesDir)) return [];

//     return fs.readdirSync(shoesDir).map((folder) => {
//         const productDir = path.join(shoesDir, folder);
//         if (!fs.lstatSync(productDir).isDirectory()) return null;

//         const images = fs.readdirSync(productDir).filter(file => file.endsWith(".png"));

//         return {
//             id: folder,
//             name: `Product ${folder}`,
//             price: `$${(Math.random() * 50 + 10).toFixed(2)}`,
//             image: `/shoes/${folder}/${images[0] || "1.png"}`,
//             gallery: fs.existsSync(path.join(productDir, "details"))
//                 ? fs.readdirSync(path.join(productDir, "details"))
//                     .map(file => `/shoes/${folder}/details/${file}`)
//                 : [],
//         };
//     }).filter(Boolean);
// }

// app.get("/api/products", (req, res) => {
//     res.json(getProducts());
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });


import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const shoesDir = path.join(process.cwd(), "public/shoes");

// Helper function to read product info
function getProductInfo(folder) {
    const infoPath = path.join(shoesDir, folder, "info.txt");
    if (!fs.existsSync(infoPath)) return null;

    const infoData = fs.readFileSync(infoPath, "utf-8").split("\n");
    const name = infoData.find(line => line.startsWith("name:"))?.split(": ")[1] || `Product ${folder}`;
    const price = infoData.find(line => line.startsWith("price:"))?.split(": ")[1] || "$0.00";
    const sizes = infoData.find(line => line.startsWith("size:"))?.split(": ")[1] || "";
    const description = infoData.find(line => line.startsWith("Desc:"))?.split(": ")[1] || "No description available";

    return {
      id: folder,
      name,
      price,
      sizes,
      description, // Add this line
      image: `/shoes/${folder}/1.png`
    };
}

  

// API to get all products
app.get("/api/products", (req, res) => {
  if (!fs.existsSync(shoesDir)) return res.json([]);

  const products = fs.readdirSync(shoesDir)
    .map(folder => getProductInfo(folder))
    .filter(Boolean); // Remove null values

  res.json(products);
});

// API to get details of a single product
app.get("/api/product/:id", (req, res) => {
  const product = getProductInfo(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// Serve static files from public folder
app.use("/shoes", express.static(path.join(process.cwd(), "public/shoes")));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
