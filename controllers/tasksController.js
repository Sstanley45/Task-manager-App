import BadRequestError from "../Error/bad-request.js";
import Task from "../models/tasksModel.js";
import { StatusCodes } from "http-status-codes";
import checkPermissions from "../utils/checkPermissions.js";
import NotFoundError from "../Error/not-found.js";



const getAllTasks = async (req, res) => {
  const tasks = await Task.find({createdBy : req.user.userId})
  res.status(StatusCodes.OK).json({ tasks, tasksLength : tasks.length});
};

const getOneTask = async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId })
  if (!task) {
    throw new NotFoundError(`task with id: ${taskId} Not Found`)
  }
  res.status(StatusCodes.OK).json({task})
};

const createTask = async (req, res) => {
  const { name } = req.body 
  if (!name) {
    throw new BadRequestError("please provide name of the task")
  }
  req.body.createdBy = req.user.userId
  const task = await Task.create(req.body) 
  res.status(StatusCodes.CREATED).json({ task});
};

const updateTask = async (req, res) => {
  const { id: taskId } = req.params;
  const { name } = req.body;
  if (!name) {
    throw new BadRequestError("please provide name of the task")
  }
  const task = await Task.findOne({ _id: taskId })
  //check permission, fxn is in utils 
  checkPermissions(req.user, task.createdBy) 

  await Task.findOneAndUpdate({_id :taskId}, req.body, {new:true, runValidators: true})

  res.status(StatusCodes.OK).json({ msg: 'updated Task' }); 
};

const deleteTask = async (req, res) => {
  const { id: taskId } = req.params 
  const task = await Task.findOne({ _id: taskId })
  if (!task) {
    throw new NotFoundError(`no task with id:  ${taskId}`)
  }
  //check permissions
  checkPermissions(req.user, task.createdBy)
  await task.remove()
  res.status(StatusCodes.OK).json({ msg: "deleted Task" });
};

export { getAllTasks, getOneTask, createTask, updateTask, deleteTask };
