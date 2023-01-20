package cz.ppro.poolapp.service;

import cz.ppro.poolapp.model.Account;

import java.util.List;

public interface AccountService {
    public Account saveAccount(Account account);
    public List<Account> getAllAccounts();

}
