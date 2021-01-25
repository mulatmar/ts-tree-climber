import addChild from '../helpers/add-child.helper';
import hasComparatorFunction from '../helpers/has-comparator-function.helpers';
import walkStrategies from '../helpers/walk-strategies.helper';
const strategies: {[index: string]:any} = walkStrategies;
export default class Node {
    public config: any;
    public model: any;
    public parent: Node | null;
    public children: Node[];
    constructor(config: any, model: any) {
        this.config = config;
        this.model = model;
        this.children = [];
        this.parent = null;
    }

    public isRoot(): boolean {
        return typeof this.parent === 'undefined' || this.parent === null;
    };

    public hasChildren(): boolean {
        return Array.isArray(this.children) && this.children.length > 0;
    };

    public addChild(child: Node) {
        return addChild(this, child);
    };

    public addChildAtIndex(child: Node, index: number) {
        if (hasComparatorFunction(this)) {
            throw new Error('Cannot add child at index when using a comparator function.');
        }

        return addChild(this, child, index);
    };

    public setIndex(index: number) {
        if (hasComparatorFunction(this)) {
            throw new Error('Cannot set node index when using a comparator function.');
        }

        if (this.isRoot()) {
            if (index === 0) {
                return this;
            }
            throw new Error('Invalid index.');
        }
        if (this.parent) {
            if (index < 0 || index >= this.parent.children.length) {
                throw new Error('Invalid index.');
            }
    
            const oldIndex = this.parent.children.indexOf(this);
            const item = this.parent.children.splice(oldIndex, 1)[0];
            if (typeof item !== 'undefined') {
                this.parent.children.splice(index, 0, item);
                this.parent.model[this.parent.config.childrenName].splice(
                    index,
                    0,
                    this.parent.model[this.parent.config.childrenName].splice(oldIndex, 1)[0]
                );
            }
        }
        return this;
    };

    public getPath() {
        var path = [];
        (function addToPath(node: Node) {
            path.unshift(node);
            if (!node.isRoot() && node.parent) {
                addToPath(node.parent);
            }
        })(this);
        return path;
    };

    public getIndex() {
        if (this.isRoot() || this.parent === null) {
            return 0;
        }
        return this.parent.children.indexOf(this);
    };

    public walk(callback: (node: Node) => boolean, type: string = 'pre') {
        const strategy = strategies[type];
        if (strategy) {
            strategy(callback, this);
        }
    };

    public all(callback: (node: Node) => boolean, type: string = 'pre'): Node[] {
        const all: Node[] = [];
        const strategy = strategies[type];
        if (strategy) {
            strategy(
                (node: Node) => {
                    const check = callback(node);
                    if (check) {
                        all.push(node);
                    }
                    return true;
                },
                this
            );
            return all;
        } else {
            return [];
        }
    };

    public first(callback: (node: Node) => boolean, type: string = 'pre'): Node | null {
        let first: null | Node = null;
        const strategy = strategies[type];
        if (strategy) {
            strategy(
                (node: Node) => {
                    const check = callback(node) && !first;
                    if (check) {
                        first = node;
                        return false;
                    }
                    return true;
                },
                this
            );
        }
        return first;
    };

    public drop() {
        var indexOfChild;
        if (!this.isRoot() && this.parent) {
            indexOfChild = this.parent.children.indexOf(this);
            this.parent.children.splice(indexOfChild, 1);
            this.parent.model[this.config.childrenName].splice(indexOfChild, 1);
            this.parent = null;
        }
        return this;
    };
}