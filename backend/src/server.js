import express from "express"
import cookieParser from "cookie-parser"
// import dotenv from "dotenv"
import path from "path"
import cors from "cors"

import authRoutes from "./routes/auth.route.js"
import messageRouters from "./routes/message.route.js"
import { ENV } from "./lib/env.js"
import { connectDB } from "./lib/db.js"
import { app, server } from "./lib/socket.js"

// dotenv.config()

// const app = express()
const __dirname = path.resolve()

const PORT = ENV.PORT || 3000

app.use(express.json({ limit: "5mb "}))
app.use(express.urlencoded({ limit: "5mb", extended: true }))
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true}))
console.log("CLIENT_URL:", ENV.CLIENT_URL)
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRouters)

if(ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

server.listen(PORT, () => {
    console.log("Server running on port: " + PORT)
    connectDB()
})