from sets import Set
import json

GAMES = ('Super Smash Bros.',
         'Super Smash Bros. Melee',
         'Super Smash Bros. Brawl',
         'Super Smash Bros. 4')

GROUPS = ('Male', 'Female', 'Androgenous', 'Choose')

with open('full_character_data.json', 'r') as jsonfile:
    data = json.load(jsonfile)

groups = {}
for group in GROUPS:
    groups[group] = Set()

for game in GAMES:
    for group in GROUPS:
        for character in data[game][group]:
            groups[group].add(character)

for game, set in groups.iteritems():
    print game + ',' + str(len(set))
