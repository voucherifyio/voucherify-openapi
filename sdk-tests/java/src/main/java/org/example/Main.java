package org.example;

import org.example.data.Voucherify;
import org.openapitools.client.ApiClient;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.ApiKeyAuth;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class Main {
    private ApiClient getDefaultClient() {
        Properties properties = new Properties();
        InputStream input = null;

        try {
            String dir = System.getProperty("user.dir");
            input = new FileInputStream(dir + "/sdk-tests/.env");
            properties.load(input);
        } catch (IOException ex) {
            ex.printStackTrace();
        } finally {
            if (input != null) {
                try {
                    input.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath(properties.getProperty("VOUCHERIFY_HOST"));

        ApiKeyAuth id = (ApiKeyAuth) defaultClient.getAuthentication("X-App-Id-1");
        id.setApiKey(properties.getProperty("X_APP_ID"));

        ApiKeyAuth token = (ApiKeyAuth) defaultClient.getAuthentication("X-App-Token-1");
        token.setApiKey(properties.getProperty("X_APP_TOKEN"));

        return defaultClient;
    }

    private static void ensureDataByTesting(ApiClient defaultClient){
        Customers customers = new Customers();
        Campaigns campaigns = new Campaigns();
        Products products = new Products();
        ValidationRules validationRules = new ValidationRules();

        products.test(defaultClient);
        validationRules.test(defaultClient);
        customers.test(defaultClient);
        campaigns.test(defaultClient);

        Voucherify.getInstance().setDataEnsured(true);
    }

    public static void main(String[] args) {
        ApiClient defaultClient = new Main().getDefaultClient();

        Main.ensureDataByTesting(defaultClient);

        if(Voucherify.getInstance().isDataEnsured()){
            Loyalties loyalties = new Loyalties();
            Qualifications qualifications = new Qualifications();
            StackableDiscounts stackableDiscounts = new StackableDiscounts();
            Redemptions redemptions = new Redemptions();
            Publications publications = new Publications();

            qualifications.test(defaultClient);
//            loyalties.test(defaultClient);
//            publications.test(defaultClient);
//            redemptions.test(defaultClient);
        }
    }
}
