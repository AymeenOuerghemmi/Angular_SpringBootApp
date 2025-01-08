package tn.iit.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import tn.iit.entity.Client;

public interface ClientRepository extends JpaRepository<Client, Integer> {

	@Query("SELECT c FROM Client c WHERE CAST(c.cin AS string) LIKE :cinPrefix")
	List<Client> findByCinStartingWith(@Param("cinPrefix") String cinPrefix);

}
