import { Router } from 'express';
import { BankDetailsController } from '../controllers/BankDetailsController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: BankDetails
 *   description: API for managing bank details records
 */

/**
 * @swagger
 * /bank-details:
 *   post:
 *     summary: Create a new Bank Details record
 *     tags: [BankDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicationNo:
 *                 type: string
 *                 example: "APP12345"
 *               bankName:
 *                 type: string
 *                 example: "Bank of Example"
 *               accountNumber:
 *                 type: string
 *                 example: "12345678"
 *               sortCode:
 *                 type: string
 *                 example: "12-34-56"
 *               accountName:
 *                 type: string
 *                 example: "John Doe"
 *               employmentStatusDeclaration:
 *                 type: string
 *                 example: "This is my first job since last 6 April and I have not been receiving taxable Jobseeker's Allowance, Employment and Support Allowance, taxable Incapacity Benefit, State or Occupational Pension."
 *               studentLoanStatus:
 *                 type: string
 *                 example: "I have a student loan and another job."
 *               p45Attached:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Bank Details record created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', BankDetailsController.createBankDetails);

/**
 * @swagger
 * /bank-details/{applicationNo}:
 *   get:
 *     summary: Get Bank Details by Application Number
 *     tags: [BankDetails]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *     responses:
 *       200:
 *         description: Bank Details retrieved successfully
 *       404:
 *         description: Bank Details not found
 */
router.get('/:applicationNo', BankDetailsController.getBankDetailsByNo);

/**
 * @swagger
 * /bank-details/{applicationNo}:
 *   put:
 *     summary: Update Bank Details by Application Number
 *     tags: [BankDetails]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bankName:
 *                 type: string
 *                 example: "Bank of Example Updated"
 *               accountNumber:
 *                 type: string
 *                 example: "87654321"
 *               sortCode:
 *                 type: string
 *                 example: "65-43-21"
 *               accountName:
 *                 type: string
 *                 example: "Jane Doe"
 *               employmentStatusDeclaration:
 *                 type: string
 *                 example: "Self-employed"
 *     responses:
 *       200:
 *         description: Bank Details updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Bank Details not found
 */
router.put('/:applicationNo', BankDetailsController.updateBankDetailsByNo);

/**
 * @swagger
 * /bank-details/{applicationNo}:
 *   delete:
 *     summary: Delete Bank Details by Application Number
 *     tags: [BankDetails]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *     responses:
 *       200:
 *         description: Bank Details deleted successfully
 *       404:
 *         description: Bank Details not found
 */
router.delete('/:applicationNo', BankDetailsController.deleteBankDetailsByNo);

export default router;
