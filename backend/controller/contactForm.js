const contactFormModel = require('../model/contactFormModel')

exports.formData=(req,res,next)=>{
  const {name, email, phone, dob, message} = req.body;

  const formattedDOB = new Date(dob).toISOString().split('T')[0];

  const formData = new contactFormModel({
    Name:name, 
    Email:email, 
    Phone:phone, 
    DOB:formattedDOB, 
    Message:message
  })

  formData.save().then((success)=>{
    res.status(200).json({msg:'Form submitted successfully!'})
  }).catch((error)=>{
    res.status(500).json({msg:'Failed to submit the form. Please try again later.'})
  })

}