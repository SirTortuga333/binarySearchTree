import { Node } from "./node.js";

export class Tree {
  array = null;
  root = null;

  constructor(array) {
    array = array.sort((a, b) => a - b);
    array = [...new Set(array)];

    this.root = this.buildTree(array, 0, array.length - 1);
  }

  buildTree(array, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);

    const root = new Node(array[mid]);

    root.setLeft(this.buildTree(array, start, mid - 1));
    root.setRight(this.buildTree(array, mid + 1, end));

    return root;
  }

  prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  insert(value, node = this.root) {
    // inserts given node with value as a leaf
    if (node === null) return new Node(value);

    if (node.data === value) return node;

    if (value < node.data) node.left = this.insert(value, node.left);
    else if (value > node.data) node.right = this.insert(value, node.right);

    return node;
  }

  delete(value, node) {
    // deletes given node with value from tree without losing branch
    if (node === null) return node;

    if (value < node.data) {
      node.left = this.delete(value, node.left);
    } else if (value > node.data) {
      node.right = this.delete(value, node.right);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      let succesor = this.getSuccesor(node);
      node.data = succesor.data;
      node.right = this.delete(succesor.data, node.right);
    }
    return node;
  }

  getSuccesor(node) {
    node = node.right;
    while (node != null && node.left !== null) node = node.left;
    return node;
  }

  find(value, node) {
    // Returns node with given value
    if (node === null) return null;

    if (value === node.data) return node;

    if (value < node.data) return this.find(value, node.left);
    else return this.find(value, node.right);
  }

  levelOrderIteratotion(cb) {
    // traverse the tree in breadth-first level order and call the callback on each node as it traverses

    if (cb === null || cb === undefined) throw new Error("Missing Callback!");

    if (this.root === null) return;

    let queue = [];
    queue.push(this.root);

    while (queue.length !== 0) {
      const first = queue.shift();
      cb(first.data);
      if (first.left !== null) queue.push(first.left);
      if (first.right !== null) queue.push(first.right);
    }
  }

  levelOrderRecursive(cb, prev = [this.root]) {
    if (cb === null || cb === undefined) throw new Error("Missing Callback!");

    if (prev.length === 0 || this.root === null) return;

    const nextLevel = [];

    for (let node of prev) {
      cb(node.data);
      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);
    }

    this.levelOrderRecursive(cb, nextLevel); // recursión con el siguiente nivel
  }

  inOrder(cb, prev = this.root) {
    // Traverse tree and print
    if (cb === null || cb === undefined) throw new Error("Missing Callback!");

    if (this.root === null) return null;

    if (prev.left !== null) this.inOrder(cb, prev.left);
    cb(prev.data);
    if (prev.right !== null) this.inOrder(cb, prev.right);

    return null;
  }

  preOrder(cb, prev = this.root) {
    // Traverse tree and print
    if (cb === null || cb === undefined) throw new Error("Missing Callback!");

    if (this.root === null) return null;

    cb(prev.data);
    if (prev.left !== null) this.preOrder(cb, prev.left);
    if (prev.right !== null) this.preOrder(cb, prev.right);

    return null;
  }

  postOrder(cb, prev = this.root) {
    // Traverse tree and print
    if (cb === null || cb === undefined) throw new Error("Missing Callback!");

    if (this.root === null) return null;

    if (prev.left !== null) this.postOrder(cb, prev.left);
    if (prev.right !== null) this.postOrder(cb, prev.right);
    cb(prev.data);

    return null;
  }

  height(value) {
    // returns the height of the node containing the given value
    if (this.root === null) return -1;

    let tmp = this.root;

    while (tmp !== null && value !== tmp.data) {
      if (value < tmp.data) tmp = tmp.left;
      if (value > tmp.data) tmp = tmp.right;
    }
    if (tmp === null) return -1;

    return this._getHeight(tmp);
  }

  _getHeight(node) {
    if (node === null) return -1;
    return (
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right))
    );
  }

  depth(value) {
    // returns the depth of the node containing the given value
    if (this.root === null) return -1;

    let tmp = this.root;
    let depth = 0;

    while (tmp !== null && value !== tmp.data) {
      depth++;
      if (value < tmp.data) tmp = tmp.left;
      if (value > tmp.data) tmp = tmp.right;
    }
    if (tmp === null) return -1;
    return depth;
  }

  isBalance(node = this.root) {
    // checks if the tree is balanced

    if (node === null) return true;

    const leftSubTreeHeight = this._getHeight(node.left);
    const rightSubTreeHeight = this._getHeight(node.right);

    const balancedHere = Math.abs(leftSubTreeHeight - rightSubTreeHeight) <= 1;

    return (
      balancedHere && this.isBalance(node.left) && this.isBalance(node.right)
    );
  }

  rebalance() {
    // rebalances an unbalanced tree

    const result = [];
    this.inOrder((data) => result.push(data));

    this.root = this.buildTree(result, 0, result.length - 1);
  }
}
