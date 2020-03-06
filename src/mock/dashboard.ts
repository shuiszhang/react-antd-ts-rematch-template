export default {
  '/api/v1/dashboard': {
    get: {
      enabled: true, // 是否开启
      response: {
        // mock 规则
        code: '0',
        data: {
          points: [
            {
              year: '1991',
              value: 3
            },
            {
              year: '1992',
              value: 4
            },
            {
              year: '1993',
              value: 3.5
            },
            {
              year: '1994',
              value: 5
            },
            {
              year: '1995',
              value: 4.9
            },
            {
              year: '1996',
              value: 6
            },
            {
              year: '1997',
              value: 7
            },
            {
              year: '1998',
              value: 9
            },
            {
              year: '1999',
              value: 13
            }
          ],
          points2: [
            {
              country: 'Asia',
              year: '1750',
              value: 502
            },
            {
              country: 'Asia',
              year: '1800',
              value: 635
            },
            {
              country: 'Asia',
              year: '1850',
              value: 809
            },
            {
              country: 'Asia',
              year: '1900',
              value: 5268
            },
            {
              country: 'Asia',
              year: '1950',
              value: 4400
            },
            {
              country: 'Asia',
              year: '1999',
              value: 3634
            },
            {
              country: 'Asia',
              year: '2050',
              value: 947
            },
            {
              country: 'Africa',
              year: '1750',
              value: 106
            },
            {
              country: 'Africa',
              year: '1800',
              value: 107
            },
            {
              country: 'Africa',
              year: '1850',
              value: 111
            },
            {
              country: 'Africa',
              year: '1900',
              value: 1766
            },
            {
              country: 'Africa',
              year: '1950',
              value: 221
            },
            {
              country: 'Africa',
              year: '1999',
              value: 767
            },
            {
              country: 'Africa',
              year: '2050',
              value: 133
            },
            {
              country: 'Europe',
              year: '1750',
              value: 163
            },
            {
              country: 'Europe',
              year: '1800',
              value: 203
            },
            {
              country: 'Europe',
              year: '1850',
              value: 276
            },
            {
              country: 'Europe',
              year: '1900',
              value: 628
            },
            {
              country: 'Europe',
              year: '1950',
              value: 547
            },
            {
              country: 'Europe',
              year: '1999',
              value: 729
            },
            {
              country: 'Europe',
              year: '2050',
              value: 408
            },
            {
              country: 'Oceania',
              year: '1750',
              value: 200
            },
            {
              country: 'Oceania',
              year: '1800',
              value: 200
            },
            {
              country: 'Oceania',
              year: '1850',
              value: 200
            },
            {
              country: 'Oceania',
              year: '1900',
              value: 460
            },
            {
              country: 'Oceania',
              year: '1950',
              value: 230
            },
            {
              country: 'Oceania',
              year: '1999',
              value: 300
            },
            {
              country: 'Oceania',
              year: '2050',
              value: 300
            }
          ]
        }
      }
    }
  }
}
