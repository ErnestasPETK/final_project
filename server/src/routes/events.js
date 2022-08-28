const express = require('express');
const { isLoggedIn } = require('..//middleware/middleware');
const mysql = require('mysql2/promise');
const {
  MYSQL_CONFIG,
  eventSchema,
  eventNameSchema,
  eventDateSchema,
} = require('../config');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res) => {
  let { name, date } = req.body;
  let response;

  try {
    await eventSchema.validateAsync({ name, date });
  } catch (err) {
    return res.status(400).json({ message: err.details[0].message });
  }

  try {
    const connection = await mysql.createConnection(MYSQL_CONFIG);

    [response] = await connection.execute(
      `INSERT INTO events (name, date) VALUES (${mysql.escape(
        name,
      )}, ${mysql.escape(date)})`,
    );

    await connection.end();

    if (response.affectedRows === 1) {
      return res.status(201).send({ ok: true, message: 'Event created' });
    } else if (response.affectedRows === 0) {
      return res.status(400).send({ message: 'Failed to create event' });
    } else {
      return res.status(200).send({ response: response });
    }
  } catch (err) {
    return res.status(404).send({ err: `Bad request: \n  ${err}` });
  }
});

router.get('/:id?', isLoggedIn, async (req, res) => {
  let { id: eventId } = req.params;

  let response;

  try {
    const connection = await mysql.createConnection(MYSQL_CONFIG);

    [response] = await connection.execute(
      `SELECT \
      events.id AS event_id, \
      events.name AS event_name, \
      events.date AS event_date, \
      events_has_guests.guests_id AS guests_id, \
      guests.name AS guest_name, \
      guests.date AS guest_date,\
      guests.email AS guest_email \
      FROM events \
      LEFT JOIN events_has_guests ON events.id = events_has_guests.events_id \
      LEFT JOIN guests ON events_has_guests.guests_id = guests.id
      ${eventId ? `WHERE events.id = ${mysql.escape(eventId)}` : ''}\
      `,
    );

    await connection.end();

    if (response.length === 0) {
      return res.status(404).send({ message: 'No events found' });
    } else {
      return res.status(200).send({ events: response });
    }
  } catch (err) {
    return res.status(404).send({ err: `Bad request  ${err}` });
  }
});

router.patch('/:id', isLoggedIn, async (req, res) => {
  let { id: eventId } = req.params;

  let { name, date } = req.body;
  let response;

  try {
    if (name) {
      await eventNameSchema.validateAsync(name);
    }
    if (date) {
      await eventDateSchema.validateAsync(date);
    }
  } catch (err) {
    return res.status(400).json({ message: err.details[0].message });
  }

  try {
    const connection = await mysql.createConnection(MYSQL_CONFIG);
    [response] = await connection.execute(
      `UPDATE events \
      SET \
      ${name ? `name = ${mysql.escape(name)} ${date ? ',' : ''}` : ``} \
      ${date ? `date = ${mysql.escape(date)}` : ``} \
      WHERE id = ${mysql.escape(eventId)};
      `,
    );

    await connection.end();

    if (response.affectedRows === 1) {
      return res.status(201).send({ ok: true, message: 'Event updated' });
    } else if (response.affectedRows === 0) {
      return res.status(400).send({ message: 'Failed to update event' });
    } else {
      return res.status(200).send({ response: response });
    }
  } catch (err) {
    return res.status(404).send({ err: `Bad request: \n  ${err}` });
  }
});

router.delete('/:id', isLoggedIn, async (req, res) => {
  let { id: eventId } = req.params;
  let response;

  try {
    const connection = await mysql.createConnection(MYSQL_CONFIG);

    [response] = await connection.execute(
      `DELETE FROM events WHERE id = ${mysql.escape(eventId)}`,
    );

    await connection.end();

    if (response.affectedRows === 1) {
      return res
        .status(201)
        .send({ message: `Event with the ID - ${eventId} deleted` });
    } else if (response.affectedRows === 0) {
      return res.status(400).send({ message: 'Failed to delete event' });
    } else {
      return res.status(200).send({ response: response });
    }
  } catch (err) {
    return res.status(404).send({ err: `Bad request  ${err}` });
  }
});

module.exports = router;
