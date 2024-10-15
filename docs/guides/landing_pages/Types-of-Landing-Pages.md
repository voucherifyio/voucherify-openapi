---
title: Types of Landing Pages
excerpt: Learn more about all the available types of landing pages.
categorySlug: landing-pages
slug: types-of-landing-pages
type: basic
hidden: true
order: 1
---

> ❗ Deprecated Feature
>
> The Landing Pages feature is deprecated and it will not be supported or developed.

## Types of Landing Pages

Landing Pages section in your dashboard enables you to create and publish customized landing pages for many promo purposes. Each landing page is automatically connected to your account and allows your customers to interact with your promo campaigns instantly. 

 ### Before you start

To use the Landing Pages, you first need to add Origin from which requests are accepted. Go to the Project Settings and scroll down to Client-Side Settings > Your website URL. Add landing page URL or put * if you want to allow client requests from more than one origin. When ready, confirm with SAVE.

Lastly, go to the  Client-Side Settings > Danger Zone section and choose what limits you'd like to establish when it comes to your customers interacting with your landing page.
For instance, for Loyalty Program Landing Pages, you should check the following boxes:
- "Enable Client-Side Publication." 
- "Enable Client-Side customer creation."

But for the code redemption landing page, you should additionally check the following:
- "Enable client-side redemption." 
- "Enable client-side voucher expiration date update."

You can offer codes for new subscribers, invite them to join referral or loyalty campaigns, and also add redemption forms where your visitors can validate and redeem their promo codes. All that in a user-friendly editor available straight from GUI.

