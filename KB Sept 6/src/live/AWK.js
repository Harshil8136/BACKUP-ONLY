/**
 * AMERICAN WATER (AWK) NOTES
 * ==================
 * This file contains the detailed notes for American Water. It uses a stateless
 * structure with a consolidated table for state-specific information, optimized
 * for frequent use and quick access to data.
 */

const AWK_NOTES = {
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <ul>
        <li>Always confirm the customer is with American Water before processing a payment.</li>
        <li><strong>Do Not Transfer Customers:</strong> Provide the correct state-specific customer service number and have the customer call themselves.</li>
        <li>It is <strong>mandatory</strong> to enter a valid customer phone number when processing payments. Do not use a Paymentus number.</li>
        <li>For Illinois customers, if you hear an account prefix of "1099", you should enter "1025".</li>
      </ul>
      <div class="accordion">
        <button class="accordion-header">After-Hours Balance Inquiry Instructions</button>
        <div class="accordion-content">
          <p>This process will only work outside of the biller's business hours. Guide the customer to:</p>
          <ol>
            <li>Call their state-specific Customer Service number.</li>
            <li>Select <strong>Option 2</strong>, then <strong>Option 1</strong>.</li>
            <li>Enter their <strong>12-digit Account Number</strong> (dropping the first 4 digits of their 16-digit number).</li>
            <li>Enter their telephone number.</li>
          </ol>
          <p>The automated system will then provide their account balance.</p>
        </div>
      </div>
    `
  },
  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <h4>General Payment & Fee Rules</h4>
      <ul>
          <li><strong>Fee-Free Option:</strong> Customers can pay by e-check <strong>with no service fee</strong> by logging into their portal at <a href="https://amwater.com/myaccount" target="_blank" rel="noopener noreferrer">amwater.com/myaccount</a>.</li>
          <li><strong>Fee-Based Option:</strong> A <strong>$1.95 service fee</strong> is applied if the customer pays via the direct billpay link at <a href="https://amwater.com/billpay" target="_blank" rel="noopener noreferrer">amwater.com/billpay</a>.</li>
          <li><strong>Payment Limits:</strong> Max payment via Paymentus is <strong>$1,000</strong>. Customers can pay up to <strong>$500,000</strong> via ACH on their myaccount portal.</li>
          <li> There is <strong>no limit</strong> on the number of transactions a customer can make. </li>
      </ul>
      <h4>State Fee Structures</h4>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>State Group</th>
              <th>Fee Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Most States</strong><br>
                <small>CA, HI, IL, IN, IA, KY, MD, MO, NJ, PA, TN, GA, VA, WV</small>
              </td>
              <td>
                <strong>Fee Absorbed by Biller</strong> for Debit, Credit, and Bank payments.
              </td>
            </tr>
            <tr>
              <td>
                <strong>New York</strong><br>
                <small>(Now Liberty Utilities)</small>
              </td>
              <td>
                <strong>$1.95 Fee</strong> for Debit, Credit, and Bank payments.
              </td>
            </tr>
            <tr>
              <td>
                <strong>East Palo Alto, CA</strong><br>
                <small>(Special District)</small>
              </td>
              <td>
                <strong>$1.95 Fee</strong>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },
  contact: {
    title: 'Contact',
    color: 'info',
    content: `
      <h4>State-Specific Contact Information</h4>
      <div class="table-container">
        <table class="state-contact-table">
          <thead>
            <tr>
              <th>State / Company</th>
              <th>Customer Service #</th>
              <th>Account Prefix</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>California</strong></td><td><span class="copyable-phone">(888) 237-1333</span></td><td>1015</td></tr>
            <tr><td><strong>East Palo Alto, CA</strong> (Special)</td><td><span class="copyable-phone">(650) 704-1394</span></td><td>N/A</td></tr>
            <tr><td><strong>Georgia</strong></td><td>See Tennessee</td><td>1026</td></tr>
            <tr><td><strong>Hawaii</strong></td><td><span class="copyable-phone">(888) 237-1333</span></td><td>1030</td></tr>
            <tr><td><strong>Illinois</strong></td><td><span class="copyable-phone">(800) 422-2782</span></td><td>1025</td></tr>
            <tr><td><strong>Indiana</strong></td><td><span class="copyable-phone">(800) 492-8373</span></td><td>1010</td></tr>
            <tr><td><strong>Iowa</strong></td><td><span class="copyable-phone">(866) 641-2108</span></td><td>1011</td></tr>
            <tr><td><strong>Kentucky</strong></td><td><span class="copyable-phone">(800) 678-6301</span></td><td>1012</td></tr>
            <tr><td><strong>Maryland</strong></td><td><span class="copyable-phone">(866) 641-2131</span></td><td>1013</td></tr>
            <tr><td><strong>Missouri</strong></td><td><span class="copyable-phone">(866) 430-0820</span></td><td>1017</td></tr>
            <tr><td><strong>New Jersey</strong></td><td><span class="copyable-phone">(800) 272-1325</span></td><td>1018</td></tr>
            <tr><td><strong>New York</strong> (as Liberty Utilities)</td><td><span class="copyable-phone">(877) 426-6999</span></td><td>1038</td></tr>
            <tr><td><strong>Pennsylvania</strong></td><td><span class="copyable-phone">(800) 565-7292</span></td><td>1024</td></tr>
            <tr><td><strong>Tennessee</strong> (handles Georgia)</td><td><span class="copyable-phone">(866) 736-6420</span></td><td>1026</td></tr>
            <tr><td><strong>Virginia</strong></td><td><span class="copyable-phone">(800) 452-6863</span></td><td>1027</td></tr>
            <tr><td><strong>West Virginia</strong></td><td><span class="copyable-phone">(800) 685-8660</span></td><td>1028</td></tr>
          </tbody>
        </table>
      </div>
    `
  },
  system: {
      title: 'System & Escalation',
      color: 'secondary',
      content: `
        <h4>System Details</h4>
        <ul>
            <li><strong>Processor:</strong> Braintree</li>
            <li><strong>Notifications:</strong> Real-time since August 12, 2022.</li>
            <li><strong>ROTP Link:</strong> <a href="https://ipn.paymentus.com/rotp/awk" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/rotp/awk</a></li>
        </ul>
        <h4>Staged Payments</h4>
        <p>The AWK IVR can stage a payment and transfer the customer to the Paymentus IVR. However, the AWK IVR may quote an overdue amount, while the Paymentus IVR will require the <strong>full balance</strong> to be paid. The regular Paymentus IVR still allows customers to pay a custom amount.</p>
        <h4>Escalation</h4>
        <p>For unresolved biller-side issues, escalate to Tier 2 upon Team Lead approval by emailing <a href="mailto:awksupport@paymentus.com">awksupport@paymentus.com</a>.</p>
      `
  },
  additionalInfo: {
    title: 'Additional Information',
    color: 'secondary',
    content: `
        <h4>MAIDs (Merchant IDs)</h4>
        <p>The system uses numerous state-specific MAIDs for processing. A full chart is available in the legacy knowledge base document if needed for troubleshooting.</p>
        <h4>East Palo Alto (EPA) District</h4>
        <p>The East Palo Alto district in California (TLA: EVKA) is a special case that integrates with American Water but has its own contact information, account format, and fee structure. It should be treated as a distinct entity.</p>
    `
  }
};