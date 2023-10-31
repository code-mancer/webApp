const { findUser, updateBalanceWithRetry } = require('../helpers/userHelper');

exports.updateUserBalance = async (req, res) => {
    const { userId, amount } = req.body;
    const user = await findUser(userId);
    return updateBalanceWithRetry(res, user, amount);
};
