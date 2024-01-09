package org.example.data;


public class Voucherify {
    private final Campaign campaign;
    private final Customer customer;

    //FIXME: FIND BETTER SOLUTION FOR REMOVING COUPLINGS
    private boolean dataEnsured = false;

    private Voucherify() {
        campaign = new Campaign();
        customer = new Customer();
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

    public boolean isDataEnsured() {
        return dataEnsured;
    }

    public void setDataEnsured(boolean dataEnsured) {
        this.dataEnsured = dataEnsured;
    }
}