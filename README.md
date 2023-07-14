# Twilio Hotlines

[![Node.js CI](https://github.com/rodmhgl/twilio_apps/actions/workflows/main.yml/badge.svg)](https://github.com/rodmhgl/twilio_apps/actions/workflows/main.yml)

## Motivation

I've always been fascinated by the idea of services such as TMBG's Dial-a-Song or Wozniak's Dial-a-Joke, so I decided to learn the Twilio API. I also needed to know GitHub Actions, so I created this repo to play around with both.

## What's happening here?

### The App

This repo contains a Twilio app with a few endpoints deployed to a DigitalOcean droplet. Each endpoint is a simple hotline that you can call to hear a song or a joke.

From the development perspective, nothing special is happening here. Twilio receives the incoming call and then triggers the webhook using the phone number's specified endpoint. The endpoint responds with a TwiML document that tells Twilio what to do next. In most of our use cases, the endpoint responds with a `<Play>` verb instructing Twilio to play an audio file.

For the Deep Thoughts hotline, an IVR allows the caller to choose between different Deep Thoughts. The endpoint responds with a `<Gather>` verb that tells Twilio to wait for the caller to press a digit. Once the user presses a digit, Twilio triggers the webhook to the app's endpoint again, which responds with a `<Play>` verb that tells Twilio to play the chosen audio file.

### The CI/CD

#### Infrastructure as Code

Terraform is being used to provision the infrastructure in DigitalOcean / Azure. The compute portions of the infrastructure are provisioned in DigitalOcean, while the public DNS records are provisioned in Azure.

The pipeline for the Terraform integration is TBD.

#### Build

For the build phase, we're using a matrix build to test on different Node.js versions to ensure compatibility with current and upcoming versions of Node.js. We're doing simple dependency installation, linting, and testing phases.

#### Deploy

For the deploy phase, we're using DigitalOcean droplets as our deployment targets. The app is cloned, moved into a deployment directory, and then the dependencies are installed. The app is then started using PM2 to ensure the app is restarted if the server reboots or the app crashes.

The Twilio phone numbers webhook endpoints are then updated utilizing the Twilio REST API.

## How to use?

Simply dial any of the numbers below.

### 660-DeepTht

Call **[+1-660-DeepTht](tel:16603337848)** to hear a Deep Thought from Jack Handey.

### 269-BakerSt

Need a little hot sax in your life? Call **[+1-269-BAKERST](tel:12692253778)** and get Bakered!

### 66-2GetItOn

Can't get the mood right? Call **[+1-66-2GETITON](tel:16624384866)** and let Marvin help!

### 91-Freebird

Need a little pentatonic action in your life? Call **[+1-91-FREEBIRD](tel:19137332473)**!
