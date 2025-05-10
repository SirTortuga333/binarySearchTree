import { Node } from "./node.js";

export class Tree {
  array = null;
  root = null;

  constructor(array) {
    array = array.sort((a, b) => a - b);
    array = [...new Set(array)];

    console.log(array);
    this.root = this.buildTree(array, 0, array.length);
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

  insert(value){
    // inserts given node with value in correct place
  }

  delete(value){
    // deletes given node with value from tree without losing branch
  }

  find(value){
    // Returns node with given value
  }

  levelOrder(cb){
    // traverse the tree in breadth-first level order and call the callback on each node as it traverses
  }

  inOrder(cb){
    // Traverse tree and print
  }

  preOrder(cb){
    // Traverse tree and print

  }

  postOrder(cb){
    // Traverse tree and print

  }

  height(){
    // returns the height of the node containing the given value
  }

  depth(value){
    // returns the depth of the node containing the given value
  }

  isBalance(){
    // checks if the tree is balanced
  }

  rebalance(){
    // rebalances an unbalanced tree
  }
}
