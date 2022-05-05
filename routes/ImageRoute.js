import Router from "express";
import { getImages } from "../controller/imageController.js";

const route = Router()

route.get('/', getImages)

export default route