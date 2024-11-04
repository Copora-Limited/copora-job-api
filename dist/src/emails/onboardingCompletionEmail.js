"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = onboardingCompletionEmail;
// resetPasswordEmail.js
const emailHeader_1 = require("./emailHeader");
const emailFooter_1 = require("./emailFooter");
// import { FRONTEND_URL } from '../config';
function onboardingCompletionEmail(user) {
    return `
        
        ${(0, emailHeader_1.emailHeader)('complete_email')}
            <div style="padding: 20px;">
                <p>Hi ${user.firstName},</p>
                <p>Thank you for completing the onboarding process with Copora. We’re pleased to have you moving forward with us.</p>
                <p>Your documents are now with our Contracts Team for review. Once they’ve approved the information, we’ll activate your access to our booking system. This will allow you to see all the available roles and start selecting the ones that best fit your schedule.</p>
                <p>We look forward to working with you.</p>
                <p>If you have any questions or need further assistance, please don’t hesitate to reach out.</p>
                <p>Best regards,</p>
                <p>The ${process.env.APP_COMPANY} Team</p>
            </div>
        ${(0, emailFooter_1.emailFooter)()}
            
    `;
}
