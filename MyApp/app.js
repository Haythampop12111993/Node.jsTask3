let app = require("./app/server")
require("dotenv").config();
app.listen(process.env.Port, () => console.log(`http://localhost:${process.env.Port}`));
// app.get("/",(req, res) => {
//     res.send("Hello")
// })
// app.get("/json", (req, res) => {
//     res.send({name:"haytham",age:29,email:"haytham@gmail.com"})
// })
