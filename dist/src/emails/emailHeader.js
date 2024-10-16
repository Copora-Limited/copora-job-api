"use strict";
// emailHeader.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailHeader = emailHeader;
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
function emailHeader(headerType) {
    const imageUrl = HEADER_IMAGES[headerType] || HEADER_IMAGES['others'];
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Arial:wght@400;700&display=swap" rel="stylesheet">
    <title>Copora</title>
  </head>

  <body style="
      font-family: Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      font-size: 14px;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #EAF0F3;
      color: #000000;
    ">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="
        border-collapse: collapse;
        width: 100%;
        background-color: #EAF0F3;
      ">
      <tr>
        <td style="padding: 1px 0;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="
              border-collapse: collapse;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 6px;
            ">
            <tr>
              <td style="padding: 20px;">
                <img src="${imageUrl}" alt="Header Image" style="
                    width: 100%;
                    border: none;
                    display: block;
                    margin-bottom: 20px;
                  ">
              </td>
            </tr>
  `;
}
