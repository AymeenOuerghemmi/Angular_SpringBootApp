import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComptesService } from 'src/app/services/comptes.service';
import Swal from 'sweetalert2'; // Import de SweetAlert2

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit {
  comptes: any[] = [];

  constructor(private compteService: ComptesService, private router: Router) {}

  ngOnInit(): void {
    this.loadComptes();
  }

  loadComptes(): void {
    this.compteService.getAllComptes().subscribe(
        (data) => {
            if (Array.isArray(data)) {
                this.comptes = data;
            } else {
                console.error('La réponse n\'est pas au format JSON attendu', data);
                this.comptes = []; // Assure-toi que l'interface est vide
            }
        },
        (error) => {
            console.error('Erreur lors du chargement des comptes', error);
            this.comptes = []; // Assure-toi que l'interface est vide en cas d'erreur
        }
    );
  }

  deleteCompte(rib: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas récupérer ce compte une fois supprimé.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.compteService.deleteCompte(rib).subscribe(
          () => {
            // Filtrer les comptes supprimés de l'affichage
            this.comptes = this.comptes.filter((c) => c.rib !== rib);
            Swal.fire('Supprimé!', 'Le compte a été supprimé.', 'success');
          },
          (error) => {
            console.error('Erreur lors de la suppression du compte', error);
            Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression du compte.', 'error');
          }
        );
      }
    });
  }
  onDeleteCompte(rib: number): void {
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Voulez-vous vraiment supprimer ce compte ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // Envoi du rib en tant que paramètre d'URL
      this.compteService.deleteCompteAjax(rib).subscribe(
        () => {
          Swal.fire(
            'Supprimé !',
            'Le compte a été supprimé avec succès.',
            'success'
          );
          this.loadComptes(); // Réactualiser la liste des comptes après suppression
        },
        (error) => {
          Swal.fire(
            'Erreur !',
            'Une erreur s\'est produite lors de la suppression du compte.',
            'error'
          );
          console.error(error);
        }
      );
    }
  });
}

  
}
