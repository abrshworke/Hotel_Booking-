
import jwt from "jsonwebtoken";

 
const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: false, message: "You are not authorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.email !== process.env.Admin_Email || decoded.role !== "admin") {
      return res.json({ success: false, message: "You are not authorized to access this panel" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



export default adminAuth;