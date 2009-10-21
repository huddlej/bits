function (doc, req) {
    // !json templates.item.detail
    // !code vendor/couchapp/path.js
    // !code vendor/couchapp/template.js

    provides("html", function () {
        return {
            body: template(templates.item.detail, {
                condition: doc.condition,
                name: doc.name,
                checked_out_to: doc.checked_out_to || "",
                checked_out_from: doc.checked_out_from || "",
                tags: doc.tags,
                index_url : listPath("inventory", "items-by-name",
                                     {include_docs: true}),
                edit_item_url: showPath("edit-item", doc._id),
                assets: assetPath()
            })
        };
    });
}