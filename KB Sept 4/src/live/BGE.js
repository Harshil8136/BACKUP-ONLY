/**
 * BILLER DATA: BGE
 * ==================
 * This file contains the detailed, categorized notes for BGE.
 * The content is formatted in HTML for direct rendering.
 */

const BGE_NOTES = {
  alert: {
    title: 'Alert',
    color: 'danger',
    content: `
      <h4>CSR Alert</h4>
      <p>Confirm the customer is making a payment with BGE before processing a payment.</p>
      <ul>
        <li>For <strong>BGE Salesforce cases</strong>, the Account Name should be "Exelon".</li>
        <li>For <strong>BGEH (Constellation Home, formerly BGE Home)</strong>, the Account Name is "Constellation Home", NOT "Exelon".</li>
        <li><strong>Important:</strong> BGE Utility and BGE Home are two different companies.</li>
      </ul>
      <h4>Negative File</h4>
      <p>Do not mention to the end users or to the biller that an account is blocked in the negative file.</p>
    `
  },
  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <h4>New Fee and Surcharge Structure - Effective September 16, 2024</h4>
      <p>The following rates apply to payments. To avoid fees, the caller can use ACH (bank payment).</p>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th colspan="2">Payment Type</th>
              <th>Fee</th>
              <th>Maximum Payment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="4"><strong>RESIDENTIAL</strong></td>
              <td>Consumer Debit Card <span class="payment-logo visa"></span><span class="payment-logo mastercard"></span></td>
              <td>$2.30</td>
              <td>$5,000.00</td>
            </tr>
            <tr>
              <td>Consumer Credit Card <span class="payment-logo visa"></span><span class="payment-logo mastercard"></span><span class="payment-logo discover"></span><span class="payment-logo amex"></span></td>
              <td>$2.30</td>
              <td>$5,000.00</td>
            </tr>
            <tr>
              <td>Commercial Credit Card <span class="payment-logo visa"></span><span class="payment-logo mastercard"></span><span class="payment-logo amex"></span></td>
              <td>2.60% of payment</td>
              <td>$100,000.00</td>
            </tr>
             <tr>
              <td>ACH / Bank (Checking, Savings)</td>
              <td>No Fee for registered, $2.30 for one-time payment</td>
              <td>$100,000.00</td>
            </tr>
            <tr>
              <td rowspan="2"><strong>COMMERCIAL</strong></td>
              <td>Credit Card <span class="payment-logo visa"></span><span class="payment-logo mastercard"></span><span class="payment-logo discover"></span><span class="payment-logo amex"></span></td>
              <td>2.60% of payment</td>
              <td>$100,000.00</td>
            </tr>
            <tr>
              <td>Bank (Checking, Savings)</td>
              <td>No Fee</td>
              <td>$500,000.00</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4>Card Rules</h4>
      <p>The card issuer (not Paymentus) identifies if a card is consumer or commercial. If a Residential customer's card is identified as "Commercial," ask if they would like to use a different payment method.</p>
    `
  },
  account: {
    title: 'Acct. Info',
    color: 'info',
    content: `
      <h4>Account Validation</h4>
      <p>If a customer does not want to provide a phone number, please leave the phone number field blank. Do not enter a Paymentus phone number at any time.</p>
      <h4>Account Balance</h4>
      <p>If the balance shows as <strong>$9,999.99</strong>, we do not know the customer's actual account balance. We can still process a payment. If the customer needs to know their balance, they must be transferred to the biller.</p>
      <h4>Auto Pay</h4>
      <p>Paymentus CSRs DO NOT assist BGE customers in setting up Auto Pay. Refer them to their online portal.</p>
    `
  },
  contact: {
    title: 'Contact',
    color: 'primary',
    content: `
      <h4>IVR Numbers</h4>
      <ul>
        <li>Main IVR: <span class="copyable-phone" title="Click to copy">1-833-254-9875</span> (Spanish: option 2)</li>
        <li>Alternate IVR: <span class="copyable-phone" title="Click to copy">1-833-209-5245</span> (Spanish: option 2)</li>
        <li>BGE Agent Only: <span class="copyable-phone" title="Click to copy">1-833-254-9877</span> (Spanish: option 2)</li>
      </ul>
      <h4>Customer Service</h4>
      <ul>
        <li>Main Customer Service: <span class="copyable-phone" title="Click to copy">1-800-685-0123</span> (option 4)</li>
        <li>Business Customers: <span class="copyable-phone" title="Click to copy">1-800-265-6177</span></li>
        <li>Hours: Mon-Fri 7:00am to 7:00pm EST</li>
      </ul>
      <h4>Emergency Numbers (24/7)</h4>
      <ul>
        <li>Gas Emergency: <span class="copyable-phone" title="Click to copy">1-877-778-7798</span></li>
        <li>Power Lines Down: <span class="copyable-phone" title="Click to copy">1-877-778-2222</span></li>
      </ul>
       <h4>Escalation</h4>
      <p>Customer problems like service start/stop or billing discrepancies should be transferred. Biller issues that cannot be resolved should be escalated to T2 upon TL approval.</p>
    `
  },
  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4>Technical Details</h4>
      <ul>
        <li><strong>Data Center:</strong> IPN2</li>
        <li><strong>Biller's Website:</strong> <a href="https://www.bge.com" target="_blank" rel="noopener noreferrer">www.bge.com</a></li>
        <li><strong>Account # Format:</strong> 10 digits</li>
        <li><strong>Merchant IDs (MAIDs):</strong> BaltimoreGasandElectricCompany, BaltimoreGasand Electric Company_5, BaltimoreGasandElectricCompany_6</li>
      </ul>
      <h4>Customer Portal (CP)</h4>
      <p>The customer portal is currently non-functioning. As a result, we are unable to reset customer passwords.</p>
      <h4>Payment Types</h4>
      <ul>
        <li>Residential</li>
        <li>Small Commercial</li>
        <li>Medium or Large Commercial</li>
        <li>New Business</li>
        <li>Fuel Fund Donations (via XOTP Channel only)</li>
      </ul>
    `
  }
};