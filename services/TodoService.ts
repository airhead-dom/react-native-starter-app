import axios from 'axios';
import {HttpService} from '../types';
import {TodoModel} from '../models/TodoModels';

export default class TodoService
  implements HttpService<TodoModel, TodoModel[]>
{
  static getBatch() {
    return axios
      .get<TodoModel[]>('https://jsonplaceholder.typicode.com/todos?userId=1')
      .then(res => res.data);
  }

  static post(todo: TodoModel) {
    return axios
      .post<TodoModel>('https://jsonplaceholder.typicode.com/todos', todo)
      .then(res => res.data);
  }
}
