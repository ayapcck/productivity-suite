const head = Symbol('head');

export class LinkedList {
    constructor() {
        this[head] = null;
        this.length = 0;
    }

    add(data) {
        const newNode = new LinkedListNode(data);
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
            this.getHead();
        }
        if (index < 0 || index > this.length - 1) {
            return null;
        }
        let curIndex = 0;
        let curNode = this[head];
        while (curIndex !== index) {
            curIndex += 1;
            curNode = curNode.next;
        }
        return curNode;
    }

    getData(index) {
        return this.get(index).data;
    }

    getHead() {
        return this[head];
    }

    insertAt(index, data) { 
        // insertAt(1): 0 1 2 3 => insertAfter elt 0, before elt 1
        let newNode = new LinkedListNode(data);
        this.length += 1;
        if (index === 0) {
            newNode.next = this[head];
            this[head] = newNode;
            return;
        }
        let insertAfterNode = this.get(index - 1);
        newNode.next = insertAfterNode.next;
        insertAfterNode.next = newNode;
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
            this.length -= 1;
        }
    }

    equals(linkedList) {
        if (this.length === linkedList.length) {
            const head = this.getHead();
            if (head === null) {
                return linkedList.getHead() === null;
            } else {
                return head.equals(linkedList.getHead());
            }
        }
        return false;
    }

    _print() {
        let printArray = [];
        let curNode = this[head];
        while (curNode.hasNext()) {
            printArray.push(curNode.data);
            curNode = curNode.next;
        }
        printArray.push(curNode.data);
        console.log("Linked list as array: " + JSON.stringify(printArray));
    }
}

export class LinkedListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }

    hasNext() {
        return this.next !== null;
    }

    equals(node) {
        if (node !== null) {
            if (this.data === node.data) {
                if (this.next === null) {
                    return node.next === null;
                } else {
                    return this.next.equals(node.next);
                }
            }
        }
        return false;
    }
}