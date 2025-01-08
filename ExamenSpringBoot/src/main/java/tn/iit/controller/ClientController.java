package tn.iit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import tn.iit.entity.Client;
import tn.iit.service.ClientService;

import java.util.List;

@RestController 
@CrossOrigin(origins = "http://localhost:4200") // Pour permettre les requêtes CORS depuis une origine spécifique
@RequestMapping("/clients")
@RequiredArgsConstructor
public class ClientController {
    
    @Autowired
    private ClientService clientService;

    // Récupération de tous les clients
    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        List<Client> clients = clientService.getAllClients();
        return ResponseEntity.ok(clients);
    }

    // Création d'un client
    @PostMapping
    public ResponseEntity<Client> createClient(@RequestBody @Valid Client client) {
        Client createdClient = clientService.saveClient(client);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdClient);
    }

    // Mise à jour d'un client existant (via ID ou CIN)
    @PutMapping("/{cin}")
    public ResponseEntity<Client> updateClient(@PathVariable Integer cin, @RequestBody @Valid Client updatedClient) {
        Client existingClient = clientService.getClientById(cin);
        if (existingClient == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        updatedClient.setCin(cin); // Assurez-vous que l'ID correspond
        Client savedClient = clientService.saveClient(updatedClient);
        return ResponseEntity.ok(savedClient);
    }

    // Suppression d'un client
    @DeleteMapping("delete/{cin}")
    public ResponseEntity<Void> deleteClient(@PathVariable Integer cin) {
        Client client = clientService.getClientById(cin);
        if (client == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        clientService.deleteClient(cin);
        return ResponseEntity.noContent().build();
    }

    // Recherche automatique (autocompletion) par CIN
    @GetMapping("/autocomplete")
    public ResponseEntity<List<Client>> getClientsByCin(@RequestParam String term) {
        List<Client> clients = clientService.getClientsByCin(term);
        return ResponseEntity.ok(clients);
    }

    // Récupération d'un client spécifique
    @GetMapping("edit/{cin}")
    public ResponseEntity<Client> getClientById(@PathVariable Integer cin) {
        Client client = clientService.getClientById(cin);
        if (client == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(client);
    }
}
