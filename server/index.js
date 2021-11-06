const express = require("express");
const cors = require("cors");
const app = express();
const ctrl = require("./ctrl.js");

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.


//Endpoints
app.get("/api/compliment", ctrl.getCompliment);
app.get("/api/fortune", ctrl.getFortune);
app.get('/api/visionBoard', ctrl.getVisionBoard);
app.post('/api/visionBoard', ctrl.postVisionBoard);
app.delete('/api/post/:id', ctrl.deletePost);
app.put('/api/post', ctrl.editPost);


app.listen(4000, () => console.log("Server running on 4000"));
