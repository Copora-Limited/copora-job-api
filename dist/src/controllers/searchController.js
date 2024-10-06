// import { Request, Response } from 'express';
// import { AppDataSource } from '../data-source'; // Import AppDataSource
// import { Product } from '../entities/ProductEntity';
// export const getSuggestions = async (req: Request, res: Response) => {
//   const { query } = req.query;
//   if (typeof query !== 'string') {
//     return res.status(400).json({ error: 'Invalid query' });
//   }
//   try {
//     // Get the Product repository from AppDataSource
//     const auctionRepository = AppDataSource.getRepository(Product);
//     const auctions = await auctionRepository.createQueryBuilder('auction')
//       .where('auction.title ILIKE :query OR auction.description ILIKE :query', { query: `%${query}%` })
//       .limit(10) // Limit the number of suggestions
//       .getMany();
//     const suggestions = auctions.map(auction => auction.title); // Customize what to show
//     res.json(suggestions);
//   } catch (error) {
//     console.error('Error fetching suggestions:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
