import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComptesService } from 'src/app/services/comptes.service';
import Swal from 'sweetalert2';  // Importation de SweetAlert2

@Component({
  selector: 'app-create-compte-new',
  templateUrl: './create-compte-new.component.html',
  styleUrls: ['./create-compte-new.component.css']
})
export class CreateCompteNewComponent {
  compte: any = {
    rib: '',
    solde: '',
    client: {
      cin: '',
      nom: '',
      prenom: ''
    }
  };

  constructor(private comptesService: ComptesService, private router: Router) {}

  createCompteNew() {
    const compteToSend = { 
      ...this.compte, 
      rib: undefined  // On supprime la propriété 'rib' car elle est générée automatiquement
    };

    this.comptesService.createCompteForNewClient(compteToSend).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Compte créé avec succès !',
        }).then(() => {
          this.router.navigate(['/comptes']);
        });
      },
      error: (err) => {
        console.error('Erreur lors de la création du compte :', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la création du compte.',
        });
      }
    });
  }

  cancel() {
    this.router.navigate(['/comptes']);
  }
}
