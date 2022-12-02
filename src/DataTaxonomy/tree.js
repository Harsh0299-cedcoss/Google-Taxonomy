class Node {
  constructor(inpData) {
    this.data = inpData;
    this.children = [];
  }
}
export class Tree {
  constructor() {
    this.root = new Node("Start");
  }

  insert(data) {
    data && this.insertNode(this.root, data);
  }

  insertNode(node, data) {
    if (!node.children.find((n) => n.data === data[0])) {
      node.children.push(new Node(data[0]));
    } else {
      this.insertNode(
        node.children.find((n) => n.data === data[0]),
        data.splice(1, data.length)
      );
    }
  }
}