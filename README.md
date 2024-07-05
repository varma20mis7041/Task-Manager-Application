# Task Manager

[demo link](https://bvtaskmanager.netlify.app/)

## Description
This application allows users to manage tasks categorized by tags with different priorities. Users can add, edit, delete tasks and filter them based on tags and priority levels.



## Installation
Follow these steps to set up and run the application:

1. Clone the repository:
    ```bash
   https://github.com/varma20mis7041/Task-Manager-Application.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Task-Manager-Application
    ```

3. Install the necessary dependencies:
    ```bash
    npm install
    npm install @reduxjs/toolkit
    npm install react-redux
    npm install react-icons --save
    ```

4. Start the application:
    ```bash
    npm start
    ```

## Usage

1. Add a new task by entering the task name, selecting a category, and choosing a priority.
2. Edit an existing task by clicking the edit icon next to the task, modifying task details, and saving changes.
3. Delete a task by clicking the delete icon next to the task.
4. Filter tasks by selecting a tag from the tag list and/or choosing a priority level from the priority dropdown.
5. Save tasks locally using the "Save" button to persist changes between sessions.


## Features

- **Add Task**: Users can add a new task specifying the task name, category (tag), and priority level.
- **Edit Task**: Existing tasks can be edited to update task details such as name, category, and priority.
- **Delete Task**: Tasks can be deleted from the list.
- **Filter by Tags**: Tasks can be filtered based on predefined tags such as Health, Education, Entertainment, Sports, Travel, and Others.
- **Filter by Priority**: Tasks can be filtered by priority levels: All, Low, Medium, and High.
- **Local Storage**: Tasks are saved locally using browser's localStorage to persist task data between sessions.
- **Responsive UI**: The user interface is designed to be responsive and accessible across various devices.

## Technologies Used

- **React**: Front-end framework for building user interfaces.
- **Redux Toolkit**: State management library for managing application state.
- **React-Redux**: Official Redux bindings for React to manage state and interact with Redux store.
- **localStorage**: Browser storage to persist task data locally.
- **CSS**: Styling using CSS for design and layout.
