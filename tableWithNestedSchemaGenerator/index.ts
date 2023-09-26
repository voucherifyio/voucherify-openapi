import * as fs from 'fs/promises'
import * as openApi from '../reference/OpenAPI.json';
import './globals.t'
import SchemaToMarkdownTable, {RenderMode, ExamplesRenderedAs} from './schemaToMarkdownTable';

const objectsToDescribe = [
    `1_obj_voucher_object`,
    `2_obj_campaign_object`,
    `3_obj_promotion_tier_object`,
    `4_obj_reward_object`,
    `4_obj_reward_assignment_object`,
    `5_obj_publication_object`,
    `6_res_validate_voucher`,
    `6_res_validate_voucher_false`,
    `7_obj_redemption_object`,
    `7_obj_rollback_redemption_object_extended`,
    `19_res_redemptions_POST`,
    `8_obj_loyalty_campaign_object`,
    `8_obj_loyalty_card_object_non_expanded_categories`,
    `8_obj_earning_rule_object`,
    `8_obj_loyalty_tier_object`,
    `9_obj_customer_object`,
    `9_obj_customer_activity_object`,
    `10_obj_order_object`,
    `11_obj_product_object`,
    `11_obj_sku_object`,
    `12_obj_product_collection_object`,
    `13_obj_validation_rule_object`,
    `13_obj_validation_rule_assignment_object`,
    `14_obj_segment_object`,
    `15_res_track_custom_event`,
    `18_res_list_consents_GET`, 
    `17_obj_async_action_object`,
    `16_obj_export_object`,
    `20_obj_category_object`,
    `21_obj_metadata_schema_object`,
    '23_obj_qualification_object'
];


(async () => {
    const stm = new SchemaToMarkdownTable(openApi.components.schemas, RenderMode.List, ExamplesRenderedAs.PartOfDescription);
    for(const objectName of objectsToDescribe){
        try{
            await fs.writeFile(`./output/${objectName}.md`, stm.render(objectName))
        }catch(e){
            console.log(`Error for ${objectName}`, e)

        }
    }
    console.log('done')
})()