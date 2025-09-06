/**
 * PACIFICORP (PAC) NOTES
 * ==================
 * This file contains the detailed notes for PacifiCorp, which operates as
 * Pacific Power and Rocky Mountain Power. The data is structured for use
 * with the UI_Notes.render() function and follows the new standardized format and tab order.
 */

const PAC_NOTES = {
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <ul>
        <li>CSRs must request the customer's email address when processing a payment.</li>
        <li><strong>Time Zone Awareness:</strong> For case callbacks, please remember that most PacifiCorp customers are in the <strong>Pacific Time Zone</strong> (3 hours behind EST). Avoid calling them too early.</li>
      </ul>
      <div class="accordion">
        <button class="accordion-header">Workaround for Payments Over $999.99</button>
        <div class="accordion-content">
          <p>For CP users who are unable to enter a payment over $999.99, please guide the customer through the following steps:</p>
          <ol>
            <li>Navigate to the correct ROTP (Pay by Text) page:
              <ul>
                <li>Pacific Power: <a href="https://ipn.paymentus.com/rotp/pac?ptGroup=PPL" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/rotp/pac?ptGroup=PPL</a></li>
                <li>Rocky Mountain Power: <a href="https://ipn.paymentus.com/rotp/pac?ptGroup=RMP" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/rotp/pac?ptGroup=RMP</a></li>
              </ul>
            </li>
            <li>Fill out all required customer information.</li>
            <li>Enter the payment amount (e.g., $2,000). The comma will be added automatically.</li>
            <li>Press the <strong>Tab</strong> key, and then immediately press <strong>Shift + Tab</strong>. This will remove the comma from the amount.</li>
            <li>Proceed to fill out the payment method information and click continue.</li>
          </ol>
          <p>Following these steps will prevent an "incorrect amount" error and allow the customer to proceed to the confirmation screen to finish their payment.</p>
        </div>
      </div>
    `
  },
  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <h4>Payment Rules</h4>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Payment Method</th>
              <th>Fee</th>
              <th>Maximum Payment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Credit/Debit Card</strong><br>
                <small>Visa, Mastercard, Discover, AMEX</small>
              </td>
              <td>
                <strong>$1.99</strong> <small>Residential</small><br>
                <strong>$7.99</strong> <small>Commercial</small>
              </td>
              <td>
                <strong>$500.00</strong> <small>Residential</small><br>
                <strong>$2,000.00</strong> <small>Commercial</small>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Bank Account</strong><br>
                <small>Checking, Savings</small>
              </td>
              <td>
                <strong>$1.99</strong> <small>Residential</small><br>
                <strong>$7.99</strong> <small>Commercial</small>
              </td>
              <td>
                <strong>$500.00</strong> <small>Residential</small><br>
                <strong>$2,000.00</strong> <small>Commercial</small>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p><strong>Velocity Limit:</strong> Customers are allowed 5 payments per month.</p>
      <h4>Note About Card Payments</h4>
      <p>Per a biller directive, Debit and Credit cards are treated as a single payment type. The processor determines how the card is treated based on how the issuer coded it. Therefore, you only need to ask the customer if they are paying with a card, not whether it is credit or debit.</p>
    `
  },
  contact: {
    title: 'Contact',
    color: 'info',
    content: `
        <h4>Key Contact Numbers</h4>
        <ul>
            <li><strong>AAIVR (English):</strong> <span class="copyable-phone">855-953-8304</span></li>
            <li><strong>AAIVR (Spanish):</strong> <span class="copyable-phone">855-253-7531</span></li>
        </ul>
        <h4>Escalation Procedures</h4>
        <p>For the following issues, transfer the customer to the biller's main service line at <span class="copyable-phone">888-221-7070</span>:</p>
        <ul>
            <li>Service start/stop</li>
            <li>Payment arrangements</li>
            <li>Billing discrepancies or usage details</li>
        </ul>
        <p>For internal biller-side issues, escalate to Tier 2 upon Team Lead approval. The escalation email is <a href="mailto:pacsupport@paymentus.com">pacsupport@paymentus.com</a>.</p>
    `
  },
  channels: {
    title: 'Channels',
    color: 'info',
    content: `
      <h4>Supported Payment Channels</h4>
      <ul>
        <li>XOTP (Biller's Mobile Site)</li>
        <li>ROTP (Pay by Text)</li>
        <li>IVR (Interactive Voice Response)</li>
        <li>AIVR (Advanced Interactive Voice Response)</li>
      </ul>
      <h4>ROTP Links</h4>
      <ul>
        <li><strong>Pacific Power:</strong> <a href="https://ipn.paymentus.com/rotp/pac?ptGroup=PPL" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/rotp/pac?ptGroup=PPL</a></li>
        <li><strong>Rocky Mountain Power:</strong> <a href="https://ipn.paymentus.com/rotp/pac?ptGroup=RMP" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/rotp/pac?ptGroup=RMP</a></li>
      </ul>
    `
  },
  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <ul>
        <li><strong>Go Live Date:</strong> December 08, 2021</li>
        <li><strong>Processor:</strong> Braintree</li>
        <li><strong>Reconciliation:</strong> Real-time, with hourly and end-of-day payment reconciliation.</li>
        <li><strong>Cutoff Time:</strong> 5:00 p.m. Pacific (8:00 p.m. Eastern)</li>
        <li><strong>Duplicate Payment Logic:</strong> The system presents a soft stop (warning) if the same account number is used for a payment within a <strong>24-hour</strong> period.</li>
        <li><strong>Custom Error Messages:</strong> The biller uses various customized error messages for scenarios like Account/ZIP validation, international accounts, and blocked or suspended accounts.</li>
      </ul>
    `
  }
};