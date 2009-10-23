function (head, req) {
    // !json templates.inventory
    // !code vendor/couchapp/path.js
    // !code vendor/couchapp/template.js

    provides("html", function () {
        var row, context;
        send(template(templates.inventory.head,
                      {add_item_url: showPath("add-item"),
                       assets: assetPath()}));

        while (row = getRow()) {
            context = {
                docid: row.doc._id,
                name: row.doc.name,
                condition: row.doc.condition,
                tags: row.doc.tags || "&nbsp;",
                item_url: showPath("edit-item", row.doc._id)
            };

            if (row.doc.checked_out_to == null) {
                context["status"] = "in";
                context["action_class"] = "check-out";
                context["action_type"] = "check out";
            }
            else {
                context["status"] = "out to " + row.doc.checked_out_to;
                context["action_class"] = "check-in";
                context["action_type"] = "check in";
            }

            send(template(templates.inventory.row, context));
        }

        send(template(templates.inventory.tail,
                      {assets: assetPath()}));
    });
}