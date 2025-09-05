/**
 * DNE - Dominion Energy NOTES
 * ==================
 * This file contains the structured, hierarchical notes data for the
 * Dominion Energy (DNE) biller and its related services. The complex
 * structure of this object is designed to power a "Composite Biller"
 * view in the UI.
 */

const DNE_NOTES = {
  // --- CRITICAL ALERTS ---
  // Displayed prominently to the user upon selecting this biller.
  alerts: [
    "Payment cancellations are NOT ALLOWED by DNE or Paymentus. Customers must be directed to contact their financial institution to dispute or stop a payment.",
    "CSRs CANNOT take live payments. The only supported channels are the IVR and the DNE website.",
    "DO NOT assist customers with password resets for their DominionEnergy.com account.",
    "Certain Customer Service numbers are for INTERNAL TRANSFERS ONLY and must not be given out to customers."
  ],

  // --- GENERAL INFORMATION ---
  // Policies and data that apply to most DNE services.
  generalInfo: {
    goLiveDate: "April 18, 2021",
    processor: "Braintree",
    systemCutoff: "5:00 PM EST",
    autoPaySetup: {
      title: "AutoPay Enrollment (Online or IVR)",
      content: "<ul><li>Payments are by <strong>ACH only</strong> (checking or savings) and have no fees.</li><li>When enrolling, the customer selects a 'number of days' (between 10-21) after the bill is issued for the payment to be taken.</li><li>Re-authorization for previously enrolled customers must be done online; it is not available by phone.</li></ul>"
    },
    salesforceCases: [
      { subject: "IVR Assistance", description: "CX is calling for assistance with the IVR" },
      { subject: "Payment request", description: "CX wishes for us to take a live payment" },
      { subject: "Payment request from CS", description: "CX says they were told by a DNE CSR that we take live payments" },
      { subject: "Cancellation request", description: "CX wishes for us to cancel a payment" },
      { subject: "Cancellation request from CS", description: "CX says they were told by a DNE CSR that we can cancel a payment" }
    ]
  },

  // --- SERVICES & STATES ---
  // A breakdown of each specific service managed under the DNE TLA.
  services: {
    VA: {
      name: "Virginia (Electric)",
      contact: {
        ivr: "866-366-4357",
        autoPayIvr: "833-648-0174 (Option 2)",
        csr: "866-366-4357",
        internalCsr: "888-429-0011",
        hours: "8 AM - 5 PM, M-F"
      },
      accountFormat: "10 digits",
      paymentDetails: {
        residential: {
          fee: "$1.65",
          maxPayment: "$1,000",
          velocity: "5 payments in 3 days, 10 payments in 30 days",
          methods: ["Visa", "Mastercard", "Discover", "AMEX", "Checking", "Savings", "PayPal", "PayPal Credit", "Amazon Pay"]
        },
        nonResidential: {
          fee: "$14.95",
          maxPayment: "$15,000",
          velocity: "5 payments in 3 days, 10 payments in 30 days",
          methods: ["Visa", "Mastercard", "Discover", "AMEX", "Checking", "Savings", "PayPal", "PayPal Credit", "Amazon Pay"]
        }
      }
    },
    NC_Electric: {
      name: "North Carolina (Electric)",
      contact: {
        ivr: "866-366-4357",
        csr: "866-366-4357",
        internalCsr: "888-429-0011",
        hours: "8 AM - 5 PM, M-F"
      },
      accountFormat: "Not specified",
      paymentDetails: {
        residential: {
          fee: "$1.65",
          maxPayment: "$1,000",
          velocity: "5 payments in 3 days, 10 payments in 30 days",
          methods: ["Visa", "Mastercard", "Discover", "AMEX", "Checking", "Savings", "PayPal", "PayPal Credit", "Amazon Pay"]
        },
        nonResidential: {
          fee: "$14.95",
          maxPayment: "$15,000",
          velocity: "5 payments in 3 days, 10 payments in 30 days",
          methods: ["Visa", "Mastercard", "Discover", "AMEX", "Checking", "Savings", "PayPal", "PayPal Credit", "Amazon Pay"]
        }
      }
    },
    OH_Gas: {
      name: "Ohio (Gas) - Rebranded as Enbridge Gas OH",
      rebrandingNote: "Rebranded on July 8, 2024. This service remains under the DNE TLA and will be processed by Dominion Energy until late 2025 or early 2026. Use 'Enbridge OH Gas' as the account name in Salesforce cases.",
      contact: {
        ivr: "833-261-1469",
        autoPayIvr: "833-648-0176",
        csr: "800-362-7557",
        internalCsr: "866-313-8303",
        hours: "7 AM - 7 PM, M-F",
        website: "https://www.enbridgegas.com/ohio"
      },
      accountFormat: "13 digits",
      paymentDetails: {
        residential: {
          fee: "$1.65",
          maxPayment: "$1,000",
          velocity: "5 payments in 3 days, 10 payments in 30 days",
          methods: ["Visa", "Mastercard", "Discover", "AMEX", "Checking", "Savings", "PayPal", "PayPal Credit", "Amazon Pay"]
        },
        nonResidential: {
          fee: "$14.95",
          maxPayment: "$15,000",
          velocity: "5 payments in 3 days, 10 payments in 30 days",
          methods: ["Visa", "Mastercard", "Discover", "AMEX", "Checking", "Savings", "PayPal", "PayPal Credit", "Amazon Pay"]
        }
      }
    },
    MRP: {
      name: "MRP (Miscellaneous Payments)",
      contact: {
        ivr: "833-268-4343",
        csr: "N/A",
        hours: "N/A"
      },
      accountFormat: "9 digits"
    },
    FTHD: {
      name: "Fort Hood, TX (Permits)",
      contact: {
        ivr: "N/A",
        csr: "N/A",
        supportEmail: "desupport@paymentus.com",
        rotpLink: "https://ipn.paymentus.com/rotp/fthd"
      },
      accountFormat: "Not specified",
      paymentDetails: {
        main: {
          feeModel: "Absorbed",
          maxPayment: "Varies by charge type (see PDF for details)",
          methods: ["Credit Card", "Debit Card", "Checking"]
        }
      }
    },
    RKEG: {
      name: "Roanoke & Gaston Lakes",
      contact: {
        ivr: "N/A",
        csr: "N/A",
        website: "https://www.dominionenergy.com/lakes-and-recreation/lake-gaston-and-roanoke-rapids-lake-nc"
      },
      accountFormat: "Not specified"
    }
  },

  // --- UNSUPPORTED SERVICES ---
  // States where DNE operates but we do not handle their payments.
  unsupportedServices: {
    title: "Services in Other States (Inquiry Transfer ONLY)",
    note: "For the following states, we do not handle payment inquiries. Transfer the customer directly to DNE.",
    services: [
      { state: "Idaho", csr: "800-323-5517", hours: "7 AM - 6 PM, M-F" },
      { state: "Utah", csr: "800-323-5517", hours: "7 AM - 6 PM, M-F" },
      { state: "Wyoming", csr: "800-323-5517", hours: "7 AM - 6 PM, M-F" }
    ],
    questarNote: "DNE-Questar is also being sold to Enbridge. We only process MRP payments for them under DNE."
  },

  // --- AFFILIATED SERVICES ---
  // Related companies that are on different TLAs in this system.
  affiliatedServices: {
    title: "Affiliated Biller Information",
    services: [
      { name: "Dominion Energy SC & NC (Gas)", tla: "DESN", note: "This service is handled under the DESN TLA." },
      { name: "Hope Gas (West Virginia)", tla: "HOPE", note: "Formerly DNE, this service is now handled under the HOPE TLA." }
    ]
  }
};