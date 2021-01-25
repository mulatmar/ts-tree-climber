import Node from '../nodes/Node';
export default function addChildToNode(node: Node, child: Node) {
    child.parent = node;
    node.children.push(child);
    return child;
}