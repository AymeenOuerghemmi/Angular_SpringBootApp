package tn.iit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import tn.iit.dao.CompteRepository;
import tn.iit.entity.Client;
import tn.iit.entity.Compte;


@Service
public class CompteService {
    @Autowired
    private CompteRepository compteRepository;

    @Autowired
    private ClientService clientService;

    public Compte createCompteForExistingClient(Compte compte) {
        if (compte.getClient() == null) {
            throw new IllegalArgumentException("Client cannot be null");
        }
        if (!clientService.clientExists(compte.getClient().getCin())) {
            throw new IllegalArgumentException("Client avec CIN " + compte.getClient().getCin() + " n'existe pas");
        }
        Client client = clientService.getOrCreateClient(compte.getClient().getCin(), compte.getClient().getNom(), compte.getClient().getPrenom());
        compte.setClient(client);
        compte = compteRepository.save(compte);
        return compte;
    }



    public Compte createCompteForNewClient(Compte compte) {
        if (clientService.clientExists(compte.getClient().getCin())) {
            throw new IllegalArgumentException("Client avec CIN " + compte.getClient().getCin() + " existe déjà");
        }
        Client client = clientService.getOrCreateClient(compte.getClient().getCin(), compte.getClient().getNom(), compte.getClient().getPrenom());
        compte.setClient(client);
        return compteRepository.save(compte);
    }

    public Compte updateCompte(Integer rib, Float solde) {
        Compte compte = compteRepository.findById(rib).orElseThrow(() -> new IllegalArgumentException("Compte avec RIB " + rib + " n'existe pas"));
        compte.setSolde(solde);
        return compteRepository.save(compte);
    }


    public List<Compte> getAllComptes() {
        return compteRepository.findAll();
    }

    public void deleteCompte(Integer rib) {
        compteRepository.deleteById(rib);
    }
    public Compte getCompteByRib(Integer rib) {
        return compteRepository.findById(rib).orElse(null);
    }
    public void updateCompte(Compte compte) {
        if (!compteRepository.existsById(compte.getRib())) {
            throw new IllegalArgumentException("Compte avec RIB " + compte.getRib() + " n'existe pas.");
        }
        compteRepository.save(compte);
    }

	public void deleteById(Integer rib) {
		compteRepository.deleteById(rib);

	}
}