1. [Collect subscribers](#1-collect-subscribers).
2. [Redeem code](#2-redeem-code).
3. [Sign up for a discount code](#3-sign-up-for-a-discount-code).
4. [Enroll in a loyalty program](#4-enroll-in-a-loyalty-program)
5. [Sign up for gift card credits](#5-sign-up-for-gift-card-credits).
6. [Invite users to a referral program](#6-invite-users-to-a-referral-program).
7. [Sign up with a referral code](#7-sign-up-with-a-referral-code).

To run the editor, click on the plus and choose a template that fits your goal best.

Templates are customizable and may be used for various purposes. Voucherify offers you these templates by default and you can treat them solely as a source of inspiration for launching your promo campaigns.

### 1. Collect subscribers

The purpose of this template is to collect customers for future promo campaigns. There are four available pages included in the template:
- active campaign (main page)
- successful status page
- failed status page
- double opt-in page

All these pages are customizable and may be deleted.

The most important part of this template is the Form for collecting customers' data, such as an email address, name, or phone number. You can decide which fields to include and which ones are mandatory.

### 2. Redeem code

The goal of this landing page is to allow online client-side code redemptions.

Before you create this landing page, make sure that you have customer-side redemptions enabled in your Project Settings.

This template has six different pages, each designed for the different steps of your customer's journey. The pages at your disposal are:
- active campaign
- redemption in progress
- campaign ended
- successful status
- failed status
- code entry pages

In this template, the code is the most important element. Your landing page is going to be automatically populated with unique codes coming from your campaigns in Voucherify. You may also release time-sensitive codes to incentivize your audience. 

**Validation rules and redemption limits**

Keep in mind that the form only allows your customers to put the code and attributes defined as customer or redemption metadata. It means that you can't validate and redeem codes with limits that require passing more details in the redemption request. You can validate and redeem codes with rules based on redemption and customer metadata.

**Important notes**

To enable your users to fill the form with metadata attributes, you need to configure Active campaign and Code entry pages and add the form to both of them.
Redeem forms apply discounts to the whole cart, you can't use product-specific discounts.

### 3. Sign up for a discount code

This template aims to collect subscribers who in turn are going to be rewarded with a discount code or other rewards of your choice. This template offers six different pages:
- active campaign
- pre-start
- campaign ended
- successful status
- failed status pages
- double opt-in page

Voucherify is going to automatically display here unique codes from the campaign linked to the given landing page.

Moreover, you can add a link on a successful status page and direct your customers to a landing page where they can redeem their code.

### 4. Enroll in a loyalty program

The goal of this landing page is to encourage your customers to take part in your loyalty program. Each customer who successfully fills the form (accordingly to the form setup), gets a loyalty card published to their account.

Here you will be able to choose between two templates: rewards- or form-focused. The difference between these two types is the placement of the Rewards Container and the Form with one being more prominent than the other.

Again, keep in mind that you may freely change the form of the template.

You can show both [digital and material rewards](https://support.voucherify.io/article/261-how-to-create-rewards-for-my-campaigns) on your landing page.

The template offers six different sub-pages:
- active campaign
- pre-start
- the campaign ended
- successful status
- failed status
- double opt-in.

You can customize each of them and create a design consistent with your brand style.

The Rewards Container is going to be automatically populated with the incentives set as rewards in your loyalty program.

### 5. Sign up for gift card credits

The purpose of this landing page is to encourage your customers to sign in in exchange for free gift card credits offered as a part of your gift card campaign.

This particular template offers five different pages:
- active campaign
- pre-start
- campaign ended
- successful status
- failed status

### 6. Invite users to a referral program

Via this landing page, you can let your customers get their referral code and thus join an incentivized referral program.

Similar to the previous templates, this one also offers six pages that you may freely customize and remove.

The creation of this landing page allows you to add another communication channel via which you can notify customers about your referral campaign and automatically distribute referral codes.

### 7. Sign up with a referral code

Go to the Landing Pages section in your dashboard and click the Plus button.

Select a landing page goal (Successful Referral) and then click Create.

#### Step 1: Landing page settings

In the Creator, start from landing page settings:

- Name of your landing page.
- Description (optional).
- Source id (by default it's customer email address).
- Landing page settings
- Double opt-in (enabled by default).
- Double opt-in

The crucial part is to set a Custom event schedule. Below the double Opt-In section, you need to add a custom event that will be triggered after submitting the form. It needs to be the same event that is set as a conversion event in the referral campaign.

The remaining settings enable you to design your landing page (add logo, colors, and font).

When the Settings are ready, go to the Elements tab and edit the Form.

#### Step 2: Sign-up form

When you enter Fields settings, you can modify the default form. Decide which fields are mandatory and visible to users. 

One of the mandatory form fields is for a referral code. If a customer enters a landing page using a referral link, the field for referral code will be filled automatically (it can be hidden).

Moreover, you can add new fields to your form that will be added as metadata to the triggered event.

As every event tracks customer data by default, you can map added fields to both event or customer metadata (2). Please note that custom attributes used in the form have to be added firstly to your Metadata Schema (customer's metadata) or Event Schema (event metadata)(1).

When the form fields are added, you can go back and define the remaining form details.

#### Step 3: Final design 

Next to the form settings, you can add and design the following landing page elements:
- Banner
- Bottom call to action
- Footer
- Logo bar
- Promotion rules
- Rewards container
- Share links

When the main page is ready, remember to set up and design the remaining landing pages displayed to a customer after submitting the form:
- Successful status informs a customer that the form was submitted.
- Failed status is displayed to a customer if submitting the form fails.
- Double Opt-In informs customers about required confirmation due to the double opt-in feature. 

When all landing pages are ready, confirm with Save. Now, you can release your landing page, and build referral links. 

#### Step 4: Landing page release

Choose Release, customize URL, and Set it live. Confirm release with Set, and from now on, your sign-up landing page is available online. 

## Other Guides on Landing Pages

Check out our other guides on landing pages to fully tap into the potential of Voucherify Landing Pages Creator: 

1. [Creating a Landing Page](doc:creating-a-landing-page)
2. [Landing Page Fraud Protection](doc:landing-page-fraud-protection)
3. [Landing Pages Releases and Maintenance](doc:releases-and-maintenance-of-landing-pages)
4. [How to set up a custom domain for your landing page](doc:custom-domain-for-landing-pages)
5. [How can customers upload photos on my landing page](doc:upload-photos-to-a-landing-page)