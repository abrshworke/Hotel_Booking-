

import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userID = decoded.id;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};


export default authUser;