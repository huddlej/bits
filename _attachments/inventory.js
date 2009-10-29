function Inventory() {
    var items = [],
        db_name = "bits",
        db = $.couch.db(db_name),
        selector = "#inventory";

    function load() {
        db.view(
            "bits/items-by-name",
            {
                "include_docs": true,
                "success": function (response) {
                    var i, item;
                    for (i in response["rows"]) {
                        item = response["rows"][i].doc;
                        console.log(item);
                        items.push(item);
                    }
                    render(items);
                }
            }
        )
    }

    function render(selected_items) {
        // Render the row template for each item.
        var i, item;
        for (i in selected_items) {
            item = selected_items[i];
            item.id = item._id;
            item.tags = item.tags || "&nbsp;";

            if (item.checked_out_to == null) {
                item.status = "in";
                item.action_class = "checkout";
                item.action_type = "check out";
            }
            else {
                item.status = "out to " + item.checked_out_to;
                item.action_class = "checkin";
                item.action_type = "check in";
            }

            $(selector).append($.tempest("row", item));
        }
    }

    return {
        load: load,
        render: render
    };
}