import Controller from '../models/Controller';
import parseJSON from '../utils/parseJSON';
import Table from '../models/Table';
import db from '../utils/db';

const kvArrayToObject = kvArray => kvArray.reduce((result, { key, value }) => Object.assign(result, { [key]: value }), {});

class SettingsController extends Controller {
  constructor(...params) {
    super(...params);
    this.socialTable = new Table('social');
    this.addressesTable = new Table('addresses');
  }

  async all(ctx) {
    const [settings, social, addresses] = await Promise.all([
      this.table.all().then(kvArrayToObject),
      this.socialTable.all(),
      this.addressesTable.all(),
    ]);

    settings.theme = parseJSON(settings.theme);
    settings.social = social;
    settings.addresses = addresses;

    ctx.body = { data: settings };
  }

  async update(ctx) {
    const { key, value } = ctx.params;

    const { changedRows } = await db.query('UPDATE settings SET value = ? WHERE `key` = ?', [value, key]);
    if (changedRows === 0) {
      await db.query('INSERT INTO settings SET value = ?, `key` = ?', [value, key]);
    }

    ctx.body = { data: { error: false } };
  }
}

export default new SettingsController('/settings', 'settings');
