// invitationToOnboardEmail.js
import { emailHeader } from './emailHeader';
import { emailFooter } from './emailFooter';

export default function invitationToOnboardEmail(user: { firstName?: string; email?: string; loginLink: string; temporaryPassword: string; }) {
  return `
${emailHeader('others')}

  <div class="email-body" style="background-color: #ffffff; border-radius: 4px; padding: 1rem;">
    <p style="
        font-family: Arial, sans-serif;
        color: #000000;
        font-size: 14px;
        line-height: 18px;
        margin: 0 0 15px 0;
      ">
      Hi ${user.firstName || 'User'},
    </p>
    <p style="
        font-family: Arial, sans-serif;
        color: #000000;
        font-size: 14px;
        line-height: 18px;
        margin: 0 0 15px 0;
      ">
      Welcome to Copora! We’re excited to have you onboard.
    </p>
    <p style="
        font-family: Arial, sans-serif;
        color: #000000;
        font-size: 14px;
        line-height: 18px;
        margin: 0 0 15px 0;
      ">
      To get started, please log in using the following link:
    </p>
    <p style="
        font-family: Arial, sans-serif;
        color: #000000;
        font-size: 14px;
        line-height: 18px;
        margin: 0 0 15px 0;
      ">
      <a href="${user.loginLink}" style="text-decoration: none; color: #247A84;">${user.loginLink}</a>
    </p>
    <p style="
        font-family: Arial, sans-serif;
        color: #000000;
        font-size: 14px;
        line-height: 18px;
        margin: 0 0 15px 0;
      ">
      Your email is: <strong>${user.email}</strong>
    </p>
    <p style="
        font-family: Arial, sans-serif;
        color: #000000;
        font-size: 14px;
        line-height: 18px;
        margin: 0 0 15px 0;
      ">
      Your temporary password is: <strong>${user.temporaryPassword}</strong>
    </p>
    <p style="
        font-family: Arial, sans-serif;
        color: #000000;
        font-size: 14px;
        line-height: 18px;
        margin: 0 0 15px 0;
      ">
      Please change this password after your first login.
    </p>
    <p style="
        font-family: Arial, sans-serif;
        color: #000000;
        font-size: 14px;
        line-height: 18px;
        margin: 0 0 15px 0;
      ">
      If you have any questions or need assistance, feel free to reach out.
    </p>
    <p style="
        font-family: Arial, sans-serif;
        color: #000000;
        font-size: 14px;
        line-height: 18px;
        margin: 0;
      ">
      Best regards,<br><br>
      <strong>The ${process.env.APP_COMPANY} Team</strong>
    </p>
  </div>

${emailFooter()}
  `;
}
