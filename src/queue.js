const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.head = null;
  }

  getUnderlyingList() {
    return this.#constructOutputList(this.head);
  }

  #constructOutputList(node) {
    let obj = {
      value: node.value,
      next: node.next
    };
    if (node.next !== null) {
      obj.next = this.#constructOutputList(obj.next);
    }
    return obj;
  }

  enqueue(value) {
    if (this.head === null) {
      this.head = new ListNode(value);
    } else {
      let node = this.head;
      while (node.next !== null) {
        node = node.next;
      }
      node.next = new ListNode(value);
    }
  }

  dequeue() {
    let value = this.head.value;
    this.head = this.head.next;
    return value;
  }
}

module.exports = {
  Queue
};
