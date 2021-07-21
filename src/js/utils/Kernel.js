class Kernel {

    constructor() {
        this.factories = [];
    }

    registerComponent(uname, factory) {

        let wrapper = factory;

        if (isNativeClass(factory)) {
            wrapper = function ($html) {
                return new factory($html);
            };
        }

        this.factories[uname] = wrapper;
        return this;
    }

    getComponent(component_id) {
        const $node = document.getElementById(component_id)
        if ($node)
            return $node.dataset.component;
        return null;
    }

    createComponent($html) {
        const uname = $html.dataset.mount;
        if (!uname)
            return null;

        const factory = this.factories[uname];
        if (!factory) {
            console.error(uname + ' component not found');
            return null;
        }

        return factory($html);
    }

    mountComponents($view) {
        const self = this;

        $view.querySelectorAll("[data-mount]").forEach(function ($node, idx) {
            if ($node.dataset.component) {
                return null;
            }
            let component = self.createComponent($node);
            $node.dataset.component = component;
        })
    }

}

function isNativeClass(thing) {
    return typeof thing === 'function' && thing.hasOwnProperty('prototype');
}

module.exports = Kernel;
