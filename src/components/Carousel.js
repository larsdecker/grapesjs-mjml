export default (editor, {
    dc, opt, defaultModel, defaultView, coreMjmlModel, coreMjmlView
}) => {
    const type = 'mj-carousel';

    dc.addType(type, {
        model: defaultModel.extend({
            ...coreMjmlModel,

            defaults: {
                ...defaultModel.prototype.defaults,
                'custom-name': 'Carousel',
                draggable: '[data-gjs-type=mj-body]',
                droppable: '[data-gjs-type=mj-carousel-image]',
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
