import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {updateTodoList} from '../../slices/todoAppSlice'; // Import updateTodoList action from Redux slice
import './index.css'; 

// Static data for tags and priority options
const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
];
const PriorityList = [
  {
    id: 0,
    priorityText: 'All',
  },
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


const EditTask = props => {
  const {taskDetails, toggleModal} = props; // Destructure taskDetails and toggleModal function from props
  const {id, displayText, category, priority} = taskDetails; // Destructure task details
  const updateTodoDispatch = useDispatch(); // Initialize dispatch function for updateTodoList action
  const [taskCurrentState, editTaskDetails] = useState({ // State hook for current task details
    id,
    displayText,
    category,
    priority,
  });

  // Function to handle save button click
  const onClickSave = event => {
    event.preventDefault(); // Prevent default form submission behavior
    const updatedTask = {
      id: taskCurrentState.id,
      displayText: taskCurrentState.displayText,
      category: taskCurrentState.category,
      categoryId: taskCurrentState.category.toUpperCase(), 
      priority: taskCurrentState.priority,
    };

    updateTodoDispatch(updateTodoList(updatedTask)); // Dispatch updateTodoList action with updated task
    toggleModal(); // Close the modal after saving
  };


  return (
    <div className="edit_task_bg_container">
      <form className="edit_form_element" onSubmit={onClickSave}>
        <h1 className="popup_edit_task_main_heading_element">Edit the Task!</h1>
        <div className="popup_form_items_container">
          {/* Task input */}
          <div className="popup_edit_form_label_container">
            <label className="label_element" htmlFor="task_input">
              Task
            </label>
            <input
              type="text"
              placeholder="Enter the task here"
              id="task_input"
              className="popup_edit_input_element"
              onChange={event =>
                editTaskDetails(prevTask => ({
                  ...prevTask,
                  displayText: event.target.value,
                }))
              }
              value={taskCurrentState.displayText}
            />
          </div>

          {/* Category dropdown */}
          <div className="popup_edit_form_label_container">
            <label className="label_element" htmlFor="select_element">
              Tags
            </label>
            <select
              id="select_element"
              className="popup_edit_select_element"
              onChange={e =>
                editTaskDetails(prevTask => ({
                  ...prevTask,
                  category: e.target.value,
                }))
              }
              value={taskCurrentState.category.toUpperCase()}
            >
              {tagsList.map(eachTag => (
                <option value={eachTag.optionId} key={eachTag.optionId}>
                  {eachTag.displayText}
                </option>
              ))}
            </select>
          </div>

          {/* Priority dropdown */}
          <div className="popup_edit_form_label_container">
            <label className="label_element" htmlFor="prioritySelector">
              Priority
            </label>
            <select
              id="prioritySelector"
              className="popup_edit_select_element"
              value={taskCurrentState.priority}
              onChange={e =>
                editTaskDetails(task => ({
                  ...task,
                  priority: e.target.value,
                }))
              }
            >
              {PriorityList.map(eachItem => (
                <option key={eachItem.id}>{eachItem.priorityText}</option>
              ))}
            </select>
          </div>

          {/* Save button */}
          <button type="submit" className="save_task_button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask; 
