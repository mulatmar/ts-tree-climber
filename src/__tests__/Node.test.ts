import { Tree } from '../index';
test('My Tree', () => {
    const tree = new Tree(null);
    const root = tree.parse({ id: 1 });
    expect(root.model.id).toBe(1);
});
