import { TaskService } from './../task.service';
import { Task } from './../task.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit, OnDestroy {
  taskList: Task[] = [];
  private taskSub: Subscription;

  constructor(public taskService: TaskService){}

  //Automitcally created by angular when it creates the component to method to handle any additional initialization tasks.
  ngOnInit(){
    this.taskList = this.taskService.getTasks();
    this.taskSub = this.taskService.getTaskUpdateListner().subscribe((tasks: Task[]) => {
      this.taskList = tasks;
    });
  }

  ngOnDestroy(){
    this.taskSub.unsubscribe();
  }

  onDelete(taskId: number){
    this.taskService.deleteTask(taskId);
  }

}
