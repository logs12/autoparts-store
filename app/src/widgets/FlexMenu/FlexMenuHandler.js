export default class FlexMenuHandler {
    constructor () {
        // Delegated event
        document.addEventListener('click', this.collapseClickHandler, false);
    }

    // Definition of caller element
    getTriggerElement = function(el) {
        var isCollapse = el.getAttribute('data-collapse');
        if (isCollapse !== null) {
            return el;
        } else {
            var isParentCollapse = el.parentNode.getAttribute('data-collapse');
            return (isParentCollapse !== null) ? el.parentNode : undefined;
        }
    };

    // A handler for click on toggle button
    collapseClickHandler = (event) => {
        var triggerEl = this.getTriggerElement(event.target);
        // If the target element exists
        if (triggerEl !== undefined) {
            var targetEl = document.querySelector(triggerEl.getAttribute('data-target'));
            if (targetEl) {
                triggerEl.classList.toggle('-active');
                targetEl.classList.toggle('-on');
            }
        }
    };

}