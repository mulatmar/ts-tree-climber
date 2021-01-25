import Node from '../nodes/Node';
function depthFirstPreOrder(callback: (node: Node) => boolean, node: Node): boolean {
    let i;
    const childCount = Array.isArray(node.children) ? node.children.length : 0;
    let going = callback(node);
    if (going === false) {
        return false;
    }
    if (childCount) {
        for (i = 0; i < childCount; i++) {
            const item = node.children[i];
            if (typeof item !== 'undefined') {
                going = depthFirstPreOrder(callback, item);
            }
        }
    }

    return going;
}

function depthFirstPostOrder(callback: (node: Node) => boolean, node: Node) {
    let i;
    const childCount = Array.isArray(node.children) ? node.children.length : 0;
    let going;
    for (i = 0; i < childCount; i++) {
        const item = node.children[i];
        if (typeof item !== 'undefined') {
            going = depthFirstPostOrder(callback, item);
        }
        if (!going) {
            return false;
        }
    }
    going = callback(node);
    return going;
}

function breadthFirst(callback: (node: Node) => boolean, node: Node) {
    const queue = [node];
    (function processQueue() {
        let i;
        let firstNode;
        if (queue.length === 0) {
            return;
        }
        firstNode = queue.shift();
        if (firstNode) {
            const childCount = firstNode && Array.isArray(firstNode.children) ? firstNode.children.length : 0;
            for (i = 0; i < childCount; i++) {
                const item = firstNode.children[i];
                if (item) {
                    queue.push(item);
                }
            }
            if (callback(firstNode) !== false) {
                processQueue();
            }
        }
    })();
}

export default {
    pre: depthFirstPreOrder,
    post: depthFirstPostOrder,
    breadth: breadthFirst,
};
