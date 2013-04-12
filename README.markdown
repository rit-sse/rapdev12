# BioGrid #
=======

**Rapid Development Weekend 12 by the Society of Software Engineers**

BioGrid is a fishtank-style game where creatures strive to live in a hostile world. Write JavaScript to
build your very own creature -- the success of your creature depends on the quality of your code.

## Getting Started ##

If you're using Windows, you **should** install Visual Studio so you
can build the native extensions for some Node.js modules.

1.  Install [Node.js][1] (Available for Windows, Mac OS X, and Linux)
2.  Clone this repository
3a. For OS X and Linux users, move to the repository directory and run `npm install` in your favorite
    shell. This will install any dependencies to the project folder.
3b. For Windows users, reboot your system, open the command prompt, and follow the rest of 3a.

## Running the Program ##
From the command line, run the following to start the server:

    node app -c

To change how the program runs you can go to setup.json.
The first field is the number of each creature to be made
The second is a list of all of the creatures locations
The third field is the world location

Go to localhost:3000 in your browser to run the client.

## Contributing ##
Be sure to read our documentation on the [project conventions][2] before
contributing.

[1]: http://nodejs.org
[2]: https://github.com/rit-sse/rapdev12/wiki/Project-conventions
