import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComptesService } from 'src/app/services/comptes.service';
import Swal from 'sweetalert2'; // Importation de SweetAlert2

@Component({
  selector: 'app-edit-compte',
  templateUrl: './edit-compte.component.html',
  styleUrls: ['./edit-compte.component.css']
})
export class EditCompteComponent implements OnInit {
  compte: any = {
    rib: '',
    solde: '',
    client: {
      cin: '',
      nom: '',
      prenom: ''
    }
  };

  constructor(
    private comptesService: ComptesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const rib = this.route.snapshot.paramMap.get('rib');
    if (rib) {
      this.loadCompte(rib);
    }
  }

  loadCompte(rib: string): void {
    const ribNumber = parseInt(rib, 10);  // Conversion en entier
    this.comptesService.getAllComptes().subscribe({
      next: (comptes) => {
        const compte = comptes.find((c: any) => c.rib === ribNumber);
        if (compte) {
          this.compte = compte;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Compte non trouvé.',
          }).then(() => {
            this.router.navigate(['/comptes']);
          });
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du compte :', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur lors de la récupération du compte.',
        });
      }
    });
  }

  updateCompte(): void {
    this.comptesService.updateCompte(this.compte).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Compte mis à jour avec succès.',
        }).then(() => {
          this.router.navigate(['/comptes']);
        });
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du compte :', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur lors de la mise à jour du compte.',
        });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/comptes']);
  }
}
