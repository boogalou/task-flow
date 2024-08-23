import { InputField } from '../../shared/lib/createInputFields.ts';
import { TaskData } from '../../shared/types/types.ts';

export const createTaskFields: InputField<TaskData>[] = [
  {
    id: 'title',
    name: 'title',
    type: 'text',
    placeholder: 'Task title',
    label: 'Title',
  },
  {
    id: 'description',
    name: 'description',
    type: 'text',
    placeholder: 'Task Description',
    label: 'Description',
  },
  {
    id: 'category',
    name: 'category',
    type: 'text',
    placeholder: 'Add category',
    label: 'Add Category',
  },
  {
    id: 'color',
    name: 'color',
    type: 'color',
    placeholder: '',
    label: 'Set Color',
  },
  {
    id: 'datepicker',
    name: 'date',
    type: 'date',
    placeholder: '',
    label: 'Set Date',
  },
  {
    id: 'timepicker',
    name: 'time',
    type: 'time',
    placeholder: '',
    label: 'Set Time',
  },
];
