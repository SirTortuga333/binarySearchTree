import { Tree } from "./tree.js";

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// tree.prettyPrint(tree.root);
// tree.insert(6900);
// tree.insert(69);
// tree.insert(70);
// tree.insert(0);
// tree.prettyPrint(tree.root);
// console.log(tree.find(69, tree.root));
// console.log(tree.delete(67, tree.root));
// tree.prettyPrint(tree.root);

// const cb = (a) => console.log(a);
// // tree.levelOrderIteratotion(cb);
// // console.log("************");
// // tree.levelOrderRecursive(cb);
// console.log("************");
// tree.preOrder(cb);
// console.log("************");
// tree.inOrder(cb);
// console.log("************");
// tree.postOrder(cb);
// console.log(tree.height(67))

console.log(tree.isBalance());
for (let index = 0; index < 5; index++) {
  tree.insert(Math.floor(Math.random() * 1000));
}

// const cb = (a) => console.log(a);
// console.log("************");
// tree.preOrder(cb);
// console.log("************");
// tree.inOrder(cb);
// console.log("************");
// tree.postOrder(cb);

console.log(tree.isBalance());

console.log(tree.rebalance());
console.log(tree.isBalance());
const cb = (a) => console.log(a);

tree.inOrder(cb);