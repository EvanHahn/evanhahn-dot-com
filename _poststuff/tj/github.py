from githubpy import GitHub

gh = GitHub()

user = gh.users('visionmedia').get()

print user
