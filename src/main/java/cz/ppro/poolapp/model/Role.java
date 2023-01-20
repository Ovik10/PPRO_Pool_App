package cz.ppro.poolapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "role_id")
    private int id;
    @Column(name = "role_name")

    @NotBlank
    private String name;
    @OneToMany(mappedBy = "role")
    @JsonIgnore
    private List<Account> accounts;


    public Role(@NotBlank String name, List<Account> accounts) {
        this.name = name;
        this.accounts = accounts;
    }

    public Role(){}
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }


}
