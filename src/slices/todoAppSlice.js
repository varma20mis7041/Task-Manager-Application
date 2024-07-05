import {createSlice, nanoid} from '@reduxjs/toolkit'

// Retrieve the locally stored todo list from localStorage
const locallyStoredTodoList = JSON.parse(localStorage.getItem('tasksList'));
console.log('local storage', locallyStoredTodoList);

// Define the initial state of the todo application
const initialState = {
  todoList: locallyStoredTodoList ? locallyStoredTodoList : [],
  activeTag: 'NONE',  // Default active tag
  isTasksLocallySaved: true,  // Flag to indicate if tasks are saved locally
}

// Create a slice for the tasks manager application with initial state and reducers
export const todoAppSlice = createSlice({
  name: 'Task Manager',  
  initialState, 
  reducers: {
    // Reducer to add a new todo
    addTodo: (state, action) => {
      const {task, category, categoryId, priority} = action.payload;
      const newTodo = {
        id: nanoid(),  // Generate a unique id for the new todo
        displayText: task,
        category,
        categoryId,
        priority,
      }
      
      state.todoList.push(newTodo);  
      state.isTasksLocallySaved = false;  // Mark tasks as not saved locally
     
    },
    // Reducer to update the active tag
    updateActiveTag: (state, action) => {
    
      state.activeTag = action.payload;  // Update the active tag with the payload
     
    },
    // Reducer to delete a todo
    deleteTodo: (state, action) => {
      const id = action.payload;
      const updatedTodoList = state.todoList.filter(
        eachTodoTask => eachTodoTask.id !== id,  // Remove the todo with the given id
      );
     
      state.todoList = updatedTodoList;  // Update the todo list
      state.isTasksLocallySaved = false;  // Mark tasks as not saved locally
     
    },
    // Reducer to update an existing todo
    updateTodoList: (state, action) => {
      const {id, displayText, category, categoryId, priority} = action.payload;
      const updatedList = state.todoList.map(eachTodo => {
        if (eachTodo.id === id) {
          return {
            id,
            displayText,
            category,
            categoryId,
            priority,
          }
        }
        return eachTodo;  // Return the original todo if id doesn't match
      });
    
      state.todoList = updatedList;  // Update the todo list with the modified todo
      state.isTasksLocallySaved = false;  // Mark tasks as not saved locally
   
    },
    // Reducer to mark tasks as saved locally
    markTasksAsSaved: (state, action) => {
      state.isTasksLocallySaved = true;  // Mark tasks as saved locally
    },
  },
})

// Export the action creators for the reducers
export const {
  addTodo,
  updateActiveTag,
  deleteTodo,
  updateTodoList,
  markTasksAsSaved,
} = todoAppSlice.actions

// Export the reducer to be used in the store
export default todoAppSlice.reducer
