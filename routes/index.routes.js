import Router from 'express';

const router = Router()

router.get('/', (req, res) => {
    res.json('Welcome to Admin Notes Courses');
});

export default router