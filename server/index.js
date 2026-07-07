require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDb = require("./utils/db")
const adminRoute = require("./admin/admin.route")
const contactRoute = require('./contact/contact.route')
const authRoute = require("./auth/auth.route")
const productRoute = require("./product/product.route")

const app = express()
const PORT = 3000
app.use(express.json())
const allowedOrigins = process.env.FRONTEND_URI
  ? process.env.FRONTEND_URI.split(",").map(s => s.trim())
  : [];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}))

app.use("/api/auth", authRoute)
app.use("/api/contact", contactRoute)
app.use("/api/admin", adminRoute)
app.use("/api/product", productRoute)

app.get("/", (req, res) => {
  res.send("hello world !")
})

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("App is running on Port", PORT)
  })
}).catch((error) => {
  console.log(error)
  console.log("Failed to Connect ")
})
