import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {RiDeleteBin6Line} from 'react-icons/ri'; // Delete icon from react-icons
import {MdEditSquare} from 'react-icons/md'; // Edit icon from react-icons
import {deleteTodo} from '../../slices/todoAppSlice'; // Import deleteTodo action from Redux slice
import './index.css'; // Import CSS for styling
import EditTask from '../EditTask'; // Import EditTask component


const TaskItem = props => {
  const {taskDetails} = props;
  const {id, displayText, category, priority} = taskDetails; 
  const [modal, updateModal] = useState(false); // State for modal visibility
  const deleteTaskDispatch = useDispatch(); // Initialize dispatch function for deleteTodo action

  // Function to handle delete task button click
  const onClickDeleteTask = () => {
    deleteTaskDispatch(deleteTodo(id)); // Dispatch deleteTodo action with task id
  };

  // Function to toggle modal visibility
  const toggleModal = () => {
    updateModal(!modal); // Toggle modal state
  };


  return (
    <li className="list_item_container">
      <p className="task_name">{displayText}</p>
      <div className="task_item_right_container">
        <p className="task_category">{category.toUpperCase()}</p>
        <p className={`priority_element ${priority}`}>{priority}</p>

        {/* Edit button */}
        <button type="button" className="edit_icon_button" onClick={toggleModal}>
          <MdEditSquare size={20} />{' '}
        </button>

        {/* Edit task modal */}
        {modal && (
          <div className="modal">
            <div className="overlay"> </div>

            <div className="popup_bg_container">
              <EditTask taskDetails={taskDetails} toggleModal={toggleModal} />
            </div>

            {/* Close modal button */}
            <button type="button" className="close_modal" onClick={toggleModal}>
              Close
            </button>
          </div>
        )}

        {/* Delete button */}
        <button type="button" className="delete_icon_button" onClick={onClickDeleteTask}>
          <RiDeleteBin6Line size={20} />{' '}
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
