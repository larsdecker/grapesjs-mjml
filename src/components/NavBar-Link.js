export default (editor, {
    dc, opt, defaultModel, defaultView, coreMjmlModel, coreMjmlView
}) => {
    const type = 'mj-navbar-link';

    dc.addType(type, {
        model: defaultModel.extend({
            ...coreMjmlModel,

            defaults: {
                ...defaultModel.prototype.defaults,
                'custom-name': 'NavBar',
                draggable: '[data-gjs-type=mj-body]',
                droppable: false,
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

            tagName: 'table',

            attributes: {
                style: 'pointer-events: all; float: none; display: inline-table;',
            },

            getMjmlTemplate() {
                return {
                    start: `<mjml><mj-body><mj-column><mj-social>`,
                    end: `</mj-social></mj-column></mj-body></mjml`,
                };
            },

            getTemplateFromEl(sandboxEl) {
                return sandboxEl.querySelector('tr > td > table').innerHTML;
            },

            getChildrenSelector() {
                return 'p';
            }
        }),
    });
}
