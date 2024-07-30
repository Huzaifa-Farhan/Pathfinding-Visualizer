# Pathfinding-Visualizer
This project is a web application for visualizing pathfinding algorithms, specifically Dijkstra's Algorithm. It allows users to interactively create walls on a grid and see how the algorithm finds the shortest path from a start node to a finish node.

# Features
Dijkstra's Algorithm Visualization: Visualizes the process of Dijkstra's Algorithm in real-time.  
Interactive Grid: Users can click and drag to create walls that obstruct the pathfinding.  
Responsive Layout: Adjusts margins for top and bottom spacing to ensure proper layout.  
Node States: Differentiates nodes based on their state:  
* Start Node
* Finish Node
* Wall
* Visited Node
* Shortest Path Node  


# How to Run
1. Clone the Repository:
    ```bash
    git clone https://github.com/yourusername/pathfinding-visualizer.git  

3. Navigate to the Project Directory
  ```bash
  cd pathfinding-visualizer  

5. Install Dependencies  
Ensure you have Node.js installed, then run:  
    ```bash
    npm install  

6. Start the Development Server
    ```bash
    npm start  
Open your browser and go to http://localhost:3000 to view the application.  

# Code Overview  
### PathfindingVisualizer.js  
Component: Main React component for visualizing the pathfinding algorithm.  
State: Manages the grid layout, mouse interaction state, and visualization.  
Methods:  
componentDidMount(): Initializes the grid.  
handleMouseDown(), handleMouseEnter(), handleMouseUp(): Manage mouse interactions to toggle walls.  
visualizeDijkstra(): Runs Dijkstra's Algorithm and triggers animations.  
animateDijkstra(), animateShortestPath(): Animations for visualizing the algorithm's progress.  


### Node.js
Component: Represents a single node in the grid.  
Props:  
col, row: Position of the node.  
isFinish, isStart, isWall: State indicators for the node.  
onMouseDown, onMouseEnter, onMouseUp: Event handlers for mouse interactions.  
Render Method: Determines the CSS class based on node state and applies event handlers.  


### dijkstra.js  
Function: Implements Dijkstra's Algorithm to find the shortest path.  
Functions:  
dijkstra(): Executes the algorithm and returns nodes in the order they were visited.  
sortNodesByDistance(): Sorts nodes by distance.  
updateUnvisitedNeighbors(): Updates distances for unvisited neighbors.  
getUnvisitedNeighbors(): Retrieves unvisited neighbors.  
getAllNodes(): Gets all nodes in the grid.  
getNodesInShortestPathOrder(): Reconstructs the shortest path from finish node to start node.  


### Node.css
Styles:  
.node: Basic styling for nodes.  
.node-finish, .node-start: Styles for finish and start nodes with background images.  
.node-visited, .node-wall, .node-shortest-path: Animations and styles for different node states.  


### PathfindingVisualizer.css
Styles:  
.grid: Sets margin to create space around the grid.  

> **Note**:  
> I was able to create the following application by following the Tutorial created by Clément Mihailescu on Youtube. Here is a link for the tutorial for anyone interested: https://youtu.be/msttfIHHkak?si=XQXExVhT-s5hya_t  
