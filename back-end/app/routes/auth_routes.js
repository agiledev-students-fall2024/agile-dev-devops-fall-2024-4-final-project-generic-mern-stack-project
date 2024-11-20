const express = require("express");
const router = express.Router();


let otpStore = {} 

//generate the OTP
function generateOTP(){
    return Math.floor(100000 + Math.random() * 900000).toString()
}

router.post('/request', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).send('Email is required');

    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10); // Hash the OTP before storing

    otpStore[email] = { otp: hashedOTP, expiresAt: Date.now() + 5 * 60000 }; // Valid for 5 minutes

    // In a real application, send the OTP to the user's phone or email instead
    console.log(`OTP for user ${email}: ${otp}`);

    res.status(200).send('OTP sent');
});


router.post('/verify', async (req, res) =>{
    const {email, otp} = req.body
    if(!email || !otp) return res.status(400).send("Email and OTP are required.");
    
    const userOTPData = otpStore[email]

    if(!userOTPData || userOTPData.expiresAt < Date.now()){
        return res.status(400).send("OTP Expired or invalid")
    }

    const isValid = await bcrypt.compare(otp, userOTPData.otp)

    if(isValid){
        delete otpStore(email)
        res.status(200).send("OTP Verified")
    }
    else{
        res.status(400).send("Invalid OTP")
    }
})


module.exports = router;
