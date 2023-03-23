import jwt from 'jsonwebtoken';
import User from '../Modles/User.js';


// Middleware function to check for valid JWT token

export const authMiddleware = async(req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
        }
    const decodedToken = jwt.verify(token, process.env.JWT_MAIN_KEY);

    if (decodedToken.exp < Date.now() / 1000) {
        const userdetails =await User.findById(decodedToken.userId)
        const refreshToken=userdetails.refreshToken
        if (!refreshToken){
            res.status(401).json({"msg":"Token Expired"});
        }
        else{
            const user =jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const accessToken =jwt.sign(user, process.env.JWT_MAIN_KEY, { expiresIn: '90m' });
            res.status(200).json({ accessToken,user });
            req.user=user
            next()
        }
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};


