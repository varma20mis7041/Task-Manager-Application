import './App.css'; 
import { Provider } from 'react-redux'; // Import Provider from react-redux for Redux integration
import TaskInput from './components/TaskInput'; 
import TaskList from './components/TaskList'; 
import store from './store/store'; 


// List of tags used for categorizing tasks
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


const App = () => (
  <div className="main_container">
    {/* Provide the Redux store to the entire application */}
    <Provider store={store}>
      <TaskInput tagsList={tagsList} />
      <TaskList tagsList={tagsList} />
    </Provider>
  </div>
);

export default App; 
