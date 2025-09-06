/**
 * DALLAS COUNTY TAX OFFICE (DCN3) NOTES
 * ==================
 * This file contains the detailed notes for the Dallas County Tax Office.
 * It is structured with a high-visibility Scripts tab that displays all
 * mandatory scripts openly for immediate agent access.
 */

const DCN3_NOTES = {
  scripts: {
    title: 'Scripts',
    color: 'warning',
    content: `
      <h4>Opening Script</h4>
      <blockquote>
        <p>"Thank you for calling Dallas County Tax Office bill payment system Paymentus, my name is <code>&lt;Agent_first_name&gt;</code>. How may I assist you today?"</p>
        <hr>
        <p><em><small>"Gracias por llamar al sistema de pago de facturas de la Oficina de Impuestos de Dallas County, Paymentus. Mi nombre es <code>&lt;primer_nombre_del_agente&gt;</code>. ¿Cómo lo puedo asistir hoy?"</small></em></p>
      </blockquote>
      
      <h4>ACH Payment Disclosure</h4>
      <blockquote>
        <p>"(Customer Name), I need to confirm that today, (today's date), you are authorizing a one-time payment to Dallas County. Paymentus will debit your bank account number ending with (last 4 digits of the account number) for $XXX.XX. Your payment will be processed on (date of payment). Do I have your permission to process the payment?"</p>
        <hr>
        <p><em><small>"(Nombre del Cliente), Necesito confirmar que hoy (fecha de hoy), está autorizando un pago único a Dallas County. Paymentus va a debitar su número de cuenta que termina en (los últimos 4 dígitos del número de cuenta) por el monto de $XXX.XX. Su pago será procesado en ó después de (fecha del pago). ¿Tengo su permiso para procesar el pago?"</small></em></p>
      </blockquote>

      <h4>Card Payment Disclosure</h4>
      <blockquote>
        <p>"(Customer Name), I need to confirm that today, (today's date), you are authorizing a one-time payment to Dallas County. Paymentus will debit your CC/DC number ending with (last 4 digits of the card) for $XXX.XX, including a fee of $X.XX. Your payment will be processed immediately. Do I have your permission to process the payment?"</p>
        <hr>
        <p><em><small>"(Nombre del Cliente), Necesito confirmar que hoy (fecha de hoy), está autorizando un pago único a Dallas County. Paymentus va a debitar su (tarjeta de debito/credito) que termina en (los últimos 4 dígitos de la tarjeta) por el monto de $XXX.XX, incluyendo un cargo de procesamiento de $X.XX. Su pago sera procesado en ó después de (fecha del pago). ¿Tengo su permisso para procesar el pago?"</small></em></p>
      </blockquote>
      
      <h4>Email Receipt Requirement & Script</h4>
      <blockquote>
        <p><strong>It is required that agents ask each customer if they would like an emailed receipt. The email field is a mandatory field.</strong></p>
        <p>Script: "Would you like to receive an emailed receipt for today's payment?"</p>
        <ul>
            <li>If the customer wants a receipt, enter their email address.</li>
            <li>If the customer refuses or does not want a receipt, you <strong>must</strong> enter <code>noreply@dallascounty.org</code> in the email field.</li>
        </ul>
      </blockquote>

      <h4>Closing Script</h4>
      <blockquote>
        <p>"Thank you for calling Paymentus, on behalf of Dallas County", "Have a nice day."</p>
        <hr>
        <p><em><small>"Gracias por llamar a Paymentus de parte de Dallas County", "Que tenga un buen día"</small></em></p>
      </blockquote>
    `
  },
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <h4>Live Payments Status</h4>
      <p>We will resume taking live payments for Dallas County (TLA DCN3) starting <strong>July 15, 2025</strong>.</p>
      
      <h4>No Self-Service IVR</h4>
      <p>There is no self-service Paymentus IVR for customers. If a customer asks, you can inform them that they can call <span class="copyable-phone">(800) 831-3147</span> to make a future payment, but this is not a Paymentus number and should not be used for transfers.</p>
      
      <h4>Call Whisper</h4>
      <p>Incoming calls for this biller will play a whisper sound indicating that it is a "Dallas County" call. Spanish calls will say "Dallas County Spanish".</p>
    `
  },
  fees: {
    title: 'Fees & Payments',
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
                    <td><strong>Debit Card</strong> <small>(Visa, Mastercard, Discover)</small></td>
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
      
      <h4>Payment Maximums</h4>
      <p>The maximum payment amount for Property Tax via ACH is <strong>$7,000,000</strong>.</p>
      
      <h4>Tax Account Lookup</h4>
      <p>To help a customer find their Property Tax Account # or amount due, use the official lookup tool:</p>
      <ul>
          <li><a href="https://www.dallasact.com/act_webdev/dallas/index.jsp" target="_blank" rel="noopener noreferrer">Dallas County Tax Lookup Portal</a></li>
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
            <li>ROTP (Pay by Text)</li>
        </ul>
        
        <h4>System Features Not Available</h4>
        <ul>
            <li>Scheduled (Autopay) Payments</li>
            <li>Future-Dated Payments</li>
            <li>E-Bill</li>
        </ul>
        
        <h4>Processor</h4>
        <p>Paymentech</p>

        <h4>Escalation</h4>
        <p>Follow standard Tier 2 escalation procedures for any unresolved biller-side issues that require TL approval.</p>
      `
  }
};