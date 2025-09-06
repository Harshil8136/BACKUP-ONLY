/**
 * TARRANT COUNTY, TX (TGXH) NOTES
 * ==================
 * This file contains the detailed notes for Tarrant County, TX.
 * It is structured with a high-visibility Scripts tab to meet agent needs
 * and follows the standardized notes format.
 */

const TGXH_NOTES = {
  scripts: {
    title: 'Scripts',
    color: 'warning',
    content: `
      <p>The following scripts are <strong>required</strong> for all calls.</p>
      <div class="accordion">
        <button class="accordion-header">Opening Script</button>
        <div class="accordion-content">
            <p>"Thank you for calling Tarrant County Tax Office bill payment system Paymentus, my name is <code>&lt;Agent_first_name&gt;</code>. How may I assist you today?"</p>
            <hr>
            <p><em><small>"Gracias por llamar al sistema de pago de facturas de la Oficina de Impuestos de Tarrant County, Paymentus. Mi nombre es <code>&lt;primer_nombre_del_agente&gt;</code>. ¿Cómo lo puedo asistir hoy?"</small></em></p>
        </div>
      </div>
      <div class="accordion">
        <button class="accordion-header">ACH Payment Disclosure</button>
        <div class="accordion-content">
            <p>"(Customer Name), I need to confirm that today, (today's date), you are authorizing a one-time payment to Tarrant County. Paymentus will debit your bank account number ending with (last 4 digits of the account number) for $XXX.XX. Your payment will be processed on (date of payment). Do I have your permission to process the payment?"</p>
            <hr>
            <p><em><small>"(Nombre del Cliente), Necesito confirmar que hoy (fecha de hoy), está autorizando un pago único a Tarrant County. Paymentus va a debitar su número de cuenta que termina en (los últimos 4 dígitos del número de cuenta) por el monto de $XXX.XX. Su pago será procesado en ó después de (fecha del pago). ¿Tengo su permiso para procesar el pago?"</small></em></p>
        </div>
      </div>
      <div class="accordion">
        <button class="accordion-header">Card Payment Disclosure</button>
        <div class="accordion-content">
            <p>"(Customer Name), I need to confirm that today, (today's date), you are authorizing a one-time payment to Tarrant County. Paymentus will debit your CC/DC account number ending with (last 4 digits of the card) for $XXX.XX, including a convenience fee of $X.XX. Your payment will be processed on (date of payment). Do I have your permission to process the payment?"</p>
            <hr>
            <p><em><small>"(Nombre del Cliente), necesito confirmar que hoy (fecha de hoy), está autorizando un pago único a Tarrant County. Paymentus va a debitar su (tarjeta de debito/credito) que termina en (los últimos 4 dígitos de la tarjeta) por el monto de $XXX.XX, incluyendo un cargo de procesamiento de $X.XX. Su pago sera procesado en ó después de (fecha del pago). ¿Tengo su permisso para procesar el pago?"</small></em></p>
        </div>
      </div>
      <div class="accordion">
        <button class="accordion-header">Closing Script</button>
        <div class="accordion-content">
            <p>"Thank you for calling Paymentus, on behalf of Tarrant County", "Have a nice day."</p>
            <hr>
            <p><em><small>"Gracias por llamar a Paymentus de parte de Tarrant County", "Que tenga un buen día"</small></em></p>
        </div>
      </div>
    `
  },
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <h4>Name Field Correction (Required)</h4>
      <p>When you look up an account, the customer's full name (e.g., "SLATON GREGORY M") will appear in the "First Name" field.</p>
      <ol>
        <li>You <strong>must</strong> cut the last name (e.g., "SLATON") from the "First Name" field.</li>
        <li>Paste the last name into the "Last Name" field.</li>
        <li>Ensure the remaining name in the "First Name" field is correct (e.g., "GREGORY M").</li>
      </ol>
      <h4>Payer Information (Required)</h4>
      <p>The correct name, full address, and phone number of the caller (Payer) are required. If the address does not populate automatically, you must enter it manually.</p>
      <h4>Payment Type</h4>
      <p>At this time, we are <strong>only processing PROPERTY TAX payments</strong>.</p>
      <h4>Payment Options Communication</h4>
      <p>Before selecting a payment amount, you <strong>must</strong> communicate all populated options to the customer. These can include:</p>
      <ul>
        <li>Current Due</li>
        <li>Half Amount</li>
        <li>Quarter Amount</li>
        <li>Past Due</li>
        <li>Total Due</li>
      </ul>
    `
  },
  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <h4>Fee Structure</h4>
      <div class="table-container">
          <table>
              <thead>
                  <tr>
                      <th>Payment Method</th>
                      <th>Fee</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td><strong>Debit Card</strong> <small>(Visa, Mastercard)</small></td>
                      <td>$2.95</td>
                  </tr>
                  <tr>
                      <td><strong>Credit Card</strong> <small>(Visa, Mastercard, Discover, AMEX)</small></td>
                      <td>2.15%</td>
                  </tr>
                  <tr>
                      <td><strong>Bank Account (ACH)</strong> <small>(Checking, Savings)</small></td>
                      <td>Absorbed (No Fee)</td>
                  </tr>
              </tbody>
          </table>
      </div>
      <h4>Payment Limits</h4>
      <p>If a customer makes a partial payment, the minimum is <strong>$1.00</strong> and the maximum is <strong>$99,999.00</strong>.</p>
    `
  },
  payments: {
    title: 'Payments',
    color: 'info',
    content: `
      <h4>Mineral Tax Payments</h4>
      <p>Mineral Tax payments can be processed using the Property Tax payment type.</p>
      <ol>
        <li>If the customer provides an <strong>Owner ID</strong>, enter it in the "Reference Number" field.</li>
        <li>If the system does not recognize the Owner ID, try removing the leading zero.</li>
        <li>The payment amount will be for the total of all accounts under that Owner ID.</li>
        <li><strong>Important:</strong> If the system still does not recognize the Owner ID, <strong>DO NOT</strong> transfer to the biller. Instead, process each payment individually using the specific account numbers.</li>
      </ol>
      <h4>Partial Payments</h4>
      <p>If a customer wants to pay an amount that is not one of the pre-populated options (e.g., Current Due, Half Amount), you can enter a custom amount in the "Partial Payment Amount" field.</p>
      <h4>Tax Account Lookup</h4>
      <p>To help a customer find their Property Tax Account # or amount due, use the official lookup tool:</p>
      <ul>
          <li><a href="https://taxonline.tarrantcounty.com/TaxPayer/search" target="_blank" rel="noopener noreferrer">Tarrant County Tax Payer Search</a></li>
      </ul>
    `
  },
  system: {
      title: 'System & Escalation',
      color: 'secondary',
      content: `
        <h4>Payment Channels</h4>
        <ul>
            <li>AD (Agent Dashboard)</li>
            <li>IVR (Interactive Voice Response)</li>
            <li>ROTP (Pay by Text)</li>
        </ul>
        <h4>Agent Dashboard Search Results</h4>
        <p>When searching for payments in the AD, the results are color-coded:</p>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Color</th>
                        <th>Meaning</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><span style="color: red; font-weight: bold;">Red</span></td><td>Declined Payment</td></tr>
                    <tr><td><span style="color: #EBCB8B; font-weight: bold;">Yellow</span></td><td>Voided Payment</td></tr>
                    <tr><td><span style="color: green; font-weight: bold;">Green</span></td><td>Approved Payment</td></tr>
                    <tr><td><span style="color: blue; font-weight: bold;">Blue</span></td><td>Refund</td></tr>
                    <tr><td><span style="color: purple; font-weight: bold;">Purple</span></td><td>Chargeback</td></tr>
                </tbody>
            </table>
        </div>
        <h4>Escalation</h4>
        <p>Follow standard Tier 2 escalation procedures for any unresolved biller-side issues that require TL approval.</p>
      `
  }
};