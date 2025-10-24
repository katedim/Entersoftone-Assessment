# Employee Management App
A React + Vite + TypeScript project built to display and manage a list of employees.
This project demonstrates API data fetching, filtering, navigation, SCSS styling, and state management with Redux Toolkit.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v22.12 or higher)
- npm (v6 or higher)

## Getting Started

1. Open a new terminal window/tab and navigate to the `entersoftone-app` folder:

    ```
    cd entersoftone-app
    ```

2. Install the required dependencies:

    ```
    npm install
    ```

3. Start the application:

    ```
    npm run dev
    ```

    The application should now be running and accessible in your web browser.

## Testing

To run the unit tests: ```npm run test```
   
## 1. Employee List Page
- Displays a table of employees with:
    Full Name, Department, Email, and Status
- Data fetched from a mock API (employees.json)
- Built using Material UI Table

## 2. Search and Filter

- Search employees by name or email
- Filter employees by department

## 3. Employee Details View

- Clicking a row opens a details page
- Shows extra info: Hire Date, Notes, and profile image if exists
- Includes a Back button to return to the list

## 4. State Management

- Uses Redux Toolkit for:
  Employee list data
  Search & filter states
- Includes actions for fetching, filtering, and resetting employees

## 5. Styling

- All components use SCSS for styling
