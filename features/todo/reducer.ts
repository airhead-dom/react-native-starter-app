import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {TodoModel} from '../../models/TodoModels';
import TodoService from '../../services/TodoService';
import {HttpError} from '../../utils/axiosUtil';

export type TodoState = {
  list: TodoModel[];
  isLoading: boolean;
  shouldRevalidate: boolean;
};

const initialTodoState: TodoState = {
  list: [],
  isLoading: false,
  shouldRevalidate: false,
};

export const fetchTodoLists = createAsyncThunk<
  TodoModel[],
  void,
  {rejectValue: HttpError<any>}
>('todo/fetchTodoList', async (args, {rejectWithValue}) => {
  try {
    return TodoService.getBatch();
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const postTodoList = createAsyncThunk<
  TodoModel,
  {description: string},
  {rejectValue: HttpError<any>}
>('todo/postTodoList', async ({description}, {rejectWithValue}) => {
  try {
    return TodoService.post({
      userId: '1',
      title: description,
      completed: false,
    });
  } catch (e) {
    return rejectWithValue(e);
  }
});

const todoSlice = createSlice({
  name: 'todo',
  initialState: initialTodoState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTodoLists.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(fetchTodoLists.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.list = payload;
    });

    builder.addCase(fetchTodoLists.rejected, state => {
      state.isLoading = false;
    });

    builder.addCase(postTodoList.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(postTodoList.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.list.splice(0, 0, payload);
    });

    builder.addCase(postTodoList.rejected, state => {
      state.isLoading = false;
    });
  },
});

export default todoSlice.reducer;
