import express from "express";
import Uploads from "../middleware/Uploads.js";
import * as builderController from "../controllers/builderController.js";
import * as typeController from "../controllers/typeController.js";
import * as statusController from "../controllers/statusController.js";

const router = express.Router();

// Builder Routes
router.post("/builders", Uploads, builderController.createBuilder);
router.get("/builders", builderController.getBuilders);
router.put("/builders/:id", Uploads, builderController.updateBuilder);
router.delete("/builders/:id", builderController.deleteBuilder);

// Type Routes
router.post("/types", Uploads, typeController.createType);
router.get("/types", typeController.getTypes);
router.put("/types/:id", Uploads, typeController.updateType);
router.delete("/types/:id", typeController.deleteType);

// Status Routes
router.post("/statuses", statusController.createStatus);
router.get("/statuses", statusController.getStatuses);
router.put("/statuses/:id", statusController.updateStatus);
router.delete("/statuses/:id", statusController.deleteStatus);

export default router;
