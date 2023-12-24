const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    // root of a binary search tree
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.rootNode === null) {
      this.rootNode = newNode;
    } else {
      console.log(newNode.data);
      this.insertNode(this.rootNode, newNode);
    }
  }

  insertNode(node, newNode) {
    // if the data is less than the node
    // data move left of the tree
    if (newNode.data < node.data) {
      // if left is null insert node here
      if (node.left === null) node.left = newNode;
      // if left is not null recur until
      // null is found
      else this.insertNode(node.left, newNode);
    }

    // if the data is more than the node
    // data move right of the tree
    else {
      // if right is null insert node here
      if (node.right === null) {
        node.right = newNode;
      }

      // if right is not null recur until
      // null is found
      else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  has(data, node = this.rootNode) {
    // if trees is empty return null
    if (node === null) return false;
    // if data is less than node's data
    // move left
    else if (data < node.data)
      return this.find(data, node.left) === null ? false : true;
    // if data is more than node's data
    // move right
    else if (data > node.data)
      return this.find(data, node.right) === null ? false : true;
    // if data is equal to the node data
    // return node
    else return true;
  }

  find(data, node = this.rootNode) {
    if (!this.rootNode) return null;

    let current = node;
    let found = false;
    while (current && !found) {
      if (data < current.data) {
        current = current.left;
      } else if (data > current.data) {
        current = current.right;
      } else {
        found = current;
      }
    }

    if (!found) return null;
    return found;
  }

  remove(data) {
    // root is re-initialized with
    // root of a modified tree.
    this.rootNode = this.removeNode(this.rootNode, data);
  }
  // Method to remove node with a
  // given data
  // it recur over the tree to find the
  // data and removes it
  removeNode(node, key) {
    // if the root is null then tree is
    // empty
    if (node === null) return null;
    // if data to be delete is less than
    // roots data then move to left subtree
    else if (key < node.data) {
      node.left = this.removeNode(node.left, key);
      return node;
    }

    // if data to be delete is greater than
    // roots data then move to right subtree
    else if (key > node.data) {
      node.right = this.removeNode(node.right, key);
      return node;
    }

    // if data is similar to the root's data
    // then delete this node
    else {
      // deleting node with no children
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      // deleting node with one children
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      // Deleting node with two children
      // minimum node of the right subtree
      // is stored in aux
      var aux = this.min(node.right);
      node.data = aux;

      node.right = this.removeNode(node.right, aux);
      return node;
    }
  }

  min(node = this.rootNode) {
    if (node.left === null) return node.data;
    else return this.min(node.left);
  }

  max(node = this.rootNode) {
    if (node.right === null) return node.data;
    else return this.max(node.right);
  }
}

module.exports = {
  BinarySearchTree,
};
