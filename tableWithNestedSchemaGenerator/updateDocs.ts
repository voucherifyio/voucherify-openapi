import * as fs from 'fs/promises'
import {EOL} from 'os';

const objectsToDescribe: [string, string?][] = [
    [`1_obj_voucher_object`, 'VOUCHERS-API-Voucher-Object.md'],
    [`2_obj_campaign_object`, 'CAMPAIGNS-API-Campaign-Object.md'],
    [`3_obj_promotion_tier_object`, 'PROMOTIONS-API-Promotion-Tier-Object.md'],
    [`4_obj_reward_object`, 'REWARDS-API-Reward-Object.md'],
    [`4_obj_reward_assignment_object`, 'REWARDS-API-Reward-Assignment-Object.md'],
    [`5_obj_publication_object`, 'PUBLICATIONS-API-Publication-Object.md'],
    [`6_res_validate_voucher`], // VALIDATIONS-API-Validation-Object.md // Does not generate
    [`6_res_validate_voucher_false`],
    [`7_obj_redemption_object`], // REDEMPTIONS-API-Redemption-Object.md // Does not generate
    [`7_obj_rollback_redemption_object_extended`], // REDEMPTIONS-API-Rollback-Redemption-Object.md // Does not generate
    [`19_res_redemptions_POST`, 'STACKABLE-DISCOUNTS-API-Stackable-Redemptions-Object.md'],
    [`8_obj_loyalty_campaign_object`, 'LOYALTIES-API-Loyalty-Campaign-Object.md'],
    [`8_obj_loyalty_card_object_non_expanded_categories`, 'LOYALTIES-API-Loyalty-Card-Object.md'],
    [`8_obj_earning_rule_object`], // LOYALTIES-API-Earning-Rule-Object.md // Does not generates
    [`8_obj_loyalty_tier_object`, 'LOYALTIES-API-Loyalty-Tier-Object.md'],
    [`9_obj_customer_object`, 'CUSTOMERS-API-Customer-Object.md'],
    [`9_obj_customer_activity_object`, 'CUSTOMERS-API-Customer-Activity-Object.md'],
    [`10_obj_order_object`, 'ORDERS-API-Order-Object.md'],
    [`11_obj_product_object`, 'PRODUCTS-API-Product-Object.md'],
    [`11_obj_sku_object`, 'PRODUCTS-API-SKU-Object.md'],
    [`12_obj_product_collection_object`], // PRODUCT-COLLECTIONS-API-Product-Collection-Object.md // Does not generates
    [`13_obj_validation_rule_object`, 'VALIDATION-RULES-API-Validation-Rule-Object.md'],
    [`13_obj_validation_rule_assignment_object`, 'VALIDATION-RULES-API-Validation-Rule-Assignment-Object.md'],
    [`14_obj_segment_object`, 'SEGMENTS-API-Customer-Segment-Object.md'],
    [`15_req_track_custom_event`], // EVENTS-API-Custom-Event-Object.md // Something does not feel right - 
    [`18_res_list_consents_GET`, 'CONSENTS-API-Consents-Object.md'],
    [`17_obj_async_action_object`, 'ASYNC-ACTIONS-API-Async-Action-Object.md'],
    [`16_obj_export_object`, 'EXPORTS-API-Export-Object.md'],
    [`20_obj_category_object`, 'CATEGORIES-API-Category-Object.md'],
    [`21_obj_metadata_schema_object`, 'METADATA-SCHEMAS-API-Metadata-Schema-Object.md'],
    [`23_obj_qualification_object`, 'QUALIFICATIONS-API-Qualification-Object.md']
];



(async () => {
    for (const [objectName, docFile] of objectsToDescribe) {
        if(!docFile){
            continue;
        }
        try {
            const docPath =`../docs/reference-docs/${docFile}`
            const fileContent = await fs.readFile(docPath)
            const fileContentBlocks = fileContent
                .toString()
                .split(/(^---$)|(^\[block\:html\]$)/m) // Split by `---` and [block:html] that surrounds the table
                .filter(e => !!e);

            // Find block with table by part of the markdown table syntax
            const contentBlockIndexWithTableToReplace = fileContentBlocks.findIndex(block => block.indexOf('|:-----') >= 0 ) 
            
            if(contentBlockIndexWithTableToReplace < 0){
                throw new Error(`Could not find table to replace in file ${docFile} (object: ${objectName}) `)
            }

            const contentBeforeTable = fileContentBlocks.slice(0, contentBlockIndexWithTableToReplace).join('')
            const contentAfterTable = fileContentBlocks.slice(contentBlockIndexWithTableToReplace+1).join('')

            const newTable = (await fs.readFile(`./output/${objectName}.md`))
                .toString()
                .replace((/^\# .*$/m), ''); // Remove first header as in readme.io it already exists

            const newFileContent = [
                contentBeforeTable,
                newTable,
                contentAfterTable
            ].join(`${EOL}${EOL}`)

            await fs.writeFile(docPath, newFileContent)
            console.log(`Updated table in ${docFile} `)
        } catch (e) {
            console.log(`Error for ${objectName}`, e)

        }
    }
    console.log('done')
})()