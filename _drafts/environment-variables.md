What are environment variables?

*This post assumes you know the basics of the command line and what variables are. No need to be an expert!*

Every command you run (ls, cd, git, whatever) has access to some special variables called environment variables. These are just variables with values—nothing special about them—but different commands use them for different things.

For example, the `ls` command looks at a variable called 

You can see all of the environment variables with the `env` command. For example, here's what happens when I run `env` on my machine:

TODO

To set a new environment variable for the rest of your session (these variables are reset every time you log in), you can use the export command. For example, the ls command cares about a variable calledLS_COLORS. You can use it to make all of your directories have pink backgrounds:

# This environment variable is different on Macs, by the way.

# If you're testing this out, test it on your Linux machine.

$ export LS_COLORS='di=0;45'

$ ls
a-directory
some-file.txt

the-coolest-directory


Now, every time you run ls (until you close the terminal or end your SSH connection), your directories will have pink backgrounds. ls just checks if that variable exists, and if it does, it'll use it to set some colors.

You can also set an environment variable for just one command invocation. You do this by setting the variable and then calling the command, all one one line.

$ LS_COLORS='di=0;45' ls
a-directory
some-file.txt

the-coolest-directory


# When you run it again later, it won't have the environment variable set any more,

# so the directories won't have pink backgrounds.

$ ls

a-directory

some-file.txt

the-coolest-directory


In a moment, we'll come back to environment variables; this is important.