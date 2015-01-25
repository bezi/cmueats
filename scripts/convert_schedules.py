#!/usr/bin/env python3

import sys
import json

def time_string_to_obj(string, day):
    return {
        'day': 1 if day == '7' else int(day) + 1,
        'hour': int(string[:2]),
        'minute': int(string[2:])
    }


def combine_periods(periods):

    i = 0
    while i < len(periods) and len(periods) > 1:
        nexti = (i + 1) % len(periods)

        if (periods[i]['end']['hour'] == 24 and
            (periods[i]['end']['day'] + 1 if periods[i]['end']['day'] < 7 else 1) == periods[nexti]['start']['day'] and
            periods[nexti]['start']['hour'] == 0 and
            periods[nexti]['start']['minute'] == 0):
            periods[i]['end']['day'] = periods[nexti]['end']['day']
            periods[i]['end']['hour'] = periods[nexti]['end']['hour']
            periods[i]['end']['minute'] = periods[nexti]['end']['minute']
            periods.pop(nexti)
        else:
            i += 1

    for item in periods:
        start = item['start']
        end = item['end']

        if start['hour'] == 24:
            start['day'] = 1 if start['day'] == 7 else start['day'] + 1
            start['hour'] = 0

        if end['hour'] == 24:
            end['day'] = 1 if end['day'] == 7 else end['day'] + 1
            end['hour'] = 0

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

    periods = sorted(periods, key=lambda period: (period['start']['day'], period['start']['hour'], period['start']['minute']))

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
