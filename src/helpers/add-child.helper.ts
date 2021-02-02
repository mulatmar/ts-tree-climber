import Node from '../nodes/Node';
import hasComparatorFunction from './has-comparator-function.helpers';
import findInsertIndex from './find-insert-index.helper';
export default function addChild(self: Node, child: Node, insertIndex?: number) {
    let index;

    child.parent = self;
    if (!Array.isArray(self.model[self.config.childrenName])) {
        self.model[self.config.childrenName] = [];
    }

    if (hasComparatorFunction(self)) {
        index = findInsertIndex(self.config.modelComparatorFn, self.model[self.config.childrenName], child.model);

        self.model[self.config.childrenName].splice(index, 0, child.model);

        self.children.splice(index, 0, child);
    } else {
        if (typeof insertIndex === 'undefined') {
            self.model[self.config.childrenName].push(child.model);
            self.children.push(child);
        } else {
            if (insertIndex < 0 || insertIndex > self.children.length) {
                throw new Error('Invalid index.');
            }
            self.model[self.config.childrenName].splice(insertIndex, 0, child.model);
            self.children.splice(insertIndex, 0, child);
        }
    }
    return child;
}
