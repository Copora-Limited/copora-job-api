"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkEmailTemplate = bulkEmailTemplate;
const emailHeader_1 = require("./emailHeader");
const emailFooter_1 = require("./emailFooter");
// Bulk Email Template
function bulkEmailTemplate(user, message) {
    return `
    ${(0, emailHeader_1.emailHeader)('others')}
      <div style="padding: 20px;">
        <h3>Hello ${user.firstName ? user.firstName : 'User'}!</h3>
        <p>${message}</p>
        <p>If you have any questions or need further assistance, feel free to contact our support team.</p>
        <p>Best regards,<br>The ${process.env.APP_COMPANY} Team</p>
      </div>
    ${(0, emailFooter_1.emailFooter)()}
  `;
}
