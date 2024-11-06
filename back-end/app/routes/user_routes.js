import { app } from "../app";

app.get("/user", (req, res) => {

  if (!req.query.id) {
    console.log("No userId sent");
    res.statusCode = 400;
    res.send("No userId queried: /user?id={id}");
    return
  }

  const user_id = req.query.id;

})
