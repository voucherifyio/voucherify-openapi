package org.example;

import io.github.cdimascio.dotenv.Dotenv;
import org.example.data.Voucherify;
import org.openapitools.client.ApiClient;
import org.openapitools.client.Configuration;
import org.openapitools.client.api.RedemptionsApi;
import org.openapitools.client.auth.ApiKeyAuth;

import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Main {
    private Path removeLastNElements(Path path, int n) {
        int elementsCount = path.getNameCount();
        if (n >= elementsCount) {
            return Paths.get("");
        }

        int startIndex = elementsCount - n;

        return path.subpath(0, startIndex);
    }

    private Path getCurrentFileDirectory() {
        Path currentDirectory = FileSystems.getDefault().getPath(System.getProperty("user.dir"));

        String filePath = Main.class.getProtectionDomain().getCodeSource().getLocation().getPath();

        Path path = Paths.get(filePath);

        Path relativePath = currentDirectory.relativize(path);

        return relativePath.getParent();
    }

    private ApiClient getDefaultClient() {
        Dotenv dotenv = Dotenv.configure()
            .directory(this.removeLastNElements(this.getCurrentFileDirectory(), 2).toString())
            .filename(".env")
            .load();

        ApiClient defaultClient = Configuration.getDefaultApiClient();
        defaultClient.setBasePath(dotenv.get("VOUCHERIFY_HOST"));

        ApiKeyAuth id = (ApiKeyAuth) defaultClient.getAuthentication("X-App-Id-1");
        id.setApiKey(dotenv.get("X_APP_ID"));

        ApiKeyAuth token = (ApiKeyAuth) defaultClient.getAuthentication("X-App-Token-1");
        token.setApiKey(dotenv.get("X_APP_TOKEN"));

        return defaultClient;
    }

    private static void ensureDataByTesting(ApiClient defaultClient){
        Customers customers = new Customers();
        Campaigns campaigns = new Campaigns();

        customers.test(defaultClient);
        campaigns.test(defaultClient);

        Voucherify.getInstance().setDataEnsured(true);
    }

    public static void main(String[] args) {
        ApiClient defaultClient = new Main().getDefaultClient();

        Main.ensureDataByTesting(defaultClient);

        if(Voucherify.getInstance().isDataEnsured()){
            StackableDiscounts stackableDiscounts = new StackableDiscounts();
            Redemptions redemptions = new Redemptions();
            Publications publications = new Publications();

            publications.test(defaultClient);
            redemptions.test(defaultClient);
        }
    }
}
