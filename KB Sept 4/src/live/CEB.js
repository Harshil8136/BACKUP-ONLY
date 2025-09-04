/**
 * CEB - Constellation Energy Group NOTES
 * ==================
 * This file contains the structured, hierarchical notes data for the
 * Constellation Energy Group (CEB) biller. Its composite structure is
 * designed to be rendered by the advanced UI notes component.
 */

const CEB_NOTES = {
  // --- CRITICAL ALERTS ---
  // Displayed prominently to the user upon selecting this biller.
  alerts: [
    "Always confirm the customer is making a payment with Constellation Energy before processing a payment.",
    "CSRs CANNOT reset customer passwords, as the customer portal page is non-functioning.",
    "CSRs cannot see AutoPay payments.",
    "CSRs cannot view or make payments for numerous specific payment types (e.g., CEP_Deposit, CEP_GASFEE). Escalate to a Team Lead if payment view is required."
  ],

  // --- GENERAL INFORMATION ---
  // Policies and data that apply to most CEB services.
  generalInfo: {
    processor: "Braintree",
    salesforceCases: {
        title: "Salesforce Case Naming",
        content: "Constellation cases should be identified as 'Constellation Energy Group' for the biller, not Exelon."
    },
    paymentRules: [
        "For security, agents are not to repeat ACH routing numbers back to the customer.",
        "Some accounts are flagged and are not allowed to make credit/debit card payments over $10,000.00. The customer can use eCheck or be transferred to make the payment.",
        "When entering an invoice number, the hyphen must be replaced with a zero to avoid an 'Account was not found' error."
    ],
    paymentMethods: [
        "Debit: Visa, Mastercard",
        "Credit: Visa, MasterCard, Discover, Amex",
        "Bank: Checking, Savings",
        "Advanced: PayPal, Walmart Pay"
    ]
  },

  // --- SERVICES & STATES ---
  // A breakdown of each specific service managed under the CEB TLA.
  services: {
    power: {
      name: "Power",
      contact: {
        ivr: "844-309-7088",
        csrResidential: "888-900-7052",
        csrBusiness: "866-917-8271",
        hours: "Mon-Fri 7:00am to 8:00pm EST, Sat 8:00am to 5:00pm EST"
      },
      accountFormat: {
        title: "Customer Number",
        format: "5-6 digits hyphen 1-5 digits. Examples: 954291-46418 and 20923-1."
      },
      notes: "The IVR now asks for a statement number. When entering the account number on the IVR, the user must pause after pressing the pound key (#) in place of the dash to avoid system errors."
    },
    gas: {
      name: "Gas",
      contact: {
        ivr: "844-309-7092",
        csr: "877-677-4355 (Spanish: option 2)",
        hours: "Mon-Fri 8:00am to 6:00pm EST"
      },
      accountFormat: {
        title: "Account ID",
        format: "Account ID must be in ALL CAPS. Format is BG- or RG- followed by 5 or 6 digits. Examples: BG-100152 and RG-23030."
      }
    },
    homeServices: {
      name: "Constellation Home Services",
      contact: {
        ivr: "833-351-2609",
        csr: "Please refer to the separate KB page for Constellation Home Services for CSR number."
      },
      notes: "This service was formerly known as BGE Home (BGEH)."
    }
  }
};