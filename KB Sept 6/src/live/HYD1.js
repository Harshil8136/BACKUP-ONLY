/**
 * HYDRO ONE (HYD1 & HYDO) NOTES
 * ==================
 * This file contains the detailed notes for all Hydro One services.
 * It is designed to be loaded for both HYD1 (Electricity) and HYDO (Non-Electricity)
 * billers, with a primary alert to guide agents on how to handle the two types.
 */

const HYD1_NOTES = {
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <h4>Confirm Payment Type First</h4>
      <blockquote>
        <p><strong>This is the most important step for any Hydro One call.</strong> Before asking for an account number, you must determine the type of payment the customer is making.</p>
        <p>Ask the customer: <strong>"What kind of payment are you making today? Is it for your electricity account, or another type of payment?"</strong></p>
      </blockquote>
      <ul>
        <li>If the customer is paying an <strong>Electricity Bill</strong>, proceed with TLA <strong>HYD1</strong>.</li>
        <li>If the customer is paying <strong>any other type of bill or invoice</strong> (Work Order, Real Estate, etc.), proceed with TLA <strong>HYDO</strong>.</li>
      </ul>
      <h4>AD Payment Procedure (HYDO only)</h4>
      <ol>
        <li>On the first screen, enter the <strong>CUSTOMER'S</strong> information, not the Hydro One employee's information.</li>
        <li>On the next screen, select the correct payment type.</li>
        <li>If prompted for "Full Employee Name", use the name of the Hydro One employee calling, not your own name.</li>
      </ol>
    `
  },
  fees: {
    title: 'Fees & Payments',
    color: 'success',
    content: `
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>TLA / Payment Type</th>
              <th>Payment Method</th>
              <th>Fee</th>
              <th>Maximum Payment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>HYD1 (Electricity)</strong>
              </td>
              <td>
                Credit Card <small>(Visa, MC)</small><br>
                Debit Card <small>(Visa, MC)</small><br>
                Interac Online
              </td>
              <td>
                1.75%<br>
                1.50%<br>
                $0.50
              </td>
              <td>
                $10,000
              </td>
            </tr>
            <tr>
              <td>
                <strong>HYDO (Non-Electricity)</strong><br>
                <small>Work Order, Invoice, Real Estate, Net Metering, Employee Phone Expense</small>
              </td>
              <td>
                Credit Card <small>(Visa, MC, AMEX)</small><br>
                Debit Card <small>(Visa, MC)</small>
              </td>
              <td>
                <strong>2.4%</strong> (effective Feb 3, 2025)<br>
                1.50%
              </td>
              <td>
                $100,000
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p><strong>Note:</strong> Multiple payments can be made for both HYD1 and HYDO.</p>
    `
  },
  contact: {
    title: 'Contact',
    color: 'info',
    content: `
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Service Type (TLA)</th>
              <th>IVR #</th>
              <th>Customer Service #</th>
              <th>Hours of Operation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Electricity (HYD1)</strong></td>
              <td><span class="copyable-phone">877-507-5093</span></td>
              <td><span class="copyable-phone">888-664-9376</span></td>
              <td>Mon-Fri, 7:30 AM - 8:00 PM EST</td>
            </tr>
            <tr>
              <td><strong>Non-Electricity (HYDO)</strong></td>
              <td><span class="copyable-phone">866-764-1083</span></td>
              <td><span class="copyable-phone">905-944-3300</span></td>
              <td>Mon-Fri, 8:30 AM - 5:00 PM EST</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4>Decommissioned Numbers</h4>
      <p>Please note that the following old HYD1 customer service numbers have been decommissioned: 844-224-5949, 844-814-7411, 800-294-9376.</p>
    `
  },
  accountInfo: {
    title: 'Account Info',
    color: 'info',
    content: `
      <h4>HYD1 (Electricity) Account Format</h4>
      <ul>
        <li>12-digit account number, beginning with "200...".</li>
      </ul>
      <h4>HYDO (Non-Electricity) Formats</h4>
      <ul>
        <li><strong>Work Order:</strong> 8 digits, beginning with 6.</li>
        <li><strong>Invoice Number:</strong> 10 digits, starting with 3.</li>
        <li><strong>Real Estate:</strong> HONI File Number, e.g., (63#.##-####).</li>
        <li><strong>Employee Phone Expenses:</strong> 10 digits, starting with 4500.</li>
        <li><strong>Purchase Order Number:</strong> 10 digits, starting with 4500 OR the Account Token Field.</li>
        <li><strong>Net Metering / Project:</strong> Several complex patterns, often starting with NM, DER, AP, etc. Match the customer's provided number to the patterns listed in the legacy KB document if needed.</li>
      </ul>
    `
  },
  system: {
      title: 'System & Escalation',
      color: 'secondary',
      content: `
        <h4>Processor</h4>
        <p>Chase Paymentech</p>
        <h4>AD Payments (HYDO)</h4>
        <p>When processing a HYDO payment in the Agent Dashboard:</p>
        <ul>
            <li>The customer's Invoice Number should be entered in the <strong>"Net Metering Number/Project ID"</strong> field.</li>
            <li>This field is validated against the various formats listed in the Account Info tab.</li>
            <li>HYDO payments are for Credit and Debit cards only. <strong>NO ACH</strong>.</li>
        </ul>
        <h4>Escalation</h4>
        <p>Follow standard Tier 2 escalation procedures for any unresolved biller-side issues that require TL approval.</p>
        <h4>ROTP Links</h4>
        <ul>
          <li><strong>HYD1 (French):</strong> <a href="https://ipn.paymentus.com/rotp/hyd1?lang=fr" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/rotp/hyd1?lang=fr</a></li>
          <li><strong>HYDO:</strong> <a href="https://ipn.paymentus.com/rotp/hydo" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/rotp/hydo</a></li>
        </ul>
      `
  }
};