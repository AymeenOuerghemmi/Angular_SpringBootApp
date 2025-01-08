package tn.iit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.iit.dao.ClientRepository;
import tn.iit.entity.Client;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client getClientById(Integer cin) {
        return clientRepository.findById(cin).orElse(null);
    }

    public Client saveClient(Client client) {
        return clientRepository.save(client);
    }

    public void deleteClient(Integer cin) {
        clientRepository.deleteById(cin);
    }
    public Client getOrCreateClient(Integer cin, String nom, String prenom) {
        return clientRepository.findById(cin).orElseGet(() -> {
            Client newClient = new Client();
            newClient.setCin(cin);
            newClient.setNom(nom);
            newClient.setPrenom(prenom);
            return clientRepository.save(newClient);
        });
    }

    public boolean clientExists(Integer cin) {
        return clientRepository.existsById(cin);
    }
    
    public List<Client> getClientsByCin(String term) {
        return clientRepository.findByCinStartingWith(term);
    }

}