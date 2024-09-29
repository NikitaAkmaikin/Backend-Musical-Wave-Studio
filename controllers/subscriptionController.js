const Subscription = require('../models/Subscription');

exports.getSubscriptions = async (req, res) => {
  const subscriptions = await Subscription.findAll();
  res.status(200).json(subscriptions);
};

exports.createSubscription = async (req, res) => {
  const { title, description, price, details } = req.body;
  const newSubscription = await Subscription.create({ title, description, price, details });
  res.status(201).json(newSubscription);
};

exports.deleteSubscription = async (req, res) => {
  const { id } = req.params;
  const subscription = await Subscription.findByPk(id);
  
  if (!subscription) {
    return res.status(404).json({ message: 'Абонемент не найден' });
  }

  await subscription.destroy();
  res.status(200).json({ message: 'Абонемент удален' });
};
