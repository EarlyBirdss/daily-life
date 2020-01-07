/**
 * 测试接入jest
 * @param tree
 * @param leaf
 */
export default function hasLeaf(tree: object | Array<any>, leaf: string | boolean | number) {
  return Array.isArray(tree) ? tree.includes(leaf) : tree.hasOwnProperty(leaf);
};
