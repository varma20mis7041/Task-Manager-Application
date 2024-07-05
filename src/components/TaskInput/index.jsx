import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addTodo} from '../../slices/todoAppSlice'; // Import the addTodo action from Redux slice

import './index.css'; 

// Priority list options
const PriorityList = [
  {
    id: 1,
    priorityText: 'Low',
  },
  {
    id: 2,
    priorityText: 'Medium',
  },
  {
    id: 3,
    priorityText: 'High',
  },
];


const TaskInput = props => {
  const {tagsList} = props; 
  const dispatch = useDispatch(); // Initialize dispatch function from Redux

  // State hooks
  const [taskInput, updateTaskInput] = useState(''); // State for task input
  const [taskCategory, setTaskCategory] = useState(tagsList[0].optionId); // State for task category
  const [currentPriorityId, updatePriority] = useState(PriorityList[0].id); // State for current priority

  // Event handler for task input change
  const onChangeTaskInput = event => {
    updateTaskInput(event.target.value);
  };

  // Event handler for category select change
  const onChangeSelectOption = event => {
    setTaskCategory(event.target.value);
  };

  // Event handler for form submission
  const onClickSubmitForm = event => {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if task input or category is empty
    if (taskInput === '' || taskCategory === '') {
      alert('Please fill the form completely'); // Alert user to fill the form completely
    } else {
      // Find the selected tag based on category
      const selectedTag = tagsList.find(eachTag => eachTag.optionId === taskCategory);

      // Prepare new task object
      const newTask = {
        task: taskInput,
        category: selectedTag.displayText,
        categoryId: taskCategory,
        priority: PriorityList[currentPriorityId - 1].priorityText,
      };

      // Dispatch the addTodo action with newTask as payload
      dispatch(addTodo(newTask));

      // Clear task input and reset category to default
      updateTaskInput('');
      setTaskCategory(tagsList[0].optionId);
    }
  };

  
  return (
    <div className="my_tasks_manager_bg_container">
      <div className="create_task_bg_container">
        <form className="form_element" onSubmit={onClickSubmitForm}>
          <h1 className="create_task_main_heading_element text-10xl">
            Create a Task!
          </h1>
          <div className="form_items_container">
            {/* Task input field */}
            <div className="form_label_container">
              <label className="label_element" htmlFor="task_input">
                Task
              </label>
              <input
                type="text"
                placeholder="Enter the task here"
                id="task_input"
                className="input_element"
                onChange={onChangeTaskInput}
                value={taskInput}
              />
            </div>
            {/* Category select dropdown */}
            <div className="form_label_container">
              <label className="label_element" htmlFor="select_element">
                Category
              </label>
              <select
                id="select_element"
                className="select_element"
                onChange={onChangeSelectOption}
                value={taskCategory}
              >
                {tagsList.map(eachTag => (
                  <option value={eachTag.optionId} key={eachTag.optionId}>
                    {eachTag.displayText}
                  </option>
                ))}
              </select>
            </div>
            {/* Priority select dropdown */}
            <div className="form_label_container">
              <label className="label_element" htmlFor="prioritySelector">
                Priority
              </label>
              <select
                id="prioritySelector"
                className="select_element"
                value={currentPriorityId}
                onChange={e => updatePriority(e.target.value)}
              >
                {PriorityList.map(eachItem => (
                  <option key={eachItem.id} value={eachItem.id}>
                    {eachItem.priorityText}
                  </option>
                ))}
              </select>
            </div>
            {/* Submit button */}
            <button type="submit" className="add_task_button">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskInput; 
