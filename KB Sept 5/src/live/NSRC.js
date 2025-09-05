/**
 * BILLER DATA: NSRC - NiSource
 * ==================
 * This file contains the detailed, categorized notes for NSRC (NiSource).
 * It uses a state-centric data structure to power an interactive State Selector in the UI.
 */

const NSRC_NOTES = {
  // Global alert applicable to all NiSource entities
  alert: {
    title: 'Alert',
    color: 'danger',
    content: `
      <h4>Important Account Alerts</h4>
      <ul>
        <li><strong>NSF Block:</strong> If an account has an "NSF Block" message in the Agent Dashboard, eCheck cannot be processed for that account. Only Credit/Debit card payments are options via IVR or ROTP until this is resolved.</li>
        <li><strong>Recent Payment Alert:</strong> A popup will appear in AD if an account has a recent payment (accepted or declined). Confirm with the customer if they wish to proceed to avoid a duplicate payment.</li>
      </ul>
    `
  },
  // State-specific information. The UI will use this to generate interactive tabs.
  states: {
    oh: {
      name: "Ohio",
      website: "https://www.columbiagasohio.com/",
      account_format: "15-digit (DIS)",
      content: `
        <h5>Ohio Fees & Contact</h5>
        <div class="table-container">
          <table>
            <thead><tr><th>Business Type</th><th>Fee</th><th>IVR #</th><th>Customer Service #</th></tr></thead>
            <tbody>
              <tr><td>Residential</td><td>$2.00</td><td><span class="copyable-phone">866-694-1828</span></td><td><span class="copyable-phone">800-344-4077</span></td></tr>
              <tr><td>Commercial</td><td>$2.00</td><td><span class="copyable-phone">866-694-1828</span></td><td><span class="copyable-phone">800-344-4077</span></td></tr>
              <tr><td>New Business</td><td>$1.75</td><td><span class="copyable-phone">866-257-3030</span></td><td><span class="copyable-phone">800-440-6111</span></td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    in: {
      name: "NIPSCO (IN)",
      website: "https://www.nipsco.com/",
      account_format: "10-digit (CIS)",
      content: `
        <h5>NIPSCO (Indiana) Fees & Contact</h5>
        <div class="table-container">
          <table>
            <thead><tr><th>Business Type</th><th>Fee</th><th>IVR #</th><th>Customer Service #</th></tr></thead>
            <tbody>
              <tr><td>Residential / Commercial</td><td>$2.00</td><td><span class="copyable-phone">855-763-6277</span></td><td><span class="copyable-phone">800-464-7726</span></td></tr>
              <tr><td>New Business</td><td>$2.50</td><td>-</td><td>-</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    pa: {
      name: "Pennsylvania",
      website: "https://www.columbiagaspa.com/",
      account_format: "15-digit (DIS)",
      content: `
        <h5>Pennsylvania Fees & Contact</h5>
        <div class="table-container">
          <table>
            <thead><tr><th>Business Type</th><th>Fee</th><th>IVR #</th><th>Customer Service #</th></tr></thead>
            <tbody>
              <tr><td>Residential</td><td>Absorbed</td><td><span class="copyable-phone">866-694-1828</span></td><td><span class="copyable-phone">888-460-4332</span></td></tr>
              <tr><td>Commercial</td><td>$2.00</td><td><span class="copyable-phone">866-694-1828</span></td><td><span class="copyable-phone">888-460-4332</span></td></tr>
              <tr><td>New Business</td><td>Absorbed</td><td><span class="copyable-phone">866-285-2984</span></td><td><span class="copyable-phone">800-440-6111</span></td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    va: {
      name: "Virginia",
      website: "https://www.columbiagasva.com/",
      account_format: "15-digit (DIS)",
      content: `
        <h5>Virginia Fees & Contact</h5>
        <div class="table-container">
          <table>
            <thead><tr><th>Business Type</th><th>Fee</th><th>IVR #</th><th>Customer Service #</th></tr></thead>
            <tbody>
              <tr><td>Residential</td><td>Absorbed</td><td><span class="copyable-phone">866-694-1828</span></td><td><span class="copyable-phone">800-543-8911</span></td></tr>
              <tr><td>Commercial</td><td>$2.00</td><td><span class="copyable-phone">866-694-1828</span></td><td><span class="copyable-phone">800-543-8911</span></td></tr>
              <tr><td>New Business</td><td>Absorbed</td><td><span class="copyable-phone">866-331-1691</span></td><td><span class="copyable-phone">800-440-6111</span></td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    ky: {
      name: "Kentucky",
      website: "https://www.columbiagasky.com/",
      account_format: "15-digit (DIS)",
      content: `
        <h5>Kentucky Fees & Contact</h5>
        <div class="table-container">
          <table>
            <thead><tr><th>Business Type</th><th>Fee</th><th>IVR #</th><th>Customer Service #</th></tr></thead>
            <tbody>
              <tr><td>Residential</td><td>$2.00</td><td><span class="copyable-phone">866-694-1828</span></td><td><span class="copyable-phone">800-432-9345</span></td></tr>
              <tr><td>Commercial</td><td>$2.00</td><td><span class="copyable-phone">866-694-1828</span></td><td><span class="copyable-phone">800-432-9345</span></td></tr>
              <tr><td>New Business</td><td>$2.00</td><td><span class="copyable-phone">866-276-2492</span></td><td><span class="copyable-phone">800-440-6111</span></td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    md: {
      name: "Maryland",
      website: "https://www.columbiagasmd.com/",
      account_format: "15-digit (DIS)",
      content: `
        <h5>Maryland Fees & Contact</h5>
        <div class="table-container">
          <table>
            <thead><tr><th>Business Type</th><th>Fee</th><th>IVR #</th><th>Customer Service #</th></tr></thead>
            <tbody>
              <tr><td>Residential</td><td>Absorbed</td><td><span class="copyable-phone">866-694-1828</span></td><td><span class="copyable-phone">888-460-4332</span></td></tr>
              <tr><td>Commercial</td><td>$1.75</td><td><span class="copyable-phone">866-694-1828</span></td><td><span class="copyable-phone">888-460-4332</span></td></tr>
              <tr><td>New Business</td><td>Absorbed</td><td><span class="copyable-phone">866-284-7789</span></td><td><span class="copyable-phone">800-440-6111</span></td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    ma: {
      name: "Massachusetts",
      website: "https://www.columbiagasma.com/",
      account_format: "10-digit (CIS)",
      content: `
        <h5>Massachusetts Fees & Contact</h5>
        <div class="table-container">
          <table>
            <thead><tr><th>Business Type</th><th>Fee</th><th>IVR #</th><th>Customer Service #</th></tr></thead>
            <tbody>
              <tr><td>Residential / Commercial</td><td>$1.75</td><td><span class="copyable-phone">855-597-3376</span></td><td><span class="copyable-phone">800-688-6160</span></td></tr>
              <tr><td>New Business</td><td>$2.50</td><td><span class="copyable-phone">866-415-0199</span></td><td><span class="copyable-phone">888-630-4270</span></td></tr>
            </tbody>
          </table>
        </div>
      `
    }
  },
  general_info: {
    title: 'General Info',
    color: 'success',
    content: `
      <h4>General Payment Methods & Limits</h4>
      <p>These apply to most NiSource entities unless specified otherwise in the state details.</p>
      <ul>
        <li><strong>Accepted MOPs:</strong>
            <span class="payment-logo visa"></span><span class="payment-logo mastercard"></span><span class="payment-logo discover"></span><span class="payment-logo amex"></span>
            <span class="payment-logo ach"></span>
            <span class="payment-logo paypal"></span><span class="payment-logo paypal-credit"></span>
            <span class="payment-logo amazon-pay"></span><span class="payment-logo venmo"></span>
        </li>
        <li><strong>Payment Limits:</strong>
            <ul>
                <li><strong>$750</strong> for existing business (Credit/Debit)</li>
                <li><strong>$99,999</strong> for existing business (ACH)</li>
                <li><strong>$2,000</strong> for new business (All MOPs)</li>
            </ul>
        </li>
        <li><strong>Velocity Limits:</strong> Max 3 payments per MOP in 5 days, and max 5 payments per MOP in 30 days. After 3 declines on an account, no more payments can be made on that account for a period.</li>
      </ul>
    `
  },
  procedures: {
    title: 'Procedures',
    color: 'info',
    content: `
      <h4>Agent Dashboard Payment Process (OPP)</h4>
      <div class="accordion">
        <button class="accordion-header">Account Validation Steps</button>
        <div class="accordion-content">
          <p>NSRC uses a One Page Payment (OPP) screen in AD. Validation depends on the account number format.</p>
          <h5>If Account # is 15 digits (DIS):</h5>
          <ul>
            <li>If found in CIF file, the name will auto-populate. Confirm with customer and proceed.</li>
            <li>If not found, but format is correct, you must manually select the DIS state the account belongs to.</li>
          </ul>
          <h5>If Account # is 10 digits (CIS):</h5>
          <ul>
            <li>These accounts are not validated against a CIF file.</li>
            <li>You must manually select the payment type based on the customer's state (IN or MA).</li>
          </ul>
        </div>
      </div>
    `
  },
  technical: {
    title: 'Technical',
    color: 'secondary',
    content: `
      <h4>System Details</h4>
      <ul>
        <li><strong>TLA:</strong> NSRC</li>
        <li><strong>Data Center:</strong> IPN2</li>
        <li><strong>System Type:</strong> CIF</li>
        <li><strong>Portals:</strong> SSO AD, ROTP, SSO CP, IVR</li>
      </ul>
      <h4>ROTP URLs</h4>
      <p>Production ROTP links vary by state. The format is: <code>https://ipn2.paymentus.com/rotp/nsrc?pt=[ID]</code></p>
      <ul>
        <li><strong>Pennsylvania ID:</strong> ColumbiaGasPA</li>
        <li><strong>Virginia ID:</strong> ColumbiaGasVA</li>
        <li><strong>Kentucky ID:</strong> ColumbiaGasKY</li>
        <li><strong>Ohio ID:</strong> ColumbiaGasOH</li>
        <li><strong>Maryland ID:</strong> ColumbiaGasMD</li>
        <li><strong>Massachusetts ID:</strong> ColumbiaGasMA</li>
        <li><strong>Indiana ID:</strong> NIPSCO</li>
      </ul>
    `
  }
};