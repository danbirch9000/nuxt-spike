const express = require("express");
const config = require("./config");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const firebaseAdmin = require("firebase-admin");
const cors = require("cors");

// Auth0 athentication middleware
const isProd = false;
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: isProd ? config.AUTH0_API_AUDIENCE : config.AUTH0_API_AUDIENCE_DEV,
  issuer: `https://${config.AUTH0_DOMAIN}/`,
  algorithm: "RS256"
});

// Initialize Firebase Admin with service account
const serviceAccount = require(config.FIREBASE_KEY);
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: config.FIREBASE_DB
});

const app = express();
const port = process.env.PORT || "1337";
app.set("port", port);
app.use(cors({ origin: "http://localhost:3000" }));
// GET object containing Firebase custom token
app.get("/auth", jwtCheck, (req, res) => {
  console.log(req);
  // Create UID from authenticated Auth0 user
  const uid = req.user.sub;
  // Mint token using Firebase Admin SDK
  firebaseAdmin
    .auth()
    .createCustomToken(uid)
    .then(customToken =>
      // Response must be an object or Firebase errors
      res.json({ firebaseToken: customToken })
    )
    .catch(err =>
      res.status(500).send({
        message: "Something went wrong acquiring a Firebase token.",
        error: err
      })
    );
});

module.exports = app;
