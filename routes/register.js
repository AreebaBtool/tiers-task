const express = require('express');
const router = express.Router();
const multer = require('multer');
const {nodemailer, transporter}=require('../nodemailer/nodemailer')
const {connection}=require('../database/sql')

var storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, "./public/images/")
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname);
        }
    }
)
var upload = multer({ storage });
// const multipleupload=upload.fields([{name:"profileImg"},{name:"profileImg2"}])

router.post('/',upload.single("profileImg"), (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const file=req.file.filename;
    const mailoption={
        from:`Computer Scientist <areebabatool75@gmail.com> `,
        to:email,
        subject:"You has been Registered",
        html:`<p>You has been Registered </p>`
    }
    const data={
        name:name,
        email:email,
        password:password,
        profileImg:file,
    }
    connection.query('INSERT into register SET ?',data,(err,result)=>{
        if(err) throw err;
        else{
            console.log("Data Stored");
            transporter.sendMail(mailoption,(error,info)=>{
                if(error) throw(error);
                else{
                    console.log('email send')
                }
            })
            //  result.redirect('http://localhost:3000');
        }
    })


    // const file2=req.files.profileImg2[0].filename;
    // console.log(name, password, email,file);
})
module.exports = router;
