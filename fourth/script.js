function Node(key=null, left={}, right={}) {
    this.key = key
    this.left = left
    this.right = right
}


function Tree(node=new Node()) {
    this.root = new Node(node.key, node.left, node.right)


    // private function for deepCopy of Object
    this._copyObj = function (obj) {
        return Object.assign({}, obj)
    }

    // Check for empty Object
    this.isEmpty = function (obj) {
        return Object.keys(obj).length === 0;
    }

    // Function of addNode
    // This function get root from which it have to add Node
    // and return Object, that is copy of root, but with added Node
    // -- recursive
    this.addNode = function (root, node) {
        let copyRoot = this._copyObj(root)

        if (this.isEmpty(copyRoot)) copyRoot = this._copyObj(node)

        if (node.key < copyRoot.key) copyRoot.left = this.addNode(copyRoot.left, node)
        else if (node.key > copyRoot.key) copyRoot.right = this.addNode(copyRoot.right, node)

        return copyRoot
    }

    // Print path to Node in Tree
    // -- recursive
    this.findNode = function (root, value) {
        let path = '{' + root.key + '}'

        if (value === root.key) return path
        path += ' --'
        let copyRoot = this._copyObj(root)

        if (value < copyRoot.key) path += ('L--> ' + this.findNode(copyRoot.left, value))
        else if (value > copyRoot.key) path += ('R--> ' + this.findNode(copyRoot.right, value))

        return path
    }


}

let secondNode = new Node(key = 2)
let firstNode = new Node(3, secondNode)

let tree = new Tree(firstNode)

let newNodes = [4, 0, 1, 6, 9, 5, 7]

for (let index in newNodes)
    tree.root = tree.addNode(tree.root, new Node(newNodes[index]))

console.log(tree)

newNodes.push(2, 3)

for (let index in newNodes)
    console.log(tree.findNode(tree.root, newNodes[index]))
