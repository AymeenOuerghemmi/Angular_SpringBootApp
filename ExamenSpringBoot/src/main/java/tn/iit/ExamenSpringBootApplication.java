package tn.iit;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.transaction.Transactional;
import tn.iit.dao.CompteRepository;
import tn.iit.entity.Compte;

@SpringBootApplication
public class ExamenSpringBootApplication {
	@Autowired
	private CompteRepository compteRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(ExamenSpringBootApplication.class, args);
	}

	@Transactional

	public void run(String... args) throws Exception {

		// départ rib du compte
		Compte cp4 = compteRepository.findById(1).orElseThrow();
		System.out.println(cp4);
		System.out.println(cp4.getClient());
		System.out.println("--------------------");
		// départ cin du client
		//Client clt5 = clientRepository.findById(11143499).orElseThrow();
		//System.out.println(clt5);
		// Comment accèder à son compte
		// choix1 : relation unidirectionnelle : requete
		//List<Compte> cp5s = compteRepository.findByClientCin(053);
		//System.out.println(cp5s);
		// choix2: relation bidirectionnelle
		//System.out.println(clt5.getComptes());
	/*	Client clt1 = new Client("053", "Noussa", "Abid");
		clientRepository.save(clt1);

		Compte cp1 = new Compte(100, clt1);
		compteRepository.save(cp1);

		Compte cp2 = new Compte(250, clt1);
		compteRepository.save(cp2);*/

	}

}
