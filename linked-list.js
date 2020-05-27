function LinkedList() {
  this.head = null
  this.tail = null
}

function Node(value, next, prev) {
  this.value = value
  this.next = next
  this.prev = prev
}

//var node1 = new Node(100, 'node2', null)
//console.log(node1)

// consider scenarios: empty list, n nodes
// O(1): we work with head and tail only, no matter how many nodes the list has
LinkedList.prototype.addToHead = function(value) {
  var newNode = new Node(value, this.head, null)
  if (this.head) this.head.prev = newNode
  else this.tail = newNode // empty list. Head and tail point to the new node
  this.head = newNode
}

// O(1): we work with head and tail only, no matter how many nodes the list has
LinkedList.prototype.addToTail = function(value) {
  var newNode = new Node(value, null, this.tail)
  if (this.tail) this.tail.next = newNode
  else this.head = newNode // empty list. Head and tail point to the new node
  this.tail = newNode
}

// O(1): we work with head and tail only, no matter how many nodes the list has
LinkedList.prototype.removeHead = function() {
  if (!this.head) return
  var val = this.head.value // current head to be removed
  this.head = this.head.next
  if (this.head) this.head.prev = null // if the list is not empty
  else this.tail = null
  return val
}

// O(1): we work with head and tail only, no matter how many nodes the list has
LinkedList.prototype.removeTail = function() {
  if (!this.tail) return
  var val = this.tail.value // current tail to be removed
  this.tail = this.tail.prev
  if (this.tail) this.tail.next = null // if the list is not empty
  else this.head = null
  return val
}

// O(n): we need to iterate through entire list in worst case scenario. Time 
// will grow proportionally with nodes
LinkedList.prototype.search = function(searchValue) {
  var currentNode = this.head  // start moving through our list
  while(currentNode) {
    if (currentNode.value === searchValue) return currentNode.value
    currentNode = currentNode.next
  }
}

LinkedList.prototype.indexOf = function(searchValue) {
  var indexes = []
  var i = 0;
  var currentNode = this.head
  while(currentNode) {
    if (currentNode.value === searchValue) indexes.push(i)
    currentNode = currentNode.next
    i++
  }
  return indexes
}

var ll = new LinkedList()

ll.addToHead(1)
ll.addToHead(2)
ll.addToHead(3)
ll.addToTail(2)

console.log(ll.indexOf(4))
