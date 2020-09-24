import nodemailer from'nodemailer';
import {user} from './../post.mjs';


// This is Transporter,just like mongoose we make connection  
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sudhawan2@gmail.com',
      pass: 'vinod1997!'
    }
  });


export const email=async(req,res)=>{
// Here we have find the corresponding object so to find password.
    let userObj =await user.find({Email:req.body.email});

    
// If we have user of entered Email
    if(userObj.length===1){
        
    let mailOptions = {
        from: 'sudhawan2@gmail.com',
        to: req.body.email,
        subject: `Blogger's.com Email Address`,
        text: ` Hello ! your password is ${userObj[0].orgEmail},keep it confidential.`
        
      };

// This will send the Email 
    let em=await transporter.sendMail(mailOptions);

    
// Sending response 
    res.json({Value:"Hello"})
    
    }
// If No User is there,record not exist.
    else{
        res.json({Value:"Record Not Exist"});
    }


}
