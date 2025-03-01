import jwt from 'jsonwebtoken'
const isAuthenticated = async (req,resizeBy,next) => {
    try {
        const token = req.cookie.token
        if(!token){
            return res.status(401).json({
                message : "Unauthorized access !!!",
                success : false
            })
        }
        const decode = await jwt.verify(token,process.env.JWT_SECRET)
        if(!decode){
            return res.status(401).json({
                message : 'Invalid',
                success : false
            })
        }
        req.id = decode.userId
        next()
    } catch (error) {
        console.log(error);
    }
}