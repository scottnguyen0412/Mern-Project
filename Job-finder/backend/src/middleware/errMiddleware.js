
const errMiddleware = (err, req, res, next) => {
    const defaultErr = {
        statusErr: 404,
        success: "failed",
        msg: err
    };

    if(err.name === "ValidationError") {
        defaultErr.statusErr = 404
        // Object.values() trả về một mảng chứa các err
        defaultErr.msg = Object.values(err.errors).map((ele) => 
            ele.message 
        ).join(',')
    }

    // duplicate err
    if(err.code && err.code === 11000) {
        defaultErr.statusErr = 404;
        defaultErr.msg = `${Object.values(err.keyValue)} field has to be unique`
    }

    res.status(defaultErr.statusErr).json({
        success: defaultErr.success,
        message: defaultErr.msg
    })
}

export default errMiddleware