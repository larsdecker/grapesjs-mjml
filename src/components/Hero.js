export default (editor, {
    dc, opt, defaultModel, defaultView, coreMjmlModel, coreMjmlView
}) => {
    const type = 'mj-hero';

    const droppable = [
        'mj-text',
        'mj-button',
        'mj-image',
    ].map(tag => `[data-gjs-type=${tag}]`).join(', ');

    dc.addType(type, {
        model: defaultModel.extend({
            ...coreMjmlModel,

            defaults: {
                ...defaultModel.prototype.defaults,
                'custom-name': 'Hero',
                draggable: '[data-gjs-type=mj-column]',
                droppable,
            },
        }, {

            isComponent(el) {
                if (el.tagName === type.toUpperCase()) {
                    return {type};
                }
            },
        }),


        view: defaultView.extend({
            ...coreMjmlView,
            tagName: 'tr',
            attributes: {
                style: 'pointer-events: all; display: table; width: 100%',
            },

            renderStyle() {
                this.el.style = this.el.getAttribute('style') + this.attributes.style;
            },

            getMjmlTemplate() {
                return {
                    start: `<mjml><mj-body><mj-column>`,
                    end: `</mj-column></mj-body></mjml>`,
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