function Inventory() {
    var items = [],
        db_name = "bits",
        db = $.couch.db(db_name),
        selector = "#inventory",
        row_template_name = "row";

    function load() {
        db.view(
            "bits/items-by-name",
            {
                "include_docs": true,
                "success": function (response) {
                    var i, item;
                    for (i in response["rows"]) {
                        item = response["rows"][i].doc;
                        item.prototype = new Item;
                        Item.call(item);
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
            console.log(item);
            $(selector).append(item.render(row_template_name));
        }
    }

    return {
        load: load,
        render: render
    };
}