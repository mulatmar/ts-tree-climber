import IConfigTree from './interfaces/config-tree.interface';
import Node from './nodes/Node';
import mergeSort from './helpers/merge-sort.helper';
import addChildToNode from './helpers/add-child-to-node.helper';
export default class Tree {
    private config: IConfigTree;
    constructor(config: IConfigTree | null) {
        this.config =
            config !== null
                ? config
                : {
                      childrenName: 'children',
                      modelComparatorFn: null,
                  };
    }

    public parse(model: any) {
        let i;
        let childCount;
        let node;

        node = new Node(this.config, model);
        if (Array.isArray(model[this.config.childrenName])) {
            if (this.config.modelComparatorFn) {
                model[this.config.childrenName] = mergeSort(
                    this.config.modelComparatorFn,
                    model[this.config.childrenName],
                );
            }
            for (i = 0, childCount = model[this.config.childrenName].length; i < childCount; i++) {
                addChildToNode(node, this.parse(model[this.config.childrenName][i]));
            }
        }
        return node;
    }
}
