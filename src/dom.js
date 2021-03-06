window.dom = {
    create(string) {
        //template
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    after(node, newNode) {
        //在node后插入一个节点
        node.parentNode.insertBefore(newNode, node.nextSibling);
    },
    before(node, newNode) {
        //在node前插入一个节点
        node.parentNode.insertBefore(newNode, node);
    },
    append(parent, node) {
        //添加
        parent.appendChild(node);
    },
    wrap(node, parent) {
        //用parent包住node
        dom.before(node, parent);
        dom.append(parent, node);
    },
    remove(node) {
        node.parentNode.removeChild(node);
        return node;
    },
    empty(node) {
        // const {childNodes} = node; 因为childNodes的长度会随着remove而改变（每remove一个node，length就-1）。
        //保留之前的节点数组返回给使用者
        const arr = [];
        let child = node.firstChild;
        while (child) {
            arr.push(dom.remove(node.firstChild));
            child = node.firstChild;
        }
        return arr;
    },
    attr(node, name, value) {
        //重载
        if (arguments.length === 3) {
            //写
            node.setAttribute(name, value);
        } else if (arguments.length === 2) {
            //读
            return node.getAttribute(name);
        }
    },
    text(node, string) {
        if (arguments.length === 2) {
            if ("innerText" in node) {
                node.innerText = string;//ie
            } else {
                node.textContent = string; // firefox / chrome
            }
        } else if (arguments.length === 1) {
            if ("innerText" in node) {
                return node.innerText;//ie
            } else {
                return node.textContent; // firefox / chrome
            }
        }

    },
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string;
        } else if (arguments.length === 1) {
            return node.innerHTML;
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            //dom.style(div,"color","red");
            node.style[name] = value;
        } else if (arguments.length === 2) {
            if (typeof name === "string") {
                //dom.style(div,"border") 读取
                return node.style[name];
            } else if (name instanceof Object) {
                //dom.style(div,{"border":"1px solid red"}; 写入
                for (let key in name) {
                    node.style[key] = name[key];
                }
            }
        }
    },
    //dom.class.add
    class: {
        add(node, className) {
            node.classList.add(className);
        },
        remove(node, className) {
            node.classList.remove(className);
        },
        has(node, className) {
            return node.classList.contains(className);
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn);
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn);
    },
    find(selector, scope) {
        //默认是document，如果给了scope
        return (scope || document).querySelector(selector);
    },
    findAll(selector, scope) {
        return (scope || document).querySelectorAll(selector);
    },
    parent(node) {
        return node.parentNode;
    },
    children(node) {
        return node.children;
    },
    siblings(node) {
        // node.parentNode,children是伪数组
        return Array.from(node.parentNode.children).filter(n => n !== node);
    },
    next(node) {
        let nextNode = node.nextSibling;
        while (nextNode.nodeType === 3) {
            //nodeType === 3 指的是文本
            nextNode = nextNode.nextSibling;
        }
        return nextNode;
    },
    previous(node) {
        let prevNode = node.previousSibling;
        while (prevNode.nodeType === 3) {
            //nodeType === 3 指的是文本
            prevNode = prevNode.previousSibling;
        }
        return prevNode;
    },
    each(nodeList, fn) {
        //每个
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i]);
        }
    },
    index(node) {
        const nodeList = dom.children(node.parentNode);
        let i;
        for (i = 0; i < nodeList.length; i++) {
            if (nodeList[i] === node) {
                break;
            }
        }
        return i;
    }


};