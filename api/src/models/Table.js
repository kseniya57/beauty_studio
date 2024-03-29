import db from '../utils/db';
import parseJSON from '../utils/parseJSON';

const processFilter = filter => (filter && Object.keys(filter).length ? filter : 1);
const processGroupBy = by => (by ? `GROUP BY ${by}` : '');

const getSelectParams = ({ order, limit, offset }) => `${order ? ` ORDER BY ${order[0]} ${order[1] || 'ASC'}` : ''}${limit ? ` LIMIT ${limit}` : ''}${offset ? ` OFFSET ${offset}` : ''}`;

export default class Table {
  constructor(name, config = {}) {
    this.name = name;
    this.config = config;
  }

  process(rows) {
    if (!this.config.jsonFields) {
      return rows;
    }
    rows.forEach(this.processRow.bind(this));

    return rows;
  }

  processRow(row) {
    this.config.jsonFields.forEach((field) => {
      if (row[field]) {
        row[field] = parseJSON(row[field]);
      }
    });
  }

  all(config = {}) {
    const { filter, pagination = {}, fields = '*' } = { ...(this.config.all || {}), ...config };

    return db.query(`
            SELECT ${fields} 
            FROM ${this.name} 
            WHERE ${db.selectFormat('?', [processFilter(filter)])}
            ${getSelectParams(pagination)}`).then(this.process.bind(this));
  }

  async get(id, config = {}) {
    const { fields = '*', joinCondition = '' } = { ...(this.config.get || {}), ...config };
    const row = await db.queryRow(`SELECT ${fields} FROM ${this.name} ${joinCondition} WHERE ${db.selectFormat('?', [typeof id === 'object' ? id : { [`${this.name}.id`]: id }])}`);

    if (this.config.jsonFields) {
      this.processRow(row);
    }

    return row;
  }

  permit(data) {
    return this.config.fields
      ? Object.entries(data).reduce((result, [key, value]) => (this.config.fields.includes(key)
        ? Object.assign(result, { [key]: value })
        : result), {})
      : data;
  }

  async add(data) {
    const { insertId } = await db.query('INSERT INTO ?? SET ?', [this.name, this.permit(data)]);

    return insertId;
  }

  async update(id, data) {
    const { changedRows } = await db.query('UPDATE ?? SET ? WHERE ?', [this.name, this.permit(data), { id }]);

    return changedRows;
  }

  remove(id) {
    return db.query('DELETE FROM ?? WHERE ?', [this.name, id ? { id } : 1]).then(result => result.affectedRows);
  }

  async aggregate({
    aggregation, field, filter, groupBy,
  }) {
    return db.query(`SELECT ${aggregation}(?) ${aggregation} FROM ?? WHERE ? ${processGroupBy(groupBy)}`, [field, this.name, processFilter(filter)]);
  }

  async allRelated({ relation, id }, { fields = '*', joinType = 'INNER' } = {}) {
    return db.query(`
            SELECT ${fields} 
            FROM ${this.name} 
            ${joinType} JOIN ${relation}
            WHERE ${this.name}Id = ?
        `, [id]);
  }

  async addRelated({ relation, id, data }) {
    return db.query(`
            INSERT INTO ${this.name}_${relation}
            SET ${this.name}Id = ?, ?
        `, [id, data]);
  }

  async updateRelated(relatedId, { relation, id, data }) {
    const { changedRows } = await db.query(`
            UPDATE ${this.name}_${relation}
            SET ?
            WHERE ${this.name}Id = ? AND ${relation}Id = ?
        `, [data, id, relatedId]);

    return changedRows;
  }

  async getRelated(id, relation, relatedId) {
    return db.queryRow(`
            SELECT * 
            FROM ${relation} 
            INNER JOIN ${this.name}_${relation}
            ON ${relation}.id = ${this.name}_${relation}.${relation}Id
            WHERE ${this.name}Id = ? AND ${relation}Id = ?
        `, [id, relatedId]);
  }

  async removeRelated(relation, id, relatedId) {
    return db.query(`
            DELETE FROM ${this.name}_${relation}
            WHERE ${this.name}Id = ? AND ${relation}Id = ?
        `, [id, relatedId]);
  }
}
