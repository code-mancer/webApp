const { handleResponse } = require('./errors');
const User = require('../../db/models/user');
const sequelizeConnection = require('../../src/db/config');

const findUser = async (userId) => {
    try {
        const user = await User.findOne({ where: { id: userId } });

        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};

async function updateBalanceWithRetry(userId, amount, maxRetries = 3) {
    let retries = 0;
    while (retries < maxRetries) {
        const transaction = await sequelizeConnection.transaction();

        try {
            const user = await User.findByPk(userId, { transaction });

            if (!user) {
                throw new Error('User not found');
            }

            if (user.balance - amount < 0) {
                throw new Error('Insufficient funds');
            }

            user.balance -= amount;
            await user.save({ transaction });

            await transaction.commit();
            console.log('Balance updated successfully');
            return;
        } catch (error) {
            await transaction.rollback();
            if (error.message.includes('deadlock')) {
                console.log('Deadlock detected, retrying...');
                retries++;
            } else {
                console.error('Error:', error.message);
                return;
            }
        }
    }

    console.error('Max retries reached, unable to update balance');
}

module.exports = { findUser, updateBalanceWithRetry };
