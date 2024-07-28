const express = require("express");
const router = express.Router();
const employees = require("../models/employeeschema");
const multer=require("multer")
let path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter });
router.post("/register",upload.single("image"),async(req,res)=>{

    console.log(req.file);
    const name=req.body.name;
    const email=req.body.email;
    const mobileNo=req.body.mobileNo;
    const designation=req.body.designation;
    const gender=req.body.gender;
    const course=req.body.course;
    const createdate=req.body.createdate;
    const image = req.file.filename;
    if(!name || !email ||!mobileNo||!designation || !gender || !course || !createdate || !image){
        res.status(422).json("plz fill the data");
        return;
    }

    try {
        const preuser = await employees.findOne({email:email});
        console.log(preuser);

        if(preuser){
            res.status(422).json("this is user is already present");
            return;
        }else{
            const adduser = new employees({
                name,email, mobileNo, designation,gender,course,createdate,image
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }

    } catch (error) {
        res.status(422).json(error);
    }
})


// get userdata

router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await employees.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await employees.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})


// update user data

router.patch("/updateuser/:id", upload.single("image"), async(req,res)=>{
    try {
        const {id} = req.params;
       
        const updateduser = await employees.findByIdAndUpdate(id,{name:req.body.name,
             email:req.body.email,
             mobileNo:req.body.mobileNo,
            designation:req.body.designation,
             gender:req.body.gender,
             course:req.body.course,
            createdate:req.body.createdate,
             image:req.file.filename},{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})


// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await employees.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})




module.exports = router;