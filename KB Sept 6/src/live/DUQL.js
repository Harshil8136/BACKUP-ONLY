/**
 * DUQL - Duquesne Light Co. NOTES
 * ==================
 * This file contains the structured notes data for DUQL.
 */

const DUQL_NOTES = {
  alerts: {
    title: "Critical CSR Alerts",
    color: "danger",
    content: `<ul>
                <li>Do not transfer customers to the biller; provide the phone number for the customer to call themselves.</li>
                <li>Paymentus CSRs are ONLY to assist customers with how to make an IVR payment.</li>
                <li>DO NOT research payments or payment entries for customers.</li>
              </ul>`
  },
  paymentInfo: {
    title: "Payment Information",
    color: "primary",
    content: `<h4>Residential Payments</h4>
              <ul>
                <li><strong>Fees:</strong> Absorbed</li>
                <li><strong>Max Debit/Credit/APM Payment:</strong> $1,000.00 </li>
                <li><strong>Max ACH Payment:</strong> $99,999.00 </li>
                <li><strong>Payment Methods (Online):</strong> Visa, Mastercard, Discover, AMEX, PayPal, PayPal Credit, Venmo, Apple Pay, Google Pay, Checking, Savings [cite: 7]</li>
              </ul>
              <h4>Non-Residential Payments</h4>
              <ul>
                <li><strong>Fees:</strong> $9.95 (online), Absorbed (IVR/AD) </li>
                <li><strong>Max Debit/Credit/APM Payment:</strong> $10,000.00</li>
                <li><strong>Max ACH Payment:</strong> $99,999.00 </li>
              </ul>
              <h4>Walmart Pay</h4>
              <ul>
                <li><strong>Fee:</strong> $2.00</li>
                <li><strong>Payment Methods:</strong> Cash, Debit</li>
              </ul>`
  }
};