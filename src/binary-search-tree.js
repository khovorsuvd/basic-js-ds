const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    if (this.rootNode === null) {
      this.rootNode = new Node(data);
    } else {
      this.#add(data, this.rootNode);
    }
  }

  #add(data, node) {
    if (data < node.data) {
      if (node.left === null) {
        node.left = new Node(data);
        return;
      } else {
        this.#add(data, node.left);
      }
    }
    if (data > node.data) {
      if (node.right === null) {
        node.right = new Node(data);
        return;
      } else {
        this.#add(data, node.right);
      }
    }
  }

  has(data) {
    return this.#has(data, this.rootNode);
  }

  #has(data, node) {
    if (node === null) {
      return false;
    }
    if (node.data === data) {
      return true;
    }
    if (data < node.data) {
      return this.#has(data, node.left);
    }
    if (data > node.data) {
      return this.#has(data, node.right);
    }
  }

  find(data) {
    return this.#find(data, this.rootNode);
  }

  #find(data, node) {
    if (node === null) {
      return null;
    }
    if (node.data === data){
      return node;
    }
    if (data < node.data) {
      return this.#find(data, node.left);
    }
    if (data > node.data) {
      return this.#find(data, node.right);
    }
  }

  remove(data) {
    let prev = null;
    let curr = this.rootNode;
    while (curr !== null) {
      if (data === curr.data) {
        let leftSubtreeRoot = curr.left;
        if (leftSubtreeRoot !== null) {
          let [nodeMaxPrev, nodeMax] = this.#max(leftSubtreeRoot);
          if (nodeMax === null) {
            if (prev === null) {
              let right = this.rootNode.right;
              this.rootNode = this.rootNode.left;
              this.rootNode.right = right;
            } else {
              prev.right === curr ? prev.right = curr.left : prev.left = curr.left;
              leftSubtreeRoot.right = curr.right;
            }
          } else if (nodeMax.left !== null) {
            nodeMaxPrev.right = nodeMax.left;
            curr.data = nodeMax.data;
          } else {
            if (prev === null) {
              this.rootNode.data = nodeMax.data;
            }
            curr.data = nodeMax.data;
            nodeMaxPrev.right = null;
          }
        } else {
          if (prev === null) {
            this.rootNode = this.rootNode.right;
          } else {
            if (prev.left === curr) {
              prev.left = curr.right;
            } else {
              prev.right = curr.right;
            }
          }
        }
        break;
      }
      prev = curr;
      data < curr.data ? curr = curr.left : curr = curr.right;
    }
  }

  min() {
    let node = this.rootNode;
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    let node = this.rootNode;
    while (node.right !== null) {
      node = node.right;
    }
    return node.data;
  }

  #max(node) {
    if (node.right !== null) {
      while (node.right.right !== null) {
        node = node.right;
      }
    }
    return [node, node.right];
  }
}

module.exports = {
  BinarySearchTree
};