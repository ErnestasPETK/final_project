const express = require('express');
const { isLoggedIn } = require('..//middleware/middleware');
const mysql = require('mysql2/promise');
const { MYSQL_CONFIG, eventHasGuestsSchema } = require('../config');

const router = express.Router();

router.post('/:id', isLoggedIn, async (req, res) => {
  let { id: eventId } = req.params;
  let { guestId } = req.body;
  let response;
  console.log(eventId, guestId);
  try {
    await eventHasGuestsSchema.validateAsync({
      eventId,
      guestId,
    });
  } catch (err) {
    return res.status(400).json({ message: err.details[0].message });
  }

  try {
    const connection = await mysql.createConnection(MYSQL_CONFIG);

    [response] = await connection.execute(
      `INSERT INTO events_has_guests \
      (events_id, guests_id) VALUES \
      (${mysql.escape(eventId)}, ${mysql.escape(guestId)})`,
    );

    await connection.end();

    if (response.affectedRows === 1) {
      return res
        .status(201)
        .send({ ok: true, message: 'Guest added to event' });
    } else if (response.affectedRows === 0) {
      return res.status(400).send({ message: 'Failed to add guest' });
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
      guests.id AS id, \
      guests.name AS name, \
      guests.date AS date,\
      guests.email AS email \
      FROM events_has_guests \
      LEFT JOIN guests ON events_has_guests.guests_id = guests.id
      ${
        eventId
          ? `WHERE events_has_guests.events_id = ${mysql.escape(eventId)}`
          : ''
      }\
      `,
    );
    await connection.end();
    if (parseInt(response.length) < 1) {
      return res
        .status(204)
        .send({ guests: [], message: 'This event has no guests' });
    }
    if (parseInt(response.length) > 0) {
      return res.status(200).send({ ok: true, guests: response });
    }
  } catch (err) {
    return res.status(404).send({ err: `Bad request  ${err}` });
  }
});

router.delete('/:eventId/:guestId', isLoggedIn, async (req, res) => {
  let { eventId, guestId } = req.params;
  let response;

  try {
    const connection = await mysql.createConnection(MYSQL_CONFIG);

    [response] = await connection.execute(
      `DELETE FROM events_has_guests \
       WHERE guests_id = ${mysql.escape(guestId)} \ 
        AND events_id = ${mysql.escape(eventId)}`,
    );

    await connection.end();

    if (response.affectedRows === 1) {
      return res.status(201).send({
        message: ` ${eventId} - event config for the guest - ${guestId} deleted`,
      });
    } else if (response.affectedRows === 0) {
      return res.status(400).send({ message: 'Failed to delete event guest' });
    } else {
      return res.status(200).send({ response: response });
    }
  } catch (err) {
    return res.status(404).send({ err: `Bad request  ${err}` });
  }
});

module.exports = router;
