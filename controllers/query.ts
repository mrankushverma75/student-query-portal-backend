import { Request, Response } from 'express';
import Query from '../repository/models/Query';
import User from '../repository/models/User';

let lastAssignedResolverId: string | null = null;

const getNextResolver = async (): Promise<string> => {
    const resolvers = await User.findAll({ where: { role: 'Resolver', isActive: true } });

    if (resolvers.length === 0) {
        throw new Error('No active resolvers available.');
    }

    let nextIndex = 0;
    if (lastAssignedResolverId !== null) {
        const currentIndex = resolvers.findIndex((resolver) => resolver.id === lastAssignedResolverId);
        nextIndex = (currentIndex + 1) % resolvers.length;
    }

    lastAssignedResolverId = resolvers[nextIndex].id;

    return resolvers[nextIndex].id;
};

export const submitQuery = async (req: Request, res: Response): Promise<void> => {
    const { title, description } = req.body;
    const userId = req.user?.id;
    const file = req.file?.filename; 

    try {
        const resolverId = await getNextResolver();
        const query = await Query.create({
            title,
            description,
            file,
            userId,
            resolverId,
        });

        res.status(201).json({ message: 'Query submitted successfully.', query });
    } catch (error) {
        console.error('Error submitting query:', error);
        res.status(500).json({ error: 'Failed to submit query.' });
    }
};


export const getStudentQueries = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
    const offset = (page - 1) * pageSize;

    try {
        const { count, rows: queries } = await Query.findAndCountAll({
            where: { userId },
            limit: pageSize,
            offset,
        });

        const result = queries.map((query) => ({
            id: query.id,
            title: query.title,
            description: query.description,
            status: query.status,
            resolverNote: query.resolverNote || '',
        }));

        const totalPages = Math.ceil(count / pageSize);

        res.status(200).json({
            success: true,
            result,
            pagination: {
                totalItems: count,
                totalPages,
                currentPage: page,
                pageSize,
            },
        });
    } catch (error) {
        console.error('Error fetching queries:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch queries.' });
    }
};


export const viewAssignedQueries = async (req: Request, res: Response): Promise<void> => {
    const resolverId = req.user?.id;
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
    const offset = (page - 1) * pageSize;

    try {
        const { rows: queries, count: totalItems } = await Query.findAndCountAll({
            where: { resolverId },
            limit: pageSize,
            offset,
            order: [['createdAt', 'DESC']],
        });

        const result = queries.map((query) => ({
            id: query.id,
            title: query.title,
            description: query.description,
            status: query.status,
            resolverNote: query.resolverNote || '',
        }));

        res.status(200).json({
            success: true,
            result,
            pagination: {
                totalItems,
                totalPages: Math.ceil(totalItems / pageSize),
                currentPage: page,
                pageSize,
            },
        });
    } catch (error) {
        console.error('Error fetching assigned queries:', error);
        res.status(500).json({ error: 'Failed to fetch assigned queries.' });
    }
};

export const updateQuery = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status, resolverNote, internalNote } = req.body;

    try {
        const query = await Query.findByPk(id);

        if (!query) {
            res.status(404).json({ error: 'Query not found.' });
            return;
        }

        if (query.resolverId !== req.user?.id) {
            res.status(403).json({ error: 'Access denied. You are not assigned to this query.' });
            return;
        }

        query.status = status || query.status;
        query.resolverNote = resolverNote || query.resolverNote;
        query.internalNote = internalNote || query.internalNote;

        await query.save();

        res.status(200).json({ message: 'Query updated successfully.', query });
        return;
    } catch (error) {
        console.error('Error updating query:', error);
        res.status(500).json({ error: 'Failed to update query.' });
        return;
    }
};
