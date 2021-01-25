import Node from '../nodes/Node';
export default function hasComparatorFunction(node: Node): boolean {
    return typeof node.config.modelComparatorFn === 'function';
}