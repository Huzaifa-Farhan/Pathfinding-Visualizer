// Performs Dijkstra's algorithm; returns all nodes in the order in which they were visited.
// This does not return the shortest path itself but all the nodes explored in the process.
export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = []; // Array to store the order of visited nodes
  startNode.distance = 0; // Start node has a distance of 0
  const unvisitedNodes = getAllNodes(grid); // Get all nodes from the grid

  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes); // Sort nodes by distance
    const closestNode = unvisitedNodes.shift(); // Get the closest node

    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;

    // If the closest node is at a distance of infinity, we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true; // Mark the node as visited
    visitedNodesInOrder.push(closestNode); // Add the node to the list of visited nodes

    // If we've reached the finish node, return the visited nodes.
    if (closestNode === finishNode) return visitedNodesInOrder;

    // Update the distance and previous node for unvisited neighbors.
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

// Sorts the nodes by distance from the start node
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

// Updates the distances of the unvisited neighbors of a given node
function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1; // Update distance
    neighbor.previousNode = node; // Set the previous node to enable path reconstruction
  }
}

// Retrieves the unvisited neighbors of a given node
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]); // Up
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
  if (col > 0) neighbors.push(grid[row][col - 1]); // Left
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right
  return neighbors.filter(neighbor => !neighbor.isVisited); // Only return unvisited neighbors
}

// Retrieves all nodes from the grid as a flat array
function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Returns an array of nodes representing the shortest path.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode); // Add the node to the path
    currentNode = currentNode.previousNode; // Move to the previous node
  }
  return nodesInShortestPathOrder; // Return the nodes in the shortest path
}
