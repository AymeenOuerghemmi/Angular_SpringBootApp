import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2'; // Import de SweetAlert2

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];

  constructor(private clientsService: ClientsService, private router: Router) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientsService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des clients :', err);
      }
    });
  }

  deleteClient(cin: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas récupérer ce client une fois supprimé.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientsService.deleteClient(cin).subscribe({
          next: () => {
            Swal.fire('Supprimé!', 'Le client a été supprimé.', 'success');
            this.loadClients(); // Recharge la liste après suppression
          },
          error: (err) => {
            console.error('Erreur lors de la suppression du client :', err);
            Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression du client.', 'error');
          }
        });
      }
    });
  }
}
