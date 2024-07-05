import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {updateActiveTag, markTasksAsSaved} from '../../slices/todoAppSlice'; // Import actions from Redux slice
import './index.css'; // Import CSS for styling
import CategoryItem from '../CategoryItem'; 
import TaskItem from '../TaskItem'; 

// Priority list options
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

const TaskList = props => {
  const {tagsList} = props; // Destructure props to get tagsList

  // Redux state and dispatch hooks
  const activeTag = useSelector(state => state.activeTag); // Get activeTag from Redux store
  const isSaved = useSelector(state => state.isTasksLocallySaved); // Get isTasksLocallySaved from Redux store
  const addedTasksList = useSelector(state => state.todoList); // Get todoList from Redux store
  const dispatchActiveTag = useDispatch(); // Initialize dispatch function for activeTag actions
  const dispatchisSaved = useDispatch(); // Initialize dispatch function for isTasksLocallySaved actions

  // State hook for current priority
  const [currentPriorityId, updatePriority] = useState(PriorityList[0].id);

  // Button text based on local save state
  const saveBtnText = isSaved ? 'Saved' : 'Save';

  // Function to handle tag item click
  const onClickTagItem = optionId => {
    if (activeTag === 'NONE') {
      dispatchActiveTag(updateActiveTag(optionId));
    } else if (activeTag === optionId) {
      dispatchActiveTag(updateActiveTag('NONE'));
    } else {
      dispatchActiveTag(updateActiveTag(optionId));
    }
  };

  // Filter tasks based on active tag and current priority
  const currentActiveCategoryTasksList = addedTasksList.filter(eachTask => {
    const priority = PriorityList[currentPriorityId].priorityText;
    if (activeTag === 'NONE' || eachTask.categoryId === activeTag) {
      if (priority === 'All' || priority === eachTask.priority) return true;
    }
    return false;
  });

  // Function to handle save tasks button click
  const onClickSaveTasks = () => {
    localStorage.setItem('tasksList', JSON.stringify(addedTasksList)); // Save tasksList to localStorage
    dispatchisSaved(markTasksAsSaved()); // Mark tasks as saved locally in Redux store
  };


  return (
    <div className="tasks_display_bg_container">
      <div className="category_heading_and_priority_container">
        <h1 className="display_tasks_heading">Tags</h1>
        {/* Priority dropdown */}
        <div className="priority_area_bg_container">
          <h1 className="priority_heading">Priority</h1>
          <select
            className="priority_select_item"
            value={currentPriorityId}
            onChange={e => updatePriority(e.target.value)}
          >
            {PriorityList.map(eachPriorityItem => (
              <option value={eachPriorityItem.id} key={eachPriorityItem.id}>
                {eachPriorityItem.priorityText}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* List of tags */}
      <ul className="tags_bg_list_container">
        {tagsList.map(eachTag => (
          <CategoryItem
            tagDetails={eachTag}
            key={eachTag.optionId}
            onClickTagItem={onClickTagItem}
            isActive={eachTag.optionId === activeTag}
          />
        ))}
      </ul>

      {/* Tasks and save button container */}
      <div className="tasks_and_save_button_container">
        <h1 className="display_tasks_heading">Tasks</h1>
        {/* Save tasks button */}
        <button
          className="save_tasks_button"
          type="button"
          onClick={onClickSaveTasks}
        >
          {saveBtnText}
        </button>
      </div>

      {/* Conditional rendering for tasks list or no tasks message */}
      {currentActiveCategoryTasksList.length === 0 ? (
        <div className="no_added_tasks_container">
          <p className="no_tasks_heading">No Tasks Added Yet!</p>
        </div>
      ) : (
        <ul className="added_tasks_list_container">
          {currentActiveCategoryTasksList.map(eachTask => (
            <TaskItem taskDetails={eachTask} key={eachTask.id} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList; 
