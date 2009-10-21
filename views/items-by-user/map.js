function (doc) {
    if (doc.checked_out_to) {
        emit(doc.checked_out_to, null);
    }
}