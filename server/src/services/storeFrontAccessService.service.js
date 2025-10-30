const httpStatus = require('http-status');
const { StoreFrontAccess } = require('../models');
const ApiError = require('../utils/ApiError');
const _ = require('lodash')

const createStoreFrontAccess = async (body) => {
  return StoreFrontAccess.create(body);
};

const getStoreFrontAccessById = async (id) => {
  return StoreFrontAccess.findById(id);
};

const getStoreFrontAccessByShopName = async (shopifyStoreName) => {
  return StoreFrontAccess.findOne({
    shopifyStoreName
  });
};

const updateStoreFrontAccessById = async (id, updateBody) => {
  const access = await getStoreFrontAccessById(id);
  if (!access) {
    throw new ApiError(httpStatus.NOT_FOUND, 'StoreFrontAccess not found');
  }

  Object.assign(access, updateBody);
  await access.save();
  return access;
};

const deleteStoreFrontAccessById = async (prodId) => {
  const access = await getStoreFrontAccessById(prodId);
  if (!access) {
    throw new ApiError(httpStatus.NOT_FOUND, 'StoreFrontAccess not found');
  }
  await access.remove();
  return access;
};

const queryAllStoreFrontAccesss = async (filter) => {
  return StoreFrontAccess.find(filter);
};

module.exports = {
    createStoreFrontAccess,
    updateStoreFrontAccessById,
    getStoreFrontAccessById,
    deleteStoreFrontAccessById,
    queryAllStoreFrontAccesss,
    getStoreFrontAccessByShopName
};