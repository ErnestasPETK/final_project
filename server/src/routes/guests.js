const express = require('express');
const { isLoggedIn } = require('..//middleware/middleware');
const mysql = require('mysql2/promise');
const {
  MYSQL_CONFIG,
  guestSchema,
  guestNameSchema,
  guestDateSchema,
  guestEmailSchema,
} = require('../config');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res) => {
  let { name, email, date } = req.body;
  let response;

  try {
    await guestSchema.validateAsync({ name, email, date });
  } catch (err) {
    return res.status(400).json({ message: err.details[0].message });
  }

  try {
    const connection = await mysql.createConnection(MYSQL_CONFIG);

    [response] = await connection.execute(
      `INSERT INTO guests (name, email, date) VALUES (${mysql.escape(
        name,
      )}, ${mysql.escape(email)}, ${mysql.escape(date)})`,
    );

    await connection.end();

    if (response.affectedRows === 1) {
      return res
        .status(201)
        .send({ ok: true, message: 'Guest created', id: response.insertId });
    } else if (response.affectedRows === 0) {
      return res.status(400).send({ message: 'Failed to create guest' });
    } else {
      return res.status(200).send({ response: response });
    }
  } catch (err) {
    return res.status(404).send({ message: `Bad request: ${err}` });
  }
});

router.get('/:id?', isLoggedIn, async (req, res) => {
  let { id: guestId } = req.params;

  let response;
  try {
    const connection = await mysql.createConnection(MYSQL_CONFIG);

    [response] = await connection.execute(
      `SELECT \
      * \
      FROM guests \
      ${guestId ? `WHERE guests.id = ${mysql.escape(guestId)}` : ''}\
      `,
    );

    await connection.end();

    if (response.length === 0) {
      return res.status(404).send({ message: 'No guests found' });
    } else {
      return res.status(200).send({ guests: response });
    }
  } catch (err) {
    return res.status(404).send({ err: `Bad request  ${err}` });
  }
});

router.patch('/:id', isLoggedIn, async (req, res) => {
  let { id: guestId } = req.params;

  let { name, email, date } = req.body;
  let response;

  try {
    if (email) {
      await guestEmailSchema.validateAsync(email);
    }
    if (name) {
      await guestNameSchema.validateAsync(name);
    }
    if (date) {
      await guestDateSchema.validateAsync(date);
    }
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  try {
    const connection = await mysql.createConnection(MYSQL_CONFIG);
    [response] = await connection.execute(
      `UPDATE guests \
      SET \
      ${email ? `email = ${mysql.escape(email)} ${name ? ',' : ''} ` : ``} \ 
      ${name ? `name = ${mysql.escape(name)} ${date ? ',' : ''}` : ``} \
      ${date ? `date = ${mysql.escape(date)}` : ``} \
      WHERE id = ${mysql.escape(guestId)};
      `,
    );
    await connection.end();

    if (response.affectedRows === 1) {
      return res.status(201).send({ ok: true, message: 'Guest updated' });
    } else if (response.affectedRows === 0) {
      return res.status(400).send({ message: 'Failed to update guest' });
    } else {
      return res.status(200).send({ response: response });
    }
  } catch (err) {
    return res.status(404).send({ err: `Bad request: \n  ${err}` });
  }
});

router.delete('/:id', isLoggedIn, async (req, res) => {
  let { id: guestId } = req.params;
  let response;

  try {
    const connection = await mysql.createConnection(MYSQL_CONFIG);

    [response] = await connection.execute(
      `DELETE FROM guests WHERE id = ${mysql.escape(guestId)}`,
    );

    await connection.end();

    if (response.affectedRows === 1) {
      return res
        .status(201)
        .send({ message: `Guest with the ID - ${guestId} deleted` });
    } else if (response.affectedRows === 0) {
      return res.status(400).send({ message: 'Failed to delete guest' });
    } else {
      return res.status(404).send({ response: response });
    }
  } catch (err) {
    return res.status(404).send({ err: `Bad request  ${err}` });
  }
});

module.exports = router;
