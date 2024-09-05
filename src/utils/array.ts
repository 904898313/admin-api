// 数组方法

export const generateTree = (data) => {
  // 创建一个以 id 为键的映射
  const map = new Map();

  // 初始化树节点
  data.forEach(item => {
    map.set(item.id, { ...item, children: [] });
  });

  // 构建树结构
  const tree = [];
  data.forEach(item => {
    if (item.parentId === null) {
      tree.push(map.get(item.id));
    } else {
      const parent = map.get(item.parentId);
      if (parent) {
        parent.children.push(map.get(item.id));
      }
    }
  });

  return tree;
};
