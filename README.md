## Prerequisites
* nodejs
* mongodb
* grunt (grunt-cli)
* ffmpeg

### Install nodejs
Download and install nodejs V4.2.1 from https://nodejs.org/en/

### Install mongodb
Download and install mongodb V3.0 from https://www.mongodb.org/ <br>
Also download and install robomongo from http://robomongo.org/. This is a UI client for mongodb. <br>

After downloading and installing mongodb, start mongodb from terminal
```
sudo mongod
```

### Install grunt client
```
npm install -g grunt-cli
```
If there is a permission error, run the command with sudo

### Install ffmpeg
This is required to get properties of audio files. <br>
Follow these commands <br>
```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew doctor
brew install ffmpeg
```

## Install Application
After cloning the repository, get on to 'readtejo' folder in terminal
```
npm install
bower install (Optional)
```
## Running Application
```
grunt
```
Application starts on http://localhost:3000




