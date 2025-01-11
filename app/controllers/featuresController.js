import {encodeToken,decodeToken} from '../utility/tokenUtility.js'
import sendEmail from "../utility/emailUtility.js"



//token encode & decode
export const tokenEncode =async (req, res) => {
    let result = await encodeToken(req.body.email,req.body.id)
    res.json({token: result})
}

export const tokenDecode = async (req,res)=>{
    let result = decodeToken(req.body.token)
    res.json({data: result})
}


//email sending
export const mail = async (req,res)=>{
    let email = req.body.email
    let text = req.body.text
    let sub = req.body.sub
    let body = req.body.html
    let result =await sendEmail(email,text,sub,body)
    res.json({emailStatus: result})
}


