// const html = emailTemplate('hola', '124')
import mjml2html from 'mjml'

export const textTemplate = (name: string, code: string): string => {
  return `
Hola, ${name}

Tu codigo de verificacion es:
${code}
El codigo expira en 5 minutos, usalo para completar el registro de tu cuenta.
Si no solicitaste este código, puedes ignorar este mensaje.
¡Gracias!
`
}
export const htmlTemplate = (name: string, code: string) => {
  let html = mjml2html(`
<mjml>
  <mj-head>
    <mj-style>
      @import
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
      .btn table{ width: 100%; } .btn a{ width: 100%; padding: 10px 0
      !important;}
    </mj-style>
  </mj-head>
  <mj-body background-color="#1a1928">
    <mj-wrapper padding="20px 20px 200px 20px">
      <mj-section padding="0px" padding-bottom="20px">
        <mj-column width="600px">
        </mj-column>
      </mj-section>
      <mj-section padding="0px">
        <mj-column background-color="#11101f" border-radius="8px">
          <mj-spacer></mj-spacer>
          <mj-text color="#fcfcfc" font-size="26px" font-family="sans-serif">
            Hola, ${name}
          </mj-text>
          <mj-divider border-color="#1d103d"></mj-divider>
          <mj-text
            color="#fcfcfc"
            font-size="20px"
            line-height="24px"
            padding-bottom="0px"
            font-family="sans-serif"
          >
            Tu codigo de verificacion es:
          </mj-text>
          <mj-text
            color="#d50045"
            font-size="26px"
            line-height="38px"
            padding-bottom="20px"
            font-family="sans-serif"
            font-weight='bold'
            text-decoration= "underline"
          >
            ${code}
          </mj-text>
          <mj-text
            color="#fcfcfc"
            font-size="20px"
            line-height="24px"
            font-family="sans-serif"
          >
            El codigo expira en 5 minutos, usalo para completar el registro de tu cuenta.
          </mj-text>
				<mj-text
            color="#fcfcfc"
            font-size="20px"
            line-height="24px"
            font-family="sans-serif"
          >
            Si no solicitaste este código, puedes ignorar este mensaje.
          </mj-text>
          <mj-text
            color="#fcfcfc"
            font-size="20px"
            line-height="24px"
            font-family="sans-serif"
                   padding-bottom="20px"
          >
            ¡Gracias!
          </mj-text>
          <mj-text font-size='16px' align="center" color="#d1d0c5" background-color="#323437">            
					zohora.com
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-wrapper>
  </mj-body>
</mjml>
                       `)
  return String(html.html)
}
