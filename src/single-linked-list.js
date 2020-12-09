// 线性表的顺序存储，就是array的实现
class Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

// 线性表的链式存储结构(单链表)实现 
class SingleLinkedList {
  constructor() {
    this.header = new Node(null, null);
    this.size = 0;
  }

  appendNode(data, index) {
    const curNode = this.getNode(this.header, 0, index);
    if (!curNode) {
      return false;
    }
    curNode.next = new Node(data, curNode.next);
    this.size++;
    return true;
  }

  getNode(curNode, curIndex, targetIndex) {
    if (curIndex === targetIndex) {
      return curNode;
    }
    if (curIndex === this.size) {
      return false;
    }
    return this.getNode(curNode.next, ++curIndex, targetIndex);
  }

  removeNode(index) {
    const preNode = this.getNode(this.header, 0, index - 1);
    const curNode = this.getNode(this.header, 0, index);
    preNode.next = curNode.next;
    this.size--;
    return true;
  }

  length() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  toString() {
    return JSON.stringify(this);
  }
};

const singleLinkedList = new SingleLinkedList();

let results = singleLinkedList.appendNode(0, 0);
console.log('results', results);
console.log(singleLinkedList.toString());

results = singleLinkedList.appendNode(1, 1);
console.log('results', results);
console.log(singleLinkedList.toString());

results = singleLinkedList.appendNode(3, 3);
console.log('results', results);
console.log(singleLinkedList.toString());

results = singleLinkedList.removeNode(1, 1);
console.log('results', results);
console.log(singleLinkedList.toString());
