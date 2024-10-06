import { emailHeader } from './emailHeader';
import { emailFooter } from './emailFooter';

// Bulk Email Template
export function bulkEmailTemplate(user: { firstName?: string; email: string; }, message: string) {
  return `
    ${emailHeader('others')}
      <div style="padding: 20px;">
        <h3>Hello ${user.firstName ? user.firstName : 'User'}!</h3>
        <p>${message}</p>
        <p>If you have any questions or need further assistance, feel free to contact our support team.</p>
        <p>Best regards,<br>The ${process.env.APP_COMPANY} Team</p>
      </div>
    ${emailFooter()}
  `;
}
