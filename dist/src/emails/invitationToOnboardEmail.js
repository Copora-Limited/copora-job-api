"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = invitationToOnboardEmail;
const emailHeader_1 = require("./emailHeader");
const emailFooter_1 = require("./emailFooter");
function invitationToOnboardEmail(user) {
    return `
${(0, emailHeader_1.emailHeader)('others')}
  <div style="background-color: #ffffff; border-radius: 4px; padding: 1rem;">
    <p style="
        font-family: Arial, sans-serif;
        color: #000000;
        font-size: 14px;
        line-height: 18px;
        margin: 0 0 15px 0;
      ">
      Hi ${user.firstName || 'User'},
    </p>
    <p>Welcome to Copora! We’re excited to have you onboard.</p>
    <p>To get started, please log in using the following link:</p>
    <p>
      <a href="${user.loginLink}" style="text-decoration: none; color: #247A84;">${user.loginLink}</a>
    </p>
    <p>Your email is: <strong>${user.email}</strong></p>
    <p>Your temporary password is: <strong>${user.temporaryPassword}</strong></p>
    <p>Please change this password after your first login.</p>
    <p>If you have any questions or need assistance, feel free to reach out.</p>
    <p style="margin: 0;">
      Best regards,<br><br>
      <strong>The ${process.env.APP_COMPANY} Team</strong>
    </p>
  </div>
${(0, emailFooter_1.emailFooter)()}
  `;
}
