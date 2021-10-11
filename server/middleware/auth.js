const jwt = require("jsonwebtoken");

module.exports = {
  verifyAccessToken(req, res, next) {
    try {
      const authHedaer = req.headers.authorization;
      const accessToken = authHedaer && authHedaer.split(" ")[1];

      const decodedData = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      req.user = decodedData;
      next();
    } catch (error) {
      res.json(401, { message: "Authentication failed!", error });
    }
  },
  verifyRefreshToken(req, res, next) {
    const { refreshToken } = req.body;

    if (refreshToken === null)
      return res.json(401, { message: "Invalid request." });
    try {
      const decodedData = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      req.user = decodedData;
      next();
    } catch (error) {
      res.json(401, { message: "Authentication failed!", error });
    }
  },
};
