// Specs: https://mjml.io/documentation/#mjml-social

export default (editor, {
    dc, opt, defaultModel, defaultView, coreMjmlModel, coreMjmlView
}) => {
    const type = 'mj-preview';

    dc.addType(type, {
        model: defaultModel.extend({
            ...coreMjmlModel,

            defaults: {
                ...defaultModel.prototype.defaults,
                'custom-name': 'Preview Line',
                draggable: '[data-gjs-type=mj-head]',
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

            tagName: 'table',

            attributes: {
                style: 'pointer-events: all; float: none; display: inline-table;',
            },

            getMjmlTemplate() {
                return {
                    start: `<mjml><mj-head>`,
                    end: `</mj-head></mjml`,
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
