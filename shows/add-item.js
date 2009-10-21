function (doc, req) {
    // !json templates.add
    // !code vendor/couchapp/path.js
    // !code vendor/couchapp/template.js

    provides("html", function () {
        return {
            body: template(templates.add, {
                index_url : listPath("inventory", "items-by-name",
                                     {include_docs: true}),
                assets : assetPath()
            })
        };
    });
}