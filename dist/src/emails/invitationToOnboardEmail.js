"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = invitationToOnboardEmail;
// invitationToOnboardEmail.js
const emailHeader_1 = require("./emailHeader");
const emailFooter_1 = require("./emailFooter");
function invitationToOnboardEmail(user) {
    return `
${(0, emailHeader_1.emailHeader)('others')}

            <div class="email-body" style="background-color: #ffffff; border-radius: 4px">
              <p style="
                  font-family: Inter;
                  color: #000000;
                  font-size: 14px;
                  line-height: 20px;
                  font-weight: normal;
                  margin: 0;
                  padding: 1rem;
                  margin-bottom: -15px;
                ">
                Hi ${user.firstName || 'User'},
              </p>
              <p style="
                  font-family: Inter;
                  color: #000000;
                  font-size: 14px;
                  line-height: 20px;
                  font-weight: normal;
                  margin: 0;
                  padding: 1rem;
                  margin-bottom: -15px;
                ">
                Welcome to Copora! We’re excited to have you onboard.
              </p>
              <p style="
                  font-family: Inter;
                  color: #000000;
                  font-size: 14px;
                  line-height: 20px;
                  font-weight: normal;
                  margin: 0;
                  padding: 1rem;
                  margin-bottom: -15px;
                ">
                To get started, please log in using the following link:
              </p>
              <p style="
                  font-family: Inter;
                  color: #000000;
                  font-size: 14px;
                  line-height: 20px;
                  font-weight: normal;
                  margin: 0;
                  padding: 1rem;
                  margin-bottom: -15px;
                ">
                <a href="${user.loginLink}" style="text-decoration: none; color: #247A84;">${user.loginLink}</a>
              </p>
              <p style="
                  font-family: Inter;
                  color: #000000;
                  font-size: 14px;
                  line-height: 20px;
                  font-weight: normal;
                  margin: 0;
                  padding: 1rem;
                  margin-bottom: -15px;
                ">
                Your email is: <strong>${user.email}</strong>
              </p>
              <p style="
                  font-family: Inter;
                  color: #000000;
                  font-size: 14px;
                  line-height: 20px;
                  font-weight: normal;
                  margin: 0;
                  padding: 1rem;
                  margin-bottom: -15px;
                ">
                Your temporary password is: <strong>${user.temporaryPassword}</strong>
              </p>
              <p style="
                  font-family: Inter;
                  color: #000000;
                  font-size: 14px;
                  line-height: 20px;
                  font-weight: normal;
                  margin: 0;
                  padding: 1rem;
                  margin-bottom: -15px;
                ">
                Please change this password after your first login.
              </p>
              <p style="
                  font-family: Inter;
                  color: #000000;
                  font-size: 14px;
                  line-height: 20px;
                  font-weight: normal;
                  margin: 0;
                  padding: 1rem;
                  margin-bottom: -15px;
                ">
                If you have any questions or need assistance, feel free to reach out.
              </p>
              <p style="
                  font-family: Inter;
                  color: #000000;
                  font-size: 14px;
                  line-height: 20px;
                  font-weight: normal;
                  margin: 0;
                  padding: 1rem;
                  margin-bottom: -15px;
                ">
                Best regards,<br><br>
                <strong>The ${process.env.APP_COMPANY} Team</strong>
              </p>
            </div>
                  

${(0, emailFooter_1.emailFooter)()}
  `;
}
