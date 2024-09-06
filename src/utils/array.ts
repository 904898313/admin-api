// 数组方法

// 给原有树结构扩展一个children
type Extend<T> = T & {
  children?: Extend<T>[];
};
// 树结构泛型 约束
type Tree = { id: string | number; parentId: string | null };

export const generateTree = <T extends Tree>(data: T[]): Extend<T>[] => {
  const nodeMap: { [id: string]: T } = {};

  for (const node of data) {
    nodeMap[node.id] = node;
  }

  const tree: Extend<T>[] = [];

  for (const node of data) {
    const treeNode = nodeMap[node.id];

    if (node.parentId === null) {
      tree.push(treeNode);
    } else {
      const parentNode: Extend<T> = nodeMap[node.parentId];
      if (parentNode) {
        parentNode.children!.push(treeNode);
      }
    }
  }

  return tree;
};
