package tn.iit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import tn.iit.entity.Compte;
import tn.iit.service.CompteService;

import java.util.List;

@RestController 
@CrossOrigin(origins = "http://localhost:4200") 
@RequestMapping("/comptes")
@RequiredArgsConstructor
public class CompteController {

    @Autowired
    private CompteService compteService;

    @GetMapping
    public ResponseEntity<List<Compte>> getAllComptes() {
        List<Compte> comptes = compteService.getAllComptes();
        return ResponseEntity.ok(comptes);
    }

    @PostMapping("/create/existing")
    public ResponseEntity<?> createCompteForExistingClient(@RequestBody Compte compte) {
        try {
            Compte Exustingcompte = compteService.createCompteForExistingClient(compte);
            return ResponseEntity.status(HttpStatus.CREATED).body(Exustingcompte);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/create/new")
    public ResponseEntity<?> createCompteForNewClient(@RequestBody Compte compte) {
        try {
            Compte createdCompte = compteService.createCompteForNewClient(compte);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCompte);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    @GetMapping("/edit/{rib}")
    public ResponseEntity<?> getCompteByRib(@PathVariable Integer rib) {
        Compte compte = compteService.getCompteByRib(rib);
        if (compte == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Compte avec RIB " + rib + " n'existe pas.");
        }
        return ResponseEntity.ok(compte);
    }

    @PostMapping("/edit")
    public ResponseEntity<?> updateCompte(@RequestBody Compte compte) {
        try {
            Integer rib = compte.getRib();
            Float solde = compte.getSolde();

            Compte updatedCompte = compteService.updateCompte(rib, solde);
            
            return ResponseEntity.ok(updatedCompte);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    @PostMapping("/delete/{rib}")
    public ResponseEntity<?> deleteCompte(@PathVariable Integer rib) {
        try {
            compteService.deleteCompte(rib);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/delete-ajax")
    public ResponseEntity<?> deleteAjax(@RequestParam Integer rib) {
        try {
            compteService.deleteById(rib);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
