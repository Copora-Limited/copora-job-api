import { Request, Response } from 'express';
import { sendEmailsInBatches } from '../lib/emailActions'; // Utility for sending bulk emails in batches
import { UserService } from '../services/UserService';
const userService = new UserService();

class BulkEmailController {
  constructor() {
    this.sendBulkEmail = this.sendBulkEmail.bind(this);
  }

  /**
   * Sends bulk emails to users based on filters like onboardingStatus and state.
   */
  async sendBulkEmail(req: Request, res: Response): Promise<Response> {
    try {
      const { emails, customSubject, customContent } = req.body;

      // Validate the required fields
      if (!emails || !Array.isArray(emails) || emails.length === 0) {
        return res.status(400).json({ message: 'Emails array is required and should not be empty.' });
      }

      if (!customSubject || !customContent) {
        return res.status(400).json({ message: 'Subject and content are required for bulk email.' });
      }

      // Search for users by email
      const userPromises = emails.map(email => {
        return userService.findByEmail(email.trim().toLowerCase());
      });

      const users = await Promise.all(userPromises);

      // Create the recipients array for the email function
      const recipients = users.map((user, index) => {
        if (user) {
          return {
            email: user.email,
            firstName: user.firstName || 'Valued Customer'
          };
        } else {
          // If user is not found, set email and fallback name
          console.log(`Email not found: ${emails[index]}, setting as 'Valued Customer'`);
          return {
            email: emails[index],
            firstName: 'Valued Customer'
          };
        }
      });

      console.log('Final Recipients List:', recipients);

      // Send bulk email in batches
      await sendEmailsInBatches(recipients, customSubject, customContent);

      return res.status(200).json({
        message: 'Bulk email sent successfully.',
        recipients,
      });

    } catch (error) {
      console.error('Error sending bulk email:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

export default new BulkEmailController();
