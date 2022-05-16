import Router from "express";
import { check } from "express-validator";
import { deleteImage, getByLabelImages, getImages, uploadImage, getUserImages } from "../controller/ImageController.js";
import fieldValidation from "../middlewares/fieldValidation.js";
import jwtValidation from "../middlewares/jwtValidation.js";

const route = Router()

route.get('/', getImages)

route.get('/userImages', [
    jwtValidation
],getUserImages)


route.get('/:search', [
    check('search', 'A search is required').not().isEmpty(),
    fieldValidation
], getByLabelImages)

route.post('/', [
    jwtValidation,
    check('link', 'The image link is required').not().isEmpty(),
    check('label', 'The image label is required').not().isEmpty(),
    fieldValidation
], uploadImage)

route.delete('/:id', [
    jwtValidation,
    check('id', 'The image id is not valid').isMongoId(),
    fieldValidation
], deleteImage)

export default route