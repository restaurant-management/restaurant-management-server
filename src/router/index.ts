import {Router} from 'express';

const router = Router();

// Default Get.
router.get('*', (_req, res) => {
    res.status(200).send('Welcome to Server!');
});

export default router;
