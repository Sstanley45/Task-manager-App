import express from 'express'
const router = express.Router()
import {getAllTasks, getOneTask, createTask, updateTask, deleteTask} from '../controllers/tasksController.js'

router.route('/').post(createTask).get(getAllTasks)
router.route('/:id').patch(updateTask).delete(deleteTask).get(getOneTask)


export default router;