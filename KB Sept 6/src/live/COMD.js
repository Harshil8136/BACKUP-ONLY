/**
 * COMMONWEALTH EDISON (COMD) NOTES
 * ==================
 * This file contains the detailed notes for Commonwealth Edison, an Exelon company.
 * The data is structured for use with the UI_Notes.render() function and
 * follows the new standardized format and tab order.
 */

const COMD_NOTES = {
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <div class="accordion">
        <button class="accordion-header">Password Protected Accounts</button>
        <div class="accordion-content">
          <p>Some accounts are password protected. If you see a notice in red stating this, you will not be able to proceed. You must:</p>
          <ol>
            <li>Inform the customer their account is password protected.</li>
            <li>Transfer them to the special number provided in the notice.</li>
            <li>Instruct the customer to tell the biller's agent that their account is password protected and Paymentus was unable to process the payment.</li>
          </ol>
        </div>
      </div>
      <div class="accordion">
        <button class="accordion-header">Incorrect Balance Issue ($9,999.99)</button>
        <div class="accordion-content">
          <p>A known issue may cause the balance in the IVR or Agent Dashboard to appear as $9,999.99 with a due date of 12/31/9999. This happens when the real-time lookup fails.</p>
          <ul>
            <li>You can still process a payment for a specific amount if the customer knows it.</li>
            <li>If the customer needs to know their actual balance, they must be transferred to the biller.</li>
          </ul>
        </div>
      </div>
      <h4>AIVR Zip Code Requirement</h4>
      <p>When a customer pays with a Credit or Debit card in the AIVR, they are now required to enter the billing zip code for the card to complete the transaction. This is not required for ACH payments.</p>
      <h4>Account Validation Phone Number</h4>
      <p>When processing a payment, the phone number field is requested but not mandatory. If the customer does not wish to provide it, **leave the field blank**. Do not enter a Paymentus phone number.</p>
    `
  },
  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <h4>Fee Structure</h4>
      <p>Due to Illinois legislation, all payment fees are <strong>Absorbed</strong> by the biller. Customers are not charged a convenience fee.</p>
      <ul>
        <li>This applies to all payment methods: Debit Card, Credit Card, and Bank Account (ACH).</li>
        <li>No fees are charged for auto-pay or e-check when the customer is logged into their <code>comed.com</code> account.</li>
      </ul>
      <h4>Payment Limits</h4>
      <ul>
        <li><strong>Credit/Debit Card Maximum:</strong> $5,000 per transaction.</li>
        <li><strong>ACH (Bank Account) Maximum:</strong> $99,000 per transaction.</li>
        <li>There is <strong>no minimum</strong> payment amount.</li>
        <li>Customers are able to overpay their account, but duplicate payment rules apply (a second payment with the exact same criteria within 24 hours will be rejected).</li>
      </ul>
    `
  },
  contact: {
    title: 'Contact',
    color: 'info',
    content: `
      <h4>Customer Service Contact Information</h4>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Service Line</th>
              <th>Phone Number</th>
              <th>Hours of Operation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Residential</strong></td>
              <td><span class="copyable-phone">800-334-7661</span></td>
              <td>Mon-Fri, 7:00 AM - 7:00 PM CDT</td>
            </tr>
            <tr>
              <td><strong>Business</strong></td>
              <td><span class="copyable-phone">877-426-6331</span></td>
              <td>Mon-Fri, 7:00 AM - 7:00 PM CDT</td>
            </tr>
            <tr>
              <td><strong>Spanish</strong></td>
              <td><span class="copyable-phone">800-955-8237</span></td>
              <td>Mon-Fri, 7:00 AM - 7:00 PM CDT</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p><strong>Note:</strong> To speak with a biller CSR after being transferred, the customer should use <strong>extension 3</strong>.</p>
    `
  },
  system: {
      title: 'System & Escalation',
      color: 'secondary',
      content: `
        <h4>Payment Channels</h4>
        <ul>
            <li>WEB (Online)</li>
            <li>MOBILE</li>
            <li>IVR (Phone System)</li>
            <li>Scheduled Payments</li>
        </ul>
        <h4>Escalation Procedures</h4>
        <ul>
            <li><strong>Customer Problems:</strong> For issues like starting/stopping service, payment arrangements, or billing discrepancies, transfer the customer to the appropriate service line.</li>
            <li><strong>Biller Problems:</strong> Unresolved biller-side issues should be escalated to Tier 2 upon Team Lead approval.</li>
            <li><strong>Escalation Email:</strong> <a href="mailto:exelonsupport@paymentus.com">exelonsupport@paymentus.com</a></li>
        </ul>
        <h4>Service Outage Protocol</h4>
        <p>For T2 Agents/TLs: If the biller's service is down, a proactive email must be sent to the list of contacts in the legacy KB document.</p>
      `
  },
  additionalInfo: {
    title: 'Additional Information',
    color: 'secondary',
    content: `
      <h4>Velocity Limits (Payments per Payment Method)</h4>
      <ul>
        <li><strong>Daily:</strong> Five (5) payments per payment method, per account, in one day.</li>
        <li><strong>Weekly:</strong> Seven (7) payments per payment method in one week (7 calendar days).</li>
      </ul>
      <h4>Wallet Changes</h4>
      <p>If a customer asks why their saved payment methods are gone, explain that as part of a system security upgrade, all wallet information was erased to allow customers to update their wallets with current data.</p>
      <h4>Marketplace Payments</h4>
      <p>ComEd sells items on its website via a "Marketplace". <strong>Paymentus agents DO NOT handle these payments.</strong> T2 will handle any related cases.</p>
      <h4>CSR Check Point (Q&A)</h4>
      <ul>
        <li><strong>Payment History Displayed?</strong> Seven (7) years.</li>
        <li><strong>Is Email Address Required?</strong> No, this data should NOT be entered.</li>
        <li><strong>Is CVV Required?</strong> No.</li>
        <li><strong>Should you check "Saved Payments"?</strong> NEVER.</li>
      </ul>
    `
  }
};