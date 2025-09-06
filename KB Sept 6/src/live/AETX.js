/**
 * AUSTIN ENERGY (AETX) NOTES
 * ==================
 * This file contains the detailed notes for Austin Energy.
 * It is structured according to the standardized notes format, with a critical
 * alert regarding fees on split scheduled payments.
 */

const AETX_NOTES = {
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <h4>Split Scheduled Payments & Fees</h4>
      <blockquote>
        <p><strong>IMPORTANT:</strong> Scheduled payments that exceed the maximum payment amount ($1,000 for Residential) will be automatically <strong>split into multiple transactions</strong>.</p>
        <p>A separate convenience fee is charged for <strong>EACH</strong> of these split payments. You must inform customers of this when they set up large scheduled payments to avoid confusion.</p>
      </blockquote>
      <ul>
        <li>Always confirm the customer is making a payment with <strong>Austin Energy / City of Austin</strong> before processing.</li>
        <li>It is <strong>mandatory</strong> to enter a valid customer phone number when processing payments. Do not enter a Paymentus phone number.</li>
      </ul>
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
              <th>Fee</th>
              <th>Maximum Payment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Residential</strong>
              </td>
              <td>
                $2.79
              </td>
              <td>
                $1,000.00 per transaction.
              </td>
            </tr>
            <tr>
              <td>
                <strong>Commercial</strong>
              </td>
              <td>
                $8.95
              </td>
              <td>
                $800.00 per transaction.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p><strong>Note on Autopay:</strong> For residential autopay, a convenience fee is charged for each incremental $1,000. For example, a $2,000 payment would be split into two transactions, each incurring a $2.79 fee.</p>
    `
  },
  contact: {
    title: 'Contact',
    color: 'info',
    content: `
      <h4>Customer Service</h4>
      <ul>
        <li><strong>Phone:</strong> <span class="copyable-phone">512-494-9400</span> (Spanish: option 2)</li>
        <li><strong>Hours of Operation:</strong>
            <ul>
                <li>Mon - Fri: 7:00 AM to 9:00 PM CST</li>
                <li>Sat: 9:00 AM to 1:00 PM CST</li>
            </ul>
        </li>
      </ul>
    `
  },
  system: {
      title: 'System & Escalation',
      color: 'secondary',
      content: `
        <h4>Payment Channels</h4>
        <ul>
            <li>Web, ROTP (Pay by Text), OTP (One-Time Payment)</li>
            <li>Scheduled & Autopay</li>
            <li>AD (Agent Dashboard), IVR</li>
        </ul>
        <h4>Advanced Payment Methods</h4>
        <ul>
            <li>PayPal</li>
            <li>PayPal Credit</li>
            <li>Venmo</li>
            <li>Amazon Pay</li>
        </ul>
        <h4>Processor</h4>
        <p>Braintree</p>
        <h4>Escalation</h4>
        <p>Follow standard Tier 2 escalation procedures for any unresolved biller-side issues that require TL approval.</p>
      `
  }
};