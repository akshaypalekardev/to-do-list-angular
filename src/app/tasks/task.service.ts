import { Task } from './task.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

//This make the service injectable into the components, can also be achived by adding it into the providers in the app.modules.ts
@Injectable({providedIn: 'root'})
export class TaskService {
  private taskList: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();

  //Get tasks
  getTasks(){
    return [...this.taskList];
  }

  //Listner
  getTaskUpdateListner(){
    return this.tasksUpdated.asObservable();
  }

  //Adding a task
  addTask(todo: string){
    const id = this.taskList.length;
    const task: Task = { id: id, todo: todo };
    this.taskList.push(task);
    this.tasksUpdated.next([...this.taskList]);
  }

  //Delete a task
  deleteTask(taskId: number){
   this.taskList = this.taskList.filter(el => el.id != taskId);
   this.tasksUpdated.next([...this.taskList]);
  }
}
