function Item() {
    this.render = function (template_name) {
        var context = {
            id: this._id,
            name: this.name,
            condition: this.condition,
            tags: this.tags || "&nbsp;"
        };

        if (this.checked_out_to == null) {
            context.status = "in";
            context.action_class = "checkout";
            context.action_type = "check out";
        }
        else {
            context.status = "out to " + this.checked_out_to;
            context.action_class = "checkin";
            context.action_type = "check in";
        }

        return $.tempest(template_name, context);
    };
}