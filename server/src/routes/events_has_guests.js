const express = require('express');
const { isLoggedIn } = require('..//middleware/middleware');
const mysql = require('mysql2/promise');
const { MYSQL_CONFIG, eventHasGuestsSchema } = require('../config');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res) => {
  let { events_id: eventId, guests_id: guestId } = req.body;
  let response;

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
      * \
      FROM events_has_guests \
      ${
        eventId
          ? `WHERE events_has_guests.events_id = ${mysql.escape(eventId)}`
          : ''
      }\
      `,
    );

    await connection.end();

    if (response.length === 0) {
      return res
        .status(404)
        .send({ message: 'No event guest configuration was found' });
    } else {
      return res.status(200).send({ eventHasGuests: response });
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
