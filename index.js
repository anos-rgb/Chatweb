const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" directory
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle incoming message
  socket.on("chat message", (data) => {
    const { user, message } = data;

    // Cek apakah username mengandung kata 'admin' (kecuali anos)
    if (user.toLowerCase().includes("admin") && user !== "anos [admin]") {
      console.log(`Blocked user: ${user} tried to use 'admin' in their username.`);
      return; // Tolak pesan jika username mengandung 'admin'
    }

    // Emit ke semua client jika username valid
    io.emit("chat message", { user, message });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});