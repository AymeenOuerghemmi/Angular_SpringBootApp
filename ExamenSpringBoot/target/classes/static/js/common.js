function deleteClient(cin) {
    swal({
        title: "Êtes-vous sûr?",
        text: "Une fois supprimé, ce client ne pourra pas être récupéré!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "/api/clients/" + cin, // Notez le préfixe "/api"
                type: "DELETE",
                success: function () {
                    $("#tr" + cin).remove();
                    swal("Le client a été supprimé!", { icon: "success" });
                },
                error: function () {
                    swal("Erreur du serveur!", { icon: "error" });
                }
            });
        }
    });
}