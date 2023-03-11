import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'Please provide email and password' });

  try {
    const token = await authService.login({ email, password });
    if (!token) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) return res.status(400).json({ message: 'All field are required' });

  try {
    const user = await authService.register(req.body);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export { login, register };
