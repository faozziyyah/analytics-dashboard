import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;

    await new Promise((r) => setTimeout(r, 500));

    if (email === 'admin@example.com' && password === 'Password1!') {

        const mockJwt = 'mock-jwt-token-123';
        res.setHeader('Set-Cookie', `token=${mockJwt}; Path=/; HttpOnly`);
        return res.status(200).json({ token: mockJwt });

    }

    return res.status(401).json({ message: 'Invalid credentials.' });

}