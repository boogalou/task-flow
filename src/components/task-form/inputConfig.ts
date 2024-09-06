import { InputField } from '../../shared/lib/createInputFields.ts';
import { TaskFormData } from '../../shared/types/types.ts';

export const createTaskFields: InputField<TaskFormData>[] = [
  {
    id: 'title',
    name: 'title',
    type: 'text',
    placeholder: 'Task title',
    label: 'taskForm.taskTitle',
  },
  {
    id: 'description',
    name: 'description',
    type: 'text',
    placeholder: 'Task Description',
    label: 'taskForm.taskDescription',
  },
  {
    id: 'category',
    name: 'category',
    type: 'text',
    placeholder: 'Add category',
    label: 'taskForm.addCategory',
  },
  {
    id: 'color',
    name: 'color',
    type: 'color',
    placeholder: '',
    label: 'taskForm.setColor',
  },
  {
    id: 'datepicker',
    name: 'date',
    type: 'date',
    placeholder: '',
    label: 'taskForm.setDate',
  },
  {
    id: 'timepicker',
    name: 'time',
    type: 'time',
    placeholder: '',
    label: 'taskForm.setTime',
  },
];
