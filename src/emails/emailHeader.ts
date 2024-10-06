// emailHeader.js

const HEADER_IMAGES = {
    welcome: 'https://res.cloudinary.com/dgdx2a9cq/image/upload/v1724319469/Copora_Welcome_Email_Header_jnhbxk.png',
    temporary_work: 'https://res.cloudinary.com/dgdx2a9cq/image/upload/v1724322808/Copora_Onboarding_Email_Template_ihe8rd.png',
    reminder: 'https://res.cloudinary.com/dgdx2a9cq/image/upload/v1724323730/Copora_Onboarding_Complete_Email_Template_l7vj0z.png',
    complete_email: 'https://res.cloudinary.com/dgdx2a9cq/image/upload/v1724323730/Copora_Onboarding_Complete_Email_Template_l7vj0z.png',
    hospitality_temporary_worker: 'https://res.cloudinary.com/dgdx2a9cq/image/upload/v1724322808/Copora_Onboarding_Email_Template_ihe8rd.png',
    contract_temporary_candidate: 'https://res.cloudinary.com/dgdx2a9cq/image/upload/v1724324008/Copora_Contact_Email_Template_e89iff.png',
    contract_permanent_candidate: 'https://res.cloudinary.com/dgdx2a9cq/image/upload/v1724324008/Copora_Contact_Email_Template_e89iff.png',
    contract_client: 'https://res.cloudinary.com/dgdx2a9cq/image/upload/v1724324008/Copora_Contact_Email_Template_e89iff.png',
    others: 'https://res.cloudinary.com/dgdx2a9cq/image/upload/v1724319469/Copora_Welcome_Email_Header_jnhbxk.png'
  };
  
  export function emailHeader(headerType: string | number) {
    const imageUrl = HEADER_IMAGES[headerType] || HEADER_IMAGES['others'];
  
    return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css?family=Inter" rel="stylesheet">
      <link href="https://fonts.cdnfonts.com/css/satoshi" rel="stylesheet">
      <title>Copora</title>
    </head>
  
    <body style="
        font-family: 'Satoshi', sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 14px;
        line-height: 1.4;
        margin: 0;
        padding: 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      ">
    
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="
          border-collapse: separate;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          background-color: #EAF0F3;
          width: 100%;
        " width="100%">
        <tr>
          <td style="font-family: Inter; font-size: 14px; vertical-align: top" valign="top">
            &nbsp;
          </td>
          <td class="container" style="
              font-family: Inter;
              font-size: 14px;
              vertical-align: top;
              display: block;
              max-width: 580px;
              padding: 10px;
              width: 580px;
              margin: 0 auto;
            " width="580" valign="top">
            <div class="content" style="
                box-sizing: border-box;
                display: block;
                margin: 0 auto;
                max-width: 580px;
                padding: 10px;
              ">
              <!-- START CENTERED WHITE CONTAINER -->
              <table role="presentation" class="main" style="
                  border-collapse: separate;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  background: #ffffff;
                  border-radius: 3px;
                  width: 100%;
                " width="100%">
                <!-- START MAIN CONTENT AREA -->
                <tr>
                  <td class="wrapper" style="
                      background-color: #EAF0F3;
                      font-family: Inter;
                      font-size: 14px;
                      vertical-align: top;
                      box-sizing: border-box;
                      border: 0;
                      outline: 0;
                      padding: 20px;
                      height: 40rem;
                    " valign="top">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="
                        border-collapse: separate;
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        width: 100%;
                      " width="100%">
                      <tr>
                        <td style="
                            font-family: Inter;
                            font-size: 14px;
                            vertical-align: top;
                          " valign="top">
                          <img src="${imageUrl}" style="
                              font-family: Inter;
                              width: 100%;
                              font-weight: normal;
                              margin: 0;
                              margin-bottom: 30px;
                            ">
      `;
  }
  