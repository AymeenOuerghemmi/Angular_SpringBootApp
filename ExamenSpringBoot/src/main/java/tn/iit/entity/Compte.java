package tn.iit.entity;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.EqualsAndHashCode.Include;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString

@Entity
@Table(name = "t_compte")
public class Compte implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Include
	private Integer rib;
	@NotNull(message = "Le solde est obligatoire.")
    @Min(value = 0, message = "Le solde initial doit être supérieur ou égal à 0.")
	private float solde;
	
	@ManyToOne(optional = false) //(cascade= {CascadeType.PERSIST,CascadeType.MERGE})
	@JoinColumn(name="id_client", referencedColumnName = "cin")
	private Client client;
	//fetch: manière de chargement des données
	//EAGER : lorsque je charge un compte, l'attribut client se charge avec
	//LAZY: lorsque je charge un compte, l'attribut client ne se charge pas
	//LAZY suite: l'attribut client se charge, suite à l'appel de la méthode getClient()
//default fetch as for JPA
	// 1 --> EAGER
	// * --> LAZY
	
	public Compte(float solde, Client client) {
		super();
		this.solde = solde;
		this.client = client;
	}
	
	

}
