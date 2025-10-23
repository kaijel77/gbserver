
///////////////////////////////////////////////////////////////
//
// 기본 베이스 클래스
//
class baseClass {
    constructor() {
        if (this.instance) {
            return this.instance;
        }

        this.initialize();

        this.instance = this;
        return this.instance;
    }

    includeClass(classes = []) {
        for (let name of classes) {
            if (!this?.[`${name}Class`]) {
                this[`${name}Class`] = require(`./${name}`);
            }
        }
    }

    includeHandler(classes = []) {
        for (let name of classes) {
            if (!this?.[`${name}Class`]) {
                this[`${name}Class`] = require(`../Handler/${name}`);
            }
        }
    }


    initialize()
    {

    }
}

module.exports = baseClass;
