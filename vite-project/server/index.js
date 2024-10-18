// import express from 'express';
// import cors from 'cors';
// import Connection from './database/db.js';
// import routes from './routes/route.js';

// const app = express();

// app.use(cors());
// app.use(express.urlencoded());
// app.use(express.json());
// app.use('/', routes);

// const PORT = 8000;

// Connection();

// app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));










import { hash, compare } from 'bcrypt';  // Use import for ES modules
import express from 'express';
import cors from 'cors';
import pkg from 'jsonwebtoken';  // Import the entire 'jsonwebtoken' as a default import
import dotenv from 'dotenv';
import { signupValidation, LoginValidation } from './Middleware/AuthValidation.js'; // ES module import
import Connection from './database/db.js'; // ES module import
import UserModel from './Models/user.js';   // ES module import

dotenv.config();  // For loading environment variables

const { sign } = pkg;  // Destructure 'sign' from the jsonwebtoken package

const app = express();

app.use(express.json()); // Express middleware for parsing JSON
Connection();  // Initialize DB connection
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get("/", (req, res) => { 
    res.send("Hello from backend");
});

app.post("/Signup", signupValidation, async(req, res) => {
    try {
        const { name, password, email } = req.body;

        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: "User already exists, you can login", success: false });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201)
            .json({ message: "Signup successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ message: "Internal server error", success: false });
    }
});

app.post("/Login", LoginValidation, async(req, res) => {
    try {
        const { password, email } = req.body;

        const user = await UserModel.findOne({ email });
        const errormsg = "Auth failed or password is wrong!";
        if (!user) {
            return res.status(403)
                .json({ message: errormsg, success: false });
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403)
                .json({ message: errormsg, success: false });
        }

        const jwtoken = sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200)
            .json({ message: "Login successfully", success: true, jwtoken, email, name: user.name });
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ message: "Internal server error", success: false });
    }
});

app.listen(2000, () => {
    console.log("App is listening on port number 2000");
});
