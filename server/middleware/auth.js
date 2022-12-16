import jwt from "jsonwebtoken";
import fetch from "node-fetch";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const isCustomAuth = token.startsWith("ey");
      let decodedData;

      if (token && isCustomAuth) {
        decodedData = jwt.verify(token, "test");
        req.userId = decodedData?.id;
      } else {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`
        );
        const data = await response.json();
        req.userId = data.user_id;
      }
    }

    next();
  } catch (e) {
    console.log(e);
  }
};

export default auth;
