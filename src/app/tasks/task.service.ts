import { Task } from './task.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//This make the service injectable into the components, can also be achived by adding it into the providers in the app.modules.ts
@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksUpdated = new BehaviorSubject<Task[]>([]);

  //Listner
  getTaskUpdateListner() {
    return this.tasksUpdated.asObservable();
  }

  //Adding a task
  addTask(todo: string) {
    const id = new Date().valueOf();
    const task: Task = { id: id, todo: todo };
    const list = [...this.tasksUpdated.value]; //array in its current state
    list.push(task);
    this.tasksUpdated.next(list);
  }

  //Delete a task
  deleteTask(taskId: number) {
    let list = [...this.tasksUpdated.value];
    list = list.filter(el => el.id != taskId);
    this.tasksUpdated.next(list);
  }
}
