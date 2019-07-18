export default (editor, {
    dc, opt, defaultModel, defaultView, coreMjmlModel, coreMjmlView
}) => {
    const type = 'mj-navbar';

    const droppable = [
        'mj-navbar-link',
    ].map(tag => `[data-gjs-type=${tag}]`).join(', ');

    dc.addType(type, {
        model: defaultModel.extend({
            ...coreMjmlModel,

            defaults: {
                ...defaultModel.prototype.defaults,
                'custom-name': 'NavBar-Link',
                draggable: '[data-gjs-type=mj-body]',
                droppable,
                'style-default': {
                    // TODO
                },
                stylable: [
                    // TODO
                ],
            },
        }, {

            isComponent(el) {
                if (el.tagName === type.toUpperCase()) {
                    return { type };
                }
            },
        }),


        view: defaultView.extend({
            ...coreMjmlView,
            tagName: 'tr',
            attributes: {
                style: 'pointer-events: all; display: table; width: 100%',
                'mode': 'fixed-height',
            },

            renderStyle() {
                this.el.style = this.el.getAttribute('style') + this.attributes.style;
            },

            getMjmlTemplate() {
                return {
                    start: `<mjml><mj-body>`,
                    end: `</mj-body></mjml>`,
                };
            },
            getTemplateFromEl(sandboxEl) {
                return sandboxEl.querySelector('tr').innerHTML;
            },
            getChildrenSelector() {
                return 'td';
            },
        }),
    });
}
