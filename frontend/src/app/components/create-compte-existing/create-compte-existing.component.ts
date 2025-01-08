import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComptesService } from 'src/app/services/comptes.service';

@Component({
  selector: 'app-create-compte-existing',
  templateUrl: './create-compte-existing.component.html',
  styleUrls: ['./create-compte-existing.component.css']
})
export class CreateCompteExistingComponent implements OnInit {
  compte = {
    cin: '',
    nom: '',
    prenom: '',
    solde: null
  };
  suggestions: any[] = [];
  errorMessage: string | null = null;

  constructor(private comptesService: ComptesService, private router: Router) {}

  ngOnInit(): void {}

  onCinInput(): void {
    if (this.compte.cin.length >= 2) {
      this.comptesService.getAutocompleteSuggestions(this.compte.cin).subscribe(
        (data) => {
          this.suggestions = data.map((client) => ({
            label: `${client.cin} - ${client.nom} ${client.prenom}`,
            value: client.cin,
            nom: client.nom,
            prenom: client.prenom
          }));
        },
        (error) => {
          console.error('Erreur lors de la récupération des suggestions', error);
        }
      );
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: any): void {
    this.compte.cin = suggestion.value;
    this.compte.nom = suggestion.nom;
    this.compte.prenom = suggestion.prenom;
    this.suggestions = [];
  }

  onSubmit(): void {
  const compteWithClient = {
    client: {
      cin: this.compte.cin,
      nom: this.compte.nom,
      prenom: this.compte.prenom
    },
    solde: this.compte.solde
  };

  this.comptesService.createCompteForExistingClient(compteWithClient).subscribe(
    () => {
      this.router.navigate(['/comptes']);
    },
    (error) => {
      this.errorMessage = 'Erreur lors de la création du compte';
      console.error(error);
    }
  );
}

}
