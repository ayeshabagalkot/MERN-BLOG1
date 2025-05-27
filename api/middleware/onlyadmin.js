import jwt from 'jsonwebtoken'

export const onlyadmin = async (req, res, next) => {
    try {
        const token = req.cookies.access_token
        console.log(token);
        if (!token) {
            const err = new Error('Unauthorized')
            err.statusCode = 401
            return next(err)
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decodeToken.role);
        if (decodeToken.role === 'admin') {
            req.user = decodeToken
            next()
        } else {
            console.log("i am here");
            const err = new Error('Unauthorized')
            err.statusCode = 403
            return next(err)
        }

    } catch (error) {
        const err = new Error(error.message)
        err.statusCode = 500
        next(err)
    }
}

