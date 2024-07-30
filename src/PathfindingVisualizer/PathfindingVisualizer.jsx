import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';

import './PathfindingVisualizer.css';

// Constants defining the start and finish node positions
const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 25;
const FINISH_NODE_COL = 40;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [], // Represents the grid structure
      mouseIsPressed: false, // Keeps track of whether the mouse is pressed
    };
  }

  // Called immediately after the component is mounted
  componentDidMount() {
    const grid = getInitialGrid(); // Create the initial grid
    this.setState({grid}); // Set the initial grid state
  }

  // Handler for when the mouse is pressed down
  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  // Handler for when the mouse enters a cell while being pressed down
  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return; // Only update if mouse is pressed
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  // Handler for when the mouse button is released
  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  // Animate the nodes visited during the Dijkstra's algorithm execution
  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder); // Animate shortest path
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited'; // Change the class to indicate the node was visited
      }, 10 * i);
    }
  }

  // Animate the nodes that make up the shortest path
  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path'; // Change the class to indicate the shortest path
      }, 50 * i);
    }
  }

  // Function to start the visualization of Dijkstra's algorithm
  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode); // Get all visited nodes
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode); // Get shortest path
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder); // Start animation
  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>
        {/* Header for the application */}
        <header>
          <h1>Welcome to a Pathfinding Visualizer!</h1>
          <p>We visualize pathfinding using Dijkstra's Algorithm.</p>
          <p>
            Click and drag your mouse anywhere on the grid to create walls that get in the way 
            of the algorithm. Whenever ready, click the 'Visualize Dijkstra's Algorithm' 
            button below to test the visualizer, or click the 'Reset' button to restart.
          </p>
        </header>
        {/* Buttons for visualizing and resetting */}
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
        <button onClick={() => window.location.reload()}>
          Reset
        </button>
        {/* The grid display */}
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

// Creates the initial grid with default nodes
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 40; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

// Creates a new node object
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL, // Checks if node is the start
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL, // Checks if node is the finish
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

// Toggles the wall state of a node in the grid
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall, // Toggles the isWall property
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
