const errorHandler = (err, req, res, next) => {
    return res.status(500).json({ 'msg': "There was an error that ocurred! " }) 
    next()
}

export default errorHandler;