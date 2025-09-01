const prisma = require("../prisma/index");
const { connect } = require("../routes/userRoutes");

exports.createPost = async (req, res, next) => {
    const authorId = req.user.id;
    const { slug, title, body } = req.body;
    try {
        const result = await prisma.post.create({
            data: {
                slug,
                title,
                body,
                author: { connect: { id: authorId } }
            }
        })
        res.status(201).json(result)
    } catch (error) {
        throw new Error(error)

    }
}

exports.updatePost = async (req, res, next) => {
    const { id } = req.params;
    const { title, body } = req.body;
    try {
        const result = await prisma.post.update({
            where: {
                id: id
            },
            data: {
                title,
                body
            }
        })
        res.status(201).json(result)
    } catch (error) {
        throw new Error(error)

    }
}

exports.deletePost = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await prisma.post.delete({
            where: { id: id }
        })
        res.json(result)
    } catch (error) {
        throw new Error(error)
    }
}

exports.getAllPosts = async (req, res, next) => {
    try {
        const result = await prisma.post.findMany();
        res.json(result)

    } catch (error) {
        res.json({ error: `NO POSTS FOUND` })
    }
}


exports.getPostById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id
            }
        });
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching post" });
    }
};

