/**
 * BILLER DATA: CEMI - Consumers Energy
 * ==================
 * This file contains the detailed, categorized notes for CEMI.
 * It uses an advanced structure with classes to power interactive elements
 * like filterable tables and collapsible accordions.
 */

const CEMI_NOTES = {
  alert: {
    title: 'Alert',
    color: 'danger',
    content: `
      <h4>CSR Alert</h4>
      <ul>
        <li>Confirm the customer is making a payment with Consumers Energy before processing a payment.</li>
        <li>For AutoPay, the only accepted method of payment is ACH.</li>
        <li>If a customer's payment method is blocked, it can sometimes only be found via RT CIF.</li>
        <li>Paymentus agents are not to cancel same-day payments; the customer must be directed to Consumers Energy.</li>
        <li>Paymentus agents are not to change permissions for Consumers Energy agents; direct the agent to their System Admin.</li>
      </ul>
    `
  },
  fees: {
    title: 'Fees & Payments',
    color: 'success',
    content: `
      <h4>Payment Fees & Limits</h4>
      <p>The following fees and limits apply. Agents can use the filters to narrow down the results.</p>
      <div class="notes-filter-controls">
        <button class="notes-filter-btn active" data-filter="all">All</button>
        <button class="notes-filter-btn" data-filter="residential">Residential</button>
        <button class="notes-filter-btn" data-filter="commercial">Commercial</button>
        <button class="notes-filter-btn" data-filter="legacy">Legacy</button>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Payment Type</th>
              <th>Channel</th>
              <th>Method</th>
              <th>Fee</th>
              <th>Max Payment / Velocity</th>
            </tr>
          </thead>
          <tbody>
            <tr data-category="legacy">
              <td><strong>Legacy - Utility Bill</strong><br><small>(Registered Residential & Non-Residential)</small></td>
              <td>CP<br>Mobile App Registered<br>Agent Dashboard<br>CE IVR<br>Scheduled Payment<br>SMS Payment</td>
              <td>ACH <span class="payment-logo ach"></span></td>
              <td><small>Absorbed by Consumers Energy</small></td>
              <td><strong>$9,999,999</strong></td>
            </tr>
            <tr data-category="residential">
              <td><strong>Residential Utility - ROTP</strong></td>
              <td>Guest Web<br>Mobile App Guest<br>Agent Dashboard<br>Paymentus (Guest) IVR</td>
              <td>ACH <span class="payment-logo ach"></span><br>Debit & Credit Card <span class="payment-logo visa"></span><span class="payment-logo mastercard"></span><span class="payment-logo discover"></span><span class="payment-logo amex"></span><br>Advanced Payment Methods</td>
              <td><strong>$2.99</strong><br><small>per transaction</small></td>
              <td><strong>$1,000</strong><br><small>Multiple payments allowed (up to 5 per day and 15 per month)</small></td>
            </tr>
            <tr data-category="commercial">
              <td><strong>Non-Residential Utility - ROTP</strong></td>
              <td>Guest Web<br>Mobile App Guest<br>Agent Dashboard<br>Paymentus Guest IVR</td>
              <td>ACH <span class="payment-logo ach"></span><br>Debit & Credit Card <span class="payment-logo visa"></span><span class="payment-logo mastercard"></span><span class="payment-logo discover"></span><span class="payment-logo amex"></span><br>Advanced Payment Methods</td>
              <td><strong>$9.99</strong><br><small>per transaction</small></td>
              <td><strong>$2,500</strong><br><small>Multiple payments allowed (up to 5 per day and 15 per month)</small></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p><strong>Note:</strong> As of July 27, 2023, Consumers Energy is no longer accepting Credit or Debit cards for any new or revised AutoPay schedules. Only ACH is accepted for AutoPay.</p>
    `
  },
  procedures: {
    title: 'Procedures',
    color: 'info',
    content: `
      <h4>Agent How-To Guides</h4>
      <div class="accordion">
        <button class="accordion-header">How to Set Up / Update AutoPay (ACH Only)</button>
        <div class="accordion-content">
          <p>The only MOP option for new or updated payment schedules is ACH. To process this in the AD, you may need to work around the NACHA consent warning.</p>
          <ol>
            <li>Select <strong>E-Check (IVR transfer)</strong> as the payment method, but do not click continue.</li>
            <li>When the IVR Transfer screen appears, change the payment method back to <strong>E-Check (new)</strong>.</li>
            <li>Click <strong>Continue</strong>.</li>
            <li>Complete the customer's information, request their authorization for the consent box, and process the schedule.</li>
          </ol>
        </div>
      </div>
      <div class="accordion">
        <button class="accordion-header">How to Find a Blocked Payment Method</button>
        <div class="accordion-content">
          <p>This block may only appear as a block for Mastercard. If a customer wants the block removed, they must email <strong>electricpayments@cmsenergy.com</strong> with their account number. You can also transfer them to a CEMI agent.</p>
          <ol>
            <li>In Agent Dashboard, navigate to the <strong>Accounts</strong> tab.</li>
            <li>Click on <strong>Find Blocked Payment Method</strong>.</li>
            <li>Enter the customer's <strong>Account Number</strong> and click <strong>Search</strong>.</li>
          </ol>
        </div>
      </div>
    `
  },
  contact: {
    title: 'Contact',
    color: 'primary',
    content: `
      <h4>Customer Numbers</h4>
      <ul>
        <li>Main IVR: <span class="copyable-phone" title="Click to copy">866-329-9593</span> (Spanish: option 2)</li>
        <li>Customer Service: <span class="copyable-phone" title="Click to copy">800-477-5050</span> (Option 3 for Billing)</li>
        <li>Hours: Mon-Fri 7:00am to 6:00pm EDT.</li>
      </ul>
      <h4>Escalation</h4>
      <div class="table-container">
        <table>
          <tbody>
            <tr>
              <td><strong>Customer Concerns</strong><br><small>Service start/stop, billing, payment arrangements, etc.</small></td>
              <td>Transfer to Customer Service: <strong>800-477-5050</strong></td>
            </tr>
            <tr>
              <td><strong>Biller Problems</strong><br><small>Unresolved issues with TL approval.</small></td>
              <td>Escalate to SLA Biller: <a href="mailto:cemisupport@paymentus.com">cemisupport@paymentus.com</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },
  technical: {
    title: 'Technical',
    color: 'secondary',
    content: `
      <h4>System Details</h4>
      <ul>
        <li><strong>TLA:</strong> CEMI</li>
        <li><strong>Data Center:</strong> DCS2</li>
        <li><strong>Biller's Website:</strong> <a href="https://consumersenergy.com" target="_blank" rel="noopener noreferrer">consumersenergy.com</a></li>
        <li><strong>Account #:</strong> 12 digits long, usually starts with "1000..." or "1030...". Appliance plans start with "3000...".</li>
        <li><strong>Account Validation:</strong> Real time CIF</li>
      </ul>
      <h4>Merchant IDs (MAIDs)</h4>
      <div class="table-container">
        <table>
          <thead><tr><th>MAID Description</th><th>ID(s)</th></tr></thead>
          <tbody>
            <tr><td>CEMI IVR Energy Card Pmt Resi 406315</td><td>CEMI</td></tr>
            <tr><td>CEMI IVR Energy Card Pmt Comm 406316</td><td>CEM1</td></tr>
            <tr><td>CEMI PON ENERGY Card Pmt Resi 406317</td><td>CEM2</td></tr>
            <tr><td>CEMI Pon Energy Card Pmt Comm 406318</td><td>CEM3; CEM4</td></tr>
          </tbody>
        </table>
      </div>
      <h4>Payment Method Return Codes (RT CIF)</h4>
      <div class="table-container">
        <table>
          <thead><tr><th>Code</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr><td><strong>DC</strong></td><td>Allows all payment methods</td></tr>
            <tr><td><strong>CC</strong></td><td>Allows credit and debit cards only</td></tr>
            <tr><td><strong>DD</strong></td><td>Allows e-check only</td></tr>
            <tr><td><strong>CO</strong></td><td>Blocks all payment methods</td></tr>
          </tbody>
        </table>
      </div>
    `
  }
};