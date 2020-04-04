import { TaskListComponent } from './tasks-list/task-list.component';
import { Task } from './task.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'

import { HttpClient } from '@angular/common/http';

//This make the service injectable into the components, can also be achived by adding it into the providers in the app.modules.ts
@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksUpdated = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient){}

  //Listner
  getTaskUpdateListner() {
    this.http.get<{message: string, tasks: any}>('http://localhost:3000/api/tasks')
    .pipe(map((taskData) => {
      return taskData.tasks.map(task => {
        return {
          id: task._id,
          todo: task.todo
        };
      });
    }))
    .subscribe(transformedTasks => {
      this.tasksUpdated.next(transformedTasks);
    });
    return this.tasksUpdated.asObservable();
  }

  //Adding a task
  addTask(todo: string) {
    let task: Task = { id: null, todo: todo };
    this.http.post<{message: string, postId: number}>('http://localhost:3000/api/tasks', task).subscribe((responseData) => {
      const id = responseData.postId;
      task.id = id;
      let list = [...this.tasksUpdated.value]; //array in its current state
      list.push(task);
      this.tasksUpdated.next(list);
    })
  }

  //Delete a task
  deleteTask(taskId: number) {
    this.http.delete('http://localhost:3000/api/tasks/' + taskId).subscribe(() => {
      const updatedTaskList = [...this.tasksUpdated.value];
      let newTaskList = updatedTaskList.filter(task => task.id !== taskId);
      this.tasksUpdated.next(newTaskList);
    });
  }
}
