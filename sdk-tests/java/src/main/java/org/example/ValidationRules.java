package org.example;

import com.google.gson.JsonSyntaxException;
import kotlin.contracts.Effect;
import org.example.data.Voucherify;
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.api.ValidationRulesApi;
import org.openapitools.client.model.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ValidationRules {

    public void test(ApiClient defaultClient) {

        try {
            ValidationRulesApi validationRules = new ValidationRulesApi(defaultClient);

            ValidationRulesCreateRequestBody validationRulesCreateRequestBody = new ValidationRulesCreateRequestBody();

            Map<String, Object> condition = new HashMap<>();
            condition.put("id", Voucherify.getInstance().getProducts().get(0).getId());
            condition.put("type", "product_or_sku");
            condition.put("object", "product");
            condition.put("source_id", Voucherify.getInstance().getProducts().get(0).getSourceId());

            ArrayList<Object> isConditions = new ArrayList<>();
            isConditions.add(condition);

            Map<String, Object> conditions = new HashMap<>();
            conditions.put("$is", isConditions);

            Map<String, Object> rule = new HashMap<>();
            rule.put("name", "order.items.any");
            rule.put("rules", new Object());
            rule.put("conditions", conditions);

            Map<String, Object> rules = new HashMap<>();
            rules.put("1", rule);
            rules.put("logic", "1");

            ValidationRuleBaseError validationRuleBaseError = new ValidationRuleBaseError();
            validationRuleBaseError.setMessage("error message");

            validationRulesCreateRequestBody.setRules(rules);
            validationRulesCreateRequestBody.setName(Utils.getAlphaNumericString(10));
            validationRulesCreateRequestBody.setError(validationRuleBaseError);

            ValidationRuleBaseApplicableTo validationRuleBaseApplicableTo = new ValidationRuleBaseApplicableTo();

            ApplicableTo applicableTo = new ApplicableTo();
            applicableTo.setObject(ApplicableTo.ObjectEnum.PRODUCT);
            applicableTo.setId(Voucherify.getInstance().getProducts().get(0).getId());
            applicableTo.setSourceId(Voucherify.getInstance().getProducts().get(0).getSourceId());
            applicableTo.setStrict(false);
            applicableTo.effect(ApplicableToEffect.EVERY);

            List<ApplicableTo> included = new ArrayList<>();
            included.add(applicableTo);

            validationRuleBaseApplicableTo.included(included);
            validationRulesCreateRequestBody.setApplicableTo(validationRuleBaseApplicableTo);

            validationRulesCreateRequestBody.setType(ValidationRulesCreateRequestBody.TypeEnum.ADVANCED);

            ValidationRulesCreateResponseBody validationRulesCreateResponseBody = validationRules.createValidationRules(
                validationRulesCreateRequestBody
            );

            Voucherify.getInstance().getCampaign().getValidationRuleIds().add(validationRulesCreateResponseBody.getId());

            System.out.println("Calling ValidationRulesApi#createValidationRules OK");
        } catch (ApiException | JsonSyntaxException e) {
            System.err.println("Exception when calling ValidationRulesApi#createValidationRules");
            System.err.println("Status message: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
