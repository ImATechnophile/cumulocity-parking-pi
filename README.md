# Parking-Pi

* Parking-Pi is an AngularJS application built on **Cumulocity web SDK** also known as Cumulocity Parking-Pi application.
* Parking-Pi gives you very fast visibility and control over your remote parking slots, be these companies parking slot, malls parking slot, hospital or any other parking slots that you need to know whether the free space is available or not.

## Task list

- [ ] What are the Software requirements you need to run this app?
- [ ] How to deploy our Parking-Pi app in your tenant? 
- [ ] How to run our Parking-Pi app in your localhost?
- [ ] About plugins and its functionalites of parking-pi app? 
- [ ] What are the Cumulocity angular modules used in this app? 

## Getting Started

Just clone this repository and follow the below Prerequisites

### Prerequisites

Before getting into this project You should be familiar with the following technologies:

* HTML5 and CSS.
* JavaScript
* AngularJS 1.x.

Software requirements:

* You will need [Node.js](https://nodejs.org/en/), (6.7 or newer)
* You will need [npm](https://www.npmjs.com/), (installed with Node.js)
* You will need access to your Cumulocity account, i.e. you need your tenant name, username and password.(Create a 1 month *free account* in [cumulocity.com](https://www.cumulocity.com/)


### Installing

Once all prerequisites are fulfilled, you are almost ready to see the Parking-Pi application in your desktop. For the process of deploying our Parking-Pi, you will need the npm package "cumulocity-tools" installed globally on your machine. 

To install the npm package, execute the following command on your terminal.

```
$ npm i cumulocity-tools -g
```

## Deployment

CREATE THE APPLICATION IN YOUR TENANT.Follow the below steps on your terminal with your Cumulocity credentials.
```
$ c8y deploy:app parking_pi
? Tenant yourTenantName
? User yourUserName
? Password ***********
? Base url https://yourTenantName.cumulocity.com
GET application/applicationsByOwner/yourTenantName?pageSize=10000 200
POST application/applications/31337/binaries/ 201
PUT /application/applications/31337 200
```

Almost Done :+1: Now you can view our *Parking-Pi* app in your tanent.

## Completed Task list:

- [x] What are the Software requirements you need to run this app?
- [x] How to deploy our Parking-Pi app in your tenant? 
- [ ] How to run our Parking-Pi app in your localhost?
- [ ] About plugins and its functionalites of parking-pi app? 
- [ ] What are the Cumulocity angular modules used in this app? 

## Running locally:

After creating your app in your cumulocity tanent.You can able to run our app locally.

```
$ c8y server -u https://knights.cumulocity.com
[HPM] Proxy created: /  ->  https://yourtenantName.cumulocity.com
Cumulocity UI development server running in port 9000.
Proxying api requests to https://yourTanentName.cumulocity.com
162 modules loaded.
4 application manifest loaded.
http://localhost:9000/apps/parking_pi/ cumulocity.json
http://localhost:9000/apps/administration/  Packaged App
http://localhost:9000/apps/cockpit/  Packaged App
http://localhost:9000/apps/devicemanagement/  Packaged App
```

In the above example c8y server -u https://knights.cumulocity.com is the command to run your app locally.After executing the above command go and visit this url to see our app. [http://localhost:9000/apps/parking_pi/] (http://localhost:9000/apps/parking_pi/) 

## Plugins of parking-pi app:

*Every Cumulocity AngularJs app is a collection of Plugins*

Our Parking-Pi app consists of three main plugins, they are:
* parking-pi-appIcon
* parking-pi-branding
* parking-pi-core

I guess, the name of plugins gives some idea about it's functionalities 😎

## Functionalities of our plugins:

**parking-pi-appIcon :**
* This plugin is used to create an logo for your Application.
* To set an unique logo for your application our product Cumulocity will provide you an special angular module.That is given below

```
angular.module('c8y.ui').run(runBlock);

function runBlock(c8yAppIconsList) {
  c8yAppIconsList['yourappcontextpath'] = 'yourappcontextpath'
}

```
and then in your css file you must add

```
.c8y-icon-yourappcontextpath:before {
  content: '';
  background-image: url('youricon.svg');
}

```
* Each angular module will call an REST API at back.
* The above angular module is *not in the cumulocity documentation*. So make use of it.
You can refer all the available API's in our [API DOCUMENTATION] (http://resources.cumulocity.com/documentation/jssdk/latest/#/api)


We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
