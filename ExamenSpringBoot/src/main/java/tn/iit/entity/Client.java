package tn.iit.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.EqualsAndHashCode.Include;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.ToString.Exclude;
import jakarta.persistence.CascadeType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString

@Entity
@Table(name = "t_client")
public class Client implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@Include
	@NotBlank(message = "Le CIN est obligatoire.")
    @Size(min = 8, max = 8, message = "Le CIN doit contenir exactement 8 caractères.")
	private Integer cin;
	@NotBlank(message = "Le nom est obligatoire.")
    @Size(max = 50, message = "Le nom ne peut pas dépasser 50 caractères.")
	private String nom;
	@NotBlank(message = "Le prénom est obligatoire.")
    @Size(max = 50, message = "Le prénom ne peut pas dépasser 50 caractères.")
	private String prenom;
	@JsonIgnore //casser la boucle Json
	@Exclude // casser la boucle toString
	@OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true) // n'ajoute rien dans la base
	private List<Compte> comptes = new ArrayList<>();

	public Client(Integer cin, String nom, String prenom) {
		super();
		this.cin = cin;
		this.nom = nom;
		this.prenom = prenom;
	}

	public String getNomComplet() {
		return nom + " " + prenom;
	}
	
	public Integer getCin() {
        return cin;
    }

}
