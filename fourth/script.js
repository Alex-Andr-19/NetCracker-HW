// tree is an Obj, that contains nodes and self-deep
// node is an Obj, that contains self-key, self-value and children-list.
// This list is contains child-nodes (only 2)

function copyObj(obj) {
    return Object.assign({}, obj)
}


function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}


function addNode(tree, node) {
    let copyTree = copyObj(tree)

    if (isEmpty(copyTree)) copyTree = copyObj(node)

    if (node.key < copyTree.key) copyTree.left = addNode(copyTree.left, node)
    else if (node.key > copyTree.key) copyTree.right = addNode(copyTree.right, node)

    return copyTree
}


function findNode(root, value) {
    let path = '{' + root.key + '}'

    if (value === root.key) return path
    path += ' --'
    let copyRoot = copyObj(root)

    if (value < copyRoot.key) path += ('L--> ' + findNode(copyRoot.left, value))
    else if (value > copyRoot.key) path += ('R--> ' + findNode(copyRoot.right, value))

    return path
}


function addNodePage() {
    console.log('Empty function')
}


let secondNode = {key: 2, left: {}, right: {}}

let tree = {
    key: 3,
    left: secondNode,
    right: {}
}

tree = addNode(tree, { key: 4, left: {}, right: {} })
tree = addNode(tree, { key: 0, left: {}, right: {} })
tree = addNode(tree, { key: 1, left: {}, right: {} })
tree = addNode(tree, { key: 6, left: {}, right: {} })
tree = addNode(tree, { key: 5, left: {}, right: {} })
tree = addNode(tree, { key: 7, left: {}, right: {} })

console.log(tree)

for (let i = 0; i < 8; i++) console.log(findNode(tree, i))
