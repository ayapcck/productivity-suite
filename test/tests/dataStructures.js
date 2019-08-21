import { describe, expect, it, test } from '../test.js';

import { LinkedList, LinkedListNode } from '../../app/components/utilities/dataStructures.js';

describe ('LinkedList.get(index)', () => {
    it ('should return null for indices outside of range', () => {
        let linkedList = new LinkedList();
        linkedList.add('test');
        test('null returned with negative index', expect(linkedList.get(-1)).to.be.null);
        test('null returned for index greater than list.length - 1', expect(linkedList.get(1)).to.be.null);
    });
    it ('should return node for given index', () => {
        let linkedList = new LinkedList();
        linkedList.add('test');
        test('does not return null for valid index', expect(linkedList.get(0)).to.not.be.null);
        test('first node has given data and null next', expect(linkedList.get(0)).to.equal(linkedListNode));
    })
})
describe ('LinkedList.add(data)', () => {
    it ('should work on empty list', () => {
        let linkedList = new LinkedList();
        linkedList.add('test');
        test('correct length after add', expect(linkedList).to.have.lengthOf(1));
        const headNode = linkedList.getHead();
        test('correct data in node at index 0', expect(headNode.data).to.eql('test'));
    });
    it ('should add node to end of existing list', () => {
        let linkedList = new LinkedList();
        linkedList.add('test');
        linkedList.add('test1');
        test('correct length after two adds', expect(linkedList).to.have.lengthOf(2));
        test('correct data in node at index 1', expect(linkedList.getData(1)).to.eql('test1'));
    });
});
describe ('LinkedList.insertAt(index, data)', () => {
    it ('should be able to insert a new head node', () => {
        let linkedList = new LinkedList();
        linkedList.add('test1');
        const originalHeadNode = linkedList.getHead();
        linkedList.insertAt(0, 'test');
        test('correct length after insert', expect(linkedList).to.have.lengthOf(2));
        test('new head node has correct data', expect(linkedList.getData(0)).to.eql('test'));
        const newHeadNode = linkedList.getHead();
        test('new head\'s next points to correct node', expect(newHeadNode.next.data).to.eql('test1'));
    });
    it ('should be able to insert node between only two nodes in list', () => {
        let linkedList = new LinkedList();
        linkedList.add('test');
        linkedList.add('test2');
        linkedList.insertAt(1, 'test1');
        test('correct length after insert', expect(linkedList).to.have.lengthOf(3));
        test('inserted node at correct index', expect(linkedList.getData(1)).to.eql('test1'));
        let headNode = linkedList.getHead();
        test('head\'s next points to inserted node', expect(headNode.next.data).to.eql('test1'));
        test('inserted node\'s next points to last node', expect(linkedList.getData(2)).to.eql('test2'));
    });
});
describe ('LinkedList.remove(index)', () => {
    it ('should be able to remove middle of a three node list', () => {
        let linkedList = new LinkedList();
        linkedList.add('test');
        linkedList.add('test1');
        linkedList.add('test2');
        linkedList.remove(1);
        test('correct length after remove', expect(linkedList).to.have.lengthOf(2));
        const headNode = linkedList.get(0);
        test('correct head node', expect(headNode.data).to.eql('test'));
        test('head\'s next points to last node', expect(headNode.next.data).to.eql('test2'));
    });
});
describe ('LinkedList.equals(linkedList)', () => {
    it ('should return false when not equal', () => {
        let linkedList1 = new LinkedList();
        linkedList1.add('test');
        let linkedList2 = new LinkedList();
        test('different lengths', expect(linkedList1.equals(linkedList2)).to.be.false);
        linkedList2.add('test2');
        test('same length different nodes', expect(linkedList1.equals(linkedList2)).to.be.false);
    });
    it ('should return true when equal', () => {
        let linkedList1 = new LinkedList();
        let linkedList2 = new LinkedList();
        test('two empty lists', expect(linkedList1.equals(linkedList2)).to.be.true);
        linkedList1.add('test');
        linkedList2.add('test');
        test('two lists with same single node', expect(linkedList1.equals(linkedList2)).to.be.true);
    });
});

describe ('LinkedListNode.equals(node)', () => {
    it ('should return false when not equal', () => {
        let node1 = new LinkedListNode('testing');
        test('node and null', expect(node1.equals(null)).to.be.false);
        let nodeDifferentData = new LinkedListNode('test');
        test('different data', expect(node1.equals(nodeDifferentData)).to.be.false);
        let node2 = new LinkedListNode('testing');
        node2.next = nodeDifferentData;
        test('null next and real next', expect(node1.equals(node2)).to.be.false);
        test('real next and null next', expect(node2.equals(node1)).to.be.false);
        let node3 = new LinkedListNode('test2');
        node1.next = node3;
        test('different real next nodes', expect(node1).to.not.equal(node2));
    });
    it ('should return true when equal', () => {
        let node1 = new LinkedListNode('test');
        let node2 = new LinkedListNode('test');
        test('same data null nexts', expect(node1).to.equal(node2));
        let node3 = new LinkedListNode('testing');
        node1.next = node3;
        node2.next = node3;
        test('same data same next', expect(node1.equals(node2)).to.be.true);
    })
});
