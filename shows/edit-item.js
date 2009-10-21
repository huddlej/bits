function (doc, req) {
    // !json templates.edit
    // !code vendor/couchapp/path.js
    // !code vendor/couchapp/template.js

    provides("html", function () {
        return {
            body: template(templates.edit, {
                docid: toJSON((doc && doc._id) || null),
                doc: doc,
                name: doc.name,
                index_url: listPath("inventory", "items-by-name",
                                     {include_docs: true}),
                item_url: showPath("item", doc._id),
                assets: assetPath()
            })
        };
    });
}