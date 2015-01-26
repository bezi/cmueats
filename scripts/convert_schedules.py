#!/usr/bin/env python3

import sys
import json

def time_string_to_obj(string, day):
    return {
        'day': int(day),
        'time': string[:2] + ':' + string[2:]
    }


def combine_periods(periods):

    i = 0
    while i < len(periods) and len(periods) > 1:
        nexti = (i + 1) % len(periods)

        if (periods[i]['end']['time'] == '24:00' and
            (periods[i]['end']['day'] + 1 if periods[i]['end']['day'] < 7 else 1) == periods[nexti]['start']['day'] and
            periods[nexti]['start']['time'] == '00:00'):
            periods[i]['end']['day'] = periods[nexti]['end']['day']
            periods[i]['end']['time'] = periods[nexti]['end']['time']
            periods.pop(nexti)
        else:
            i += 1

    for item in periods:
        start = item['start']
        end = item['end']

        if start['time'] == '24:00':
            start['day'] = 1 if start['day'] == 7 else start['day'] + 1
            start['time'] = '00:00'

        if end['time'] == '24:00':
            end['day'] = 1 if end['day'] == 7 else end['day'] + 1
            end['time'] = '00:00'

    return periods


def parse_periods(schedule):
    periods = []

    keys = list(schedule.keys())

    keys.sort()

    for day in keys:
        if not day:
            continue

        dailyPeriods = schedule[day].split(":")

        for period in dailyPeriods:
            if not period:
                break
            periods.append({
                'start': time_string_to_obj(period.split('-')[0], day),
                'end': time_string_to_obj(period.split('-')[1], day)
            })

    periods = sorted(periods, key=lambda period: (period['start']['day'], period['start']['time']))

    periods = combine_periods(periods)

    return periods

def parse_data(js):
    calendar = []
    for loc in js:
        obj = {
            'eatery': loc['name'],
            'periods': parse_periods(loc['schedules']['default'])
        }
        calendar.append(obj)

    return {'startDate': None, 'endDate': None, 'calendar': calendar}


def parse_python(inpath, outpath):

    # Get information
    with open(inpath, 'r') as infile:

        print('Reading file data...')

        print('Parsing...')
        data = parse_data(json.loads(infile.read()))

        print('Success!')

    print('Writing output to file ' + outpath + '...')

    # Write to output file
    with open(outpath, 'w') as outfile:
        json.dump(data, outfile)

    print('Done!')


if __name__ == '__main__':

    inpath = sys.argv[1]
    outpath = sys.argv[2]

    parse_python(inpath, outpath)
