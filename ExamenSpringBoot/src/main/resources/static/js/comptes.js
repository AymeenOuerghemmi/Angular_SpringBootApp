function deleteCompte(rib) {
    swal({
        title: "Vous êtes sûr?",
        text: "Voulez-vous supprimer ce compte ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "/comptes/delete-ajax",
                type: "POST",
                data: { rib: rib },
                success: function() {
                    $('#'+rib).remove();
                    swal("Compte supprimé!", {
                        icon: "success",
                    })
                    .then(() => {
                        window.location.href = "/comptes";
                    });
                }
            });
        } else {
            swal("La suppression est annulée!");
        }
    });
}
