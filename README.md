# Twilio Hotlines

[![Node.js CI](https://github.com/rodmhgl/twilio_apps/actions/workflows/main.yml/badge.svg)](https://github.com/rodmhgl/twilio_apps/actions/workflows/main.yml)

## Motivation

I've always been fascinated by the idea of services such as TMBG's Dial-a-Song or Wozniak's Dial-a-Joke, so I decided to learn the Twilio API. I also needed to know GitHub Actions, so I created this repo to play around with both.

## What's happening here?

This repo contains a Twilio app, consisting of a few endpoints, that are deployed to a DigitalOcean droplet. Each endpoint is a simple hotline that you can call to hear a song or a joke.

From the development perspective, nothing special is happening here. The incoming call is received by Twilio, which then makes a request to the phone number's specified endpoint. The endpoint responds with a TwiML document that tells Twilio what to do next. In the majority of our use cases, the endpoint responds with a `<Play>` verb that tells Twilio to play an audio file.

For the Deep Thoughts hotline, an IVR is used to allow the caller to choose between different Deep Thoughts. The endpoint responds with a `<Gather>` verb that tells Twilio to wait for a digit to be pressed. Once the digit is pressed, Twilio makes a request to the app's endpoint again, which responds with a `<Play>` verb that tells Twilio to play an audio file.

## How to use?

### 660-DeepTht

Call **[+1-660-DeepTht](tel:16603337848)** to hear a Deep Thought from Jack Handey.

### 269-BakerSt

Need a little hot sax in your life? Call **[+1-269-BAKERST](tel:12692253778)** and get Bakered!

### 66-2GetItOn

Can't get the mood right? Call **[+1-66-2GETITON](tel:16624384866)** and let Marvin help!

### 91-Freebird

Need a little pentatonic action in your life? Call **[+1-91-FREEBIRD](tel:19137332473)**!
