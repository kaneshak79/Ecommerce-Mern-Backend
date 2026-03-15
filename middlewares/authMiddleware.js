// // import jwt from "jsonwebtoken";
// // import User from "../models/User.js";

// // export const protect = async (req, res, next) => {
// //   let token;
// //   if (req.headers.authorization?.startsWith("Bearer")) {
// //     try {
// //       token = req.headers.authorization.split(" ")[1];
// //       const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //       req.user = await User.findById(decoded.id).select("-password");
// //       next();
// //     } catch (error) {
// //       return res.status(401).json({ message: "Not authorized, token failed" });
// //     }
// //   } else {
// //     return res.status(401).json({ message: "No token, not authorized" });
// //   }
// // };


// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).populate("store");
//       next();
//     } catch (error) {
//       return res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   }

//   if (!token) return res.status(401).json({ message: "Not authorized, no token" });
// };

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).populate("store");
      return next(); // ALWAYS call next() here
    }
    return res.status(401).json({ message: "Not authorized, no token" });
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

