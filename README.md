# Parking-Pi  

* Parking-Pi is an AngularJS application built on **Cumulocity web SDK** also known as Cumulocity Parking-Pi application.
* Parking-Pi gives you very fast visibility and control over your remote parking slots, be these companies parking slot, malls parking slot, hospital or any other parking slots that you need to know whether the free space is available or not.

## Task list

- [ ] What are the Software requirements you need to run this app?
- [ ] How to deploy our Parking-Pi app on your tenant? 
- [ ] How to run our Parking-Pi app on your localhost?
- [ ] About plugins and its functionalities of the Parking-Pi app? 
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
* You will need access to your Cumulocity account, i.e. you need your tenant name, username, and password.(Create a 1 month *free account* in [cumulocity.com](https://www.cumulocity.com/)


### Installing

Once all prerequisites are fulfilled, you are almost ready to see the Parking-Pi application on your desktop. For the process of deploying our Parking-Pi, you will need the npm package "cumulocity-tools" installed globally on your machine. 

To install the npm package, execute the following command on your terminal.

```
$ npm i cumulocity-tools -g
```

## Deployment

*Create the application in your tenant*.Follow the below steps on your terminal with your Cumulocity credentials.
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
- [x] How to deploy our Parking-Pi app on your tenant? 
- [ ] How to run our Parking-Pi app on your localhost?
- [ ] About plugins and its functionalities of the Parking-Pi app? 
- [ ] What are the Cumulocity angular modules used in this app? 

## Running locally:

After creating your app in your cumulocity tenant.You can able to run our app locally.

```
$ c8y server -u https://yourTenantName.cumulocity.com
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

In the above example c8y server -u https://yourTanentName.cumulocity.com is the command to run your app locally.After executing the above command go and visit this URL to see our app. [http://localhost:9000/apps/parking_pi/](http://localhost:9000/apps/parking_pi/) 

## Plugins of the Parking-Pi app:

*Every Cumulocity AngularJs app is a collection of Plugins*

Our Parking-Pi app consists of three main plugins, they are:
* parking-pi-appIcon
* parking-pi-branding
* parking-pi-core

I guess the name of plugins gives some idea about its functionalities 😎

## Functionalities of our plugins:

**parking-pi-appIcon :**
* This plugin is used to create a logo for your Application.
* To set a unique logo for your application our product Cumulocity will provide you a special angular module.That is given below

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
* Each angular module will call a REST API at back.
* The above angular module is *not in the cumulocity documentation*. So make use of it.
**You can refer all the available API's in our** [API DOCUMENTATION](http://resources.cumulocity.com/documentation/jssdk/latest/#/api)

**parking-pi-branding :**
* This plugin is used to change your app's look and feel.
* This plugin fully consists of less files.You just go and make some changes in colors, logo. So that you can make your app looks different from others.

**parking-pi-core :**
* This plugin consists of all the important functionalities.
* It consists of 6 folders.Each and every folder consists of a **separate controller**.
* This plugin consists of full modularised code.
* Folder structure is given below:
  
* parking-pi-core
   - Child
     - child.css
     - child.html
     - ChildController.js
   - Device
     - device.css
     - device.html
     - DeviceController.js
   - Global
     - GlobalConfig.js
     - GlobalMobule.js
   - Health
     - health.css
     - ...
     - ...
     
## Cumulocity angular modules used in this app:

  1.  c8yDevices
  2.  c8yMeasurements
  3.  c8yAlert
  4.  c8yInventory
  5.  c8yNavigatorProvider
  6.  c8yViewsProvider
  7.  c8yTittleProvider
  8.  c8yBinary
  9.  c8yDeviceStatus
  10. c8yTabProvider
  11. c8ySearchProvider
  12. c8yKeyProvider
  13. c8yEvents
  14. c8yCounter
  14. c8yIdentity
  
  You can refer the description of the above modules in our [API DOCUMENTATION](http://resources.cumulocity.com/documentation/jssdk/latest/#/api)
  
 ## Completed Task list:

- [x] What are the Software requirements you need to run this app?
- [x] How to deploy our Parking-Pi app on your tenant? 
- [x] How to run our Parking-Pi app on your localhost?
- [x] About plugins and its functionalities of the Parking-Pi app? 
- [x] What are the Cumulocity angular modules used in this app?

## Authors

* **Saravana Prakash** - *Initial work* - [Projects in python](https://bitbucket.org/dashboard/overview)

See also the list of [contributors](https://github.com/ImATechnophile/parking-pi-app/graphs/contributors) who participated in this project.

* **Linkedin** - *Saravana Prakash* - [About myself](https://www.linkedin.com/in/saravana-prakash-j-116035124/)


