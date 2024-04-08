
//displays all the paths from start to end
export const findAllPaths = (graph, start, end) => {
    const visitedEdges = new Set();
  
    function dfs(node, path) {
      if (node === end) {
        console.log('Path:', path.join(' -> '));
        return;
      }
  
      if (!graph[node]) return;
  
      for (const neighbor of graph[node]) {
        const edge = [node, neighbor].join('-');
        
        if (!visitedEdges.has(edge)) {
          visitedEdges.add(edge);
          dfs(neighbor, [...path, neighbor]);
          visitedEdges.delete(edge); // Backtrack: remove the edge from visited
        }
      }
    }
  
    dfs(start, [start]);
}

//display all pair of edges
export const findEdgePairs = (graph) => {
    const edgePairs = [];

    for (let [pk, pv] of Object.entries(graph)) {

        for (let neighbor of pv) {
            if (graph[neighbor]) {
                for (let child of graph[neighbor]) {
                    edgePairs.push([pk, neighbor, child])
                }
            }
        }
    }
    return edgePairs;

} 

//displays all edges
export function displayAllEdges(graph) {
    for (const node in graph) {
        for (const adjacentNode of graph[node]) {
            console.log(`Edge: ${node} -> ${adjacentNode}`);
        }
    }
  }



//displays all nodes  
export function getAllNodes(graph) {
    const nodes = new Set();

    
    for (const node in graph) {
        nodes.add(node); // Add the current node to the set

        for (const adjacentNode of graph[node]) {
            nodes.add(adjacentNode); // Add adjacent nodes to the set
        }
    }

    return Array.from(nodes); // Convert the set to an array and return
}