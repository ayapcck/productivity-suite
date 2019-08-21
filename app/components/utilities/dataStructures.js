const head = Symbol('head');

export class LinkedList {
    constructor() {
        this[head] = null;
        this.length = 0;
    }

    add(data) {
        const newNode = LinkedListNode(data);
        if (this[head] === null) {
            this[head] = newNode;
        } else {
            let node = this[head];
            while (node.hasNext()) {
                node = node.next;
            }
            node.next = newNode;
        }
        this.length += 1;
    }

    get(index) {
        // need to get to index, start at 0
        if (index === 0) {
            return this[head];
        }
        if (index < 0 || index > this.length - 1) {
            return null;
        }
        let curIndex = 0;
        let curNode = this[head];
        while (curIndex !== index) {
            curIndex += 1;
            cudeNode = curNode.next;
        }
        return curNode;
    }

    remove(index) {
        if (index === 0) {
            this[head] = this[head].next;
            return;
        }

        const nodeBefore = this.get(index - 1);
        const nodeToBeRemoved = nodeBefore && nodeBefore.next;
        if (nodeToBeRemoved) {
            nodeBefore.next = nodeToBeRemoved.next;
        }
    }
}

class LinkedListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }

    hasNext() {
        return this.next !== null;
    }
}