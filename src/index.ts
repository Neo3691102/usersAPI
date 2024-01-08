import express from "express";
import usersRouter from "./routers/users-routers";

const app = express();
const port = 5500;



app.use(express.json());



app.use("/users", usersRouter);

app.listen(port, () => console.log(`Escuchando al puerto ${port}`)  );

