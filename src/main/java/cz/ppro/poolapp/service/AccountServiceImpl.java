package cz.ppro.poolapp.service;

import cz.ppro.poolapp.model.Account;
import cz.ppro.poolapp.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService{

    @Autowired
    private AccountRepository accountRepository;
    @Override
    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }
    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }
}
