const express = require("express")
const app = express()

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


require("./database/init")


app.use("/user", require("./router/user"))
app.use("/repairman", require("./router/repairman"))
app.use("/admin", require("./router/admin"))

app.listen(port = process.env.PORT || 3000, () => {
    console.log(`server runing on : http://localhost:${port}`)
})