"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateAdminInquiryEmail;
const emailHeader_1 = require("./emailHeader");
const emailFooter_1 = require("./emailFooter");
function generateAdminInquiryEmail(user, formDetails) {
    return `
     ${(0, emailHeader_1.emailHeader)('others')}
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #444;">New Customer Inquiry</h2>
        <p><strong>Name:</strong> ${user.firstName} ${user.lastName || ''}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${formDetails.phone || 'Not provided'}</p>
        <hr />
        <p><strong>Subject:</strong> ${formDetails.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${formDetails.message}</p>
        <hr />
        <p style="font-size: 0.9em; color: #777;">This email was automatically generated from the contact form on your website.</p>
      </div>
      ${(0, emailFooter_1.emailFooter)()}
    `;
}
