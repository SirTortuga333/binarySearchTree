export class Node {
  data = null;
  left = null;
  right = null;

  constructor(value) {
    this.data = value;
  }

  setLeft(node) {
    this.left = node;
  }

  setRight(node) {
    this.right = node;
  }
}
