import express from 'express'
import { loginUser, registerUser, updateUserInfo} from '../controller/userController.js'
import authMiddleware from "../middleware/authMiddleware.js";
import User from '../model/user.js';

const userRouter = express.Router()

// Login & Register
userRouter.get('/', async(req, res)=> {
  try {
    const users = await User.find(); 
    res.json(users);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
})

userRouter.post('/login', loginUser)
userRouter.post('/register', registerUser)
userRouter.put('/update', updateUserInfo)

// Profile (protected)
userRouter.get("/profile", authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});

// get all mentors or search for specific mentors
userRouter.get('/mentors', async(req, res) => {
  try {
    const {search} = req.query
    let mentors

    if (search) {
      mentors = await User.find({
        role: 'Mentor',
        name: { $regex: search, $options: 'i' }
      })
    }
    else {
      mentors = await User.find({ role: 'Mentor' }); 
    }

    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
})

// Get user by ID
userRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default userRouter;
