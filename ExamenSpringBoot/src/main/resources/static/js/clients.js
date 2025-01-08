function deleteClient(cin) {
    swal({
        title: "Voulez-vous supprimer ce client ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "/clients/delete/" + cin,
                type: "DELETE",
                success: function () {
                    $("#client" + cin).remove();
                    swal("Client supprimé!", { icon: "success" })
                        .then(() => {
                            window.location.href = "/clients";
                        });
                },
                error: function () {
                    swal("Erreur serveur!", { icon: "error" });
                },
            });
        }
    });
}
