/**
 * PUGET SOUND ENERGY (PSE) NOTES
 * ==================
 * This file contains the detailed notes for Puget Sound Energy.
 * It is structured according to the standardized notes format, with a critical
 * alert regarding IVR transfers.
 */

const PSE_NOTES = {
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <h4>IVR Transfers Prohibited</h4>
      <blockquote>
        <p>You <strong>must not</strong> transfer customers directly to the production IVR. The customer must go through the main PSE Customer Service line to be validated before they can make a payment.</p>
        <p>If a customer needs to make a payment via the regular IVR, please transfer them to PSE Customer Service at <span class="copyable-phone">1-888-225-5773</span>.</p>
      </blockquote>
    `
  },
  fees: {
    title: 'Fees & Payments',
    color: 'success',
    content: `
      <h4>Fee Structure & Payment Limits</h4>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Customer Type</th>
              <th>Fee Details</th>
              <th>Maximum Payment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Residential & Small Business</strong>
              </td>
              <td>
                All fees are <strong>Absorbed</strong> by the biller for all payment methods (Card, Bank, PayPal).
              </td>
              <td>
                <strong>$1,100.00</strong> per payment.
              </td>
            </tr>
            <tr>
              <td>
                <strong>Commercial</strong>
              </td>
              <td>
                <ul>
                  <li><strong>Via Agent/IVR:</strong> All fees are <strong>Absorbed</strong>.</li>
                  <li><strong>Online/Scheduled:</strong> A <strong>2.65%</strong> fee applies to Credit/Debit Card payments. Bank payments are absorbed.</li>
                </ul>
              </td>
              <td>
                <strong>$20,000.00</strong> per payment.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p><strong>Note:</strong> Multiple payments are permitted for all customer types.</p>
      <h4>Accepted Payment Methods</h4>
      <ul>
        <li><strong>Residential/Small Business:</strong> Debit Card, Credit Card, Bank Account, PayPal, PayPal Credit.</li>
        <li><strong>Commercial:</strong> Debit Card, Credit Card, Bank Account.</li>
      </ul>
    `
  },
  contact: {
    title: 'Contact',
    color: 'info',
    content: `
      <h4>Customer Service</h4>
      <ul>
        <li><strong>Phone:</strong> <span class="copyable-phone">1-888-225-5773</span> (Spanish: option 3)</li>
        <li><strong>Hours:</strong> Monday - Friday, 7:30 AM to 6:30 PM PDT</li>
      </ul>
    `
  },
  system: {
      title: 'System & Escalation',
      color: 'secondary',
      content: `
        <h4>System Details</h4>
        <ul>
            <li><strong>System Type:</strong> Real-time CIF, Real-time posting, batch CIF</li>
            <li><strong>CIS:</strong> SAP</li>
            <li><strong>Scheduled Payments:</strong> Yes</li>
            <li><strong>E-Bill:</strong> No</li>
            <li><strong>Cut-off Time:</strong> 5:00 p.m. PST</li>
        </ul>
        <h4>ROTP Link</h4>
        <ul>
          <li><a href="https://ipn2.paymentus.com/rotp/pse/itok=" target="_blank" rel="noopener noreferrer">https://ipn2.paymentus.com/rotp/pse/itok=</a></li>
        </ul>
        <h4>Escalation Procedures</h4>
        <ul>
            <li><strong>Customer Concerns</strong> (bill amount, payment plans, etc.): Transfer to Customer Service.</li>
            <li><strong>Biller Problems:</strong> Escalate to Tier 2 with TL approval.</li>
            <li><strong>Escalation Email:</strong> <a href="mailto:psesupport@paymentus.com">psesupport@paymentus.com</a></li>
        </ul>
      `
  },
  additionalInfo: {
    title: 'Additional Information',
    color: 'secondary',
    content: `
      <h4>Velocity Limits</h4>
      <ul>
        <li>Limit of <strong>3</strong> payments to the same billing account in a single day.</li>
        <li>Limit of <strong>2</strong> payments from the same VISA credit card for <strong>Residential</strong> accounts in a single day.</li>
        <li>Limit of <strong>4</strong> payments from the same VISA credit card for <strong>Commercial</strong> accounts in a single day.</li>
      </ul>
      <h4>Go Live Date</h4>
      <p>November 6, 2020</p>
    `
  }
};