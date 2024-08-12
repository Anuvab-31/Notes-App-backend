import { Router } from "express";
import { registerUser, loginUser, getUser } from "../controllers/user.controller.js";
import { authenticationToken } from "../utils/utilities.js";

const router = Router()

router.route("/create-account").post(registerUser)
router.route("/login").post(loginUser)
router.route("/get-user").get(authenticationToken,getUser)

// //secured routes
// router.route("/logout").post(verifyJWT, logoutUser)
// router.route("/refresh-token").post(refreshAccessToken)

export default router