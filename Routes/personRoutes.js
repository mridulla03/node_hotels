const express = require("express");
const Person = require("../models/Person");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Internal server error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    // assuming req body contins person data
    const data = req.body;

    // create new person document using mongoose model
    const newPerson = new Person(data);

    // save new person to database
    const response = await newPerson.save();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(404).json({
        error: "Invalid work type",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      err: "Internal server error",
    });
  }
});

router.delete('/:id',(req,res)=>{
    try{
const personId = req.params.id
const response = Person.findByIdAndDelete(personId)
if(!response){
    res.status(404).json({ error: "Person not found" });

}
res.status(200).json({
    message:"Person deleted successfully"
})
    }catch(err){
        res.status(500).json({
            err: "Internal server error",})
    }
})


module.exports = router;
