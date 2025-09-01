const prisma = require("../prisma/index")
const cookieToken = require("../utils/cookieToken")

exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({
                success: false,
                message: "Fill in all details"
            })
        }
        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });

        cookieToken(user, res)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Provide all Fields"
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid User"
            })
        }

        if (user.password !== password) {
            res.status(401).json({
                success: false,
                message: "Invalid Pass"
            })
        }
        cookieToken(user, res)
    } catch (error) {
        console.log("Login Failed", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


exports.logout = async (req, res, next) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error("Logout failed:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


exports.getProfile = async (req, res) => {
    try {
        const { name, email } = req.user;
        res.status(200).json({
            success: true,
            user: { name, email }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Cannot find user"
        })
    }
};