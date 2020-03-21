import { TaskService } from './../task.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent{

  constructor(public taskService: TaskService){}

  onAddTask(form: NgForm){
    if(form.invalid){
      return;
    }

   this.taskService.addTask(form.value.taskInputField);
   form.reset();
  }
}
