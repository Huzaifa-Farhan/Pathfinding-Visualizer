import React, { Component } from 'react';
import './Node.css';

export default class Node extends Component {
  render() {
    const {
      col,          // The column index of the node
      isFinish,     // Whether this node is the finish node
      isStart,      // Whether this node is the start node
      isWall,       // Whether this node is a wall
      onMouseDown,  // Handler for when the mouse button is pressed down
      onMouseEnter, // Handler for when the mouse enters this node
      onMouseUp,    // Handler for when the mouse button is released
      row,          // The row index of the node
    } = this.props;

    // Determine the class name based on the node type
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';

    return (
      // Render a div representing the node with appropriate class names and event handlers
      <div
        id={`node-${row}-${col}`}  // Unique ID for the node based on its position
        className={`node ${extraClassName}`} // Apply the 'node' class and any additional class
        onMouseDown={() => onMouseDown(row, col)} // Trigger onMouseDown event with row and col
        onMouseEnter={() => onMouseEnter(row, col)} // Trigger onMouseEnter event with row and col
        onMouseUp={() => onMouseUp()} // Trigger onMouseUp event
      ></div>
    );
  }
}
