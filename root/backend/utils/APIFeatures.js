function excludeFields(queryStr) {
  const excludes = ["limit", "sort", "paginate", "filter", "page", "id"];
  excludes.forEach((el) => queryStr[el] && delete queryStr[el]);
  return queryStr;
}

class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    let excludedQueryStr = excludeFields({ ...this.queryStr });

    excludedQueryStr = JSON.stringify(excludedQueryStr);

    excludedQueryStr = excludedQueryStr.replace(
      /\b(gte|gt|lte|lt|in)\b/g,
      (match) => `$${match}`,
    ); // price[gte]: => price[$gte]:10

    excludedQueryStr = JSON.parse(excludedQueryStr);

    const queryArr = Object.keys(excludedQueryStr).map((key) => ({
      key,
      value: excludedQueryStr[key],
    }));

    queryArr.forEach((el) =>
      el.value["$in"] ? (el.value["$in"] = el.value["$in"].split(",")) : "",
    );

    const query = {};

    queryArr.forEach((el) => (query[el.key] = el.value));

    this.query = this.query.find(query);

    return this;
  }

  sort() {
    this.query = this.query.find().sort(this.queryStr.sort);
    return this;
  }

  paginate() {
    const page = +this.queryStr.page || 1;
    const limit = +this.queryStr.limit || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
