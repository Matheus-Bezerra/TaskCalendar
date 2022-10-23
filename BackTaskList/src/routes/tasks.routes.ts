import {Express, Request, Response, NextFunction, Router} from 'express';
import { TasksRepository } from '../repositories/TasksRepositories'

const tasksRoutes = Router()
const tasksRepository = new TasksRepository()

function checkIfYouCanCreate(req: Request, res: Response, next: NextFunction) {
  const {title,description,taskDateTime,duration,isComplete} = req.body
  const verificatorUserName = tasksRepository.getTasks().some((task) => task.title === title);
  if (verificatorUserName)
    return res
      .status(400)
      .json({ Error: "Tarefa já existente" })
      .send();
  if(!title.trim() && !description.trim() && !taskDateTime.trim() && !duration.toString()) {
    return res
      .status(400)
      .json({ Error: "Preencha todos os campos corretamente!" })
      .send();
  }
  next();
}

function isExistsTask(req: Request, res: Response, next: NextFunction) {
  const {id} = req.params
  const verificatorisExistsTask = tasksRepository.getTasks().some((task) => task.id === id);
  if(!verificatorisExistsTask) {
    return res.status(404).json({ Error: "Tarefa não encontrada" }).send();
  }
  next();
}

tasksRoutes.post('/', checkIfYouCanCreate, (req, res) => {
  try {
    const {title,description,taskDateTime,duration,isComplete} = req.body
    const tasks = tasksRepository.create({title,description,taskDateTime,duration,isComplete})
    return res.status(201).json(tasks).send()
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error: error }).send();
  }
})

tasksRoutes.get('/', (req, res) => {
  setTimeout(() => {
    const tasks = tasksRepository.getTasks()
    return res.json(tasks)
  }, 2000)
})

tasksRoutes.delete('/:id', isExistsTask, (req, res) => {
  const {id} = req.params
  const task = tasksRepository.removeTask(id)
  return res.status(204).json(task).send()
})

tasksRoutes.put('/:id', isExistsTask, (req, res) => {
  const {id} = req.params
  const {title,description,taskDateTime,duration,isComplete} = req.body
  const tasks = tasksRepository.alterTask(id, {title, description, taskDateTime, duration, isComplete})
  return res.status(204).json(tasks).send()
})

tasksRoutes.patch('/:id', isExistsTask, (req, res) => {
  try {
    const {id} = req.params
    const {isComplete} = req.body
    if(isComplete === undefined || isComplete === null) return res.status(400).json({Error: 'Não foi enviado o estado da tarefa'}).send()
    const tasks = tasksRepository.IsThrutyOrfalsyCompleteTask(id, {isComplete})
    return res.status(204).json(tasks).send()
  } catch(err) {
    console.error(err)

  }
})

export {tasksRoutes}