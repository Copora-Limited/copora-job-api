import { Request, Response } from 'express';
import { userRepository, UserService } from '../services/UserService';
import { sendBulkOnboardingCompletionEmails } from '../lib/emailActions'; // Create this utility for sending bulk emails
import { User } from '../entities/UserEntity';

// const userService = new UserService();

class BulkEmailController {
  constructor() {
    this.sendBulkEmail = this.sendBulkEmail.bind(this);
  }

  /**
   * Sends bulk emails to users based on filters like onboardingStatus and state.
   */
  async sendBulkEmail(req: Request, res: Response): Promise<Response> {
    try {
      const { onboardingStatus, state, customSubject, customContent } = req.body;
  
      // Validate the required fields
      if (!onboardingStatus) {
        return res.status(400).json({ message: 'Onboarding status is required' });
      }
  
      if (!customSubject || !customContent) {
        return res.status(400).json({ message: 'Subject and content are required for bulk email.' });
      }
  
      // Build the query to fetch users based on the provided filters
      let query = userRepository.createQueryBuilder('user'); 
      // Apply filters dynamically
      if (onboardingStatus) {
        query = query.andWhere('user.onboardingStatus = :onboardingStatus', { onboardingStatus });
      }
      if (state) {
        query = query.andWhere('user.state = :state', { state });
      }
  
      // Execute the query to get the matching users
      const users: User[] = await query.getMany();
  
      if (users.length === 0) {
        return res.status(404).json({ message: 'No users found with the specified criteria.' });
      }
  
      // Prepare the list of emails and user names
      const emails = users.map(user => ({
        firstName: user.firstName,
        email: user.email,
      }));
  
      // Send bulk email
      await sendBulkOnboardingCompletionEmails(emails, customSubject, customContent);
  
      return res.status(200).json({
        message: 'Bulk email sent successfully.',
        recipients: emails,
      });
  
    } catch (error) {
      console.error('Error sending bulk email:', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
  
  
}

export default new BulkEmailController();
