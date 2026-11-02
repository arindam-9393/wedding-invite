// All invitation text lives here — edit this file to change names, dates or venue.

export const invite = {
  invocation: {
    sanskrit: '॥ श्री गणेशाय नमः ॥',
    english: 'Shree Ganeshay Namah',
  },

  hosts: {
    blessing: 'With the blessings of God',
    parents: 'Smt. Sushmita Dilip Bose & Shri Dilip Ranjit Bose',
    request:
      'request your gracious presence on the auspicious occasion of the Wedding Ceremony of their Daughter',
  },

  groom: {
    name: 'Saptarshi',
    lines: [
      'S/o Smt. Sumita De & Shri Supriya De',
      'Grand S/o Late Asoke Kumar De & Late Ila De,',
      'Shri Tapan Kumar Saha & Smt. Manju Saha',
    ],
  },

  bride: {
    name: 'Sudipa',
    lines: [
      'D/o Smt. Sushmita Dilip Bose & Shri Dilip Ranjit Bose, Nagpur',
      'Grand D/o Late Shefali R. Bose & Late Ranjit Bose,',
      'Late Leela K. Baidya & Late Krishnamohan Baidya',
    ],
  },

  event: {
    title: 'Wedding Ceremony',
    weekday: 'Thursday',
    day: '26',
    month: 'November',
    year: '2026',
    time: '7:00 P.M.',
    // 7:00 PM India time
    startISO: '2026-11-26T19:00:00+05:30',
    endISO: '2026-11-26T23:00:00+05:30',
  },

  venue: {
    name: 'Happy Weddings',
    address: ['Nara Road, Opp. NB Tiles, Jaripatka', 'Nagpur – 440014'],
    mapsUrl: 'https://maps.app.goo.gl/EXre7hPTRSfPa2mx5',
  },

  closing: {
    line: 'Your presence and blessings will make our celebration complete',
    from: 'With love, The Bose Family',
  },
}

export const mapsUrl = invite.venue.mapsUrl

const toCalStamp = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

export const calendarUrl =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  `&text=${encodeURIComponent(`${invite.bride.name} & ${invite.groom.name} — ${invite.event.title}`)}` +
  `&dates=${toCalStamp(invite.event.startISO)}/${toCalStamp(invite.event.endISO)}` +
  `&location=${encodeURIComponent(`${invite.venue.name}, ${invite.venue.address.join(', ')}`)}` +
  `&details=${encodeURIComponent('We would be honoured by your presence.')}`
