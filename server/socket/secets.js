import { users, guests } from ".././data/users.js";

export const sockets = io => {
  io.on("connection", socket => {
    const socketId = socket.id;
    console.log("new Client connected");
    guests.push(socketId);
    console.log(guests);

    socket.on("loginRequest", loginData => {
      const user = users.find(user => {
        return user.login == loginData.login && user.password == loginData.password;
      });
      if (user != undefined) io.to(socketId).emit("loginSuckcesfully", user);
      else io.to(socketId).emit("loginRejected", "Wrong login or password");
    });

    socket.on("disconnect", () => {
      guests.splice(guests.indexOf(socketId), 1);
      console.log("Client disconnected");
    });
  });
};
