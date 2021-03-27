import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/UseCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserControlle = new AuthenticateUserController();

authenticateRoutes.post("/sessions", authenticateUserControlle.handle);

export { authenticateRoutes };
