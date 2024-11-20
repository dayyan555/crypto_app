const generateUserId = (req, res, next) => {
    const userId = req.headers['x-user-id'] || req.body.userId || null;
  
    if (!userId) {
      // If no userId, create a new unique one (you can generate it differently)
      req.userId = Date.now().toString(); // Directly assign the userId as a string
    } else {
      req.userId = userId; // Directly assign userId to req.userId
    }
  
    next(); // Pass control to the next middleware or route handler
  };
  
  module.exports = generateUserId;
  