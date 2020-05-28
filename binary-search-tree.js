/*
  BST: Binary Search Tree
  They are very fast to search through and retrieve data from.
  Quick to insert and delete, methods use binary search, O(log n)
  They are performant when balanced: most of the nodes have a left and right child
  Use cases: Dictionary, phone book, alphabetical order, store users by ID
*/

// A new node without child nodes
function BST(value) {
  this.value = value
  this.left = null
  this.right = null
}

// Creates a new BST and places it in the correct location of prev BST
// It really helpd to draw what's happening with recursion following an example
BST.prototype.insert = function(value) {
  if (value <= this.value) {
    // Is there a left child or not?
    if (!this.left) this.left = new BST(value) // no child node, add new one
    else this.left.insert(value) // child node present, call recursively to travel down :)
  } else if (value > this.value) { // the if is not necessary
    if (!this.right) this.right = new BST(value)
    else this.right.insert(value)
  }
}

BST.prototype.hasValue = function(value) {
  if (value == this.value) return true
  else if (value < this.value) {
    if (!this.left) return false
    return this.left.hasValue(value)
  } else if (value > this.value) {
    if (!this.right) return false
    return this.right.hasValue(value)
  }
}

// DFS will go through all the nodes in the BST and run the iteratorFunc in each of those nodes.
// Goes on a branch from the top to the bottom before it reaches the net branch. 
// In order DFS: from left to right, from least to greatest. LEFT-PARENT-RIGHT
// Pre Order DFS: PARENT-LEFT-RIGHT. Useful to copy a tree.
// Post Order DFS: LEFT-RIGHT-PARENT. Useful to safely delete child subtrees
BST.prototype.DFS = function(iteratorFunc, order) {
  if (order === 'pre-order') iteratorFunc(this)
  if (this.left) this.left.DFS(iteratorFunc, order)
  if (order === 'in-order') iteratorFunc(this)
  if (this.right) this.right.DFS(iteratorFunc, order)
  if (order === 'post-order') iteratorFunc(this)
}

// BFS will go through all the nodes in the BST by levels, not branches.
// Useful to define a pyramid, hierarchy, anything related to levels.
// BFS will run the iteratorFunc on the front node of the queue, 
// then push child nodes into the back of the queue. Repeat.
BST.prototype.BFS = function(iteratorFunc) {
  var queue = [this] // FIFO, initialized with root of the tree
  while (queue.length) {
    var treeNode = queue.shift()
    iteratorFunc(treeNode)
    if (treeNode.left) queue.push(treeNode.left)
    if (treeNode.right) queue.push(treeNode.right)
  } 
}

BST.prototype.getMinValue = function() {
  if (this.left) return this.left.getMinValue()
  else return this.value
}

BST.prototype.getMaxValue = function() {
  if (this.right) return this.right.getMaxValue()
  else return this.value
}

var bst = new BST(100);

bst.insert(20)
bst.insert(60)
bst.insert(140)
bst.insert(14)
bst.insert(1)
bst.insert(190)

//bst.DFS(print, 'in-order')
bst.BFS(print)

function print(node) {
  console.log(node.value)
}

console.log('MIN: ', bst.getMinValue())
console.log('MAX: ', bst.getMaxValue())
