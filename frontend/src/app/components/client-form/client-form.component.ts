import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2'; // Import de SweetAlert2

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe((params) => {
      const cin = params.get('cin');
      if (cin) {
        this.isEditMode = true;
        this.loadClient(Number(cin)); // Convert cin to a number
      }
    });
  }

  initForm(): void {
    this.clientForm = this.fb.group({
      cin: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]]
    });
  }

  loadClient(cin: number): void {
    this.clientsService.getClientByCin(cin).subscribe({
      next: (client) => {
        this.clientForm.patchValue(client);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du client :', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Client introuvable.'
        });
        this.router.navigate(['/clients']);
      }
    });
  }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      return;
    }

    const clientData = this.clientForm.value;

    if (this.isEditMode) {
      this.clientsService.updateClient(clientData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Client modifié avec succès.'
          });
          this.router.navigate(['/clients']);
        },
        error: (err) => {
          console.error('Erreur lors de la modification du client :', err);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue.'
          });
        }
      });
    } else {
      this.clientsService.createClient(clientData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Client ajouté avec succès.'
          });
          this.router.navigate(['/clients']);
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du client :', err);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue.'
          });
        }
      });
    }
  }
}
