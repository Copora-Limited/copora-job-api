"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = invitationToOnboardEmail;
const emailHeader_1 = require("./emailHeader");
const emailFooter_1 = require("./emailFooter");
function invitationToOnboardEmail(user) {
    return `
  <div style="font-family: Arial, sans-serif;  background-color: #f0f3f7;">
    <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #fff;">
        ${(0, emailHeader_1.emailHeader)('others')}
          <div style="padding: 20px;">
            <h3>
              Hi ${user.firstName || 'User'},
            </h3>
            <p>Welcome to Copora! We’re thrilled to have you join our team. We’re confident that your skills and experience will make a great contribution, and we look forward to working together. As you settle in, we’re here to support you every step of the way.</p>
            
            <p>To get started, please log in using the following link:</p>
            <p>
              <a href="${user.loginLink}" style="text-decoration: none; color: #247A84;">${user.loginLink}</a>
            </p>

            <p>Your login details are as follows:</p>
            <p>Email: <strong>${user.email}</strong></p>
            <p>Temporary Password: <strong>${user.temporaryPassword}</strong></p>

            <p>You can always change your password later in the main system.</p>

            <p>If you have any questions or need assistance, feel free to reach out.</p>

            <p style="margin: 0;">
              Best regards,<br><br>
              <strong>The ${process.env.APP_COMPANY || 'Copora'} Team</strong>
            </p>
          </div>
        ${(0, emailFooter_1.emailFooter)()}
    </div>
  </div>
  `;
}
