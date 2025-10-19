const errorHandler = (error, req, res, next) => {
  console.error('❌ Error:', error.message);

  res.status(error.status || 500).json({
    status: 'error',
    code: error.status || 500,
    message: error.message || 'Internal Server Error',
  });
};
export default errorHandler;
