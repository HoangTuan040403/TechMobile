const paginate = async ({ model, query = {}, page = 1, limit = 10, sort = { createdAt: -1 }, select = "", populate = null }) => {
  const skip = (page - 1) * limit;

  let q = model.find(query).skip(skip).limit(limit).sort(sort);
  if (select) q = q.select(select);
  if (populate) q = q.populate(populate);

  const [data, total] = await Promise.all([
    q.lean(),
    model.countDocuments(query)
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

module.exports = paginate;
