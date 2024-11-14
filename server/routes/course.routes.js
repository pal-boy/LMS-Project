import {Router} from 'express';
import { getAllCourses, getCourseById } from '../controllers/course.controller.js';

const Courserouter = Router();

Courserouter.route('/').get(getAllCourses);
Courserouter.route('/:id').get(getCourseById);

export default Courserouter;