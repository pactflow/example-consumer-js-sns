const assert = require('assert').strict

class Product {
    constructor(id, type, name) {
        assert(id, "id is a mandatory field")
        assert(type, "type is a mandatory field")
        assert(name, "name is a mandatory field")

        this.id = id;
        this.type = type;
        this.name = name;
    }
}

module.exports = Product;