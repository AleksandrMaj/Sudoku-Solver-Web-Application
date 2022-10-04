import "mocha";

class LinkedNode<T> {
    private _elem: T;
    public next: LinkedNode<T> | null;

    constructor(elem: T) {
        this._elem = elem;
        this.next = null;
    }

    get elem(): T {
        return this._elem;
    }
}

export class LinkedList<T> {
    private head: LinkedNode<T> = new LinkedNode<T>(null);
    private len = 0;

    append(elem: T) {
        let node = new LinkedNode(elem);
        let current: LinkedNode<T> = this.head;

        if (this.head.next === null) {
            this.head.next = node;
            this.len++;
            return;
        }

        while (current.next) {
            current = current.next;
        }
        current.next = node;
        this.len++;
    }

    get(pos: number): T | null {
        if (pos < 0 || pos > this.len || this.head.next === null) return null;
        if (pos === 0) return this.head.next.elem;

        let current = this.head.next;
        let index = 0;

        while (index++ != pos) {
            current = current.next;
        }
        return current.elem;
    }

    getFirst(): T | null {
        return this.head.next.elem;
    }

    remove(obj: T): T | null {
        let currentNode = this.head;

        while(currentNode.next.elem != obj) {
            currentNode = currentNode.next;
            if(currentNode.next === null) return null;
        }
        let temp = currentNode.next.elem;
        currentNode.next = currentNode.next.next;
        this.len--;
        return temp;
    }

    contains(obj: T): boolean {
        let currentNode = this.head;

        while((currentNode = currentNode.next) != null) {
            if(currentNode.elem === obj) return true;
        }
        return false;
    }

    size(): number {
        return this.len;
    }

    removeAll(mesh: LinkedList<T>) {
        for(let i = 0; i < mesh.size();i++) {
            let obj: T = mesh.get(i)
            while(this.contains(obj)) {
                this.remove(obj)
            }
        }
    }

    toString() {
        let current = this.head.next;
        let str = '';
        while (current) {
            str += current.elem;
            current = current.next;
        }
        return str;
    }

    getSum() {
        let current = this.head.next;
        let sum: number = 0;
        while (current) {
            // @ts-ignore
            sum += current.elem;
            current = current.next;
        }
        return sum;
    }
}
