package org.example.data;


import java.util.ArrayList;
import java.util.List;

public class Voucherify {
    private final Campaign campaign;
    private final Customer customer;
    private final List<Product> products;

    //FIXME: FIND BETTER SOLUTION FOR REMOVING COUPLINGS
    private boolean dataEnsured = false;

    private Voucherify() {
        campaign = new Campaign();
        customer = new Customer();
        products = new ArrayList<>();
    }

    private static class SingletonHolder {
        private static final Voucherify INSTANCE = new Voucherify();
    }

    public static Voucherify getInstance() {
        return SingletonHolder.INSTANCE;
    }

    public Campaign getCampaign() {
        return campaign;
    }

    public Customer getCustomer() {
        return customer;
    }

    public List<Product> getProducts() {
        return products;
    }

    public boolean isDataEnsured() {
        return dataEnsured;
    }

    public void setDataEnsured(boolean dataEnsured) {
        this.dataEnsured = dataEnsured;
    }
}