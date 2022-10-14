# Skyllo - pixel perfect, E2E clone of Trello.com (React + Node.js).
Kanban-style task management board app inspired by trello.com, [Here is my project link](https://skyllo.herokuapp.com "Skyllo link").

<img width="959" alt="details" src="https://user-images.githubusercontent.com/109578899/195812325-3c7130c7-06a5-4052-87da-069385f281d9.png">

## Trello Description
Trello is an app in which you can manage projects and tasks using a kanban board. A board contains lists and tasks. Usually each project is a board, and the lists and cards are the tasks and subjects to do in the project. Users can modify the board and change list and card locations using Drag and Drop.
Users can work together and watch live changes. 
There are many other features in Trello, such as labels, due date for tasks, members and more. 
Every thing Trello has, we also had.

## Application Features
- Create ***Boards*** and manage projects: Using ***D&D***, create, remove, and update lists and tasks.
- Create, edit and archive ***Task*** to the deepest level: Labels, Due date, Members, Cover images, Checklists, Activity log, Copy, Move and Archive.
- ***Side Menu:*** - Change the background of the board, ***Activity*** Log!
- Google Login, along with regular authentication which is encrypted and safe.

In addition, we created adjust color Mode to the Header, the header color adjusts itself by the colors of the backgroung image of the board!

## Technologies

The technology stack we used was MERN - MongoDB, Express, React, Node.js.
The app uses webSockets to update the board in real-time.
The API calls to the backend are done with the REST API method , and we used middlewares to authenticate and authorize actions.

We have used many thirs side libraries for many goals, such as the color adjest, google-login, D&D and more.
The layout and pixel-perfect were made with Sass (functions, mixins, variables). 

### Homepage
The landing page in which the user can sign up / login, or press the call to action button to start demo if the are limited with time.
<img width="958" alt="home-page" src="https://user-images.githubusercontent.com/109578899/195814208-01f1aeff-fe29-46d0-8971-d010f8fc9319.png">
###

### Workspace
All of the user's boards. Here, in addition to create a board with the empty board box and navigate between their's boards, they are able to use the vocal-assistant we created with 3rd side library! Pressing on the button in the middle of the nav bar on top would open an modal with instructions that makes life a bit easier.
<img width="955" alt="workspce" src="https://user-images.githubusercontent.com/109578899/195814348-82fad742-020e-40f2-a28d-59883ac07c1d.png">

### Board
All the functionality that you have in Trello. D&D, live-updates, editing tasks to the deepest level, side-menu, editing board members and more.
<img width="959" alt="details" src="https://user-images.githubusercontent.com/109578899/195812325-3c7130c7-06a5-4052-87da-069385f281d9.png">

### Dashboard
Special user interface, that displays a set of indicators, graphs, digital data, related to a task
<img width="959" alt="DASH" src="https://user-images.githubusercontent.com/109578899/195817711-eeee2a67-a96b-4c80-ae7f-2a6e70ae68c3.png">

### Mini Edit
A convenient option for abbreviated editing of the task instead get in to task details
<img width="959" alt="miniE" src="https://user-images.githubusercontent.com/109578899/195819253-08465952-9ede-40df-ba8a-ebbc3f9802a5.png">

### Task details
Here the user can edit their tasks and to watch it happens live, in this page and behind. Every button on the right menu opens an dynamic modal which fits the content accordingly to the pressed button.
<img width="867" alt="Detailss" src="https://user-images.githubusercontent.com/109578899/195817031-4ebbccd9-bbf3-4cb0-ae27-6161c7f53a0f.png">

### Some mobile!
Just a taste of the mobile experience. We used different **mixins**, **conditional rendering**, and the **"mobile first"** approach. 
The layout we have built from the very first moment enabled us to make the website responsive without a lot of effort.
<img width="744" alt="Mobiles" src="https://user-images.githubusercontent.com/109578899/195818955-16ad06a3-d1bf-499f-8692-0c84aac3b82b.png">
