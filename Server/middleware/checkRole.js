const checkRole = (roles) => {
  return (req, res, next) => {
      if (!roles.includes(req.body.userRole)) {
          return res.status(403).json({ success: false, message: "Access Denied" });
      }
      next();
  };
};

export default checkRole;