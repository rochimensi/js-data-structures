/*
  Example of HastTable to insert person name and email
  We will use Unicode numberic values for hashing characters with .charCodeAt()
*/

// size: how big our hast table is, how many buckets it has
function HashTable (size) {
  this.buckets = Array(size) // This buckets property is opur hash table
  this.numBuckets = this.buckets.length
}

function HashNode(key, value, next) {
  this.key = key
  this.value = value
  this.next = next || null // refers to the next node in that buckets if we have any collisions
}

HashTable.prototype.hash = function(key) {
  var total = 0
  for (var i = 0; i < key.length; i++) {
    total += key.charCodeAt(i)
  }
  return total % this.numBuckets // Tells what bucket to put the node in
}

HashTable.prototype.insert = function(key, value) {
  var index = this.hash(key)
  // bucket empty
  if (!this.buckets[index]) this.buckets[index] = new HashNode(key, value)
  else if(this.buckets[index].key === key) {
    this.buckets[index].value = value
  }
  else {
    var currentNode = this.buckets[index]
    while(currentNode.next) { // Travel through the last node in the chain
      if(currentNode.next.key === key) { // updating a person
        return currentNode.next.value = value // finish while loop
      }
      currentNode = currentNode.next
    }
    currentNode.next = new HashNode(key, value)
  }
}

HashTable.prototype.get = function(key) {
  var index = this.hash(key)
  if (!this.buckets[index]) return null
  var currentNode = this.buckets[index]
  while(currentNode) {
    if(currentNode.key === key) return currentNode.value
    currentNode = currentNode.next
  }
  return null
}

HashTable.prototype.getAll = function() {
  var allNodes = []
  for(var i = 0; i < this.numBuckets; i++) {
    var currentNode = this.buckets[i]
    while(currentNode) {
      allNodes.push(currentNode)
      currentNode = currentNode.next
    }
  }
  return allNodes
}

var myHT = new HashTable(15)
myHT.insert('ro', 33)
myHT.insert('rochi', 31)
myHT.insert('rosario', 32)
myHT.insert('or', 44)
console.log(myHT.getAll())
console.log(myHT)
